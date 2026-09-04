// NEW ADMIN UI (admin.roetix.com/events/create) - INDUSTRIAL FAIR 2026 - Company Visit Indosat
// Companion doc: ../../NewAdminUI/README.md (catatan DOM).
// Engine: sama dengan ../../LUMINUX2.0/JSON/Create_LUMINUX2026.js dan ../../PORFIS2026/JSON/*
//   (pre-flight cek draft + guard STOP per step), mekanisme Options versi baru
//   dari ../../StudentPreneur26/JSON/Create_UISP2026_BMCC.js.
// Data source: ../RAW_Context_Compvis.txt (hasil ekstraksi Google Form)
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
//   a. HARGA. RAW_Context_Compvis.txt sama sekali tidak menyebut biaya pendaftaran, fee, maupun
//      metode pembayaran. TIME_PRICE di bawah di-set GRATIS (price 0, fee 0) - itu tebakan paling
//      aman untuk company visit, BUKAN fakta dari sumber. Kalau ternyata berbayar, isi HARGA_PESERTA
//      + FEE_ROETIX dan tentukan dulu skemanya:
//        ON-TOP (PORFIS/COMMSPACE/SRD/UISP): price = harga panitia, fee ditambahkan -> peserta bayar price + fee
//        INKLUSIF (SilverParade/LUMINUX):    price = harga poster - fee -> peserta bayar persis harga poster
//   b. TANGGAL PENDAFTARAN - SUDAH DIKONFIRMASI PANITIA (2026-09-03), DUA GELOMBANG:
//        Normal Registration : 21 September - 2 Oktober 2026
//        Extend Registration : 3 Oktober - 6 Oktober 2026
//      Bukan lagi asumsi. (Acara sendiri 16 Oktober 2026, 09.00-11.20 WIB.)
//      Karena ada 2 gelombang, script ini memakai 1 Phase x 2 Timeline - lihat keputusan 8.
//   c. TEMA acara masih "......" di RAW (panitia belum mengisinya) - lihat EVENT_DESCRIPTION.
//   d. KONTAK PERSON - NOMOR WHATSAPP SUDAH DIISI (dikonfirmasi panitia 2026-09-03):
//        Ayu Putri     : +62 851-6121-5610
//        Nabila Aisyah : +62 821-1331-0636
//      LINE ID keduanya masih kosong di RAW dan TIDAK ditanyakan - kalau panitia mau LINE juga
//      ditampilkan, tambahkan sendiri di EVENT_DESCRIPTION.
//
// KEPUTUSAN atas sumber (didokumentasikan, bukan diam-diam):
//   1. Section 3 "Non-Attendance Reason" dibuat OPSIONAL (required: false), padahal RAW menandainya
//      required: true. Alasannya: di Google Form section itu hanya muncul lewat branching kalau
//      peserta menjawab "No, I cannot attend". New Admin UI TIDAK punya conditional logic - semua
//      section selalu tampil. Kalau dibiarkan wajib, peserta yang BISA hadir pun terpaksa mengisi
//      alasan tidak hadir dan form tidak bisa dikirim. Instruksinya ditulis di description section.
//   2. Section 2 "Agreement" tetap 2 field multiple_choice persis seperti RAW (termasuk opsi "No"),
//      supaya jawaban "No" tetap terekam dan bisa difilter panitia saat ekspor. Kalau panitia mau
//      form ini cuma menerima yang setuju + bisa hadir, hapus opsi "No..." di kedua field - saat itu
//      Section 3 jadi tidak relevan dan sebaiknya ikut dihapus.
//   3. Label dibersihkan dari contoh isian. RAW menempelkan contoh ke judul pertanyaan
//      ("Full Name *e.g.  Olivia Rose Anderson"). Di New Admin UI contoh dipindah ke Description
//      field supaya label tetap pendek dan key auto-slug-nya bersih (FullName, bukan
//      FullNameEGOliviaRoseAnderson).
//   4. Teks field/description ditulis dalam BAHASA INGGRIS mengikuti form aslinya (peserta form ini
//      dilayani dalam bahasa Inggris). Komentar kode tetap bahasa Indonesia.
//   5. "Phone Number" -> tipe 'phone'. RAW menandainya "phone (?)" alias tebakan dari kata kunci
//      judul, tapi labelnya eksplisit minta format +62 jadi tipe phone sudah tepat.
//   6. Team size platform dibiarkan OFF (default Step 2 States) - pendaftaran ini per individu.
//   7. Tidak ada field upload/bukti pembayaran, konsisten dengan keputusan (a): event di-set gratis.
//   8. DUA TIMELINE (Normal + Extend) di bawah SATU Phase, bukan dua event terpisah. Alasannya kedua
//      gelombang memakai form dan HARGA yang sama - yang berbeda cuma jendela waktunya - jadi tidak
//      ada alasan memecah event (beda dari BNAT XV, yang harganya memang beda per kategori).
//      PERHATIAN: menurut NewAdminUI/README.md, matrix Time-Price >1x1 indeksnya "kelipatan per sel"
//      (numberInputs[i*3] / selects[i*2]) dan BELUM PERNAH DIVERIFIKASI LIVE SAMPAI TUNTAS. Proses
//      menambah Timeline-nya sendiri sudah terverifikasi (StudentPreneur26, 3 Timeline sekaligus),
//      yang belum cuma pemetaan sel harganya. Di event ini risikonya kecil karena kedua sel sama-sama
//      GRATIS (price 0, fee 0), tapi TETAP cocokkan manual di layar Step 4 > Time-Price bahwa baris
//      "Normal Registration" dan "Extend Registration" dua-duanya menunjukkan angka yang benar
//      sebelum klik "Create event". Kalau nanti event ini jadi berbayar, pencocokan manual itu WAJIB.
//
// TODO manual setelah script jalan: upload banner event di Step 1 (input file, tidak bisa diisi script).

var EVENT_DESCRIPTION = [
  'Company Visit to Indosat - Industrial Fair 2026',
  '',
  'Greetings, Future Leaders!',
  '',
  'Industrial Fair 2026 is thrilled to invite you to an exclusive Company Visit to Indosat - a unique',
  'opportunity to explore the dynamic world of telecommunications and digital technology. This visit',
  'offers a firsthand look into Indosat\'s cutting-edge strategies and industry-leading innovations in',
  'Indonesia\'s telecommunication sector. It is a valuable chance to connect, learn, and gain',
  'inspiration from one of Indonesia\'s top digital and telecommunications giants.',
  '',
  'Event details:',
  'Date  : Friday, October 16th 2026',
  'Time  : 09.00 - 11.20 WIB',
  'Place : Indosat Marvelous Xperience Center, Jl. Medan Merdeka Barat No.21, Gambir, Jakarta Pusat,',
  '        DKI Jakarta 10110, Indonesia',
  '',
  'Registration period:',
  '- Normal Registration : September 21st - October 2nd, 2026',
  '- Extend Registration : October 3rd - October 6th, 2026',
  '',
  'Contact persons:',
  '- Ayu Putri Rizqiarti  | WhatsApp: +62 851-6121-5610',
  '- Nabila Aisyah        | WhatsApp: +62 821-1331-0636',
  '',
  'Warm Regards,',
  'Industrial Fair 2026',
  'Bridging Knowledge, Driving Effective Solutions',
  '',
  'TODO: RAW menulis tema acara sebagai "......" - minta tema resmi ke panitia lalu sisipkan di',
  'paragraf pembuka.'
].join('\n');

var IDENTITY = {
  eventName: 'Company Visit Indosat - Industrial Fair 2026',
  eventId: 'IFAIR2026COMPVIS',
  organizerName: 'Industrial Fair 2026',   // dari footer form ("Warm Regards, Industrial Fair 2026")
  description: EVENT_DESCRIPTION
};

// Dikonfirmasi panitia 2026-09-03. Satu Phase membentang penuh, dua Timeline di dalamnya - lihat
// keputusan 8 di header.
var PHASE = { name: 'Open Registration', start: '2026-09-21T00:00', end: '2026-10-06T23:59' };
var TIMELINES = [
  { name: 'Normal Registration', start: '2026-09-21T00:00', end: '2026-10-02T23:59' },
  { name: 'Extend Registration', start: '2026-10-03T00:00', end: '2026-10-06T23:59' }
];

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

// Step 5 Completion. RAW TIDAK memuat teks konfirmasi apa pun - teks di bawah DISUSUN dari detail
// acara yang ada di RAW (tanggal, jam, tempat, narahubung). Minta panitia mengonfirmasi/mengganti.
var COMPLETION_MESSAGE = [
  'Thank you for registering for the Company Visit to Indosat with Industrial Fair 2026.',
  '',
  'Your registration has been recorded. Please take note of the event details:',
  'Date  : Friday, October 16th 2026',
  'Time  : 09.00 - 11.20 WIB',
  'Place : Indosat Marvelous Xperience Center, Jl. Medan Merdeka Barat No.21, Gambir, Jakarta Pusat',
  '',
  'Further information will be shared by our committee before the event. If you have any questions,',
  'feel free to reach our contact persons:',
  '- Ayu Putri Rizqiarti  | WhatsApp: +62 851-6121-5610',
  '- Nabila Aisyah        | WhatsApp: +62 821-1331-0636',
  '',
  'Warm Regards,',
  'Industrial Fair 2026',
  'Bridging Knowledge, Driving Effective Solutions'
].join('\n');

// Ke-2 komitmen dari Section 2 di RAW. Ditaruh di description section supaya peserta membacanya
// sebelum menjawab kedua pertanyaan persetujuan.
var AGREEMENT_TEXT = [
  'Please read and agree to the following commitments!',
  '1. I agree to attend the Indosat company visit on October 16th punctually.',
  '2. I agree to actively participate in all activities throughout the Indosat Company Visit.'
].join('\n');

// Urutan section & field mengikuti RAW_Context_Compvis.txt persis.
var SECTIONS = [
  {
    title: 'Personal Information',
    fields: [
      { label: 'Full Name', type: 'text', required: true,
        description: 'e.g. Olivia Rose Anderson' },
      { label: 'Phone Number', type: 'phone', required: true,
        description: 'Use (+62) format, e.g. +628xxxxxxxxxx' },
      { label: 'Major', type: 'text', required: true,
        description: 'e.g. Industrial Engineering' },
      { label: 'University', type: 'text', required: true,
        description: 'e.g. Universitas Pembangunan Nasional "Veteran" Jakarta' }
    ]
  },
  {
    title: 'Agreement',
    description: AGREEMENT_TEXT,
    fields: [
      { label: 'Do you agree with the commitments listed above?', type: 'multiple_choice', required: true,
        options: ['Yes, I agree', 'No, I do not agree'] },
      { label: 'Will you be able to attend the event on October 16th from 09.00 - 11.20 WIB?',
        type: 'multiple_choice', required: true,
        options: ['Yes, I can attend', 'No, I cannot attend'] }
    ]
  },
  {
    title: 'Non-Attendance Reason',
    description: 'Fill in this section ONLY if you answered "No" above. Leave it blank if you are able to attend.',
    fields: [
      // required: false - New Admin UI tidak punya branching, lihat keputusan 1 di header.
      { label: 'If you cannot attend, please specify the reason', type: 'text', required: false }
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

// ===================== STEP 4b - TIMELINE (N timeline) =====================
// Klik "Add Timeline" berulang sudah terverifikasi live (README: StudentPreneur26, 3 Timeline).
// Tiap klik menambah timeline baru DI BAWAH, jadi input yang baru selalu yang TERAKHIR di DOM.

async function fillTimelines(list) {
  console.log('%c=== Step 4: Chrononomics > Timeline (' + list.length + ' timeline) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Timeline');
  await sleep(300);

  for (var i = 0; i < list.length; i++) {
    var cfg = list[i];
    var addTimelineBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Timeline'; });
    if (!addTimelineBtn) { console.error('STOP: tombol "Add Timeline" tidak ditemukan (timeline ke-' + (i + 1) + ').'); return false; }
    addTimelineBtn.click();
    await sleep(400);

    var names = Array.from(document.querySelectorAll('input')).filter(function (x) { return x.type === 'text' && x.placeholder === 'New Timeline'; });
    var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
    if (names.length !== i + 1 || dt.length < (i + 1) * 2) {
      console.error('STOP: setelah klik Add Timeline ke-' + (i + 1) + ', DOM tidak sesuai (name=' + names.length + ', datetime=' + dt.length + '). Isi manual.');
      return false;
    }
    fillInput(names[names.length - 1], cfg.name);
    fillInput(dt[dt.length - 2], cfg.start);
    fillInput(dt[dt.length - 1], cfg.end);
    console.log('Timeline ' + (i + 1) + ':', cfg.name, cfg.start, '->', cfg.end);
  }
  return true;
}

// ===================== STEP 4c - TIME-PRICE (1 Phase x N Timeline) =====================
// PERHATIAN: untuk N > 1 pemetaan sel BELUM diverifikasi live (README). Harga di event ini sama
// untuk semua sel (gratis), jadi salah-petakan pun angkanya identik - tapi tetap cocokkan di layar.

async function fillTimePrice(cfg, cellCount) {
  console.log('%c=== Step 4: Chrononomics > Time-Price ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', 'Time-Price');
  await sleep(400);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  var selects = Array.from(document.querySelectorAll('select'));
  if (numberInputs.length < cellCount * 3 || selects.length < cellCount * 2) {
    console.error('STOP: matrix Time-Price tidak lengkap untuk ' + cellCount + ' sel (number=' + numberInputs.length + ' butuh ' + (cellCount * 3) + ', select=' + selects.length + ' butuh ' + (cellCount * 2) + '). Isi manual.');
    return false;
  }

  for (var i = 0; i < cellCount; i++) {
    fillInput(numberInputs[i * 3], String(cfg.price));        // Price
    fillSelect(selects[i * 2], cfg.feeType);                  // Service fee type
    fillInput(numberInputs[i * 3 + 1], String(cfg.fee));      // Service fee value
    fillSelect(selects[i * 2 + 1], cfg.taxType);              // Tax type
    fillInput(numberInputs[i * 3 + 2], String(cfg.tax));      // Tax value
    console.log('Sel ' + (i + 1) + ' -> price:', cfg.price, '| fee:', cfg.feeType, cfg.fee, '| tax:', cfg.taxType, cfg.tax);
  }
  if (cellCount > 1) {
    console.warn('%cMATRIX ' + cellCount + ' SEL: pemetaan indeks per sel BELUM diverifikasi live (README). Cocokkan manual di layar bahwa tiap baris Timeline menunjukkan angka yang benar sebelum klik "Create event".', 'color:#ef4444;font-weight:bold');
  }
  console.warn('%cCEK ANGKA DI LAYAR: total yang dibayar peserta HARUS Rp' + HARGA_PESERTA + '.', 'color:#ef4444;font-weight:bold');
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
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section, 1 Phase, ' + TIMELINES.length + ' Timeline, harga ' + hargaTeks + '.'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar. Kalau ada key ber-suffix "_2", berarti draft event sebelumnya belum dibersihkan: localStorage.removeItem(\'roetix:competition-draft\'); location.reload();',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  console.warn('%cSEBELUM KLIK "Create event" - 4 data ini TIDAK ADA di RAW dan masih placeholder: (1) HARGA di-set gratis, konfirmasi ke panitia berbayar atau tidak; (2) tema acara masih "......" di RAW, minta tema resmi ke panitia; (3) COCOKKAN MANUAL di Step 4 > Time-Price bahwa kedua Timeline (Normal & Extend) menunjukkan angka yang benar - pemetaan sel matrix >1x1 belum diverifikasi live. Tanggal pendaftaran (21 Sep - 2 Okt normal, 3 - 6 Okt extend) dan nomor WhatsApp narahubung sudah dikonfirmasi panitia. Plus: upload banner event di Step 1.', 'color:#f59e0b;font-weight:bold');
}

// ===================== RUN =====================

(async function run() {
  console.log('%c=== ' + IDENTITY.eventName + ' (' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section) ===', 'color:#6366f1;font-weight:bold;font-size:14px');
  var abort = function (where) { console.error('%cBERHENTI di ' + where + ' - baca pesan STOP di atas, lanjutkan manual.', 'color:#ef4444;font-weight:bold'); };

  if (!await fillIdentity(IDENTITY)) return abort('Step 1 Identity');
  await visitStates();
  if (!await fillPhase(PHASE)) return abort('Step 4 Phase');
  if (!await addSectionsAndFields(SECTIONS)) return abort('Step 4 Sections/Fields');
  if (!await fillTimelines(TIMELINES)) return abort('Step 4 Timeline');
  if (!await fillTimePrice(TIME_PRICE, TIMELINES.length)) return abort('Step 4 Time-Price');
  if (!await fillCompletion(COMPLETION_MESSAGE)) return abort('Step 5 Completion');
  await reportReview();
  console.log('%cSelesai. Belum ada yang tersimpan - review Step 7, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
