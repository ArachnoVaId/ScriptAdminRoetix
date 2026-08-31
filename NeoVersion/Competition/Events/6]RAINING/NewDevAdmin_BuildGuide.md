# RAINING 2026 — dev-admin Build Guide (`/events/create`)

Values to enter in the new Competition wizard at `dev-admin.roetix.com/events/create`, per the 6-step flow documented in `TestHelper/Context/0.ClaudeFirstExploration.md`. No browser tool was available in this session to click through it directly — this is the field-by-field build spec, same role as the earlier IMOTION duplicate build in `TestHelper/Context/2.CompetitionEvent.md` / `3.CompetitionOldVsNewVariables.md`.

Source data: `RAW/Tabled_Registration_RAINING.md`.

---

## Step 1 — Identity

| Field | Value |
|---|---|
| Event Name | Integrated ISO Training (RAINING) 2026 |
| Event ID | RAINING2026 |
| Organizer Name | Skill and Research HIMKA ITS |
| Min team | 1 |
| Max team | 1 (individual registration, no team) |
| Active | on |
| Featured | your call |
| Description | Theme: "Upgrade Your Skills, Elevate Your Future". Optional: add the online/offline schedule and benefits list (E-Certificate, Diskusi langsung dengan trainer, Simulasi langsung ISO (Offline Only), Konsumsi Gratis (Offline Only), soft file materi) as rich text. |

## Step 2 — Media

Optional at creation (banner/organizer logo) — not provided in source, skip and add later if the client sends assets.

## Step 3 — Chronomics

**Two Phases**, each carrying the identical Section + 4 Fields from `Tabled_Registration_RAINING.md`. Two phases exist only because Roetix prices per Phase×Timeline cell — there's no other way to give "Online Class" and "Full Package" different prices per batch. Since the new interface's field Key auto-slugifies from the Label with no manual override (per `3.CompetitionOldVsNewVariables.md`), both phases' fields will independently generate keys like `nama_lengkap` — confirm in the live wizard whether that causes any cross-phase key collision in the admin export; if it does, distinguish the Labels slightly per phase (e.g. "Nama Lengkap (Online Class)") as a workaround.

### Phase 1: "Online Class"
### Phase 2: "Full Package"

Both phases — **Section "Data Peserta"**, 4 fields:

| Key (auto) | Type | Label | Description | Required | Options |
|---|---|---|---|---|---|
| — | Short answer | Nama Lengkap | Gunakan Kapital pada Awal Kata. Contoh: Dyna Setyowati | Yes | |
| — | Phone | No. Whatsapp Aktif | Jangan Gunakan Spasi. Contoh yang Benar: 081xxxxxx | Yes | |
| — | Short answer | Asal Instansi | Gunakan Kapital pada Awal Kata. Contoh: Institut Teknologi Sepuluh Nopember | Yes | |
| — | Multiple choice | Kategori | | Yes | Mahasiswa Aktif Kimia/Alumni Kimia ITS; Umum |

Neither phase needs a Start/End that gates the other — they're alternative registration paths (pick one package), not sequential qualification stages. Set both phases' own Start/End to span the full registration window (18 Aug – 20 Sep 2026) so the Timelines below are what actually restrict pricing/eligibility by date, not the phase dates themselves. Confirm in the live UI that leaving both phases unordered (not marked as each other's gate) actually lets a registrant pick either one — this parallel-phases pattern wasn't explicitly verified against the new wizard in prior sessions.

### Timelines (shared across both phases)

| Timeline Name | Start | End |
|---|---|---|
| Early Bird | 2026-08-18 00:00 | 2026-08-25 23:59 |
| Batch 1 | 2026-08-26 00:00 | 2026-09-07 23:59 |
| Batch 2 | 2026-09-08 00:00 | 2026-09-20 23:59 |

### Time-Price matrix (2 Phases × 3 Timelines = 6 cells)

| Phase × Timeline | Price (IDR) |
|---|---|
| Online Class × Early Bird | 158,000 |
| Online Class × Batch 1 | 168,000 |
| Online Class × Batch 2 | 178,000 |
| Full Package × Early Bird | 178,000 |
| Full Package × Batch 1 | 188,000 |
| Full Package × Batch 2 | 198,000 |

**Service fee — needs manual verification in the live UI.** The client's fee (Rp16,250/transaction: Rp13,000 off the client's payout + Rp3,250 added to the buyer's price) matches Entertainment's "Platform Fee" split model (`0.ClaudeFirstExploration.md`, flat/% + Organizer-deducted/Buyer-added bearer choice), but the Competition Time-Price cell's "Service fee" field was only documented as a single flat/% amount with no bearer split. Before finishing: check whether the cell supports a bearer split — if it does, set flat Rp3,250 as Buyer-added (on top of the prices above) and let the platform side handle the Rp13,000 client deduction; if it doesn't, you'll need to either enter Rp16,250 flat (letting it land wherever the single "Service fee" field applies) or bake the buyer's Rp3,250 share directly into the 6 listed prices above and track the client's Rp13,000 deduction separately in payout reporting.

## Step 4 — Completion

Not specified by the client — leave the default or add a short thank-you + contact person (Nindy 085178947290 / Asa 081333796975) as placeholder copy.

## Step 5 — Spreadsheet

Optional — not requested, skip unless the client wants a live registrant mirror.

## Step 6 — Review

Expect: 3 Timelines, 2 Phases, 8 Fields total (4 × 2 phases), 6 priced cells. Confirm "every field needs a key" passes (auto-generated) before clicking Create event.
