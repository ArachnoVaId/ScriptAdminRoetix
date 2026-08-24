# RAW — COMMSPACE 2026 (Lasswell Competition) — Registration

> **Notes:**
> - Sumber: `RAW_LasswellCompspace.txt`.
> - Event punya 3 sub-kompetisi paralel dengan form pendaftaran **identik** (field sama persis), hanya beda harga tiket dan (kemungkinan) link grup WhatsApp konfirmasi: **FOKSI Umum** (Rp25.000), **News Anchor** (Rp40.000), **Poster** (Rp35.000). Semua HTM (berbayar) + flat platform fee Rp5.000 dibebankan ke peserta.
> - Timeline sama untuk ketiganya: 23 September 2026 – 23 Oktober 2026 (single phase, tidak ada Early Bird/Extended).
> - "Isian singkat" untuk field Email dan No Whatsapp dipetakan ke `email`/`phone` mengikuti konvensi label (bukan literal `text`), konsisten dengan field sejenis di event lain di repo ini.
> - "Link postingan karya di Instagram" dipetakan ke type `link` karena secara eksplisit meminta URL, meski Keterangan RAW menulis "Isian singkat".
> - Tidak ada prefix Leader/Member — pendaftaran per peserta/karya, bukan per tim.
> - Semua field di RAW = `required: true`.
> - Total 8 field, ≤ 10 → Engine Varian B (simple, tanpa SECTION_MAP) di Step 2.
> - Link grup WhatsApp per sub-kompetisi (after submit) adalah info pasca-submit, bukan field form.

## Section 1: Data Form

| # | Key | Label | Type | Required | Notes |
|---|-----|-------|------|----------|-------|
| 1 | Email | Email | email | true | |
| 2 | FullName | Nama Lengkap | text | true | |
| 3 | WhatsAppNumber | No Whatsapp | phone | true | |
| 4 | PaymentProof | Bukti Pembayaran | file | true | |
| 5 | StatementOfOriginality | Upload pernyataan keorisinalitasan karya | file | true | |
| 6 | FollowProof | Upload bukti follow @lasswellcompetition @commspace.untidar | file | true | |
| 7 | WorkPostLink | Link postingan karya di Instagram | link | true | |
| 8 | WorkSubmission | Upload karya | file | true | |

## Pricing per Sub-Competition (for Step 2 — price field, excl. flat platform fee)

| Sub-Competition | Price |
|-----------------|-------|
| FOKSI Umum (HTM) | Rp25.000 |
| News Anchor (HTM) | Rp40.000 |
| Poster (HTM) | Rp35.000 |
