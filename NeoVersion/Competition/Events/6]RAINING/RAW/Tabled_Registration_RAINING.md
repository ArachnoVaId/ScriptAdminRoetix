# RAW — RAINING 2026 Registration

Source: `TestHelper/Context/Gform/RainingITS.md` (Gform dump) + client-provided pricing table (chat, 2026-08-18). No team structure — individual registration (Min team = Max team = 1). No file-upload/payment-proof field: Competition events pay via Roetix's built-in QRIS gateway, no manual proof needed.

> **Notes:**
> - The Gform's own batch dates (Early Bird 15–21 Aug / Batch 1 22 Aug–4 Sep / Batch 2 5–18 Sep / Extend 19–20 Sep) were **superseded** by the client's pricing-table dates below, per user decision. The Gform's "Extend Batch 2" tier is dropped — only 3 batches exist now.
> - "Paket Penawaran Kelas" (Online Class / Full Package) is **not** modeled as a form field. Roetix competition pricing is a Phase × Timeline matrix — one price per cell — so it can't branch off a form-field answer. It is instead modeled as **two separate Phases** ("Online Class" and "Full Package"), each carrying an identical Section/Field set, each priced independently per Timeline. See the Build Guide for the full Phase/Timeline/Price layout.

## Section 1: Data Peserta

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | FullName | Nama Lengkap | text | true | Gunakan Kapital pada Awal Kata. Contoh: Dyna Setyowati |
| 2 | PhoneNumber | No. Whatsapp Aktif | phone | true | Jangan Gunakan Spasi. Contoh yang Benar: 081xxxxxx |
| 3 | Institution | Asal Instansi | text | true | Gunakan Kapital pada Awal Kata. Contoh: Institut Teknologi Sepuluh Nopember |

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 4 | Category | Kategori | multiple_choice | true | | Mahasiswa Aktif Kimia/Alumni Kimia ITS, Umum |

## Pricing schedule (client-provided, 2026-08-18)

| Batch | Window | Online Class | Full Package |
|---|---|---|---|
| Early Bird | 18–25 Agustus 2026 | Rp158.000 | Rp178.000 |
| Batch 1 | 26 Agustus – 7 September 2026 | Rp168.000 | Rp188.000 |
| Batch 2 | 8–20 September 2026 | Rp178.000 | Rp198.000 |

Roetix service fee: Rp16.250/transaction total — Rp13.000 deducted from the client's payout, Rp3.250 added to the price the participant pays. Identical for both Kategori answers (student vs Umum does not change price).
