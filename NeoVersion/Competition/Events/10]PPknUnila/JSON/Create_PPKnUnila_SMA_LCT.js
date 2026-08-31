// NEW ADMIN UI (admin.roetix.com/events/create) - Olimpiade PPKn Unila 2026 - LCT SMA
// Companion doc: ../../NewAdminUI/README.md (DOM notes) - format sama persis dengan Create_SRD2026_*.js
// Data source: ../RAW_PPKnUnila.txt + ../_chat.txt (lihat ../PPKnUnila_status.md untuk kronologi & alert)
//
// 1. Login admin.roetix.com, go to /events, click "Create Event" (fresh, empty wizard).
// 2. Paste this whole script in the browser console and press Enter.
// 3. Script fills Step 1 Identity -> Step 2 States (visit only) -> Step 4 Chrononomics (Phase/Sections/
//    Fields/Timeline/Time-Price) -> Step 5 Completion, then jumps to Step 7 Review and prints readiness.
// 4. Nothing is saved until you manually click "Create event" - script does NOT click it.
// 5. If the console prints "Not ready to finish" instead of "Everything looks good", check for duplicate
//    field keys (see README) before submitting.
//
// TODO WAJIB DIKONFIRMASI SEBELUM RUN:
// - Organizer Name diambil dari teks promo RAW ("Pendidikan Pancasila dan Kewarganegaraan Universitas
//   Lampung"), tidak pernah diberikan eksplisit sebagai field terpisah oleh panitia - konfirmasi dulu.
// - Field "Kategori Lomba yang Diikuti", "Bukti Transfer Pembayaran", "Upload Formulir Pendaftaran"
//   SENGAJA dihapus dari SECTIONS di bawah sesuai instruksi build (9 event terpisah per kategori).

var EVENT_DESCRIPTION = 'Pendaftaran Olimpiade PPKn Tahun 2026\n[OLIMPIADE PPKN UNIVERSITAS LAMPUNG TAHUN 2026]\n\n'
  + 'PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN UNIVERSITAS LAMPUNG PROUDLY PRESENT\n\n'
  + 'Tema: "Menumbuhkan Semangat Kompetisi dalam Mewujudkan Generasi Muda Indonesia yang berkualitas, kreatif dan inovatif melalui Olimpiade PPKn"\n\n'
  + 'Assalamualaikum dan salam sejahtera, Garuda Muda Indonesia!🎉🎉🎉\n\n'
  + 'Mari dengar pantun pembuka dari kami:\n\n'
  + 'Mentari pagi bersinar terang,\n'
  + 'Menyapa bumi penuh harapan.\n'
  + 'Mari berkompetisi dengan gemilang,\n'
  + 'Menjunjung Pancasila sebagai pedoman.\n\n'
  + '🔥 Olimpiade PPKn 2026 kembali hadir SECARA OFFLINE!\n\n'
  + 'Saatnya kalian mengasah pengetahuan, menjunjung nilai luhur bangsa, dan merebut prestasi tertinggi!\n\n'
  + 'Ayo siapkan dirimu, karena panggung kebanggaan ini menantimu!\n\n'
  + 'Puncak acara akan diadakan pada: 22-23 Oktober 2026\n\n'
  + '📌LCT SMA📌 (Offline)\n'
  + 'HTM: Rp250.000\n'
  + '📍More Info:\n'
  + '1. Safani Arzalya (+62 895-2828-5301)\n'
  + '2. Safa Zahra (+62 882-8603-1297)\n\n'
  + 'Rekening Pendaftaran\n'
  + 'Pembayaran:\n'
  + '🏦 BRI: 5660 0103 3490 530\n'
  + 'a.n. Belsya Novalina\n\n'
  + 'Note: Konfirmasi Registrasi Pembayaran di CP lomba yang tertera diatas!\n\n'
  + 'Waktu Pendaftaran: 1 September - 30 September 2026\n\n'
  + 'Tunggu apalagi!! Go!!! Come On!!!\n'
  + 'Segera Persiapkan dan daftarkan dirimu!!!🔥🔥\n\n'
  + 'Info lengkap: https://www.instagram.com/olimpiadeppknunila_2026?igsh=bW4ycGNpcWtmd3B5';

var IDENTITY = {
  eventName: 'Olimpiade PPKn Unila 2026 - LCT SMA',
  eventId: 'PPKNUNILA2026SMALCT',
  organizerName: 'TODO_KONFIRMASI_Pendidikan Pancasila dan Kewarganegaraan Universitas Lampung',
  description: EVENT_DESCRIPTION,
  minTeam: 1,
  maxTeam: 1,
  active: true
};

var PHASE = {
  name: 'Registrasi LCT SMA',
  start: '2026-09-01T00:00',
  end: '2026-09-30T23:59'
};

var TIMELINE = {
  name: 'Registration',
  start: '2026-09-01T00:00',
  end: '2026-09-30T23:59'
};

// Fee 50:50 hasil kesepakatan chat 26/08: total fee digenapkan Rp23.000, porsi peserta Rp11.500,
// porsi panitia Rp11.500 lainnya dipotong Roetix otomatis saat pencairan (tidak diisi di wizard).
var TIME_PRICE = { price: 250000, feeType: 'flat', fee: 11500, taxType: 'flat', tax: 0 };

var COMPLETION_MESSAGE = 'Terima kasih telah mendaftar Olimpiade PPKn Universitas Lampung XIII 2026 - LCT SMA. '
  + 'Segera konfirmasi pembayaran ke CP lomba (lihat deskripsi event) agar pendaftaranmu diverifikasi panitia. '
  + 'Sampai jumpa di puncak acara, 22-23 Oktober 2026!';

var SECTIONS = [
  {
    title: 'Data Pendaftaran',
    fields: [
      { label: 'Email', type: 'email', required: true },
      { label: 'Nama Peserta', type: 'text', required: true },
      { label: 'Nama Guru Pendamping', type: 'text', required: true },
      { label: 'No. Telp/WhatsApp', type: 'phone', required: true },
      { label: 'Asal Sekolah / Instansi', type: 'text', required: true },
      { label: 'Bukti Screenshoot Subscribe YouTube Fordika [Fordika FKIP Unila]', type: 'file', required: true },
      { label: 'Bukti Follow Instagram Fordika [Fordika_Unila]', type: 'file', required: true },
      { label: 'Bukti Follow Instagram [Olimpiadeppknunila_2026]', type: 'file', required: true }
    ]
  }
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
function textInputs(root) {
  return Array.from(root.querySelectorAll('input')).filter(function (i) { return i.type === 'text'; });
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
  // editables[0] = Description, editables[1] = Email Notes
  // Min/Max Team, Active, Featured ada di Step 2 "States" - default sudah sesuai individual event, tidak diubah.

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
  if (cfg.organizerName.indexOf('TODO') === 0) {
    console.warn('%cOrganizer Name masih placeholder TODO - isi manual sebelum klik Create event!', 'color:#ef4444;font-weight:bold');
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
    console.log('  Section ' + (s + 1) + ': ' + sections[s].title);
    await sleep(200);
  }

  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    console.log('%c-- Fields for "' + section.title + '" --', 'color:#8b5cf6');

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

      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      if (field.required && checkboxes.length) clickCheckbox(checkboxes[checkboxes.length - 1], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
}

// ===================== STEP 4b - TIMELINE =====================

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

// ===================== STEP 4c - TIME-PRICE (single Phase x single Timeline only) =====================

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
    ? '%cREADY -> "Everything looks good." Review the counts below, then click "Create event" yourself.'
    : '%cNOT READY -> check for duplicate field keys or missing data.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ Olimpiade PPKn Unila 2026 - LCT SMA ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  await fillIdentity(IDENTITY);
  await visitStates();
  await fillPhase(PHASE);
  await addSectionsAndFields(SECTIONS);
  await fillTimeline(TIMELINE);
  await fillTimePrice(TIME_PRICE);
  await fillCompletion(COMPLETION_MESSAGE);
  await reportReview();
  console.log('%cDone. Nothing is saved yet - review Step 7, then click "Create event" manually.', 'color:#22c55e;font-weight:bold');
})();
