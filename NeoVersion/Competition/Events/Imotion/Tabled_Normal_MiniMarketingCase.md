# RAW — The 20th IMOTION Mini Marketing Case (Normal Phase)

> **Notes:**
> - Sumber: `RAW_MiniMarketingCase.txt`. File ini adalah sub-kompetisi **terpisah** dari Marketing Plan (bukan fase/nama alternatif) — dikonfirmasi oleh user.
> - RAW hanya menuliskan ulang Team Data + Team Leader + Second Member + Third Member secara eksplisit (isinya identik kata-per-kata dengan `RAW_MarketingPlan.txt`), lalu menulis `(sisanya sama seperti MarketingPlan)` untuk sisanya.
> - Dikonfirmasi oleh user: "sisanya sama seperti MarketingPlan" berlaku **mulai dari Attachments** — artinya Mini Marketing Case **tidak punya** section Anggota Keempat (tim maksimal 3 orang: Leader + Member1 + Member2).
> - Attachments, Additional Info, IMOTION Support Package, dan Payment mengikuti persis struktur final `Tabled_Normal_MarketingPlan.md` (termasuk field Support Package yang sudah digabung jadi 2 field, opsi Jabodetabek 3 pilihan, dan semua field di section terakhir `required: false` kecuali pertanyaan JABODETABEK).
> - Noise format (baris `-` setelah setiap `*` di RAW) diabaikan — artifact bullet list, bukan penanda field.
> - Section di sini di-nomor ulang dari 1 (tidak melompat ke 5/6 seperti Marketing Plan) karena Mini Marketing Case adalah entity/timeline terpisah di dashboard — tidak perlu selaras dengan nomor section Marketing Plan.

## Section 1: Team Data

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | Nama Tim | text | true | |

### Team Leader (Ketua Tim / Anggota Pertama)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | LeaderFullName | Nama Ketua Tim (Anggota Pertama) | text | true | |
| 2 | LeaderInstitution | Institusi | text | true | Contoh: Universitas Indonesia |
| 3 | LeaderMajorBatch | Jurusan dan Angkatan | text | true | Contoh: Manajemen 2025 |
| 4 | LeaderEmail | Email Ketua Tim (Anggota Pertama) | email | true | |
| 5 | LeaderPhoneNumber | Nomor WhatsApp Ketua Tim (Anggota Pertama) | phone | true | |
| 6 | LeaderLineID | LINE ID Ketua Tim (Anggota Pertama) | text | true | |

## Section 2: Second Member (Anggota Kedua)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member1FullName | Nama Anggota Kedua | text | true | |
| 2 | Member1Institution | Institusi | text | true | Contoh: Universitas Indonesia |
| 3 | Member1MajorBatch | Jurusan dan Angkatan | text | true | Contoh: Manajemen 2025 |
| 4 | Member1Email | Email Anggota Kedua | email | true | |
| 5 | Member1PhoneNumber | Nomor WhatsApp Anggota Kedua | phone | true | |
| 6 | Member1LineID | LINE ID Anggota Kedua | text | true | |

## Section 3: Third Member (Anggota Ketiga)

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member2FullName | Nama Anggota Ketiga | text | true | |
| 2 | Member2Institution | Institusi | text | true | Contoh: Universitas Indonesia |
| 3 | Member2MajorBatch | Jurusan dan Angkatan | text | true | Contoh: Manajemen 2025 |
| 4 | Member2Email | Email Anggota Ketiga | email | true | |
| 5 | Member2PhoneNumber | Nomor WhatsApp Anggota Ketiga | phone | true | |
| 6 | Member2LineID | LINE ID Anggota Ketiga | text | true | |

## Section 4: Attachments & Info

_(identik dengan Marketing Plan — lihat `Tabled_Normal_MarketingPlan.md` Section 5 untuk detail penuh)_

### Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | AdminProof | Bukti Kelengkapan Administrasi | file | true | Desc: Satu file berisi: (1) KTM seluruh anggota tim, (2) bukti follow IG @imotionfebui, (3) bukti follow TikTok @imotionfebui, (4) bukti follow X @imotionfebui, (5) bukti upload poster The 20th IMOTION di IG Story + tag @imotionfebui, (6) bukti upload Twibbon The 20th IMOTION di IG Feed. Akses poster & twibbon: https://bit.ly/ParticipantEssentialsThe20thIMOTION. Template compiled proof (CompiledProof20thIMOTION): https://docs.google.com/document/d/1Qv6xVp2H1TyXORJK2aaTtbcaxHV2u2fmCyQezcpMWa8/edit?tab=t.0 — WAJIB "Make a copy" dulu sebelum mengisi template. Nama file: (Team Name)_Registration The 20th IMOTION_Compiled Proof. Max 100 MB. |

### Additional Info

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | InfoIMOTIONFrom | Bagaimana Anda mengetahui The 20th IMOTION? | multiple_choice | true | | Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn), Website IMOTION, Media Partner, KOL/Content Creator, Teman, Other |

## Section 5: IMOTION Support Package & Payment

_(identik dengan Marketing Plan — lihat `Tabled_Normal_MarketingPlan.md` Section 6 untuk detail penuh)_

### IMOTION Support Package ⚠️ (conditional/branching — verifikasi manual; semua optional kecuali pertanyaan JABODETABEK)

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | OutsideJabodetabek | Apakah kampus tim anda/kampus salah satu anggota tim anda ada yang berasal dari LUAR JABODETABEK? | multiple_choice | true | Tim/anggota di luar JABODETABEK wajib daftar Support Package; tim dari JABODETABEK opsional. | Tidak (seluruh tim dalam jabodetabek), Ya (seluruh tim di luar jabodetabek), Individu (Ada beberapa anggota yang di luar jabodetabek) |
| 2 | SupportPackageTeamForm | Berkas Formulir IMOTION Support Package (Tim) | file | false | Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir Paket Dukungan IMOTION. Nama file: (Team Name)_IMOTIONSupportPackage. | |
| 3 | SupportPackageIndividualForm | Berkas Formulir IMOTION Support Package (Individu) | file | false | Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Nama file: (Team Name)_(Team Member)_IMOTIONSupportPackage. | |

### Payment

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | PaymentProof | Bukti Pembayaran | file | false | Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment |
