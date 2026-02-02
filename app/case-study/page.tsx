import Link from "next/link";
import { CENTRALIA_PACKET_ITEMS } from "@/lib/case-folder";

const ADDRESS = "2606 Cooks Hill Rd, Centralia, WA 98531";
const CASE_ID = "centralia_2606_cooks_hill_rd";

export default function CaseStudyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Case Study: 2606 Cooks Hill Rd</h1>
        <p className="text-slate-400 text-sm">
          Single-family home, Centralia 98531 (Lewis County). As-is → to-be 6-bed WABO-ready AFH; permit packet for City of Centralia & Lewis County.
        </p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Subject property</h2>
        <p className="text-slate-300 font-mono">{ADDRESS}</p>
        <p className="text-slate-400 text-sm mt-2">Case ID: <code>{CASE_ID}</code></p>
        <p className="text-slate-400 text-sm mt-2">
          Use <Link href="/entry-mode" className="text-sky-400 hover:underline">Entry Mode</Link> with this address (pre-filled) to enter as-is dimensions, doors, windows, stairs, and site data. Pipeline will produce compliance report, Plan A/B/C, schedules, and Centralia packet.
        </p>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Entry Mode → outputs</h2>
        <p className="text-slate-400 text-sm mb-4">
          With Entry Mode filled (and any missing data noted by Compliance), the pipeline produces:
        </p>
        <ul className="text-slate-300 text-sm list-disc list-inside space-y-1">
          <li>02_compliance: compliance_report_v1.md, constraints_v1.json</li>
          <li>03_design: planA/B/C, drawing_package_spec, schedules, notes_for_inspection</li>
          <li>04_3d: isometric_v1 (for inspector communication)</li>
          <li>05_permit_packet/CITY_Centralia: cover, floor plans, egress plan, schedules, scope/spec, DSHS 15-604</li>
          <li>06_redteam: inspector_questions, correction_notice_sim → Go/No-Go</li>
          <li>07_exports: Centralia_SubmittalPacket_centralia_2606_cooks_hill_rd_v1.zip / .pdf</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Centralia submission (this case)</h2>
        <p className="text-slate-400 text-sm mb-3">
          Documents to submit to City of Centralia (Building Division) for this property:
        </p>
        <ol className="text-slate-300 text-sm list-decimal list-inside space-y-1">
          {CENTRALIA_PACKET_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="text-slate-400 text-sm mt-4">
          Contact: Centralia Community Development, (360) 330-7662; Building Inspection (360) 330-7663. Submit via city portal or in person (118 W Maple St, Centralia WA 98531).
        </p>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Drawing requirements (WABO / WAC)</h2>
        <p className="text-slate-400 text-sm mb-2">
          Each drawing component must meet WABO/DSHS/WAC and IRC R330:
        </p>
        <ul className="text-slate-300 text-sm list-disc list-inside space-y-1">
          <li>Floor plan: scale ≥ 1/4&quot;=1&apos;, sleeping rooms A–F, exit components (stairs, ramps, platforms)</li>
          <li>Sleeping room classification: Type S / NS1 / NS2</li>
          <li>Door/window schedule: clear width, sill height (≤44&quot; for egress)</li>
          <li>Life-safety notes: smoke/CO alarms, egress paths</li>
        </ul>
        <p className="text-slate-400 text-sm mt-3">
          The app and pipeline are designed so that ~80% of drawing-related work is done by design agents (floor plan → isometric → schedules → packet); you supply Entry Mode data and run the pipeline.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/entry-mode" className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-500 text-sm">Open Entry Mode (pre-fill this address)</Link>
        <Link href="/pipeline" className="rounded-lg bg-slate-600 px-4 py-2 text-white hover:bg-slate-500 text-sm">Open Pipeline (run case)</Link>
        <Link href="/centralia" className="rounded-lg border border-slate-600 px-4 py-2 text-slate-300 hover:bg-slate-700 text-sm">Centralia Packet templates</Link>
      </div>
    </div>
  );
}
