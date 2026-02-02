"use client";

import { useState, useMemo } from "react";
import { QA_BANK } from "@/lib/qa-bank";

const CATEGORIES = [...new Set(QA_BANK.map((q) => q.category))];

export default function QAPage() {
  const [filter, setFilter] = useState<string>("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter ? QA_BANK.filter((q) => q.category === filter) : QA_BANK),
    [filter]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-400 mb-1">Top 100 Q&A</h1>
        <p className="text-slate-400 text-sm">
          AFH initial inspection prep: WAC, RCW, DSHS 15-604, best practices. Use for consultant training and self-check.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("")}
          className={`rounded-lg px-3 py-1.5 text-sm ${filter === "" ? "bg-sky-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-lg px-3 py-1.5 text-sm ${filter === c ? "bg-sky-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-slate-400 text-sm">{filtered.length} questions</p>

      <ul className="space-y-3">
        {filtered.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
            <button
              type="button"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full text-left"
            >
              <span className="text-slate-400 text-xs mr-2">[{item.category}]</span>
              <span className="font-medium text-sky-300">Q{item.id}. {item.question}</span>
            </button>
            {openId === item.id && (
              <div className="mt-3 pt-3 border-t border-slate-700 text-slate-300 text-sm">
                <strong className="text-sky-300">Answer:</strong> {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
