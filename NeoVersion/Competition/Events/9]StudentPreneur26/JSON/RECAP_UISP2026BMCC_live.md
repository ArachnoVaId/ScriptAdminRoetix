# Recap variabel live — https://admin.roetix.com/events/UISP2026BMCC/edit

Dibaca manual field-per-field lewat Claude browser pada 2026-08-25 (bukan dari script `Create_UISP2026_BMCC.js` yang sudah usang — lihat bagian "Perbedaan vs script lama" di bawah). Dipakai sebagai basis konten (Identity/Sections/Fields/Completion) untuk 3 subevent Early Bird/Normal/Late Bird. **Struktur Phase/Timeline TIDAK dipakai apa adanya** — lihat catatan di bagian bawah, perlu keputusan user dulu.

## Step 1 — Identity

| Field | Nilai |
|---|---|
| Event Name | `The 16th UI Studentpreneurs - Early Bird BMCC Registration` (sudah di-rename manual sebelumnya, mengarah ke Early Bird) |
| Event ID (immutable) | `UISP2026BMCC` |
| Description | copy promosi penuh (lihat isi lengkap di bawah) — tidak berubah dari script lama |
| Email Notes | kosong, checkbox "Use one message for both registration & payment email" = **checked** |
| Organizer Name | `BEM FEB UI` |

Description (verbatim dari live, sama dengan script lama):
```
🚀 READY TO TURN YOUR IDEA INTO IMPACT?
Got a business idea but don't know where to start?
This is your chance to turn that idea into a real, strategic, and impactful business model. 💡
Welcome to Business Model Canvas Competition — The 16th UI Studentpreneurs!
Under the grand theme:
"Innovate Beyond Uncertainty: Empowering Young Entrepreneurs to Shape Ideas into Impact."

✨ WHAT'S WAITING FOR YOU?
🔹 Showcase your business idea through a 1-Page Business Model Canvas
🔹 Get valuable insights from professional assessors & industry experts
🔹 Challenge yourself to think strategically and solve real-world problems
🔹 Win prizes worth IDR 20,000,000+! 🏆

📌 WHO CAN JOIN?
Active undergraduate students from S1, D3, D4, or equivalent programs across Indonesia.
👥 Team: 1–3 students

🗓️ REGISTRATION PERIOD
19 September – 30 October 2026

📋 HOW TO JOIN?
1️⃣ Register through the registration form
2️⃣ Complete all required registration documents
3️⃣ Submit your 1-Page Business Model Canvas through the submission link provided by the committee

📎 Registration Requirements: https://bit.ly/KeperluanRegistrasiBMCC16thUISP
📖 Competition Guidebook: https://bit.ly/Guidebook16thUISP

⚡ Your idea doesn't have to be perfect. It just needs to start.
Don't let uncertainty stop you from building what could be your next big thing.
See you at The 16th UI Studentpreneurs! 💙🚀

📩 For further information:
Nadia — Line: @ysnrnadia | WA: +6281282485499
Joshe — Line: @Yukiren08 | WA: +6282114410806
```

## Step 2 — States

| Toggle | Live value |
|---|---|
| Active (visible to registrants) | **ON** |
| Featured | OFF |
| Team size (invite & min/max) | **ON**, Min `1`, Max `1` |
| Referral codes | **ON** |
| Detailed pricing | **ON** |

Catatan: berbeda dari asumsi default di `NewAdminUI/README.md` (README bilang default Team size OFF) — live event ini eksplisit ON dengan min=max=1. Referral codes & Detailed pricing juga ON (bukan default OFF).

## Step 3 — Media
Banner & Organizer logo kosong (belum diupload).

## Step 4 — Chrononomics (kondisi LIVE saat ini, lihat catatan di bawah kenapa ini tidak langsung dipakai)

**Phase** (cuma 1): `Registration Early Bird`, Start `08/23/2026 00:00`, End `10/30/2026 23:59`

**Timeline** (3): `Sections & fields` menempel di Phase ini, dipakai bersama oleh ketiganya:
| Timeline | Start | End | Price | Fee | Tax |
|---|---|---|---|---|---|
| Early Bird | 08/19/2026 00:00 | 09/29/2026 23:59 | Rp185.000 | flat Rp11.000 | 0 |
| Normal Price | 09/30/2026 00:00 | 10/17/2026 23:59 | Rp195.000 | flat Rp11.000 | 0 |
| Late Bird | 10/18/2026 00:00 | 10/30/2026 23:59 | Rp195.000 | flat Rp11.000 | 0 |

⚠️ Start Phase (08/23) & start Timeline Early Bird (08/19) sama-sama bulan **Agustus**, bukan September seperti tabel raw ("19 September–29 September"). Kemungkinan besar salah ketik bulan (08 vs 09) saat entry manual — belum dikoreksi.

## Sections & Fields (di bawah Phase tunggal di atas — 25 field, 5 section)

### Section 1: General Information
1. **Team Name** — text, required, placeholder "E.g. Blue Entrepreneur"
2. **Team Composition** — multiple_choice, required, key `team_composition`. ⚠️ **Opsi cuma 2: "Individual", "2 Members" — "3 Members" HILANG** (raw data & deskripsi bilang tim 1-3 orang).
3. **How did you know about The 16th UI Studentpreneurs?** — multiple_choice, required. ⚠️ **Opsi cuma 5: Instagram, Broadcast (Line/WA), Tiktok, LinkedIn, UI Studentpreneurs Ambassador — "Other" HILANG.**
4. **Are you interested to join another events of the 16th UI Studentpreneurs?** — multiple_choice, required. ⚠️ **Opsi cuma 1: "Yes, I look forward to attend every events..." — opsi "No, I'm only interested of this competition." HILANG** (jadi field ini secara efektif rusak, cuma 1 pilihan).
5. **General Code UISP (Optional)** — text, not required
6. **Referral Code UISP Ambassador (Optional)** — text, not required

### Section 2: Team Leader Data
Sama persis dengan script lama (6 field: Full Name, Institution, Major, Academic Batch (Team Leader) [2023/2024/2025/2026], Phone Number, Email Address — semua required).

### Section 3: Member 1 Data
Section description: "Skip the section if you are registering as an individual". 6 field sama pola (Full Name dengan note "Mark "-" if you are registering as an individual", Institution, Major, Academic Batch (Member 1), Phone Number, Email Address) — semua **tidak required** (beda dari Team Leader).

### Section 4: Member 2 Data
Sama seperti Member 1 tapi label "(Member 2)", semua tidak required.

### Section 5: Registration requirements
Section description (HTML, verbatim):
```
Each team member is required to attach all registration requirements to this form. Please combine all files into a single PDF file with a maximum size of 10 MB.
All files required for registration can be accessed via the following link: https://bit.ly/KeperluanRegistrasiBMCC16thUISP

• (Proof) Follow Instagram @studentpreneurs
• (Proof) Follow Instagram @uispgoods
• (Proof) Follow Instagram Our Assessor Partner (....)     <- ⚠️ masih placeholder, belum diisi
• (Proof) Kartu Tanda Mahasiswa
• (Proof) Post a Twibbon on IG Feeds
  Access the twibbon on https://bit.ly/TwibbonPesertaThe16thUISP
• (Proof) Share Poster the 15th UI Studentpreneurs via Instagram Story    <- ⚠️ typo "15th", harusnya "16th"
  Access the poster on https://bit.ly/PosterBMCCThe16thUISP
• (Proof) Follow Instagram Our Assessor Partner *@bvi.id    <- baris duplikat/nyasar, ini yang sudah resolved
```
Field aktual di section ini **cuma 1**:
- **Attach the combined files here** — file upload, required, `.pdf` only.

(Struktur BERUBAH TOTAL dari script lama yang punya 6 field upload terpisah — sekarang cuma 1 field upload gabungan, sesuai instruksi "combine all files into a single PDF" di deskripsi. Field "assessor partner" resolved jadi `@bvi.id` tapi taruhnya nyasar sebagai baris terakhir bullet list, bukan menggantikan placeholder `(....)` di baris ke-3.)

## Step 5 — Completion
Header UI-nya sendiri bilang: *"Shown to a registrant who has already submitted a phase — like a Google Form's post-submit page. Set one message per phase, or per timeline if the wording needs to differ (e.g. Early Bird vs Regular)."* — ini konfirmasi platform memang didesain untuk pesan beda per Phase/Timeline.

Pesan untuk Phase "Registration Early Bird" (checkbox "Use this message for every timeline" = ON):
```
Thank You!
Thank you for registering for the BMC Competition!
To be officially registered for the competition, please complete the QRIS payment on the next page.
Access your Competition Guidebook here: https://bit.ly/Guidebook16thUISP
Make sure to follow the format provided and submit your work maximum on the deadline date.
Please join the Preliminary Round group to stay informed: https://chat.whatsapp.com/DoIRvGscTf56Tgxy19pr2N?s=cl&p=a&mlu=0
We're excited to see your amazing work. Good luck!
```
(Beda dari script lama: nambah kalimat QRIS payment, titik bukan koma sebelum "Good luck!".)

## Step 6 — Spreadsheet
Spreadsheet ID kosong (pakai default deployment).

## Step 7 — Review (summary counter live)
Timelines: 3 · Phases: 1 · Fields: 25 · Priced cells: 6 · Status: "Everything looks good."

---

## ⚠️ KENAPA STRUKTUR PHASE/TIMELINE LIVE INI TIDAK LANGSUNG DIPAKAI

Live event ini masih pola LAMA: 1 Phase "Registration Early Bird" berisi SEMUA 3 Timeline (Early Bird/Normal/Late Bird) dengan harga 185rb/195rb/195rb — persis desain script lama, cuma Event Name-nya yang sudah di-rename ke "Early Bird". Belum ada pemisahan "Registrasi Preliminary (gratis)" vs "Registrasi Ulang Semifinal (berbayar, 5-26 Nov)" seperti tabel baru yang user berikan.

Padahal UI Step 4 Phase eksplisit bilang **"Competition stages... sets the qualification gate"**, dan UI Step 5 Completion eksplisit contohkan **"one message per phase... e.g. Early Bird vs Regular"** — dua bukti kuat platform ini MEMANG didesain untuk 2-Phase per event (Phase 1 = gate kualifikasi, Phase 2 = lanjutan yang cuma bisa diakses kalau sudah lolos Phase 1), bukan cuma 1 Phase multi-Timeline seperti sekarang.

Ini perlu dikonfirmasi ke user sebelum 3 script dibuat — lihat pertanyaan yang diajukan di chat.

## Perbedaan vs `Create_UISP2026_BMCC.js` (script lama, sudah usang)
1. Team Composition kehilangan opsi "3 Members" (live cuma 2 opsi)
2. "How did you know" kehilangan opsi "Other" (live cuma 5 opsi)
3. "Are you interested..." kehilangan opsi ke-2 "No, I'm only interested..." (live cuma 1 opsi — efektif rusak)
4. 6 field upload terpisah di section 6 -> jadi 1 field "Attach the combined files here" + checklist di description
5. Assessor partner resolved ke `@bvi.id` tapi taruhnya di baris nyasar, placeholder lama `(....)` masih ada
6. Typo "15th" belum diperbaiki jadi "16th"
7. Completion message nambah baris QRIS payment
8. States: Team size ON (min=max=1), Referral codes ON, Detailed pricing ON — bukan default OFF seperti asumsi README
9. Event Name sudah di-rename "...- Early Bird BMCC Registration"
10. Phase/Timeline start date Early Bird ketuker ke Agustus (08/19, 08/23) bukan September
