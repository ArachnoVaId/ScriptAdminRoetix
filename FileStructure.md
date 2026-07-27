# ScriptTemplate File Structure

```
D:\\Hilmi\\Coding\\OpsMastermind\ScriptTemplate\
|
|-- Prompts/                          # AI Agent instruction files
|   |-- E2EScriptSetup.md             # Master entry point - read this first
|   |-- ConvertRawToRequirement.md    # Phase 1: Raw → Requirement MD
|   |-- ConvertRequirementToScript.md # Phase 2: Requirement MD → JS Scripts
|
|-- Templates/                        # Script templates with placeholders
|   |-- Concert/                      # Concert script templates
|   |   |-- _Concert_EventDetail.js   # Concert Step 1: Event Details
|   |   |-- _Concert_Timeline.js      # Concert Step 2: Sale Timelines
|   |   |-- _Concert_Field.js         # Concert Step 3: Registration Form Fields
|   |   |-- _Concert_Pricing.js       # Concert Step 4: Categories + Pricing
|   |
|   |-- Competition_PhaseTemplate.js  # Competition: Create Phase + Fields (supports notes + options)
|   |-- FormFill_Template.js          # Competition: Test Form Autofill
|   |
|   |-- template_requirement_concert.md      # Blank requirement template for Concert
|   |-- template_requirement_competition.md  # Blank requirement template for Competition
|
|-- PrevSuccess/                      # Previously successful scripts (reference)
|   |-- Concert/
|   |   |-- GMCO/
|   |   |   |-- Setup12Apr/
|   |   |       |-- EventDetail.js    # Grand Concert vol 12 - Event Details
|   |   |       |-- Timeline.js       # Grand Concert vol 12 - Timelines
|   |   |       |-- Field.js          # Grand Concert vol 12 - Form Fields
|   |   |       |-- Pricing.js        # Grand Concert vol 12 - Pricing
|   |   |
|   |   |-- ParagitaJune/
|   |       |-- SetupEvent/
|   |           |-- Timeline.js       # Paragita June - Timelines
|   |           |-- Pricing.js        # Paragita June - Pricing
|   |
|   |-- Competition/
|       |-- ME2/
|       |   |-- Setup/
|       |   |   |-- GMBCCTeamNational/
|       |   |   |   |-- Create_EarlyBird.js   # Team National Early Bird Phase
|       |   |   |   |-- Create_Normal.js      # Team National Normal Phase
|       |   |   |
|       |   |   |-- GMBCCIndividualNational/
|       |   |       |-- Create_EarlyBird.js   # Individual National Early Bird
|       |   |       |-- Create_Normal.js      # Individual National Normal
|       |   |
|       |   |-- FormsFill/
|       |       |-- console-ideas-lean-canvas.js              # IDEAS Lean Canvas
|       |       |-- console-gmbcc-team-national.js            # Team National Fill
|       |       |-- console-gmbcc-team-international.js       # Team Intl Fill
|       |       |-- console-gmbcc-individual-national.js      # Individual National Fill
|       |       |-- console-gmbcc-individual-international.js # Individual Intl Fill
|       |
|       |-- IGNITE/                                    # Latest reference (has notes + choices)
|           |-- Setup/
|               |-- WPC/
|                   |-- Create_Registration.js         # 33 fields with notes + MC options
|                   |-- Create_Abstract.js             # 5 fields
|                   |-- Create_Semifinal.js            # 5 fields
|                   |-- Create_FinalsRegistration.js   # 5 fields
|                   |-- Create_FinalsSubmission.js     # 8 fields
|
|-- FileStructure.md                  # This file
```

## Naming Conventions

| Item | Pattern | Example |
|------|---------|---------|
| Requirement MD | `requirement_[EventName].md` | `requirement_GMCO.md` |
| Concert Setup Folder | `events/[EventName]/Setup[Date]/` | `events/GMCO/Setup12Apr/` |
| Concert Scripts | `EventDetail.js`, `Timeline.js`, `Field.js`, `Pricing.js` | - |
| Competition Setup Folder | `events/[EventName]/Setup/[SubCategory]/` | `events/ME2/Setup/GMBCCTeamNational/` |
| Competition Scripts | `Create_[PhaseName].js` | `Create_EarlyBird.js` |
| FormFill Scripts | `console-[subcategory].js` | `console-gmbcc-team-national.js` |

## Event Types

### Concert
- Has 4 setup scripts (EventDetail, Timeline, Field, Pricing)
- Dashboard flow: Create Event → Step 1 Details → Step 2 Timelines → Step 3 Fields → Edit Page Pricing

### Competition
- Has form-only setup (no EventDetail/Timeline/Pricing on admin)
- Each competition may have multiple sub-categories (Team/Individual, National/International)
- Each sub-category may have multiple phases (Early Bird, Normal, Extended)
- One `Create_[PhaseName].js` per phase per sub-category
- Fields support **`notes`** (keterangan description) and **`options`** (multiple_choice values)
- Optionally has FormFill test scripts for end-to-end testing
