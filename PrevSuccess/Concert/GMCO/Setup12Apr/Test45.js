const TEST_DATA = [
  { name: 'Nama Lengkap',           values: ['Ahmad Fauzi', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Lestari', 'Rudi Hartono'] },
  { name: 'Email',                  values: ['ahmad@mail.com', 'siti@mail.com', 'budi@mail.com', 'dewi@mail.com', 'rudi@mail.com'] },
  { name: 'Nomer WA',               values: ['81234567891', '81234567892', '81234567893', '81234567894', '81234567895'] },
  { name: 'Nama Tim',               values: ['Garuda Muda', 'Garuda Muda', 'Garuda Muda', 'Garuda Muda', 'Garuda Muda'] },
  { name: 'Alamat Domisili',        values: ['Jl. Merdeka No.1', 'Jl. Sudirman No.2', 'Jl. Thamrin No.3', 'Jl. Gatot No.4', 'Jl. Ahmad No.5'] },
  { name: 'Nomor Kontak Darurat',   values: ['87654321091', '87654321092', '87654321093', '87654321094', '87654321095'] },
  { name: 'Nama Kontak Darurat',    values: ['Orang Tua 1', 'Orang Tua 2', 'Orang Tua 3', 'Orang Tua 4', 'Orang Tua 5'] },
  { name: 'Golongan Darah',         values: ['A', 'B', 'O', 'AB', 'A'] },
  { name: 'Riwayat Penyakit',       values: ['Tidak Ada', 'Asma', 'Tidak Ada', 'Hipertensi', 'Tidak Ada'] },
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
  console.log('%c═══ Testing: Fill 45 Fields with Sample Data ═══', 'color:#f59e0b;font-weight:bold');
  const tickets = [...document.querySelectorAll('h3')].filter(h => h.textContent.trim() === 'Ticket 1').map(h => h.closest('.bg-white'));
  console.log(`Found ${tickets.length} Ticket 1 container(s)`);
  for (let t = 0; t < tickets.length; t++) {
    const grids = tickets[t].querySelectorAll('.grid');
    console.log(`%c═══ Ticket ${t + 1} (${grids.length} person sections) ═══`, 'color:#3b82f6;font-weight:bold');
    for (let a = 0; a < grids.length; a++) {
      const fields = [...grids[a].querySelectorAll(':scope > div')];
      for (let f = 0; f < fields.length; f++) {
        const wrapper = fields[f];
        const val = TEST_DATA[f].values[a];
        const phoneGroup = wrapper.querySelector('.flex');
        const input = phoneGroup ? phoneGroup.querySelector('input[type="tel"]') : wrapper.querySelector('input');
        if (input) fill(input, val);
        console.log(`✓ Ticket ${t + 1}, Person ${a + 1}, ${TEST_DATA[f].name} → ${val}`);
        await sleep(80);
      }
    }
  }
  console.log('%c═══ Done! All fields filled ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
}
run();
