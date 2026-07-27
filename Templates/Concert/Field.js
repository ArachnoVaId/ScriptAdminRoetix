// {{EVENT_NAME}} - Step 3: Registration Form Fields
// Paste in browser console on the Registration Form step of the create wizard
const FIELDS = [
{{FORM_FIELDS}}
];
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function fill(el, val) {
  if (!el) return;
  el.focus();
  if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
async function run() {
  console.log('%c═══ Registration Form Fields ═══', 'color:#6366f1;font-weight:bold');
  const sections = document.querySelectorAll('section');
  let section = null;
  for (const sec of sections) {
    const h = sec.querySelector('h1, h2, h3, h4');
    if (h?.textContent?.trim() === 'Registration Form') { section = sec; break; }
  }
  if (!section) { console.error('Registration Form section not found'); return; }
  const addBtn = [...section.querySelectorAll('button')].find(b => b.textContent?.includes('Add Field'));
  console.log('Add Field button:', !!addBtn);
  for (let i = 0; i < FIELDS.length; i++) {
    const container = section.querySelector('.space-y-3');
    const existingRows = container ? container.children.length : 0;
    if (i >= existingRows) {
      addBtn?.click();
      await sleep(600);
    }
    const rows = section.querySelectorAll('.space-y-3')[0]?.children;
    if (!rows || !rows[i]) { console.warn('⚠ Row', i + 1, 'not created'); continue; }
    const row = rows[i];
    const inputs = row.querySelectorAll('input, select');
    const field = FIELDS[i];
    fill(inputs[0], field.name);
    console.log('✓ Field', i + 1, 'Name →', field.name);
    fill(inputs[1], field.label);
    console.log('✓ Field', i + 1, 'Label →', field.label);
    const sel = inputs[2];
    const match = [...sel.options].find(o => o.text === field.type);
    if (match) {
      sel.value = match.value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('✓ Field', i + 1, 'Type →', field.type);
    }
    await sleep(200);
  }
  console.log('%c═══ Done! Click "Save Form Fields" to save ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
}
run();
