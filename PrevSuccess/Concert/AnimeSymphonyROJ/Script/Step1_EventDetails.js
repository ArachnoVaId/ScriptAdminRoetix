(async () => {
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
    description: `English (EN)\n"Anime in Symphony" is a live orchestral performance presented by Rumah Orkestra Jogja that features symphonic arrangements of iconic soundtracks from popular Japanese animated series. The event brings together familiar melodies from classic and beloved anime titles, offering a nostalgic musical experience for enthusiasts through a full orchestral format at GOR UNY.\n\nBahasa Indonesia (ID)\n"Anime in Symphony" adalah pertunjukan musik orkestra langsung persembahan Rumah Orkestra Jogja yang menampilkan aransemen simfoni dari berbagai lagu tema ikonik serial animasi Jepang populer. Acara ini menghadirkan kembali melodi-melodi yang tak asing dari judul-judul anime klasik dan disukai banyak orang, menawarkan pengalaman musik yang sarat nostalgia bagi para penggemar dalam format full orkestra di GOR UNY.`,
  };

  const TIMELINES = [
    { name: 'Tes 1', start: '2026-06-01T00:00', end: '2026-06-30T00:00' },
    { name: 'Tes 2', start: '2026-07-01T00:00', end: '2026-07-30T00:00' },
  ];

  const IMAGE_UPLOADS = [
    { label: 'Logo', file: 'Logo Anime in Symphony Crayon (1).png' },
    { label: 'Organizer Logo', file: 'Logo ROJ_No  BG.png' },
    { label: 'Banner', file: 'Banner Utama_3.1 (1).png' },
    { label: 'Poster', file: 'Poster Utama_4.5 (1).png' },
    { label: 'Thumbnail', file: 'Poster Utama_1.1.png' },
  ];

  const API_BASE = location.hostname === 'admin.roetix.com'
    ? 'https://event.roetix.com/api/admin'
    : 'https://dev-event.roetix.com/api/admin';
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function log(step, msg) { console.log(`[${step}] ${msg}`); }

  function setFieldValue(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return false;
    const proto = el.tagName === 'TEXTAREA'
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    if (setter) setter.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function setSelectValue(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return false;
    el.value = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function setSelectByLabel(selector, label) {
    const el = document.querySelector(selector);
    if (!el) return false;
    const opt = [...el.options].find(o => o.text.trim() === label.trim());
    if (opt) {
      el.value = opt.value;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }
    return false;
  }

  function clickButton(text) {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent.trim().match(new RegExp(`^${text}$`)));
    if (btn) { btn.click(); return true; }
    return false;
  }

  function injectReactState(label, url) {
    const labels = [...document.querySelectorAll('label')];
    const match = labels.find(l => l.textContent.trim() === label);
    if (!match) return false;
    const key = Object.keys(match).find(k => k.startsWith('__reactFiber$'));
    if (!key) return false;
    let fiber = match[key];
    let depth = 0;
    while (fiber && depth < 30) {
      const props = fiber.memoizedProps || {};
      if (props.label === label && props.onChange) {
        props.onChange(url);
        return true;
      }
      fiber = fiber.return;
      depth++;
    }
    return false;
  }

  async function uploadImageViaAPI(label, fileName) {
    const token = localStorage.getItem('competitionAdminToken');
    if (!token) { log('IMG', `ERROR: No auth token`); return null; }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    await new Promise((resolve, reject) => {
      input.onchange = resolve;
      input.onerror = reject;
      input.click();
    });

    if (!input.files || !input.files.length) {
      document.body.removeChild(input);
      return null;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const resp = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    const result = await resp.json();
    document.body.removeChild(input);

    if (!result.success || !result.data?.url) {
      log('IMG', `${label}: UPLOAD FAILED - ${JSON.stringify(result)}`);
      return null;
    }

    return result.data.url;
  }

  // ========== STEP 1: FILL EVENT DETAILS ==========
  console.log('=== Anime in Symphony - Console Script ===\n');

  log('Step 1', 'Filling Event Details...');
  const d = EVENT_DATA;

  setFieldValue('#name', d.eventName);
  log('Step 1', `Event Name: ${d.eventName}`);

  setFieldValue('#slug', d.slug);
  log('Step 1', `Slug: ${d.slug}`);

  setSelectValue('#event_type', d.eventType);
  log('Step 1', `Event Type: ${d.eventType}`);

  setFieldValue('#location', d.location);
  log('Step 1', `Location: ${d.location}`);

  setFieldValue('#start_date', d.ticketSalesStart);
  log('Step 1', `Ticket Sales Start: ${d.ticketSalesStart}`);

  setFieldValue('#event_date', d.eventDate);
  log('Step 1', `Event Date: ${d.eventDate}`);

  setFieldValue('#pf_flat', d.flatAmount);
  setFieldValue('#pf_pct', d.percentage);
  setSelectByLabel('#pf_bearer', d.feeBearer);
  log('Step 1', `Fee: flat ${d.flatAmount}, pct ${d.percentage}, bearer Organizer`);

  setFieldValue('#organizer_name', d.organizer);
  log('Step 1', `Organizer: ${d.organizer}`);

  setFieldValue('#venue_name', d.venueName);
  log('Step 1', `Venue Name: ${d.venueName}`);

  setFieldValue('#description', d.description);
  log('Step 1', 'Description filled');

  await sleep(500);

  // ========== STEP 1b: UPLOAD IMAGES ==========
  log('Step 1b', 'Uploading images (file picker will open for each)...');

  for (const upload of IMAGE_UPLOADS) {
    try {
      log('Step 1b', `Select file for "${upload.label}" (${upload.file})...`);
      const url = await uploadImageViaAPI(upload.label, upload.file);
      if (!url) {
        log('Step 1b', `  ${upload.label}: SKIP`);
        continue;
      }
      log('Step 1b', `  ${upload.label}: uploaded -> ${url.split('/').pop()}`);
      const injected = injectReactState(upload.label, url);
      log('Step 1b', `  ${upload.label}: ${injected ? 'injected into form' : 'WARN - could not inject'}`);
      await sleep(300);
    } catch (e) {
      log('Step 1b', `  ${upload.label}: ERROR - ${e.message}`);
    }
  }

  log('Step 1b', 'All images processed.');

  // ========== STEP 2: TIMELINES ==========
  log('Step 2', 'Clicking Next to go to Timelines...');
  clickButton('Next');
  await sleep(3000);

  for (let i = 0; i < TIMELINES.length; i++) {
    const tl = TIMELINES[i];

    if (i > 0) {
      const addBtn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Add Timeline'));
      if (addBtn) { addBtn.click(); await sleep(800); }
    }

    const nameInput = document.querySelector(`input[name="timelines.${i}.name"]`);
    if (nameInput) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(nameInput, tl.name);
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      nameInput.dispatchEvent(new Event('change', { bubbles: true }));
      log('Step 2', `Timeline ${i + 1} Name: ${tl.name}`);
    }

    const startInput = document.querySelector(`input[name="timelines.${i}.start_date"]`);
    if (startInput) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(startInput, tl.start);
      startInput.dispatchEvent(new Event('input', { bubbles: true }));
      startInput.dispatchEvent(new Event('change', { bubbles: true }));
      log('Step 2', `Timeline ${i + 1} Start: ${tl.start}`);
    }

    const endInput = document.querySelector(`input[name="timelines.${i}.end_date"]`);
    if (endInput) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(endInput, tl.end);
      endInput.dispatchEvent(new Event('input', { bubbles: true }));
      endInput.dispatchEvent(new Event('change', { bubbles: true }));
      log('Step 2', `Timeline ${i + 1} End: ${tl.end}`);
    }

    await sleep(500);
  }

  // ========== STEP 3: FORM FIELDS + PUBLISH ==========
  log('Step 3', 'Clicking Next to go to Form Fields...');
  clickButton('Next');
  await sleep(3000);

  log('Step 3', 'Clicking "Create & Publish Event"...');
  const publishBtn = [...document.querySelectorAll('button')].find(b =>
    b.type === 'submit' && b.textContent.includes('Create & Publish Event')
  );

  if (publishBtn) {
    window.__originalConfirm = window.confirm;
    window.confirm = () => true;
    publishBtn.click();
    await sleep(2000);
    window.confirm = window.__originalConfirm;
    log('Step 3', 'Publish clicked! Check the page for results.');
  } else {
    log('Step 3', 'ERROR: Publish button not found');
  }

  console.log('\n=== DONE! ===');
})();
