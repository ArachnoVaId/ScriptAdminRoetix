(async () => {
  const PRICES = {
    'Kioku Lantai 2 Timur':       { price: 100000, quota: 512 },
    'Kioku Lantai 2 Barat':       { price: 100000, quota: 370 },
    'Kizuna Lantai 1 Timur':      { price: 110000, quota: 167 },
    'Kizuna Lantai 1 Barat':      { price: 110000, quota: 167 },
    'Tomodachi Lantai 2 Utara':   { price: 125000, quota: 880 },
    'Tomodachi Lantai 2 Selatan': { price: 125000, quota: 915 },
    'Nakama Lantai 1 Utara':      { price: 135000, quota: 272 },
    'Nakama Lantai 1 Selatan':    { price: 135000, quota: 272 },
  };

  const TARGET_TIMELINE = 'Normal';

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function log(msg) { console.log(`[Pricing] ${msg}`); }

  function setInputValue(input, value) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, String(value));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Find the pricing table
  const h3s = [...document.querySelectorAll('h3')];
  const pricingH3 = h3s.find(h => h.textContent.includes('Pricing'));
  if (!pricingH3) { log('ERROR: Pricing section not found'); return; }

  const table = pricingH3.closest('div')?.querySelector('table');
  if (!table) { log('ERROR: Pricing table not found'); return; }

  // Get timeline headers
  const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  const timelineIndex = headers.indexOf(TARGET_TIMELINE);
  if (timelineIndex === -1) { log(`ERROR: Timeline "${TARGET_TIMELINE}" not found. Available: ${headers.join(', ')}`); return; }

  log(`Found timeline "${TARGET_TIMELINE}" at column ${timelineIndex}`);

  // Process each row
  const rows = table.querySelectorAll('tbody tr');
  let setCount = 0;

  for (const row of rows) {
    const badge = row.querySelector('span[style*="background-color"]');
    if (!badge) continue;

    const categoryName = badge.textContent.trim();
    const data = PRICES[categoryName];
    if (!data) { log(`  SKIP: ${categoryName} (no price defined)`); continue; }

    // Get the td cells (index 0 = category, then 1..n = timelines)
    const cells = row.querySelectorAll('td');
    const targetCell = cells[timelineIndex];
    if (!targetCell) { log(`  ERROR: No cell for ${categoryName} at timeline col ${timelineIndex}`); continue; }

    const inputs = targetCell.querySelectorAll('input[type="number"]');
    const priceInput = inputs[0];
    const quotaInput = inputs[1];

    if (!priceInput) { log(`  ERROR: No price input for ${categoryName}`); continue; }

    setInputValue(priceInput, data.price);
    await sleep(150);

    if (quotaInput) {
      setInputValue(quotaInput, data.quota);
      await sleep(150);
    }

    log(`  ${categoryName}: Rp${data.price.toLocaleString('id-ID')}, quota: ${data.quota}`);
    setCount++;
    await sleep(200);
  }

  log(`Set ${setCount} prices for "${TARGET_TIMELINE}".`);

  // Save
  await sleep(500);
  const saveBtn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Save Timelines');
  if (saveBtn && !saveBtn.disabled) {
    saveBtn.click();
    log('-> Save Timelines clicked');
  } else {
    log('-> Save Timelines button not found or disabled');
  }

  log('=== DONE! ===');
})();
