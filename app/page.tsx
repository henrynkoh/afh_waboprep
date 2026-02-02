"use client";

import Link from "next/link";

// GitHub repo URL (landing page bottom-right link)
const GITHUB_REPO_URL = "https://github.com/henrynkoh/afh_waboprep";

// WABO resource: member directory / local inspector approved by WABO
const WABO_MEMBER_DIRECTORY_URL =
  "https://www.wabo.org/index.php?option=com_community&view=profile&userid=2003340008&module=view-all&uuid=b962d32b-cf12-41b0-ba96-e35f282e22fd&current_page=0&directory_search_id=2001467#/profile";

const SECTIONS = [
  { id: "hero", label: "Welcome" },
  { id: "quick-access", label: "Quick Access" },
  { id: "features", label: "Features" },
  { id: "available-workflows", label: "Available Workflows" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "pipeline", label: "Pipeline" },
  { id: "drawing", label: "Drawing" },
  { id: "curriculum", label: "Curriculum" },
  { id: "qa", label: "Top 100 Q&A" },
  { id: "centralia", label: "Centralia Packet" },
  { id: "case-study", label: "Case Study" },
  { id: "more-on-permit", label: "More on AFH Permit" },
  { id: "inspection-focus", label: "Inspection Prep Focus" },
  { id: "moltbot", label: "Moltbot / Clawdbot" },
  { id: "jurisdictions", label: "Participating Jurisdictions" },
  { id: "when-to-contact", label: "When to Contact Jurisdiction" },
  { id: "view-request-cancel-inspection", label: "View, Request, or Cancel Inspection" },
  { id: "get-started", label: "Get Started" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left sidebar — fixed, scrollable nav */}
      <aside className="fixed left-0 top-0 z-20 h-screen w-56 shrink-0 border-r border-slate-700/80 bg-slate-900/95 backdrop-blur-sm lg:w-64">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-700/80 px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-white">
              AFH <span className="text-sky-400">WABO</span> Prep
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <ul className="space-y-0.5">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content — scrollable */}
      <main className="min-h-screen flex-1 pl-56 lg:pl-64">
        {/* Hero — Welcome (MBP-style) */}
        <section
          id="hero"
          className="relative overflow-hidden border-b border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 px-6 py-20 sm:px-10 md:py-28"
        >
          {/* Blueprint-style graphic (right side) */}
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20" aria-hidden>
            <div className="absolute inset-0 border-l border-sky-400/50" />
            <div className="absolute right-0 top-1/4 h-px w-2/3 bg-sky-400/30" />
            <div className="absolute right-0 top-1/2 h-px w-1/2 bg-sky-400/30" />
            <div className="absolute right-1/4 top-1/3 h-24 w-px bg-sky-400/30" />
            <div className="absolute right-1/3 top-2/3 h-16 w-px bg-sky-400/30" />
            <div className="absolute right-8 top-1/4 h-12 w-12 rounded border border-sky-400/40" />
            <div className="absolute right-16 top-1/2 h-8 w-8 rounded border border-emerald-400/40" />
          </div>
          <div className="relative mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to <span className="text-sky-400">AFH WABO Prep</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl">
              One-stop portal for AFH development: Entry Mode data, 2D/3D floor plans, inspection prep, permit packet assembly, and tip sheets for Lewis, Thurston & Pierce counties (WA). Find a single-family home, convert to a WABO-ready 6-bed Adult Family Home, and pass local Building Official initial inspection for DSHS AFH license.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/entry-mode"
                className="inline-flex items-center rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
              >
                Open Entry Mode
              </Link>
              <button
                type="button"
                onClick={() => scrollTo("quick-access")}
                className="inline-flex items-center rounded-xl border border-slate-500 bg-slate-800/80 px-6 py-3 font-semibold text-slate-200 transition hover:border-sky-500/50 hover:bg-slate-800"
              >
                Quick Access
              </button>
            </div>
          </div>
        </section>

        {/* Quick Access tiles (MBP-style) */}
        <section id="quick-access" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-800/60 px-6 py-12 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-xl font-bold text-white sm:text-2xl">Quick Access</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickTile href="/entry-mode" icon="form" title="Apply for Permit" desc="Entry Mode: case meta, rooms, doors, windows, site. Export CSV/JSON." />
              <QuickTile href="/drawing" icon="draw" title="View My Drawing" desc="2D floor plan and 3D isometric from your data. Export SVG for permit." />
              <QuickTile href="/pipeline" icon="dashboard" title="View My Pipeline" desc="AI agents: Compliance → Design → Permit Ops → Red-Team. Run template." />
              <QuickTile href="/centralia" icon="clock" title="Inspection Prep" desc="Centralia packet, DSHS 15-604, checklist. Schedule inspection prep." />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Features</h2>
            <p className="mb-10 text-slate-400">Everything you need from Entry Mode to permit packet: data entry, 2D/3D drawing generation, AI pipeline prompts, curriculum, Q&A bank, Centralia submittal list, and case study. Use the app to prepare your AFH building inspection and permit application without hiring a consultant for every step.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard title="Entry Mode" href="/entry-mode" desc="Case meta, rooms, doors, windows, stairs, site. Export CSV/JSON." color="sky" />
              <FeatureCard title="Drawing (2D/3D)" href="/drawing" desc="Floor plan + isometric from your data. Export SVG for permit." color="emerald" />
              <FeatureCard title="Pipeline" href="/pipeline" desc="AI agents: Compliance → Design → Permit Ops → Red-Team." color="violet" />
              <FeatureCard title="Curriculum" href="/curriculum" desc="8-week consultant course: inspection prep, WAC/DSHS 15-604." color="amber" />
              <FeatureCard title="Top 100 Q&A" href="/qa" desc="WAC, RCW, best practices. Filter by category." color="rose" />
              <FeatureCard title="Centralia Packet" href="/centralia" desc="Required submittal list, doc names, City/DSHS/WABO links." color="cyan" />
              <FeatureCard title="Case Study" href="/case-study" desc="2606 Cooks Hill Rd: subject property, packet checklist." color="fuchsia" />
            </div>
          </div>
        </section>

        {/* Available Workflows (MBP-style: Application Types) */}
        <section id="available-workflows" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-cyan-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Available Workflows</h2>
            <p className="mb-10 text-slate-400">You can run over-the-counter–style (no plan review) and plan-review workflows for the following. Each links to a dedicated page or pipeline step.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2 text-slate-300">
                {["Entry Mode (case meta, rooms, doors, windows)", "Drawing 2D/3D (floor plan, isometric)", "Pipeline (Compliance, Design, Permit Ops, Red-Team)", "Curriculum (8-week consultant course)", "Top 100 Q&A (WAC, RCW, best practices)", "Centralia Packet (submittal list, DSHS 15-604)"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-slate-300">
                {["Case Study (2606 Cooks Hill Rd)", "Compliance Gate 1 & 2 (WAC, DSHS checklist)", "Permit Packet Assembly (cover letter, checklist)", "Inspection Prep Focus (inspection checklist)", "Moltbot / Clawdbot run template", "Participating Jurisdictions (Lewis, Thurston, Pierce)"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* AI Agents */}
        <section id="ai-agents" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-violet-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">AI Agent Org Chart</h2>
            <p className="mb-10 text-slate-400">Tasks mapped to agent roles — run via Moltbot/Clawdbot or your AI runner.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Strategy / Vision", role: "Target area, supply/demand, listing filters", dot: "bg-amber-400" },
                { name: "Research & Compliance", role: "WAC, DSHS 15-604, WABO; Compliance Gate 1/2", dot: "bg-sky-400" },
                { name: "Acquisition", role: "Listings (Lewis/Thurston/Pierce), as-is vs to-be", dot: "bg-emerald-400" },
                { name: "Design & Drafting", role: "As-is → to-be 6-bed, 2D/3D, schedules, isometric", dot: "bg-violet-400" },
                { name: "Permit Ops", role: "Centralia packet, checklist, cover letter", dot: "bg-rose-400" },
                { name: "QA / Red-Team", role: "Inspector POV, correction notices, Go/No-Go", dot: "bg-cyan-400" },
              ].map((item) => (
                <div key={item.name} className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 transition hover:border-slate-600">
                  <span className={`mb-2 inline-block h-2 w-2 rounded-full ${item.dot}`} />
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Pipeline</h2>
            <p className="mb-10 text-slate-400">Run the full workflow: Case bootstrap → Compliance Gate 1 → Design (Plan A/B/C) → Compliance Gate 2 → 2D→3D → Permit packet assembly → Red-Team QA → Export. Copy the built-in prompts (Compliance, Design, Permit Ops, Red-Team) and the run template into Moltbot/Clawdbot or your AI runner to automate most of the steps.</p>
            <div className="flex flex-wrap gap-2">
              {["Case bootstrap", "Compliance Gate 1", "Design (Plan A/B/C)", "Compliance Gate 2", "2D→3D", "Permit packet", "Red-Team QA", "Export"].map((step, i) => (
                <span key={step} className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
                  {i + 1}. {step}
                </span>
              ))}
            </div>
            <Link href="/pipeline" className="mt-6 inline-flex rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
              Open Pipeline →
            </Link>
          </div>
        </section>

        {/* Drawing */}
        <section id="drawing" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-emerald-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Drawing (2D / 3D)</h2>
            <p className="mb-6 text-slate-400">Generate a floor plan (2D) and isometric view (3D) directly from your Entry Mode data. Sleeping rooms are labeled A–F; doors and windows are placed from your input. Export SVG for your permit packet and for submission to the city (e.g. Centralia). One click from Entry Mode takes you to the Drawing page with data loaded.</p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
              <p className="text-slate-300">Entry Mode data → 2D floor plan (rooms A–F, doors, windows, dimensions) + 3D isometric (boxes per room). Scale and labels meet WABO/DSHS 15-604 expectations. Use &quot;Generate 2D/3D drawing&quot; on the Entry Mode page to open Drawing with your data.</p>
              <Link href="/drawing" className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
                Open Drawing →
              </Link>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Curriculum</h2>
            <p className="mb-10 text-slate-400">8-week consultant course: pass definition → Entry Mode → compliance → 2D → to-be → 2D→3D → packet → red-team.</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {["Week 1: Pass definition & DSHS 15-604", "Week 2: Entry Mode (dimensions, egress)", "Week 3: Compliance Gate 1", "Week 4: As-is 2D + labeling", "Week 5: To-be 6-bed + egress", "Week 6: 2D→3D isometric, scope/spec", "Week 7: Centralia packet", "Week 8: Mock inspection + revision"].map((w) => (
                <li key={w} className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-300">
                  {w}
                </li>
              ))}
            </ul>
            <Link href="/curriculum" className="mt-6 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500">
              Open Curriculum →
            </Link>
          </div>
        </section>

        {/* Q&A */}
        <section id="qa" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-rose-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Top 100 Q&A</h2>
            <p className="mb-6 text-slate-400">AFH initial inspection prep: WAC, RCW, DSHS 15-604, best practices. Filter by category.</p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
              <p className="text-slate-300">Categories: DSHS 15-604, Sleeping room classification, Bedroom/window, Centralia submittal, Fail cases, Process.</p>
              <Link href="/qa" className="mt-4 inline-flex rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500">
                Open Q&A →
              </Link>
            </div>
          </div>
        </section>

        {/* Centralia */}
        <section id="centralia" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Centralia Packet</h2>
            <p className="mb-6 text-slate-400">Required submittal list and document names for City of Centralia & Lewis County.</p>
            <ul className="list-inside list-disc space-y-1 text-slate-300">
              <li>Building Permit Application (Centralia form)</li>
              <li>Residential Permit Checklist</li>
              <li>DSHS 15-604 (Sections 1–4 + 8.5×11 floor plan)</li>
              <li>Site plan, floor plans, egress plan, schedules</li>
              <li>Scope of Work + valuation</li>
            </ul>
            <Link href="/centralia" className="mt-6 inline-flex rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500">
              Open Centralia Packet →
            </Link>
          </div>
        </section>

        {/* Case Study */}
        <section id="case-study" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-fuchsia-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Case Study: 2606 Cooks Hill Rd</h2>
            <p className="mb-6 text-slate-400">Centralia 98531 (Lewis County). As-is → to-be 6-bed AFH; permit packet for City of Centralia.</p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
              <p className="font-mono text-sky-300">2606 Cooks Hill Rd, Centralia, WA 98531</p>
              <p className="mt-2 text-slate-300">Use Entry Mode with this address, run Pipeline, assemble Centralia packet. Same flow for any property.</p>
              <Link href="/case-study" className="mt-4 inline-flex rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500">
                Open Case Study →
              </Link>
            </div>
          </div>
        </section>

        {/* More Information on AFH Permit (MBP-style) */}
        <section id="more-on-permit" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">More Information on AFH Permit</h2>
            <p className="mb-10 text-slate-400">Additional information on permitting and inspection prep can be found in the app pages and using the following links. Use the Resources and Help menu in the header for quick navigation.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2">
                {[
                  { label: "Why Permits & Inspection Matter", href: "/curriculum" },
                  { label: "Getting Started (Quick Start)", href: "/entry-mode" },
                  { label: "DSHS 15-604 Checklist", href: "https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections" },
                  { label: "WABO — Find Your Building Official", href: "https://www.wabo.org/find-your-bo" },
                  { label: "WABO Member Directory — Local Inspector (approved by WABO)", href: WABO_MEMBER_DIRECTORY_URL },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline hover:text-sky-300">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {[
                  { label: "Centralia Residential Checklist", href: "/centralia" },
                  { label: "Inspection Checklist (Top 100 Q&A)", href: "/qa" },
                  { label: "Construction / AFH Tip Sheet", href: "/curriculum" },
                  { label: "Electronic Standards (Drawing 2D/3D)", href: "/drawing" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sky-400 underline hover:text-sky-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Inspection Prep Focus (MBP-style: Today's Inspections) */}
        <section id="inspection-focus" className="scroll-mt-20 border-b border-slate-700/60 bg-gradient-to-br from-slate-900 to-amber-950/20 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Inspection Prep Focus</h2>
                <p className="mb-6 text-slate-400">Prepare for your local Building Official initial inspection: complete Entry Mode, generate 2D/3D drawing, run Compliance Gate 1, and assemble the permit packet. Use the Curriculum and Top 100 Q&A to study WAC, DSHS 15-604, and best practices before the inspector visit.</p>
                <Link href="/qa" className="inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500">
                  Open Inspection Q&A →
                </Link>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-6">
                <h3 className="mb-2 font-semibold text-white">Next steps</h3>
                <p className="mb-4 text-sm text-slate-400">See the key actions for inspection prep and permit submission.</p>
                <Link href="/centralia" className="block w-full rounded-lg bg-sky-600 py-3 text-center text-sm font-medium text-white hover:bg-sky-500">
                  Centralia Packet & Checklist
                </Link>
                <Link href="/drawing" className="mt-3 block w-full rounded-lg border border-slate-600 py-3 text-center text-sm font-medium text-slate-300 hover:bg-slate-700">
                  Generate 2D/3D Drawing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Moltbot */}
        <section id="moltbot" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Moltbot / Clawdbot</h2>
            <p className="mb-6 text-slate-400">Top commands for running the pipeline with Moltbot/Clawdbot.</p>
            <pre className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-xs text-slate-300 sm:text-sm">
{`moltbot onboard --install-daemon
moltbot gateway --port 18789 --verbose
moltbot status --all
moltbot models status
moltbot doctor --deep
moltbot agent --message "Start case: ..." --thinking high`}
            </pre>
            <Link href="/pipeline" className="mt-4 inline-flex rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-500">
              Copy prompts & run template →
            </Link>
          </div>
        </section>

        {/* Participating Jurisdictions (MBP-style) */}
        <section id="jurisdictions" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Participating Jurisdictions</h2>
            <p className="mb-10 text-slate-400">AFH WABO Prep supports permit and inspection prep for single-family home conversions to Adult Family Homes in the following counties and cities. Building officials and permit requirements may vary by jurisdiction; use WABO to find your local official and confirm checklist requirements.</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                <h3 className="mb-3 font-semibold text-sky-300">Counties</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>Lewis County</li>
                  <li>Thurston County</li>
                  <li>Pierce County</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                <h3 className="mb-3 font-semibold text-sky-300">Cities (examples)</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>Centralia</li>
                  <li>Chehalis</li>
                  <li>Lacey</li>
                  <li>Tumwater</li>
                  <li>Olympia</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
                <h3 className="mb-3 font-semibold text-sky-300">References</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="https://www.wabo.org/find-your-bo" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO — Find Your BO</a>
                  </li>
                  <li>
                    <a href={WABO_MEMBER_DIRECTORY_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO Member Directory — Local Inspector (approved by WABO)</a>
                  </li>
                  <li>
                    <a href="https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">DSHS AFH Building Inspections</a>
                  </li>
                  <li>
                    <Link href="/centralia" className="text-sky-400 hover:underline">Centralia Packet (this app)</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* When to Contact the Jurisdiction */}
        <section id="when-to-contact" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 text-slate-400">
              This page contains information to help you navigate when to seek jurisdiction assistance, adding users to your application, and technical issues.
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-600">
              <div className="bg-sky-600 px-6 py-4 text-center">
                <h2 className="text-xl font-bold text-white">When to Contact the Jurisdiction</h2>
              </div>
              <div className="bg-slate-800/80 px-6 py-6">
                <p className="mb-4 text-slate-300">
                  <a
                    href="https://www.wabo.org/find-your-bo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline hover:text-sky-300"
                  >
                    Contact the jurisdiction
                  </a>
                  {" "}when you need to:
                </p>
                <ul className="list-inside list-disc space-y-2 text-slate-300">
                  <li>Determine if a Permit is Required</li>
                  <li>Inquire about Plan Review and Permit Issuance Timelines</li>
                  <li>Request a Refund</li>
                  <li>Update a City Business License</li>
                  <li>Change or Update Permit Applicant, Contractor, or Delegate</li>
                  <li>Request Permit Changes</li>
                  <li>Remove an Applicant No Longer Associated with Permit</li>
                  <li>Inquire About Permit Fees</li>
                </ul>
                <p className="mt-6 text-sm text-slate-400">
                  For AFH-specific inspection and licensing, also contact{" "}
                  <a href="https://www.dshs.wa.gov/altsa/residential-care-services/afh-building-inspections" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">DSHS AFH Building Inspections</a>{" "}
                  for local building official requirements and checklist questions. To check with a local inspector approved by WABO, use the{" "}
                  <a href={WABO_MEMBER_DIRECTORY_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO Member Directory</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* View, Request, or Cancel an Inspection */}
        <section id="view-request-cancel-inspection" className="scroll-mt-20 border-b border-slate-700/60 bg-slate-900/50 px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">View, Request, or Cancel an Inspection</h2>
            <p className="mb-8 text-slate-400">
              Use your jurisdiction&apos;s portal (e.g. <a href="https://www.mybuildingpermit.com/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">MyBuildingPermit.com</a>) to view, request, or cancel building permit inspections. Before scheduling, prepare with AFH WABO Prep: <Link href="/entry-mode" className="text-sky-400 hover:underline">Entry Mode</Link>, <Link href="/drawing" className="text-sky-400 hover:underline">2D/3D Drawing</Link>, and <Link href="/centralia" className="text-sky-400 hover:underline">Centralia Packet</Link>.
            </p>

            <div className="space-y-8 rounded-xl border border-slate-600 bg-slate-800/60 p-6">
              <div>
                <h3 className="mb-3 font-semibold text-sky-300">Finding an Inspection (Steps 1–4)</h3>
                <ol className="list-inside list-decimal space-y-2 text-slate-300">
                  <li>Go to the jurisdiction&apos;s home page (e.g. MyBuildingPermit.com) and click <strong>Schedule Inspections</strong>.</li>
                  <li><strong>Select Jurisdiction</strong> from the drop-down. <span className="text-slate-400">Note: No other information can be entered until a Jurisdiction is selected.</span></li>
                  <li>Select search method: <strong>By Permit Number</strong> (must be an exact match, including dashes/spaces) or <strong>By Address</strong> (can be partial; system searches for similar matches).</li>
                  <li>Click <strong>Search</strong>. <span className="text-slate-400">Note: Results only display permits that have at least one inspection already scheduled or available to be scheduled. Contact the jurisdiction for other questions.</span></li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-sky-300">View Scheduled Inspections (Steps 5–6)</h3>
                <ol className="list-inside list-decimal space-y-2 text-slate-300" start={5}>
                  <li>Click the hyperlinked <strong>Permit Number</strong> in the search results to open the <strong>Inspection Details</strong> page.</li>
                  <li>A list of all scheduled inspections displays.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-sky-300">Requesting an Inspection (Steps 7–10)</h3>
                <ol className="list-inside list-decimal space-y-2 text-slate-300" start={7}>
                  <li>On the Inspection Details screen, select the desired <strong>Inspection Date</strong> from the options available. <span className="text-slate-400">Note: Some jurisdictions allow a Time Preference; select if available.</span></li>
                  <li>If applicable, enter a brief message to the Inspector.</li>
                  <li>Complete the <strong>Inspection Site Contact</strong> information at the bottom of the page.</li>
                  <li>Click <strong>Submit Inspection Request</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-sky-300">Canceling an Inspection (Steps 11–14)</h3>
                <ol className="list-inside list-decimal space-y-2 text-slate-300" start={11}>
                  <li>On the Inspection Details screen, identify the correct inspection to cancel under <strong>Scheduled Inspections</strong>.</li>
                  <li>In the <strong>How to Cancel</strong> column, click <strong>Cancel Online</strong>. <span className="text-slate-400">Note: If the inspection is scheduled for today, contact the jurisdiction directly to cancel; phone numbers are in the How to Cancel column.</span></li>
                  <li>Acknowledge the pop-up message asking to confirm the cancellation.</li>
                  <li>A confirmation page will appear; print for your records.</li>
                </ol>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              For AFH initial building inspection, your local building official (see <a href="https://www.wabo.org/find-your-bo" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO Find Your BO</a>) or <a href={WABO_MEMBER_DIRECTORY_URL} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">WABO Member Directory — local inspector approved by WABO</a>; jurisdiction portal may differ—confirm the exact steps with your jurisdiction.
            </p>
          </div>
        </section>

        {/* Get Started */}
        <section id="get-started" className="scroll-mt-20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Get started</h2>
            <p className="mt-4 text-slate-400">Enter your property data in Entry Mode, generate a 2D/3D drawing, run the Pipeline with AI prompts, and assemble your permit packet. Use the Curriculum and Top 100 Q&A to prepare for the local Building Official inspection. For a full walkthrough, see the Manual and Tutorial in the docs.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/entry-mode" className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-400">
                Entry Mode
              </Link>
              <Link href="/drawing" className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500">
                Drawing
              </Link>
              <Link href="/pipeline" className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500">
                Pipeline
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom right — GitHub link */}
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3 text-sm font-medium text-slate-200 shadow-lg backdrop-blur-sm transition hover:border-sky-500/50 hover:bg-slate-800 hover:text-white"
        aria-label="Open on GitHub"
      >
        <GitHubIcon className="h-5 w-5" />
        <span>GitHub</span>
      </a>
    </div>
  );
}

function QuickTile({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: "form" | "draw" | "dashboard" | "clock";
  title: string;
  desc: string;
}) {
  const Icon = icon === "form" ? IconForm : icon === "draw" ? IconDraw : icon === "dashboard" ? IconDashboard : IconClock;
  return (
    <Link
      href={href}
      className="flex flex-col rounded-xl border border-slate-600 bg-slate-800/80 p-6 transition hover:border-sky-500/50 hover:bg-slate-800"
    >
      <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
    </Link>
  );
}

function IconForm({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function IconDraw({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function IconDashboard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FeatureCard({
  title,
  href,
  desc,
  color,
}: {
  title: string;
  href: string;
  desc: string;
  color: "sky" | "emerald" | "violet" | "amber" | "rose" | "cyan" | "fuchsia";
}) {
  const classes: Record<typeof color, string> = {
    sky: "border-sky-500/40 hover:border-sky-400/60 hover:bg-slate-800/80",
    emerald: "border-emerald-500/40 hover:border-emerald-400/60 hover:bg-slate-800/80",
    violet: "border-violet-500/40 hover:border-violet-400/60 hover:bg-slate-800/80",
    amber: "border-amber-500/40 hover:border-amber-400/60 hover:bg-slate-800/80",
    rose: "border-rose-500/40 hover:border-rose-400/60 hover:bg-slate-800/80",
    cyan: "border-cyan-500/40 hover:border-cyan-400/60 hover:bg-slate-800/80",
    fuchsia: "border-fuchsia-500/40 hover:border-fuchsia-400/60 hover:bg-slate-800/80",
  };
  return (
    <Link
      href={href}
      className={`block rounded-xl border bg-slate-800/60 p-5 transition ${classes[color]}`}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
    </Link>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}
