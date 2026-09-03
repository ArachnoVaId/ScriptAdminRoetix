// NEW ADMIN UI (admin.roetix.com/events/create) - LUMINUX 2.0 UNESA 2026 - BMC & UI/UX (Batch 2)
// Companion doc: ../../NewAdminUI/README.md (catatan DOM).
// Engine: sama dengan ../../PORFIS2026/JSON/Create_PORFIS2026_*.js (1 Phase x 1 Timeline +
//   pre-flight cek draft + guard STOP per step), mekanisme Options versi baru dari
//   ../../StudentPreneur26/JSON/Create_UISP2026_BMCC.js.
// Data source: ../RAW_Context.txt
//   baris harga: "Lomba BMC (Batch 2) & Lomba UI/UX (Batch 2) | 1-15 September 2026 | Rp60.000 | est. 10-15 peserta/lomba | Fee Roetix Rp8.000 | Diterima Panitia Rp52.000"
//
// SATU event untuk kedua cabang (BMC & UI/UX), mengikuti DATA FORM di RAW apa adanya - lihat
// keputusan 1 di bawah.
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
// FEE SCHEMA - INKLUSIF (kebalikan PORFIS 2026, jangan tertukar):
//   RAW: "Harga Peserta Rp60.000 | Fee Roetix (dipotong dari panitia) Rp8.000 | Diterima Panitia Rp52.000"
//   Kata kuncinya "DIPOTONG DARI PANITIA" -> fee tidak ditambahkan di atas harga peserta, tapi diambil
//   dari harga itu. Sama seperti SilverParadeXII (price = gross - fee), BUKAN seperti PORFIS/COMMSPACE
//   /SRD/UISP yang on-top.
//     TIME_PRICE.price = 52.000  (yang diterima panitia)
//     TIME_PRICE.fee   =  8.000  (potongan Roetix)
//     Peserta membayar = 60.000  (persis angka "Harga Peserta" di RAW)
//   Kalau angka yang tampil di Step 4 Time-Price ternyata jadi Rp60.000 + Rp8.000 = Rp68.000, berarti
//   platform memperlakukan fee sebagai on-top -> set price = 60000 dan fee = 0, lalu potongan Rp8.000
//   diselesaikan di sisi settlement, JANGAN dibebankan lagi ke peserta.
//
// !!! WAJIB DICEK SEBELUM RUN !!!
//   a. EVENT_DESCRIPTION masih placeholder - RAW_Context.txt tidak punya copy promosi/poster sama
//      sekali (isinya cuma tabel harga + struktur form). Minta caption/poster resmi ke panitia.
//   b. Organizer Name "HIMAFORTIC UNESA" DITEBAK dari handle Instagram @himafortic_unesa di RAW.
//      Verifikasi nama resmi penyelenggara.
//   c. REQUIRED: RAW tidak menandai satu pun field sebagai wajib/opsional. Asumsi yang dipakai:
//      Data Tim + Data Ketua Tim + Data Anggota 1 + Pernyataan = WAJIB (tim minimal 2 orang),
//      Data Anggota 2 = OPSIONAL (lihat keputusan 4 di bawah). Konfirmasi ke panitia.
//
// KEPUTUSAN atas sumber (didokumentasikan, bukan diam-diam):
//   1. SATU event untuk kedua cabang, mengikuti DATA FORM di RAW apa adanya: RAW hanya punya SATU
//      "DATA FORM LUMINUX 2.0" dengan "Cabang Lomba" sebagai pertanyaan Option di dalamnya, dan kedua
//      lomba punya harga (Rp60.000), timeline (1-15 September 2026), serta daftar field yang identik.
//      Jadi cabang jadi field multiple_choice - pola yang sama dengan "Team Composition" di UISP BMCC.
//      Konsekuensi yang perlu disadari: daftar peserta BMC dan UI/UX bercampur dalam satu event dan
//      harus dipisah dengan memfilter kolom "Cabang Lomba" saat ekspor. Kalau panitia butuh dua daftar
//      yang benar-benar terpisah (atau kuota/penutupan pendaftaran per cabang), event ini harus dipecah
//      jadi dua - saat itu field "Cabang Lomba" WAJIB dihapus supaya peserta tidak bisa memilih cabang
//      yang tidak cocok dengan event tempat dia mendaftar.
//   2. Hanya Batch 2. RAW cuma memuat baris "(Batch 2) 1-15 September 2026". Kalau Batch 1 masih
//      perlu dibuat, butuh tabel harga & timeline-nya sendiri.
//   3. DUPLICATE KEY - 7 pertanyaan yang sama persis diulang 3x (Ketua Tim / Anggota 1 / Anggota 2).
//      Key di platform di-auto-slug DARI LABEL, jadi label mentah akan bentrok dan Step 7 pasti
//      menolak dengan "Not ready to finish - missing: ...". Semua label anggota disuffix
//      "(Ketua Tim)" / "(Anggota 1)" / "(Anggota 2)" - pola yang sama dengan "Academic Batch
//      (Team Leader)" di UISP BMCC. JANGAN hapus suffix-nya.
//   4. Data Anggota 2 dibuat OPSIONAL (required: false) karena "Jumlah Anggota Tim" mengizinkan tim
//      2 orang. Trik UISP (field tetap wajib, peserta isi "-") tidak bisa dipakai di sini: 2 dari 7
//      field-nya adalah upload file, dan file tidak bisa diisi "-". Instruksinya ditulis di
//      description section.
//   5. "Pernyataan Peserta" di RAW bertipe Checklist (multi-jawaban). New Admin UI TIDAK punya tipe
//      itu - Answer Type yang tersedia cuma text/email/phone/number/date/file/link/multiple_choice.
//      Dipakai pola ICGS "Syarat & Ketentuan": 1 field multiple_choice, ke-9 pernyataan ditaruh di
//      description field, options ['Menyetujui'], required. Efeknya sama (peserta harus setuju untuk
//      lanjut), hanya tidak tercatat centang per-butir.
//   6. Blok "Konfirmasi Pembayaran / Konfirmasi Pendaftaran" di RAW BUKAN field form - isinya teks
//      yang muncul SETELAH formulir dikirim, jadi dipakai sebagai COMPLETION_MESSAGE (Step 5).
//      Per permintaan panitia 2026-08-31, bagian KONFIRMASI PEMBAYARAN-nya DIHAPUS (format pesan
//      "Pembayaran_MetodePembayaran_NamaTim_NamaInstansi_CabangLomba", catatan verifikasi, dan
//      kalimat tautan grup WhatsApp) - pembayaran ditangani Roetix, bukan transfer manual yang perlu
//      dikonfirmasi ke narahubung. Yang dipertahankan hanya konfirmasi PENDAFTARAN + kontak narahubung.
//   7. "Link Postingan Twibbon" ditulis "Isian singkat" di RAW, tapi jelas berisi URL -> tipe 'link'.
//   8. Team size platform dibiarkan OFF (default Step 2 States). Jumlah anggota sudah ditangani field
//      "Jumlah Anggota Tim", dan DOM min/max saat toggle itu ON belum pernah diverifikasi (README).
//
// TODO manual setelah script jalan: upload banner event di Step 1 (input file, tidak bisa diisi script).

var EVENT_DESCRIPTION = [
  'LUMINUX 2.0 UNESA 2026',
  '',
  'Cabang Lomba:',
  '- Business Model Canvas (BMC)',
  '- UI/UX Design',
  '',
  'Pendaftaran Batch 2: 1 - 15 September 2026',
  'Biaya pendaftaran: Rp60.000 per tim',
  'Peserta: mahasiswa aktif D3/D4/S1 atau sederajat, 2-3 orang per tim',
  '',
  'Instagram: @himafortic_unesa | @luminux_2.0',
  '',
  'TODO: lengkapi dengan copy promosi/caption resmi dari panitia - RAW_Context.txt hanya berisi tabel',
  'harga dan struktur formulir, tidak ada deskripsi event.'
].join('\n');

var IDENTITY = {
  eventName: 'LUMINUX 2.0 UNESA 2026',
  eventId: 'LUMINUX2026',
  organizerName: 'HIMAFORTIC UNESA',   // DITEBAK dari @himafortic_unesa - lihat catatan (b) di header
  description: EVENT_DESCRIPTION
};

// RAW: "(Batch 2) 1-15 September 2026". Satu gelombang -> 1 Phase x 1 Timeline.
var PHASE = { name: 'Batch 2', start: '2026-09-01T00:00', end: '2026-09-15T23:59' };
var TIMELINE = { name: 'Batch 2', start: '2026-09-01T00:00', end: '2026-09-15T23:59' };

// Skema INKLUSIF - lihat blok FEE SCHEMA di header. price = yang diterima panitia, fee = potongan
// Roetix, peserta membayar price + fee = Rp60.000 (persis "Harga Peserta" di RAW).
var HARGA_PESERTA = 60000;
var FEE_ROETIX = 8000;
var TIME_PRICE = {
  price: HARGA_PESERTA - FEE_ROETIX,   // 52.000 diterima panitia
  feeType: 'flat',
  fee: FEE_ROETIX,                     // 8.000 dipotong Roetix
  taxType: 'flat',
  tax: 0
};

// Step 5 Completion. Teks persis seperti yang diminta panitia (2026-08-31) - bagian konfirmasi
// PEMBAYARAN dari RAW (format pesan "Pembayaran_MetodePembayaran_...", catatan verifikasi, dan
// tautan grup WhatsApp) SENGAJA TIDAK dipakai, karena pembayaran ditangani Roetix. Yang tersisa
// hanya konfirmasi PENDAFTARAN ke narahubung.
var COMPLETION_MESSAGE = [
  'Terima kasih telah melengkapi formulir pendaftaran LUMINUX 2.0 UNESA 2026.',
  '',
  'Setelah formulir ini dikirim, silakan melakukan konfirmasi bahwa tim telah menyelesaikan pendaftaran kepada narahubung melalui WhatsApp berikut:',
  '',
  'Narahubung Konfirmasi Pendaftaran:',
  ' Berliana Nidia — https://wa.me/6285784149198'
].join('\n');

// Ke-9 butir "Pernyataan Peserta" dari RAW. Ditaruh di description field persetujuan karena New Admin
// UI tidak punya tipe checklist multi-jawaban - lihat keputusan 5 di header.
var PERNYATAAN_TEXT = [
  'Dengan memilih "Menyetujui", saya menyatakan bahwa:',
  '1. Seluruh data yang saya isi adalah benar dan dapat dipertanggungjawabkan.',
  '2. Seluruh anggota tim merupakan mahasiswa aktif (D3/D4/S1 atau sederajat).',
  '3. Seluruh anggota tim telah mengikuti akun Instagram @himafortic_unesa dan @luminux_2.0.',
  '4. Seluruh anggota tim telah mengunggah twibbon dan menandai akun Instagram @luminux_2.0.',
  '5. Saya telah membaca, memahami, dan menyetujui seluruh Guidebook serta syarat dan ketentuan LUMINUX 2.0.',
  '6. Saya memahami bahwa biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan apabila mengundurkan diri.',
  '7. Tim kami bersedia mengikuti seluruh rangkaian kompetisi sesuai ketentuan panitia.',
  '8. Apabila tim kami lolos menjadi finalis, kami bersedia mengikuti babak Grand Final secara offline.',
  '9. Saya memahami bahwa keputusan dewan juri dan panitia bersifat final dan tidak dapat diganggu gugat.'
].join('\n');

// 7 pertanyaan yang identik untuk Ketua Tim / Anggota 1 / Anggota 2. Label WAJIB disuffix supaya key
// auto-slug-nya unik - lihat keputusan 3 di header.
function anggotaFields(suffix, wajib) {
  return [
    { label: 'Nama Lengkap (' + suffix + ')', type: 'text', required: wajib },
    { label: 'NIM (' + suffix + ')', type: 'text', required: wajib },
    { label: 'Program Studi (' + suffix + ')', type: 'text', required: wajib },
    { label: 'Username Instagram (' + suffix + ')', type: 'text', required: wajib },
    { label: 'Upload KTM/KTMS (' + suffix + ')', type: 'file', required: wajib },
    { label: 'Upload Bukti Follow Instagram @himafortic_unesa dan @luminux_2.0 (' + suffix + ')', type: 'file', required: wajib },
    { label: 'Link Postingan Twibbon (' + suffix + ')', type: 'link', required: wajib }
  ];
}

// Urutan field mengikuti DATA FORM di RAW persis, termasuk "Cabang Lomba" - lihat keputusan 1.
var SECTIONS = [
  {
    title: 'Data Tim',
    fields: [
      { label: 'Nama Tim', type: 'text', required: true },
      { label: 'Cabang Lomba', type: 'multiple_choice', required: true,
        options: ['Business Model Canvas (BMC)', 'UI/UX Design'] },
      { label: 'Asal Perguruan Tinggi', type: 'text', required: true },
      { label: 'Jumlah Anggota Tim', type: 'multiple_choice', required: true,
        options: ['2 Orang (1 Ketua + 1 Anggota)', '3 Orang (1 Ketua + 2 Anggota)'] },
      { label: 'Nomor WhatsApp Ketua Tim', type: 'phone', required: true },
      { label: 'Email Ketua Tim', type: 'email', required: true }
    ]
  },
  { title: 'Data Ketua Tim', fields: anggotaFields('Ketua Tim', true) },
  { title: 'Data Anggota 1', fields: anggotaFields('Anggota 1', true) },
  {
    title: 'Data Anggota 2',
    description: 'Isi bagian ini HANYA jika tim beranggotakan 3 orang. Lewati jika tim beranggotakan 2 orang.',
    fields: anggotaFields('Anggota 2', false)
  },
  {
    title: 'Pernyataan dan Konfirmasi',
    fields: [
      { label: 'Pernyataan Peserta', type: 'multiple_choice', required: true,
        description: PERNYATAAN_TEXT, options: ['Menyetujui'] }
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
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section, 1 Phase, 1 Timeline, peserta bayar Rp' + HARGA_PESERTA + ' (panitia terima Rp' + TIME_PRICE.price + ', fee Roetix Rp' + TIME_PRICE.fee + ').'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar. Tersangka utama di form ini: DUPLICATE FIELD KEY dari 7 pertanyaan yang berulang di Ketua Tim / Anggota 1 / Anggota 2 - pastikan suffix "(Ketua Tim)" / "(Anggota 1)" / "(Anggota 2)" masih utuh di semua label. Kalau key-nya ke-suffix "_2", berarti draft event sebelumnya belum dibersihkan.',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  console.warn('%cSEBELUM KLIK "Create event": (1) ganti EVENT_DESCRIPTION placeholder dengan copy resmi panitia, (2) verifikasi Organizer Name (ditebak dari @himafortic_unesa), (3) upload banner event di Step 1, (4) cek total harga peserta = Rp' + HARGA_PESERTA + '.', 'color:#f59e0b;font-weight:bold');
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
