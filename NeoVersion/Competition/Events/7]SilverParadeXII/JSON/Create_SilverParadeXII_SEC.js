// NEW ADMIN UI (admin.roetix.com/events/create) - Silver Essay Competition (SEC) - Silver Parade XII
// Fase: Pengumpulan Full Paper
// Companion doc: ../../NewAdminUI/README.md (DOM notes, engine turunan dari Create_UISP2026_BMCC.js)
// Data source: ../RAW/RAW_Paper_SilverParadeXII.txt (Google Form + tabel "Harga dan Estimasi Peserta")
//
// STRUKTUR: 1 event, 1 Phase, 3 Timeline (Gelombang 1/2/3 - beda tanggal & harga, field form SAMA persis
// di ketiganya - pola identik dengan StudentPreneur26 Early Bird/Normal/Late Bird). Tim ditangani lewat
// field "Nama Tim"/"Nama Anggota Tim" di dalam form, bukan fitur Team Size platform - Step 2 States
// dibiarkan default (Team size OFF = individual submission).
//
// SEBELUM RUN: pastikan wizard BENAR-BENAR kosong (README - draft lama ke-restore bikin indeks section/
// field bergeser tanpa error jelas). Cek jumlah tombol 'Add field'/'Add section' harus 0; kalau tidak:
//   localStorage.removeItem('roetix:competition-draft'); location.reload();
// JANGAN localStorage.clear() - itu menghapus sesi login.
//
// KEPUTUSAN atas data raw (lihat juga ../RAW/Tabled_Paper_SilverParadeXII.md):
//   1. HARGA: tabel "Harga dan Estimasi Peserta" menulis SEC = Rp80.000 flat (Gel 1-3), sedangkan
//      deskripsi Google Form merinci per gelombang (55rb/70rb/80rb). Per instruksi: HARGA ikut deskripsi
//      form, FEE ikut tabel harga. Lihat blok SERVICE_FEE di bawah.
//   2. Section 3 "Terimakasih" di form BUKAN section -> dipetakan ke Completion message (pola sama
//      seperti StudentPreneur26 Section 7 "Thank You!").
//   3. Dua section form berjudul sama persis ("PENGUMPULAN PAPER SILVER ESSAY COMPETITION") -> di-rename
//      "Data Tim" / "Pengumpulan Berkas"; judul duplikat tidak berguna sebagai header form builder.
//   4. Instruksi transfer BCA/BNI DIHAPUS dari EVENT_DESCRIPTION - peserta bayar lewat QRIS Roetix,
//      mencantumkan rekening manual akan menyesatkan pembeli.
//
// FIELD YANG SUDAH DIHAPUS dari form aslinya (jangan ditambahkan lagi):
//   - 'Tahap Pengumpulan Paper' (Gelombang 1/2/3) - dihapus 2026-08-22 atas keputusan user: penentuan
//     gelombang sudah otomatis dari Timeline pembelian di sistem Roetix, jadi pertanyaan manual ini
//     redundan dan jawabannya bisa bertentangan dengan tanggal transaksi asli.
//
// !!! SATU FIELD MASIH DIREKOMENDASIKAN DIHAPUS - keputusan di tanganmu (hapus 1 baris) !!!
//   [1] 'Unggah Bukti Pembayaran' - Roetix punya gateway QRIS, tidak ada bukti transfer manual untuk
//       diunggah. Precedent: RAINING (field payment-proof dibuang).
//
// TODO WAJIB DIISI SEBELUM RUN: Organizer Name (tidak ada di Google Form maupun tabel harga).

var EVENT_DESCRIPTION = '🎉 Selamat kepada seluruh peserta yang telah lolos tahap seleksi abstrak Silver Essay '
  + 'Competition (SEC) Silver Parade XII!\n\n'
  + 'Keberhasilan ini merupakan langkah awal yang membuktikan kualitas ide dan gagasan yang telah Anda ajukan '
  + 'dalam menjawab tantangan keberlanjutan melalui inovasi dengan tema "The Green Footprint: Advancing Green '
  + 'Materials to Achieve SDGs 2030." Selanjutnya, peserta diharapkan dapat melakukan pengumpulan full paper '
  + 'sesuai dengan tahapan yang telah ditentukan.\n\n'
  + '🕒 Timeline dan Biaya Pendaftaran\n'
  + 'Gelombang 1: 13-22 Agustus 2026 | Rp55.000\n'
  + 'Gelombang 2: 23 Agustus-1 September 2026 | Rp70.000\n'
  + 'Gelombang 3: 2-13 September 2026 | Rp80.000\n\n'
  + '📞 Contact Person\n'
  + 'Neyna: wa.me/6283831381091\n'
  + 'Rezky: wa.me/6285143960373\n\n'
  + 'Mohon mengisi data pada formulir di bawah ini sesuai dengan ketentuan yang berlaku. Apabila terdapat '
  + 'kendala dalam proses pengisian, silakan menghubungi contact person yang telah disediakan.\n'
  + 'Terima kasih atas partisipasi dan semangat yang telah Anda tunjukkan. Kami tunggu karya terbaik Anda dan '
  + 'berharap dapat bertemu sebagai "The Next Champion SEC XII." ✨';

var IDENTITY = {
  eventName: 'Silver Essay Competition XII - Pengumpulan Full Paper',
  eventId: 'SECXII2026PAPER',
  organizerName: 'TODO_ISI_NAMA_ORGANIZER',
  description: EVENT_DESCRIPTION,
  minTeam: 1,
  maxTeam: 1,
  active: true
};

// Phase tunggal, tanggalnya cukup span seluruh window pengumpulan - Timeline di bawah yang benar2
// membatasi harga/tanggal per gelombang.
var PHASE = { name: 'Pengumpulan Full Paper', start: '2026-08-13T00:00', end: '2026-09-13T23:59' };

// ===================== SKEMA HARGA & FEE =====================
// Tabel "Harga dan Estimasi Peserta" (RAW_Paper_SilverParadeXII.txt baris 18-22), baris SEC:
//   Harga Peserta Rp80.000 | Fee Roetix Rp10.000 (DIPOTONG DARI PANITIA) | Diterima Panitia Rp70.000
// Artinya fee TIDAK ditambahkan ke pembeli - peserta bayar persis angka yang dipromosikan, panitia yang
// menanggung fee. Di wizard Roetix kolom Price adalah basis yang diterima panitia dan Service fee
// ditumpuk di atasnya (harga di web = price + fee), jadi:  price = harga peserta - fee.
// Cross-check baris SEC: 80.000 - 10.000 = 70.000 = "Diterima Panitia" di tabel. Cocok.
//
// `gross` = harga yang dilihat & dibayar peserta, diambil dari deskripsi Google Form (per gelombang),
// BUKAN dari kolom "Harga Peserta" tabel yang menulis 80.000 flat untuk Gel 1-3. Ini sesuai instruksi:
// harga ikut deskripsi form, skema fee ikut tabel harga.
//
// `fee` per gelombang (bukan satu angka flat): Gelombang 1 pakai Rp8.000, Gelombang 2 & 3 Rp10.000.
// Rp8.000 adalah tarif yang sama dengan baris "Silver Talks" di tabel harga (Rp50.000 -> fee Rp8.000),
// jadi tier harga terendah memang memakai fee lebih rendah.
var TIMELINES = [
  { name: 'Gelombang 1', start: '2026-08-13T00:00', end: '2026-08-22T23:59', gross: 55000, fee: 8000 },
  { name: 'Gelombang 2', start: '2026-08-23T00:00', end: '2026-09-01T23:59', gross: 70000, fee: 10000 },
  { name: 'Gelombang 3', start: '2026-09-02T00:00', end: '2026-09-13T23:59', gross: 80000, fee: 10000 }
];

var TIME_PRICE_CELLS = TIMELINES.map(function (tl) {
  return {
    label: tl.name,
    gross: tl.gross,               // yang dibayar peserta
    price: tl.gross - tl.fee,      // yang diterima panitia
    feeType: 'flat', fee: tl.fee,
    taxType: 'flat', tax: 0
  };
});

// Dari Section 3 "Terimakasih" di Google Form.
var COMPLETION_MESSAGE = 'Terima kasih telah melakukan pengumpulan Full Paper Silver Essay Competition (SEC) '
  + 'Silver Parade XII. Untuk memperoleh informasi selanjutnya, peserta diharapkan bergabung ke grup WhatsApp '
  + 'melalui tautan berikut.\n'
  + 'https://chat.whatsapp.com/IABLJ5paXinDAHGZPTvwiD?s=cl&p=a&ilr=1';

var SUBTEMA_OPTIONS = [
  'Inovasi Material Hijau untuk Kesehatan dan Lingkungan',
  'Penanggulangan Limbah Ekstraksi Logam',
  'Nanomaterial untuk Konstruksi Berkelanjutan',
  'Rekayasa Material Pereduksi Emisi Karbon'
];

var SECTIONS = [
  {
    title: 'Data Tim',
    fields: [
      { label: 'Nama Tim', type: 'text', required: true },
      { label: 'Nama Ketua Tim', type: 'text', required: true, description: 'Ex: Razaqa Syafaat Qinthara Wildan' },
      { label: 'Nama Anggota Tim', type: 'text', required: true, description: 'Ex: 1. Neyna Putri Nabila 2. Ahmad Rezky' },
      { label: 'Asal Perguruan Tinggi', type: 'text', required: true, description: 'Ex: Institut Teknologi Sepuluh Nopember' },
      // Form aslinya mencontohkan "wa.me/62xx", tapi tipe phone kemungkinan menolak format URL - deskripsi
      // diubah supaya peserta mengisi angka. Kalau validasi phone Roetix tetap rewel, ganti type ke 'text'.
      { label: 'Nomor WhatsApp Ketua Tim', type: 'phone', required: true, description: 'Ex: 6283831381091' },
      { label: 'Email Ketua Tim', type: 'email', required: true, description: 'Ex: xxx@gmail.com' },
      { label: 'Subtema', type: 'multiple_choice', required: true, options: SUBTEMA_OPTIONS }
    ]
  },
  {
    title: 'Pengumpulan Berkas',
    fields: [
      // [1] KANDIDAT DIHAPUS - Roetix pakai QRIS gateway, tidak butuh bukti transfer manual.
      { label: 'Unggah Bukti Pembayaran (Nominal sesuai ketentuan gelombang)', type: 'file', required: true, description: 'Sesuai nominal gelombang pendaftaran.' },
      { label: 'Pengumpulan Surat Pernyataan Orisinalitas', type: 'file', required: true, description: 'Format wajib .pdf' },
      { label: 'Pengumpulan Full Paper', type: 'file', required: true, description: 'Format wajib .pdf' }
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
  // "Team size" OFF = individual submission (persis yang kita mau - data tim ditangani field teks di
  // dalam form), "Active" default ON. Lihat visitStates().

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
    console.log('  cell ' + (i + 1) + ' (harusnya "' + c.label + '"): panitia Rp' + c.price + ' + fee Rp' + c.fee
      + ' = peserta bayar Rp' + c.gross + ' -- VERIFIKASI nama Timeline di layar cocok!');
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
    ? '%cREADY -> "Everything looks good." Cek jumlah Timeline (3), Phase (1), Field (10), Priced cells (3), dan tiap cell harga SATU-SATU sebelum klik "Create event".'
    : '%cNOT READY -> cek duplicate field keys atau data yang belum lengkap.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c═══ Silver Essay Competition (SEC) - Silver Parade XII ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
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
  console.warn('%cKeputusan pending: field "Unggah Bukti Pembayaran" direkomendasikan DIHAPUS (lihat header script).', 'color:#f59e0b;font-weight:bold');
  console.log('%cDone. Nothing is saved yet - review Step 7 & tiap cell Time-Price manual, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
