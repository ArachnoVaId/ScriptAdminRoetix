# E2EScriptSetup.md — End-to-End Script Generation Guide

## Overview

This document describes the complete workflow for generating browser console automation scripts for the Roetix event registration platform. An AI agent should read this file first to understand the full pipeline.

---

## Architecture

```
Raw Input (Spreadsheet/Docs)
       |
       v
[Step 1] ConvertRawToRequirement.md  -->  requirement_[EventName].md
       |
       v
[Step 2] ConvertRequirementToScript.md  -->  JS script files in target folder
       |
       v
[Ready] Paste scripts in browser console on Roetix dashboard
```

---

## File Structure Reference

```
events/
  ScriptTemplate/                          # THIS FOLDER — templates & prompts
    Prompts/
      E2EScriptSetup.md                    # You are here
      ConvertRawToRequirement.md           # Step 1 prompt guide
      ConvertRequirementToScript.md        # Step 2 prompt guide
    Templates/
      requirement_template_concert.md      # Blank template for concert events
      requirement_template_competition.md  # Blank template for competition events
    PrevSuccess/                           # Previously successful scripts (reference)
      Concert/
        GMCO/Setup12Apr/                   # 4 scripts: EventDetail, Timeline, Field, Pricing
        ParagitaJune/SetupEvent/           # 2 scripts: Timeline, Pricing
      Competition/
        ME2/
          Setup/
            GMBCCTeamNational/             # Create_EarlyBird.js, Create_Normal.js
            GMBCCIndividualNational/       # Create_EarlyBird.js, Create_Normal.js
          FormsFill/                       # 5 test-fill scripts
        IGNITE/
          Setup/
            WPC/                           # Create_Registration.js (33 fields with notes + choices), Create_Abstract.js, Create_Semifinal.js, Create_FinalsRegistration.js, Create_FinalsSubmission.js
```

---

## Event Types

### Type 1: Concert
- **Dashboard flow**: Create Event wizard (multi-step)
- **Scripts generated** (4 files, run in order):
  1. `EventDetail.js` — Step 1: Event name, slug, type, location, dates, fees, organizer, description
  2. `Timeline.js` — Step 2: Sale period definitions (Internal, Early Bird, Presale, Regular, etc.)
  3. `Field.js` — Step 3: Registration form fields (name, label, type per field)
  4. `Pricing.js` — Edit page: Ticket categories (name, color, quota) + pricing matrix (price + quota per category per timeline)

### Type 2: Competition
- **Dashboard flow**: Navigate to existing event's timeline page, add phases
- **Scripts generated** (1 file per phase per sub-category):
  - `Create_[PhaseName].js` — Phase name, dates, checkboxes (registrationGate, requiresPayment), form fields
  - Multiple sub-categories exist (e.g., Team National, Individual National, Team International)
  - Each sub-category has multiple phases (e.g., EarlyBird, Normal, Extended)
  - Field keys are suffixed with phase identifier (e.g., `_EB`, `_normal`)
  - Fields support **`notes`** (keterangan/description text shown to registrants) and **`options`** (for `multiple_choice` type — auto-populates choice chips)

---

## Step-by-Step AI Agent Workflow

### When user says "Read E2EScriptSetup.md"

The AI agent should respond by asking:

1. **"What is the raw input?"** — Ask the user to paste the raw event requirement data (from Google Spreadsheet, Google Docs table, or plain text).

2. **"What is the event type?"** — Concert or Competition? If Competition, clarify:
   - How many sub-categories? (e.g., Team National, Individual National, Team International)
   - How many phases per sub-category? (e.g., Early Bird, Normal, Extended)
   - Is there a FormsFill (test input) script needed?

3. **"What is the event name for the folder?"** — This determines:
   - The requirement file name: `requirement_[EventName].md`
   - The target output folder: `events/[EventName]/`

4. **"Which existing scripts should be referenced?"** — Point to PrevSuccess folder for matching patterns. If not specified, the agent should auto-detect based on event type.

### After gathering info, the agent should:

#### Phase 1: Generate Requirement
- Read `ConvertRawToRequirement.md` from `events/ScriptTemplate/Prompts/`
- Process raw input into structured `requirement_[EventName].md`
- Output the MD file to `events/[EventName]/requirement_[EventName].md`
- Ask user to confirm or edit

#### Phase 2: Generate Scripts
- Read `ConvertRequirementToScript.md` from `events/ScriptTemplate/Prompts/`
- Read the confirmed `requirement_[EventName].md`
- Read relevant reference scripts from `PrevSuccess/`
- Generate JS files into `events/[EventName]/` folder
- List all generated files with usage instructions

---

## Script Execution Order (for user reference)

### Concert
```
1. Open /roetix-events/create → Paste EventDetail.js → Click Next
2. On Step 2 → Paste Timeline.js → Click Next
3. On Step 3 → Paste Field.js → Click Save
4. After event created, open /roetix-events/{id}/edit → Paste Pricing.js → Save
```

### Competition
```
1. Navigate to the competition's timeline page
2. Click "Add Phase"
3. Paste Create_EarlyBird.js → Click "Save Timeline"
4. Click "Add Phase" again
5. Paste Create_Normal.js → Click "Save Timeline"
6. Repeat for additional phases/sub-categories
```

---

## Quick-Start Prompt Examples

### Full Pipeline
```
Read E2EScriptSetup.md. 
Raw input: [paste spreadsheet data here].
Event name: GMCO.
Output folder: events/GMCO.
```

### Step 1 Only
```
Read ConvertRawToRequirement.md and convert this raw input into requirement format:
[paste data]
Event name: [name]
```

### Step 2 Only
```
Read ConvertRequirementToScript.md and process requirement_GMCO.md into script files at events/GMCO/
```

### FormsFill Script
```
Read ConvertRequirementToScript.md and generate a FormsFill test script for the GMBCCTeamNational event.
Use the requirement at events/ME2/requirement_ME2.md as reference.
```
