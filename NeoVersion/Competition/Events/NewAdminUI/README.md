# New Admin UI — Console Automation Notes (`admin.roetix.com/events/create`)

Dikumpulkan 2026-08-19 saat membangun `ICGS2026SINGLE` / `ICGS2026DOUBLE` lewat Claude browser automation. Menggantikan pola `../MatrixUI/JSON/*.js` untuk interface **baru** — interface lama (MatrixUI) pakai React Hook Form dengan atribut `name="timelines.X.fields.Y.key"` yang bisa langsung di-`querySelector('[name="..."]')`. **Interface baru TIDAK PAKAI atribut `name`/`id` sama sekali** — semua traversal harus struktural (posisi DOM, class, placeholder, urutan elemen).

Beda kedua interface, ringkas:

| | MatrixUI (lama) | New Admin UI (`/events/create`) |
|---|---|---|
| Selector | `[name="timelines.0.fields.2.key"]` | tidak ada — traversal struktural (lihat di bawah) |
| Rich text (Label/Description) | plain `<input>`/`<textarea>` | **TipTap/ProseMirror** `contenteditable` — butuh `execCommand('insertText', …)`, bukan `.value=` |
| Checkbox (Required, Active, dst) | native checkbox | shadcn Switch (`input[type=checkbox].sr-only.peer`) — WAJIB `.click()`, set `.checked=` langsung TIDAK memicu React state |
| Field baru | langsung terlihat penuh | **collapsed by default** — harus di-klik dulu (div-nya sendiri, class `cursor-pointer`) sebelum input di dalamnya ada di DOM |
| Simpan | per-timeline "Save Timeline" | 1 wizard 6-step, **tidak ada apa pun yang tersimpan sampai klik "Create event" di Step 6** — aman untuk isi ulang / batalkan kapan saja sebelum itu |

⚠️ **"Tidak tersimpan" itu cuma soal server** — wizard tetap **auto-save draft ke `localStorage['roetix:competition-draft']`**. Navigasi ulang ke `/events/create` (bahkan lewat `/events` dulu, bahkan klik tombol **Discard**) **TIDAK** mengosongkan form — draft lama ke-restore lagi. Kalau butuh wizard benar-benar kosong (mis. sebelum testing/re-run script dari nol), wajib `localStorage.removeItem('roetix:competition-draft')` dulu baru reload — baru form kosong beneran. Ini penyebab nyata field-key ke-suffix `_2` (auto-slug collision) waktu testing script pertama kali: draft lama belum ke-clear, jadi field baru numpuk di atas field lama yang sama persis.

---

## Struktur wizard (7 tab, klik by exact textContent: `1Identity`, `2States`, `3Media`, `4Chrononomics`, `5Completion`, `6Spreadsheet`, `7Review`)

⚠️ **Update 2026-08-21**: tab bertambah 1 (`2States`, isinya belum dieksplorasi) dibanding dokumentasi awal (19 Agustus, 6 tab: `1Identity, 2Media, 3Chrononomics, 4Completion, 5Spreadsheet, 6Review`). Semua nomor tab dari Media dst geser +1. Ketahuan dari bug live run `SRD2026` scripts yang masih pakai nomor lama — `clickByText` gagal diam-diam (cuma `console.warn`, tidak stop script), jadi langkah berikutnya jalan di step yang salah. **Selalu cek ulang textContent tab persis di live UI sebelum percaya nomor di dokumen ini** — UI ini jelas berubah tanpa notifikasi ke dokumentasi.

⚠️ Juga ketahuan: klik tab `1Identity` yang **sudah aktif** (kondisi default saat wizard baru dibuka) bisa memicu re-render/remount step itu yang lebih lambat dari waktu tunggu script (400ms) — field sempat hilang dari DOM. Fix: cek dulu apakah field Identity (`input[type=text]`) sudah ada di DOM sebelum klik tab-nya; kalau sudah ada, skip klik.

### Step 1 — Identity
Urutan input (tanpa `name`, urut DOM):
1. `input[type=file]` (banner — hidden, index 0, abaikan)
2. Event Name — `input[type=text]`, placeholder contoh `"GMBCC 2026"`
3. Event ID — `input[type=text]`, placeholder contoh `"GMBCC2026"` (auto-slug dari Event Name kalau belum diketik manual — overwrite saja)
4. Description — `[contenteditable=true]` #1
5. "Use one message…" checkbox
6. Email Notes — `[contenteditable=true]` #2
7. Organizer Name — `input[type=text]`
8. Min team — `input[type=number]`
9. Max team — `input[type=number]`
10. Active — checkbox
11. Featured — checkbox

### Step 3 — Chrononomics (3 sub-tab: `Phase`, `Timeline`, `Time-Price` — klik by textContent)

**Sub-tab Phase**: `Add Phase` (unik, hanya muncul kalau belum ada Phase) → Name input (placeholder `"New Phase"`) + 2× `datetime-local` (Start/End).

**Section**: 1 tombol `Add section` per Phase (bukan per section — nempel di bawah list section, index-nya konstan). Tiap klik nambah 1 section baru di bawah: input `placeholder="Section title"` + 1 `[contenteditable=true]` (description) — **selama belum ada field ditambahkan, urutan `document.querySelectorAll('[contenteditable=true]')` = urutan section apa adanya**, jadi tambahkan SEMUA section dulu sebelum mulai isi field, biar gampang di-index.

**Field**: tombol `Add field` — **1 per section**, `button.parentElement` = container field-list section itu (class `space-y-3 p-4`). Urutan tombol `Add field` di DOM = urutan section. Field baru masuk sebagai child terakhir container itu dengan class `div.group.rounded-lg.border.bg-card` (collapsed: 2 children; klik div-nya sendiri untuk expand → jadi 4 children + dapat class tambahan `border-l-4 border-l-primary`). Field yang **sudah** expand tidak auto-collapse lagi walau field baru ditambahkan setelahnya — aman ditumpuk.

Di dalam field yang sudah di-expand:
- `[contenteditable=true]` index 0 = **Label**, index 1 = **Description**
- `select` index 0 = **Answer Type** (`value`: `text`, `email`, `phone`, `number`, `date`, `file`, `link`, `multiple_choice`)
- `input` dengan `.type === 'text'` (cek property, BUKAN attribute selector `[type="text"]` — sempat tidak match) = **Placeholder**
- `input[type=checkbox]` index 0 = **Required**
- Key auto-slug ditampilkan sebagai elemen teks `"key: xxx_yyy"` — cukup buat verifikasi, tidak bisa di-set manual
- Tombol kontrol field (urut): Move up, Move down, …(toolbar rich text label)…, …(toolbar rich text description)…, Collapse, Duplicate, **Delete** (cari via `button.title === 'Delete'`)
- Kalau `type = multiple_choice`: muncul input `placeholder="Add choice…"` + tombol tambah opsi di sebelahnya (pola sama seperti MatrixUI lama) — isi lalu klik tombol tambah, ulang per opsi.

**Sub-tab Timeline**: `Add Timeline` → Name input (placeholder `"New Timeline"`) + 2× `datetime-local`. Tidak collapse, langsung terlihat, tidak perlu expand.

**Sub-tab Time-Price**: matrix Phase × Timeline. Untuk 1×1 (kasus ICGS): `input[type=number]` index 0 = Price, `select` index 0 + `input[type=number]` index 1 = Service fee (type `flat`/`percentage` + angka), `select` index 1 + `input[type=number]` index 2 = Tax. Untuk matrix lebih besar, indeks-indeks ini berkelipatan per sel (belum diverifikasi — perlu tes ulang kalau ada Phase/Timeline >1, ini di luar skenario ICGS/RAINING sejauh ini).

### Step 4 — Completion
1 `[contenteditable=true]` = Completion message.

### Step 6 — Review
Cek `document.body.innerText` mengandung `"Everything looks good"` (siap submit) vs `"Not ready to finish — missing: …"` (masih ada masalah, biasanya duplicate field keys). Tombol final: `button` dengan textContent `"Create event"`.

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

## File terkait

```
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/README.md                    — dokumen ini
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/JSON/Create_ICGS_SingleTeam.js
ScriptTemplate/NeoVersion/Competition/Events/NewAdminUI/JSON/Create_ICGS_DoubleTeam.js
TestHelper/Context/6.ICGS_Implementation.md        — spec sumber data field/harga/tanggal ICGS
TestHelper/Context/4.CompetitionEventBuildGuide.md — build guide umum (manual, browser-click, bukan console script)
ScriptTemplate/NeoVersion/Competition/Events/MatrixUI/JSON/                          — pola lama, interface BEDA, jangan dipakai untuk admin.roetix.com
```
