import { CURRICULUM_WEEKS } from "@/lib/curriculum";
import { SITE_CONFIG } from "@/lib/broker-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Curriculum — ${SITE_CONFIG.appName}`,
  description: "8-week consultant curriculum: AFH Initial Inspection Prep (WAC, DSHS 15-604, floor plan → isometric → packet).",
};

export default function CurriculumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Curriculum</h1>
        <p className="text-slate-400 text-sm">
          8-week course for prospective consultants/advisors: from Entry Mode to initial inspection pass. Use Moltbot/Clawdbot and design agents to handle paperwork (WAC, DSHS 15-604, best practices).
        </p>
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-4">Scope</h2>
        <p className="text-slate-300 text-sm mb-2">
          Single complete curriculum to teach a class of prospective consultant/advisor/concierge whose job is to walk through from start to finish <strong>limited to getting the initial inspection approved</strong>: what to prepare, how to prepare, in compliance with AFH Initial Inspection Preparation Checklist.
        </p>
        <p className="text-slate-400 text-sm">
          Order of processing: floor plan → isometric → mixboard → NotebookLM → city permit application. Most tasks done by AI design agent; reduce manual work.
        </p>
      </section>

      <div className="space-y-6">
        {CURRICULUM_WEEKS.map((week, i) => (
          <section key={i} className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <h2 className="text-lg font-semibold text-sky-300 mb-3">{week.title}</h2>
            <ul className="text-slate-300 text-sm list-disc list-inside mb-3">
              {week.topics.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm">
              <strong>Assignment:</strong> {week.assignment}
            </p>
          </section>
        ))}
      </div>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">Tools</h2>
        <p className="text-slate-300 text-sm mb-2">
          Emphasize use of personal AI assistant (Clawdbot, Moltbot, design agents) for time-consuming tasks: Entry Mode data entry, compliance checks, drawing specs, packet assembly, red-team Q&A.
        </p>
        <ul className="text-slate-400 text-sm list-disc list-inside">
          <li>Moltbot/Clawdbot: agent messages, gateway, status, doctor, logs</li>
          <li>Design agents: 2D floor plan → isometric; schedules; notes for inspection</li>
          <li>NotebookLM / Mixboard: narrative and document packaging for permit story</li>
        </ul>
      </section>
    </div>
  );
}
