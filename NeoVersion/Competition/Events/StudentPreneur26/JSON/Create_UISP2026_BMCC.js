// NEW ADMIN UI (admin.roetix.com/events/create) - The 16th UI Studentpreneurs - BMCC Registration
// Companion doc: ../../NewAdminUI/README.md (DOM notes, engine turunan dari script ICGS/SRD2026)
// Data source: ../RAW_Studentpreneur.txt
//
// STRUKTUR: 1 event, 1 Phase, 3 Timeline (Early Bird / Normal Price / Late Bird - beda tanggal & harga,
// field form SAMA persis di ketiganya - tidak seperti SRD2026 yang butuh Phase terpisah per paket).
// Team Composition (Individual/2 Members/3 Members) ditangani via 1 field multiple_choice di dalam form
// itu sendiri, bukan lewat fitur Team Size platform - field Member 1/Member 2 tetap ada utk semua orang,
// yang individu tinggal isi "-" (sesuai instruksi asli di raw data).
//
// KEPUTUSAN atas 2 ambiguitas di raw data (dikonfirmasi user 2026-08-21):
//   1. Section 6 "Insttruksi Pengunggahan Berkas" bilang "digabung jadi 1 file PDF max 10MB" TAPI raw
//      data tetap list 6 baris "(Proof) ... / Upload File (PDF)" terpisah -> dipilih 6 field upload
//      terpisah (ikuti tabel literal), instruksi "digabung" diabaikan.
//   2. Tanggal Timeline tidak ada tahun di raw data -> dipilih 2026 (konsisten nama folder + tanggal now).
//
// !!! PERINGATAN - BAGIAN BELUM TERVERIFIKASI SEBELUM DITEST LIVE !!!
// Ini kasus PERTAMA di repo dengan >1 Timeline (README menandai indeks Time-Price utk matrix >1x1
// sebagai "belum diverifikasi"). Sudah ditest live oleh Claude di browser sebelum diserahkan - lihat
// catatan di README.md bagian "Update 2026-08-21" untuk hasil verifikasinya. Tetap WAJIB jalankan di
// draft/test dulu dan cocokkan tiap cell Time-Price manual dengan nama Timeline yang tampil di layar.
//
// TODO WAJIB DIISI SEBELUM RUN (raw data tidak punya copy final utk ini):
//   - Organizer Name
//   - Event Description (raw cuma kasih daftar poin: Tema, Benefit, Syarat, Timeline, Kontak Person,
//     Link Guidebook & Syarat - bukan teks jadi)
//   - Completion Message (raw cuma bilang "Ucapan Terima Kasih, Link Guidebook, dan Link WhatsApp
//     Group" - bukan teks jadi)
//   - Nama partner assessor di field "(Proof) Follow Instagram Our Assessor Partner" (raw data ada
//     placeholder "(....)" yang belum diisi)

var IDENTITY = {
  eventName: 'The 16th UI Studentpreneurs - BMCC Registration',
  eventId: 'UISP2026BMCC',
  organizerName: 'BEM FEB UI',
  description: 'TODO_ISI_DESKRIPSI_LOMBA - cakup Tema, Benefit, Syarat, Timeline, Kontak Person, Link Guidebook & Syarat pendaftaran.',
  minTeam: 1,
  maxTeam: 1,
  active: true
};

// Phase tunggal, tanggalnya cukup span seluruh window pendaftaran - Timeline di bawah yang benar2
// membatasi harga/tanggal per gelombang (pola sama seperti RAINING build guide).
var PHASE = { name: 'Registration', start: '2026-09-19T00:00', end: '2026-10-30T23:59' };

var TIMELINES = [
  { name: 'Early Bird', start: '2026-09-19T00:00', end: '2026-09-29T23:59', price: 185000 },
  { name: 'Normal Price', start: '2026-09-30T00:00', end: '2026-10-17T23:59', price: 195000 },
  { name: 'Late Bird', start: '2026-10-18T00:00', end: '2026-10-30T23:59', price: 195000 }
];

// Service fee Roetix Rp11.000/transaksi (flat), sesuai catatan di RAW_Studentpreneur.txt baris 1.
var TIME_PRICE_CELLS = TIMELINES.map(function (tl) {
  return { label: tl.name, price: tl.price, feeType: 'flat', fee: 11000, taxType: 'flat', tax: 0 };
});

var COMPLETION_MESSAGE = 'TODO_ISI_PESAN_PENUTUP - ucapan terima kasih, link guidebook, dan link WhatsApp group.';

var ACADEMIC_BATCH_OPTIONS = ['2023', '2024', '2025', '2026'];

function memberFields(memberLabel, isTeamLeader) {
  var noteIndividual = isTeamLeader ? undefined : 'Isi "-" jika individu';
  return [
    { label: memberLabel + ' Full Name', type: 'text', required: true, description: noteIndividual },
    { label: memberLabel + ' Institution', type: 'text', required: true, description: 'E.g. Universitas Indonesia' },
    { label: memberLabel + ' Major', type: 'text', required: true, description: 'E.g. Ilmu Ekonomi' },
    { label: 'Academic Batch (' + memberLabel + ')', type: 'multiple_choice', required: true, options: ACADEMIC_BATCH_OPTIONS },
    { label: memberLabel + ' Phone Number', type: 'phone', required: true, description: 'e.g. +62123456789' },
    { label: memberLabel + ' Email Address', type: 'email', required: true }
  ];
}

var SECTIONS = [
  {
    // Section info-only (raw data: "Teks Deskripsi / Judul Form") - tanpa field, cuma title+description.
    title: 'BMCC Registration - The 16th UI Studentpreneurs',
    description: 'TODO_ISI_DESKRIPSI_LOMBA - Tema, Benefit, Syarat, Timeline, Kontak Person, Link Guidebook & Syarat.',
    fields: []
  },
  {
    title: 'General Information',
    fields: [
      { label: 'Team Name', type: 'text', required: true, description: 'E.g. Blue Entrepreneur' },
      { label: 'Team Composition', type: 'multiple_choice', required: true, options: ['Individual', '2 Members', '3 Members'] },
      { label: 'How did you know about The 16th UI Studentpreneurs?', type: 'multiple_choice', required: true, options: ['Instagram', 'Broadcast', 'Tiktok', 'LinkedIn', 'Ambassador', 'Other'] },
      { label: 'Are you interested to join another events of the 16th UI Studentpreneurs?', type: 'multiple_choice', required: true, options: ['Yes', 'No'] },
      { label: 'General Code UISP', type: 'text', required: false, description: 'Opsional' },
      { label: 'Referral Code UISP Ambassador', type: 'text', required: false, description: 'Opsional' }
    ]
  },
  { title: 'Team Leader Data', fields: memberFields('Team Leader', true) },
  { title: 'Member 1 Data', fields: memberFields('Member 1', false) },
  { title: 'Member 2 Data', fields: memberFields('Member 2', false) },
  {
    title: 'Registration Requirements',
    description: 'Setiap bukti diunggah sebagai file PDF, maks 10 MB per file.',
    fields: [
      { label: '(Proof) Follow Instagram @studentpreneurs', type: 'file', required: true },
      { label: '(Proof) Follow Instagram @uispgoods', type: 'file', required: true },
      { label: '(Proof) Follow Instagram Our Assessor Partner (TODO_ISI_NAMA_PARTNER)', type: 'file', required: true },
      { label: '(Proof) Kartu Tanda Mahasiswa', type: 'file', required: true },
      { label: '(Proof) Post a Twibbon on IG Feeds', type: 'file', required: true },
      { label: '(Proof) Share Poster The 16th UI Studentpreneurs via Instagram Story', type: 'file', required: true }
    ]
  }
];

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
function buttonsWithText(text) {
  return Array.from(document.querySelectorAll('button')).filter(function (b) { return b.textContent.trim() === text; });
}

// ===================== STEP 1 - IDENTITY =====================

async function fillIdentity(cfg) {
  console.log('%c=== Step 1: Identity ===', 'color:#6366f1;font-weight:bold');
  // Identity adalah step default saat wizard baru dibuka - field-nya sudah ada di DOM tanpa perlu
  // diklik. Klik ulang tab "1Identity" kadang me-remount step ini lebih lambat dari waktu tunggu
  // script, jadi field sempat hilang - klik cuma kalau field BELUM ada.
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
  // Min/Max Team, Active, Featured ada di Step 2 "States", bukan di sini (live UI 2026-08-21). Default
  // "Team size" OFF = individual submission (persis yang kita mau - Team Composition ditangani field
  // multiple_choice di dalam form), "Active" default ON. Lihat visitStates().

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
  if (cfg.organizerName.indexOf('TODO') === 0 || cfg.description.indexOf('TODO') === 0) {
    console.warn('%cOrganizer Name dan/atau Description masih placeholder TODO - isi manual sebelum klik Create event!', 'color:#ef4444;font-weight:bold');
  }
}

// ===================== STEP 2 - STATES =====================

async function visitStates() {
  console.log('%c=== Step 2: States (default sudah sesuai individual event, tidak diubah) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '2States');
  await sleep(300);
}

// ===================== STEP 4a - PHASE =====================

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

// ===================== STEP 4a - SECTIONS + FIELDS =====================

async function addSectionsAndFields(sections) {
  console.log('%c=== Adding ' + sections.length + ' sections ===', 'color:#6366f1;font-weight:bold');

  for (var s = 0; s < sections.length; s++) {
    var addSectionBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add section'; });
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
        await sleep(250); // options UI (multiple_choice) mounts after this
      }

      if (field.description) {
        fillEditable(editables[1], field.description);
        await sleep(150);
      }

      // Live UI 2026-08-21: multiple_choice field mulai dengan 1 input teks "Option 1" (BUKAN input
      // "Add choice" terpisah seperti dulu) + tombol "Add option". Klik "Add option" (N-1) kali dulu
      // baru isi semua input opsi sekaligus - opsi baru selalu numpuk di bawah dengan value kosong,
      // isi-lalu-klik-tambah (pola lama) tidak berlaku lagi di sini.
      if (field.type === 'multiple_choice' && field.options && field.options.length) {
        var addOptionBtn = Array.from(newField.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add option'; });
        for (var oi = 1; oi < field.options.length; oi++) {
          if (addOptionBtn) { addOptionBtn.click(); await sleep(250); }
        }
        var optionInputs = Array.from(newField.querySelectorAll('input')).filter(function (i) { return i.type === 'text'; });
        field.options.forEach(function (opt, idx) {
          if (optionInputs[idx]) fillInput(optionInputs[idx], opt);
        });
        console.log('    options: ' + field.options.join(', '));
        await sleep(150);
      }

      // checkboxes DIQUERY DI SINI (bukan di atas sebelum ganti Answer Type) karena multiple_choice
      // nambah 1 toggle ekstra ("Allow an 'Other' free-text option") SEBELUM toggle "Required" - jadi
      // jumlah & urutan checkbox baru pasti kalau diquery setelah type & options selesai diisi. Toggle
      // "Required" SELALU checkbox TERAKHIR di field manapun, terlepas dari tipenya.
      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      if (field.required && checkboxes.length) clickCheckbox(checkboxes[checkboxes.length - 1], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
}

// ===================== STEP 4b - TIMELINE (3x - "Add Timeline" diklik berulang, README bilang tidak =====
// ===================== collapse jadi aman ditumpuk, pola sama seperti "Add section") ==================

async function fillTimelines(timelines) {
  console.log('%c=== Step 4: Chrononomics > Timeline (' + timelines.length + ') ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Timeline');
  await sleep(300);

  for (var i = 0; i < timelines.length; i++) {
    var tl = timelines[i];
    var addTimelineBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Timeline'; });
    if (!addTimelineBtn) { console.error('STOP: tombol "Add Timeline" tidak ditemukan di timeline ke-' + (i + 1) + '. Isi manual sisanya.'); return false; }

    var nameInputsBefore = document.querySelectorAll('input[placeholder="New Timeline"]').length;
    addTimelineBtn.click();
    await sleep(400);
    var nameInputsAfter = document.querySelectorAll('input[placeholder="New Timeline"]').length;
    if (nameInputsAfter <= nameInputsBefore) {
      console.error('STOP: klik "Add Timeline" tidak menambah timeline baru (before=' + nameInputsBefore + ', after=' + nameInputsAfter + '). Isi manual sisanya.');
      return false;
    }

    var nameInputs = Array.from(document.querySelectorAll('input[placeholder="New Timeline"]'));
    var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
    fillInput(nameInputs[nameInputs.length - 1], tl.name);
    fillInput(dt[dt.length - 2], tl.start);
    fillInput(dt[dt.length - 1], tl.end);
    console.log('  Timeline ' + (i + 1) + ': ' + tl.name, tl.start, '->', tl.end);
    await sleep(200);
  }
  return true;
}

// ===================== STEP 4c - TIME-PRICE (1 Phase x 3 Timeline - lihat catatan verifikasi di README) ==

async function fillTimePriceMatrix(cells) {
  console.log('%c=== Step 4: Chrononomics > Time-Price (' + cells.length + ' cell, PERIKSA MANUAL) ===', 'color:#ef4444;font-weight:bold');
  clickByText('button', 'Time-Price');
  await sleep(400);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  var selects = Array.from(document.querySelectorAll('select'));

  for (var i = 0; i < cells.length; i++) {
    var c = cells[i];
    var priceInput = numberInputs[i * 3];
    var feeSelect = selects[i * 2];
    var feeInput = numberInputs[i * 3 + 1];
    var taxSelect = selects[i * 2 + 1];
    var taxInput = numberInputs[i * 3 + 2];

    if (!priceInput || !feeSelect || !feeInput || !taxSelect || !taxInput) {
      console.error('STOP: elemen Time-Price cell ke-' + (i + 1) + ' (' + c.label + ') tidak lengkap di DOM. Isi sisanya manual - cocokkan cell dengan nama Timeline yang terlihat di layar.');
      return false;
    }

    fillInput(priceInput, String(c.price));
    fillSelect(feeSelect, c.feeType);
    fillInput(feeInput, String(c.fee));
    fillSelect(taxSelect, c.taxType);
    fillInput(taxInput, String(c.tax));
    console.log('  cell ' + (i + 1) + ' (harusnya "' + c.label + '"): Rp' + c.price + ' + fee Rp' + c.fee + ' -- VERIFIKASI nama Timeline di layar cocok!');
  }
  return true;
}

// ===================== STEP 5 - COMPLETION =====================

async function fillCompletion(message) {
  console.log('%c=== Step 5: Completion ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '5Completion');
  await sleep(400);
  var editable = document.querySelector('[contenteditable="true"]');
  fillEditable(editable, message);
  console.log('Completion message set.');
  if (message.indexOf('TODO') === 0) {
    console.warn('%cCompletion Message masih placeholder TODO - isi manual sebelum klik Create event!', 'color:#ef4444;font-weight:bold');
  }
}

// ===================== STEP 7 - REVIEW (report only, never auto-submits) =====================

async function reportReview() {
  console.log('%c=== Step 7: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review');
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek jumlah Timeline (3), Phase (1), Field (35), Priced cells (3), dan tiap cell harga SATU-SATU sebelum klik "Create event".'
    : '%cNOT READY -> cek duplicate field keys (terutama 3x "Academic Batch") atau data yang belum lengkap.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ The 16th UI Studentpreneurs - BMCC Registration ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  await fillIdentity(IDENTITY);
  await visitStates();
  await fillPhase(PHASE);
  await addSectionsAndFields(SECTIONS);

  var timelineOk = await fillTimelines(TIMELINES);
  if (!timelineOk) { console.error('%cBERHENTI di Step 4 Timeline - lihat pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); return; }

  var priceOk = await fillTimePriceMatrix(TIME_PRICE_CELLS);
  if (!priceOk) { console.error('%cBERHENTI di Step 4 Time-Price - lihat pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); return; }

  await fillCompletion(COMPLETION_MESSAGE);
  await reportReview();
  console.log('%cDone. Nothing is saved yet - review Step 7 & tiap cell Time-Price manual, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
