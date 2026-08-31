# RAW — ESC PNM Registration

## Section 1: Team Data

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | TeamName | NAMA TIM | text | true | |
| 2 | UniversityName | ASAL PERGURUAN TINGGI | text | true | |

### Ketua Tim

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | LeaderFullName | NAMA KETUA TIM | text | true | |
| 2 | LeaderEmail | EMAIL KETUA TIM | email | true | |
| 3 | LeaderPhoneNumber | NOMOR WhatsApp KETUA TIM | phone | true | |

### Anggota Tim

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Member1FullName | NAMA ANGGOTA TIM | text | true | |
| 2 | Member1PhoneNumber | NOMOR WhatsApp ANGGOTA | phone | true | |

## Section 2: Attachments

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | KTMUpload | UPLOAD FOTO KTM KETUA DAN ANGGOTA TIM | file | true | Desc: Scan/photo of each member's student ID card, compile into single file |
| 2 | TwibbonUpload | UPLOAD BUKTI PENGUNGGAHAN TWIBBON KETUA DAN ANGGOTA TIM | file | true | Desc: Screenshot each member's twibbon upload, compile into single file |
| 3 | InstagramFollowProof | UPLOAD BUKTI FOLLOW AKUN INSTAGRAM HIMATEKLIS (KETUA DAN ANGGOTA TIM) | file | true | Desc: Screenshot each member's Instagram follow proof, compile into single file |
| 4 | PaymentProof | UPLOAD BUKTI PEMBAYARAN | file | true | Desc: Kirim bukti pembayaran pada nomor yang tertera pada guidebook |

## Section 3: Agreement

| # | Key | Label | Type | Required | Options |
|---|-----|-------|------|----------|---------|
| 1 | DataAccuracyAgreement | DATA YANG SAYA ISI ADALAH BENAR DAN DAPAT DIPERTANGGUNGJAWABKAN! | multiple_choice | true | Saya telah membaca dan menyetujui pernyataan diatas |
