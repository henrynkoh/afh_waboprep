# AFH WABO Prep — User Manual

This manual describes every feature of the AFH WABO Prep app and how to use it.

---

## 1. Overview

**AFH WABO Prep** helps you:

- Enter property data (Entry Mode) for a single-family home in Lewis, Thurston, or Pierce County (WA).
- Generate 2D floor plans and 3D isometric drawings from that data.
- Run an AI-agent pipeline (Compliance → Design → Permit Ops → Red-Team) to prepare a permit packet.
- Learn the 8-week consultant curriculum and Top 100 Q&A for AFH initial inspection prep.
- Assemble the Centralia (or local) submittal packet and use the 2606 Cooks Hill Rd case study.

**Scope:** From property data to **passing local Building Official initial inspection** (WABO/DSHS 15-604). Full DSHS licensing is out of scope.

---

## 2. Entry Mode

**Path:** `/entry-mode`

### 2.1 Case Meta

- **Case ID** — Lowercase, underscores (e.g. `centralia_2606_cooks_hill_rd`).
- **Address** — Full street, city, state, ZIP.
- **County** — Lewis, Thurston, or Pierce.
- **City** — e.g. Centralia, Chehalis, Olympia.
- **Parcel / APN** — Optional; helps with permit and site plan.
- **Listing URL** — MLS/Redfin/Zillow link (optional).
- **As-is Bed/Bath** — e.g. `3/2`.
- **Target AFH Beds** — Usually 6.
- **Target Resident Mix** — e.g. ambulatory / limited mobility.
- **Scope Type** — garage conversion, interior remodel, addition.
- **Assumed Code Basis** — e.g. IRC + local amendments + WAC.

### 2.2 Levels & Rooms

- **Level** — 1F, 2F, etc.
- **Room ID** — B101 (bedroom), BA101 (bath), H101 (hall), S101 (storage), K101 (kitchen), R101 (living).
- **Room Name** — e.g. Living, Bedroom 1.
- **Use (as-is)** — Current use (Living, Bed, Kitchen, etc.).
- **Use (to-be)** — Target use (Common, Sleeping A–F, Kitchen).
- **Interior W / L** — Width and length in ft-in (e.g. `12-0`, `10-6`).
- **Ceiling H** — Ceiling height in ft-in (e.g. `8-0`).
- **Notes** — Optional (e.g. 80 sqft+ for bedrooms).

Sleeping rooms get labels **A–F** automatically when use is “Sleeping” or “Bed.”

### 2.3 Doors

- **Door ID** — e.g. D101.
- **From Room / To Room** — Room IDs; use `Exterior` for exterior doors.
- **Door Type** — Interior or Exterior.
- **Clear Width (in)** — e.g. 32, 36.
- **Swing** — In or Out.
- **Threshold (in)** — e.g. 0.0, 0.5.
- **Lock** — Yes or No.

### 2.4 Windows

- **Window ID** — e.g. W101.
- **Room ID** — Room the window is in.
- **Window Type** — Slider, Fixed, etc.
- **Rough W / H (in)** — Rough opening width and height.
- **Sill Height (in)** — Floor to sill; must be ≤44" for egress.
- **Operable** — Yes or No.
- **Egress Candidate** — Yes if it can serve as egress.

### 2.5 Stairs / Ramps / Thresholds

- **Element ID** — e.g. ST101, RP101.
- **Type** — Stair, Ramp, Threshold.
- **Location** — e.g. 1F→2F, Front.
- **Rise / Run / Width (in)** — As applicable.
- **Landing** — Yes/No or -.

### 2.6 Site / Exterior

- **Lot size** — e.g. 7,500 sqft.
- **Setbacks known** — yes/no.
- **Driveway / parking** — e.g. 2-car + street.
- **Utilities** — e.g. sewer/water.
- **Existing additions / sheds** — yes/no.

### 2.7 Export and Drawing

- **Export CSV** — Downloads a CSV of all Entry Mode data.
- **Export JSON** — Downloads JSON for use in the pipeline or elsewhere.
- **Generate 2D/3D drawing** — Saves data to session and opens the Drawing page with 2D and isometric views.

---

## 3. Drawing (2D / 3D)

**Path:** `/drawing`

### 3.1 Loading data

- **From session** — Click “Generate 2D/3D drawing” on Entry Mode; data loads automatically on the Drawing page.
- **From JSON** — Paste Entry Mode JSON into the text area and click “Load from pasted JSON.”

### 3.2 2D floor plan

- Rooms are laid out by level (rows); sleeping rooms labeled A–F.
- Doors shown as gaps in walls (blue opening).
- Windows on top edge of rooms (blue; egress candidates with brighter stroke).
- Dimensions and scale note (px/ft).
- **Export 2D SVG** — Downloads an SVG file for the permit packet.

### 3.3 3D isometric

- Same layout in isometric view (2D→3D).
- Rooms drawn as boxes (floor, walls, ceiling).
- **Export isometric SVG** — Downloads an SVG for inspector communication.

---

## 4. Pipeline

**Path:** `/pipeline`

### 4.1 Settings

- **City** — e.g. Centralia.
- **County** — Lewis, Thurston, Pierce.
- **Case ID** — Must match your case (e.g. `centralia_2606_cooks_hill_rd`).

### 4.2 Prompts

Four agent prompts (with City/County filled in):

- **Compliance** — Compliance Gate 1: pass/fail, top 15 risks, remediation, DATA_MISSING, DESIGN_CONSTRAINTS.
- **Design** — Plan A/B/C, drawing package spec, schedules, 2D→3D instructions.
- **Permit Ops** — Packet table, submission steps, cover letter draft.
- **Red-Team** — 25 inspector questions, correction notice simulation, Go/No-Go.

Copy each prompt into your AI runner (e.g. Moltbot/Clawdbot).

### 4.3 Folder structure

- Standard case folder layout: `00_admin` … `07_exports`.
- Centralia packet file list (A00 cover, A01 floor plans, A02 egress, etc.).

### 4.4 Run template

- Full message for `moltbot agent --message "..." --thinking high`.
- Copy and paste; replace `{case_id}` if needed (already filled from form).

---

## 5. Curriculum

**Path:** `/curriculum`

- **8-week course** for prospective AFH consultants:
  - Week 1: Pass definition & DSHS 15-604.
  - Week 2: Entry Mode (dimensions, doors, windows, egress).
  - Week 3: Compliance Gate 1.
  - Week 4: As-is 2D + labeling.
  - Week 5: To-be 6-bed + egress classification.
  - Week 6: 2D→3D isometric, scope/spec.
  - Week 7: Centralia packet assembly.
  - Week 8: Mock inspection (red-team) + revision.

- Use Moltbot/Clawdbot and design agents to reduce manual work.

---

## 6. Top 100 Q&A

**Path:** `/qa`

- Filter by category: DSHS 15-604, Sleeping room classification, Bedroom/window, Centralia submittal, Fail cases, Process.
- Click a question to expand the answer.
- Use for consultant training and self-check.

---

## 7. Centralia Packet

**Path:** `/centralia`

- Required submittal list (Building Application, Residential Checklist, 3 plan copies, contractor registration).
- Packet contents (A00–A03, S01, DSHS 15-604).
- Links to City of Centralia, DSHS AFH Building Inspections, DSHS 15-604, WABO Find Your BO.

---

## 8. Case Study: 2606 Cooks Hill Rd

**Path:** `/case-study`

- Subject property: 2606 Cooks Hill Rd, Centralia, WA 98531 (Lewis County).
- Pipeline outputs for this case.
- Centralia submission checklist and contact info.
- Drawing requirements (WABO/WAC/IRC R330).
- Links to Entry Mode, Pipeline, Centralia Packet.

---

## 9. Commands and deployment

- **Development:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`
- **Production:** `npm run start`
- **Lint:** `npm run lint`

No environment variables are required for basic use. Use system fonts; no network needed for build.

---

## 10. References

- [WABO](https://www.wabo.org) — Find Your Building Official
- [DSHS AFH Building Inspections](https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections)
- [DSHS 15-604](https://www.dshs.wa.gov/sites/default/files/forms/word/15-604.docx)
- [City of Centralia — Building](https://www.cityofcentralia.com/205/Building-Forms-Applications)
- WAC 51-51-0330 (IRC R330) — Adult family homes
