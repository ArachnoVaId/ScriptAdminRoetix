// NEW ADMIN UI (admin.roetix.com/events/create) - SRD 2026 Talkshow - Umum (Paket Bundling Beli 3)
// Companion doc: ../../NewAdminUI/README.md (DOM notes) - format sama persis dengan Create_ICGS_DoubleTeam.js
// Data source: ../RAW_SRD2026.txt line 64-88 (DATA FORM ... pendaftar Umum Paket Bundling (Beli 3))
//
// 1. Login admin.roetix.com, go to /events, click "Create Event" (fresh, empty wizard).
// 2. Paste this whole script in the browser console and press Enter.
// 3. Script fills Step 1 Identity -> Step 3 Phase/Sections/Fields -> Timeline -> Time-Price -> Step 4 Completion,
//    then jumps to Step 6 Review and prints the readiness message.
// 4. Nothing is saved until you manually click "Create event" - script does NOT click it.
// 5. If the console prints "Not ready to finish" instead of "Everything looks good", check for duplicate
//    field keys (see README) before submitting.
//
// IMPORTANT: Peserta 2 & 3 fields live in the SAME Phase as Peserta 1, so their labels are suffixed
// "(Peserta 2)" / "(Peserta 3)" below - identical labels would auto-slug to identical keys and Step 6
// Review would report "duplicate field keys". Do not remove the suffix.
//
// TODO WAJIB DIISI SEBELUM RUN: Organizer Name tidak ada di RAW_SRD2026.txt, ganti placeholder di bawah.

var EVENT_DESCRIPTION = 'Scholarship For Reach A Dream 2026\n"Design a Dream, Display Potential"\n\n'
  + '📅 Minggu, 20 September 2026\n'
  + '⏰ 09.00 WIB\n'
  + '📍Conference Hall - Seameo Biotrop\n'
  + '🧙‍♂️Bersama Narasumber Inspiratif\n\n'
  + '🪄Apa yang akan kamu dapatkan?\n'
  + '- Strategi meraih beasiswa impian\n'
  + '- Tips & trik membangun portofolio dan personal branding\n'
  + '- Relasi dengan mitra beasiswa\n'
  + '- Tersedia booth mitra beasiswa\n'
  + '- Hiburan, Konsumsi & Doorprice\n\n'
  + '🎟️Paket ini: Umum - Paket Bundling Beli 3 (3 peserta) - Rp70.000\n\n'
  + '🔮Jangan lewatkan kesempatan emas kalian untuk memantapkan persiapan meraih impian🪄';

var IDENTITY = {
  eventName: 'Talkshow SRD 2026 - Umum (Paket Bundling 3)',
  eventId: 'SRD2026UMUMBUNDLE3',
  organizerName: 'TODO_ISI_NAMA_ORGANIZER',
  description: EVENT_DESCRIPTION,
  minTeam: 1,
  maxTeam: 1,
  active: true
};

var PHASE = {
  name: 'Registration',
  start: '2026-08-22T00:00',
  end: '2026-09-19T23:59'
};

var TIMELINE = {
  name: 'Registration',
  start: '2026-08-22T00:00',
  end: '2026-09-19T23:59'
};

// Service fee platform Roetix Rp3.500/tiket (flat), ditanggung buyer - harga di web = price + fee
var TIME_PRICE = { price: 70000, feeType: 'flat', fee: 3500, taxType: 'flat', tax: 0 };

var COMPLETION_MESSAGE = 'Selesaikan pembayaran dengan scan QRIS tagihan pendaftaran setelah ini agar secara resmi '
  + 'terdaftar pada Talkshow Scholarship For Reach A Dream (SRD) 2026.';

function pesertaFields(suffix) {
  var s = suffix ? ' (' + suffix + ')' : '';
  return [
    { label: 'Nama Lengkap' + s, type: 'text', required: true },
    { label: 'Asal Instansi' + s, type: 'text', required: true },
    { label: 'Asal Daerah' + s, type: 'text', required: true }
  ];
}

var SECTIONS = [
  { title: 'Peserta 1', fields: pesertaFields(null) },
  { title: 'Peserta 2', fields: pesertaFields('Peserta 2') },
  { title: 'Peserta 3', fields: pesertaFields('Peserta 3') }
];

// ===================== ENGINE (see README.md for why each trick is needed) =====================

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
  // Identity adalah step default saat wizard baru dibuka - field-nya sudah ada di DOM tanpa perlu
  // diklik. Klik ulang tab "1Identity" kadang me-remount step ini (render ulang lebih lambat dari
  // waktu tunggu script), jadi field sempat hilang - klik cuma kalau field BELUM ada.
  var identityAlreadyRendered = Array.from(document.querySelectorAll('input')).some(function (i) { return i.type === 'text'; });
  if (!identityAlreadyRendered) {
    clickByText('button', '1Identity');
    await sleep(400);
  }

  var allInputs = Array.from(document.querySelectorAll('input'));
  var textInputs = allInputs.filter(function (i) { return i.type === 'text'; });
  var eventNameInput = textInputs[0];
  var eventIdInput = textInputs[1];
  var organizerInput = textInputs[2];
  var checkboxes = allInputs.filter(function (i) { return i.type === 'checkbox'; });
  var editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
  // Min/Max Team, Active, Featured PINDAH ke Step 2 "States" (live UI 2026-08-21, tidak ada lagi di
  // Step 1 - inilah penyebab TypeError "reading 'focus'" di numberInputs[0]). Tidak diisi di sini:
  // default "Team size" OFF = individual event (min=max=1, persis yang kita mau), "Active" default
  // ON. Lihat visitStates().

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
  if (cfg.organizerName.indexOf('TODO') === 0) {
    console.warn('%cOrganizer Name masih placeholder TODO - isi manual sebelum klik Create event!', 'color:#ef4444;font-weight:bold');
  }
}

// ===================== STEP 2 - STATES (live UI 2026-08-21, tidak ada di README) =====================
// Active/Featured/Team size/Referral codes/Detailed pricing sekarang di sini, bukan di Step 1 lagi.
// Untuk event individual seperti ini, default-nya SUDAH benar (Active ON, Team size OFF = min/max 1),
// jadi cukup singgah ke tab-nya tanpa ubah toggle apapun.
async function visitStates() {
  console.log('%c=== Step 2: States (default sudah sesuai individual event, tidak diubah) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '2States');
  await sleep(300);
}

// ===================== STEP 3a - PHASE =====================

async function fillPhase(cfg) {
  console.log('%c=== Step 3: Chrononomics > Phase ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '4Chrononomics'); // live UI punya tab baru "2States" sblm Media, geser nomor +1 dari README
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

// ===================== STEP 3a - SECTIONS + FIELDS =====================

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
    console.log('  Section ' + (s + 1) + ': ' + sections[s].title);
    await sleep(200);
  }

  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
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
      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));

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
        var choiceInput = newField.querySelector('input[placeholder="Add choice…"]') || newField.querySelector('input[placeholder="Add choice..."]');
        if (choiceInput) {
          var addChoiceBtn = choiceInput.parentElement.querySelector('button');
          field.options.forEach(function (opt) {
            fillInput(choiceInput, opt);
            if (addChoiceBtn) addChoiceBtn.click();
          });
          console.log('    options: ' + field.options.join(', '));
        } else {
          console.warn('    "Add choice" input not found for multiple_choice field: ' + field.label);
        }
      }

      if (field.required && checkboxes[0]) clickCheckbox(checkboxes[0], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
}

// ===================== STEP 3b - TIMELINE =====================

async function fillTimeline(cfg) {
  console.log('%c=== Step 3: Chrononomics > Timeline ===', 'color:#6366f1;font-weight:bold');
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

// ===================== STEP 3c - TIME-PRICE (single Phase x single Timeline only) =====================

async function fillTimePrice(cfg) {
  console.log('%c=== Step 3: Chrononomics > Time-Price ===', 'color:#6366f1;font-weight:bold');
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

// ===================== STEP 4 - COMPLETION =====================

async function fillCompletion(message) {
  console.log('%c=== Step 4: Completion ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '5Completion'); // was 4Completion in README, geser +1 karena tab baru "2States"
  await sleep(400);
  var editable = document.querySelector('[contenteditable="true"]');
  fillEditable(editable, message);
  console.log('Completion message set.');
}

// ===================== STEP 6 - REVIEW (report only, never auto-submits) =====================

async function reportReview() {
  console.log('%c=== Step 6: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review'); // was 6Review in README, geser +1 karena tab baru "2States"
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Review the counts below, then click "Create event" yourself.'
    : '%cNOT READY -> likely duplicate field keys (check the Peserta 2/3 suffixes) or missing data.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ SRD 2026 - Umum (Paket Bundling 3) ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  await fillIdentity(IDENTITY);
  await visitStates();
  await fillPhase(PHASE);
  await addSectionsAndFields(SECTIONS);
  await fillTimeline(TIMELINE);
  await fillTimePrice(TIME_PRICE);
  await fillCompletion(COMPLETION_MESSAGE);
  await reportReview();
  console.log('%cDone. Nothing is saved yet - review Step 6, then click "Create event" manually.', 'color:#22c55e;font-weight:bold');
})();
