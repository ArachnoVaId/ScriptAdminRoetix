// NEW ADMIN UI (admin.roetix.com/events/create) - INDUSTRIAL FAIR 2026 - INFAIR Seminar 2026
// Companion doc: ../../NewAdminUI/README.md (catatan DOM).
// Engine: sama dengan ./Create_IndustrialFair2026_CompanyVisit.js dan ../../LUMINUX2.0/JSON/*
//   (1 Phase x 1 Timeline + pre-flight cek draft + guard STOP per step), mekanisme Options versi baru
//   dari ../../StudentPreneur26/JSON/Create_UISP2026_BMCC.js.
// Data source: ../RAW_Context_GrandSeminar.txt (hasil ekstraksi Google Form)
//
// CARA PAKAI
// 1. Login admin.roetix.com, buka /events, klik "Create Event" (wizard fresh & KOSONG).
//    Kalau ragu wizard masih kebawa draft lama, jalankan dulu di console:
//      localStorage.removeItem('roetix:competition-draft'); location.reload();
//    JANGAN localStorage.clear() - itu ikut menghapus session login (README).
// 2. Paste seluruh script ini di console, Enter.
// 3. Script mengisi Step 1 Identity -> Step 2 States -> Step 4 Phase/Section/Field/Timeline/Time-Price
//    -> Step 5 Completion, lalu lompat ke Step 7 Review dan mencetak status kesiapan.
// 4. TIDAK ADA yang tersimpan sampai kamu sendiri klik "Create event". Script tidak pernah mengkliknya.
//
// !!! WAJIB DIISI/DICEK SEBELUM RUN - 4 data ini TIDAK ADA di RAW, jadi TIDAK saya karang !!!
//   a. HARGA. RAW_Context_GrandSeminar.txt tidak menyebut biaya, fee, maupun metode pembayaran sama
//      sekali - syarat masuknya cuma follow/tag/repost Instagram. TIME_PRICE di bawah di-set GRATIS
//      (price 0, fee 0), itu tebakan paling aman untuk seminar, BUKAN fakta dari sumber. Kalau
//      ternyata berbayar, isi HARGA_PESERTA + FEE_ROETIX dan tentukan dulu skemanya:
//        ON-TOP (PORFIS/COMMSPACE/SRD/UISP): price = harga panitia, fee ditambahkan -> peserta bayar price + fee
//        INKLUSIF (SilverParade/LUMINUX):    price = harga poster - fee -> peserta bayar persis harga poster
//   b. TANGGAL PENDAFTARAN - SUDAH DIKONFIRMASI PANITIA (2026-09-03): Open Registration
//      7 - 20 September 2026. Bukan lagi asumsi. (Acara sendiri Rabu, 23 September 2026.)
//   c. LINK GRUP WHATSAPP - MASIH BELUM ADA. Ditanyakan ke panitia 2026-09-03, jawabannya "-"
//      (belum tersedia). Di COMPLETION_MESSAGE masih placeholder, DAN ini langkah wajib peserta
//      ("IMPORTANT NEXT STEP"), jadi harus diisi sebelum event dipublikasikan. Tagih ke panitia.
//   d. LINK FEEDS INSTAGRAM (untuk syarat Tag 3 orang & Repost story) - MASIH BELUM ADA. Ditanyakan
//      ke panitia 2026-09-03, jawabannya "-" (belum tersedia). Masih placeholder di description
//      Section "Registration Requirements". Tagih ke panitia.
//
// KEPUTUSAN atas sumber (didokumentasikan, bukan diam-diam):
//   1. Section 2 dan Section 3 di RAW DIGABUNG jadi satu section "Participant Information". Keduanya
//      punya JUDUL dan DESKRIPSI yang identik di RAW - terpisah di Google Form semata-mata karena
//      branching ("Where Are You From?" mengarahkan ke halaman berikutnya). New Admin UI tidak punya
//      conditional logic dan dua section berjudul sama cuma bikin bingung, jadi field-nya dijadikan
//      satu dengan urutan RAW dipertahankan (Where Are You From? tetap field pertama).
//   2. Section 5 "You're All Set, Infairians!" di RAW BUKAN section berisi field - RAW sendiri
//      menandainya "_Info-only section (tanpa field)_". Isinya teks yang muncul SETELAH formulir
//      dikirim, jadi dipakai sebagai COMPLETION_MESSAGE (Step 5), bukan section di Step 4.
//   3. NIM tetap WAJIB sesuai RAW, walau ada opsi peserta "Eksternal" yang mungkin tidak punya NIM
//      berformat UPN. Tipenya text, jadi peserta luar bisa mengisi NIM/NPM kampusnya sendiri atau "-"
//      (pola yang sama dengan UISP). Instruksinya ditulis di description field.
//   4. Label dibersihkan dari contoh isian. RAW menempelkan contoh ke judul pertanyaan
//      ("What's your name? Please fill a full name e.g., Angel Sesilia"). Di New Admin UI contoh
//      dipindah ke Description field supaya label pendek dan key auto-slug-nya bersih
//      (WhatSYourName, bukan WhatSYourNamePleaseFillAFullNameEGAngelS).
//   5. TYPO di RAW diperbaiki: "What is you major?" -> "What is your major?".
//   6. Teks field/description ditulis dalam BAHASA INGGRIS mengikuti form aslinya. Komentar kode
//      tetap bahasa Indonesia.
//   7. Email pakai tipe 'email'. RAW menandainya "email (?)" alias tebakan dari kata kunci judul,
//      tapi labelnya eksplisit "Your Email Address" jadi tipe email sudah tepat.
//   8. Team size platform dibiarkan OFF (default Step 2 States) - pendaftaran seminar ini per individu.
//
// TODO manual setelah script jalan: upload banner event di Step 1 (input file, tidak bisa diisi script).

var EVENT_DESCRIPTION = [
  'INFAIR SEMINAR 2026',
  'Driving Strategic Energy-Efficiency through High Impact Operation to Accelerate National Productivity',
  '',
  'Hi, Infairians!',
  '',
  'Are you ready to discover how strategic energy efficiency and high-impact operations can drive',
  'greater productivity? The INFAIR Seminar 2026 is your opportunity to gain exclusive insights from',
  'government and industry leaders on how smarter, more efficient operations can contribute to',
  'accelerating national productivity.',
  '',
  'Designed for students and future professionals, this seminar will take you closer to real-world',
  'strategies, industry perspectives, and innovative approaches to building a more efficient and',
  'productive industrial future. Don\'t just learn about the future - be part of driving it!',
  '',
  'Event Details',
  'Date     : Wednesday, September 23rd, 2026',
  'Time     : 08.00 WIB - Done',
  'Platform : Aula Bhinneka Tunggal Ika UPN "Veteran" Jakarta, Pondok Labu',
  '',
  'What Will You Get?',
  '- Gain insights from government & industry leaders',
  '- Discover strategies for energy-efficient operations',
  '- Participate in interactive discussions',
  '- Expand your professional network',
  '- Receive an e-certificate',
  '',
  'How to Join?',
  '1. Follow @industrialfair on Instagram',
  '2. Tag 3 people on the Industrial Fair Open Registration Poster',
  '3. Repost the Industrial Fair Open Registration Poster to your story',
  '4. Fill out this registration form',
  '',
  'Contact Person: Angel Sesilia Sinaga (+62 878-9427-9631)',
  '',
  'Best regards,',
  'Industrial Fair 2026 Team'
].join('\n');

var IDENTITY = {
  eventName: 'INFAIR Seminar 2026',
  eventId: 'IFAIR2026SEMINAR',
  organizerName: 'Industrial Fair 2026',   // dari footer form ("Best regards, Industrial Fair 2026 Team")
  description: EVENT_DESCRIPTION
};

// Dikonfirmasi panitia 2026-09-03: Open Registration 7 - 20 September 2026.
var PHASE = { name: 'Open Registration', start: '2026-09-07T00:00', end: '2026-09-20T23:59' };
var TIMELINE = { name: 'Open Registration', start: '2026-09-07T00:00', end: '2026-09-20T23:59' };

// GRATIS - lihat catatan (a) di header. RAW tidak menyebut biaya sama sekali; angka 0 dipakai supaya
// tidak ada harga karangan yang lolos ke produksi. Kalau berbayar, tentukan dulu skema on-top vs
// inklusif, baru isi kedua konstanta di bawah.
var HARGA_PESERTA = 0;
var FEE_ROETIX = 0;
var TIME_PRICE = {
  price: HARGA_PESERTA - FEE_ROETIX,
  feeType: 'flat',
  fee: FEE_ROETIX,
  taxType: 'flat',
  tax: 0
};

// Step 5 Completion - teks Section 5 di RAW ("_Info-only section (tanpa field)_"), lihat keputusan 2.
// Link grup WhatsApp-nya masih "[Insert Link Group WA] (Link soon)" di RAW - lihat catatan (c).
var COMPLETION_MESSAGE = [
  'You\'re All Set, Infairians!',
  '',
  'You\'ve successfully secured your spot at INFAIR SEMINAR 2026!',
  '',
  'IMPORTANT NEXT STEP: Please make sure to join our WhatsApp Community Group through the link below',
  'to get the main room access link, live event updates, and connect with fellow participants:',
  '(TODO - link grup WhatsApp belum tersedia di RAW, isi sebelum event dipublikasikan)',
  '',
  'Get ready to learn, connect, and transform your insights with us. See you at the seminar!',
  '',
  'Best regards,',
  'Industrial Fair 2026 Team'
].join('\n');

// Syarat pendaftaran dari Section 4 di RAW. Ditaruh di description section supaya peserta membacanya
// sebelum upload. Dua link-nya masih "(link soon)" di RAW - lihat catatan (d).
var REQUIREMENTS_TEXT = [
  'Please upload the screenshots of your proof of requirements:',
  '1. Following the Instagram account of INFAIR: https://www.instagram.com/industrialfair/',
  '2. Tagging 3 friends on the Open Registration Poster (TODO - link feeds Instagram belum tersedia)',
  '3. Reposting the Open Registration Poster to your story (TODO - link feeds Instagram belum tersedia)'
].join('\n');

// Urutan field mengikuti RAW_Context_GrandSeminar.txt; Section 2 + 3 digabung (lihat keputusan 1).
var SECTIONS = [
  {
    title: 'Registration Form Industrial Fair Seminar',
    fields: [
      { label: 'Your Email Address', type: 'email', required: true,
        description: 'Please make sure your email is verified.' }
    ]
  },
  {
    title: 'Participant Information',
    description: 'Get to know you! Tell us a little about yourself and how you discovered this event!',
    fields: [
      { label: 'Where Are You From?', type: 'multiple_choice', required: true,
        options: ['Internal', 'Eksternal'] },
      { label: 'What\'s your name?', type: 'text', required: true,
        description: 'Please fill in your full name, e.g. Angel Sesilia' },
      { label: 'What\'s your nickname?', type: 'text', required: true,
        description: 'e.g. Angel' },
      { label: 'What is your university/institution?', type: 'text', required: true,
        description: 'e.g. UPN "Veteran" Jakarta' },
      { label: 'What is your major?', type: 'text', required: true,
        description: 'e.g. Industrial Engineering' },
      // NIM tetap wajib sesuai RAW - lihat keputusan 3.
      { label: 'What is your NIM?', type: 'text', required: true,
        description: 'e.g. 251xxxxxxx. External participants may fill in the student ID of their own institution, or "-" if not applicable.' },
      { label: 'Batch?', type: 'multiple_choice', required: true,
        options: ['2022', '2023', '2024', '2025', '2026'] }
    ]
  },
  {
    title: 'Registration Requirements',
    description: REQUIREMENTS_TEXT,
    fields: [
      { label: 'Please upload your proof of requirements in PDF format', type: 'file', required: true,
        description: 'File name format: Proof_YourName. Example: Proof_AngelSesilia.pdf' }
    ]
  }
];

var TOTAL_FIELDS = SECTIONS.reduce(function (n, s) { return n + s.fields.length; }, 0);

// ===================== ENGINE (alasan tiap trik ada di NewAdminUI/README.md) =====================

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
function buttonsWithText(text) {
  return Array.from(document.querySelectorAll('button')).filter(function (b) { return b.textContent.trim() === text; });
}

// ===================== STEP 1 - IDENTITY =====================

async function fillIdentity(cfg) {
  console.log('%c=== Step 1: Identity ===', 'color:#6366f1;font-weight:bold');
  // Identity adalah step default saat wizard dibuka. Klik ulang tab yang SUDAH aktif bisa memicu
  // remount yang lebih lambat dari waktu tunggu script (field sempat hilang) - klik hanya kalau perlu.
  var identityAlreadyRendered = Array.from(document.querySelectorAll('input')).some(function (i) { return i.type === 'text'; });
  if (!identityAlreadyRendered) {
    clickByText('button', '1Identity');
    await sleep(400);
  }

  var textInputs = Array.from(document.querySelectorAll('input')).filter(function (i) { return i.type === 'text'; });
  var editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
  // Urutan DOM Step 1: [0] Event Name, [1] Event ID, [2] Organizer Name (field terakhir).
  // Min/Max Team, Active, Featured sudah PINDAH ke Step 2 "States" - lihat visitStates().
  if (textInputs.length < 3 || !editables[0]) {
    console.error('STOP: Step 1 Identity tidak sesuai harapan (' + textInputs.length + ' input teks, ' + editables.length + ' editable). UI mungkin berubah lagi - cek README.');
    return false;
  }

  fillInput(textInputs[0], cfg.eventName);
  fillInput(textInputs[1], cfg.eventId);
  fillEditable(editables[0], cfg.description);
  fillInput(textInputs[2], cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, '/', cfg.eventId, '/', cfg.organizerName);
  console.warn('%cCEK MANUAL: deskripsi masih placeholder (RAW tidak punya copy promosi) - ganti sebelum publish.', 'color:#f59e0b');
  return true;
}

// ===================== STEP 2 - STATES =====================

async function visitStates() {
  console.log('%c=== Step 2: States (default sudah sesuai, Team size sengaja dibiarkan OFF) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '2States');
  await sleep(300);
}

// ===================== STEP 4a - PHASE (+ pre-flight cek draft) =====================

async function fillPhase(cfg) {
  console.log('%c=== Step 4: Chrononomics > Phase ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '4Chrononomics');
  await sleep(300);
  clickByText('button', 'Phase');
  await sleep(300);

  // README: kalau draft lama ke-restore, indeks "Add section"/"Add field" ke-geser dan field masuk ke
  // container yang salah TANPA error apa pun. Wizard bersih = 0 tombol keduanya di titik ini.
  var staleSections = buttonsWithText('Add section').length;
  var staleFields = buttonsWithText('Add field').length;
  if (staleSections || staleFields) {
    console.error('%cSTOP: wizard tidak kosong (Add section=' + staleSections + ', Add field=' + staleFields + ') - draft lama ke-restore.\n' +
      'Jalankan:  localStorage.removeItem(\'roetix:competition-draft\'); location.reload();\n' +
      'lalu paste ulang script ini. JANGAN localStorage.clear() - itu menghapus session login.', 'color:#ef4444;font-weight:bold;font-size:13px');
    return false;
  }

  var addPhaseBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Phase'; });
  if (addPhaseBtn) { addPhaseBtn.click(); await sleep(400); }

  var nameInput = Array.from(document.querySelectorAll('input')).find(function (i) { return i.type === 'text' && i.placeholder === 'New Phase'; });
  var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
  if (!nameInput || dt.length < 2) {
    console.error('STOP: input Phase tidak ditemukan (name=' + !!nameInput + ', datetime=' + dt.length + '). Isi manual.');
    return false;
  }
  fillInput(nameInput, cfg.name);
  fillInput(dt[dt.length - 2], cfg.start);
  fillInput(dt[dt.length - 1], cfg.end);
  console.log('Phase:', cfg.name, cfg.start, '->', cfg.end);
  return true;
}

// ===================== STEP 4a - SECTIONS + FIELDS =====================

async function addSectionsAndFields(sections) {
  console.log('%c=== Menambah ' + sections.length + ' section ===', 'color:#6366f1;font-weight:bold');

  // Semua section ditambahkan DULU (urutan contenteditable = urutan section selama belum ada field).
  for (var s = 0; s < sections.length; s++) {
    var addSectionBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add section'; });
    if (!addSectionBtn) { console.error('STOP: tombol "Add section" tidak ditemukan di section ke-' + (s + 1) + '.'); return false; }
    addSectionBtn.click();
    await sleep(400);

    var titleInputs = Array.from(document.querySelectorAll('input')).filter(function (i) { return i.type === 'text' && i.placeholder === 'Section title'; });
    var descEditables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
    fillInput(titleInputs[titleInputs.length - 1], sections[s].title);
    if (sections[s].description) fillEditable(descEditables[descEditables.length - 1], sections[s].description);
    console.log('  Section ' + (s + 1) + ': ' + sections[s].title);
    await sleep(200);
  }

  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    if (!section.fields.length) continue;
    console.log('%c-- Fields untuk "' + section.title + '" (' + section.fields.length + ') --', 'color:#8b5cf6');

    for (var fi = 0; fi < section.fields.length; fi++) {
      var addFieldBtn = buttonsWithText('Add field')[si];   // 1 tombol per section, urutan = urutan section
      if (!addFieldBtn) { console.error('STOP: tombol "Add field" untuk section index ' + si + ' tidak ada.'); return false; }
      var container = addFieldBtn.parentElement;

      addFieldBtn.click();
      await sleep(350);

      var fieldEls = Array.from(container.querySelectorAll(':scope > div.group'));
      var newField = fieldEls[fieldEls.length - 1];
      if (!newField) { console.error('STOP: field baru tidak muncul di container section index ' + si + '.'); return false; }
      newField.click(); // field baru collapsed by default - harus di-expand dulu
      await sleep(350);

      var field = section.fields[fi];
      var editables = Array.from(newField.querySelectorAll('[contenteditable="true"]'));
      var selects = Array.from(newField.querySelectorAll('select'));

      fillEditable(editables[0], field.label);       // editable[0] = Label, editable[1] = Description
      await sleep(150);

      if (field.type !== 'text') {
        fillSelect(selects[0], field.type);          // select[0] = Answer Type
        await sleep(250);                            // UI opsi (multiple_choice) mount setelah ini
      }

      if (field.description) {
        fillEditable(editables[1], field.description);
        await sleep(150);
      }

      // multiple_choice (UI sekarang): sudah ada 1 input "Option 1" kosong + tombol "Add option".
      // Klik "Add option" (N-1) kali DULU, baru isi semua input sekaligus - pola lama
      // (isi lalu klik tambah, input placeholder="Add choice...") SUDAH TIDAK BERLAKU.
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

      // Checkbox DIQUERY DI SINI (setelah type & options selesai): multiple_choice menambah toggle
      // "Allow an 'Other' free-text option" SEBELUM "Required". "Required" selalu checkbox TERAKHIR.
      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      if (field.required && checkboxes.length) clickCheckbox(checkboxes[checkboxes.length - 1], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + (field.required ? ' *' : '') + '  ->  ' + (keyChip ? keyChip.textContent.trim() : '(key not found)'));
      await sleep(150);
    }
  }
  return true;
}

// ===================== STEP 4b - TIMELINE =====================

async function fillTimeline(cfg) {
  console.log('%c=== Step 4: Chrononomics > Timeline ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Timeline');
  await sleep(300);

  var addTimelineBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Timeline'; });
  if (!addTimelineBtn) { console.error('STOP: tombol "Add Timeline" tidak ditemukan.'); return false; }
  addTimelineBtn.click();
  await sleep(400);

  var nameInput = Array.from(document.querySelectorAll('input')).find(function (i) { return i.type === 'text' && i.placeholder === 'New Timeline'; });
  var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
  if (!nameInput || dt.length < 2) { console.error('STOP: input Timeline tidak lengkap. Isi manual.'); return false; }
  fillInput(nameInput, cfg.name);
  fillInput(dt[dt.length - 2], cfg.start);
  fillInput(dt[dt.length - 1], cfg.end);
  console.log('Timeline:', cfg.name, cfg.start, '->', cfg.end);
  return true;
}

// ===================== STEP 4c - TIME-PRICE (1 Phase x 1 Timeline - indeks sudah terverifikasi) ====

async function fillTimePrice(cfg) {
  console.log('%c=== Step 4: Chrononomics > Time-Price ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Time-Price');
  await sleep(400);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  var selects = Array.from(document.querySelectorAll('select'));
  if (numberInputs.length < 3 || selects.length < 2) {
    console.error('STOP: matrix Time-Price tidak lengkap (number=' + numberInputs.length + ', select=' + selects.length + '). Isi manual.');
    return false;
  }

  fillInput(numberInputs[0], String(cfg.price));    // Price
  fillSelect(selects[0], cfg.feeType);              // Service fee type
  fillInput(numberInputs[1], String(cfg.fee));      // Service fee value
  fillSelect(selects[1], cfg.taxType);              // Tax type
  fillInput(numberInputs[2], String(cfg.tax));      // Tax value
  console.log('Price:', cfg.price, '| fee:', cfg.feeType, cfg.fee, '| tax:', cfg.taxType, cfg.tax);
  console.warn('%cCEK ANGKA DI LAYAR: total yang dibayar peserta HARUS Rp' + HARGA_PESERTA + '. Kalau yang tampil Rp' + (HARGA_PESERTA + FEE_ROETIX) + ', platform memperlakukan fee sebagai on-top - lihat blok FEE SCHEMA di header script.', 'color:#ef4444;font-weight:bold');
  return true;
}

// ===================== STEP 5 - COMPLETION =====================

async function fillCompletion(message) {
  console.log('%c=== Step 5: Completion ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '5Completion');
  await sleep(400);
  var editable = document.querySelector('[contenteditable="true"]');
  if (!editable) { console.error('STOP: editor Completion tidak ditemukan. Isi manual.'); return false; }
  fillEditable(editable, message);
  console.log('Completion message set.');
  return true;
}
// ===================== STEP 7 - REVIEW (lapor saja, TIDAK PERNAH submit) =====================

async function reportReview() {
  console.log('%c=== Step 7: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review');
  await sleep(500);
  var ready = document.body.innerText.includes('Everything looks good');
  var hargaTeks = HARGA_PESERTA === 0
    ? 'GRATIS (price 0 / fee 0 - ASUMSI, RAW tidak menyebut biaya)'
    : 'Rp' + HARGA_PESERTA + ' (panitia terima Rp' + TIME_PRICE.price + ', fee Roetix Rp' + TIME_PRICE.fee + ')';
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section, 1 Phase, 1 Timeline, harga ' + hargaTeks + '.'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar. Kalau ada key ber-suffix "_2", berarti draft event sebelumnya belum dibersihkan: localStorage.removeItem(\'roetix:competition-draft\'); location.reload();',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  console.warn('%cSEBELUM KLIK "Create event" - 4 data ini TIDAK ADA di RAW dan masih placeholder: (1) HARGA di-set gratis, konfirmasi ke panitia berbayar atau tidak; (2) link grup WhatsApp di Completion message masih TODO padahal itu langkah WAJIB peserta - panitia bilang belum tersedia per 2026-09-03; (3) link feeds Instagram untuk syarat tag & repost masih TODO - panitia bilang belum tersedia per 2026-09-03. Tanggal pendaftaran 7 - 20 Sep 2026 sudah dikonfirmasi panitia. Plus: upload banner event di Step 1.', 'color:#f59e0b;font-weight:bold');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c=== ' + IDENTITY.eventName + ' (' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section) ===', 'color:#6366f1;font-weight:bold;font-size:14px');
  var abort = function (where) { console.error('%cBERHENTI di ' + where + ' - baca pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); };

  if (!await fillIdentity(IDENTITY)) return abort('Step 1 Identity');
  await visitStates();
  if (!await fillPhase(PHASE)) return abort('Step 4 Phase');
  if (!await addSectionsAndFields(SECTIONS)) return abort('Step 4 Sections/Fields');
  if (!await fillTimeline(TIMELINE)) return abort('Step 4 Timeline');
  if (!await fillTimePrice(TIME_PRICE)) return abort('Step 4 Time-Price');
  if (!await fillCompletion(COMPLETION_MESSAGE)) return abort('Step 5 Completion');
  await reportReview();
  console.log('%cSelesai. Belum ada yang tersimpan - review Step 7, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
