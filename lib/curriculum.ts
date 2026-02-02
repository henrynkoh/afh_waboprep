/**
 * 8-week consultant curriculum: AFH Initial Inspection Prep (WAC, DSHS 15-604, floor plan → isometric → packet).
 */

export interface WeekItem {
  title: string;
  topics: string[];
  assignment: string;
}

export const CURRICULUM_WEEKS: WeekItem[] = [
  {
    title: "Week 1 — Pass definition & checklist landscape",
    topics: [
      "Why local Building Official approval is the gate (WAC, DSHS licensing prerequisite)",
      "DSHS 15-604 (WABO-aligned) structure: Sections 1–4, inputs and outputs",
      "Floor plan on 8.5×11, sleeping rooms A–F, exit components (stairs, ramps, platforms)",
    ],
    assignment: "Complete Sections 1–4 of 15-604 for a sample (fake) case.",
  },
  {
    title: "Week 2 — Entry Mode standardization (dimensions, windows, doors, egress)",
    topics: [
      "Data-as-drawing: room dimensions, door width, window sill height, egress path",
      "Standard fields: Room ID (B101, BA101, H101, S101), door/window schedules",
      "Egress candidate: operable window, sill ≤44\", clear opening minimums",
    ],
    assignment: "Fill Entry Mode form for one property (rooms, doors, windows, stairs, site).",
  },
  {
    title: "Week 3 — Compliance Gate 1 (automatic checks)",
    topics: [
      "Bedroom minimum usable floor space (e.g. 80 sqft)",
      "Window sill height limit (44\" max for egress)",
      "Sleeping room classification (Type S, NS1, NS2) per IRC R330 / WAC",
    ],
    assignment: "Build Gate 1 checklist and 10 fail-case examples.",
  },
  {
    title: "Week 4 — As-is 2D plan + labeling rules",
    topics: [
      "A–F labels for sleeping rooms, stairs/ramps/lifts on plan",
      "Scale (e.g. 1/4\"=1'), room use, door/window dimensions",
      "DSHS 15-604 format alignment",
    ],
    assignment: "Produce as-is 2D plan with correct labels for one case.",
  },
  {
    title: "Week 5 — To-be (6-bed) design options + egress classification",
    topics: [
      "Three layout options (Plan A/B/C) for 6-bed AFH",
      "Type S / NS1 / NS2 on plan; egress path narrative per sleeping room",
      "Design constraints from Compliance output",
    ],
    assignment: "Create Plan A/B/C with egress type placeholders.",
  },
  {
    title: "Week 6 — 2D→3D (isometric) + proposal packaging",
    topics: [
      "Isometric from 2D for inspector communication",
      "Mixboard / NotebookLM for narrative and docs",
      "Scope/spec and rough cost for permit value",
    ],
    assignment: "Generate isometric and one-page scope/spec from 2D plan.",
  },
  {
    title: "Week 7 — Centralia (or local) submittal packet assembly",
    topics: [
      "Residential Permit Checklist + Building Permit Application",
      "Site plan, floor plans, egress plan, door/window schedule, DSHS 15-604",
      "Cover letter and submission steps; avoiding common omissions",
    ],
    assignment: "Assemble full packet for one case per city checklist.",
  },
  {
    title: "Week 8 — Mock inspection (red-team) + revision loop",
    topics: [
      "Inspector questions that trigger correction notices",
      "Go/No-Go and revision task list",
      "Using Moltbot/Clawdbot and design agents to reduce manual work",
    ],
    assignment: "Run red-team on packet; fix issues and re-export.",
  },
];
