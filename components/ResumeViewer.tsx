"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { EASE } from "./Reveal";

const pages = ["/resume-1.png", "/resume-2.png"];

export default function ResumeViewer() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);

  const go = useCallback((d: number) => {
    setPage(([p]) => {
      const n = p + d;
      return n < 0 || n >= pages.length ? [p, 0] : [n, d];
    });
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /input|textarea/i.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go]);

  return (
    <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white/70 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] backdrop-blur-md">
      {/* header */}
      <div className="flex items-center gap-2 px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[11px] text-ink-muted">Akhil_Zade_Resume.pdf</span>
        <span className="ml-auto font-mono text-[11px] text-ink-muted">
          {page + 1} / {pages.length}
        </span>
      </div>

      {/* page */}
      <div className="relative bg-cream-deep/70 px-4 py-6 sm:px-8">
        <div className="relative mx-auto aspect-[1429/2021] w-full max-w-[560px]">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60, rotateY: d * -8 }),
                center: { opacity: 1, x: 0, rotateY: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60, rotateY: d * 8 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
              style={{ transformPerspective: 1200 }}
              className="absolute inset-0 overflow-hidden rounded-md bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
            >
              <Image
                src={pages[page]}
                alt={`${profile.name} résumé, page ${page + 1}`}
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-contain"
                draggable={false}
                priority={page === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition enabled:hover:bg-obsidian enabled:hover:text-cream disabled:opacity-30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 2 4 7l5 5" />
          </svg>
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Pages">
          {pages.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1}`}
              onClick={() => setPage(([p]) => [i, i > p ? 1 : -1])}
              className={`h-2 rounded-full transition-all ${i === page ? "w-7 bg-obsidian" : "w-2 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={page === pages.length - 1}
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition enabled:hover:bg-obsidian enabled:hover:text-cream disabled:opacity-30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 2 5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
