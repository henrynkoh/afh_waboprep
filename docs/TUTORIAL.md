# AFH WABO Prep — Step-by-Step Tutorial

This tutorial walks you through one complete flow: from installing the app to exporting a 2D/3D drawing and preparing the pipeline for a permit packet.

---

## Step 1: Install and start the app

```bash
cd afh_waboprep
npm install
npm run dev
```

Open **http://localhost:3000**. You should see the home page with links to Entry Mode, Pipeline, Curriculum, Q&A, Centralia Packet, Case Study, and Drawing.

---

## Step 2: Open Entry Mode and review Case Meta

1. Click **Entry Mode** in the navigation.
2. In **1-A. Case Meta**, check or edit:
   - **Case ID:** e.g. `centralia_2606_cooks_hill_rd`
   - **Address:** 2606 Cooks Hill Rd, Centralia, WA 98531
   - **County:** Lewis
   - **City:** Centralia
   - **Target AFH Beds:** 6 (use the separate “targetAfhBeds” field at the bottom)

Leave other fields as-is for this tutorial, or change them to match your property.

---

## Step 3: Edit Levels & Rooms

1. In **1-B. Levels & Rooms**, you’ll see sample rooms (Living, Bedroom 1, Bedroom 2, Kitchen).
2. Room IDs: use **B101**, **B201**, etc. for bedrooms; **K101** for kitchen; **R101** for living.
3. **Use (to-be):** set bedrooms to **Sleeping A**, **Sleeping B**, etc. so they get A–F labels in the drawing.
4. **Interior W / L** use ft-in format, e.g. `12-0` (12 ft 0 in), `10-6` (10 ft 6 in).
5. Optionally add more rooms with **+ Add room**.

---

## Step 4: Add or edit Doors and Windows

1. In **1-C. Doors**, ensure each door has **From Room** and **To Room** (use **Exterior** for outside doors).
2. **Clear Width (in):** e.g. 32 or 36.
3. In **1-D. Windows**, set **Sill Height (in)**. For egress, use ≤44 (e.g. 38).
4. Set **Egress Candidate** to **Yes** for windows that can serve as egress.

---

## Step 5: Generate 2D/3D drawing

1. Click **Generate 2D/3D drawing** (green button).
2. You’ll be taken to the **Drawing** page with data loaded from session.
3. On the Drawing page you’ll see:
   - **2D floor plan** — rooms, doors (gaps), windows, labels (Sleeping A–F), dimensions.
   - **3D isometric** — same layout in 3D.
4. Click **Export 2D SVG** or **Export isometric SVG** to download SVGs for your permit packet.

---

## Step 6: Use the Pipeline (AI agents)

1. Click **Pipeline** in the nav.
2. Set **City** (e.g. Centralia), **County** (Lewis), **Case ID** (same as Entry Mode).
3. Open the **Prompts** tab.
4. Copy the **Compliance** prompt and paste it into your AI tool (e.g. Moltbot). Run it with your Entry Mode data (or CSV/JSON).
5. Then copy **Design**, **Permit Ops**, and **Red-Team** prompts and run them in order, using the previous output as input where needed.
6. Open the **Run template** tab and copy the full message. Use it with:  
   `moltbot agent --message "..." --thinking high`  
   (paste the message inside the quotes; escape quotes as needed.)

---

## Step 7: Assemble the permit packet

1. Go to **Centralia Packet** to see the required submittal list and document names.
2. Use your exported 2D and isometric SVGs, plus any outputs from the pipeline (cover letter, checklist, DSHS 15-604), to build the packet.
3. Use **Case Study: 2606 Cooks Hill Rd** as a checklist for the same property or as a template for another address.

---

## Step 8: Study the curriculum and Q&A

1. Open **Curriculum** and go through the 8-week outline (pass definition, Entry Mode, compliance, 2D, to-be design, 2D→3D, packet, red-team).
2. Open **Top 100 Q&A**, filter by category, and expand questions to study WAC, DSHS 15-604, and best practices for the initial inspection.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Install and run with `npm run dev` |
| 2 | Entry Mode → Case Meta |
| 3 | Entry Mode → Levels & Rooms (Sleeping A–F, ft-in) |
| 4 | Entry Mode → Doors & Windows (sill ≤44" for egress) |
| 5 | Generate 2D/3D drawing → Export SVG |
| 6 | Pipeline → copy prompts and run template |
| 7 | Centralia Packet + Case Study → assemble packet |
| 8 | Curriculum + Q&A → study for inspection |

For a shorter path, see [QUICKSTART.md](../QUICKSTART.md). For full feature details, see [MANUAL.md](MANUAL.md).
