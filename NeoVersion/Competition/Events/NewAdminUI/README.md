# New Admin UI — Console Automation Notes (`admin.roetix.com/events/create`)

Dikumpulkan 2026-08-19 saat membangun `ICGS2026SINGLE` / `ICGS2026DOUBLE` lewat Claude browser automation. Menggantikan pola `../MatrixUI/JSON/*.js` untuk interface **baru** — interface lama (MatrixUI) pakai React Hook Form dengan atribut `name="timelines.X.fields.Y.key"` yang bisa langsung di-`querySelector('[name="..."]')`. **Interface baru TIDAK PAKAI atribut `name`/`id` sama sekali** — semua traversal harus struktural (posisi DOM, class, placeholder, urutan elemen).

Beda kedua interface, ringkas:

| | MatrixUI (lama) | New Admin UI (`/events/create`) |
|---|---|---|
| Selector | `[name="timelines.0.fields.2.key"]` | tidak ada — traversal struktural (lihat di bawah) |
| Rich text (Label/Description) | plain `<input>`/`<textarea>` | **TipTap/ProseMirror** `contenteditable` — butuh `execCommand('insertText', …)`, bukan `.value=` |
| Checkbox (Required, Active, dst) | native checkbox | shadcn Switch (`input[type=checkbox].sr-only.peer`) — WAJIB `.click()`, set `.checked=` langsung TIDAK memicu React state |
| Field baru | langsung terlihat penuh | **collapsed by default** — harus di-klik dulu (div-nya sendiri, class `cursor-pointer`) sebelum input di dalamnya ada di DOM |
| Simpan | per-timeline "Save Timeline" | 1 wizard **7-step** (per 2026-08-22, awalnya 6), **tidak ada apa pun yang tersimpan sampai klik "Create event" di Step 7 Review** — aman untuk isi ulang / batalkan kapan saja sebelum itu |

⚠️ **"Tidak tersimpan" itu cuma soal server** — wizard tetap **auto-save draft ke `localStorage['roetix:competition-draft']`**. Navigasi ulang ke `/events/create` (bahkan lewat `/events` dulu, bahkan klik tombol **Discard**) **TIDAK** mengosongkan form — draft lama ke-restore lagi. Kalau butuh wizard benar-benar kosong (mis. sebelum testing/re-run script dari nol), wajib `localStorage.removeItem('roetix:competition-draft')` dulu baru reload — baru form kosong beneran. Ini penyebab nyata field-key ke-suffix `_2` (auto-slug collision) waktu testing script pertama kali: draft lama belum ke-clear, jadi field baru numpuk di atas field lama yang sama persis.

---

## Struktur wizard (7 tab, klik by exact textContent: `1Identity`, `2States`, `3Media`, `4Chrononomics`, `5Completion`, `6Spreadsheet`, `7Review`)

⚠️ **Update 2026-08-21**: tab bertambah 1 (`2States`, isinya belum dieksplorasi) dibanding dokumentasi awal (19 Agustus, 6 tab: `1Identity, 2Media, 3Chrononomics, 4Completion, 5Spreadsheet, 6Review`). Semua nomor tab dari Media dst geser +1. Ketahuan dari bug live run `SRD2026` scripts yang masih pakai nomor lama — `clickByText` gagal diam-diam (cuma `console.warn`, tidak stop script), jadi langkah berikutnya jalan di step yang salah. **Selalu cek ulang textContent tab persis di live UI sebelum percaya nomor di dokumen ini** — UI ini jelas berubah tanpa notifikasi ke dokumentasi.

⚠️ Juga ketahuan: klik tab `1Identity` yang **sudah aktif** (kondisi default saat wizard baru dibuka) bisa memicu re-render/remount step itu yang lebih lambat dari waktu tunggu script (400ms) — field sempat hilang dari DOM. Fix: cek dulu apakah field Identity (`input[type=text]`) sudah ada di DOM sebelum klik tab-nya; kalau sudah ada, skip klik.

⚠️ **Update 2026-08-22**: konfirmasi lebih lanjut — Min Team, Max Team, Active, dan Featured yang dulu ada di Step 1 (lihat versi lama list di bawah) **sudah pindah ke Step 2 "States" yang baru** (lihat section-nya sendiri). Step 1 sekarang cuma berakhir di Organizer Name. Ini penyebab nyata `TypeError: Cannot read properties of undefined (reading 'focus')` di `numberInputs[0]` kalau script masih pakai list field Step 1 versi lama.

### Step 1 — Identity
Urutan input (tanpa `name`, urut DOM):
1. `input[type=file]` (banner — hidden, index 0, abaikan)
2. Event Name — `input[type=text]`, placeholder contoh `"GMBCC 2026"`
3. Event ID — `input[type=text]`, placeholder contoh `"GMBCC2026"` (auto-slug dari Event Name kalau belum diketik manual — overwrite saja)
4. Description — `[contenteditable=true]` #1
5. "Use one message…" checkbox
6. Email Notes — `[contenteditable=true]` #2
7. Organizer Name — `input[type=text]` — **field TERAKHIR di Step 1** (per 2026-08-22)

### Step 2 — States (BARU, belum ada saat dokumentasi awal 19 Agustus)
Bukan input teks — semua berupa shadcn Switch toggle (`input[type=checkbox]`, WAJIB `.click()`, lihat teknik fill di bawah). Urutan DOM (`input[type=checkbox]` index):
1. **Active (visible to registrants)** — default **ON**
2. **Featured** — default OFF
3. **Team size (invite & min/max)** — default **OFF**. Kalau OFF: event otomatis jadi "Individual event — team size is disabled" (setara min=max=1, tanpa perlu isi apapun). Kalau di-ON-kan, kemungkinan besar baru muncul input `min`/`max` number tambahan di bawahnya (**belum diverifikasi bentuk DOM-nya** — semua script sejauh ini pakai kasus individual/OFF).
4. **Referral codes** — default OFF
5. **Detailed pricing** — default OFF. "On: registrants see the full fee breakdown (base + service fee + tax). Off: they see only the final price."

Untuk event individual (semua kasus ICGS/SRD2026/StudentPreneur26 sejauh ini), default Step 2 **sudah sesuai** — cukup singgah ke tab-nya (`clickByText('button', '2States')`) tanpa mengubah toggle apapun.

### Step 4 — Chrononomics (3 sub-tab: `Phase`, `Timeline`, `Time-Price` — klik by textContent)

**Sub-tab Phase**: `Add Phase` (unik, hanya muncul kalau belum ada Phase) → Name input (placeholder `"New Phase"`) + 2× `datetime-local` (Start/End). Kasus >1 Phase dalam 1 event belum pernah berhasil diverifikasi live (lihat SRD2026 — akhirnya dipecah jadi event terpisah per Phase, bukan 1 event multi-Phase).

**Section**: 1 tombol `Add section` per Phase (bukan per section — nempel di bawah list section, index-nya konstan). Tiap klik nambah 1 section baru di bawah: input `placeholder="Section title"` + 1 `[contenteditable=true]` (description) — **selama belum ada field ditambahkan, urutan `document.querySelectorAll('[contenteditable=true]')` = urutan section apa adanya**, jadi tambahkan SEMUA section dulu sebelum mulai isi field, biar gampang di-index. Section boleh punya title+description saja TANPA field sama sekali (dipakai buat section info-only/teks pembuka, lihat pola `fields: []` di `StudentPreneur26`).

**Field**: tombol `Add field` — **1 per section**, `button.parentElement` = container field-list section itu (class `space-y-3 p-4`). Urutan tombol `Add field` di DOM = urutan section. Field baru masuk sebagai child terakhir container itu dengan class `div.group.rounded-lg.border.bg-card` (collapsed: 2 children; klik div-nya sendiri untuk expand → jadi 4 children + dapat class tambahan `border-l-4 border-l-primary`). Field yang **sudah** expand tidak auto-collapse lagi walau field baru ditambahkan setelahnya — aman ditumpuk.

⚠️ **Kontaminasi draft**: kalau ada Phase/Section/Field sisa dari sesi testing sebelumnya (draft lama ke-restore, lihat catatan di atas), indeks `Add field`/`Add section` ke-geser dan gampang salah tempat isi field. **Sebelum jalankan script apapun, verifikasi wizard BENAR-BENAR kosong**: `document.querySelectorAll('button')` yang textContent-nya `'Add field'` ATAU `'Add section'` harus **0** tepat setelah reload. Kalau tidak 0, draft belum bersih.

Di dalam field yang sudah di-expand:
- `[contenteditable=true]` index 0 = **Label**, index 1 = **Description**
- `select` index 0 = **Answer Type** (`value`: `text`, `email`, `phone`, `number`, `date`, `file`, `link`, `multiple_choice`) — `text`, `email`, `phone`, `file` sudah diverifikasi live bekerja lewat mekanisme generik ini (StudentPreneur26).
- `input` dengan `.type === 'text'` (cek property, BUKAN attribute selector `[type="text"]` — sempat tidak match) = **Placeholder** (untuk field non-multiple_choice; untuk `multiple_choice` lihat catatan Options di bawah — SEMUA `input[type=text]` di field itu adalah option, bukan placeholder).
- `input[type=checkbox]` index **TERAKHIR** (`checkboxes[checkboxes.length - 1]`, BUKAN selalu index 0) = **Required**. Untuk field biasa cuma ada 1 checkbox (jadi index 0 = index terakhir, keduanya sama). Untuk `multiple_choice` ada checkbox TAMBAHAN "Allow an 'Other' free-text option" yang muncul SEBELUM Required, jadi Required jadi index 1 — **selalu query `checkboxes` SETELAH Answer Type & Options selesai diisi**, jangan sebelum (jumlahnya berubah tergantung tipe).
- Key auto-slug ditampilkan sebagai elemen teks `"key: xxx_yyy"` — cukup buat verifikasi, tidak bisa di-set manual
- Tombol kontrol field (urut): Move up, Move down, …(toolbar rich text label)…, …(toolbar rich text description)…, Collapse, Duplicate, **Delete** (cari via `button.title === 'Delete'`)
- ⚠️ **Update 2026-08-22 — mekanisme Options utk `multiple_choice` BERUBAH TOTAL** dari dokumentasi lama (yang sudah tidak berlaku): begitu Answer Type diganti ke `multiple_choice`, langsung muncul **1 input teks default** (`placeholder="Option 1"`, value kosong) + tombol **`Add option`** + toggle "Allow an 'Other' free-text option". TIDAK ADA lagi input `placeholder="Add choice…"` terpisah. Cara isi N opsi: klik `Add option` sebanyak **(N−1) kali dulu** (opsi baru numpuk di bawah dengan value kosong, urutan DOM = urutan klik), BARU isi semua `input[type=text]` di field itu sekaligus sesuai urutan (`Array.from(newField.querySelectorAll('input')).filter(i => i.type === 'text')` — di field `multiple_choice`, SEMUA `input[type=text]` adalah slot option, tidak ada input placeholder lain yang perlu dikecualikan). Pola lama "isi lalu klik tambah" per opsi **tidak berlaku lagi**, akan menghasilkan opsi kosong/generik "Option 1" kalau dipaksakan.
  ⚠️ **Berdampak ke script lama**: `Create_ICGS_SingleTeam.js`, `Create_ICGS_DoubleTeam.js`, dan `Create_SRD2026_*.js` (field "Syarat & Ketentuan"/persetujuan, tipe `multiple_choice`) MASIH pakai mekanisme lama `input[placeholder="Add choice…"]` yang SUDAH TIDAK BEKERJA di UI saat ini — field itu bakal ke-generate dengan opsi kosong "Option 1", bukan opsi aslinya (mis. "Menyetujui"). Kalau mau reuse/rerun script-script itu, mekanisme Options-nya WAJIB diupdate dulu ke pola `Add option` di atas (sudah diterapkan di `Create_UISP2026_BMCC.js` — pakai itu sebagai referensi).

**Sub-tab Timeline**: `Add Timeline` → Name input (placeholder `"New Timeline"`) + 2× `datetime-local`. Tidak collapse, langsung terlihat, tidak perlu expand. **Tombol `Add Timeline` BISA diklik berulang untuk nambah >1 Timeline** (pola sama seperti `Add section` — tiap klik nambah timeline baru di bawah, ambil `input[placeholder="New Timeline"]` terakhir + 2 `datetime-local` terakhir). Dites live dengan 3 Timeline sekaligus (StudentPreneur26: Early Bird/Normal/Late Bird) — proses tambah-Timeline-nya sendiri jalan lancar.

**Sub-tab Time-Price**: matrix Phase × Timeline. Untuk 1×1 (kasus ICGS/SRD2026): `input[type=number]` index 0 = Price, `select` index 0 + `input[type=number]` index 1 = Service fee (type `flat`/`percentage` + angka), `select` index 1 + `input[type=number]` index 2 = Tax — **ini sudah diverifikasi live berkali-kali, aman dipakai apa adanya**. Untuk matrix >1×1 (>1 Phase dan/atau >1 Timeline), asumsi kerjanya "index kelipatan per sel" (`numberInputs[i*3]`/`selects[i*2]` dst, `i` = index cell) **MASIH BELUM SEMPAT DIVERIFIKASI LIVE SAMPAI TUNTAS** (percobaan di StudentPreneur26 dengan 1 Phase × 3 Timeline keburu terganggu masalah draft kontaminasi & sesi browser terputus sebelum sempat sampai ke tahap ini) — kalau script generate matrix >1×1, WAJIB dicocokkan manual satu-satu di layar (nama Timeline/Phase per cell) sebelum klik Create event, jangan percaya index-nya begitu saja.

### Step 5 — Completion
1 `[contenteditable=true]` = Completion message.

### Step 7 — Review
Cek `document.body.innerText` mengandung `"Everything looks good"` (siap submit) vs `"Not ready to finish — missing: …"` (masih ada masalah, biasanya duplicate field keys — cek terutama label yang keulang persis, mis. "Academic Batch" dipakai di beberapa section, WAJIB disuffix biar key auto-slug unik). Tombol final: `button` dengan textContent `"Create event"`.

---

## Teknik fill (WAJIB, semua React controlled — set `.value=` langsung TIDAK memicu re-render)

```js
var _inputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
var _selectSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,'value').set;

function fillInput(el, val) {                 // text / number / datetime-local
  el.focus();
  _inputSetter.call(el, val);
  el.dispatchEvent(new Event('input', {bubbles:true}));
  el.dispatchEvent(new Event('change', {bubbles:true}));
}
function fillSelect(el, val) {                 // native <select>
  _selectSetter.call(el, val);
  el.dispatchEvent(new Event('change', {bubbles:true}));
}
function fillEditable(el, text) {              // TipTap/ProseMirror contenteditable
  el.focus();
  document.execCommand('insertText', false, text);   // bukan innerHTML= — ProseMirror butuh native input event
}
function clickCheckbox(el, wantChecked) {      // shadcn Switch
  if (!!el.checked !== !!wantChecked) el.click();     // .click() asli, bukan set .checked
}
```

Sudah diverifikasi live (test-add-lalu-delete field, key auto-slug ikut update) — bukan cuma teori.

## ⚠️ Bahaya `localStorage` — WAJIB dibaca sebelum bersihkan draft (2026-08-22)

Draft wizard disimpan di `localStorage['roetix:competition-draft']` (lihat catatan di atas). Untuk bersihkan draft lama sebelum testing/re-run:

```js
localStorage.removeItem('roetix:competition-draft');   // BENAR — cuma hapus draft
location.reload();
```

**JANGAN PERNAH pakai `localStorage.clear()`** — ini juga menghapus token/session login, langsung ke-redirect ke `/login` dan butuh sign-in ulang manual (ditemukan langsung waktu testing StudentPreneur26). Selalu `removeItem` dengan key spesifik, bukan `clear()`.

Setelah `removeItem` + reload, **verifikasi draft benar-benar kosong** sebelum jalankan script apapun — cek `document.querySelectorAll('button')` yang textContent `'Add field'`/`'Add section'` harus **0**. Kalau masih ada sisa dari sesi sebelumnya, indeks section/field di script bisa salah tempat tanpa error yang jelas (field baru numpuk di container yang salah).

## File terkait

```
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/NEW_EVENT_WORKFLOW.md         — mulai dari sini kalau mau minta build event baru (kickoff prompt + urutan kerja lengkap)
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/README.md                    — dokumen ini
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/JSON/Create_ICGS_SingleTeam.js
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/JSON/Create_ICGS_DoubleTeam.js
ScriptTemplate/NeoVersion/Competition/Events/SRD2026/JSON/Create_SRD2026_*.js          — 6 event terpisah (1 Phase tiap event), bukan 1 event multi-Phase
ScriptTemplate/NeoVersion/Competition/Events/StudentPreneur26/JSON/Create_UISP2026_BMCC.js — 1 event, 1 Phase, 3 Timeline; contoh field email/phone/file/multiple_choice generik
TestHelper/Context/6.ICGS_Implementation.md        — spec sumber data field/harga/tanggal ICGS
TestHelper/Context/4.CompetitionEventBuildGuide.md — build guide umum (manual, browser-click, bukan console script)
ScriptTemplate/NeoVersion/Competition/Events/MatrixUI/JSON/                          — pola lama, interface BEDA, jangan dipakai untuk admin.roetix.com
```
