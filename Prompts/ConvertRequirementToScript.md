# ConvertRequirementToScript — AI Agent Instructions

## Purpose

Read a `requirement_[EventName].md` file and generate browser console-pasteable JS scripts for the Roetix admin dashboard.

## Dashboard Context

The scripts target the **Roetix Event Management Dashboard** (`admin.roetix.com`). There are two distinct dashboards and script formats:

### Dashboard A — Concert/Seated Events (Wizard Flow)

Used for concert-type events. Multi-step wizard at `/roetix-events/create`.

**Script Types:**

| # | Script File | Dashboard Page | What It Fills |
|---|------------|----------------|---------------|
| 1 | `EventDetail.js` | Step 1: Event Details | eventName, slug, eventType (Seated/Standing), location, dates, fee config, organizer, description |
| 2 | `Timeline.js` | Step 2: Timelines | Array of `{ name, start, end }` sale timelines |
| 3 | `Field.js` | Step 3 (Registration Form section) | Array of `{ name, label, type }` form fields |
| 4 | `Pricing.js` | Edit page (`/roetix-events/{id}/edit`) | Categories `{ displayName, color, quota }` + Pricing matrix `[row][col] { price, quota }` |

### Dashboard B — Competition Events (Timeline/Phase Flow)

Used for competition-type events. Each sub-category has its own timeline page at `/events/{slug}/timeline`.

**Script Types:**

| # | Script File | When to Paste | What It Fills |
|---|------------|---------------|---------------|
| 1 | `Create_EarlyBird.js` | After clicking "Add Phase" (first phase) | Phase name/dates, registrationGate OFF, requiresPayment ON, all form fields |
| 2 | `Create_Normal.js` | After clicking "Add Phase" (subsequent phases) | Auto-detects phase index, fills phase name/dates, checkboxes, all form fields |

**Also supported — FormFill scripts** (testing/autofill dummy data on public registration page):
| # | Script File | Purpose |
|---|------------|---------|
| 1 | `console-[subcategory].js` | Autofills registration form with dummy data, uploads dummy PDF files |

## How to Determine Script Type

Read the `eventType` in the requirement file:

- **`concert`** → Generate: EventDetail.js + Timeline.js + Field.js + Pricing.js
- **`competition`** → Generate: Create_[PhaseName].js for each phase/subcategory combination + FormFill scripts if requested

## Script Generation Rules

### Rule 1: Read PrevSuccess Templates First

Before generating ANY script, read the corresponding template from `PrevSuccess/`:

- Concert → Read all files in `PrevSuccess/Concert/GMCO/Setup12Apr/`
- Competition Setup → Read files in `PrevSuccess/Competition/IGNITE/Setup/WPC/` (most up-to-date, includes `notes` + `options` support). Fallback: `PrevSuccess/Competition/ME2/Setup/[SubCategory]/`
- Competition FormFill → Read files in `PrevSuccess/Competition/ME2/FormsFill/`

The template provides:
- The exact React-framework-compatible `fill()` function
- The correct DOM selectors (`byId`, `byName`, `byLabel`, `querySelector` patterns)
- The correct event dispatching (`input`, `change`, `blur`)
- The correct `sleep()` timings
- The checkbox handling logic

**YOU MUST preserve the template's engine code exactly.** Only modify the DATA section.

### Rule 2: What to Change vs What to Keep

**CHANGE (data section only):**

| Script | Data to Replace |
|--------|----------------|
| EventDetail.js | `DATA` object: eventName, slug, eventType, location, ticketSalesStart, eventDate, flatAmount, percentage, feeBearer, organizer, description |
| Timeline.js | `TIMELINES` array: each `{ name, start, end }` |
| Field.js | `FIELDS` array: each `{ name, label, type }` |
| Pricing.js | `CATEGORIES` array + `PRICING` matrix |
| Create_[Phase].js | `FIELDS` array: each `{ key, label, type, required, notes?, options? }` + phase name/dates + pricing if applicable |
| console-[sub].js | Field `fillByName()` values + section structure |

**KEEP UNCHANGED (engine code):**

- `setter` / `taSetter` declarations
- `fill()`, `sleep()`, `byId()`, `byName()`, `byLabel()` functions
- `findCategoryBlock()` function (Pricing.js)
- DOM query selectors and traversal patterns
- Event dispatch calls
- Console log formatting
- The `run()` async function structure
- `uploadDummyById()`, `createDummyPdfFile()`, `uploadAllVisibleFileInputs()` (FormFill)

### Rule 3: Concert Script Conventions

**EventDetail.js:**
```javascript
const SUFFIX = Math.random().toString(36).substring(2, 6);
const DATA = {
  eventName: '[from requirement]',
  slug: `[slugified-name]-${SUFFIX}`,
  eventType: 'Seated',  // or 'Standing'
  location: '[from requirement]',
  ticketSalesStart: '[YYYY-MM-DDTHH:mm]',
  eventDate: '[YYYY-MM-DDTHH:mm]',
  flatAmount: '[from requirement or "0"]',
  percentage: '[from requirement]',
  feeBearer: 'Organizer',  // or 'Buyer'
  organizer: '[from requirement]',
  description: '[from requirement]',
};
```

**Timeline.js:**
```javascript
const TIMELINES = [
  { name: '[Phase Name]', start: '[YYYY-MM-DDTHH:mm]', end: '[YYYY-MM-DDTHH:mm]' },
  // ... ordered chronologically
];
```

**Field.js:**
```javascript
const FIELDS = [
  { name: '[field_key]', label: '[Display Label]', type: '[Text|Number|Email|...]' },
];
```
Valid types: `Text`, `Number`, `Email`, `Tel`, `Textarea`, `Select`, `Checkbox`

**Pricing.js:**
```javascript
const CATEGORIES = [
  { displayName: '[Category Name]', color: '[hex color]', quota: '[total seats]' },
];
// PRICING[row][col] = per category per timeline
const PRICING = [
  [ { price: '[Rp]', quota: '[seats]' }, { price: '[Rp]', quota: '[seats]' } ],  // Category 1
];
```
PRICING is indexed: `PRICING[categoryIndex][timelineIndex]`

### Rule 4: Competition Script Conventions

**Create_EarlyBird.js (first phase):**
```javascript
var FIELDS = [
  { key: '[FieldName]_EB', label: '[Display Label]', type: '[type]', required: [bool] },
  // With notes (keterangan):
  { key: 'Batch_EB', label: 'Batch', type: 'text', required: true,
    notes: 'Enrollment year. Example: 2023' },
  // With multiple_choice options:
  { key: 'Sex_EB', label: 'Sex', type: 'multiple_choice', required: true,
    options: ['Male', 'Female'] },
];
// Phase fields use byName('timelines.0.fields.N.name'), etc.
```

**Create_Normal.js (subsequent phases):**
```javascript
// Auto-detect phase index from existing DOM
var PHASE_INDEX = Array.from(document.querySelectorAll('[name^="timelines."]'))
  .map(function(el) { return parseInt(el.name.split('.')[1]); })
  .filter(function(n) { return !isNaN(n); });
PHASE_INDEX = PHASE_INDEX.length > 0 ? Math.max.apply(null, PHASE_INDEX) : 0;

var FIELDS = [
  { key: '[FieldName]_normal', label: '[Display Label]', type: '[type]', required: [bool],
    notes: '(optional description text)' },
];
// Phase fields use byName('timelines.' + PHASE_INDEX + '.fields.N.name')
```

Valid field types for competition: `text`, `phone`, `email`, `file`, `link`, `multiple_choice`, `text_area`

**Field definition properties:**

| Property | Required | Description |
|----------|----------|-------------|
| `key` | Yes | Unique field identifier (e.g., `TeamName_registration`) |
| `label` | Yes | Display label shown to registrants |
| `type` | Yes | One of: `text`, `phone`, `email`, `file`, `link`, `multiple_choice`, `text_area` |
| `required` | Yes | `true` or `false` |
| `notes` | No | Description/keterangan text shown below the field (e.g., format instructions, rules) |
| `options` | No | Array of strings for `multiple_choice` type (e.g., `['Male', 'Female']`). Each option is auto-added as a choice chip. |

**Key suffix convention:**
- Early Bird phase fields: `[FieldName]_EB`
- Normal phase fields: `[FieldName]_normal`
- Extended phase fields: `[FieldName]_normal_extended`

**Team competition field pattern:**
- Leader fields: `FieldName` or `FieldName_EB`
- Member 1: `FieldNameAnggota1_EB`
- Member 2: `FieldNameAnggota2_EB`

### Rule 5: FormFill Script Conventions

```javascript
// Suffix detection for phase-aware forms
function detectSuffix() {
  const names = [...document.querySelectorAll('input[name]')].map(el => el.name);
  if (names.some(n => n.endsWith('_EB'))) return '_EB';
  if (names.some(n => n.endsWith('_normal_extended'))) return '_normal_extended';
  if (names.some(n => n.endsWith('_normal'))) return '_normal';
  return '_EB';
}
const sf = detectSuffix();
```

File upload dummy:
```javascript
function createDummyPdfFile() { /* ... PDF content ... */ }
function uploadDummyById(id) { /* ... DataTransfer approach ... */ }
```

### Rule 6: File Naming & Output

Generate scripts into the specified event folder. Follow this naming convention:

**Concert:**
```
[EventFolder]/Setup[Date]/
  ├── EventDetail.js
  ├── Timeline.js
  ├── Field.js
  └── Pricing.js
```

**Competition:**
```
[EventFolder]/Setup/[SubCategoryName]/
  ├── Create_EarlyBird.js
  └── Create_Normal.js
[EventFolder]/FormsFill/
  ├── console-[subcategory1].js
  ├── console-[subcategory2].js
  └── ...
```

## Step-by-Step Process

1. **Read the requirement file** specified by the user
2. **Identify eventType** (concert or competition)
3. **Read the appropriate PrevSuccess templates** from `D:\\Hilmi\\Coding\\OpsMastermind\ScriptTemplate\PrevSuccess\`
4. **For each script needed:**
   a. Copy the template engine code verbatim
   b. Replace only the DATA section with values from the requirement
   c. Verify field keys, dates, and pricing values match the requirement
5. **Write files** to the target event folder
6. **Report** what was generated with file paths

## Checklist Before Delivery

- [ ] All dates are in correct format (`YYYY-MM-DDTHH:mm` for concert, `YYYY-MM-DD` for competition)
- [ ] Field keys follow suffix convention (`_EB`, `_normal`, `_normal_extended`)
- [ ] Team member fields use `Anggota1`/`Anggota2` naming pattern (for team competitions)
- [ ] Pricing matrix dimensions match: `CATEGORIES.length` rows × `TIMELINES.length` columns
- [ ] All `required` flags match the requirement
- [ ] `notes` property is set for fields that have descriptions/instructions in the requirement
- [ ] `options` array is set for all `multiple_choice` type fields with the exact choice values from the requirement
- [ ] Engine code is copied exactly from PrevSuccess templates (IGNITE/WPC for latest version with notes+choices support)
- [ ] `addChoices()` helper function is included in the script whenever any field has `type: 'multiple_choice'` with `options`
- [ ] No hardcoded phase index in `Create_Normal.js` (must auto-detect)
- [ ] Slug is URL-safe and includes SUFFIX randomizer (EventDetail.js only)
