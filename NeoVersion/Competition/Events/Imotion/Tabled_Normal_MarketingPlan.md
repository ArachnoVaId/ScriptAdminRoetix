# RAW — The 20th IMOTION Marketing Plan (Marketing Plan / Mini Marketing Case)

> **Notes:**
> - Sumber RAW adalah hasil export teks dari Google Form, sehingga beberapa header section terpotong (mis. "nformasi..." → "Informasi...", "agaimana..." → "Bagaimana...", "MOTION SUPPORT..." → "IMOTION SUPPORT...") — sudah dikoreksi di tabel ini.
> - `TeamName` tidak diikuti tanda `*` eksplisit di RAW (baris berikutnya langsung section header), namun tetap ditandai `required: true` karena nama tim lazimnya wajib di semua pendaftaran. **Mohon konfirmasi ke client.**
> - `Jurusan dan Angkatan` adalah 1 field gabungan (bukan 2 field terpisah seperti di contoh IGNITE Major/Batch), sehingga dipetakan ke key `MajorBatch`.
> - Section **Anggota Keempat** eksplisit ditandai "bersifat opsional" di RAW dan tidak ada tanda `*` pada field-fieldnya → seluruh field Member3 di bawah `required: false`, dan semua label diberi suffix `(opsional)`.
> - Section **IMOTION Support Package** bersifat conditional/branching di Google Form asli (tergantung jawaban "Ya/Tidak" dan tim/individu), tapi export teks meratakan alurnya jadi linear. Pemetaan di bawah adalah interpretasi terbaik — **wajib diverifikasi manual terhadap form asli** sebelum dipakai ke JS.

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

## Section 4: Fourth Member (Anggota Keempat — Optional)

> **Notes:** Anggota Keempat bersifat opsional.

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member3FullName | Nama Anggota Keempat (opsional) | text | false | |
| 2 | Member3Institution | Institusi (opsional) | text | false | Contoh: Universitas Indonesia |
| 3 | Member3MajorBatch | Jurusan dan Angkatan (opsional) | text | false | Contoh: Manajemen 2025 |
| 4 | Member3Email | Email Anggota Keempat (opsional) | email | false | |
| 5 | Member3PhoneNumber | Nomor WhatsApp Anggota Keempat (opsional) | phone | false | |
| 6 | Member3LineID | LINE ID Anggota Keempat (opsional) | text | false | |

## Section 5: Attachments & Info

### Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | AdminProof | Bukti Kelengkapan Administrasi | file | true | Desc: Satu file berisi: (1) KTM seluruh anggota tim, (2) bukti follow IG @imotionfebui, (3) bukti follow TikTok @imotionfebui, (4) bukti follow X @imotionfebui, (5) bukti upload poster The 20th IMOTION di IG Story + tag @imotionfebui, (6) bukti upload Twibbon The 20th IMOTION di IG Feed. Akses poster & twibbon: https://bit.ly/ParticipantEssentialsThe20thIMOTION. Template compiled proof (CompiledProof20thIMOTION): https://docs.google.com/document/d/1Qv6xVp2H1TyXORJK2aaTtbcaxHV2u2fmCyQezcpMWa8/edit?tab=t.0 — WAJIB "Make a copy" dulu sebelum mengisi template. Nama file: (Team Name)_Registration The 20th IMOTION_Compiled Proof. Max 100 MB. |

### Additional Info

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | InfoIMOTIONFrom | Bagaimana Anda mengetahui The 20th IMOTION? | multiple_choice | true | | Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn), Website IMOTION, Media Partner, KOL/Content Creator, Teman, Other |

## Section 6: IMOTION Support Package & Payment

### IMOTION Support Package ⚠️ (conditional/branching — verifikasi manual)

> **Notes:** Field "Berkas Formulir" dan "Bukti pengisian" masing-masing untuk Tim/Individu digabung jadi 1 field (tidak dipisah), karena keduanya merujuk ke aksi yang sama (isi form linktr.ee + upload bukti screenshot-nya). Seluruh field di section ini `required: false` kecuali pertanyaan JABODETABEK.

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | OutsideJabodetabek | Apakah kampus tim anda/kampus salah satu anggota tim anda ada yang berasal dari LUAR JABODETABEK? | multiple_choice | true | Tim/anggota di luar JABODETABEK wajib daftar Support Package; tim dari JABODETABEK opsional. | Tidak (seluruh tim dalam jabodetabek), Ya (seluruh tim di luar jabodetabek), Individu (Ada beberapa anggota yang di luar jabodetabek) |
| 2 | SupportPackageTeamForm | Berkas Formulir IMOTION Support Package (Tim) | file | false | Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir Paket Dukungan IMOTION. Nama file: (Team Name)_IMOTIONSupportPackage. | |
| 3 | SupportPackageIndividualForm | Berkas Formulir IMOTION Support Package (Individu) | file | false | Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Nama file: (Team Name)_(Team Member)_IMOTIONSupportPackage. | |

### Payment

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | PaymentProof | Bukti Pembayaran | file | false | Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment |
