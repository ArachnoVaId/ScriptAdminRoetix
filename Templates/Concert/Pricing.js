// {{EVENT_NAME}} - Edit Page Filler (Categories + Pricing)
// Paste in browser console on /roetix-events/{id}/edit page
const CATEGORIES = [
{{CATEGORIES}}
];
const PRICING = [
{{PRICING_MATRIX}}
];
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
function fill(el, val) {
  if (!el) return false;
  el.scrollIntoView({ block: 'center' });
  el.focus();
  if (el.type === 'color') {
    setter?.call(el, val);
    el.value = val;
  } else if (setter) {
    setter.call(el, val);
  } else {
    el.value = val;
  }
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function findCategoryBlock(input) {
  let el = input;
  for (let i = 0; i < 10; i++) {
    el = el.parentElement;
    if (!el) return null;
    const hasColor = el.querySelector('input[type="color"]');
    const hasNum = el.querySelector('input[type="number"]');
    const colorCount = el.querySelectorAll('input[type="color"]').length;
    if (hasColor && colorCount === 1 && hasNum) return el;
  }
  return null;
}
async function run() {
  window.scrollTo(0, 0);
  await sleep(300);
  console.log('%c═══ Filling Ticket Categories ═══', 'color:#6366f1;font-weight:bold');
  const nameInputs = [...document.querySelectorAll('input[placeholder*="VIP"], input[placeholder*="Tribune"], input[placeholder*="Festival"]')];
  console.log('Name inputs found:', nameInputs.length);
  for (let i = 0; i < nameInputs.length && i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    const block = findCategoryBlock(nameInputs[i]);
    if (!block) {
      console.warn('⚠ Cat', i + 1, '- could not find isolated block');
      continue;
    }
    fill(nameInputs[i], cat.displayName);
    console.log('✓ Cat', i + 1, 'Name →', cat.displayName);
    const colorInput = block.querySelector('input[type="color"]');
    if (colorInput) {
      fill(colorInput, cat.color);
      console.log('✓ Cat', i + 1, 'Color →', cat.color);
    }
    const nums = block.querySelectorAll('input[type="number"]');
    if (nums.length > 0) {
      fill(nums[nums.length - 1], cat.quota);
      console.log('✓ Cat', i + 1, 'Quota →', cat.quota);
    }
    await sleep(100);
  }
  const saveCatBtn = [...document.querySelectorAll('button')].find(b => b.textContent?.includes('Save Categories'));
  if (saveCatBtn) { saveCatBtn.click(); console.log('✓ Save Categories clicked'); }
  await sleep(1500);
  console.log('%c═══ Filling Pricing Matrix ═══', 'color:#6366f1;font-weight:bold');
  const table = document.querySelector('table');
  if (!table) {
    console.log('No pricing table found');
    console.log('%c═══ Done (categories only) ═══', 'color:#f59e0b;font-weight:bold;font-size:13px');
    return;
  }
  table.scrollIntoView({ block: 'center' });
  await sleep(300);
  const rows = table.querySelectorAll('tbody tr');
  console.log('Pricing rows:', rows.length);
  for (let ri = 0; ri < rows.length && ri < PRICING.length; ri++) {
    const cells = rows[ri].querySelectorAll('td');
    let tlIdx = 0;
    for (let ci = 0; ci < cells.length && tlIdx < PRICING[ri].length; ci++) {
      const numInputs = cells[ci].querySelectorAll('input[type="number"]');
      if (numInputs.length >= 2) {
        const p = PRICING[ri][tlIdx];
        fill(numInputs[0], p.price);
        fill(numInputs[1], p.quota);
        console.log('✓ Cat', ri + 1, 'TL', tlIdx + 1, '→ Rp' + p.price, '/ Q:' + p.quota);
        tlIdx++;
      }
    }
  }
  await sleep(500);
  const saveTLBtn = [...document.querySelectorAll('button')].find(b => b.textContent?.includes('Save Timeline'));
  if (saveTLBtn) { saveTLBtn.click(); console.log('✓ Save Timelines clicked'); }
  console.log('%c═══ Done! ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
}
run();
