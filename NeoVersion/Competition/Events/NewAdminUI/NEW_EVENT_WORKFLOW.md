# Workflow: Build Create_<EventID>.js dari Nol (Fresh Claude Session, No Context)

Dokumen ini pengganti penjelasan ulang tiap kali mau minta Claude build event baru di
`admin.roetix.com/events/create`. Cukup pakai **Kickoff Prompt** di bawah, Claude akan mengikuti urutan
kerja ini tanpa perlu dijelaskan ulang dari nol.

## Kickoff Prompt (paste ini di sesi baru)

```
Baca ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/NEW_EVENT_WORKFLOW.md dan ikuti persis
urutan kerjanya. Event baru ada di:
ScriptTemplate/NeoVersion/Competition/Events/<N>]<NamaEvent>/
```

Ganti `<N>]<NamaEvent>` dengan folder event yang sudah berisi minimal `RAW_<NamaEvent>.txt` (hasil paste
mentah dari client — MoU/tabel harga/isi Google Form, BUKAN hasil ketik ulang).

---

## Urutan kerja (WAJIB diikuti persis, jangan skip langkah)

### 1. Baca dokumen referensi dulu
- `README.md` (folder ini) — mekanisme DOM wizard & teknik fill, sumber kebenaran teknis. WAJIB dibaca
  penuh, bukan cuma di-skim — banyak gotcha (localStorage draft, Step numbering yang pernah geser, dst).
- `RAW_TO_CHECKLIST_GUIDE.md` (folder ini) — cara memetakan RAW ke grup checklist.
- `CLIENT_INTAKE_CHECKLIST.md` (folder ini) — daftar lengkap grup A–I informasi yang wajib/kondisional ada
  sebelum event bisa dibuild.

### 2. Baca CONTOH SCRIPT yang sudah pernah berhasil dipakai
- **Pakai `../9]StudentPreneur26/JSON/Create_UISP2026_BMCC.js` sebagai DASAR ENGINE**, bukan versi lain
  yang lebih lama. Ini yang paling update (per 2026-08-22) dan paling defensif:
  - Guard `expectedBaseline` sebelum nambah section (cegah field nyasar kalau draft belum bersih)
  - Mekanisme Options multiple_choice pakai tombol **`Add option`** (yang lama, `Add choice…`, SUDAH TIDAK
    BEKERJA — jangan dipakai meski ada di script event lain yang lebih tua seperti ICGS/SRD2026)
  - `identityAlreadyRendered` guard di Step 1 (hindari re-render race waktu tab sudah aktif)
  - Pola `visitStates()` yang cuma singgah + log kalau toggle States belum dikonfirmasi client, TIDAK
    mengubah apa pun secara diam-diam
- Kalau event barunya multi-Phase per event (bukan cuma multi-Timeline), lihat juga struktur
  `window.continuePhase2()` / `window.finishRest()` checkpoint manual di script yang sama — dipakai karena
  multi-Phase belum banyak diverifikasi live, jadi aman untuk verifikasi visual antar-Phase.
- Contoh nyata proses lengkap dari RAW mentah sampai script jadi: `../11]RakyardRumble/` (RAW →
  `INTAKE_GAPS_RakyardRumble.md` → `JSON/Create_RakyardRumble.js`) — baca folder ini sebagai referensi
  urutan kerja paling baru kalau ragu.

### 3. Baca `RAW_<NamaEvent>.txt` event baru — PENUH dari awal sampai akhir dulu sebelum breakdown apa pun.
Identifikasi semua blok pakai tabel pola di `RAW_TO_CHECKLIST_GUIDE.md` §1 (Timeline/Harga, `DATA FORM ...
Section N of M`, tabel `Section/Information-question/Keterangan`, blok pembayaran manual, varian ganda).

### 4. Cross-check RAW ke `CLIENT_INTAKE_CHECKLIST.md` — kelompokkan tiap blok RAW ke grup A–I (tempel
utuh dulu per `RAW_TO_CHECKLIST_GUIDE.md` §2, jangan breakdown baris-per-baris di tahap ini).

Perhatikan pola-pola berikut selama cross-check (sumber kesalahan paling sering):
- Baris deskripsi field yang diawali `*` (mis. `*Jika tidak ada silahkan dikosongkan`) = **helper text**,
  BUKAN penanda wajib. Penanda field **wajib** = baris `*` yang BERDIRI SENDIRI (tanpa teks lain), biasanya
  tepat sebelum baris "cek"/opsi pilihan ganda.
- Kalau nomor section di RAW meloncat atau ada section yang hilang — JANGAN diasumsikan sendiri (section
  hilang, atau section tersembunyi, atau salah transkrip) — ini masuk daftar gap, tanyakan eksplisit.
- Field bertipe `multiple_choice` yang opsinya cuma tercantum 1 — jangan langsung dianggap "cuma 1 opsi
  itu memang benar" ATAU "pasti kelewatan transkrip" — dua-duanya mungkin, masuk gap/konflik, tanyakan.
- Link placeholder seperti `[link]` di RAW (mis. "Contoh Video Shadow Boxing [link]") — itu tempat kosong
  yang perlu diisi URL asli dari client, bukan literal teks `[link]` yang dipakai apa adanya.

### 5. Tulis `INTAKE_GAPS_<EventID>.md` di folder event yang sama (sebelah RAW-nya), format persis
`RAW_TO_CHECKLIST_GUIDE.md` §4:
- Tabel "Belum ada / perlu konfirmasi" (kolom: Grup, No, Informasi, Kenapa gap)
- "Konflik data" (butuh keputusan client, jangan pilih sepihak)
- "Placeholder belum diisi client"
- Tambahan: seksi "Yang sudah cukup jelas" — supaya user tahu bagian mana yang SUDAH dicek dan aman,
  tidak perlu ditanya ulang.

### 6. STOP di sini — serahkan gap report ke user, JANGAN menebak jawaban gap sendiri.
Pengecualian: kalau user secara eksplisit bilang ini **dummy/testing** (mis. minta harga asal/tanggal
asal buat coba platform), boleh isi placeholder dengan asumsi wajar — TAPI tetap WAJIB ditandai jelas
sebagai asumsi/dummy di komentar script pada langkah 8, jangan didiamkan seolah data final.

### 7. Setelah user jawab, reconcile jawaban ke tiap baris gap satu-satu.
Kalau jawaban user singkat/implisit (mis. "keep it like tnc", "for now dummy dulu") — cocokkan persis ke
urutan pertanyaan yang diajukan di gap report, JANGAN diasumsikan menjawab pertanyaan lain yang mirip.
Kalau ada jawaban yang tidak jelas menjawab yang mana, tanya balik — jangan tebak.

### 8. Build `Create_<EventID>.js` di `<EventFolder>/JSON/`, reuse engine dari langkah 2:
- Helper functions verbatim: `sleep`, `fillInput`, `fillSelect`, `fillEditable`, `clickCheckbox`,
  `clickByText`
- `fillIdentity()` dengan guard `identityAlreadyRendered`
- `visitStates()` — kalau B1–B5 (Active/Featured/Team size/Referral/Detailed pricing) belum dikonfirmasi
  eksplisit, JANGAN ubah toggle apa pun, cukup click tab + `console.log` reminder untuk cek manual
- `fillPhase()` / `addSectionsAndFields(sections, expectedBaseline)` (WAJIB pakai guard baseline) /
  `fillTimeline()` / `fillTimePrice()` (1 Phase × 1 Timeline) atau `fillTimePriceMatrix()` (>1×1, WAJIB
  tandai perlu verifikasi manual per cell)
- `fillCompletion()`
- `reportReview()` di step Review (JANGAN PERNAH auto-klik "Create event" — itu keputusan manusia)
- Header komentar file WAJIB berisi:
  - Link ke companion doc (`README.md`, `RAW_<EventName>.txt`, `INTAKE_GAPS_<EventID>.md`)
  - Status jelas: **DUMMY/TEST BUILD** atau **PRODUKSI**, kalau dummy sebutkan persis bagian mana yang
    dummy (harga/tanggal/dst) dan apa nilai aslinya kalau sudah ada
  - Daftar **KEPUTUSAN atas ambiguitas** — tiap keputusan dari langkah 7, sertakan tanggal & bahwa itu
    dikonfirmasi user (bukan tebakan Claude), format seperti contoh di
    `../9]StudentPreneur26/JSON/Create_UISP2026_BMCC.js` atau `../11]RakyardRumble/JSON/Create_RakyardRumble.js`

### 9. (Kalau diminta) generate tabel rekap Section/Field buat dipaste ke spreadsheet
Format 3 kolom tab-separated: `Section`, `Information/question`, `Keterangan`. Section dikosongkan di
baris field lanjutan dalam section yang sama (biar rapi meniru merged-cell kalau di-paste ke Sheets).
Keterangan pakai istilah gaya Google Forms: "Isian singkat", "Isian singkat - Angka", "Pilihan ganda —
Opsi: ...", "Upload file", dst, plus tandai (wajib)/(opsional). Simpan sebagai
`RECAP_<EventID>_Form.tsv` di folder event yang sama kalau diminta disimpan.

---

## Aturan tetap (jangan pernah dilanggar, di semua langkah)

- **Jangan pernah klik "Create event" dari script** — itu selalu keputusan manusia di akhir, event ini
  masuk produksi live.
- **Jangan pakai `localStorage.clear()`** untuk bersihkan draft — itu juga menghapus token login. Selalu
  `localStorage.removeItem('roetix:competition-draft')` lalu reload, verifikasi draft benar-benar kosong
  (`document.querySelectorAll('button')` ber-text `'Add field'`/`'Add section'` harus 0) sebelum run script.
- **Jangan asumsikan jawaban gap sendiri** kecuali user eksplisit bilang dummy/testing (lihat langkah 6).
- **Jangan pakai mekanisme lama `Add choice…`** untuk isi opsi `multiple_choice` — sudah tidak berfungsi
  di UI saat ini, pakai `Add option` (lihat langkah 2 & `README.md`).
- **Selalu cek ulang nomor tab wizard di layar** (`1Identity`, `2States`, dst) sebelum percaya nomor yang
  ada di dokumen — UI ini pernah berubah tanpa update dokumentasi (lihat riwayat di `README.md`).
- Kalau `addSectionsAndFields` throw error karena `expectedBaseline` tidak cocok — itu **guard yang bekerja
  benar**, bukan bug untuk di-workaround. Berhenti, suruh user cek layar/reset draft, jangan paksa lanjut.
