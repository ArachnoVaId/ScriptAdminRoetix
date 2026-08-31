# Panduan: Memetakan `RAW_<Event>.txt` ke `CLIENT_INTAKE_CHECKLIST.md`

Dokumen ini instruksi kerja untuk mengambil file mentah client (`RAW_<Event>.txt` — hasil paste MoU/tabel
harga/gform, bukan hasil ketik ulang) dan mencocokkannya ke `CLIENT_INTAKE_CHECKLIST.md`, **tanpa perlu
memecah tiap baris raw satu-satu ke tiap baris checklist**. Fungsi:

1. Blok besar di RAW (tabel timeline, tabel harga, seluruh isi gform) langsung ditempel utuh ke grup
   checklist yang sesuai — breakdown per-field baru dilakukan di tahap lanjut, saat build script.
2. Dari hasil pencocokan itu, hasilkan 1 laporan "apa yang belum ada" per event (`INTAKE_GAPS_<EventID>.md`)
   supaya yang minta data ke client tahu persis apa yang masih kurang, bukan menebak sendiri.

Referensi: `CLIENT_INTAKE_CHECKLIST.md` (grup A–I), contoh RAW nyata yang sudah pernah diproses —
`../StudentPreneur26/RAW_Studentpreneur.txt` (hasil akhirnya: `../StudentPreneur26/JSON/RECAP_UISP2026BMCC_live.md`),
`../SRD2026/RAW_SRD2026.txt`, `../SilverParadeXII/RAW/RAW_Paper_SilverParadeXII.txt`.

---

## 1. Anatomi umum file RAW (pola yang berulang di semua event)

| Pola | Ciri pengenal | Biasanya berisi |
|---|---|---|
| Blok Timeline & Harga (MoU) | Header berulang aneh seperti `Timeline / Harga / Timeline`, atau tabel `Kegiatan / Harga Peserta / Estimasi / Fee Roetix / Diterima Panitia` | Nama gelombang/fase, harga, rentang tanggal — **rentang tanggal SERING TANPA TAHUN** |
| Blok `DATA FORM <nama event> ... Section N of M` | Literal `Section X of Y` berurutan | Isi form pendaftaran; **Section 1 sering berisi teks promo/deskripsi, BUKAN field form** — field form form beneran baru mulai dari Section 2 |
| Blok tabel `Section / Information-question / Keterangan` (format lain dari yang di atas, lihat `RAW_SRD2026.txt`) | Header kolom persis `Section`, `Information/question`, `Keterangan` | Sama isinya seperti pola di atas, cuma dari sumber gform yang ditranskrip beda alat |
| Tag `#ISI google form panitia` | Literal tag ini di RAW | Menandai form KEDUA yang terpisah dari form registrasi Roetix (mis. gform internal panitia) — **jangan ketuker dengan form utama** |
| Blok deskripsi/promo & kontak | Paragraf berisi emoji header (`🚀📌🗓️📩`) sebelum blok `DATA FORM`, atau jadi Section 1 di dalam `DATA FORM` itu sendiri | Deskripsi lengkap event, contact person (biasanya di baris terakhir, tanda `📩`) |
| Blok metode pembayaran manual | Emoji `💳`, teks `a.n.`, nomor rekening | Bank & CP untuk pembayaran non-gateway (biasanya fase lanjutan/berbayar) |
| Varian ganda (multi-audiens/paket) | Judul blok yang terulang dengan suffix beda, mis. `pendaftar Umum` vs `pendaftar Mahasiswa IPB`, atau `Beli 2`/`Beli 3` | Tiap varian = kombinasi Timeline+Harga+Section-form sendiri-sendiri — **jangan digabung asal sebelum tahu apakah tiap varian jadi 1 event/Phase/section terpisah** |

## 2. Tabel pemetaan RAW → grup checklist (tempel UTUH dulu, jangan dipecah baris)

| Pola RAW | → Grup checklist | Cara tempel | Catatan |
|---|---|---|---|
| Paragraf pembuka/deskripsi | **A** (Identitas), **I** (Kontak) | Copy paragraf penuh apa adanya jadi draft Description | Nama event ambil dari judul blok MoU/DATA FORM, cocokkan konsisten; CP biasanya di akhir (`📩`) |
| Tabel Timeline & Harga MoU | **C** (Phase) + **D** (Timeline) + **E** (Harga/Fee) sekaligus | Copy tabel utuh ke satu tempat kerja dulu, breakdown ke C/D/E terpisah SETELAH keputusan struktur Phase-vs-Timeline diambil | Tanggal sering tanpa tahun → otomatis jadi baris di gap report; kalau ada >1 tabel berarti multi-varian, lihat baris I2 |
| Blok `DATA FORM ... Section N of M` (Section 1 = teks promo) | **F** (Section & Field); section terakhir ("Thank you"/"Terima kasih...") → **G** (Completion) | Copy section-by-section apa adanya sebagai working draft dulu; breakdown ke kolom F3/F4 checklist baru perlu pas mau build script | Section tanpa field literal (cuma judul+deskripsi) itu valid — section info-only |
| Tabel `Section / Information-question / Keterangan` | Sama seperti baris di atas (**F**+**G**), format tabel bukan `Section N of M` | Sama | Ini kadang muncul BERBARENGAN dengan gform panitia terpisah (tag `#ISI google form panitia`) — pisahkan dulu mana form registrasi Roetix, mana bukan |
| Blok pembayaran manual (`💳`/`a.n.`) | **E5** | Copy utuh | Relevan cuma kalau ada fase berbayar yang tidak lewat payment gateway otomatis |
| Varian/paket berulang (blok judul beda suffix) | **I2** dulu, sebelum lanjut yang lain | — | Putuskan/konfirmasi dulu: tiap varian jadi event terpisah, Phase terpisah, atau section berbeda dalam 1 event — ini menentukan berapa kali F/G perlu diulang breakdown-nya |

## 3. Proses kerja (urutan)

1. Baca RAW **penuh** dulu sebelum mulai breakdown apa pun — identifikasi semua blok pakai tabel pola di
   atas, termasuk berapa varian yang ada (kalau ada).
2. Kalau ketemu pola varian ganda (baris I2 checklist) → putuskan/konfirmasi struktur dulu sebelum
   breakdown detail F/G (lihat catatan arsitektur di bagian bawah `CLIENT_INTAKE_CHECKLIST.md`) — jangan
   breakdown detail dulu baru sadar strukturnya salah di tengah jalan (ini yang terjadi di kasus BMCC).
3. Tempel tiap blok RAW ke grup checklist yang sesuai (tabel §2) — level "tempel utuh" ini cukup untuk
   tahap intake, belum perlu row-per-row F3/F4.
4. Breakdown row-per-row HANYA untuk grup yang datanya langsung dipakai generate field (F, G) — kolom
   F3/F4 checklist tetap dipakai sebagai acuan struktur, isinya boleh disalin dari raw section apa adanya
   asal sudah ditaruh di bawah label field yang benar.
5. Cocokkan tiap baris **Wajib** di checklist A–I terhadap apa yang sudah ke-mapping. Yang kosong, tidak
   jelas, atau bentrok dengan sumber lain dicatat sebagai gap — jangan diasumsikan/ditebak sendiri (lihat
   "Catatan pengisian" di `CLIENT_INTAKE_CHECKLIST.md`).
6. Tulis laporan gap (format §4), simpan sebagai `INTAKE_GAPS_<EventID>.md` di folder event yang sama
   dengan RAW-nya (sebelah `RAW_<Event>.txt`).

## 4. Format laporan gap (`INTAKE_GAPS_<EventID>.md`)

```markdown
# Gap Report — <Nama Event> (<EventID>)

Dibuat dari `RAW_<Event>.txt` vs `../NewAdminUI/CLIENT_INTAKE_CHECKLIST.md`, tanggal <YYYY-MM-DD>.

## Belum ada / perlu konfirmasi ke client
| Grup | No | Informasi | Kenapa gap |
|---|---|---|---|
| C | C3 | Tahun mulai/akhir fase | RAW cuma tulis "19 September–29 September", tanpa tahun |
| H | H1–H3 | Integrasi spreadsheet | Tidak disebut sama sekali di RAW — tanya apakah dibutuhkan |

## Konflik data (butuh keputusan client, bukan diasumsikan sepihak)
- Deskripsi bilang "FREE for Preliminary Round" tapi tabel harga MoU mematok Rp185.000/Rp195.000.

## Placeholder belum diisi client
- "(Proof) Follow Instagram Our Assessor Partner (....)" — nama partner belum diisi.
```

Kalau semua baris Wajib sudah terisi & tidak ada konflik/placeholder kosong, laporan tetap dibuat dengan
isi "Tidak ada gap wajib yang tersisa" — supaya ada jejak proses ini sudah benar-benar dijalankan, bukan
dilewati diam-diam.

## 5. Contoh jalan (BMCC, `RAW_Studentpreneur.txt`)

- Tabel Timeline MoU (baris 3–15) → C/D/E; 3 gelombang tanpa tahun → masuk gap report.
- Section 1 "BMCC Registration..." (baris 21–61) → **A** (description) + **I1** (CP di baris 55–61);
  ketemu konflik "FREE for Preliminary Round" (baris 37) vs tabel harga → masuk bagian Konflik.
- Section 2–6 (baris 65–164) → **F**, 5 section — lihat hasil breakdown lengkapnya di
  `../StudentPreneur26/JSON/RECAP_UISP2026BMCC_live.md`.
- Section 7 "Thank You!..." (baris 166–173) → **G**.
- Tidak ada blok pembayaran manual eksplisit di RAW ini → **E5** tidak relevan untuk event ini.
- Placeholder `(Proof) Follow Instagram Our Assessor Partner (....)` (baris 158) → masuk daftar Placeholder.
