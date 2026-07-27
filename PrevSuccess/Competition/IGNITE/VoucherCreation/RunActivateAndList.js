// Playwright runner — activates all vouchers then lists all codes, saves to .txt
const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const DIR = __dirname;

async function runScript(page, scriptFile) {
  const script = fs.readFileSync(path.join(DIR, scriptFile), 'utf8');
  await page.evaluate(script);
  await page.waitForTimeout(draftsCount > 100 ? draftsCount * 220 + 5000 : 30000);
}

let draftsCount = 300; // safe upper bound for wait time

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page    = await (await browser.newContext()).newPage();

  const logs = [];
  page.on('console', msg => {
    const t = msg.text().replace(/%c/g, '').trim();
    if (t) { logs.push(t); process.stdout.write(`[browser] ${t}\n`); }
  });

  // Login
  await page.goto('https://admin.roetix.com/login');
  await page.fill('input[type="email"]', 'superadmin@gmail.com');
  await page.fill('input[type="password"]', 'RoetixDev2925');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log('✅ Logged in');

  await page.goto('https://admin.roetix.com/roetix-events/69dc71acbc364e3f89d9d6a9/promos?tab=vouchers');
  await page.waitForTimeout(2000);

  // ── Step 1: ACTIVATE ──────────────────────────────────────────────────────
  console.log('\n🔄 Running ActivateAllVouchers.js ...');
  const activateScript = fs.readFileSync(path.join(DIR, 'ActivateAllVouchers.js'), 'utf8');
  await page.evaluate(activateScript);
  await page.waitForTimeout(70000); // 292 vouchers × ~200ms + buffer

  // ── Step 2: LIST ─────────────────────────────────────────────────────────
  console.log('\n📋 Running ListAllCodes.js ...');
  const listScript = fs.readFileSync(path.join(DIR, 'ListAllCodes.js'), 'utf8');
  await page.evaluate(listScript);
  await page.waitForTimeout(5000);

  // Extract codes from console logs (pattern: 3 letters + 3 digits)
  const codes = logs
    .flatMap(l => l.split('\n'))
    .map(l => l.trim())
    .filter(l => /^[A-Z]{3}[0-9]{3}$/.test(l));

  const uniqueCodes = [...new Set(codes)].sort();

  if (uniqueCodes.length > 0) {
    const outFile = path.join(DIR, 'VoucherCodes_IGNITE.txt');
    fs.writeFileSync(outFile, uniqueCodes.join('\n'), 'utf8');
    console.log(`\n✅ Saved ${uniqueCodes.length} codes → ${outFile}`);
    console.log('\n========= COPY-PASTE LIST =========');
    console.log(uniqueCodes.join('\n'));
    console.log('===================================');
  } else {
    console.log('⚠ No codes extracted from console — check [browser] logs above.');
  }

  await browser.close();
}

main().catch(console.error);
