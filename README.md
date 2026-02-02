# AFH WABO Prep

Next.js app for **finding single-family homes in Lewis, Thurston, and Pierce counties (WA)**, converting them to **WABO-ready Adult Family Homes (6 beds)**, and **passing local Building Official initial inspection** as part of DSHS AFH license application.

## Quick start

```bash
npm install && npm run dev
```

Open **http://localhost:3000**. Go to **Entry Mode** → fill data → **Generate 2D/3D drawing** → export SVG. See [QUICKSTART.md](QUICKSTART.md) for a 5-minute walkthrough.

**Docs:** [Manual](docs/MANUAL.md) · [Tutorial](docs/TUTORIAL.md) · [Quick start](QUICKSTART.md) · [Docs index](docs/README.md) · [Ads](docs/ads/README.md) (Facebook, Instagram, Threads, Blogger, Naver, Tistory, WordPress, newsletter, email)

## Scope

- **In scope**: Entry Mode data, compliance checks (WAC, DSHS 15-604, WABO), as-is → to-be floor plans, permit packet assembly, consultant curriculum, Top 100 Q&A, Centralia submission templates, case study **2606 Cooks Hill Rd, Centralia 98531**.
- **Out of scope**: Full DSHS licensing; post-inspection steps.

## Features

- **Entry Mode** — Case meta, rooms, doors, windows, stairs/ramps, site. Export CSV/JSON; generate 2D/3D drawing.
- **Drawing (2D/3D)** — Floor plan (2D) and isometric (3D) from Entry Mode; export SVG for permit packet.
- **Pipeline** — AI agent prompts (Compliance, Design, Permit Ops, Red-Team), case folder structure, Moltbot/Clawdbot run template.
- **Curriculum** — 8-week consultant course: inspection prep, WAC/DSHS 15-604, floor plan → isometric → packet.
- **Top 100 Q&A** — AFH initial inspection prep (WAC, RCW, best practices).
- **Centralia Packet** — Required submittal list, document names, references (City of Centralia, DSHS, WABO).
- **Case Study** — 2606 Cooks Hill Rd: subject property, outputs, Centralia submission checklist.

## Tech

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.

## Commands

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run start
```

## Push to GitHub (SSH)

Repo: **henrynkoh/afh_waboprep**  
SSH clone URL: `git@github.com:henrynkoh/afh_waboprep.git`

Use your SSH keys (e.g. MacBook Pro key in GitHub → Settings → SSH and GPG keys). From this project root:

```bash
git init
git remote add origin git@github.com:henrynkoh/afh_waboprep.git
git add .
git status
git commit -m "AFH WABO Prep: Next.js app, Entry Mode, Drawing 2D/3D, Pipeline, Curriculum, Q&A, Centralia packet, landing page"
git branch -M main
git push -u origin main
```

If the repo already exists and has content, clone first then copy files, or `git pull origin main --allow-unrelated-histories` before pushing. To push updates later: `git add .` → `git commit -m "..."` → `git push`.

## Moltbot / Clawdbot (reference)

Use the **Pipeline** page to copy agent prompts and run template. Example:

```bash
moltbot onboard --install-daemon
moltbot gateway --port 18789 --verbose
moltbot agent --message "Start case: 2606 Cooks Hill Rd. Create case folder, run Compliance Gate 1, draft as-is plan." --thinking high
```

## References

- [WABO](https://www.wabo.org) — Find Your Building Official
- [DSHS AFH Building Inspections](https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections)
- [DSHS 15-604](https://www.dshs.wa.gov/sites/default/files/forms/word/15-604.docx) — AFH Local Building Inspection Checklist
- [City of Centralia — Building](https://www.cityofcentralia.com/205/Building-Forms-Applications)
- WAC 51-51-0330 (IRC R330) — Adult family homes
