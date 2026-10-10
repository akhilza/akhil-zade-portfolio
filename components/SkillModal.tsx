"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Skill } from "@/data/portfolio";
import { EASE } from "./Reveal";

const R = 70;
const C = 2 * Math.PI * R;

function rank(n: number) {
  if (n >= 92) return "Expert";
  if (n >= 85) return "Advanced";
  if (n >= 75) return "Proficient";
  return "Working knowledge";
}

interface Props {
  skill: Skill;
  version: string;
  index: number;
  edited: boolean;
  onClose: () => void;
  onSave: (level: number, version: string) => void;
  onReset: () => void;
}

export default function SkillModal({ skill, version, index, edited, onClose, onSave, onReset }: Props) {
  const [level, setLevel] = useState(skill.level);
  const [ver, setVer] = useState(version);
  const dirty = level !== skill.level || ver !== version;

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const save = () => {
    if (dirty) onSave(level, ver.trim() || "—");
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-obsidian/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${skill.name} mastery`}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative my-auto w-full max-w-md rounded-[2rem] bg-cream p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-obsidian text-cream transition hover:rotate-90"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="m1.5 1.5 9 9m0-9-9 9" />
          </svg>
        </button>

        <p className="font-mono text-xs text-ink-muted">
          № {String(index + 1).padStart(2, "0")} · {skill.category}
          {edited && <span className="ml-2 text-[#8a5f10]">● edited</span>}
        </p>
        <div className="mt-3 flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-obsidian font-serif text-3xl font-bold text-cream">
            {skill.symbol}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Technology</p>
            <h3 className="font-serif text-3xl leading-tight">{skill.name}</h3>
          </div>
        </div>

        <div className="relative mx-auto mt-7 h-40 w-40">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="10" />
            <motion.circle
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke="url(#g)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - level / 100) }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#D9A441" />
                <stop offset="1" stopColor="#7A7F4E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-5xl font-bold tabular-nums">
              {level}
              <span className="text-2xl text-ink-muted">%</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{rank(level)}</span>
          </div>
        </div>

        {/* editable fields */}
        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Version name</span>
            <input
              value={ver}
              onChange={(e) => setVer(e.target.value)}
              maxLength={40}
              className="mt-1.5 w-full rounded-xl border border-black/10 bg-white/80 px-4 py-2.5 text-sm outline-none transition focus:border-obsidian focus:ring-2 focus:ring-amber2/40"
            />
          </label>

          <label className="block">
            <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              Mastery level
              <span className="text-ink">{level} / 100</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-obsidian"
              style={{ background: `linear-gradient(90deg,#D9A441 ${level}%,rgba(0,0,0,0.1) ${level}%)` }}
            />
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={save}
            className="flex-1 rounded-full bg-obsidian px-5 py-3 text-sm font-medium text-cream transition hover:scale-[1.02]"
          >
            Save changes
          </button>
          {edited && (
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="rounded-full border border-black/10 px-4 py-3 text-sm text-ink-muted transition hover:text-ink"
            >
              Reset
            </button>
          )}
        </div>
        <p className="mt-3 text-center text-[11px] text-ink-muted">Saved in this browser. Edit data/portfolio.ts to make it permanent.</p>
      </motion.div>
    </motion.div>
  );
}
