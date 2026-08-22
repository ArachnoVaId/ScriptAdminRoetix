// NEW ADMIN UI (admin.roetix.com/events/create) - Talkshow Scholarship For Reach A Dream (SRD) 2026
// Companion doc: ../../NewAdminUI/README.md (DOM notes, engine ini adalah turunan langsung dari situ)
// Data source: ../RAW_SRD2026.txt line 1-148 (tabel Timeline/Harga + DATA FORM per kombinasi)
//
// STRUKTUR: 1 event, 6 Phase (bukan 2 Phase x 3 Timeline seperti draft Google Form panitia di
// RAW_SRD2026.txt line 150+ - user memilih ikut tabel raw awal yang field-nya eksplisit per Peserta N):
//   1. Umum - Normal                  (1 peserta)   Rp 25.000
//   2. Umum - Paket Bundling (Beli 2) (2 peserta)   Rp 40.000
//   3. Umum - Paket Bundling (Beli 3) (3 peserta)   Rp 70.000
//   4. Mahasiswa IPB - Normal                  (1 peserta)   Rp 20.000
//   5. Mahasiswa IPB - Paket Bundling (Beli 2) (2 peserta)   Rp 30.000
//   6. Mahasiswa IPB - Paket Bundling (Beli 3) (3 peserta)   Rp 50.000
// Semua 6 Phase berbagi 1 Timeline yang sama (22 Agustus - 19 September 2026) -> Time-Price matrix
// = 6 Phase x 1 Timeline = 6 sel harga.
//
// !!! PERINGATAN - BAGIAN BELUM TERVERIFIKASI LIVE !!!
// Semua script NewAdminUI sebelumnya (ICGS Single/Double Team) hanya pernah diuji dengan 1 Phase.
// README.md sendiri menandai dua asumsi berikut sebagai "belum diverifikasi" untuk kasus >1 Phase:
//   1. Tombol "Add Phase" didokumentasikan "unik, hanya muncul kalau belum ada Phase" - script ini
//      ASUMSI tombol yang sama bisa diklik ulang untuk menambah Phase ke-2 dst (pola sama seperti
//      "Add Timeline"/"Add section" yang memang bisa diklik berkali-kali). Kalau asumsi ini salah,
//      script akan berhenti sendiri dengan console.error di Phase ke-2 (lihat assertLengthGrew di bawah).
//   2. Step 3 Time-Price: README bilang indeks input utk matrix >1x1 "belum diverifikasi". Script ini
//      ASUMSI urutan cell mengikuti urutan Phase (karena cuma 1 Timeline): cell ke-N = Phase ke-N,
//      3 input per cell (Price, Service fee type+angka, Tax type+angka) berurutan flat di DOM.
//   3. Key auto-slug: RAINING build guide menandai belum jelas apakah uniqueness key itu per-Phase atau
//      per-Event. Untuk jaga-jaga, SEMUA label field di bawah sudah disuffix penanda Phase (Umum/Mhs +
//      P1/P2/P3) supaya aman di kedua skenario.
//
// WAJIB: jalankan ini di event DRAFT/TEST dulu, tonton console log tiap Phase selesai, dan cek Step 6
// Review manual sebelum pernah mengetik di event produksi asli. Script TIDAK PERNAH klik "Create event".

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
  + '🎟️HTM:\n'
  + '- Umum: Rp25.000\n'
  + '- Mahasiswa IPB: Rp20.000\n'
  + '(Tersedia paket bundling hemat)\n\n'
  + '🔮Jangan lewatkan kesempatan emas kalian untuk memantapkan persiapan meraih impian🪄';

// TODO WAJIB DIISI SEBELUM RUN: nama organizer tidak ada di RAW_SRD2026.txt, ganti placeholder ini.
var IDENTITY = {
  eventName: 'Talkshow Scholarship For Reach A Dream (SRD) 2026',
  eventId: 'SRD2026',
  organizerName: 'TODO_ISI_NAMA_ORGANIZER',
  description: EVENT_DESCRIPTION,
  minTeam: 1,
  maxTeam: 1,
  active: true
};

// Timeline tunggal, dipakai bareng oleh keenam Phase (tanggal sama persis di semua baris raw data)
var TIMELINE = { name: 'Pendaftaran', start: '2026-08-22T00:00', end: '2026-09-19T23:59' };

var COMPLETION_MESSAGE = 'Selesaikan pembayaran dengan scan QRIS tagihan pendaftaran setelah ini agar secara resmi '
  + 'terdaftar pada Talkshow Scholarship For Reach A Dream (SRD) 2026.';

function pesertaFields(nameSuffix, isUmum) {
  var s = nameSuffix ? ' (' + nameSuffix + ')' : '';
  if (isUmum) {
    return [
      { label: 'Nama Lengkap' + s, type: 'text', required: true },
      { label: 'Asal Instansi' + s, type: 'text', required: true },
      { label: 'Asal Daerah' + s, type: 'text', required: true }
    ];
  }
  return [
    { label: 'Nama Lengkap' + s, type: 'text', required: true },
    { label: 'NIM Lengkap' + s, type: 'text', required: true },
    { label: 'Fakultas Lengkap' + s, type: 'text', required: true }
  ];
}

function teamFields(count, tag, isUmum) {
  if (count === 1) return pesertaFields(tag, isUmum); // Normal: 1 peserta, tanpa suffix P1
  var fields = [];
  for (var p = 1; p <= count; p++) {
    fields = fields.concat(pesertaFields(tag + ' P' + p, isUmum));
  }
  return fields;
}

// ===================== 6 PHASE (sesuai RAW_SRD2026.txt line 1-148) =====================

var PHASES = [
  {
    name: 'Umum - Normal', start: TIMELINE.start, end: TIMELINE.end, price: 25000,
    sections: [{ title: 'Data Peserta', fields: teamFields(1, 'Umum', true) }]
  },
  {
    name: 'Umum - Paket Bundling (Beli 2)', start: TIMELINE.start, end: TIMELINE.end, price: 40000,
    sections: [{ title: 'Data Peserta', fields: teamFields(2, 'Umum', true) }]
  },
  {
    name: 'Umum - Paket Bundling (Beli 3)', start: TIMELINE.start, end: TIMELINE.end, price: 70000,
    sections: [{ title: 'Data Peserta', fields: teamFields(3, 'Umum', true) }]
  },
  {
    name: 'Mahasiswa IPB - Normal', start: TIMELINE.start, end: TIMELINE.end, price: 20000,
    sections: [{ title: 'Data Peserta', fields: teamFields(1, 'Mhs', false) }]
  },
  {
    name: 'Mahasiswa IPB - Paket Bundling (Beli 2)', start: TIMELINE.start, end: TIMELINE.end, price: 30000,
    sections: [{ title: 'Data Peserta', fields: teamFields(2, 'Mhs', false) }]
  },
  {
    name: 'Mahasiswa IPB - Paket Bundling (Beli 3)', start: TIMELINE.start, end: TIMELINE.end, price: 50000,
    sections: [{ title: 'Data Peserta', fields: teamFields(3, 'Mhs', false) }]
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
// Gagal cepat & jelas kalau asumsi jumlah elemen sebelum/sesudah klik ternyata salah, alih-alih
// diam-diam ngisi elemen yang salah di Phase berikutnya.
function assertLengthGrew(before, after, what) {
  if (after <= before) {
    console.error('STOP: "' + what + '" tidak bertambah setelah diklik (before=' + before + ', after=' + after + '). '
      + 'Asumsi DOM di script ini ternyata tidak berlaku - cek manual di browser lalu lanjutkan sisanya sendiri.');
    return false;
  }
  return true;
}

// ===================== STEP 1 - IDENTITY =====================

async function fillIdentity(cfg) {
  console.log('%c=== Step 1: Identity ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '1Identity');
  await sleep(400);

  var allInputs = Array.from(document.querySelectorAll('input'));
  var textInputs = allInputs.filter(function (i) { return i.type === 'text'; });
  var eventNameInput = textInputs[0];
  var eventIdInput = textInputs[1];
  var organizerInput = textInputs[2];
  var numberInputs = allInputs.filter(function (i) { return i.type === 'number'; });
  var checkboxes = allInputs.filter(function (i) { return i.type === 'checkbox'; });
  var editables = Array.from(document.querySelectorAll('[contenteditable="true"]'));

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);
  fillInput(numberInputs[0], String(cfg.minTeam));
  fillInput(numberInputs[1], String(cfg.maxTeam));
  clickCheckbox(checkboxes[1], cfg.active);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
  if (cfg.organizerName.indexOf('TODO') === 0) {
    console.warn('%cOrganizer Name masih placeholder TODO - isi manual sebelum lanjut ke Create event!', 'color:#ef4444;font-weight:bold');
  }
}

// ===================== STEP 3 - PHASE + SECTIONS + FIELDS (6x, lihat catatan asumsi di header) =====================

var globalSectionCount = 0; // urutan section GLOBAL lintas-Phase, dipakai buat indexing tombol "Add field"

async function fillPhasesSectionsFields(phases) {
  console.log('%c=== Step 3: Chrononomics > Phase (' + phases.length + ' phase) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '3Chrononomics');
  await sleep(300);
  clickByText('button', 'Phase');
  await sleep(300);

  for (var pi = 0; pi < phases.length; pi++) {
    var phase = phases[pi];
    console.log('%c--- Phase ' + (pi + 1) + '/' + phases.length + ': ' + phase.name + ' ---', 'color:#6366f1;font-weight:bold');

    var nameInputsBefore = document.querySelectorAll('input[placeholder="New Phase"]').length;
    var addPhaseBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Phase'; });
    if (!addPhaseBtn) {
      console.error('STOP: tombol "Add Phase" tidak ditemukan untuk Phase ke-' + (pi + 1) + '. Sesuai README, tombol ini kemungkinan cuma tampil kalau belum ada Phase sama sekali - berarti nambah Phase ke-2 dst butuh interaksi lain yang belum didokumentasikan. Lanjutkan Phase ini secara manual di browser.');
      return false;
    }
    addPhaseBtn.click();
    await sleep(400);
    var nameInputsAfter = document.querySelectorAll('input[placeholder="New Phase"]').length;
    if (!assertLengthGrew(nameInputsBefore, nameInputsAfter, 'input[placeholder="New Phase"] setelah klik Add Phase')) return false;

    var nameInputs = Array.from(document.querySelectorAll('input[placeholder="New Phase"]'));
    var dtInputs = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
    fillInput(nameInputs[nameInputs.length - 1], phase.name);
    fillInput(dtInputs[dtInputs.length - 2], phase.start);
    fillInput(dtInputs[dtInputs.length - 1], phase.end);
    console.log('  Phase:', phase.name, phase.start, '->', phase.end);
    await sleep(200);

    var ok = await addSectionsAndFieldsForPhase(phase.sections, pi);
    if (!ok) return false;
  }
  return true;
}

async function addSectionsAndFieldsForPhase(sections, phaseIndex) {
  var sectionGlobalIndices = [];

  // 1) Tambah semua section punya Phase ini dulu (title doang, field belakangan - lihat README kenapa)
  for (var s = 0; s < sections.length; s++) {
    var addSectionBtnsBefore = buttonsWithText('Add section');
    var addSectionBtn = addSectionBtnsBefore[phaseIndex]; // README: 1 tombol "Add section" per Phase
    if (!addSectionBtn) {
      console.error('STOP: tombol "Add section" untuk Phase index ' + phaseIndex + ' tidak ditemukan (cuma ada ' + addSectionBtnsBefore.length + ' tombol "Add section" di DOM). Asumsi "1 tombol per Phase" dari README mungkin tidak berlaku persis begini utk >1 Phase - cek manual.');
      return false;
    }

    var titleInputsBefore = document.querySelectorAll('input[placeholder="Section title"]').length;
    addSectionBtn.click();
    await sleep(400);
    var titleInputsAfter = document.querySelectorAll('input[placeholder="Section title"]').length;
    if (!assertLengthGrew(titleInputsBefore, titleInputsAfter, 'input[placeholder="Section title"] setelah klik Add section')) return false;

    var titleInputs = Array.from(document.querySelectorAll('input')).filter(function (i) { return i.type === 'text' && i.placeholder === 'Section title'; });
    fillInput(titleInputs[titleInputs.length - 1], sections[s].title);
    console.log('  Section: ' + sections[s].title);
    sectionGlobalIndices.push(globalSectionCount);
    globalSectionCount++;
    await sleep(200);
  }

  // 2) Field per section, "Add field" diindex secara GLOBAL lintas-Phase (asumsi urutan DOM = urutan
  //    section apa adanya sejak Phase pertama - lihat peringatan di header file)
  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    var globalSecIdx = sectionGlobalIndices[si];
    console.log('%c  -- Fields for "' + section.title + '" (' + section.fields.length + ') --', 'color:#8b5cf6');

    for (var fi = 0; fi < section.fields.length; fi++) {
      var addFieldBtns = buttonsWithText('Add field');
      var addFieldBtn = addFieldBtns[globalSecIdx];
      if (!addFieldBtn) {
        console.error('STOP: tombol "Add field" utk section global index ' + globalSecIdx + ' tidak ditemukan (cuma ada ' + addFieldBtns.length + ' tombol "Add field" di DOM). Cek manual.');
        return false;
      }
      var container = addFieldBtn.parentElement;

      var fieldElsBefore = container.querySelectorAll(':scope > div.group').length;
      addFieldBtn.click();
      await sleep(350);
      var fieldElsAfter = container.querySelectorAll(':scope > div.group').length;
      if (!assertLengthGrew(fieldElsBefore, fieldElsAfter, 'div.group field container setelah klik Add field')) return false;

      var fieldEls = Array.from(container.querySelectorAll(':scope > div.group'));
      var newField = fieldEls[fieldEls.length - 1];
      newField.click(); // expand (collapsed by default)
      await sleep(350);

      var field = section.fields[fi];
      var editables = Array.from(newField.querySelectorAll('[contenteditable="true"]'));
      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));

      fillEditable(editables[0], field.label);
      await sleep(150);
      if (field.required && checkboxes[0]) clickCheckbox(checkboxes[0], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('    [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
  return true;
}

// ===================== STEP 3b - TIMELINE (1 timeline, dipakai bersama oleh 6 Phase) =====================

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

// ===================== STEP 3c - TIME-PRICE (6 Phase x 1 Timeline - BELUM TERVERIFIKASI, lihat header) =====================

async function fillTimePrice(phases) {
  console.log('%c=== Step 3: Chrononomics > Time-Price (' + phases.length + ' cell, PERIKSA MANUAL SETELAH INI) ===', 'color:#ef4444;font-weight:bold');
  clickByText('button', 'Time-Price');
  await sleep(400);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  var selects = Array.from(document.querySelectorAll('select'));
  // ASUMSI (belum diverifikasi live, lihat README): tiap cell = 1 Price input + 1 fee select + 1 fee
  // input + 1 tax select + 1 tax input = 3 number input & 2 select per cell, berurutan flat mengikuti
  // urutan Phase (karena cuma 1 Timeline). Kalau urutan cell di UI ternyata bukan per-Phase berurutan,
  // console log di bawah akan salah tempatkan harga - COCOKKAN SATU-SATU dengan tampilan di browser.
  for (var i = 0; i < phases.length; i++) {
    var priceInput = numberInputs[i * 3];
    var feeSelect = selects[i * 2];
    var feeInput = numberInputs[i * 3 + 1];
    var taxSelect = selects[i * 2 + 1];
    var taxInput = numberInputs[i * 3 + 2];

    if (!priceInput || !feeSelect || !feeInput || !taxSelect || !taxInput) {
      console.error('STOP: elemen Time-Price cell ke-' + (i + 1) + ' (' + phases[i].name + ') tidak lengkap di DOM (index diluar jangkauan). Isi sisanya manual - cocokkan cell dengan nama Phase yang terlihat di layar.');
      return false;
    }

    fillInput(priceInput, String(phases[i].price));
    fillSelect(feeSelect, 'flat');
    fillInput(feeInput, '0');
    fillSelect(taxSelect, 'flat');
    fillInput(taxInput, '0');
    console.log('  cell ' + (i + 1) + ' (harusnya "' + phases[i].name + '"): Rp' + phases[i].price + ' -- VERIFIKASI nama Phase di layar cocok!');
  }
  return true;
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

// ===================== STEP 6 - REVIEW (report only, tidak pernah auto-submit) =====================

async function reportReview() {
  console.log('%c=== Step 6: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '6Review');
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek jumlah Phase (6), Section (6), Field (54), dan tiap cell harga SATU-SATU sebelum klik "Create event".'
    : '%cNOT READY -> cek duplicate field keys (kemungkinan besar karena 6 Phase x label mirip) atau data yang belum lengkap.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ SRD2026 - Talkshow Scholarship For Reach A Dream (6 Phase) ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  await fillIdentity(IDENTITY);

  var phasesOk = await fillPhasesSectionsFields(PHASES);
  if (!phasesOk) { console.error('%cBERHENTI di Step 3 Phase/Section/Field - lihat pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); return; }

  await fillTimeline(TIMELINE);

  var priceOk = await fillTimePrice(PHASES);
  if (!priceOk) { console.error('%cBERHENTI di Step 3 Time-Price - lihat pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); return; }

  await fillCompletion(COMPLETION_MESSAGE);
  await reportReview();
  console.log('%cDone. Nothing is saved yet - review Step 6 & tiap cell Time-Price manual, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
