# Event Requirement Template — Competition

> Fill every section below. Items marked `(REQUIRED)` must be provided. Items marked `(OPTIONAL)` can be left blank.
> Competition events are structured as **Categories × Phases × Form Fields**.

---

## 1. Event Identity

| Field | Value |
|---|---|
| **Event Name** | `(REQUIRED)` |
| **Organizer** | `(REQUIRED)` |
| **Dashboard Base URL** | e.g. `https://admin.roetix.com/events/{event-slug}` `(REQUIRED)` |
| **Event Slug** | URL-safe identifier `(REQUIRED)` |

## 2. Competition Categories

> A competition has one or more registration categories (e.g. Team National, Individual International).
> Each category gets its own timeline page and its own set of form scripts.

| # | Category Name | Slug | Type | Team Size |
|---|---|---|---|---|
| 1 | e.g. GMBCC Team National | 1teamnational | Team | 3 members |
| 2 | e.g. GMBCC Individual International | 2individualinternational | Individual | 1 |
| 3 | ... | | | |

## 3. Phases (per Category)

> Each category can have multiple registration phases (e.g. Early Bird, Normal, Extended).
> Copy and fill this section per category.

### Category: `[Category Name]`

| # | Phase Name | Start Date (`YYYY-MM-DD`) | End Date (`YYYY-MM-DD`) | Registration Gate | Requires Payment |
|---|---|---|---|---|---|
| 1 | Early Bird | | | OFF | ON |
| 2 | Normal | | | OFF | ON |
| 3 | ... | | | | |

## 4. Form Fields (per Category × Phase)

> This is the core data. For each category and phase, list all form fields.
> Copy the table below for each Category × Phase combination.

### Category: `[Category Name]` — Phase: `[Phase Name]`

> **Key Naming Convention**: `{FieldName}_{PhaseSuffix}` where PhaseSuffix is `EB` for Early Bird, `normal` for Normal, etc.

| # | Key | Label | Type | Required | Notes (optional) | Options (for multiple_choice) |
|---|---|---|---|---|---|---|
| 1 | FullName_EB | Full Name | text | true | | |
| 2 | University_EB | University | text | true | | |
| 3 | Email_EB | Email | email | true | | |
| 4 | Sex_EB | Sex | multiple_choice | true | | Male, Female |
| 5 | Batch_EB | Batch | text | true | Enrollment year. Example: 2023 | |
| 6 | CV_EB | CV | file | true | | |
| 7 | ... | | | | | |

> Valid types: `text`, `phone`, `email`, `link`, `file`, `multiple_choice`, `text_area`
>
> **Notes**: Description text shown below the field (e.g., format instructions, upload rules). Leave empty if not needed.
> **Options**: Comma-separated choice values for `multiple_choice` fields only. Leave empty for other types.

### Repeating Member Fields (for Team categories)

> If the category is a Team type, member fields repeat per member. Use the naming pattern:
> `{FieldName}Anggota{N}_{PhaseSuffix}` for member N (1-indexed).
>
> Example for 3-member team Early Bird:
> - `FullName_EB` (leader)
> - `FullNameAnggota1_EB` (member 1)
> - `FullNameAnggota2_EB` (member 2)
>
> Each member typically has the same set of fields as the leader.

### Common Proof / Verification Fields (usually at the end)

| Key Pattern | Label | Type | Notes |
|---|---|---|---|
| ProofKTM\_{suffix} | Proof of Active Student Card | file | `(OPTIONAL)` |
| ProofFollowing\_{suffix} | Proof Following @account | file | `(OPTIONAL)` |
| ProofTwibbonUpload\_{suffix} | Proof Twibbon Upload | link | `(OPTIONAL)` |
| ProofPosterRepost\_{suffix} | Proof Poster Repost | link | `(OPTIONAL)` |
| ProofTag\_{suffix} | Proof Tag 3 Friends | link | `(OPTIONAL)` |
| InfoGMBCCFrom\_{suffix} | How did you know about X? | multiple_choice | `(OPTIONAL)` |
| InfoAffiliatedOrganizations\_{suffix} | Affiliated Organizations? | text | `(OPTIONAL)` |

## 5. Payment Information `(OPTIONAL)`

| Field | Value |
|---|---|
| **Registration Fee per Phase** | e.g. Early Bird: Rp 75.000, Normal: Rp 100.000 |
| **Payment Method** | e.g. Bank Transfer, Midtrans |

## 6. Form Fill Test Data `(OPTIONAL)`

> If you want test/autofill scripts for QA, provide dummy data per section:
> For each category, list the sections and fields with test values.
> The AI agent will generate `console-[category].js` test scripts.

| Section | Field | Test Value |
|---|---|---|
| Leader | FullName | Ahmad Rizky Pratama |
| Leader | Email | ahmad.test@mail.com |
| Member 1 | FullName | Siti Nurhaliza |
| ... | | |

## 7. Notes / Special Instructions

`(OPTIONAL)` — Any additional information the AI agent should know.
