// NEW ADMIN UI (admin.roetix.com/events/create) - The 16th UI Studentpreneurs
// - BMCC Registration - subevent LATE BIRD (3 dari 3: Early Bird / Normal Price / Late Bird)
// Companion doc: ../../NewAdminUI/README.md (DOM notes umum) + ./RECAP_UISP2026BMCC_live.md (recap field
// live per 2026-08-25, dipakai sebagai sumber data script ini)
// File kembar: Create_UISP2026_BMCC.js (Early Bird, event ID UISP2026BMCC - SUDAH ADA/live), dan
// Create_UISP2026_BMCC_NormalPrice.js. Isi identik, beda IDENTITY/PHASE1/TIME_PRICE_CELLS saja (lihat
// komentar "BEDA ANTAR SUBEVENT" di bawah).
//
// ⚠️ EVENT INI BELUM ADA - event ID 'UISP2026BMCCLB' di bawah adalah USULAN, BELUM di-cek ke admin apakah
// sudah dipakai. Event ID immutable setelah dibuat - PERIKSA dulu di daftar Events sebelum submit Step 7,
// dan koreksi IDENTITY.eventId di sini kalau panitia mau ID lain. Buka https://admin.roetix.com/events/create
// dari kosong (BUKAN /edit) untuk event baru ini.
//
// KENAPA 3 SUBEVENT TERPISAH (bukan 1 event 3 Timeline seperti versi lama Create_UISP2026_BMCC.js):
//   Sistem registrasi tidak punya mekanisme "hanya yang terdaftar prelim gelombang X yang boleh regis
//   ulang harga X" secara otomatis lintas-event. Solusinya: 1 event terpisah per gelombang (link beda-beda),
//   masing-masing berisi 2 Phase MILIK EVENT ITU SENDIRI:
//     Phase 1 "Registrasi Preliminary <Wave>"   - GRATIS, jendela waktu = gelombang itu saja (qualification gate)
//     Phase 2 "Registrasi Ulang Semifinal"      - BERBAYAR sesuai gelombang, 5-26 Nov (semua subevent sama)
//   Yang tidak submit Phase 1 di link gelombang tsb otomatis tidak bisa lanjut ke Phase 2-nya (gate bawaan
//   platform - Step 4 Phase UI eksplisit bilang "sets the qualification gate"). Dikonfirmasi user 2026-08-25.
//
// !!! PERINGATAN UTAMA - MULTI-PHASE DALAM 1 EVENT BELUM PERNAH DIVERIFIKASI LIVE DI REPO INI !!!
//   Semua event sebelumnya (ICGS/SRD2026/StudentPreneur26 versi lama) cuma 1 Phase. README bilang '>1
//   Phase belum pernah berhasil diverifikasi live'. Tapi live UI Step 4 Phase eksplisit mendukung >1 entry
//   ("Competition stages. Drag to reorder (sets the qualification gate)") dan Step 5 Completion eksplisit
//   mencontohkan pesan beda per Phase ("e.g. Early Bird vs Regular") - jadi INI FITUR YANG MEMANG ADA,
//   cuma belum pernah dites script di repo ini. Karena itu run() TIDAK auto-chain semua Phase sekaligus -
//   dipecah jadi 3 tahap manual via window.continuePhase2() dan window.finishRest() (lihat bagian RUN paling
//   bawah) supaya bisa verifikasi visual di layar antara Phase 1 selesai dan Phase 2 mulai diisi. KALAU
//   Create_UISP2026_BMCC.js (Early Bird) atau Create_UISP2026_BMCC_NormalPrice.js sudah pernah dijalankan
//   lebih dulu dan pola 2-Phase-nya terbukti jalan/tidak jalan di sana, cek dulu catatannya sebelum jalankan
//   file ini.
//
// STRUKTUR:
//   Identity/States/Media sama utk semua 3 subevent (cuma Event Name & Event ID beda per gelombang).
//   Phase 1 "Registrasi Preliminary <Wave>": 5 section, 25 field - FORM PENDAFTARAN awal (General Info,
//     Team Leader, Member 1, Member 2, Registration requirements) - isi & urutan identik antar subevent,
//     yang beda cuma nama & tanggal Phase (lihat tabel gelombang di IDENTITY/PHASE1 di bawah).
//   Phase 2 "Registrasi Ulang Semifinal": 1 section, 5 field - FORM RE-REGISTRASI + bukti bayar (Team Name,
//     Business Name, Team Leader Email, Team Leader Full Name, Proof of payment) - isi identik di ke-3
//     subevent, cuma HARGA yang beda per gelombang (lihat TIME_PRICE_CELLS).
//   Timeline: 1 saja ("Registration"), dipakai cuma supaya sel Time-Price Phase1 & Phase2 reachable
//     (grey cell = phase & timeline tidak overlap tanggal - lihat catatan live UI). Bukan Timeline
//     bergelombang seperti versi lama script ini.
//
// KEPUTUSAN atas ambiguitas data (dikonfirmasi user 2026-08-25, sama seperti Create_UISP2026_BMCC.js -
// lihat file itu / RECAP_UISP2026BMCC_live.md untuk detail lengkap): opsi 'Team Composition'/'How did you
// know'/'Are you interested' dilengkapi lagi, section 'Registration requirements' pakai 1 field upload
// gabungan + assessor partner '@bvi.id' dirapikan, typo '15th'->'16th' diperbaiki, section description
// Member 1/2 pakai teks 'Skip the section if you are registering as an individual'.
//
// STATES (Step 2) - diisi eksplisit sesuai live event referensi (BUKAN default platform):
//   Active ON, Featured OFF, Team size ON (Min 1 / Max 1), Referral codes ON, Detailed pricing ON.
//
// TODO TERSISA (perlu konfirmasi panitia sebelum live):
//   - Required/tidaknya tiap field di Phase 2 (raw re-registrasi tidak eksplisit tandai * di teks yang
//     dikirim user) - script ini asumsikan SEMUA 5 field Phase 2 required. Koreksi manual kalau perlu.
//   - Format file diterima Phase 2 (pdf/image) - live baru terverifikasi field upload single-format '.pdf'.
//     PERIKSA MANUAL saat isi Phase 2 field ke-5.

var EVENT_DESCRIPTION = [
  '🚀 READY TO TURN YOUR IDEA INTO IMPACT?',
  'Got a business idea but don’t know where to start?',
  'This is your chance to turn that idea into a real, strategic, and impactful business model. 💡',
  'Welcome to Business Model Canvas Competition — The 16th UI Studentpreneurs!',
  'Under the grand theme:',
  '“Innovate Beyond Uncertainty: Empowering Young Entrepreneurs to Shape Ideas into Impact.”',
  '',
  '✨ WHAT’S WAITING FOR YOU?',
  '🔹 Showcase your business idea through a 1-Page Business Model Canvas',
  '🔹 Get valuable insights from professional assessors & industry experts',
  '🔹 Challenge yourself to think strategically and solve real-world problems',
  '🔹 Win prizes worth IDR 20,000,000+! 🏆',
  '',
  '📌 WHO CAN JOIN?',
  'Active undergraduate students from S1, D3, D4, or equivalent programs across Indonesia.',
  '👥 Team: 1–3 students',
  '',
  '🗓️ REGISTRATION PERIOD',
  '19 September – 30 October 2026',
  '',
  '📋 HOW TO JOIN?',
  '1️⃣ Register through the registration form',
  '2️⃣ Complete all required registration documents',
  '3️⃣ Submit your 1-Page Business Model Canvas through the submission link provided by the committee',
  '',
  '📎 Registration Requirements: https://bit.ly/KeperluanRegistrasiBMCC16thUISP',
  '📖 Competition Guidebook: https://bit.ly/Guidebook16thUISP',
  '',
  '⚡ Your idea doesn’t have to be perfect. It just needs to start.',
  'Don’t let uncertainty stop you from building what could be your next big thing.',
  'See you at The 16th UI Studentpreneurs! 💙🚀',
  '',
  '📩 For further information:',
  'Nadia — Line: @ysnrnadia | WA: +6281282485499',
  'Joshe — Line: @Yukiren08 | WA: +6282114410806'
].join('\n');

// ============================ BEDA ANTAR SUBEVENT (mulai di sini) ============================

var IDENTITY = {
  eventName: 'The 16th UI Studentpreneurs - Late Bird BMCC Registration',
  eventId: 'UISP2026BMCCLB', // USULAN - event BARU, cek belum dipakai (immutable setelah dibuat)
  organizerName: 'BEM FEB UI',
  description: EVENT_DESCRIPTION
};

// Phase 1 - jendela gelombang Late Bird sesuai tabel (18-30 Oktober 2026), GRATIS.
var PHASE1 = { name: 'Registrasi Preliminary Late Bird', start: '2026-10-18T00:00', end: '2026-10-30T23:59' };

// Phase 2 - SAMA persis di 3 subevent (5-26 November), yang beda cuma harga di TIME_PRICE_CELLS.
var PHASE2 = { name: 'Registrasi Ulang Semifinal', start: '2026-11-05T00:00', end: '2026-11-26T23:59' };

// Timeline tunggal - bentang dari mulai Phase 1 subevent ini sampai akhir Phase 2, supaya kedua Phase
// overlap dengan Timeline ini (sel Time-Price tidak grey/unreachable). Bukan Timeline berharga seperti dulu.
var TIMELINE = { name: 'Registration', start: PHASE1.start, end: PHASE2.end };

// 2 Phase x 1 Timeline = 2 sel. Fee flat Rp11.000 cuma dikenakan di sel BERBAYAR (Phase 2) - sel gratis
// (Phase 1) fee & tax 0 (event gratis tidak ada transaksi, lihat RAW_Studentpreneur.txt baris 1 "per transaksi").
var TIME_PRICE_CELLS = [
  { label: PHASE1.name, price: 0, feeType: 'flat', fee: 0, taxType: 'flat', tax: 0 },
  { label: PHASE2.name, price: 195000, feeType: 'flat', fee: 11000, taxType: 'flat', tax: 0 }
];

// ============================ BEDA ANTAR SUBEVENT (selesai) ====================================

var COMPLETION_PHASE1 = [
  'Thank You!',
  'Thank you for registering for the BMC Competition!',
  'To be officially registered for the competition, please complete the QRIS payment on the next page.',
  'Access your Competition Guidebook here: https://bit.ly/Guidebook16thUISP',
  'Make sure to follow the format provided and submit your work maximum on the deadline date.',
  'Please join the Preliminary Round group to stay informed: https://chat.whatsapp.com/DoIRvGscTf56Tgxy19pr2N?s=cl&p=a&mlu=0',
  'We’re excited to see your amazing work. Good luck!'
].join('\n');

var COMPLETION_PHASE2 = [
  'Thank you!',
  'Thank you for re-registering for the Semifinal Round of BMCC at The 16th UI Studentpreneurs! We’re looking forward to seeing your incredible work. Best of luck!'
].join('\n');

var ACADEMIC_BATCH_OPTIONS = ['2023', '2024', '2025', '2026'];

var INDIVIDUAL_NOTE_SECTION = 'Skip the section if you are registering as an individual';
var INDIVIDUAL_NOTE_FIELD = 'Mark "-" if you are registering as an individual';

function memberFields(memberLabel, isTeamLeader) {
  var noteIndividual = isTeamLeader ? undefined : INDIVIDUAL_NOTE_FIELD;
  return [
    { label: memberLabel + ' Full Name', type: 'text', required: true, description: noteIndividual },
    { label: memberLabel + ' Institution', type: 'text', required: true, description: 'E.g. Universitas Indonesia' },
    { label: memberLabel + ' Major', type: 'text', required: true, description: 'E.g. Ilmu Ekonomi' },
    { label: 'Academic Batch (' + memberLabel + ')', type: 'multiple_choice', required: true, options: ACADEMIC_BATCH_OPTIONS },
    { label: memberLabel + ' Phone Number', type: 'phone', required: true, description: 'e.g. +62123456789' },
    { label: memberLabel + ' Email Address', type: 'email', required: true }
  ];
}

// ===== PHASE 1 - Sections & Fields (form pendaftaran awal, 5 section, 25 field) =====
var SECTIONS_PRELIM = [
  {
    title: 'General Information',
    fields: [
      { label: 'Team Name', type: 'text', required: true, description: 'E.g. Blue Entrepreneur' },
      { label: 'Team Composition', type: 'multiple_choice', required: true, options: ['Individual', '2 Members', '3 Members'] },
      { label: 'How did you know about The 16th UI Studentpreneurs?', type: 'multiple_choice', required: true, options: ['Instagram', 'Broadcast (Line/WA)', 'Tiktok', 'LinkedIn', 'UI Studentpreneurs Ambassador', 'Other'] },
      {
        label: 'Are you interested to join another events of the 16th UI Studentpreneurs?',
        type: 'multiple_choice',
        required: true,
        options: [
          'Yes, I look forward to attend every events of the 16th UI Studentpreneurs!',
          'No, I\'m only interested of this competition.'
        ]
      },
      { label: 'General Code UISP (Optional)', type: 'text', required: false },
      { label: 'Referral Code UISP Ambassador (Optional)', type: 'text', required: false }
    ]
  },
  { title: 'Team Leader Data', fields: memberFields('Team Leader', true) },
  { title: 'Member 1 Data', description: INDIVIDUAL_NOTE_SECTION, fields: memberFields('Member 1', false) },
  { title: 'Member 2 Data', description: INDIVIDUAL_NOTE_SECTION, fields: memberFields('Member 2', false) },
  {
    title: 'Registration requirements',
    description: [
      'Each team member is required to attach all registration requirements to this form. Please combine all files into a single PDF file with a maximum size of 10 MB.',
      'All files required for registration can be accessed via the following link: https://bit.ly/KeperluanRegistrasiBMCC16thUISP',
      '',
      '• (Proof) Follow Instagram @studentpreneurs',
      '• (Proof) Follow Instagram @uispgoods',
      '• (Proof) Follow Instagram Our Assessor Partner @bvi.id',
      '• (Proof) Kartu Tanda Mahasiswa',
      '• (Proof) Post a Twibbon on IG Feeds',
      '  Access the twibbon on https://bit.ly/TwibbonPesertaThe16thUISP',
      '• (Proof) Share Poster the 16th UI Studentpreneurs via Instagram Story',
      '  Access the poster on https://bit.ly/PosterBMCCThe16thUISP'
    ].join('\n'),
    fields: [
      { label: 'Attach the combined files here', type: 'file', required: true }
    ]
  }
];

// ===== PHASE 2 - Sections & Fields (re-registrasi semifinal, 1 section, 5 field) =====
var SECTIONS_REREG = [
  {
    title: 'Registrasi Ulang Semifinal BMCC The 16th UI Studentpreneurs',
    description: [
      'Hello, Studentpreneurs! 👋🏻',
      '',
      'Congratulations! Your team has successfully advanced to the Semifinal Round of the Business Model Canvas Competition – The 16th UI Studentpreneurs! 🏆',
      '',
      'This is an exciting milestone, but your journey doesn’t stop here. To officially secure your spot as a Semifinalist, there is one more step you need to complete:',
      '',
      '📌 SEMIFINALIST RE-REGISTRATION',
      'Please complete the re-registration process and payment of the semifinalist fee through:',
      'BCA 6802069860 a.n. Sarah Namira Humaida',
      'Please make sure to complete the re-registration within the designated period stated by the committee.',
      '',
      '✨ WHAT YOU’LL GET AS A SEMIFINALIST',
      'By completing the re-registration, your team will officially receive:',
      '🎟️ Free access to Championpreneur Talks & Judge Insight Session — Gain valuable insights and perspectives from experienced entrepreneurs and professionals.',
      '🏆 Official Semifinalist Status — Your team will be officially registered as a Semifinalist of the Business Model Canvas Competition – The 16th UI Studentpreneurs.',
      '📜 Semifinalist E-Certificate — Each registered team member will receive an official Semifinalist E-Certificate.',
      '',
      'This is your chance to take your business idea one step further, sharpen your business model, and prove that your idea has what it takes to make an impact. 🚀',
      '',
      'For complete information regarding the competition, re-registration, and technical details, please refer to the Competition Guidebook: https://bit.ly/Guidebook16thUISP',
      '',
      'If you have any questions or need further assistance, feel free to reach out to our Competition Team:',
      'Nadia — Line: @ysnrnadia | WA: +6281282485499',
      'Joshe — Line: @Yukiren08 | WA: +6282114410806',
      '',
      'See you in the Semifinal Round, Studentpreneurs! 💙'
    ].join('\n'),
    fields: [
      { label: 'Team Name', type: 'text', required: true },
      { label: 'Business Name', type: 'text', required: true },
      { label: 'Team Leader Email', type: 'email', required: true },
      { label: 'Team Leader Full Name', type: 'text', required: true },
      { label: 'Proof of re-registration fee payment via BCA account 6802069860 a.n. Sarah Namira Humaida', type: 'file', required: true, description: 'Accepted format: PDF or image (JPG/PNG) - PERIKSA MANUAL apakah Answer Type "file" di UI mendukung lebih dari 1 ekstensi.' }
    ]
  }
];

var TOTAL_FIELDS = SECTIONS_PRELIM.reduce(function (n, s) { return n + s.fields.length; }, 0)
  + SECTIONS_REREG.reduce(function (n, s) { return n + s.fields.length; }, 0);

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

  fillInput(eventNameInput, cfg.eventName);
  fillInput(eventIdInput, cfg.eventId);
  if (cfg.description && editables[0]) fillEditable(editables[0], cfg.description);
  fillInput(organizerInput, cfg.organizerName);

  console.log('Identity filled:', cfg.eventName, cfg.eventId);
  console.warn('%cCEK MANUAL: description multi-baris diisi lewat execCommand insertText - pastikan line break & emoji tampil benar di editor.', 'color:#f59e0b');
}

// ===================== STEP 2 - STATES =====================

async function visitStates() {
  console.log('%c=== Step 2: States (Active ON, Featured OFF, Team size ON min1/max1, Referral codes ON, Detailed pricing ON) ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '2States');
  await sleep(300);

  var checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  if (checkboxes.length < 5) { console.error('STOP: cuma ketemu ' + checkboxes.length + ' toggle di Step 2, diharapkan 5 (Active/Featured/Team size/Referral codes/Detailed pricing). Isi manual.'); return; }
  clickCheckbox(checkboxes[0], true);  // Active
  clickCheckbox(checkboxes[1], false); // Featured
  clickCheckbox(checkboxes[2], true);  // Team size
  await sleep(300); // munculkan input Min/Max
  clickCheckbox(checkboxes[3], true);  // Referral codes
  clickCheckbox(checkboxes[4], true);  // Detailed pricing
  await sleep(200);

  var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
  if (numberInputs[0]) fillInput(numberInputs[0], '1'); // Min
  if (numberInputs[1]) fillInput(numberInputs[1], '1'); // Max
  console.log('States filled. VERIFIKASI MANUAL toggle & Min/Max di layar sebelum lanjut.');
}

// ===================== STEP 4 - PHASE (dipakai berulang utk Phase 1 & Phase 2) =====================

async function addPhase(cfg) {
  console.log('%c=== Step 4: Chrononomics > Phase > "' + cfg.name + '" ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '4Chrononomics');
  await sleep(300);
  clickByText('button', 'Phase');
  await sleep(300);

  var addPhaseBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add Phase'; });
  if (!addPhaseBtn) {
    console.error('%cSTOP: tombol "Add Phase" tidak ditemukan. Kalau ini utk Phase ke-2, kemungkinan tombol ini memang cuma muncul saat 0 Phase (README versi lama) - platform BELUM TENTU support >1 Phase per event. Tambahkan Phase ini MANUAL: nama "' + cfg.name + '", start ' + cfg.start + ', end ' + cfg.end + '.', 'color:#ef4444;font-weight:bold');
    return false;
  }
  addPhaseBtn.click();
  await sleep(400);

  var nameInputs = Array.from(document.querySelectorAll('input[placeholder="New Phase"]'));
  var dt = Array.from(document.querySelectorAll('input[type="datetime-local"]'));
  fillInput(nameInputs[nameInputs.length - 1], cfg.name);
  fillInput(dt[dt.length - 2], cfg.start);
  fillInput(dt[dt.length - 1], cfg.end);
  console.log('Phase added:', cfg.name, cfg.start, '->', cfg.end);
  return true;
}

// ===================== STEP 4 - SECTIONS + FIELDS (dipakai utk isi Phase yg SEDANG aktif/expanded) =====================

async function addSectionsAndFields(sections, expectedBaseline) {
  var existingSectionTitles = Array.from(document.querySelectorAll('input[placeholder="Section title"]'));
  if (existingSectionTitles.length !== expectedBaseline) {
    console.error('%cSTOP: ada ' + existingSectionTitles.length + ' section title input di DOM sekarang, diharapkan tepat ' + expectedBaseline + '. Kemungkinan (a) draft lama belum di-reset -> jalankan Reset_UISP2026_BMCC_LateBird.js dulu, ATAU (b) section Phase lain masih ke-mount bareng Phase yang sedang dikerjakan (kalau begitu fungsi generic ini TIDAK AMAN dipakai apa adanya - perlu scoping manual per-Phase, belum didukung script ini). PERIKSA LAYAR sebelum lanjut apa pun.', 'color:#ef4444;font-weight:bold;font-size:13px');
    throw new Error('Aborted: unexpected section count (' + existingSectionTitles.length + ' != ' + expectedBaseline + '), see console message above.');
  }

  console.log('%c=== Adding ' + sections.length + ' sections ===', 'color:#6366f1;font-weight:bold');

  for (var s = 0; s < sections.length; s++) {
    var addSectionBtn = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent.trim() === 'Add section'; });
    if (!addSectionBtn) { console.error('STOP: tombol "Add section" tidak ditemukan untuk section ke-' + (s + 1) + '. Isi manual sisanya.'); return false; }
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
      newField.click();
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

      var checkboxes = Array.from(newField.querySelectorAll('input[type="checkbox"]'));
      if (field.required && checkboxes.length) clickCheckbox(checkboxes[checkboxes.length - 1], true);

      var keyChip = Array.from(newField.querySelectorAll('*')).find(function (el) { return el.children.length === 0 && /^key:/.test((el.textContent || '').trim()); });
      console.log('  [' + (fi + 1) + '/' + section.fields.length + '] ' + field.label + '  ->  ' + (keyChip ? keyChip.textContent : '(key not found)'));
      await sleep(150);
    }
  }
  return true;
}

// ===================== STEP 4 - TIMELINE (1 entry saja) =====================

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
      console.error('STOP: klik "Add Timeline" tidak menambah timeline baru. Isi manual sisanya.');
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

// ===================== STEP 4 - TIME-PRICE (2 Phase x 1 Timeline = 2 sel, PERIKSA MANUAL) =====================

async function fillTimePriceMatrix(cells) {
  console.log('%c=== Step 4: Chrononomics > Time-Price (' + cells.length + ' cell, PERIKSA MANUAL nama Phase per baris) ===', 'color:#ef4444;font-weight:bold');
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
      console.error('STOP: elemen Time-Price cell ke-' + (i + 1) + ' (' + c.label + ') tidak lengkap di DOM. Isi sisanya manual - cocokkan cell dengan nama Phase yang terlihat di layar.');
      return false;
    }

    fillInput(priceInput, String(c.price));
    fillSelect(feeSelect, c.feeType);
    fillInput(feeInput, String(c.fee));
    fillSelect(taxSelect, c.taxType);
    fillInput(taxInput, String(c.tax));
    console.log('  cell ' + (i + 1) + ' (harusnya baris "' + c.label + '"): Rp' + c.price + ' + fee Rp' + c.fee + ' -- VERIFIKASI nama Phase di layar cocok!');
  }
  return true;
}

// ===================== STEP 5 - COMPLETION (per Phase - selector Phase belum diverifikasi, best-effort) =====================

async function fillCompletionForPhase(phaseName, message) {
  console.log('%c=== Step 5: Completion > "' + phaseName + '" ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '5Completion');
  await sleep(400);
  var phaseSelector = clickByText('button', phaseName);
  if (!phaseSelector) {
    console.warn('%cTidak ketemu kontrol pemilih Phase dengan textContent persis "' + phaseName + '" di Step 5 (mungkin dropdown, bukan tombol - belum diverifikasi). PILIH MANUAL Phase "' + phaseName + '" di layar, lalu paste teks berikut ke editor Completion-nya:\n\n' + message, 'color:#f59e0b;font-weight:bold');
    return;
  }
  await sleep(300);
  var editable = document.querySelector('[contenteditable="true"]');
  if (!editable) { console.error('STOP: contenteditable Completion tidak ditemukan setelah pilih Phase "' + phaseName + '". Isi manual.'); return; }
  fillEditable(editable, message);
  console.log('Completion message set for', phaseName);
}

// ===================== STEP 7 - REVIEW (report only, never auto-submits) =====================

async function reportReview() {
  console.log('%c=== Step 7: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review');
  await sleep(500);
  var text = document.body.innerText;
  var ready = text.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek jumlah Phase (2), Timeline (1), Field (' + TOTAL_FIELDS + '), Priced cells (2), dan TIAP Phase/section/completion message SATU-SATU (terutama Phase 2, bagian paling belum-teruji) sebelum klik "Create event".'
    : '%cNOT READY -> cek duplicate field keys, atau Phase 2/section 2 belum lengkap.', 'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
}

// ===================== RUN (3 tahap manual - lihat peringatan multi-Phase di header file) =====================

(async function run() {
  console.log('%c═══ ' + IDENTITY.eventName + ' (' + TOTAL_FIELDS + ' field, 2 Phase) ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  try {
    await fillIdentity(IDENTITY);
    await visitStates();
    var p1ok = await addPhase(PHASE1);
    if (!p1ok) return;
    var s1ok = await addSectionsAndFields(SECTIONS_PRELIM, 0);
    if (!s1ok) return;
  } catch (err) {
    console.error('%cBERHENTI: ' + err.message, 'color:#ef4444;font-weight:bold');
    return;
  }

  console.log('%c✓ Phase 1 ("' + PHASE1.name + '") selesai: ' + SECTIONS_PRELIM.reduce(function(n,s){return n+s.fields.length;},0) + ' field.\n\nSEBELUM LANJUT: scroll ke atas ke tab Phase, PERHATIKAN apakah section Phase 1 di atas masih tampil terbuka atau sudah collapse. Kalau sudah yakin siap, jalankan window.continuePhase2() di console untuk nambah Phase 2 + isi field-nya.', 'color:#f59e0b;font-weight:bold;font-size:13px');

  window.continuePhase2 = async function () {
    try {
      var p2ok = await addPhase(PHASE2);
      if (!p2ok) return;
      var s2ok = await addSectionsAndFields(SECTIONS_REREG, 0);
      if (!s2ok) return;
    } catch (err) {
      console.error('%cBERHENTI di Phase 2: ' + err.message, 'color:#ef4444;font-weight:bold');
      return;
    }
    console.log('%c✓ Phase 2 ("' + PHASE2.name + '") selesai. Jalankan window.finishRest() untuk lanjut Timeline, Time-Price, Completion (2x), dan Review.', 'color:#f59e0b;font-weight:bold;font-size:13px');
  };

  window.finishRest = async function () {
    var timelineOk = await fillTimelines([TIMELINE]);
    if (!timelineOk) { console.error('%cBERHENTI di Timeline.', 'color:#ef4444;font-weight:bold'); return; }

    var priceOk = await fillTimePriceMatrix(TIME_PRICE_CELLS);
    if (!priceOk) { console.error('%cBERHENTI di Time-Price.', 'color:#ef4444;font-weight:bold'); return; }

    await fillCompletionForPhase(PHASE1.name, COMPLETION_PHASE1);
    await fillCompletionForPhase(PHASE2.name, COMPLETION_PHASE2);
    await reportReview();
    console.log('%cDone. Nothing is saved yet - review Step 7, tiap Phase, tiap Completion message, dan tiap cell Time-Price manual, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
  };
})();
