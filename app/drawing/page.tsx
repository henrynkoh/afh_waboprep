"use client";

import { useState, useCallback, useEffect } from "react";
import type { CaseMeta, RoomRow, DoorRow, WindowRow, StairRampRow, SiteRow } from "@/lib/types";
import { getLayout } from "@/lib/floorplan";
import FloorPlan2D from "@/components/FloorPlan2D";
import FloorPlanIsometric from "@/components/FloorPlanIsometric";
import Link from "next/link";

const STORAGE_KEY = "afh_entry_mode";

interface EntryModeData {
  caseMeta: CaseMeta;
  rooms: RoomRow[];
  doors: DoorRow[];
  windows: WindowRow[];
  stairs: StairRampRow[];
  site: SiteRow;
}

const defaultData: EntryModeData = {
  caseMeta: {
    caseId: "centralia_2606_cooks_hill_rd",
    address: "2606 Cooks Hill Rd, Centralia, WA 98531",
    county: "Lewis",
    city: "Centralia",
    asIsBedBath: "3/2",
    targetAfhBeds: 6,
    targetResidentMix: "ambulatory / limited mobility",
    scopeType: "garage conversion / interior remodel / addition",
    assumedCodeBasis: "IRC + local amendments + WAC",
  },
  rooms: [
    { level: "1F", roomId: "R101", roomName: "Living", useAsIs: "Living", useToBe: "Common", interiorW: "12-0", interiorL: "16-0", ceilingH: "8-0" },
    { level: "1F", roomId: "B101", roomName: "Bedroom 1", useAsIs: "Bed", useToBe: "Sleeping A", interiorW: "10-0", interiorL: "10-0", ceilingH: "8-0" },
    { level: "2F", roomId: "B201", roomName: "Bedroom 2", useAsIs: "Bed", useToBe: "Sleeping B", interiorW: "9-0", interiorL: "10-0", ceilingH: "8-0" },
    { level: "1F", roomId: "K101", roomName: "Kitchen", useAsIs: "Kitchen", useToBe: "Kitchen", interiorW: "10-0", interiorL: "12-0", ceilingH: "8-0" },
  ],
  doors: [
    { doorId: "D101", fromRoom: "H101", toRoom: "B101", doorType: "Interior", clearWidthIn: "32", swing: "In", thresholdIn: "0.0", lock: "No" },
    { doorId: "D201", fromRoom: "B101", toRoom: "Exterior", doorType: "Exterior", clearWidthIn: "36", swing: "Out", thresholdIn: "0.5", lock: "Yes" },
  ],
  windows: [
    { windowId: "W101", roomId: "B101", windowType: "Slider", roughWIn: "48", roughHIn: "48", sillHeightIn: "38", operable: "Yes", egressCandidate: "Yes" },
    { windowId: "W201", roomId: "B201", windowType: "Fixed", roughWIn: "36", roughHIn: "36", sillHeightIn: "30", operable: "No", egressCandidate: "No" },
  ],
  stairs: [],
  site: { lotSize: "", setbacksKnown: "", drivewayParking: "", utilities: "", existingAdditionsSheds: "" },
};

export default function DrawingPage() {
  const [data, setData] = useState<EntryModeData | null>(defaultData);
  const [jsonInput, setJsonInput] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadFromStorage = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EntryModeData;
        if (parsed.rooms?.length) setData(parsed);
        setJsonInput("");
        setLoadError(null);
      } else {
        setData(defaultData);
      }
    } catch {
      setData(defaultData);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const loadFromJson = () => {
    setLoadError(null);
    try {
      const parsed = JSON.parse(jsonInput) as EntryModeData;
      if (!parsed.rooms?.length) throw new Error("Missing rooms");
      setData(parsed);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const layout = data ? getLayout(data.rooms, data.doors, data.windows, { pxPerFoot: 20, gap: 10 }) : null;

  const exportSvg2D = () => {
    if (!layout) return;
    const el = document.getElementById("floor-plan-2d-svg");
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;
    const svgStr = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afh_floor_plan_2d_${data?.caseMeta?.caseId ?? "case"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportSvgIso = () => {
    if (!layout) return;
    const el = document.getElementById("floor-plan-iso-svg");
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;
    const svgStr = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afh_floor_plan_isometric_${data?.caseMeta?.caseId ?? "case"}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">2D / 3D Drawing</h1>
        <p className="text-slate-400 text-sm">
          Generate floor plan (2D) and isometric (3D) from Entry Mode data. Use for WABO permit packet (floor plan, isometric for inspector).
        </p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Load data</h2>
        <p className="text-slate-400 text-sm mb-3">
          Data is loaded from Entry Mode when you click &quot;Generate 2D/3D drawing&quot; there. Or paste JSON below (same shape as Entry Mode export).
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            type="button"
            onClick={loadFromStorage}
            className="rounded-lg bg-sky-600 px-3 py-2 text-white text-sm hover:bg-sky-500"
          >
            Load from Entry Mode (session)
          </button>
          <Link
            href="/entry-mode"
            className="rounded-lg border border-slate-600 px-3 py-2 text-slate-300 text-sm hover:bg-slate-700"
          >
            Open Entry Mode
          </Link>
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste Entry Mode JSON: { "caseMeta": {...}, "rooms": [...], "doors": [...], "windows": [...] }'
          className="w-full h-24 rounded bg-slate-900 border border-slate-600 px-3 py-2 text-slate-300 text-sm font-mono"
        />
        <button
          type="button"
          onClick={loadFromJson}
          className="mt-2 rounded-lg bg-slate-600 px-3 py-2 text-white text-sm hover:bg-slate-500"
        >
          Load from pasted JSON
        </button>
        {loadError && <p className="mt-2 text-red-400 text-sm">{loadError}</p>}
      </section>

      {data && layout && (
        <>
          <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <h2 className="text-lg font-semibold text-sky-300 mb-2">2D floor plan</h2>
            <p className="text-slate-400 text-sm mb-3">
              Scale: 20 px/ft. Sleeping rooms A–F, doors (blue gap), windows (blue; egress = brighter). Suitable for permit packet (export SVG).
            </p>
            <div id="floor-plan-2d-svg" className="overflow-auto rounded bg-slate-900 p-4">
              <FloorPlan2D layout={layout} showDimensions />
            </div>
            <button
              type="button"
              onClick={exportSvg2D}
              className="mt-3 rounded-lg bg-sky-600 px-3 py-2 text-white text-sm hover:bg-sky-500"
            >
              Export 2D SVG
            </button>
          </section>

          <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <h2 className="text-lg font-semibold text-sky-300 mb-2">3D isometric</h2>
            <p className="text-slate-400 text-sm mb-3">
              Same layout in isometric view (2D→3D). Use for inspector communication and permit narrative.
            </p>
            <div id="floor-plan-iso-svg" className="overflow-auto rounded bg-slate-900 p-4">
              <FloorPlanIsometric layout={layout} />
            </div>
            <button
              type="button"
              onClick={exportSvgIso}
              className="mt-3 rounded-lg bg-sky-600 px-3 py-2 text-white text-sm hover:bg-sky-500"
            >
              Export isometric SVG
            </button>
          </section>
        </>
      )}

      {!layout && data && (
        <p className="text-slate-400 text-sm">
          Add at least one room in Entry Mode, then load data above.
        </p>
      )}
    </div>
  );
}
