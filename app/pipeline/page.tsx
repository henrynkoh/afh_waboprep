"use client";

import { useState } from "react";
import {
  COMPLIANCE_PROMPT,
  DESIGN_PROMPT,
  PERMIT_OPS_PROMPT,
  RED_TEAM_PROMPT,
  fillPrompt,
} from "@/lib/agent-prompts";
import {
  CASE_FOLDER_STRUCTURE,
  CENTRALIA_PACKET_ITEMS,
  getCasePath,
  getExportZipName,
} from "@/lib/case-folder";

const RUN_TEMPLATE = `Start new case pipeline.

CASE:
- case_id: {case_id}
- city: Centralia
- county: Lewis
- target: 6-bed AFH conversion, scope limited to initial inspection approval

INPUT FILES:
- /cases/{case_id}/00_admin/entry_mode.csv
- /cases/{case_id}/00_admin/case_meta.json

TASK ORDER:
1) Create folder structure if missing.
2) Run Compliance Gate 1 -> write /02_compliance/compliance_report_v1.md and constraints_v1.json
3) Run Design -> write /03_design/*_v1.* outputs (planA/B/C, schedules, notes, drawing spec)
4) Run Permit Ops -> assemble /05_permit_packet/CITY_Centralia/*_v1.*
5) Run Red-Team -> /06_redteam/*_v1.*
6) If Go, produce exports zip/pdf into /07_exports/
7) If No-Go, output a prioritized revision task list and stop.

OUTPUT REQUIREMENTS:
- Every file must follow naming convention with _v1.
- Provide a short run log summary at the end.`;

export default function PipelinePage() {
  const [city, setCity] = useState("Centralia");
  const [county, setCounty] = useState("Lewis");
  const [caseId, setCaseId] = useState("centralia_2606_cooks_hill_rd");
  const [activeTab, setActiveTab] = useState<"prompts" | "folder" | "run">("prompts");

  const prompts = [
    { name: "Compliance", text: fillPrompt(COMPLIANCE_PROMPT, city, county) },
    { name: "Design", text: fillPrompt(DESIGN_PROMPT, city, county) },
    { name: "Permit Ops", text: fillPrompt(PERMIT_OPS_PROMPT, city, county) },
    { name: "Red-Team", text: fillPrompt(RED_TEAM_PROMPT, city, county) },
  ];

  const runText = RUN_TEMPLATE.replace(/\{case_id\}/g, caseId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Pipeline</h1>
        <p className="text-slate-400 text-sm">
          AI agent orchestration: Compliance → Design → Permit Ops → Red-Team. Copy prompts and run template into Moltbot/Clawdbot or your AI runner.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">City</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} className="rounded bg-slate-800 border border-slate-600 px-2 py-1 text-sm w-28" />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">County</span>
          <input value={county} onChange={(e) => setCounty(e.target.value)} className="rounded bg-slate-800 border border-slate-600 px-2 py-1 text-sm w-28" />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Case ID</span>
          <input value={caseId} onChange={(e) => setCaseId(e.target.value)} className="rounded bg-slate-800 border border-slate-600 px-2 py-1 text-sm w-48" />
        </label>
      </div>

      <div className="flex gap-2 border-b border-slate-700 pb-2">
        <button onClick={() => setActiveTab("prompts")} className={activeTab === "prompts" ? "text-sky-400 font-medium" : "text-slate-400 hover:text-white"}>Prompts</button>
        <button onClick={() => setActiveTab("folder")} className={activeTab === "folder" ? "text-sky-400 font-medium" : "text-slate-400 hover:text-white"}>Folder structure</button>
        <button onClick={() => setActiveTab("run")} className={activeTab === "run" ? "text-sky-400 font-medium" : "text-slate-400 hover:text-white"}>Run template</button>
      </div>

      {activeTab === "prompts" && (
        <div className="space-y-4">
          {prompts.map(({ name, text }) => (
            <section key={name} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
              <h2 className="text-lg font-semibold text-sky-300 mb-2">{name} Agent</h2>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto max-h-64 overflow-y-auto">{text}</pre>
              <button type="button" onClick={() => navigator.clipboard.writeText(text)} className="mt-2 text-sm text-sky-400 hover:text-sky-300">Copy to clipboard</button>
            </section>
          ))}
        </div>
      )}

      {activeTab === "folder" && (
        <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-lg font-semibold text-sky-300 mb-3">Case folder structure</h2>
          <p className="text-slate-400 text-sm mb-4">Path: <code className="text-sky-300">{getCasePath(caseId)}</code></p>
          <pre className="text-xs text-slate-300 font-mono">
{`/AFH_INSPECTION_PIPELINE/
  /cases/
    /${caseId}/
${CASE_FOLDER_STRUCTURE.map((d) => `       ${d}/`).join("\n")}
      05_permit_packet/
        CITY_Centralia/
          A00_Cover_v1.pdf
          A01_FloorPlans_v1.pdf
          A02_EgressPlan_v1.pdf
          A03_Schedules_v1.pdf
          S01_Scope_Spec_Estimate_v1.pdf
          DSHS_15-604_v1.pdf
      07_exports/
        ${getExportZipName(caseId, 1)}`}
          </pre>
          <h3 className="text-sm font-semibold text-sky-300 mt-4 mb-2">Centralia packet items</h3>
          <ul className="text-slate-400 text-sm list-disc list-inside">
            {CENTRALIA_PACKET_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "run" && (
        <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-lg font-semibold text-sky-300 mb-2">Moltbot / Clawdbot run message</h2>
          <p className="text-slate-400 text-sm mb-3">Paste this into <code className="text-sky-300">moltbot agent --message &quot;...&quot; --thinking high</code> (escape quotes as needed).</p>
          <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono bg-slate-900 rounded p-4 overflow-x-auto">{runText}</pre>
          <button type="button" onClick={() => navigator.clipboard.writeText(runText)} className="mt-3 text-sm text-sky-400 hover:text-sky-300">Copy to clipboard</button>
        </section>
      )}
    </div>
  );
}
