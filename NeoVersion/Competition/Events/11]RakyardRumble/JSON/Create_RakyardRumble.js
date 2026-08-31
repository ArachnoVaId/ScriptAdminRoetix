// NEW ADMIN UI (admin.roetix.com/events/create) - Rakyard Rumble - Boxing Amateur Championship
// Companion doc: ../../NewAdminUI/README.md (DOM notes) + ../RAW_RakyardRumbe.txt (data source) +
// ../INTAKE_GAPS_RakyardRumble.md (open gaps - masih ada beberapa yang belum final, lihat DUMMY BUILD di bawah)
//
// !!! INI DUMMY/TEST BUILD, BUKAN DATA FINAL - lihat instruksi user 2026-08-27 !!!
//   - Harga (TIME_PRICE) sengaja diset Rp1.000, BUKAN harga asli Rp350.000 (dari RAW) - buat testing platform saja.
//   - Timeline pendaftaran diset "kemarin s/d 3 Oktober" (dummy window) - TANGGAL BUKA/TUTUP PENDAFTARAN ASLI
//     BELUM PERNAH DIKONFIRMASI CLIENT (lihat INTAKE_GAPS C3) - WAJIB diganti sebelum build event produksi.
//   - Service fee & tax diset 0 (belum ada info asli dari client - INTAKE_GAPS E3/E4).
//   - Metode pembayaran (INTAKE_GAPS E5) juga belum ada - tidak relevan untuk script (Step 4 Time-Price cuma
//     angka fee/tax, bukan teks instruksi bank), tapi WAJIB dilengkapi manual di deskripsi/completion sebelum live.
//
// KEPUTUSAN atas ambiguitas data (dikonfirmasi user 2026-08-27):
//   1. Slug Event ID: 'rakyardrumble' (dikonfirmasi user, bukan tebakan).
//   2. Organizer: 'SADA Sport' (dikonfirmasi user - RAW sempat inkonsisten dengan 'SADA Sports').
//   3. "Section 6" di RAW memang TIDAK ADA (dikonfirmasi user: kelewatan pas transkrip, bukan section
//      tersembunyi) - script ini pakai 6 section total: T&C (info-only), Form Registrasi, Riwayat
//      Pengalaman, Pemilihan Kelas Tinju, Data Cornerman, Dokumen Pendukung. Tidak ada section bernomor 6.
//   4. Field "Jenis Kelamin" CUMA 1 opsi 'Laki - laki' (dikonfirmasi user - event ini memang khusus laki-laki,
//      bukan opsi yang kelewatan pas transkrip).
//   5. Link "Contoh Video Shadow Boxing" & "Surat Pernyataan Kesediaan Bertanding" (dikirim user 2026-08-27)
//      dimasukkan sebagai bagian description masing-masing field. "Surat Pernyataan Kesediaan Bertanding"
//      ditempatkan sebagai field TERAKHIR di section "Dokumen Pendukung" (digabung dengan field dokumen
//      lainnya) - posisinya di RAW ambigu (muncul setelah teks Section 8/Penutup), ini asumsi penempatan
//      terbaik, PERIKSA MANUAL kalau ternyata seharusnya section/posisi lain.
//   6. Ambiguitas hari tanding (acara 3-4 Okt tapi T&C cuma sebut "Minggu, tanggal 4"): user bilang "keep it
//      like tnc" - TIDAK ditambah field pemilihan hari, kalimat T&C dipakai apa adanya persis seperti RAW.
//   7. Nama Event BELUM dikonfirmasi eksplisit oleh client - RAW punya 3 variasi ("RAKYARD RUMBLE - Boxing
//      Amateur Championship" / "Rakyard Rumble by SADA Sport" / "Rakyard Rumble by SADA Sports"). Script ini
//      pakai judul form asli "RAKYARD RUMBLE - Boxing Amateur Championship" sebagai best guess - KONFIRMASI
//      ke client sebelum build event produksi (final, bukan dummy).
//   8. Teks deskripsi (EVENT_DESCRIPTION) dibiarkan pakai harga asli "Rp 350.000" apa adanya dari RAW (bukan
//      Rp1.000 dummy) - cuma field TIME_PRICE fungsional yang di-dummy-kan, copy marketing tidak diubah.
//      Penyebutan organizer di teks description dirapikan jadi konsisten 'SADA Sport' (RAW aslinya inkonsisten).
//
// 1. Login admin.roetix.com, go to /events, click "Create Event" (fresh, empty wizard).
// 2. Verifikasi draft BENAR-BENAR kosong dulu (lihat README.md - localStorage['roetix:competition-draft']).
// 3. Paste this whole script in the browser console and press Enter.
// 4. Script fills Step 1 Identity -> Step 2 States (dilihat saja, tidak diubah) -> Step 4 Chrononomics
//    (Phase/Section/Field -> Timeline -> Time-Price) -> Step 5 Completion, lalu jumps ke Step 7 Review.
// 5. Nothing is saved until you manually click "Create event" - script does NOT click it.
// 6. If the console prints "Not ready to finish" instead of "Everything looks good", check for duplicate
//    field keys (see README) before submitting.

var EVENT_DESCRIPTION = [
  'Halo Fighters!',
  '',
  'Untuk pertama kalinya, Rakyard Rumble by SADA Sport hadir buat jadi panggung bagi petarung-petarung amatir Boxing terbaik Indonesia. Aksi kalian bakal disaksikan langsung oleh 1.000 penonton!',
  '',
  'Venue Pertandingan: Ring berukuran 7x8 Meter',
  'Event     : Rakyard Rumble by SADA Sport',
  'Tanggal : 3-4 Oktober 2026',
  'Lokasi.  : Bengkel Space - SCBD',
  '',
  'Biaya Registrasi: Rp 350.000',
  '',
  'What Will You Get:',
  '',
  'HADIAH UANG TUNAI untuk Best Fighter & Best Enterance.',
  'MEDALI eksklusif untuk para pemenang.',
  'JERSEY & CELANA tanding khusus.',
  '2 ID CARD untuk 2 cornerman fighter.',
  'Khusus Best Boxer, dapetin kesempatan training langsung bareng PERBATI plus sertifikat prestasi resmi.',
  'Naik ring, tunjukkin skill terbaikmu, dan jadi bagian dari Rakyard Rumble!',
  '',
  'Isi form registrasi di bawah ini buat daftar jadi fighter!'
].join('\n');

var TNC_TEXT = [
  'Anda diwajibkan membaca dan memahami syarat & ketentuan pendaftaran Rakyard Rumble di bawah ini!',
  '',
  'Dengan mengisi formulir ini, saya selaku PESERTA/PENDAFTAR menyatakan telah membaca, memahami, dan menyetujui seluruh syarat & ketentuan pendaftaran Rakyard Rumble sebagai berikut:',
  '',
  '- Saya siap dan bersedia bertanding pada salah satu hari pelaksanaan, yaitu Minggu, tanggal 4.',
  '- Seluruh data yang saya isi dalam formulir pendaftaran ini adalah benar dan dapat dipertanggungjawabkan.',
  '- Saya memahami bahwa sejumlah pertandingan dapat berlangsung bersamaan dengan rangkaian acara/hiburan lain di venue.',
  '',
  'Ketentuan Refund',
  '1. Peserta yang berhalangan hadir karena sakit keras atau cedera, dengan melampirkan surat keterangan dokter dan menginformasikan panitia maksimal H-14 sebelum acara, berhak menerima refund sebesar 100%.',
  '2. Peserta yang berhalangan hadir karena anggota keluarga inti atau dirinya sendiri meninggal dunia, dengan menginformasikan kondisi tersebut kepada panitia paling lambat pada hari-H pertandingan, berhak menerima refund sebesar 100%.',
  'Di luar dua kondisi pada poin 1 dan 2, pendaftar tidak berhak atas pengembalian dana (refund) dalam bentuk apa pun.'
].join('\n');

var IDENTITY = {
  eventName: 'RAKYARD RUMBLE - Boxing Amateur Championship', // BELUM dikonfirmasi client, lihat catatan #7 di atas
  eventId: 'rakyardrumble',
  organizerName: 'SADA Sport',
  description: EVENT_DESCRIPTION
};

// DUMMY window (instruksi user 2026-08-27) - GANTI ke tanggal asli sebelum build event produksi (INTAKE_GAPS C3).
var PHASE = { name: 'Registration', start: '2026-08-26T00:00', end: '2026-10-03T23:59' };
var TIMELINE = { name: 'Registration', start: PHASE.start, end: PHASE.end };

// DUMMY price (instruksi user 2026-08-27) - harga asli Rp350.000, fee & tax asli belum ada info (INTAKE_GAPS E3/E4).
var TIME_PRICE = { price: 1000, feeType: 'flat', fee: 0, taxType: 'flat', tax: 0 };

var COMPLETION_MESSAGE = [
  'Jika sudah mengisi form pendaftaran, maka dapat melakukan pembayaran biaya registrasi',
  'Kemudian dapat menghubungi salah satu channel komunikasi untuk konfirmasi ulang pendaftaran :',
  '1. Direct Message (DM) Instagram @sadasport.id',
  '2. Whatsapp Admin Rakyard Rumble : 081295999300',
  '',
  'Mohon ditunggu. Kami akan memproses dan men-validasi dokumen anda.'
].join('\n');

var SECTIONS = [
  {
    title: 'Terms & Condition - Pendaftaran Fight RAKYARD RUMBLE',
    description: TNC_TEXT,
    fields: []
  },
  {
    title: 'Form Registrasi Fight RAKYARD RUMBLE',
    fields: [
      { label: 'Nama Lengkap', type: 'text', required: true },
      { label: 'Umur', type: 'number', required: true },
      { label: 'Jenis Kelamin', type: 'multiple_choice', required: true, options: ['Laki - laki'] },
      { label: 'Asal Universitas', type: 'text', required: false, description: 'Jika tidak ada silahkan dikosongkan' },
      { label: 'Nomor Whatsapp', type: 'phone', required: true, description: 'Mohon berikan nomor yang bisa dihubungi oleh team RAKYARD RUMBLE' },
      { label: 'Username Instagram', type: 'text', required: true, description: 'Mohon untuk tidak men-private IG, untuk mempermudah proses validasi' }
    ]
  },
  {
    title: 'Riwayat Pengalaman Pertandingan Individu',
    fields: [
      { label: 'Pengalaman tanding individu', type: 'multiple_choice', required: true,
        description: 'Mohon berikan pengalaman tanding anda',
        options: ['Debut (belum pernah bertanding - 3 kali)', 'Amatir (sudah pernah bertanding diatas 3 kali)'] },
      { label: 'Riwayat Cedera atau Riwayat medis lainnya', type: 'text', required: false, description: 'Jika tidak ada silahkan dikosongkan' },
      { label: 'Berasal dari camp/sasana mana kah anda?', type: 'text', required: false, description: 'Jika tidak ada silahkan dikosongkan' }
    ]
  },
  {
    title: 'Pemilihan Golongan Kelas Tinju',
    fields: [
      { label: 'Kelas Berat Tinju', type: 'multiple_choice', required: true,
        description: 'Mohon isi dengan kelas berat yang anda ingin ikuti',
        options: [
          'Super Heavyweight (92 kg+)', 'Heavyweight (86-92 kg)', 'Cruiserweight (80-86 kg)',
          'Light Heavyweight (75-80 kg)', 'Middleweight (71-75 kg)', 'Light Middleweight (67-71 kg)',
          'Welterweight (63,5-67 kg)', 'Lightweight (60-63,5 kg)', 'Featherweight (57-60 kg)',
          'Bantamweight (54-57 kg)', 'Flyweight (51-54 kg)', 'Light Flyweight (below 51kg)'
        ] }
    ]
  },
  {
    title: 'Data Cornerman',
    description: 'Para fighters berhak mendapatkan 2 access tambahan untuk 2 cornerman. Harap mengisi data cornerman',
    fields: [
      { label: 'Nama Cornerman 1', type: 'text', required: true },
      { label: 'Nama Cornerman 2', type: 'text', required: true }
    ]
  },
  {
    title: 'Dokumen Pendukung',
    description: 'Bagi yang sudah memiliki KTP (Kartu Tanda Penduduk) maka mohon diisi menggunakan KTP\n\nBagi yang belum memiliki KTP, dapat mengisi dengan KK (Kartu Keluarga)',
    fields: [
      { label: 'Nomor KTP/KK', type: 'text', required: true },
      { label: 'Berat badan dalam KILOGRAM (KG)', type: 'number', required: true },
      { label: 'Tinggi badan dalam Centimeter (CM)', type: 'number', required: true },
      { label: 'Ukuran baju (untuk pertandingan)', type: 'multiple_choice', required: true, options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Foto KTP/KK', type: 'file', required: true, description: 'Upload 1 file (Image), maks 100 MB.' },
      { label: 'Link video Shadow Boxing/Tanding', type: 'link', required: true,
        description: 'Contoh Video Shadow Boxing: https://drive.google.com/file/d/1ZvlUJAdT83v4HsDgyBVqp8O7lR5bI7eK/view?usp=sharing\n\nCara upload foto ke Google Drive:\n1. Punya akun Gmail/Google\n2. Buka Google Drive\n3. Upload foto KTP/KK dan Video Shadow Boxing\n4. Share Link yang bisa diakses semua orang' },
      { label: 'Surat Pernyataan Kesediaan Bertanding', type: 'link', required: true,
        description: 'Mohon mengisi surat pernyataan dan ditanda tangani menggunakan materai. Template surat: https://docs.google.com/document/d/15Sru32O1VdRs_IJ0Qx4zn-v1J8LlmGCBuVfyr6U1Gps/edit?usp=sharing' }
    ]
  }
];

var TOTAL_FIELDS = SECTIONS.reduce(function (n, s) { return n + s.fields.length; }, 0);

// ===================== ENGINE (lihat NewAdminUI/README.md untuk alasan tiap trik) =====================

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

var _inputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
var _selectSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;

function fillInput(el, val) {
  el.focus();
  _inputSetter.call(el, val);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
function fillSelect(el, val) {
  _selectSetter.call(el, val);
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
function fillEditable(el, text) {
  el.focus();
  document.execCommand('insertText', false, text);
}
function clickCheckbox(el, wantChecked) {
  if (!!el.checked !== !!wantChecked) el.click();
}
function clickByText(tag, text) {
  var el = Array.from(document.querySelectorAll(tag)).find(function (b) { return b.textContent.trim() === text; });
  if (!el) { console.warn('NOT FOUND: <' + tag + '> "' + text + '"'); return null; }
  el.click();
  return el;
}

// ===================== STEP 1 - IDENTITY =====================

async function fillIdentity(cfg) {
  console.log('%c=== Step 1: Identity ===', 'color:#6366f1;font-weight:bold');
  var identityAlreadyRendered = Array.from(document.querySelectorAll('input')).some(function (i) { return i.type === 'text'; });
  if (!identityAlreadyRendered) {
    clickByText('button', '1Identity');
    await sleep(400);
  }

  var allInputs = Array.from(document.querySelectorAll('input'));
  var eventNameInput = allInputs.filter(function (i) { return i.type === 'text'; })[0];
  var eventIdInput = allInputs.filter(function (i) { return i.type === 'text'; })[1];
  var organizerInput = allInputs.filter(function (i) { return i.type === 'text'; })[2];
  var editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
}

// ===================== STEP 2 - STATES (dilihat saja, tidak diubah - lihat INTAKE_GAPS B1-B5) =====================

async function visitStates() {
  console.log('%c=== Step 2: States (TIDAK diubah - B1-B5 belum dikonfirmasi client, lihat INTAKE_GAPS) ===', 'color:#f59e0b;font-weight:bold');
  clickByText('button', '2States');
  await sleep(300);
  console.log('Default platform dipakai apa adanya: Active ON, Featured OFF, Team size OFF (individual), Referral codes OFF, Detailed pricing OFF. PERIKSA MANUAL kalau client minta beda.');
}

// ===================== STEP 4 - PHASE =====================

async function fillPhase(cfg) {
  console.log('%c=== Step 4: Chrononomics > Phase ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '4Chrononomics');
  await sleep(300);
  clickByText('button', 'Phase');
  await sleep(300);

  var addPhaseBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Phase'; });
  if (addPhaseBtn) { addPhaseBtn.click(); await sleep(400); }

  var nameInput = Array.from(document.querySelectorAll('input')).find(function (i) { return i.type === 'text' && i.placeholder === 'New Phase'; });
  var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
  fillInput(nameInput, cfg.name);
  fillInput(dt[dt.length - 2], cfg.start);
  fillInput(dt[dt.length - 1], cfg.end);
  console.log('Phase:', cfg.name, cfg.start, '->', cfg.end);
}

// ===================== STEP 4 - SECTIONS + FIELDS =====================

async function addSectionsAndFields(sections, expectedBaseline) {
  var existingSectionTitles = Array.from(document.querySelectorAll('input[placeholder="Section title"]'));
  if (existingSectionTitles.length !== expectedBaseline) {
    console.error('%cSTOP: ada ' + existingSectionTitles.length + ' section title input di DOM sekarang, diharapkan tepat ' + expectedBaseline + '. Kemungkinan draft lama belum di-reset - PERIKSA LAYAR sebelum lanjut apa pun.', 'color:#ef4444;font-weight:bold;font-size:13px');
    throw new Error('Aborted: unexpected section count (' + existingSectionTitles.length + ' != ' + expectedBaseline + '), see console message above.');
  }

  console.log('%c=== Adding ' + sections.length + ' sections ===', 'color:#6366f1;font-weight:bold');

  for (var s = 0; s < sections.length; s++) {
    var addSectionBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add section'; });
    if (!addSectionBtn) { console.error('STOP: tombol "Add section" tidak ditemukan untuk section ke-' + (s + 1) + '. Isi manual sisanya.'); return false; }
    addSectionBtn.click();
    await sleep(400);

    var titleInputs = Array.from(document.querySelectorAll('input')).filter(function (i) { return i.type === 'text' && i.placeholder === 'Section title'; });
    var descEditables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
    fillInput(titleInputs[titleInputs.length - 1], sections[s].title);
    if (sections[s].description) fillEditable(descEditables[descEditables.length - 1], sections[s].description);
    console.log('  Section ' + (s + 1) + ': ' + sections[s].title + (sections[s].fields.length ? '' : ' (info-only, tanpa field)'));
    await sleep(200);
  }

  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    if (!section.fields.length) continue;
    console.log('%c-- Fields for "' + section.title + '" (' + section.fields.length + ') --', 'color:#8b5cf6');

    for (var fi = 0; fi < section.fields.length; fi++) {
      var addFieldBtns = Array.from(document.querySelectorAll('button')).filter(function (b) { return b.textContent.trim() === 'Add field'; });
      var addFieldBtn = addFieldBtns[si];
      if (!addFieldBtn) { console.error('Add field button not found for section index ' + si); continue; }
      var container = addFieldBtn.parentElement;

      addFieldBtn.click();
      await sleep(350);

      var fieldEls = Array.from(container.querySelectorAll(':scope > div.group'));
      var newField = fieldEls[fieldEls.length - 1];
      newField.click(); // expand (collapsed by default)
      await sleep(350);

      var field = section.fields[fi];
      var editables = Array.from(newField.querySelectorAll('[contenteditable="true"]'));
      var selects = Array.from(newField.querySelectorAll('select'));

      fillEditable(editables[0], field.label);
      await sleep(150);

      if (field.type !== 'text') {
        fillSelect(selects[0], field.type);
        await sleep(250);
      }

      if (field.description) {
        fillEditable(editables[1], field.description);
        await sleep(150);
      }

      if (field.type === 'multiple_choice' && field.options && field.options.length) {
        var addOptionBtn = Array.from(newField.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add option'; });
        for (var oi = 1; oi < field.options.length; oi++) {
          if (addOptionBtn) { addOptionBtn.click(); await sleep(250); }
        }
        var optionInputs = Array.from(newField.querySelectorAll('input')).filter(function (i) { return i.type === 'text'; });
        field.options.forEach(function (opt, idx) {
          if (optionInputs[idx]) fillInput(optionInputs[idx], opt);
        });
        console.log('    options: ' + field.options.join(' | '));
        await sleep(150);
      }

      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      if (field.required && checkboxes.length) clickCheckbox(checkboxes[checkboxes.length - 1], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
  return true;
}

// ===================== STEP 4 - TIMELINE =====================

async function fillTimeline(cfg) {
  console.log('%c=== Step 4: Chrononomics > Timeline ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Timeline');
  await sleep(300);

  var addTimelineBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Timeline'; });
  addTimelineBtn.click();
  await sleep(400);

  var nameInput = Array.from(document.querySelectorAll('input')).find(function (i) { return i.type === 'text' && i.placeholder === 'New Timeline'; });
  var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
  fillInput(nameInput, cfg.name);
  fillInput(dt[dt.length - 2], cfg.start);
  fillInput(dt[dt.length - 1], cfg.end);
  console.log('Timeline:', cfg.name, cfg.start, '->', cfg.end);
}

// ===================== STEP 4 - TIME-PRICE (single Phase x single Timeline) =====================

async function fillTimePrice(cfg) {
  console.log('%c=== Step 4: Chrononomics > Time-Price ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Time-Price');
  await sleep(400);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  var selects = Array.from(document.querySelectorAll('select'));

  fillInput(numberInputs[0], String(cfg.price));
  fillSelect(selects[0], cfg.feeType);
  fillInput(numberInputs[1], String(cfg.fee));
  fillSelect(selects[1], cfg.taxType);
  fillInput(numberInputs[2], String(cfg.tax));
  console.log('Price:', cfg.price, '| fee:', cfg.feeType, cfg.fee, '| tax:', cfg.taxType, cfg.tax);
}

// ===================== STEP 5 - COMPLETION =====================

async function fillCompletion(message) {
  console.log('%c=== Step 5: Completion ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '5Completion');
  await sleep(400);
  var editable = document.querySelector('[contenteditable="true"]');
  fillEditable(editable, message);
  console.log('Completion message set.');
}

// ===================== STEP 7 - REVIEW (report only, never auto-submits) =====================

async function reportReview() {
  console.log('%c=== Step 7: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review');
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Ini DUMMY BUILD (harga Rp1.000, tanggal dummy) - jangan lupa cek ulang catatan di header file sebelum klik "Create event".'
    : '%cNOT READY -> check for duplicate field keys or missing data.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ ' + IDENTITY.eventName + ' (DUMMY BUILD, ' + TOTAL_FIELDS + ' field) ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  try {
    await fillIdentity(IDENTITY);
    await visitStates();
    await fillPhase(PHASE);
    var sectionsOk = await addSectionsAndFields(SECTIONS, 0);
    if (!sectionsOk) return;
    await fillTimeline(TIMELINE);
    await fillTimePrice(TIME_PRICE);
    await fillCompletion(COMPLETION_MESSAGE);
    await reportReview();
    console.log('%cDone. Nothing is saved yet - review Step 7, lalu klik "Create event" manual. INGAT: ini dummy build (Rp1.000, tanggal dummy).', 'color:#22c55e;font-weight:bold');
  } catch (err) {
    console.error('%cBERHENTI: ' + err.message, 'color:#ef4444;font-weight:bold');
  }
})();
