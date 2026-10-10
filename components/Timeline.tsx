"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "@/data/portfolio";
import { EASE } from "./Reveal";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="section-tag">05 — Experience &amp; Education</p>
        <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">The path so far.</h2>

        <div ref={ref} className="relative mt-16">
          {/* spine */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-black/10 md:left-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-amber2 to-olive md:left-1/2"
          />

          <ol className="space-y-14">
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <li key={t.title + t.year} className="relative grid md:grid-cols-2">
                  <span className="absolute left-[calc(1rem+0.5px)] top-6 z-10 -translate-x-1/2 md:left-[calc(50%+0.5px)]">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="block h-3.5 w-3.5 rounded-full bg-amber2 shadow-[0_0_0_6px_rgba(217,164,65,0.22)]"
                    />
                  </span>
                  <span
                    className={`absolute top-5 hidden font-mono text-sm text-ink-muted md:block ${
                      left ? "left-1/2 ml-8" : "right-1/2 mr-8"
                    }`}
                  >
                    {t.year}
                  </span>

                  <motion.article
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                    className={`glass ml-10 rounded-3xl p-6 md:ml-0 ${
                      left ? "md:col-start-1 md:mr-12" : "md:col-start-2 md:ml-12"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          t.type === "education"
                            ? "bg-obsidian text-cream"
                            : t.type === "certification"
                              ? "bg-amber2/20 text-[#8a5f10]"
                              : "bg-olive/15 text-olive"
                        }`}
                      >
                        {t.type}
                      </span>
                      {t.badge && (
                        <span className="rounded-full bg-amber2/20 px-2.5 py-1 font-mono text-[10px] text-[#8a5f10]">{t.badge}</span>
                      )}
                      <span className="ml-auto font-mono text-xs text-ink-muted md:hidden">{t.year}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl leading-snug">{t.title}</h3>
                    <p className="text-sm text-ink-muted">
                      {t.org} · {t.period}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {t.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {t.tags.map((g) => (
                          <span key={g} className="rounded-full bg-cream-deep px-2.5 py-1 font-mono text-[10px] text-ink-muted">
                            {g}
                          </span>
                        ))}
                      </div>
                    )}
                    {t.credentialId && (
                      <p className="mt-4 flex items-center gap-2 border-t border-black/[0.06] pt-3 font-mono text-[11px] text-ink-muted">
                        <span className="text-emerald-600">✓ Verified</span>
                        <span className="truncate">ID: {t.credentialId}</span>
                      </p>
                    )}
                    {t.note && (
                      <p className="mt-4 flex gap-2 rounded-2xl border border-amber2/30 bg-amber2/10 px-4 py-3 text-xs leading-relaxed text-[#6b4a0d]">
                        <span className="font-mono font-semibold uppercase">Note</span>
                        <span>{t.note}</span>
                      </p>
                    )}
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
