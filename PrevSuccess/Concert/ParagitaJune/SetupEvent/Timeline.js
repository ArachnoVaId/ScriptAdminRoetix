// Paragita June - Sale Timelines
// Paste in browser console on Step 2 (Timelines) of the create wizard
// Run AFTER Step 1 script and clicking Next
const TIMELINES = [
  { name: 'Early Bird', start: '2026-05-04T00:00', end: '2026-05-06T23:59' },
  { name: 'Regular',    start: '2026-05-07T00:00', end: '2026-06-27T23:59' },
];
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
function fill(el, val) {
  if (!el) return console.warn('⚠ NOT FOUND for:', val);
  el.focus();
  if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function run() {
  console.log('%c═══ Step 2: Sale Timelines ═══', 'color:#6366f1;font-weight:bold');
  for (let i = 0; i < TIMELINES.length; i++) {
    const tl = TIMELINES[i];
    if (i > 0) {
      const addBtn = [...document.querySelectorAll('button')].find(b => b.textContent?.includes('Add Timeline'));
      if (addBtn) { addBtn.click(); await sleep(500); }
      else console.warn('Add Timeline button not found');
    }
    await sleep(400);
    const allNameInputs = [...document.querySelectorAll('input')].filter(el => el.placeholder?.includes('Timeline Name') || el.name?.includes('name'));
    if (allNameInputs[i]) {
      fill(allNameInputs[i], tl.name);
      console.log('✓ Timeline', i + 1, 'Name →', tl.name);
    } else {
      console.warn('⚠ Timeline', i + 1, 'name input not found');
    }
    const dtInputs = document.querySelectorAll('main input[type="datetime-local"]');
    const startIdx = i * 2;
    const endIdx = i * 2 + 1;
    if (dtInputs[startIdx]) {
      fill(dtInputs[startIdx], tl.start);
      console.log('✓ Timeline', i + 1, 'Start →', tl.start);
    } else {
      console.warn('⚠ Timeline', i + 1, 'start input not found');
    }
    if (dtInputs[endIdx]) {
      fill(dtInputs[endIdx], tl.end);
      console.log('✓ Timeline', i + 1, 'End →', tl.end);
    } else {
      console.warn('⚠ Timeline', i + 1, 'end input not found');
    }
    await sleep(500);
  }
  console.log('%c✅ Timelines completed!', 'color:#6366f1;font-weight:bold');
}
run();
