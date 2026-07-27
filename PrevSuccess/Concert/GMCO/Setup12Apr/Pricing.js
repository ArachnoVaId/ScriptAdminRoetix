// Grand Concert vol 12 - Edit Page Filler (Categories + Pricing)
// Paste in browser console on /roetix-events/{id}/edit page
const CATEGORIES = [
  { displayName: 'Nirvana',    color: '#8e7cc3', quota: '142' },
  { displayName: 'Punarjanma', color: '#e6b8af', quota: '246' },
  { displayName: 'Vimukti',    color: '#ead1dc', quota: '88'  },
  { displayName: 'Moksa',      color: '#ffd966', quota: '277' },
  { displayName: 'Anubhava',   color: '#c9daf8', quota: '166' },
  { displayName: 'Shunya',     color: '#93c47d', quota: '125' },
];
const PRICING = [
  [ { price: '200000', quota: '46'  }, { price: '175000', quota: '22' }, { price: '190000', quota: '30' }, { price: '200000', quota: '44' } ],
  [ { price: '185000', quota: '76'  }, { price: '155000', quota: '36' }, { price: '170000', quota: '58' }, { price: '185000', quota: '76' } ],
  [ { price: '165000', quota: '33'  }, { price: '135000', quota: '23' }, { price: '150000', quota: '22' }, { price: '165000', quota: '10' } ],
  [ { price: '135000', quota: '92'  }, { price: '105000', quota: '22' }, { price: '120000', quota: '70' }, { price: '135000', quota: '93' } ],
  [ { price: '110000', quota: '30'  }, { price: '85000',  quota: '47' }, { price: '95000',  quota: '60' }, { price: '110000', quota: '29' } ],
  [ { price: '85000',  quota: '30'  }, { price: '65000',  quota: '25' }, { price: '70000',  quota: '41' }, { price: '85000',  quota: '29' } ],
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
// Walk up from an element just enough to find the nearest container
// that has a color picker - that's the category's own block
function findCategoryBlock(input) {
  let el = input;
  for (let i = 0; i < 10; i++) {
    el = el.parentElement;
    if (!el) return null;
    // A category block has: 1 color input + at least 1 number input
    const hasColor = el.querySelector('input[type="color"]');
    const hasNum = el.querySelector('input[type="number"]');
    // But check it doesn't have MORE than one color (that would be the shared parent)
    const colorCount = el.querySelectorAll('input[type="color"]').length;
    if (hasColor && colorCount === 1 && hasNum) return el;
  }
  return null;
}
async function run() {
  window.scrollTo(0, 0);
  await sleep(300);
  // ═══ PART 1: TICKET CATEGORIES ═══
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
  // ═══ PART 2: PRICING TABLE ═══
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


