# Anime in Symphony - Automation Scripts

Console scripts untuk membuat dan mengkonfigurasi event **Anime in Symphony** di `dev-admin.roetix.com`.

---

## Prasyarat

- Login ke `https://dev-admin.roetix.com` di browser sebelum menjalankan script.
- Untuk `create-event.js`, install Playwright: `npm install playwright` (sudah ada di `Testing/` folder).

---

## Urutan Penggunaan

```
1. Login ke dev-admin.roetix.com
2. Buka Create Event page (/roetix-events/create)
   → Paste Step1_EventDetails.js → Ikuti file picker untuk gambar
3. Setelah event terpublish, buka Edit Event page (/roetix-events/[id]/edit)
   → Paste Step2_TiersAndTerms.js
4. Masih di Edit Event page
   → Paste Step3_Pricing.js
5. Selesai
```

---

## Script 1: `Step1_EventDetails.js` — Create Event + Publish

**Halaman:** `/roetix-events/create` (Create Event)

**Cara pakai:** Paste di browser DevTools Console (F12).

**Apa yang dilakukan:**
1. Isi semua field Event Details (nama, slug random, type, location, dates, fees, organizer, venue, description)
2. Upload 5 gambar (Logo, Organizer Logo, Banner, Poster, Thumbnail) — file picker muncul satu per satu
3. Isi 2 Timelines (Tes 1 & Tes 2)
4. Klik "Create & Publish Event"

**File gambar yang dibutuhkan** (di folder `Design/`):
- `Logo Anime in Symphony Crayon (1).png`
- `Logo ROJ_No  BG.png`
- `Banner Utama_3.1 (1).png`
- `Poster Utama_4.5 (1).png`
- `Poster Utama_1.1.png`

---

## Script 2: `Step2_TiersAndTerms.js` — Ticket Tiers + Terms & Policy

**Halaman:** `/roetix-events/[id]/edit` (Edit Event)

**Kapan:** Setelah Step 1 selesai dan event sudah terpublish.

**Cara pakai:** Paste di browser DevTools Console (F12).

**Apa yang dilakukan:**
1. Tambahkan 8 Ticket Tiers:
   - Kioku Timur (832/512, #93C47D)
   - Kioku Barat (690/370, #93C47D)
   - Kizuna Timur (242/167, #6D9EEB)
   - Kizuna Barat (242/167, #6D9EEB)
   - Tomodachi Utara (1075/880, #FFD966)
   - Tomodachi Selatan (1110/915, #FFD966)
   - Nakama Utara (362/272, #CC0000)
   - Nakama Selatan (362/272, #CC0000)
2. Klik "Save Categories"
3. Isi Terms & Conditions (HTML)
4. Isi Privacy Policy (HTML)
5. Klik "Save Changes"

---

## Script 3: `Step3_Pricing.js` — Set Harga per Category

**Halaman:** `/roetix-events/[id]/edit` (Edit Event, scroll ke "Sale Timelines & Pricing")

**Kapan:** Setelah Step 2 (tiers sudah ditambahkan dan disave).

**Cara pakai:** Paste di browser DevTools Console (F12).

**Apa yang dilakukan:**
1. Set harga untuk timeline "Tes 1":
   - Kioku Timur/Barat: Rp100,000
   - Kizuna Timur/Barat: Rp110,000
   - Tomodachi Utara/Selatan: Rp125,000
   - Nakama Utara/Selatan: Rp135,000
2. Klik "Save Timelines"

---

## Script 4: `create-event.js` — Playwright Automation (Alternative Step 1)

**Cara pakai:** Jalankan dari terminal: `node create-event.js`

**Kapan:** Alternative untuk Step 1 — full otomatis tanpa perlu buka browser manual.

**Apa yang dilakukan:** Sama seperti Step1_EventDetails.js tapi dijalankan sebagai Playwright script. Browser terbuka otomatis, login, navigasi, isi form, upload gambar via API, publish.

**Note:** Gambar diupload via API langsung (`POST /api/admin/upload` + React state injection) karena mekanisme filepicker bawaan form memiliki bug delay di React state-nya.

---

## Struktur Folder

```
AnimeSymphonyROJ/
├── Design/                          ← Asset gambar (5 PNG)
├── Script/
│   ├── Step1_EventDetails.js        ← Console script: Create + Publish event
│   ├── Step2_TiersAndTerms.js       ← Console script: Tiers + Terms + Policy
│   ├── Step3_Pricing.js             ← Console script: Set harga per category
│   ├── create-event.js              ← Playwright script: Full automation (alternative Step 1)
│   └── README.md                    ← File ini
```
