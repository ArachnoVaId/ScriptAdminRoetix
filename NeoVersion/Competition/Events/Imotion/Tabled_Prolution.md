# RAW — The 20th IMOTION Pre-Event: PROLUTION (Registration)

> **Notes:**
> - Form ini individual (bukan tim), jadi tidak ada Leader/Member prefix — key langsung PascalCase.
> - Section "SUBMISSION CONFIRMATION" punya 2 bagian: (1) pesan terima kasih murni — **tidak** dipetakan ke tabel field, karena itu post-submit message dan belum ada engine/field dashboard yang diketahui untuk itu (lihat catatan di `RAW_Prolution.txt`); (2) 2 link WhatsApp group — ini **sudah** dipetakan jadi field konfirmasi kehadiran (lihat Section 3).
> - **REVISI (2026-08-10):** `AttendanceOffline`/`AttendanceOnline` dipindah dari Section 2 ke Section 3, Label/Notes-nya diupdate mengikuti state live dashboard (Label sekarang membawa link WhatsApp, Notes sekarang berisi tanggal/jam/venue, bukan link lagi). `competitioninfo1`/`competitioninfo2` (promo kompetisi Marketing Plan/Mini Marketing Case) ditambahkan sebagai Section 2 — field-field ini ditambahkan manual langsung di dashboard (bukan hasil generate dari RAW awal), lalu disinkronkan ke sini.
> - Dashboard juga punya field "Admin Column Key" (`competitioninfo1`/`competitioninfo2` diisi = key mereka sendiri) dan checkbox "Allow other (free text)" — **belum ada selector/engine yang dikonfirmasi untuk keduanya**, jadi tidak otomatis di `Create_Registration.js`. Isi manual setelah script jalan.
> - Semua field `required: true` — untuk `competitioninfo1/2` dan `AttendanceOffline/Online` ini masih **asumsi** (teks dashboard yang di-paste user tidak menunjukkan checked-state checkbox), verifikasi manual.
> - **REVISI (2026-08-10, lanjutan):** `Batch` dan `NPM` ditambahkan ke Section 1, posisi sebelum `ProofIGFollow`. `NPM` sengaja `required: false` (optional, hanya untuk KUM). Tidak ada `type: number` di engine ini (lihat `2.TabledtoJsCompetition.md` — valid types cuma text/phone/email/link/file/multiple_choice/text_area), jadi `NPM` pakai `type: text` walau instruksinya "number only".

## Section 1: Participant Information

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | Email | Email Address | email | true | Please enter your active email address. | |
| 2 | FullName | Full Name | text | true | Please enter your full name. Example: Andi Pratama | |
| 3 | CurrentStatus | Current Status | multiple_choice | true | | Undergraduate Student, High School Student, Fresh Graduate, Employee, General Public, Other |
| 4 | Institution | Institution | text | true | Please enter the name of your university, school, company, or institution. Example: Universitas Indonesia | |
| 5 | WhatsAppNumber | WhatsApp Number | phone | true | Please enter your active WhatsApp number to receive further information regarding PROLUTION. Example: 081234567890 | |
| 6 | Batch | Batch | multiple_choice | true | For UI students only | 2026, 2025, 2024 and earlier, Non UI students |
| 7 | NPM | NPM | text | **false** | Write your NPM to receive KUM. Example: 2606586433 | |
| 8 | ProofIGFollow | Proof of Following @imotionfebui on Instagram | file | true | Please upload a screenshot showing that you have followed @imotionfebui on Instagram. | |
| 9 | ProofTikTokFollow | Proof of Following @imotionfebui on TikTok | file | true | Please upload a screenshot showing that you have followed @imotionfebui on TikTok. | |
| 10 | ProofXFollow | Proof of Following @imotion_febui on X | file | true | Please upload a screenshot showing that you have followed @imotion_febui on X. | |
| 11 | ProofPosterIGStory | Proof of Uploading the PROLUTION Poster on Instagram Story | file | true | Please upload the PROLUTION poster to your Instagram Story and tag @imotionfebui. Then, upload a screenshot as proof. Poster Access: [Insert Poster Link] | |
| 12 | InterestMarketingCompetition | Are You Interested in Joining The 20th IMOTION Marketing Competition? | multiple_choice | true | This competition is open to undergraduate students. | Yes, I am interested, Maybe, I would like to learn more, No, thank you |

## Section 2: Marketing Plan / Mini Marketing Case Competition Promo

| # | Key | Label | Type | Required | Notes | Options | Admin Column Key |
|---|-----|-------|------|----------|-------|---------|-------------------|
| 1 | competitioninfo1 | 📢 Calling All Marketing Enthusiasts! Registration for The 20th IMOTION Marketing Plan and Mini Marketing Case Competition is now open! Turn your brightest ideas into impactful marketing solutions and compete with university students from across Indonesia. | multiple_choice | true | Competition Booklet: https://linktr.ee/imotioncompetition | Yes, I'm interested, No, i'm not intersted | competitioninfo1 |
| 2 | competitioninfo2 | Register Your Team: https://linktr.ee/imotioncompetition | multiple_choice | true | | Yes, i'm goitng to register, no, maybe next time | competitioninfo2 |

## Section 3: Attendance Confirmation (WhatsApp Group)

| # | Key | Label | Type | Required | Notes | Options |
|---|-----|-------|------|----------|-------|---------|
| 1 | AttendanceOffline | For offline participants, please join our WhatsApp group to stay updated and connected: https://chat.whatsapp.com/Hh5oy5k2j6TC4yG6qbkupS?s=cl&p=i&mlu=4 | multiple_choice | true | 🗓️ Date: Tuesday, August 18, 2026 ⏱️ Time: 13:00-17:00 WIB 🏢 Venue: Soeria Atmadja Auditorium, FEB Universitas Indonesia (Offline) | Yes, I'm gonna attend offline, No, I'm gonna attend online |
| 2 | AttendanceOnline | For online participants, please join the WhatsApp group through this link: https://chat.whatsapp.com/Eg9W60pSf25AXi6hbaKy6q?s=cl&p=i&mlu=4 | multiple_choice | true | 🗓️ Date: Tuesday, August 18, 2026 ⏱️ Time: 13:00-17:00 WIB 🏢 Venue: Soeria Atmadja Auditorium, 💻 Online: via YouTube Streaming | Yes, I'm gonna attend online, No, I'm gonna attend offline |
