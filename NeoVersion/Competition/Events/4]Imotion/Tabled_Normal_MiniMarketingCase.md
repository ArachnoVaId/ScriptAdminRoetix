# RAW — The 20th IMOTION Mini Marketing Case (Normal Phase)

> **Notes:**
> - Sumber: `RAW_MiniMarketingCase.txt`. File ini adalah sub-kompetisi **terpisah** dari Marketing Plan (bukan fase/nama alternatif) — dikonfirmasi oleh user.
> - RAW hanya menuliskan ulang Team Data + Team Leader + Second Member + Third Member secara eksplisit (isinya identik kata-per-kata dengan `RAW_MarketingPlan.txt`), lalu menulis `(sisanya sama seperti MarketingPlan)` untuk sisanya.
> - Dikonfirmasi oleh user: "sisanya sama seperti MarketingPlan" berlaku **mulai dari Attachments** — artinya Mini Marketing Case **tidak punya** section Anggota Keempat (tim maksimal 3 orang: Leader + Member1 + Member2).
> - Attachments, Additional Info, IMOTION Support Package, dan Payment mengikuti persis struktur final `Tabled_Normal_MarketingPlan.md` (termasuk field Support Package yang sudah digabung jadi 2 field, opsi Jabodetabek 3 pilihan, dan semua field di section terakhir `required: false` kecuali pertanyaan JABODETABEK).
> - Noise format (baris `-` setelah setiap `*` di RAW) diabaikan — artifact bullet list, bukan penanda field.
> - Section di sini di-nomor ulang dari 1 (tidak melompat ke 5/6 seperti Marketing Plan) karena Mini Marketing Case adalah entity/timeline terpisah di dashboard — tidak perlu selaras dengan nomor section Marketing Plan.
> - **REVISI (2026-08-03):** Judul form pendaftaran diubah jadi "Mini Marketing Case Competition Normal Registration" (dan "...Extend Registration" untuk timeline Extend). Label field diterjemahkan ke Inggris dengan format "(First/Second/Third Member)" — analog dengan revisi Marketing Plan. Section "How did you find out" dipisah dari Attachments jadi section tersendiri — total section sekarang 6 (bukan 5).

## Section 1: Team Data

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | Nama Tim | text | true | |

### Team Leader (Ketua Tim / Anggota Pertama)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | LeaderFullName | Nama Ketua Tim (Anggota Pertama) | text | true | |
| 2 | LeaderInstitution | Team Leader Institution (First Member) | text | true | Contoh: Universitas Indonesia |
| 3 | LeaderMajorBatch | Team Leader Major and Batch (First Member) | text | true | Contoh: Manajemen 2025 |
| 4 | LeaderEmail | Email Ketua Tim (Anggota Pertama) | email | true | |
| 5 | LeaderPhoneNumber | Team Leader Whatsapp Number (First Member) | phone | true | |
| 6 | LeaderLineID | Team Leader LINE ID (First Member) | text | true | |

## Section 2: Second Member (Anggota Kedua)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member1FullName | Nama Anggota Kedua | text | true | |
| 2 | Member1Institution | Second Member Institution | text | true | Contoh: Universitas Indonesia |
| 3 | Member1MajorBatch | Second Member Major and Batch | text | true | Contoh: Manajemen 2025 |
| 4 | Member1Email | Email Anggota Kedua | email | true | |
| 5 | Member1PhoneNumber | Nomor WhatsApp Anggota Kedua | phone | true | |
| 6 | Member1LineID | Second Member LINE ID | text | true | |

## Section 3: Third Member (Anggota Ketiga)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member2FullName | Nama Anggota Ketiga | text | true | |
| 2 | Member2Institution | Third Member Institution | text | true | Contoh: Universitas Indonesia |
| 3 | Member2MajorBatch | Third Member Major and Batch | text | true | Contoh: Manajemen 2025 |
| 4 | Member2Email | Email Anggota Ketiga | email | true | |
| 5 | Member2PhoneNumber | Nomor WhatsApp Anggota Ketiga | phone | true | |
| 6 | Member2LineID | Third Member LINE ID | text | true | |

## Section 4: Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | AdminProof | Bukti Kelengkapan Administrasi | file | true | Please upload one file using the provided template. Make sure the file contains the following documents: 1. Student Identity Card (KTM) of all team members. 2. Proof of following the Instagram account @imotionfebui. 3. Proof of following the TikTok account @imotionfebui. 4. Proof of following the X (Twitter) account @imotionfebui. 5. Proof of uploading The 20th IMOTION poster to Instagram Story and tagging the account @imotionfebui. 6. Proof of uploading The 20th IMOTION Twibbon to Instagram Feed. Download the registration proof template through the following link: https://bit.ly/CompiledProof20thIMOTION. Please make a copy of the template first before filling it out. File name: (Team Name)_Registration The 20th IMOTION_Compiled Proof. The file must be in PDF format only. |

## Section 5: Additional Info

_(dipisah dari Attachments per revisi — sebelumnya tergabung di Section 4)_

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | InfoIMOTIONFrom | Bagaimana Anda mengetahui The 20th IMOTION? | multiple_choice | true | | Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn), Website IMOTION, Media Partner, KOL/Content Creator, Teman, Other |

## Section 6: IMOTION Support Package & Payment

_(identik dengan Marketing Plan — lihat `Tabled_Normal_MarketingPlan.md` Section 7 untuk detail penuh)_

### IMOTION Support Package (REVISI 2026-08-04 — disederhanakan jadi 1 pertanyaan + 1 kolom bukti)

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | OutsideJabodetabek | Apakah domisili tim anda atau salah satu anggota dari tim anda berasal dari LUAR JABODETABEK? | multiple_choice | true | | Ya/Mau Mendaftar, Tidak |
| 2 | SupportPackageProof | Pengumpulan Bukti Formulir IMOTION Support Package | file | **true** | Jika Ya atau ingin mendaftar untuk mendukung kebutuhan akomodasi selama pelaksanaan Final Round The 20th IMOTION, mohon membaca Terms & Conditions lalu mengisi form registrasi IMOTION Support Package yang keduanya ada pada link berikut: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar, gambar, atau berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Format penamaan file — Tim: (Team Name)_IMOTIONSupportPackage; Individu: (Team Name)_(Team Member)_IMOTIONSupportPackage. Jika Tidak, isi kolom ini dengan file/foto kosong (blank) dengan format nama file: TidakMendaftar. Disclaimer: IMOTION Support Package wajib diikuti oleh semua peserta yang berdomisili di luar wilayah Jabodetabek (kondisi tertentu dapat menyebabkan instruksi ini tidak berlaku). Info lebih lanjut/konfirmasi: Azwa - WhatsApp 081806294294 / LINE ae062512. | |

### Payment

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | PaymentProof | Bukti Pembayaran | file | false | Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment |
