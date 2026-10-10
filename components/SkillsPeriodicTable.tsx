"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories, skills, skillVersions, type SkillCategory } from "@/data/portfolio";
import SkillModal from "./SkillModal";
import Reveal, { EASE } from "./Reveal";

const tint: Record<SkillCategory, string> = {
  Languages: "bg-[#2B2D33] text-cream border-[#2B2D33]",
  Frontend: "bg-[#4A423A] text-cream border-[#4A423A]",
  Backend: "bg-[#5F6340] text-cream border-[#5F6340]",
  Databases: "bg-[#B8A58E] text-ink border-[#B8A58E]",
  Tools: "bg-[#D9A441] text-ink border-[#D9A441]",
  "Core CS": "bg-[#E8DFCC] text-ink border-[#E8DFCC]",
};

export default function SkillsPeriodicTable() {
  const [cat, setCat] = useState<SkillCategory | "All">("All");
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [overrides, setOverrides] = useState<Record<string, { level: number; version: string }>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("skill-overrides");
      if (raw) setOverrides(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: typeof overrides) => {
    setOverrides(next);
    try {
      localStorage.setItem("skill-overrides", JSON.stringify(next));
    } catch {}
  };

  const list = skills.map((s) => ({ ...s, level: overrides[s.name]?.level ?? s.level }));
  const versionOf = (name: string) => overrides[name]?.version ?? skillVersions[name] ?? "—";

  return (
    <section id="skills" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-tag">03 — Skills</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Elements of my tech stack.
          </h2>
          <p className="mt-3 text-ink-muted">Hover a tile or pick a category to light it up. Click any tile to view or edit it.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2" >
          {(["All", ...skillCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                cat === c ? "border-obsidian bg-obsidian text-cream" : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {list.map((s, i) => {
            const on = cat === "All" || s.category === cat;
            const hot = hover === s.name;
            return (
              <motion.div
                key={s.name}
                tabIndex={0}
                role="button"
                aria-label={`${s.name}, open details`}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(i))}
                onMouseEnter={() => setHover(s.name)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.name)}
                onBlur={() => setHover(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: on ? 1 : 0.25, y: 0 }}
                animate={{ opacity: on ? 1 : 0.25, scale: hot ? 1.08 : 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.04, ease: EASE }}
                className={`relative aspect-square cursor-pointer rounded-2xl border p-3 outline-none transition-shadow ${tint[s.category]} ${
                  hot ? "z-10 shadow-[0_12px_40px_-8px_rgba(217,164,65,0.55)]" : "shadow-sm"
                }`}
              >
                <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
                  <span className="font-serif text-3xl font-bold leading-none sm:text-4xl">{s.symbol}</span>
                  <span className="mt-1.5 text-[10px] font-medium leading-tight opacity-80 sm:text-xs">{s.name}</span>
                </div>
                <div
                  className={`absolute inset-x-3 bottom-2 transition-opacity duration-200 ${hot ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={!hot}
                >
                  <div className="h-1 overflow-hidden rounded-full bg-black/20">
                    <div className="h-full rounded-full bg-current" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="mt-0.5 block text-right font-mono text-[9px]">{s.level}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {selected !== null && (
          <SkillModal
            key={list[selected].name}
            skill={list[selected]}
            version={versionOf(list[selected].name)}
            index={selected}
            edited={!!overrides[list[selected].name]}
            onClose={() => setSelected(null)}
            onSave={(level, version) => persist({ ...overrides, [list[selected].name]: { level, version } })}
            onReset={() => {
              const { [list[selected].name]: _, ...rest } = overrides;
              persist(rest);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
