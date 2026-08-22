// NEW ADMIN UI (admin.roetix.com/events/create) - ICGS 2026 Single Team
// Companion doc: ../../README.md (DOM notes) and TestHelper/Context/6.ICGS_Implementation.md (data source)
//
// 1. Login admin.roetix.com, go to /events, click "Create Event" (fresh, empty wizard).
// 2. Paste this whole script in the browser console and press Enter.
// 3. Script fills Step 1 Identity -> Step 3 Phase/Sections/Fields -> Timeline -> Time-Price -> Step 4 Completion,
//    then jumps to Step 6 Review and prints the readiness message.
// 4. Nothing is saved until you manually click "Create event" - script does NOT click it (final step is
//    always a human decision since this creates a real production event).
// 5. If the console prints "Not ready to finish" instead of "Everything looks good", check for duplicate
//    field keys (see README) before submitting.

var EVENT_DESCRIPTION = 'Industrial Challenge Goes to School (ICGS) 2026💡✨ hadir sebagai salah satu program kerja dari Program Studi Teknik Industri UNPAR yang bertujuan mengenalkan dunia Teknik Industri kepada para siswa-siswi SMA melalui berbagai kegiatan yang edukatif, interaktif, dan penuh pengalaman baru! 🎓🏫\n\n'
  + 'Mengusung tema  "Humanitarian Logistics: Delivering Aids, Saving Lives" 🚚❤️🌍. Melalui tema ini, peserta diajak untuk memahami peran logistik kemanusiaan dalam memastikan bantuan dapat disalurkan secara efektif, efisien, dan tepat sasaran pada situasi darurat. Rangkaian kegiatan yang dapat diikuti meliputi Studi Kasus, Cerdas Cermat, Video Presentation, Talkshow, Tour Lab, serta Games yang seru dan menantang! 🔧🚀🎯\n\n'
  + 'Jangan lewatkan kesempatan untuk menambah wawasan, mengasah kemampuan, sekaligus merasakan pengalaman menjadi bagian dari dunia Teknik Industri. Segera daftarkan timmu dan jadilah bagian dari Industrial Challenge Goes to School 2026‼️\n\n'
  + 'Contact Person :\n'
  + 'Jesselyn — jesselynbudimaan (LINE) / 085847514909 (WhatsApp)\n'
  + 'Marry — marrr.sf (LINE) / 085183183449 (WhatsApp)';

var IDENTITY = {
  eventName: 'ICGS 2026 - Single Team',
  eventId: 'ICGS2026SINGLE',
  organizerName: 'Program Studi Teknik Industri UNPAR',
  description: EVENT_DESCRIPTION,
  minTeam: 1,
  maxTeam: 1,
  active: true
};

var PHASE = {
  name: 'Registration',
  start: '2026-08-19T00:00',
  end: '2026-08-31T23:59'
};

var TIMELINE = {
  name: 'Registration',
  start: '2026-08-19T00:00',
  end: '2026-08-31T23:59'
};

var TIME_PRICE = { price: 150000, feeType: 'flat', fee: 0, taxType: 'flat', tax: 0 };

var COMPLETION_MESSAGE = 'Terima kasih telah mendaftar Industrial Challenge Goes to School (ICGS) 2026.';

var ALLERGY_NOTE = 'Jika tidak ada cukup diisi dengan tanda "-"';

var TNC_TEXT = 'Peserta WAJIB melakukan pembayaran biaya pendaftaran sesuai dengan nominal yang telah ditentukan oleh panitia. '
  + 'Pembayaran hanya sah apabila dilakukan melalui metode pembayaran yang telah diinformasikan. '
  + 'Peserta WAJIB melakukan pembayaran sebelum batas waktu yang ditetapkan. '
  + 'Peserta WAJIB melampirkan bukti pembayaran sesuai dengan format yang sudah ditetapkan. '
  + 'Panitia berhak menolak pendaftaran apabila data pembayaran tidak sesuai atau tidak dapat diverifikasi. '
  + 'Biaya pendaftaran yang sudah dibayarkan tidak dapat dikembalikan dengan alasan apa pun, kecuali apabila lomba dibatalkan oleh panitia. '
  + 'Jika lomba dibatalkan oleh panitia, maka biaya pendaftaran akan dikembalikan 100% kepada peserta melalui metode pembayaran awal. '
  + 'Segala bentuk kecurangan, manipulasi bukti pembayaran, atau pelanggaran ketentuan akan berakibat pada pembatalan keikutsertaan tanpa pengembalian biaya.';

var SECTIONS = [
  {
    title: 'Data Tim',
    fields: [
      { label: 'Asal Sekolah', type: 'text', required: true },
      { label: 'Nama Lengkap Peserta 1', type: 'text', required: true },
      { label: 'Nomor Whatsapp Peserta 1', type: 'phone', required: true },
      { label: 'Nama Lengkap Peserta 2', type: 'text', required: true },
      { label: 'Nomor Whatsapp Peserta 2', type: 'phone', required: true },
      { label: 'Nama Lengkap Peserta 3', type: 'text', required: true },
      { label: 'Nomor Whatsapp Peserta 3', type: 'phone', required: true },
      { label: 'Nama Lengkap Guru Pendamping', type: 'text', required: true },
      { label: 'Nomor Whatsapp Guru Pendamping', type: 'phone', required: true }
    ]
  },
  {
    title: 'Alergi Makanan',
    fields: [
      { label: 'Alergi Makanan Peserta 1', type: 'text', description: ALLERGY_NOTE, required: true },
      { label: 'Alergi Makanan Peserta 2', type: 'text', description: ALLERGY_NOTE, required: true },
      { label: 'Alergi Makanan Peserta 3', type: 'text', description: ALLERGY_NOTE, required: true },
      { label: 'Alergi Makanan Guru Pendamping', type: 'text', description: ALLERGY_NOTE, required: true }
    ]
  },
  {
    title: 'Syarat & Ketentuan',
    fields: [
      { label: 'Apakah anda menyetujui syarat & ketentuan pembayaran?', type: 'multiple_choice',
        description: TNC_TEXT, required: true, options: ['Menyetujui'] }
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
  clickByText('button', '1Identity');
  await sleep(400);

  var allInputs = Array.from(document.querySelectorAll('input'));
  var eventNameInput = allInputs.filter(function (i) { return i.type === 'text'; })[0];
  var eventIdInput = allInputs.filter(function (i) { return i.type === 'text'; })[1];
  var organizerInput = allInputs.filter(function (i) { return i.type === 'text'; })[2];
  var numberInputs = allInputs.filter(function (i) { return i.type === 'number'; });
  var checkboxes = allInputs.filter(function (i) { return i.type === 'checkbox'; });
  var editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));
  // editables[0] = Description (rich text), editables[1] = Email Notes
  // checkboxes[0] = "use one message for both emails" (leave default ON), [1] = Active, [2] = Featured

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);
  fillInput(numberInputs[0], String(cfg.minTeam));
  fillInput(numberInputs[1], String(cfg.maxTeam));
  clickCheckbox(checkboxes[1], cfg.active);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
}

// ===================== STEP 3a - PHASE =====================

async function fillPhase(cfg) {
  console.log('%c=== Step 3: Chrononomics > Phase ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '3Chrononomics');
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

  // 1) Add every section first (order of contenteditable === order of sections, no fields yet)
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

  // 2) Now add fields section by section - "Add field" buttons are in DOM order === section order
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
      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      var placeholderInput = Array.from(newField.querySelectorAll('input')).find(function (i) { return i.type === 'text'; });

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
  clickByText('button', '4Completion');
  await sleep(400);
  var editable = document.querySelector('[contenteditable="true"]');
  fillEditable(editable, message);
  console.log('Completion message set.');
}

// ===================== STEP 6 - REVIEW (report only, never auto-submits) =====================

async function reportReview() {
  console.log('%c=== Step 6: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '6Review');
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Review the counts below, then click "Create event" yourself.'
    : '%cNOT READY -> check for duplicate field keys or missing data.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ ICGS 2026 - Single Team ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  await fillIdentity(IDENTITY);
  await fillPhase(PHASE);
  await addSectionsAndFields(SECTIONS);
  await fillTimeline(TIMELINE);
  await fillTimePrice(TIME_PRICE);
  await fillCompletion(COMPLETION_MESSAGE);
  await reportReview();
  console.log('%cDone. Nothing is saved yet - review Step 6, then click "Create event" manually.', 'color:#22c55e;font-weight:bold');
})();
