"use client";

import { useState } from "react";
import type { CaseMeta, RoomRow, DoorRow, WindowRow, StairRampRow, SiteRow } from "@/lib/types";

const COUNTIES = ["Lewis", "Thurston", "Pierce"] as const;
const DEFAULT_CASE: CaseMeta = {
  caseId: "centralia_2606_cooks_hill_rd",
  address: "2606 Cooks Hill Rd, Centralia, WA 98531",
  county: "Lewis",
  city: "Centralia",
  parcelApn: "",
  listingUrl: "",
  asIsBedBath: "3/2",
  targetAfhBeds: 6,
  targetResidentMix: "ambulatory / limited mobility",
  scopeType: "garage conversion / interior remodel / addition",
  assumedCodeBasis: "IRC + local amendments + WAC",
};

export default function EntryModePage() {
  const [caseMeta, setCaseMeta] = useState<CaseMeta>(DEFAULT_CASE);
  const [rooms, setRooms] = useState<RoomRow[]>([
    { level: "1F", roomId: "R101", roomName: "Living", useAsIs: "Living", useToBe: "Common", interiorW: "12-0", interiorL: "16-0", ceilingH: "8-0", notes: "" },
    { level: "1F", roomId: "B101", roomName: "Bedroom 1", useAsIs: "Bed", useToBe: "Sleeping A", interiorW: "10-0", interiorL: "10-0", ceilingH: "8-0", notes: "80 sqft+" },
    { level: "2F", roomId: "B201", roomName: "Bedroom 2", useAsIs: "Bed", useToBe: "Sleeping B", interiorW: "9-0", interiorL: "10-0", ceilingH: "8-0", notes: "" },
    { level: "1F", roomId: "K101", roomName: "Kitchen", useAsIs: "Kitchen", useToBe: "Kitchen", interiorW: "10-0", interiorL: "12-0", ceilingH: "8-0", notes: "" },
  ]);
  const [doors, setDoors] = useState<DoorRow[]>([
    { doorId: "D101", fromRoom: "H101", toRoom: "B101", doorType: "Interior", clearWidthIn: "32", swing: "In", thresholdIn: "0.0", lock: "No" },
    { doorId: "D201", fromRoom: "B101", toRoom: "Exterior", doorType: "Exterior", clearWidthIn: "36", swing: "Out", thresholdIn: "0.5", lock: "Yes" },
  ]);
  const [windows, setWindows] = useState<WindowRow[]>([
    { windowId: "W101", roomId: "B101", windowType: "Slider", roughWIn: "48", roughHIn: "48", sillHeightIn: "38", operable: "Yes", egressCandidate: "Yes", notes: "sill ≤44\"" },
    { windowId: "W201", roomId: "B201", windowType: "Fixed", roughWIn: "36", roughHIn: "36", sillHeightIn: "30", operable: "No", egressCandidate: "No", notes: "" },
  ]);
  const [stairs, setStairs] = useState<StairRampRow[]>([
    { elementId: "ST101", type: "Stair", location: "1F→2F", riseIn: "108", runIn: "120", widthIn: "36", landing: "Yes", notes: "" },
    { elementId: "TH101", type: "Threshold", location: "Main Entry", riseIn: "2", runIn: "-", widthIn: "-", landing: "-", notes: "" },
    { elementId: "RP101", type: "Ramp", location: "Front", riseIn: "24", runIn: "288", widthIn: "36", landing: "Yes", notes: "1:12" },
  ]);
  const [site, setSite] = useState<SiteRow>({
    lotSize: "7,500 sqft",
    setbacksKnown: "yes/no",
    drivewayParking: "2-car + street",
    utilities: "sewer/water",
    existingAdditionsSheds: "yes/no",
  });

  const [autofillQuery, setAutofillQuery] = useState("");
  const [autofillLoading, setAutofillLoading] = useState(false);
  const [autofillError, setAutofillError] = useState<string | null>(null);
  const [autofillMessage, setAutofillMessage] = useState<string | null>(null);

  const runAutofill = async () => {
    const query = autofillQuery.trim();
    if (!query) {
      setAutofillError("Enter an MLS number or address.");
      return;
    }
    setAutofillError(null);
    setAutofillMessage(null);
    setAutofillLoading(true);
    try {
      const res = await fetch(`/api/lookup-property?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setAutofillError(data.error ?? "Lookup failed.");
        return;
      }
      if (data.caseMeta) {
        setCaseMeta((prev) => ({ ...prev, ...data.caseMeta }));
      }
      if (data.site) {
        setSite((prev) => ({ ...prev, ...data.site }));
      }
      if (data.rooms?.length) {
        setRooms(data.rooms);
      }
      if (data.message) {
        setAutofillMessage(data.message);
      }
    } catch {
      setAutofillError("Lookup failed. Try again.");
    } finally {
      setAutofillLoading(false);
    }
  };

  const updateCase = (k: keyof CaseMeta, v: string | number) =>
    setCaseMeta((p) => ({ ...p, [k]: v }));

  const exportCsv = () => {
    const rows: string[] = [];
    rows.push("Section,Field,Value");
    Object.entries(caseMeta).forEach(([k, v]) => rows.push(`Case Meta,${k},${v}`));
    rooms.forEach((r) => rows.push(`Room,${r.roomId},${Object.values(r).join(",")}`));
    doors.forEach((d) => rows.push(`Door,${d.doorId},${Object.values(d).join(",")}`));
    windows.forEach((w) => rows.push(`Window,${w.windowId},${Object.values(w).join(",")}`));
    stairs.forEach((s) => rows.push(`Stair,${s.elementId},${Object.values(s).join(",")}`));
    Object.entries(site).forEach(([k, v]) => rows.push(`Site,${k},${v}`));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `entry_mode_${caseMeta.caseId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const data = { caseMeta, rooms, doors, windows, stairs, site };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `entry_mode_${caseMeta.caseId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openDrawing = () => {
    const data = { caseMeta, rooms, doors, windows, stairs, site };
    try {
      sessionStorage.setItem("afh_entry_mode", JSON.stringify(data));
      window.location.href = "/drawing";
    } catch {
      window.open("/drawing", "_blank");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Entry Mode</h1>
        <p className="text-slate-400 text-sm">
          Case meta, rooms, doors, windows, stairs/ramps, site. Export CSV/JSON for pipeline.
        </p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-2">Autofill from MLS or address</h2>
        <p className="text-slate-400 text-sm mb-3">
          Enter an MLS number or full address to fill Case Meta (and Site/Rooms when available).
        </p>
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex-1 min-w-[200px] flex flex-col gap-1">
            <span className="text-slate-400 text-sm">MLS number or address</span>
            <input
              type="text"
              value={autofillQuery}
              onChange={(e) => { setAutofillQuery(e.target.value); setAutofillError(null); setAutofillMessage(null); }}
              onKeyDown={(e) => e.key === "Enter" && runAutofill()}
              placeholder="e.g. 2606 Cooks Hill Rd, Centralia, WA or MLS #"
              className="rounded bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-500"
              disabled={autofillLoading}
            />
          </label>
          <button
            type="button"
            onClick={runAutofill}
            disabled={autofillLoading}
            className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {autofillLoading ? "Looking up…" : "Autofill"}
          </button>
        </div>
        {autofillError && (
          <p className="mt-2 text-sm text-amber-400" role="alert">{autofillError}</p>
        )}
        {autofillMessage && !autofillError && (
          <p className="mt-2 text-sm text-sky-300" role="status">{autofillMessage}</p>
        )}
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-A. Case Meta</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["caseId", "address", "county", "city", "parcelApn", "listingUrl", "asIsBedBath", "targetResidentMix", "scopeType", "assumedCodeBasis"] as const).map((k) => (
            <label key={k} className="flex flex-col gap-1">
              <span className="text-slate-400 text-sm">{k}</span>
              {k === "county" ? (
                <select
                  value={caseMeta.county}
                  onChange={(e) => updateCase("county", e.target.value as CaseMeta["county"])}
                  className="rounded bg-slate-900 border border-slate-600 px-3 py-2 text-white"
                >
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={String(caseMeta[k] ?? "")}
                  onChange={(e) => updateCase(k, e.target.value)}
                  className="rounded bg-slate-900 border border-slate-600 px-3 py-2 text-white"
                />
              )}
            </label>
          ))}
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-slate-400 text-sm">targetAfhBeds</span>
            <input
              type="number"
              min={1}
              max={6}
              value={caseMeta.targetAfhBeds}
              onChange={(e) => updateCase("targetAfhBeds", parseInt(e.target.value, 10) || 6)}
              className="rounded bg-slate-900 border border-slate-600 px-3 py-2 text-white w-24"
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-B. Levels & Rooms</h2>
        <p className="text-slate-400 text-sm mb-3">Room ID: B101 (bedroom), BA101 (bath), H101 (hall), S101 (storage).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-600">
                <th className="text-left py-2 pr-2">Level</th>
                <th className="text-left py-2 pr-2">Room ID</th>
                <th className="text-left py-2 pr-2">Room Name</th>
                <th className="text-left py-2 pr-2">Use (as-is)</th>
                <th className="text-left py-2 pr-2">Use (to-be)</th>
                <th className="text-left py-2 pr-2">W (ft-in)</th>
                <th className="text-left py-2 pr-2">L (ft-in)</th>
                <th className="text-left py-2 pr-2">Ceiling H</th>
                <th className="text-left py-2 pr-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-2 pr-2"><input value={r.level} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, level: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.roomId} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, roomId: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.roomName} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, roomName: e.target.value } : x))} className="w-24 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.useAsIs} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, useAsIs: e.target.value } : x))} className="w-20 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.useToBe} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, useToBe: e.target.value } : x))} className="w-24 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.interiorW} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, interiorW: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.interiorL} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, interiorL: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.ceilingH} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, ceilingH: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={r.notes ?? ""} onChange={(e) => setRooms((p) => p.map((x, j) => j === i ? { ...x, notes: e.target.value } : x))} className="w-20 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={() => setRooms((p) => [...p, { level: "1F", roomId: "", roomName: "", useAsIs: "", useToBe: "", interiorW: "", interiorL: "", ceilingH: "", notes: "" }])} className="mt-3 text-sm text-sky-400 hover:text-sky-300">+ Add room</button>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-C. Doors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-600">
                <th className="text-left py-2 pr-2">Door ID</th>
                <th className="text-left py-2 pr-2">From</th>
                <th className="text-left py-2 pr-2">To</th>
                <th className="text-left py-2 pr-2">Type</th>
                <th className="text-left py-2 pr-2">Width (in)</th>
                <th className="text-left py-2 pr-2">Swing</th>
                <th className="text-left py-2 pr-2">Threshold (in)</th>
                <th className="text-left py-2 pr-2">Lock</th>
              </tr>
            </thead>
            <tbody>
              {doors.map((d, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-2 pr-2"><input value={d.doorId} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, doorId: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.fromRoom} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, fromRoom: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.toRoom} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, toRoom: e.target.value } : x))} className="w-20 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.doorType} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, doorType: e.target.value } : x))} className="w-20 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.clearWidthIn} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, clearWidthIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.swing} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, swing: e.target.value } : x))} className="w-12 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.thresholdIn} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, thresholdIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={d.lock} onChange={(e) => setDoors((p) => p.map((x, j) => j === i ? { ...x, lock: e.target.value } : x))} className="w-10 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={() => setDoors((p) => [...p, { doorId: "", fromRoom: "", toRoom: "", doorType: "Interior", clearWidthIn: "32", swing: "In", thresholdIn: "0", lock: "No" }])} className="mt-3 text-sm text-sky-400 hover:text-sky-300">+ Add door</button>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-D. Windows (egress: sill ≤44&quot;)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-600">
                <th className="text-left py-2 pr-2">Window ID</th>
                <th className="text-left py-2 pr-2">Room ID</th>
                <th className="text-left py-2 pr-2">Type</th>
                <th className="text-left py-2 pr-2">W (in)</th>
                <th className="text-left py-2 pr-2">H (in)</th>
                <th className="text-left py-2 pr-2">Sill H (in)</th>
                <th className="text-left py-2 pr-2">Operable</th>
                <th className="text-left py-2 pr-2">Egress?</th>
              </tr>
            </thead>
            <tbody>
              {windows.map((w, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-2 pr-2"><input value={w.windowId} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, windowId: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.roomId} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, roomId: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.windowType} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, windowType: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.roughWIn} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, roughWIn: e.target.value } : x))} className="w-12 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.roughHIn} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, roughHIn: e.target.value } : x))} className="w-12 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.sillHeightIn} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, sillHeightIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.operable} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, operable: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={w.egressCandidate} onChange={(e) => setWindows((p) => p.map((x, j) => j === i ? { ...x, egressCandidate: e.target.value } : x))} className="w-12 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={() => setWindows((p) => [...p, { windowId: "", roomId: "", windowType: "", roughWIn: "", roughHIn: "", sillHeightIn: "", operable: "Yes", egressCandidate: "Yes", notes: "" }])} className="mt-3 text-sm text-sky-400 hover:text-sky-300">+ Add window</button>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-E. Stairs / Ramps / Thresholds</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-600">
                <th className="text-left py-2 pr-2">ID</th>
                <th className="text-left py-2 pr-2">Type</th>
                <th className="text-left py-2 pr-2">Location</th>
                <th className="text-left py-2 pr-2">Rise (in)</th>
                <th className="text-left py-2 pr-2">Run (in)</th>
                <th className="text-left py-2 pr-2">Width (in)</th>
                <th className="text-left py-2 pr-2">Landing</th>
              </tr>
            </thead>
            <tbody>
              {stairs.map((s, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="py-2 pr-2"><input value={s.elementId} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, elementId: e.target.value } : x))} className="w-16 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.type} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, type: e.target.value } : x))} className="w-20 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.location} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, location: e.target.value } : x))} className="w-24 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.riseIn} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, riseIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.runIn} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, runIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.widthIn} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, widthIn: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                  <td className="py-2 pr-2"><input value={s.landing} onChange={(e) => setStairs((p) => p.map((x, j) => j === i ? { ...x, landing: e.target.value } : x))} className="w-14 bg-slate-900 border border-slate-600 rounded px-1 py-0.5" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={() => setStairs((p) => [...p, { elementId: "", type: "Stair", location: "", riseIn: "", runIn: "", widthIn: "", landing: "Yes", notes: "" }])} className="mt-3 text-sm text-sky-400 hover:text-sky-300">+ Add element</button>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">1-F. Site / Exterior</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(site) as (keyof SiteRow)[]).map((k) => (
            <label key={k} className="flex flex-col gap-1">
              <span className="text-slate-400 text-sm">{k}</span>
              <input
                value={site[k]}
                onChange={(e) => setSite((p) => ({ ...p, [k]: e.target.value }))}
                className="rounded bg-slate-900 border border-slate-600 px-3 py-2 text-white"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <button onClick={exportCsv} className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-500">
          Export CSV
        </button>
        <button onClick={exportJson} className="rounded-lg bg-slate-600 px-4 py-2 text-white hover:bg-slate-500">
          Export JSON
        </button>
        <button onClick={openDrawing} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
          Generate 2D/3D drawing
        </button>
      </section>
    </div>
  );
}
