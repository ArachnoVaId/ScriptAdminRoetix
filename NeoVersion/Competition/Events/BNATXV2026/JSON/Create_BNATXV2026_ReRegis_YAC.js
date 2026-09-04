// NEW ADMIN UI (admin.roetix.com/events/create) - BNAT XV 2026 - Registrasi Ulang YAC
// Companion doc: ../../NewAdminUI/README.md (catatan DOM).
// Engine: sama dengan ../../LUMINUX2.0/JSON/Create_LUMINUX2026.js dan ../../PORFIS2026/JSON/*
//   (1 Phase x 1 Timeline + pre-flight cek draft + guard STOP per step), mekanisme Options versi
//   baru dari ../../StudentPreneur26/JSON/Create_UISP2026_BMCC.js.
// Data source: ../RAW_Context_ReRegis.txt
//   baris timeline: "YAC Re-Registration (Top 15) | Rp125.000 + Rp9.000 | 1 Oktober - 3 Oktober"
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
// FEE SCHEMA - ON-TOP (sama seperti PORFIS/COMMSPACE/SRD/UISP, BUKAN inklusif seperti LUMINUX):
//   Tabel TIMELINE di kedua RAW memakai judul kolom "Harga Tiket (Dasar + Fee Roetix)" - kata
//   "DASAR + FEE" berarti fee DITAMBAHKAN di atas harga dasar, bukan dipotong dari panitia.
//     TIME_PRICE.price = 125.000  (harga dasar, diterima panitia)
//     TIME_PRICE.fee   = 9.000   (fee Roetix, ditambahkan)
//     Peserta membayar = 134.000
//   Verifikasi di layar Step 4 Time-Price bahwa totalnya memang Rp134.000.
//
// !!! WAJIB DICEK SEBELUM RUN !!!
//   a. NAMA TIM masih placeholder. RAW memuat opsi literal "Nama Tim 1" s/d "Nama Tim 15" - itu
//      isian dummy panitia di Google Form, BUKAN nama tim sungguhan. Ganti ke-15 opsi di field
//      "Nama Tim" dengan daftar Top 15 yang asli sebelum event dipublikasikan.
//   b. Organizer Name "HIMA BINUS" diambil dari RAW (@himabinus / "HIMA BINUS mempersembahkan").
//      Verifikasi nama resmi penyelenggara kalau panitia mau nama panjang (Himpunan Mahasiswa
//      Akuntansi BINUS University).
//
// KEPUTUSAN atas sumber (didokumentasikan, bukan diam-diam):
//   1. DIPECAH JADI DUA EVENT (ACC dan YAC), masing-masing script sendiri. Ini BUKAN preferensi -
//      RAW memberi HARGA BERBEDA: ACC Rp150.000 + Rp10.000, YAC Rp125.000 + Rp9.000. Satu event
//      Roetix hanya punya satu harga per timeline, jadi menggabungkan keduanya mustahil.
//      Konsekuensinya field "Tipe Kompetisi (Competition Type)" dari Section 1 RAW DIHAPUS: tipe
//      sudah ditentukan oleh event mana yang dibuka, dan membiarkannya justru membuka peluang
//      peserta memilih tipe yang tidak cocok dengan harga yang dia bayar.
//   2. FIELD "Bukti Upload Pembayaran" DIHAPUS, berikut blok rekening BCA 527 216 7664 A/N ELBERT H
//      DAN KATRINA N, instruksi kode unik (+4 di akhir nominal), dan format nama file. Alasannya
//      pembayaran ditangani Roetix - itu inti dari fee schema di atas - jadi transfer manual +
//      upload bukti adalah alur ganda yang saling bertentangan. Pola yang sama sudah dipakai di
//      PORFIS2026 dan LUMINUX2.0. KALAU panitia tetap mau transfer manual, ketiganya harus
//      dikembalikan BERSAMAAN (field upload + blok rekening + kode unik), jangan sebagian.
//      Kalimat "biaya pendaftaran tidak dapat dikembalikan" tetap dipertahankan di deskripsi.
//   3. DUPLICATE KEY - pertanyaan yang sama diulang untuk Ketua Tim / Anggota 1 / Anggota 2 /
//      Guru Pendamping.
//      Key di platform di-auto-slug DARI LABEL, jadi label mentah pasti bentrok dan Step 7 menolak
//      dengan "Not ready to finish - missing: ...". Semua label disuffix "(Ketua Tim)" dst - pola
//      yang sama dengan "Academic Batch (Team Leader)" di UISP BMCC. JANGAN hapus suffix-nya.
//   4. URUTAN "Pendataan Konsumsi & Penyakit" DIPERBAIKI dari RAW. Extractor Google Form memisahkan
//      tabel ber-Options dari tabel biasa, sehingga "Jika ya, tuliskan alergi..." tercetak SEBELUM
//      pertanyaan "Apakah Anda memiliki alergi...". Di script urutannya dikembalikan logis:
//      vegan? -> alergi? -> jika ya alergi -> penyakit? -> jika ya penyakit.
//   5. EMAIL BINUS & EMAIL PRIBADI bertipe TEXT, bukan email. RAW menyuruh mengisi tanda "-" bagi
//      yang tidak punya (Non-BINUSIAN isi "-" di Email BINUS, dan sebaliknya). Input bertipe email
//      akan MENOLAK "-" sehingga form tidak bisa dikirim. Khusus YAC, Email Pribadi tetap bertipe
//      email karena RAW tidak menyuruh mengisi "-" di situ.
//   6. Section "Pendataan Konsumsi & Penyakit" di RAW muncul 4x dengan judul identik. Di sini
//      judulnya disuffix nama orangnya supaya panitia bisa membedakannya di Step 4 dan di ekspor.
//   7. Team size platform dibiarkan OFF (default Step 2 States). Jumlah anggota sudah pasti
//      (ketua + 2 anggota + guru pendamping), dan DOM min/max saat toggle itu ON belum diverifikasi (README).
//   8. LABEL DIPENDEKKAN, pertanyaan lengkapnya dipindah ke Description field. Contoh: label
//      "Alergi Makanan? (Ketua Tim)" dengan description "Apakah Anda memiliki alergi atau pantangan
//      terhadap makanan?". Dua alasan: (a) key di-auto-slug DARI LABEL, jadi label panjang bikin key
//      panjang dan bagian pembedanya (suffix nama orang) ada di UJUNG - kalau platform memotong key,
//      yang hilang justru pembedanya dan semua key jadi bentrok; (b) label pendek lebih enak dibaca
//      di kolom ekspor. Panjang key terpanjang di script ini sudah dijaga di bawah 40 karakter.
//      JANGAN memanjangkan label lagi tanpa mengecek ulang keunikan key-nya.
//
// TODO manual setelah script jalan: upload banner event di Step 1 (input file, tidak bisa diisi script).

var EVENT_DESCRIPTION = [
  "RE-REGISTRATION BNAT XV 2026 - Youth Accounting Competition (YAC)",
  "",
  "Selamat kepada seluruh tim yang berhasil lolos ke tahap Semifinal!",
  "",
  "Bagi tim yang lolos, jangan lupa melanjutkan ke tahap berikutnya, yaitu REGISTRASI ULANG untuk",
  "mengamankan posisi tim kalian dan melanjutkan perjuangan menuju babak selanjutnya.",
  "",
  "Biaya Registrasi Ulang YAC: Rp125.000 (+ fee Rp9.000)",
  "Biaya pendaftaran yang telah dibayarkan tidak dapat dikembalikan dalam kondisi apa pun.",
  "",
  "Periode Registrasi Ulang: 1 - 3 Oktober 2026",
  "Informasi lengkap alur perlombaan dan ketentuan registrasi ulang: https://linktr.ee/BNATXV2026",
  "",
  "Contact Person:\\nYAC  - Mussadiq Al Fahmi (Fahmi)  | WhatsApp: 0858-0101-6922 | LINE: fahmi.mussadiq\\nYAC  - Sevilla Reyva Arzita       | WhatsApp: 0878-3066-2568 | LINE: dhiraxs\\nACC  - Valerie Regina Santiko     | WhatsApp: 0858-1310-3977 | LINE: jayylluv\\nACC  - Jess Milly Pangestu        | WhatsApp: 0812-6888-2191 | LINE: jessmilly_",
  "",
  "Instagram: @bnat.id @himabinus | TikTok: @hima.binus | YouTube: HIMA BINUS"
].join('\n');

var IDENTITY = {
  eventName: "BNAT XV 2026 - Registrasi Ulang YAC",
  eventId: "BNATXV2026REGULANGYAC",
  organizerName: 'HIMA BINUS',   // dari RAW (@himabinus / "HIMA BINUS mempersembahkan")
  description: EVENT_DESCRIPTION
};

// Dari tabel TIMELINE di akhir RAW: "YAC Re-Registration (Top 15) | Rp125.000 + Rp9.000 | 1 Oktober - 3 Oktober".
var PHASE    = { name: "Registrasi Ulang", start: "2026-10-01T00:00", end: "2026-10-03T23:59" };
var TIMELINE = { name: "Registrasi Ulang", start: "2026-10-01T00:00", end: "2026-10-03T23:59" };

// Skema ON-TOP - lihat blok FEE SCHEMA di header. Peserta membayar HARGA_DASAR + FEE_ROETIX.
var HARGA_DASAR = 125000;
var FEE_ROETIX  = 9000;
var TIME_PRICE = {
  price: HARGA_DASAR,      // diterima panitia
  feeType: 'flat',
  fee: FEE_ROETIX,         // ditambahkan di atas harga dasar
  taxType: 'flat',
  tax: 0
};
var HARGA_PESERTA = HARGA_DASAR + FEE_ROETIX;

// Step 5 Completion - teks Section penutup di RAW ("_Info-only section (tanpa field)_").
var COMPLETION_MESSAGE = [
  "Terima kasih atas registrasi ulang Anda.",
  "",
  "Jika Anda mengalami kendala atau memiliki pertanyaan selama proses berlangsung, silakan menghubungi",
  "contact person melalui WhatsApp atau LINE. Informasi dan pembaruan lebih lanjut akan dikirimkan ke",
  "email ketua tim setelah seluruh data registrasi diverifikasi oleh panitia.",
  "",
  "Contact Person:\\nYAC  - Mussadiq Al Fahmi (Fahmi)  | WhatsApp: 0858-0101-6922 | LINE: fahmi.mussadiq\\nYAC  - Sevilla Reyva Arzita       | WhatsApp: 0878-3066-2568 | LINE: dhiraxs\\nACC  - Valerie Regina Santiko     | WhatsApp: 0858-1310-3977 | LINE: jayylluv\\nACC  - Jess Milly Pangestu        | WhatsApp: 0812-6888-2191 | LINE: jessmilly_"
].join('\n');

var SECTIONS = [
  {
    "title": "Informasi Tim (YAC)",
    "fields": [
      {
        "label": "Nama Sekolah",
        "type": "text",
        "required": true,
        "description": "Harap tidak menuliskan nama sekolah dalam bentuk singkatan."
      },
      {
        "label": "Nama Tim",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Nama Tim 1",
          "Nama Tim 2",
          "Nama Tim 3",
          "Nama Tim 4",
          "Nama Tim 5",
          "Nama Tim 6",
          "Nama Tim 7",
          "Nama Tim 8",
          "Nama Tim 9",
          "Nama Tim 10",
          "Nama Tim 11",
          "Nama Tim 12",
          "Nama Tim 13",
          "Nama Tim 14",
          "Nama Tim 15"
        ],
        "description": "TODO PANITIA: ganti ke-15 opsi ini dengan nama tim YAC yang benar-benar lolos Top 15."
      }
    ]
  },
  {
    "title": "Data Diri Ketua Tim",
    "fields": [
      {
        "label": "Nama Lengkap (Ketua Tim)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "NISN (Ketua Tim)",
        "type": "text",
        "required": true,
        "description": "Nomor Induk Siswa Nasional"
      },
      {
        "label": "Email Pribadi (Ketua Tim)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (Ketua Tim)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (Ketua Tim)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Pendataan Konsumsi & Penyakit - Ketua Tim",
    "fields": [
      {
        "label": "Vegan/Vegetarian? (Ketua Tim)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda seorang vegan/vegetarian?"
      },
      {
        "label": "Alergi Makanan? (Ketua Tim)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki alergi atau pantangan terhadap makanan?"
      },
      {
        "label": "Detail Alergi (Ketua Tim)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan alergi atau pantangan yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      },
      {
        "label": "Riwayat Penyakit? (Ketua Tim)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki riwayat penyakit tertentu?"
      },
      {
        "label": "Detail Penyakit (Ketua Tim)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan riwayat penyakit yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 1",
    "fields": [
      {
        "label": "Nama Lengkap (Anggota Tim 1)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "NISN (Anggota Tim 1)",
        "type": "text",
        "required": true,
        "description": "Nomor Induk Siswa Nasional"
      },
      {
        "label": "Email Pribadi (Anggota Tim 1)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (Anggota Tim 1)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (Anggota Tim 1)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Pendataan Konsumsi & Penyakit - Anggota Tim 1",
    "fields": [
      {
        "label": "Vegan/Vegetarian? (Anggota Tim 1)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda seorang vegan/vegetarian?"
      },
      {
        "label": "Alergi Makanan? (Anggota Tim 1)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki alergi atau pantangan terhadap makanan?"
      },
      {
        "label": "Detail Alergi (Anggota Tim 1)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan alergi atau pantangan yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      },
      {
        "label": "Riwayat Penyakit? (Anggota Tim 1)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki riwayat penyakit tertentu?"
      },
      {
        "label": "Detail Penyakit (Anggota Tim 1)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan riwayat penyakit yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 2",
    "fields": [
      {
        "label": "Nama Lengkap (Anggota Tim 2)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "NISN (Anggota Tim 2)",
        "type": "text",
        "required": true,
        "description": "Nomor Induk Siswa Nasional"
      },
      {
        "label": "Email Pribadi (Anggota Tim 2)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (Anggota Tim 2)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (Anggota Tim 2)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Pendataan Konsumsi & Penyakit - Anggota Tim 2",
    "fields": [
      {
        "label": "Vegan/Vegetarian? (Anggota Tim 2)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda seorang vegan/vegetarian?"
      },
      {
        "label": "Alergi Makanan? (Anggota Tim 2)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki alergi atau pantangan terhadap makanan?"
      },
      {
        "label": "Detail Alergi (Anggota Tim 2)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan alergi atau pantangan yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      },
      {
        "label": "Riwayat Penyakit? (Anggota Tim 2)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki riwayat penyakit tertentu?"
      },
      {
        "label": "Detail Penyakit (Anggota Tim 2)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan riwayat penyakit yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      }
    ]
  },
  {
    "title": "Data Diri Guru Pendamping",
    "fields": [
      {
        "label": "Nama dan Gelar (Guru Pendamping)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi, S.Pd., M.Ak."
      },
      {
        "label": "Jabatan (Guru Pendamping)",
        "type": "text",
        "required": true,
        "description": "Contoh: Guru Akuntansi / Wali Kelas / dll"
      },
      {
        "label": "Email Pribadi (Guru Pendamping)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (Guru Pendamping)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (Guru Pendamping)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Pendataan Konsumsi & Penyakit - Guru Pendamping",
    "fields": [
      {
        "label": "Vegan/Vegetarian? (Guru Pendamping)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda seorang vegan/vegetarian?"
      },
      {
        "label": "Alergi Makanan? (Guru Pendamping)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki alergi atau pantangan terhadap makanan?"
      },
      {
        "label": "Detail Alergi (Guru Pendamping)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan alergi atau pantangan yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      },
      {
        "label": "Riwayat Penyakit? (Guru Pendamping)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Ya",
          "Tidak"
        ],
        "description": "Apakah Anda memiliki riwayat penyakit tertentu?"
      },
      {
        "label": "Detail Penyakit (Guru Pendamping)",
        "type": "text",
        "required": true,
        "description": "Jika ya, tuliskan riwayat penyakit yang Anda miliki. Jika tidak ada, isi dengan tanda \"-\"."
      }
    ]
  },
  {
    "title": "Konfirmasi Data",
    "fields": [
      {
        "label": "Konfirmasi Data",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Saya menyatakan bahwa data yang diisi telah sesuai dan benar"
        ]
      }
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
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section, 1 Phase, 1 Timeline, peserta bayar Rp' + HARGA_PESERTA + ' (dasar Rp' + HARGA_DASAR + ' + fee Rp' + FEE_ROETIX + ').'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar. Tersangka utama di form ini: DUPLICATE FIELD KEY dari pertanyaan yang berulang antar orang - pastikan suffix di setiap label masih utuh. Kalau ada key ber-suffix "_2", berarti draft event sebelumnya belum dibersihkan: localStorage.removeItem(\'roetix:competition-draft\'); location.reload();',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  console.warn('%cSEBELUM KLIK "Create event": (1) ganti ke-15 opsi placeholder di field "Nama Tim" dengan daftar Top 15 yang asli; (2) verifikasi Organizer Name; (3) upload banner event di Step 1; (4) pastikan total harga peserta = Rp' + HARGA_PESERTA + ' (dasar Rp' + HARGA_DASAR + ' + fee Rp' + FEE_ROETIX + '); (5) field "Bukti Upload Pembayaran" dan blok rekening BCA SENGAJA dihapus - kalau panitia tetap mau transfer manual, kembalikan ketiganya bersamaan.', 'color:#f59e0b;font-weight:bold');
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
