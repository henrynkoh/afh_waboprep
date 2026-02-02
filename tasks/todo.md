# AFH WABO Permit Pipeline — Task Plan

## Project goal (one sentence)
Get a single-family home in Lewis/Thurston/Pierce counties converted to a 6-bed WABO-ready AFH and **pass local Building Official initial inspection** (DSHS AFH license application prerequisite).

## Scope
- **In scope**: Property search criteria, Entry Mode data, compliance checks, as-is → to-be floor plans, permit packet assembly, curriculum & Q&A, Centralia submission templates, case study 2606 Cooks Hill Rd.
- **Out of scope**: Full DSHS licensing, post-inspection licensing steps.

## References
- WABO: https://www.wabo.org — local building officials, AFH checklist
- DSHS AFH Building Inspections: https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections
- DSHS 15-604: AFH Local Building Inspection Checklist (WAC 51-51-0330, IRC R330)
- City of Centralia Building: https://www.cityofcentralia.com/205/Building-Forms-Applications
- Counties: Lewis, Thurston, Pierce (WA)

---

## Completed
- [x] tasks/todo.md created
- [x] Next.js app scaffolded
- [x] Entry Mode forms (case meta, rooms, doors, windows, stairs, site)
- [x] Agent prompts (Compliance, Design, Permit Ops, Red-Team) and pipeline UI
- [x] Curriculum (8-week), Top 100 Q&A, Centralia packet templates
- [x] 2606 Cooks Hill Rd case study and packet export

---

## AI agent “org chart” (task → agent)
| Department | Role | Tasks |
|------------|------|--------|
| Strategy / Vision | Target area, supply/demand, listing filters | Scorecards, criteria |
| Research & Compliance | WAC, DSHS 15-604, WABO checklist | Compliance Gate 1/2, constraints |
| Acquisition | Listings (Lewis/Thurston/Pierce) | Compare as-is vs to-be, egress |
| Design & Drafting | As-is → to-be 6-bed, 2D/3D, specs | Floor plans, schedules, isometric |
| Permit Ops | City packet assembly | Centralia checklist, cover letter, PDF bundle |
| QA / Red-Team | Inspector POV, fail simulation | Correction notices, Go/No-Go |

---

## Pipeline stages (7)
0. Case bootstrap (Entry Mode → case folder)
1. Compliance Gate 1 (Entry Mode → pass/fail, constraints)
2. Design (3 plans A/B/C, schedules, drawing spec)
3. Compliance Gate 2 (design review)
4. 2D→3D (isometric)
5. Permit packet assembly (Centralia)
6. Red-Team QA → Export or revise

---

## Review
- **Deliverables**: Next.js app with Entry Mode (forms + CSV/JSON export), Pipeline (agent prompts, folder structure, run template), Curriculum (8 weeks), Top 100 Q&A (filterable), Centralia Packet (required items + refs), Case Study (2606 Cooks Hill Rd).
- **Lib**: types (CaseMeta, RoomRow, DoorRow, WindowRow, StairRampRow, SiteRow), agent-prompts (Compliance, Design, Permit Ops, Red-Team + fillPrompt), case-folder (structure, file names, Centralia packet list), curriculum (8 weeks), qa-bank (100 Q&A).
- **Flow**: User fills Entry Mode → exports data → copies pipeline prompts/run template into Moltbot or other AI runner → pipeline produces compliance, design, packet, red-team → export ZIP/PDF for Centralia.
