const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ENV = (process.argv[2] || 'dev').toLowerCase();
const IS_PROD = ENV === 'prod';

const CONFIG = {
  baseUrl: IS_PROD ? 'https://admin.roetix.com' : 'https://dev-admin.roetix.com',
  apiBase: IS_PROD ? 'https://event.roetix.com/api/admin' : 'https://dev-event.roetix.com/api/admin',
  credentials: {
    email: IS_PROD ? 'superadmin@gmail.com' : 'superadmin@gmail.com',
    password: 'RoetixDev2925',
  },
  designDir: path.resolve(__dirname, '..', 'Design'),
};

const SUFFIX = Math.random().toString(36).substring(2, 6);
const EVENT_DATA = {
  eventName: 'Anime in Symphony',
  slug: `anime-in-symphony-${SUFFIX}`,
  eventType: 'General Admission',
  location: 'GOR UNY',
  ticketSalesStart: '2026-06-01T00:00',
  eventDate: '2026-08-08T19:15',
  flatAmount: '2800',
  percentage: '0',
  feeBearer: 'Organizer (deducted from payout)',
  organizer: 'Rumah Orkestra Jogja',
  venueName: 'GOR UNY',
  description: `English (EN)
"Anime in Symphony" is a live orchestral performance presented by Rumah Orkestra Jogja that features symphonic arrangements of iconic soundtracks from popular Japanese animated series. The event brings together familiar melodies from classic and beloved anime titles, offering a nostalgic musical experience for enthusiasts through a full orchestral format at GOR UNY.

Bahasa Indonesia (ID)
"Anime in Symphony" adalah pertunjukan musik orkestra langsung persembahan Rumah Orkestra Jogja yang menampilkan aransemen simfoni dari berbagai lagu tema ikonik serial animasi Jepang populer. Acara ini menghadirkan kembali melodi-melodi yang tak asing dari judul-judul anime klasik dan disukai banyak orang, menawarkan pengalaman musik yang sarat nostalgia bagi para penggemar dalam format full orkestra di GOR UNY.`,
};

const TIMELINES = [
  { name: 'Normal', start: '2026-06-01T00:00', end: '2026-08-08T00:00' }
];

const IMAGE_UPLOADS = [
  { label: 'Logo', file: 'Logo Anime in Symphony Crayon (1).png' },
  { label: 'Organizer Logo', file: 'Logo ROJ_No  BG.png' },
  { label: 'Banner', file: 'Banner Utama_3.1 (1).png' },
  { label: 'Poster', file: 'Poster Utama_4.5 (1).png' },
  { label: 'Thumbnail', file: 'Poster Utama_1.1.png' },
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function login(page) {
  console.log('[1/5] Logging in...');
  await page.goto(`${CONFIG.baseUrl}/login`, { timeout: 60000, waitUntil: 'domcontentloaded' });
  await sleep(3000);

  await page.locator('input[type="email"], input[name="email"], input#email').first().fill(CONFIG.credentials.email);
  await page.locator('input[type="password"]').first().fill(CONFIG.credentials.password);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForURL('**/events**', { timeout: 15000 });
  await sleep(2000);
  console.log('  -> Logged in');
}

async function navigateToCreateEvent(page) {
  console.log('[2/5] Navigating to Create Event...');
  await page.locator('a:has-text("Roetix Events")').first().click();
  await page.waitForURL('**/roetix-events**', { timeout: 10000 });
  await sleep(2000);

  await page.locator('a:has-text("Create Event")').first().click();
  await page.waitForURL('**/roetix-events/create**', { timeout: 10000 });
  await sleep(3000);
  console.log('  -> On create event page');
}

async function fillEventDetails(page) {
  console.log('[3/5] Filling Event Details (Step 1)...');
  const d = EVENT_DATA;

  await page.fill('#name', d.eventName);
  console.log(`  -> Event Name: ${d.eventName}`);

  await page.fill('#slug', d.slug);
  console.log(`  -> Slug: ${d.slug}`);

  await page.selectOption('#event_type', d.eventType);
  console.log(`  -> Event Type: ${d.eventType}`);

  await page.fill('#location', d.location);
  console.log(`  -> Location: ${d.location}`);

  await page.fill('#start_date', d.ticketSalesStart);
  console.log(`  -> Ticket Sales Start: ${d.ticketSalesStart}`);

  await page.fill('#event_date', d.eventDate);
  console.log(`  -> Event Date: ${d.eventDate}`);

  await page.fill('#pf_flat', d.flatAmount);
  await page.fill('#pf_pct', d.percentage);
  await page.selectOption('#pf_bearer', { label: d.feeBearer });
  console.log(`  -> Fee: flat ${d.flatAmount}, pct ${d.percentage}, bearer Organizer`);

  await page.fill('#organizer_name', d.organizer);
  console.log(`  -> Organizer: ${d.organizer}`);

  await page.fill('#venue_name', d.venueName);
  console.log(`  -> Venue Name: ${d.venueName}`);

  await page.fill('#description', d.description);
  console.log('  -> Description filled');

  await uploadImages(page);
}

async function uploadImages(page) {
  console.log('  -> Uploading images (API + React state injection)...');

  const token = await page.evaluate(() => localStorage.getItem('competitionAdminToken'));
  if (!token) {
    console.log('    -> ERROR: No auth token found');
    return;
  }

  for (const upload of IMAGE_UPLOADS) {
    const filePath = path.join(CONFIG.designDir, upload.file);
    if (!fs.existsSync(filePath)) {
      console.log(`    -> ${upload.label}: SKIP (file not found)`);
      continue;
    }

    try {
      const fileB64 = fs.readFileSync(filePath).toString('base64');

      const result = await page.evaluate(async (params) => {
        const byteChars = atob(params.b64);
        const byteArray = new Uint8Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) byteArray[i] = byteChars.charCodeAt(i);

        const formData = new FormData();
        formData.append('file', new Blob([byteArray], { type: 'image/png' }), params.fileName);

        const resp = await fetch(params.apiBase + '/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${params.token}` },
          body: formData,
        });
        return await resp.json();
      }, { b64: fileB64, fileName: upload.file, token, apiBase: CONFIG.apiBase });

      if (!result.success || !result.data?.url) {
        console.log(`    -> ${upload.label}: UPLOAD FAILED - ${JSON.stringify(result)}`);
        continue;
      }

      const url = result.data.url;
      console.log(`    -> ${upload.label}: uploaded -> ${url.split('/').pop()}`);

      const injected = await page.evaluate((params) => {
        const labels = [...document.querySelectorAll('label')];
        const match = labels.find(l => l.textContent.trim() === params.label);
        if (!match) return false;

        const key = Object.keys(match).find(k => k.startsWith('__reactFiber$'));
        if (!key) return false;

        let fiber = match[key];
        let depth = 0;
        while (fiber && depth < 30) {
          const props = fiber.memoizedProps || {};
          if (props.label === params.label && props.onChange) {
            props.onChange(params.url);
            return true;
          }
          fiber = fiber.return;
          depth++;
        }
        return false;
      }, { label: upload.label, url });

      if (injected) {
        console.log(`    -> ${upload.label}: injected into form`);
      } else {
        console.log(`    -> ${upload.label}: WARN - could not inject into React state`);
      }

      await sleep(500);
    } catch (e) {
      console.log(`    -> ${upload.label}: ERROR - ${e.message}`);
    }
  }
}

async function fillTimelines(page) {
  console.log('[4/5] Filling Timelines (Step 2)...');

  const nextBtn = page.locator('button').filter({ hasText: /^Next$/ }).first();
  await nextBtn.click();
  await sleep(3000);

  for (let i = 0; i < TIMELINES.length; i++) {
    const tl = TIMELINES[i];

    if (i > 0) {
      const addTimelineBtn = page.locator('button').filter({ hasText: /Add Timeline/ }).first();
      await addTimelineBtn.click();
      await sleep(800);
    }

    const nameInput = page.locator(`input[name="timelines.${i}.name"]`);
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill(tl.name);
    console.log(`  -> Timeline ${i + 1} Name: ${tl.name}`);

    const startInput = page.locator(`input[name="timelines.${i}.start_date"]`);
    await startInput.fill(tl.start);
    console.log(`  -> Timeline ${i + 1} Start: ${tl.start}`);

    const endInput = page.locator(`input[name="timelines.${i}.end_date"]`);
    await endInput.fill(tl.end);
    console.log(`  -> Timeline ${i + 1} End: ${tl.end}`);

    await sleep(500);
  }
}

async function skipFormFieldsAndPublish(page) {
  console.log('[5/5] Skipping Form Fields & Publishing...');

  const nextBtn = page.locator('button').filter({ hasText: /^Next$/ }).first();
  await nextBtn.click();
  await sleep(3000);

  const publishBtn = page.locator('button[type="submit"]').filter({ hasText: /Create & Publish Event/ }).first();
  await publishBtn.waitFor({ state: 'visible', timeout: 10000 });

  console.log('  -> Publish button found, clicking...');

  page.on('dialog', async dialog => {
    console.log(`  -> Dialog: ${dialog.message()}`);
    await dialog.accept();
  });

  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/') || resp.status() < 400, { timeout: 15000 }).catch(() => null),
    publishBtn.click(),
  ]);

  if (response) {
    console.log(`  -> Response: ${response.status()} ${response.url()}`);
  }

  await sleep(5000);
  console.log(`  -> Final URL: ${page.url()}`);

  const pageContent = await page.evaluate(() => {
    const toast = document.querySelector('[role="status"], [data-sonner-toast], .toast, [class*="toast"]');
    const alert = document.querySelector('[role="alert"]');
    return {
      toast: toast?.textContent?.trim()?.substring(0, 200) || '',
      alert: alert?.textContent?.trim()?.substring(0, 200) || '',
      title: document.title,
    };
  });
  console.log(`  -> Page title: ${pageContent.title}`);
  if (pageContent.toast) console.log(`  -> Toast: ${pageContent.toast}`);
  if (pageContent.alert) console.log(`  -> Alert: ${pageContent.alert}`);

  console.log('\n=== DONE! ===');
}

(async () => {
  console.log(`=== Anime in Symphony - Event Creation Script (${IS_PROD ? 'PROD' : 'DEV'}) ===\n`);

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await login(page);
    await navigateToCreateEvent(page);
    await fillEventDetails(page);
    await fillTimelines(page);
    await skipFormFieldsAndPublish(page);
  } catch (e) {
    console.error('\n!!! ERROR:', e.message);
    await page.screenshot({ path: path.resolve(__dirname, 'error-screenshot.png'), fullPage: true });
    console.log('Screenshot saved to error-screenshot.png');
  }

  await browser.close();
})();
