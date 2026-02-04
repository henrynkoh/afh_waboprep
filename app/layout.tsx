import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import LayoutMain from "@/components/LayoutMain";
import { BROKER_INFO, SITE_CONFIG } from "@/lib/broker-info";

export const metadata: Metadata = {
  title: SITE_CONFIG.siteTitle,
  description:
    "Find single-family homes in Lewis/Thurston/Pierce WA, convert to WABO-ready AFH, pass initial inspection. AI-agent pipeline, Entry Mode forms, curriculum, Centralia packet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <header className="sticky top-0 z-10 border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
            <Link href="/" className="font-semibold text-sky-400 hover:text-sky-300">
              {SITE_CONFIG.appName}
            </Link>
            <Link href="/entry-mode" className="text-slate-300 hover:text-white">
              Entry Mode
            </Link>
            <Link href="/pipeline" className="text-slate-300 hover:text-white">
              Pipeline
            </Link>
            <Link href="/curriculum" className="text-slate-300 hover:text-white">
              Curriculum
            </Link>
            <Link href="/qa" className="text-slate-300 hover:text-white">
              Top 100 Q&A
            </Link>
            <Link href="/centralia" className="text-slate-300 hover:text-white">
              Centralia Packet
            </Link>
            <Link href="/case-study" className="text-slate-300 hover:text-white">
              Case: 2606 Cooks Hill
            </Link>
            <Link href="/drawing" className="text-slate-300 hover:text-white">
              Drawing (2D/3D)
            </Link>
          </nav>
        </header>
        <LayoutMain>{children}</LayoutMain>
        <footer className="mt-auto border-t border-slate-700 bg-slate-900/60">
          <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-400">
            <p className="font-medium text-slate-300">
              {BROKER_INFO.brokerName}
              {BROKER_INFO.title && ` · ${BROKER_INFO.title}`}
              {BROKER_INFO.firmName && ` · ${BROKER_INFO.firmName}`}
            </p>
            <p className="mt-1">
              {BROKER_INFO.licenseNumber}
              {BROKER_INFO.nwmlsSubscriber && (
                <> · <span className="text-sky-400">NWMLS Subscriber</span></>
              )}
            </p>
            {(BROKER_INFO.email || BROKER_INFO.phone) && (
              <p className="mt-1">
                {BROKER_INFO.email && (
                  <a href={`mailto:${BROKER_INFO.email}`} className="text-sky-400 hover:underline">
                    {BROKER_INFO.email}
                  </a>
                )}
                {BROKER_INFO.email && BROKER_INFO.phone && " · "}
                {BROKER_INFO.phone && (
                  <a href={`tel:${BROKER_INFO.phone.replace(/\D/g, "")}`} className="text-sky-400 hover:underline">
                    {BROKER_INFO.phone}
                  </a>
                )}
              </p>
            )}
          </div>
        </footer>
      </body>
    </html>
  );
}
