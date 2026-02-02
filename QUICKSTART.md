# AFH WABO Prep — Quick Start

Get the app running and generate your first 2D/3D drawing in under 5 minutes.

## 1. Install and run

```bash
cd afh_waboprep
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## 2. First flow: Entry Mode → Drawing

1. Click **Entry Mode** in the nav.
2. Use the pre-filled case (2606 Cooks Hill Rd) or edit **Case Meta** (address, county, city).
3. Edit **Levels & Rooms** (room IDs, dimensions in ft-in, e.g. `12-0`).
4. Add **Doors** and **Windows** (sill height matters for egress).
5. Click **Generate 2D/3D drawing**.
6. On the Drawing page, view **2D floor plan** and **3D isometric**; click **Export 2D SVG** or **Export isometric SVG**.

## 3. Pipeline (AI agents)

1. Click **Pipeline**.
2. Set **City**, **County**, **Case ID**.
3. Open **Prompts** → copy **Compliance**, **Design**, **Permit Ops**, or **Red-Team** prompt into your AI runner (e.g. Moltbot).
4. Open **Run template** → copy the full message for `moltbot agent --message "..." --thinking high`.

## 4. Other pages

- **Curriculum** — 8-week consultant course (inspection prep).
- **Top 100 Q&A** — Filter by category; expand answers.
- **Centralia Packet** — Required submittal list and links.
- **Case Study** — 2606 Cooks Hill Rd: subject property and submission checklist.

## 5. Build for production

```bash
npm run build
npm run start
```

---

**More:** [README](README.md) · [Manual](docs/MANUAL.md) · [Tutorial](docs/TUTORIAL.md)
