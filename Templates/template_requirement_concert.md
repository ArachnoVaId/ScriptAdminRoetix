# Event Requirement Template — Concert

> Fill every section below. Items marked `(REQUIRED)` must be provided. Items marked `(OPTIONAL)` can be left blank.
> Remove any section that does not apply.

---

## 1. Event Identity

| Field | Value |
|---|---|
| **Event Name** | `(REQUIRED)` |
| **Organizer** | `(REQUIRED)` |
| **Event Type** | Seated / Standing / General `(REQUIRED)` |
| **Location / Venue** | `(REQUIRED)` |
| **Event Date & Time** | `YYYY-MM-DDTHH:mm` `(REQUIRED)` |
| **Description** | `(REQUIRED)` |
| **Slug Suffix** | auto-generated from event name (lowercase, hyphens) |

## 2. Fee Configuration

| Field | Value |
|---|---|
| **Flat Amount (Rp)** | `0` = no flat, or amount `(REQUIRED)` |
| **Percentage (%)** | e.g. `4.4` `(REQUIRED)` |
| **Fee Bearer** | Organizer / Buyer `(REQUIRED)` |

## 3. Ticket Sales Start

| Field | Value |
|---|---|
| **Ticket Sales Start** | `YYYY-MM-DDTHH:mm` `(REQUIRED)` |

## 4. Sale Timelines (Phases)

| # | Phase Name | Start (`YYYY-MM-DDTHH:mm`) | End (`YYYY-MM-DDTHH:mm`) |
|---|---|---|---|
| 1 | e.g. Early Bird | | |
| 2 | e.g. Regular | | |
| 3 | ... | | |

> Add rows as needed. Each row becomes one timeline entry.

## 5. Ticket Categories

| # | Category Name | Color (hex) | Quota |
|---|---|---|---|
| 1 | e.g. VIP | #8e7cc3 | 100 |
| 2 | e.g. Festival | #93c47d | 500 |
| 3 | ... | | |

## 6. Pricing Matrix

> One row per category, one column per timeline phase. Each cell has `price` and `quota`.

| Category | Phase 1 (price / quota) | Phase 2 (price / quota) | Phase 3 ... |
|---|---|---|---|
| VIP | 200000 / 30 | 250000 / 70 | ... |
| Festival | 100000 / 100 | 150000 / 400 | ... |
| ... | | | |

## 7. Registration Form Fields

| # | Field Key (name) | Label | Type |
|---|---|---|---|
| 1 | nama | Nama Lengkap | Text |
| 2 | hp | Nomer Whatsapp | Number |
| 3 | email | Email | Email |
| 4 | ... | | |

> Valid types: `Text`, `Number`, `Email`, `Phone`, `Link`, `File`, `Textarea`, `Multiple Choice`

## 8. Notes / Special Instructions

`(OPTIONAL)` — Any additional information the AI agent should know (e.g. hidden categories, placeholder pricing, custom behaviors).
