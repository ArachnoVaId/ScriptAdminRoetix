// NEW ADMIN UI (admin.roetix.com/events/create) - BNAT XV 2026 Talkshow - Beyond Numbers - Bundle 2 Peserta
// Companion doc: ../../NewAdminUI/README.md (catatan DOM).
//
// SUMBER: di-generate ULANG dari config export platform
//   BNATXV2026TALKSHOW-config.json  (kind: roetix-competition-event, version 1)
// Config itu adalah hasil akhir yang sudah dirapikan panitia di UI, jadi ia MENGGANTIKAN
// ../RAW_Context_Talkshow.txt sebagai sumber kebenaran. Kalau keduanya berbeda, ikuti config.
// Perbedaan utama versi sebelumnya (yang dibuat dari RAW) vs config ini:
//   - Platform TERNYATA PUNYA percabangan kondisional (field "optionNextSections"), jadi form
//     TIDAK perlu diratakan seperti asumsi lama. Section per tipe peserta dipisah lagi.
//   - Field key di-auto-dedupe platform dengan suffix _2/_3, jadi label yang sama persis di
//     section berbeda AMAN (mis. "Nama Lengkap (Full Name)" muncul 8x di config ini).
//
// CARA PAKAI
// 1. Login admin.roetix.com, buka /events, klik "Create Event" (wizard fresh & KOSONG).
//    Kalau ragu wizard masih kebawa draft lama, jalankan dulu di console:
//      localStorage.removeItem('roetix:competition-draft'); location.reload();
//    JANGAN localStorage.clear() - itu ikut menghapus session login (README).
// 2. Paste seluruh script ini di console, Enter.
// 3. Script mengisi Step 1 Identity -> Step 2 States -> Step 4 Phase/Section/Field/Timeline/
//    Time-Price -> Step 5 Completion, lalu lompat ke Step 7 Review dan mencetak status.
// 4. TIDAK ADA yang tersimpan sampai kamu sendiri klik "Create event".
//
// !!! TIGA HAL YANG SCRIPT TIDAK BISA KERJAKAN - WAJIB MANUAL SETELAH SCRIPT SELESAI !!!
//   a. PERCABANGAN (optionNextSections). Config memakai routing per-opsi, tapi DOM-nya belum
//      terdokumentasi di README sehingga tidak bisa di-script. Script MENCETAK peta lengkapnya
//      di console (lihat printBranchMap) - pasang satu per satu di UI sebelum Create event.
//      TANPA ini semua section akan tampil ke semua peserta.
//   b. TOGGLE Step 2 States. Config: teamSizeEnabled=true (min 1, max 1),
//      referralEnabled=true, detailedPricing=true. Script mencoba menyalakannya, TAPI DOM ketiga
//      toggle ini belum diverifikasi di README - CEK SENDIRI di layar Step 2.
//   c. BANNER event di Step 1 (input file, tidak bisa diisi script).
//
// HARGA: price 25000, serviceFee flat 3500, tax 0.
//   Peserta membayar Rp28500. Cocokkan angka ini di layar Step 4 > Time-Price.
//
// VARIAN BUNDLE - beda dari versi Normal:
//   1. HARGA Rp25.000 (Normal Rp15.000). RAW: "Pembelian paket bundle untuk dua peserta akan
//      mendapatkan potongan sebesar 40% dari harga normal." Fee Roetix tetap Rp3500.
//   2. Section "Data Diri Peserta Umum - BINUSIAN" dan "- Non-BINUSIAN" masing-masing DIGANDAKAN
//      jadi DUA (Peserta 1 & Peserta 2), sesuai permintaan panitia. Semua label di section
//      gandaan itu disuffix "(Peserta 1)" / "(Peserta 2)" supaya kolom ekspor bisa dibedakan -
//      platform memang meng-auto-dedupe key, tapi tanpa suffix kedua kolom bernama sama persis
//      dan panitia tidak bisa tahu mana peserta pertama dan mana yang kedua.
//   3. Percabangan Kategori Peserta Umum sekarang menunjuk ke section "... BINUSIAN 1" /
//      "... Non-BINUSIAN 1"; section "2"-nya mengikuti secara berurutan di bawahnya.
//   4. CATATAN: section cabang YAC/ACC TETAP disertakan apa adanya dari config. RAW menempatkan
//      pilihan bundle HANYA di alur Peserta Umum ("kedua peserta harus sama-sama BINUSIAN atau
//      sama-sama Non-BINUSIAN"). Kalau panitia memang hanya menjual bundle ke Peserta Umum,
//      HAPUS cabang YAC & ACC di event ini dan sisakan opsi "Umum" saja di field Tipe Peserta.
//
// CATATAN TEMUAN di config (bukan diubah oleh script - dilaporkan supaya panitia bisa memutuskan):
//   - "Nomor WhatsApp" di section Peserta Umum BINUSIAN & Non-BINUSIAN bertipe `number`, padahal
//     di section lain bertipe `phone`. Tipe number membuang angka 0 di depan (085... jadi 85...).
//   - "Jam Tiba Jika Terlambat" & "Jam Pulang Lebih Awal" bertipe `date`, padahal isinya JAM
//     (keterangannya sendiri bilang "Format 24 jam WIB, contoh: 10.30"). Date picker tidak bisa
//     mengisi jam.
//   - "Area Kampus" hanya 7 opsi (RAW punya 8 - "BINUS Online" hilang), "Fakultas" hanya 7 opsi
//     (RAW punya 8 - "BINUS Business School" hilang), "Provinsi" 37 opsi (RAW 38 - "Papua Barat
//     Daya" hilang).
//   - Keterangan "Nama Sekolah" di section YAC berbunyi "Harap tidak menuliskan nama UNIVERSITAS
//     dalam bentuk singkatan" (sisa copy-paste dari section ACC).
//   - Label "ID LINE ( LINE ID" di dua section Peserta Umum kurang kurung tutup.
//   Script menyalin semuanya APA ADANYA dari config. Perbaiki di UI kalau panitia setuju.

var EVENT_DESCRIPTION = "📢 OPEN REGISTRATION BNAT XV 2026 TALKSHOW 📢\n\n[HIMPUNAN MAHASISWA AKUNTANSI BINUS UNIVERSITY PROUDLY PRESENTS]\n\nCalling All Future Risk Strategists ‼️📊\nKondisi ekonomi dunia sangat sulit diprediksi di tengah ketegangan global, lalu bagaimana para profesional mengambil keputusan bisnis ketika dihadapi ketidakpastian? 🤔\nHIMA BINUS mempersembahkan talkshow dengan tema:\n\n💡 ” Beyond Numbers: Accounting Analysts in Times of Economic Volatility”\n\nMelalui talkshow ini, kamu akan memahami bagaimana para profesional memandang kondisi ekonomi saat ini, mengelola risiko di tengah ketidakpastian, serta peran akuntan modern dalam membantu perusahaan mengambil keputusan yang tepat di tengah volatilitas ekonomi.\n\nPelaksanaan Talkshow\n📅 Tanggal: Rabu, 23 September 2026\n🕒 Waktu: 09.55 - 13.40 WIB\n📍 Lokasi: Auditorium B0501, BINUS @Alam Sutera & Zoom Cloud Meetings\n\nDaftarkan dirimu sekarang melalui:\n🔗 http://bit.ly/REGISTRASITALKSHOWBNATXV2026\n\n❗Close Registration: 14 September 2026︱23.59 WIB❗\n\n🎁 Benefits:\n📚 Knowledge\n⭐ SAT Points (BINUSIAN only)\n📜 E-Certificate\n\n☎️ Contact Person:\n👤 Jovieka Angelista Sugandi (Jovieka)\nWhatsApp: 0899-8150-020\nLINE: joviekaangelista\n\n👤 Valerie Regina Santiko (Valerie)\nWhatsApp: 0858-1310-3977\nLINE: jayylluv\n\n📲 Find us through:\n📸Instagram: @bnat.id @himabinus\n🎥 TikTok: @hima.binus\n▶️ YouTube: HIMA BINUS\n\nUpgrade your perspective, strengthen your analytical skills, and discover how accounting goes beyond numbers! 🚀\n\nHIMANIAC!!!\nFeel it, Trust it, and Get it!\n—————————————\nFor more information:\nhttps://linktr.ee/himabinus\n\n#BNATXV2026 #HIMABINUS #AccountingCompetition #KompetisiNasional #LombaAkuntansi";

var IDENTITY = {
  eventName: "BNAT XV 2026 Talkshow - Beyond Numbers - Bundle 2 Peserta",
  eventId: "BNATXV2026TALKSHOWBUNDLE",
  organizerName: "HIMA BINUS",
  description: EVENT_DESCRIPTION
};

// Step 2 States - nilai dari config. DOM toggle ini belum diverifikasi (README), jadi
// visitStates() cuma BEST EFFORT + lapor hasilnya; cek sendiri di layar.
var STATES = {
  teamSizeEnabled: true,
  minTeamMembers: 1,
  maxTeamMembers: 1,
  referralEnabled: true,
  detailedPricing: true
};

// config: 2026-09-02T17:00:00Z -> 2026-09-20T16:59:00Z (UTC), dikonversi ke WIB.
var PHASE    = { name: "Registrasi Talkshow", start: "2026-09-03T00:00", end: "2026-09-20T23:59" };
var TIMELINE = { name: "Registrasi Talkshow", start: "2026-09-03T00:00", end: "2026-09-20T23:59" };

var HARGA_DASAR = 25000;
var FEE_ROETIX  = 3500;
var TIME_PRICE = {
  price: HARGA_DASAR,
  feeType: "flat",
  fee: FEE_ROETIX,
  taxType: "flat",
  tax: 0
};
var HARGA_PESERTA = HARGA_DASAR + FEE_ROETIX;

var COMPLETION_MESSAGE = "Terima kasih atas pendaftaran Anda ✨\n\nJika Anda mengalami kendala atau memiliki pertanyaan selama proses berlangsung, silahkan menghubungi contact person melalui WhatsApp atau LINE. Informasi dan pembaruan lebih lanjut akan dikirimkan melalui grup WhatsApp.\n\nJangan lupa untuk bergabung ke dalam Grup WhatsApp:\nhttps://chat.whatsapp.com/I1clNdd2cqfKMK8Evdo9m3";

// Percabangan dari config - TIDAK bisa di-script, dicetak untuk dipasang manual di UI.
var BRANCH_MAP = [
  {
    "section": "Informasi Peserta",
    "field": "Tipe Peserta (Participant Type)",
    "option": "Accounting Case Competition (ACC)",
    "next": "Informasi Tim Accounting Case Competition (ACC)"
  },
  {
    "section": "Informasi Peserta",
    "field": "Tipe Peserta (Participant Type)",
    "option": "Umum",
    "next": "Informasi Peserta Umum"
  },
  {
    "section": "Informasi Peserta",
    "field": "Tipe Peserta (Participant Type)",
    "option": "Youth Accounting Competition (YAC)",
    "next": "Informasi Tim Youth Accounting Competition (YAC)"
  },
  {
    "section": "Informasi Peserta Umum",
    "field": "Kategori Peserta Umum",
    "option": "BINUSIAN",
    "next": "Data Diri Peserta Umum - BINUSIAN 1"
  },
  {
    "section": "Informasi Peserta Umum",
    "field": "Kategori Peserta Umum",
    "option": "Guru Pendamping YAC",
    "next": "Informasi Guru Pendamping Youth Accounting Competition (YAC)"
  },
  {
    "section": "Informasi Peserta Umum",
    "field": "Kategori Peserta Umum",
    "option": "Non-BINUSIAN",
    "next": "Data Diri Peserta Umum - Non-BINUSIAN 1"
  }
];

var SECTIONS = [
  {
    "title": "Informasi Peserta",
    "fields": [
      {
        "label": "Tipe Peserta (Participant Type)",
        "type": "multiple_choice",
        "required": true,
        "description": "Harap diperhatikan bahwa Guru Pendamping YAC dikategorikan sebagai Peserta Umum",
        "options": [
          "Youth Accounting Competition (YAC)",
          "Accounting Case Competition (ACC)",
          "Umum"
        ]
      }
    ]
  },
  {
    "title": "Informasi Guru Pendamping Youth Accounting Competition (YAC)",
    "fields": [
      {
        "label": "Nama Sekolah (School Name)",
        "type": "text",
        "required": true,
        "description": "Harap tidak menuliskan nama sekolah dalam bentuk singkatan"
      },
      {
        "label": "Nama dan Gelar (Full Name and Title)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi, S.Pd., M.Ak."
      },
      {
        "label": "Jabatan (Position)",
        "type": "text",
        "required": true,
        "description": "Contoh: Guru Akuntansi/Wali Kelas/dll"
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "text",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Informasi Peserta Umum",
    "fields": [
      {
        "label": "Kategori Peserta Umum",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "BINUSIAN",
          "Non-BINUSIAN",
          "Guru Pendamping YAC"
        ]
      },
      {
        "label": "Nama Referral",
        "type": "text",
        "required": true,
        "description": "Jika tidak ada, isi dengan tanda \"-\""
      }
    ]
  },
  {
    "title": "Informasi Tim Accounting Case Competition (ACC)",
    "fields": [
      {
        "label": "Nama Tim (Team Name)",
        "type": "text",
        "required": false,
        "description": "Isi HANYA jika Tipe Peserta adalah YAC atau ACC"
      },
      {
        "label": "Nama Universitas (University Name)",
        "type": "text",
        "required": true,
        "description": "Harap tidak menuliskan nama universitas dalam bentuk singkatan"
      },
      {
        "label": "Provinsi Universitas (University Province)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Aceh",
          "Sumatera Utara",
          "Sumatera Barat",
          "Riau",
          "Kepulauan Riau",
          "Jambi",
          "Sumatera Selatan",
          "Kepulauan Bangka Belitung",
          "Bengkulu",
          "Lampung",
          "DKI Jakarta",
          "Jawa Barat",
          "Banten",
          "Jawa Tengah",
          "DI Yogyakarta",
          "Jawa Timur",
          "Bali",
          "Nusa Tenggara Barat",
          "Nusa Tenggara Timur",
          "Kalimantan Barat",
          "Kalimantan Tengah",
          "Kalimantan Selatan",
          "Kalimantan Timur",
          "Kalimantan Utara",
          "Sulawesi Utara",
          "Gorontalo",
          "Sulawesi Tengah",
          "Sulawesi Barat",
          "Sulawesi Selatan",
          "Sulawesi Tenggara",
          "Maluku",
          "Maluku Utara",
          "Papua",
          "Papua Barat",
          "Papua Selatan",
          "Papua Tengah",
          "Papua Pegunungan"
        ]
      }
    ]
  },
  {
    "title": "Informasi Tim Youth Accounting Competition (YAC)",
    "fields": [
      {
        "label": "Nama Tim (Team Name)",
        "type": "text",
        "required": false,
        "description": "Isi HANYA jika Tipe Peserta adalah YAC atau ACC"
      },
      {
        "label": "Nama Sekolah (School Name)",
        "type": "text",
        "required": true,
        "description": "Harap tidak menuliskan nama universitas dalam bentuk singkatan"
      },
      {
        "label": "Provinsi Sekolah (School Province)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Aceh",
          "Sumatera Utara",
          "Sumatera Barat",
          "Riau",
          "Kepulauan Riau",
          "Jambi",
          "Sumatera Selatan",
          "Kepulauan Bangka Belitung",
          "Bengkulu",
          "Lampung",
          "DKI Jakarta",
          "Jawa Barat",
          "Banten",
          "Jawa Tengah",
          "DI Yogyakarta",
          "Jawa Timur",
          "Bali",
          "Nusa Tenggara Barat",
          "Nusa Tenggara Timur",
          "Kalimantan Barat",
          "Kalimantan Tengah",
          "Kalimantan Selatan",
          "Kalimantan Timur",
          "Kalimantan Utara",
          "Sulawesi Utara",
          "Gorontalo",
          "Sulawesi Tengah",
          "Sulawesi Barat",
          "Sulawesi Selatan",
          "Sulawesi Tenggara",
          "Maluku",
          "Maluku Utara",
          "Papua",
          "Papua Barat",
          "Papua Selatan",
          "Papua Tengah",
          "Papua Pegunungan"
        ]
      }
    ]
  },
  {
    "title": "Data Diri Ketua Tim ACC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email BINUS (BINUS Email)",
        "type": "text",
        "required": true,
        "description": "Hanya berlaku bagi BINUSIAN. Selain itu isi dengan tanda \"-\". Contoh: mussadiq.fahmi@binus.ac.id"
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Ketua Tim YAC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Siswa Nasional (NISN)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 1 ACC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email BINUS (BINUS Email)",
        "type": "text",
        "required": true,
        "description": "Hanya berlaku bagi BINUSIAN. Selain itu isi dengan tanda \"-\". Contoh: mussadiq.fahmi@binus.ac.id"
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 1 YAC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Siswa Nasional (NISN)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 2 ACC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email BINUS (BINUS Email)",
        "type": "text",
        "required": true,
        "description": "Hanya berlaku bagi BINUSIAN. Selain itu isi dengan tanda \"-\". Contoh: mussadiq.fahmi@binus.ac.id"
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Anggota Tim 2 YAC",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Siswa Nasional (NISN)",
        "type": "text",
        "required": true
      },
      {
        "label": "Email Pribadi (Personal Email)",
        "type": "text",
        "required": true,
        "description": "Wajib bagi Non-BINUSIAN. BINUSIAN boleh mengisi tanda \"-\". Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number)",
        "type": "phone",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Peserta Umum - BINUSIAN 1",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name) (Peserta 1)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM) (Peserta 1)",
        "type": "text",
        "required": true,
        "description": "Contoh: 2902713035"
      },
      {
        "label": "Email BINUS (BINUS Email) (Peserta 1)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@binus.ac.id"
      },
      {
        "label": "ID LINE (LINE ID (Peserta 1)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number) (Peserta 1)",
        "type": "number",
        "required": true,
        "description": "Contoh: 085801016922"
      },
      {
        "label": "Area Kampus (Campus Area) (Peserta 1)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Kemanggisan",
          "Alam Sutera",
          "Bekasi",
          "Senayan",
          "Bandung",
          "Malang",
          "Semarang"
        ]
      },
      {
        "label": "Fakultas (Faculty) (Peserta 1)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "School of Accounting",
          "School of Computer Science",
          "School of Design",
          "School of Information Systems",
          "Faculty of Digital Communication and Hotel and Tourism",
          "Faculty of Engineering",
          "Faculty of Humanities"
        ]
      },
      {
        "label": "Jurusan (Major) (Peserta 1)",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "title": "Data Diri Peserta Umum - BINUSIAN 2",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name) (Peserta 2)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM) (Peserta 2)",
        "type": "text",
        "required": true,
        "description": "Contoh: 2902713035"
      },
      {
        "label": "Email BINUS (BINUS Email) (Peserta 2)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@binus.ac.id"
      },
      {
        "label": "ID LINE (LINE ID (Peserta 2)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number) (Peserta 2)",
        "type": "number",
        "required": true,
        "description": "Contoh: 085801016922"
      },
      {
        "label": "Area Kampus (Campus Area) (Peserta 2)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Kemanggisan",
          "Alam Sutera",
          "Bekasi",
          "Senayan",
          "Bandung",
          "Malang",
          "Semarang"
        ]
      },
      {
        "label": "Fakultas (Faculty) (Peserta 2)",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "School of Accounting",
          "School of Computer Science",
          "School of Design",
          "School of Information Systems",
          "Faculty of Digital Communication and Hotel and Tourism",
          "Faculty of Engineering",
          "Faculty of Humanities"
        ]
      },
      {
        "label": "Jurusan (Major) (Peserta 2)",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "title": "Data Diri Peserta Umum - Non-BINUSIAN 1",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name) (Peserta 1)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM) (Peserta 1)",
        "type": "text",
        "required": true,
        "description": "Contoh: 2902713035"
      },
      {
        "label": "Email Pribadi (Personal Email) (Peserta 1)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID (Peserta 1)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number) (Peserta 1)",
        "type": "number",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Data Diri Peserta Umum - Non-BINUSIAN 2",
    "fields": [
      {
        "label": "Nama Lengkap (Full Name) (Peserta 2)",
        "type": "text",
        "required": true,
        "description": "Contoh: Mussadiq Al Fahmi"
      },
      {
        "label": "Nomor Induk Mahasiswa (NIM) (Peserta 2)",
        "type": "text",
        "required": true,
        "description": "Contoh: 2902713035"
      },
      {
        "label": "Email Pribadi (Personal Email) (Peserta 2)",
        "type": "email",
        "required": true,
        "description": "Contoh: mussadiq.fahmi@gmail.com"
      },
      {
        "label": "ID LINE (LINE ID (Peserta 2)",
        "type": "text",
        "required": true
      },
      {
        "label": "Nomor WhatsApp (WhatsApp Number) (Peserta 2)",
        "type": "number",
        "required": true,
        "description": "Contoh: 085801016922"
      }
    ]
  },
  {
    "title": "Informasi Kehadiran Peserta ACC",
    "fields": [
      {
        "label": "Kehadiran Talkshow (Peserta)",
        "type": "multiple_choice",
        "required": true,
        "description": "Apakah Anda akan menghadiri talkshow pada 23 September 2026 di BINUS @Alam Sutera? Harap diperhatikan bahwa sesi talkshow dihitung sebagai bagian dari catatan kehadiran resmi tim Anda. BINUSIAN @Alam Sutera, Non-BINUSIAN, dan Guru Pendamping YAC WAJIB hadir secara langsung (onsite).",
        "options": [
          "Ya, saya akan hadir secara langsung di BINUS @Alam Sutera (termasuk kemungkinan datang terlambat dan pulang lebih awal)",
          "Saya tidak dapat hadir secara langsung karena berasal dari luar JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir secara langsung meskipun berasal dari dalam JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir dan akan menyampaikan alasan saya kepada panitia"
        ]
      },
      {
        "label": "Alasan Tidak Hadir Onsite (Peserta)",
        "type": "text",
        "required": true,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon jelaskan alasannya. Jika Anda dapat hadir secara langsung, isi dengan tanda \"-\"."
      },
      {
        "label": "Bukti Ketidakhadiran (Peserta)",
        "type": "file",
        "required": false,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon unggah bukti pendukung yang dimiliki."
      },
      {
        "label": "Konfirmasi ke Panitia (Peserta)",
        "type": "multiple_choice",
        "required": false,
        "description": "Jika Anda tidak dapat menghadiri sesi talkshow, baik secara langsung maupun secara keseluruhan, mohon hubungi panitia untuk melakukan konfirmasi\n\n☎️ Contact Person:\n👤 Jovieka Angelista Sugandi (Jovieka)\nWhatsApp: 0899-8150-020\n\nLINE: joviekaangelista\n👤 Valerie Regina Santiko (Valerie)\nWhatsApp: 0858-1310-3977\nLINE: jayylluv",
        "options": [
          "Ya, saya sudah menghubungi panitia"
        ]
      }
    ]
  },
  {
    "title": "Informasi Kehadiran Peserta YAC",
    "fields": [
      {
        "label": "Kehadiran Talkshow (Peserta)",
        "type": "multiple_choice",
        "required": true,
        "description": "Apakah Anda akan menghadiri talkshow pada 23 September 2026 di BINUS @Alam Sutera? Harap diperhatikan bahwa sesi talkshow dihitung sebagai bagian dari catatan kehadiran resmi tim Anda. BINUSIAN @Alam Sutera, Non-BINUSIAN, dan Guru Pendamping YAC WAJIB hadir secara langsung (onsite).",
        "options": [
          "Ya, saya akan hadir secara langsung di BINUS @Alam Sutera (termasuk kemungkinan datang terlambat dan pulang lebih awal)",
          "Saya tidak dapat hadir secara langsung karena berasal dari luar JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir secara langsung meskipun berasal dari dalam JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir dan akan menyampaikan alasan saya kepada panitia"
        ]
      },
      {
        "label": "Alasan Tidak Hadir Onsite (Peserta)",
        "type": "text",
        "required": true,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon jelaskan alasannya. Jika Anda dapat hadir secara langsung, isi dengan tanda \"-\"."
      },
      {
        "label": "Bukti Ketidakhadiran (Peserta)",
        "type": "file",
        "required": false,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon unggah bukti pendukung yang dimiliki."
      },
      {
        "label": "Konfirmasi ke Panitia (Peserta)",
        "type": "multiple_choice",
        "required": false,
        "description": "Jika Anda tidak dapat menghadiri sesi talkshow, baik secara langsung maupun secara keseluruhan, mohon hubungi panitia untuk melakukan konfirmasi\n\n☎️ Contact Person:\n👤 Jovieka Angelista Sugandi (Jovieka)\nWhatsApp: 0899-8150-020\n\nLINE: joviekaangelista\n👤 Valerie Regina Santiko (Valerie)\nWhatsApp: 0858-1310-3977\nLINE: jayylluv",
        "options": [
          "Ya, saya sudah menghubungi panitia"
        ]
      }
    ]
  },
  {
    "title": "Informasi Kehadiran Peserta Umum",
    "fields": [
      {
        "label": "Kehadiran Talkshow (Peserta)",
        "type": "multiple_choice",
        "required": true,
        "description": "Apakah Anda akan menghadiri talkshow pada 23 September 2026 di BINUS @Alam Sutera? Harap diperhatikan bahwa sesi talkshow dihitung sebagai bagian dari catatan kehadiran resmi tim Anda. BINUSIAN @Alam Sutera, Non-BINUSIAN, dan Guru Pendamping YAC WAJIB hadir secara langsung (onsite).",
        "options": [
          "Ya, saya akan hadir secara langsung di BINUS @Alam Sutera (termasuk kemungkinan datang terlambat dan pulang lebih awal)",
          "Saya tidak dapat hadir secara langsung karena berasal dari luar JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir secara langsung meskipun berasal dari dalam JABODETABEK dan akan bergabung secara online",
          "Saya tidak dapat hadir dan akan menyampaikan alasan saya kepada panitia"
        ]
      },
      {
        "label": "Alasan Tidak Hadir Onsite (Peserta)",
        "type": "text",
        "required": true,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon jelaskan alasannya. Jika Anda dapat hadir secara langsung, isi dengan tanda \"-\"."
      },
      {
        "label": "Bukti Ketidakhadiran (Peserta)",
        "type": "file",
        "required": false,
        "description": "Jika Anda tidak dapat hadir secara langsung, mohon unggah bukti pendukung yang dimiliki."
      },
      {
        "label": "Konfirmasi ke Panitia (Peserta)",
        "type": "multiple_choice",
        "required": false,
        "description": "Jika Anda tidak dapat menghadiri sesi talkshow, baik secara langsung maupun secara keseluruhan, mohon hubungi panitia untuk melakukan konfirmasi\n\n☎️ Contact Person:\n👤 Jovieka Angelista Sugandi (Jovieka)\nWhatsApp: 0899-8150-020\n\nLINE: joviekaangelista\n👤 Valerie Regina Santiko (Valerie)\nWhatsApp: 0858-1310-3977\nLINE: jayylluv",
        "options": [
          "Ya, saya sudah menghubungi panitia"
        ]
      }
    ]
  },
  {
    "title": "Waktu Kehadiran",
    "fields": [
      {
        "label": "Tiba Tepat Waktu? (Peserta)",
        "type": "multiple_choice",
        "required": true,
        "description": "Apakah Anda akan tiba tepat waktu pada 09.55 WIB?",
        "options": [
          "Ya, saya akan tiba tepat waktu pada pukul 09.55 WIB",
          "Tidak, saya akan datang terlambat"
        ]
      },
      {
        "label": "Jam Tiba Jika Terlambat (Peserta)",
        "type": "date",
        "required": false,
        "description": "Jika Anda datang terlambat, pukul berapa Anda akan tiba? Format 24 jam WIB, contoh: 10.30. Kosongkan jika tiba tepat waktu."
      },
      {
        "label": "Waktu Meninggalkan Sesi (Peserta)",
        "type": "multiple_choice",
        "required": true,
        "description": "Jika Anda akan menghadiri sesi, pukul berapa Anda akan meninggalkan sesi?",
        "options": [
          "Saya akan pulang setelah sesi berakhir",
          "Saya akan pulang lebih awal"
        ]
      },
      {
        "label": "Jam Pulang Lebih Awal (Peserta)",
        "type": "date",
        "required": false,
        "description": "Jika Anda akan pulang lebih awal, pukul berapa Anda akan pulang? Format 24 jam WIB, contoh: 12.30. Kosongkan jika pulang setelah sesi berakhir."
      }
    ]
  },
  {
    "title": "Grup WhatsApp & Konfirmasi Data",
    "fields": [
      {
        "label": "Bergabung ke Grup WhatsApp",
        "type": "multiple_choice",
        "required": true,
        "options": [
          "Saya sudah bergabung ke Grup WhatsApp"
        ]
      },
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

// ===================== STEP 2 - STATES (best effort, DOM belum diverifikasi) =====================
// README belum mendokumentasikan DOM ketiga toggle ini, jadi fungsi ini TIDAK pernah membatalkan run -
// ia hanya mencoba, lalu melaporkan apa yang berhasil supaya kamu bisa cek/koreksi manual di layar.

function switchByLabelText(text) {
  var wrappers = Array.from(document.querySelectorAll('label, div'));
  for (var i = 0; i < wrappers.length; i++) {
    var w = wrappers[i];
    if (w.textContent.trim().toLowerCase().indexOf(text.toLowerCase()) !== 0) continue;
    var cb = w.querySelector('input[type="checkbox"]');
    if (cb) return cb;
  }
  return null;
}

async function visitStates() {
  console.log('%c=== Step 2: States ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '2States');
  await sleep(400);

  var want = [
    { key: 'Team size', on: STATES.teamSizeEnabled },
    { key: 'Referral', on: STATES.referralEnabled },
    { key: 'Detailed pricing', on: STATES.detailedPricing }
  ];
  var manual = [];
  for (var i = 0; i < want.length; i++) {
    var cb = switchByLabelText(want[i].key);
    if (!cb) { manual.push(want[i].key + ' (toggle tidak ketemu)'); continue; }
    if (cb.checked !== want[i].on) { cb.click(); await sleep(250); }
    if (cb.checked !== want[i].on) manual.push(want[i].key + ' (klik tidak mengubah state)');
    else console.log('  ' + want[i].key + ' -> ' + (want[i].on ? 'ON' : 'OFF'));
  }

  if (STATES.teamSizeEnabled) {
    var nums = Array.from(document.querySelectorAll('input[type="number"]'));
    if (nums.length >= 2) {
      fillInput(nums[0], String(STATES.minTeamMembers));
      fillInput(nums[1], String(STATES.maxTeamMembers));
      console.log('  Team size -> min ' + STATES.minTeamMembers + ', max ' + STATES.maxTeamMembers);
    } else {
      manual.push('Team size min/max (input number tidak ketemu, ada ' + nums.length + ')');
    }
  }

  if (manual.length) {
    console.warn('%cStep 2 States - ISI MANUAL: ' + manual.join('; ') + '. Nilai yang benar menurut config: Team size ' + (STATES.teamSizeEnabled ? 'ON (min ' + STATES.minTeamMembers + ', max ' + STATES.maxTeamMembers + ')' : 'OFF') + ', Referral ' + (STATES.referralEnabled ? 'ON' : 'OFF') + ', Detailed pricing ' + (STATES.detailedPricing ? 'ON' : 'OFF') + '.', 'color:#f59e0b;font-weight:bold');
  }
  console.warn('%cDetailed pricing ON bisa mengubah jumlah input di Step 4 > Time-Price. Kalau fillTimePrice nanti bilang STOP, isi harga manual: price ' + TIME_PRICE.price + ', service fee ' + TIME_PRICE.feeType + ' ' + TIME_PRICE.fee + ', tax ' + TIME_PRICE.taxType + ' ' + TIME_PRICE.tax + '.', 'color:#f59e0b');
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
// ===================== PETA PERCABANGAN (manual) =====================

function printBranchMap() {
  console.log('%c=== Percabangan yang HARUS dipasang manual di UI (' + BRANCH_MAP.length + ' aturan) ===', 'color:#a855f7;font-weight:bold;font-size:13px');
  console.log('Buka Step 4 > section terkait > field terkait, lalu set "next section" per opsi:');
  console.table(BRANCH_MAP);
  console.warn('%cTanpa percabangan ini, SEMUA section tampil ke SEMUA peserta - peserta Umum akan diminta mengisi data tim YAC/ACC dan sebaliknya.', 'color:#ef4444;font-weight:bold');
}

// ===================== STEP 7 - REVIEW (lapor saja, TIDAK PERNAH submit) =====================

async function reportReview() {
  console.log('%c=== Step 7: Review ===', 'color:#6366f1;font-weight:bold');
  clickByText('button', '7Review');
  await sleep(500);
  var ready = document.body.innerText.includes('Everything looks good');
  console.log(ready
    ? '%cREADY -> "Everything looks good." Cek dulu: ' + TOTAL_FIELDS + ' field, ' + SECTIONS.length + ' section, 1 Phase, 1 Timeline, peserta bayar Rp' + HARGA_PESERTA + ' (dasar Rp' + HARGA_DASAR + ' + fee Rp' + FEE_ROETIX + ').'
    : '%cNOT READY -> baca pesan "Not ready to finish - missing: ..." di layar. Kalau ada key ber-suffix aneh, draft event sebelumnya belum dibersihkan: localStorage.removeItem(\'roetix:competition-draft\'); location.reload();',
    'color:' + (ready ? '#22c55e' : '#ef4444') + ';font-weight:bold;font-size:13px');
  printBranchMap();
  console.warn('%cSEBELUM KLIK "Create event": (1) pasang SEMUA percabangan di tabel di atas; (2) cek toggle Step 2 States - Team size ' + (STATES.teamSizeEnabled ? 'ON min/max ' + STATES.minTeamMembers + '/' + STATES.maxTeamMembers : 'OFF') + ', Referral ' + (STATES.referralEnabled ? 'ON' : 'OFF') + ', Detailed pricing ' + (STATES.detailedPricing ? 'ON' : 'OFF') + '; (3) upload banner event di Step 1; (4) pastikan total harga peserta = Rp' + HARGA_PESERTA + '.', 'color:#f59e0b;font-weight:bold');
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
  console.log('%cSelesai. Belum ada yang tersimpan - pasang percabangan, review Step 7, lalu klik "Create event" sendiri.', 'color:#22c55e;font-weight:bold');
})();
