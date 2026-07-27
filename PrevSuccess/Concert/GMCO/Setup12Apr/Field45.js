const BASE_FIELDS = [
  { name: 'nama_lengkap',    label: 'Nama Lengkap',           type: 'Text' },
  { name: 'email',           label: 'Email',                  type: 'Email' },
  { name: 'no_wa',           label: 'Nomer WA',               type: 'Phone' },
  { name: 'nama_tim',        label: 'Nama Tim',               type: 'Text' },
  { name: 'alamat_domisili', label: 'Alamat Domisili',        type: 'Text' },
  { name: 'urgent_number',   label: 'Nomor Kontak Darurat',   type: 'Phone' },
  { name: 'urgent_name',     label: 'Nama Kontak Darurat',    type: 'Text' },
  { name: 'golongan_darah',  label: 'Golongan Darah',         type: 'Select', options: 'A, B, AB, O' },
  { name: 'riwayat_sakit',   label: 'Riwayat Penyakit',       type: 'Text' },
];

const FIELDS = [];
for (let i = 1; i <= 5; i++) {
  for (const f of BASE_FIELDS) {
    FIELDS.push({
      name: `${f.name}_anggota_${i}`,
      label: `${f.label} Anggota ${i}`,
      type: f.type,
    });
  }
}

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
    console.log('✓ Field', i + 1, `(${field.name})`, 'Name →', field.name);
    fill(inputs[1], field.label);
    console.log('✓ Field', i + 1, `(${field.name})`, 'Label →', field.label);
    const sel = inputs[2];
    const match = [...sel.options].find(o => o.text === field.type);
    if (match) {
      sel.value = match.value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('✓ Field', i + 1, `(${field.name})`, 'Type →', field.type);
    }
    await sleep(300);
    if (field.options) {
      const optionsInput = row.querySelector('textarea, input:not([type])') ?? [...row.querySelectorAll('input')].find((_, idx) => idx >= 3);
      if (optionsInput) {
        fill(optionsInput, field.options);
        console.log('✓ Field', i + 1, `(${field.name})`, 'Options →', field.options);
      }
    }
    await sleep(200);
    const requiredLabel = [...row.querySelectorAll('label')].find(l => l.textContent?.trim() === 'Required');
    if (requiredLabel) {
      const cb = requiredLabel.querySelector('input[type="checkbox"]');
      if (cb) {
        const isMember1 = i < 9;
        if (isMember1 && !cb.checked) { cb.click(); }
        else if (!isMember1 && cb.checked) { cb.click(); }
      }
    }
  }
  console.log('%c═══ Done! 45 fields filled. Click "Save Form Fields" to save ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
}
run();
