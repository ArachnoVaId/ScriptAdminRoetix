// NEW ADMIN UI (admin.roetix.com/events/create) - PORFIS 2026 - Futsal SMA
// Companion doc: ../../NewAdminUI/README.md (catatan DOM). Engine sama dengan
// ../../LasswellCompspace/JSON/Create_LasswellCompspace_Poster.js (1 Phase x 1 Timeline),
// ditambah pre-flight cek kontaminasi draft yang diminta README.
// Data source: ../RAW_Context.txt  (blok "🏆 REGISTRATION FUTSAL SMA - PORFIS 2026")
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
// FEE SCHEMA (tabel harga panitia, bukan dari RAW_Context.txt):
//   "3x3 Univ Cowo/Cewe & Futsal SMA - Harga Dasar Rp400.000, Fee schema Rp17.500"
//   Kolom sumber = "Harga Dasar Pendaftaran" + "Fee schema" -> skema ON-TOP, sama seperti
//   COMMSPACE/SRD2026/UISP: TIME_PRICE.price = harga dasar, TIME_PRICE.fee ditambahkan di atasnya.
//   Peserta membayar Rp417.500 (Rp400.000 + Rp17.500), panitia menerima Rp400.000.
//
// !!! WAJIB DIPUTUSKAN SEBELUM RUN !!!
//   a. REQUIRED: di Google Form asli, "Nama Perwakilan", "Asal Sekolah", dan "Nomor WhatsApp
//      Perwakilan" ditandai OPSIONAL - satu-satunya yang wajib adalah upload screenshot follow IG.
//      Script mengikuti sumber apa adanya (required: false). Untuk form pendaftaran ini hampir pasti
//      salah setting dari panitia - konfirmasi dulu, lalu ubah ke true kalau perlu.
//   b. Tipe "phone" untuk Nomor WhatsApp adalah TEBAKAN extractor (di Google Form cuma isian singkat).
//      Kalau peserta biasa menulis "+62 857-xxxx-xxxx", tipe "text" lebih aman.
//   c. Toggle "Detailed pricing" (Step 2 States) dibiarkan OFF (default) - peserta hanya melihat harga
//      final Rp417.500, bukan breakdown. Rincian harga dasar + fee sudah ditulis manual di
//      EVENT_DESCRIPTION supaya tetap transparan. Nyalakan toggle-nya kalau panitia mau breakdown
//      resmi dari platform (belum pernah dites lewat script - toggle manual saja di UI).
//
// KEPUTUSAN atas sumber (didokumentasikan, bukan diam-diam):
//   1. Deskripsi event memakai copy promosi PORFIS apa adanya dari RAW (identik di kelima form),
//      ditambah 3 baris pembuka khusus kategori ini supaya peserta tidak salah pilih event.
//   2. Typo sumber diperbaiki: "Thropy" -> "Trophy", "Screenshoot" -> "Screenshot". Label
//      "Screenshot ..." mempengaruhi auto-slug key - konsisten di kelima script.
//   2b. Field "Bukti Pembayaran" DIHAPUS (permintaan 2026-08-26) - pembayaran ditangani Roetix, bukan
//      transfer manual lagi. Ikut dihapus karena jadi kontradiktif: (i) blok "Pembayaran / 4061554160
//      BCA a.n. Sintia Ramadani" di EVENT_DESCRIPTION, (ii) kalimat "pastikan bukti pembayaran ..."
//      di COMPLETION_MESSAGE. Kalau panitia ternyata TETAP mau transfer manual, kembalikan ketiganya
//      sekaligus - jangan cuma salah satu.
//      Catatan "Format doc: SMAN 111 Jakarta" di sumber menempel pada field Bukti Pembayaran itu, jadi ikut
//      hilang; sisa yang masih berguna dipindah jadi contoh isian di field "Asal Sekolah".
//   3. Judul section Google Form ("🏆 REGISTRATION FUTSAL SMA - PORFIS 2026") tidak dipakai sebagai
//      judul section platform (redundan dengan nama event) - diganti "Data Pendaftaran Tim".
//   4. Phase & Timeline sama-sama memakai window Open Registration 8 Agustus - 12 Oktober 2026.
//      Tidak ada gelombang harga di RAW -> 1 Phase x 1 Timeline (indeks Time-Price yang sudah
//      terverifikasi live, bukan matrix >1x1 yang masih meragukan).
//   5. Team size platform dibiarkan OFF (default Step 2 States). Form hanya meminta data 1 perwakilan
//      tim, tidak ada data anggota - jadi di sisi platform ini event individual.
//
// TODO manual setelah script jalan: upload banner event di Step 1 (input file, tidak bisa diisi script).

var EVENT_DESCRIPTION = [
  '⚽ PORFIS 2026 - Kategori: Futsal SMA',
  '💲 Biaya pendaftaran: Rp400.000 + fee layanan Rp17.500 = Rp417.500',
  '📅 Pelaksanaan: 26-28 Oktober 2026  |  📍 Lapangan Universitas Esa Unggul Jakarta',
  '',
  'Halo, Champions! 👋🏻',
  'Sudah siap membawa tim kalian menjadi bagian dari Rise of Champions?',
  'PORFIS (Pekan Olahraga Fisioterapi) 2026 merupakan ajang kompetisi olahraga yang diselenggarakan oleh Badan Eksekutif Mahasiswa Fakultas Fisioterapi Universitas Esa Unggul sebagai wadah untuk meningkatkan sportivitas, mempererat tali persaudaraan, serta mengembangkan semangat kompetitif yang sehat melalui cabang olahraga Basket 3x3 dan Futsal.',
  '',
  'Open Registration: 8 Agustus 2026 - 12 Oktober 2026',
  '',
  '🏀 Basket 3x3 Putra & Putri 🏀',
  '📅 Pelaksanaan: 24 Oktober 2026',
  '📍 Lokasi: Gor Grogol',
  '💲 Fee Registration:',
  'Basket 3x3 Sekolah: Rp. 300.000',
  'Basket 3x3 Univ Putra: Rp. 400.000',
  'Basket 3x3 Univ Putri: Rp. 400.000',
  '',
  '⚽ Futsal ⚽',
  '📅 Pelaksanaan: 26-28 Oktober 2026',
  '📍 Lokasi: Lapangan Universitas Esa Unggul Jakarta',
  '💲 Fee Registration:',
  'Futsal Sekolah: Rp. 400.000',
  'Futsal Univ: Rp. 500.000',
  '(Harga di atas adalah harga dasar, belum termasuk fee layanan.)',
  '',
  '🏆 Benefit',
  'Prize Pool: Rp. 13.000.000 +',
  'Trophy',
  'Sertifikat',
  '',
  '📱 Contact Person:',
  '085779244685 (Helena)',
  '08119723012 (Nadin)',
  '',
  'Pastikan seluruh data yang diisi sudah benar sebelum mengirim formulir. Terima kasih atas partisipasinya. Sampai bertemu di PORFIS 2026 - Rise of Champions! 🔥🔥'
].join('\n');

var IDENTITY = {
  eventName: 'PORFIS 2026 - Futsal SMA',
  eventId: 'PORFIS2026FUTSALSMA',
  // RAW: "diselenggarakan oleh Badan Eksekutif Mahasiswa Fakultas Fisioterapi Universitas Esa Unggul".
  organizerName: 'BEM Fakultas Fisioterapi Universitas Esa Unggul',
  description: EVENT_DESCRIPTION
};

// Open Registration 8 Agustus - 12 Oktober 2026 (RAW). Tidak ada gelombang harga -> 1 Phase, 1 Timeline.
var PHASE = { name: 'Registration', start: '2026-08-08T00:00', end: '2026-10-12T23:59' };
var TIMELINE = { name: 'Registration', start: '2026-08-08T00:00', end: '2026-10-12T23:59' };

// Harga dasar dari RAW ("Futsal Sekolah: Rp. 400.000") + fee dari tabel fee schema panitia.
// Skema ON-TOP: peserta bayar Rp400.000 + Rp17.500 = Rp417.500.
var TIME_PRICE = { price: 400000, feeType: 'flat', fee: 17500, taxType: 'flat', tax: 0 };

var COMPLETION_MESSAGE = [
  'Terima kasih sudah mendaftar Futsal SMA - PORFIS 2026! 🏆',
  '',
  'Pelaksanaan: 26-28 Oktober 2026',
  'Lokasi: Lapangan Universitas Esa Unggul Jakarta',
  '',
  'Pastikan screenshot follow @porfis.ueu yang kamu unggah sudah benar.',
  'Informasi teknis lanjutan akan diumumkan panitia melalui Instagram @porfis.ueu.',
  '',
  'Contact Person:',
  '085779244685 (Helena)',
  '08119723012 (Nadin)',
  '',
  'Sampai bertemu di PORFIS 2026 - Rise of Champions! 🔥'
].join('\n');

var SECTIONS = [
  {
    title: 'Data Pendaftaran Tim',
    fields: [
      { label: 'Nama Perwakilan', type: 'text', required: false },
      { label: 'Asal Sekolah', type: 'text', required: false, description: 'Contoh: SMAN 111 Jakarta' },
      { label: 'Nomor WhatsApp Perwakilan', type: 'phone', required: false },
      { label: 'Screenshot Follow Ig @porfis.ueu', type: 'file', required: true }
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
  console.warn('%cCEK MANUAL: deskripsi multi-baris diisi lewat execCommand insertText - pastikan line break & emoji tampil benar di editor.', 'color:#f59e0b');
  return true;
}

// ===================== STEP 2 - STATES =====================

async function visitStates() {
  console.log('%c=== Step 2: States (default sudah sesuai event individual, tidak diubah) ===', 'color:#6366f1;font-weight:bold');
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
    console.log('  Section ' + (s + 1) + ': ' + sections[s].title + (sections[s].fields.length ? '' : ' (info-only, tanpa field)'));
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
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, 1 Phase, 1 Timeline, harga dasar Rp' + TIME_PRICE.price + ' + fee Rp' + TIME_PRICE.fee + ' = Rp' + (TIME_PRICE.price + TIME_PRICE.fee) + ' yang dibayar peserta.'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar (biasanya duplicate field key atau data kosong).',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  console.warn('%cSEBELUM KLIK "Create event": (1) upload banner event di Step 1, (2) cocokkan harga dasar + fee dengan tabel fee schema panitia, (3) pastikan 3 field opsional memang dibiarkan opsional - lihat header script.', 'color:#f59e0b;font-weight:bold');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c=== ' + IDENTITY.eventName + ' (' + TOTAL_FIELDS + ' field) ===', 'color:#6366f1;font-weight:bold;font-size:14px');
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
