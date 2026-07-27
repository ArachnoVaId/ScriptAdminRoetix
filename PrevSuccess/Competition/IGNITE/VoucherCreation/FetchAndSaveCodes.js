// Playwright: fetch all voucher codes + save to .txt file
const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page    = await (await browser.newContext()).newPage();

  await page.goto('https://admin.roetix.com/login');
  await page.fill('input[type="email"]', 'superadmin@gmail.com');
  await page.fill('input[type="password"]', 'RoetixDev2925');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);

  const result = await page.evaluate(async () => {
    const token = localStorage.getItem('competitionAdminToken');
    const res = await fetch('https://event.roetix.com/api/admin/events/69dc71acbc364e3f89d9d6a9/vouchers', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  });

  await browser.close();

  const vouchers = result?.data?.vouchers || [];
  // Filter only IGNITE-generated codes: exactly 3 letters + 3 digits
  const igniteCodes = vouchers
    .filter(v => /^[A-Z]{3}[0-9]{3}$/.test(v.code))
    .sort((a, b) => a.code.localeCompare(b.code));

  const allCodes = vouchers
    .sort((a, b) => a.code.localeCompare(b.code));

  const statusSummary = {};
  vouchers.forEach(v => { statusSummary[v.status] = (statusSummary[v.status] || 0) + 1; });

  console.log(`\n📊 SUMMARY`);
  console.log(`   Total vouchers : ${vouchers.length}`);
  console.log(`   Status breakdown:`, statusSummary);
  console.log(`   IGNITE codes (ABC123 format): ${igniteCodes.length}`);

  // Save ALL codes (one per line)
  const allTxt = path.join(__dirname, 'VoucherCodes_ALL.txt');
  fs.writeFileSync(allTxt, allCodes.map(v => v.code).join('\n'), 'utf8');
  console.log(`\n✅ ALL codes saved → ${allTxt}`);

  // Save IGNITE-only codes
  const igniteTxt = path.join(__dirname, 'VoucherCodes_IGNITE.txt');
  fs.writeFileSync(igniteTxt, igniteCodes.map(v => v.code).join('\n'), 'utf8');
  console.log(`✅ IGNITE codes saved → ${igniteTxt}`);

  console.log('\n========= IGNITE CODES (copy-paste) =========');
  console.log(igniteCodes.map(v => v.code).join('\n'));
  console.log('=============================================');
  console.log(`Total: ${igniteCodes.length} codes`);
}

main().catch(console.error);
