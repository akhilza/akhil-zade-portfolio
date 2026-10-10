"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import Reveal, { EASE } from "./Reveal";

const filters = ["All", "Professional", "Personal"] as const;

function Card({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);

  const spotlight = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: EASE }}
      whileHover={{ y: -6 }}
      onMouseMove={spotlight}
      onClick={() => setOpen((o) => !o)}
      className="glass group relative cursor-pointer overflow-hidden rounded-3xl p-7 transition-shadow hover:shadow-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--x) var(--y), rgba(217,164,65,0.18), transparent 60%)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            {p.kind} · {p.period}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian text-cream"
            style={{ transformOrigin: "50% 50%" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M7 1.5v11M1.5 7h11" />
            </svg>
          </motion.span>
        </div>
        <h3 className="mt-4 font-serif text-2xl leading-snug">{p.title}</h3>
        <p className="text-xs text-ink-muted">{p.org}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-4 text-sm">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber2" />
                    {h}
                  </li>
                ))}
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-block pt-1 font-medium underline underline-offset-4">
                    Visit live ↗
                  </a>
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.metric && (
            <span className="rounded-full bg-obsidian px-2.5 py-1 font-mono text-[10px] text-amber2">{p.metric}</span>
          )}
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-cream-deep px-2.5 py-1 font-mono text-[10px] text-ink-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => f === "All" || p.kind === f);

  return (
    <section id="work" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="section-tag">04 — Work</p>
          <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve <span className="font-normal italic">shipped.</span>
          </h2>
          <p className="mt-3 text-ink-muted">Tap a card to see what&apos;s inside.</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setF(x)}
              aria-pressed={f === x}
              className={`relative rounded-full px-4 py-2 text-sm font-medium ${f === x ? "text-cream" : "glass text-ink-muted"}`}
            >
              {f === x && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-obsidian" />}
              <span className="relative">{x}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
