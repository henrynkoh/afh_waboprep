import { CENTRALIA_PACKET_ITEMS } from "@/lib/case-folder";
import Link from "next/link";

export default function CentraliaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Centralia Packet</h1>
        <p className="text-slate-400 text-sm">
          Residential permit checklist, DSHS 15-604, site plan, floor plans, cover letter templates for City of Centralia & Lewis County.
        </p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Required submittal (Centralia)</h2>
        <p className="text-slate-400 text-sm mb-4">
          Submit to Community Development: completed Building Application, completed Residential Permit Checklist, verifiable Contractor Registration, three (3) copies of all plans. Electrical permits: WA State L&I (360) 902-5269.
        </p>
        <ul className="text-slate-300 text-sm list-decimal list-inside space-y-2">
          {CENTRALIA_PACKET_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Packet contents (auto-generated)</h2>
        <ul className="text-slate-400 text-sm space-y-1 font-mono">
          <li>A00_Cover_v1.pdf</li>
          <li>A01_FloorPlans_v1.pdf — all floors, 1/4&quot;=1&apos;, room labels, door/window dims</li>
          <li>A02_EgressPlan_v1.pdf — A–F, Type S/NS1/NS2</li>
          <li>A03_Schedules_v1.pdf — door/window schedule, sill ≤44&quot; check</li>
          <li>S01_Scope_Spec_Estimate_v1.pdf — scope, spec, valuation (permit value)</li>
          <li>DSHS_15-604_v1.pdf — Sections 1–4 + 8.5×11 floor plan</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">References</h2>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>
            <a href="https://www.cityofcentralia.com/205/Building-Forms-Applications" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">City of Centralia — Building Forms & Applications</a>
          </li>
          <li>
            <a href="https://www.cityofcentralia.com/DocumentCenter/View/145/Residential-Permit-Checklist-PDF" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Residential Permit Checklist (PDF)</a>
          </li>
          <li>
            <a href="https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">DSHS — AFH Building Inspections</a>
          </li>
          <li>
            <a href="https://www.dshs.wa.gov/sites/default/files/forms/word/15-604.docx" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">DSHS 15-604 (Word)</a>
          </li>
          <li>
            <a href="https://www.wabo.org/find-your-bo" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO — Find Your Building Official</a>
          </li>
        </ul>
      </section>

      <p className="text-slate-400 text-sm">
        Use <Link href="/entry-mode" className="text-sky-400 hover:underline">Entry Mode</Link> and <Link href="/pipeline" className="text-sky-400 hover:underline">Pipeline</Link> to produce these documents; then <Link href="/case-study" className="text-sky-400 hover:underline">Case Study: 2606 Cooks Hill Rd</Link> for a full example.
      </p>
    </div>
  );
}
