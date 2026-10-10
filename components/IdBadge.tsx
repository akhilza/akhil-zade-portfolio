"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";

const BARS = [3, 1, 2, 1, 4, 1, 2, 3, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3];
const MAX_ANGLE = 1.05; // rad
const STIFFNESS = 15; // g / L
const DAMPING = 1.15;

/**
 * Hanging ID badge. The lanyard + card are one rigid pendulum pivoting at the
 * top. Drag it anywhere and let go: it swings back with real damped physics.
 */
export default function IdBadge() {
  const wrap = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const sim = useRef({ a: 0.55, w: 0, dragging: false, lastA: 0, lastT: 0 });
  const [grabbing, setGrabbing] = useState(false);

  // card tilt (hover) — independent of the swing
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 14 });
  const sy = useSpring(my, { stiffness: 150, damping: 14 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const glare = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) sim.current.a = 0;
    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const s = sim.current;
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;
      if (!s.dragging) {
        const breeze = reduce ? 0 : Math.sin(now / 1700) * 0.35; // gentle ambient sway
        s.w += (-STIFFNESS * Math.sin(s.a) - DAMPING * s.w + breeze) * dt;
        s.a += s.w * dt;
      }
      if (rig.current) rig.current.style.transform = `rotate(${s.a}rad)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = sim.current;
    s.dragging = true;
    s.w = 0;
    s.lastA = s.a;
    s.lastT = performance.now();
    setGrabbing(true);
  };

  const onMove = (e: React.PointerEvent) => {
    const s = sim.current;
    if (!s.dragging || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(e.clientY - (r.top + 4), 70);
    const target = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, Math.atan2(dx, dy)));
    const now = performance.now();
    const dt = Math.max((now - s.lastT) / 1000, 0.008);
    const v = Math.max(-14, Math.min(14, (target - s.lastA) / dt));
    s.w = s.w * 0.6 + v * 0.4; // smoothed release velocity
    s.a += (target - s.a) * 0.45; // follow the pointer with a little lag
    s.lastA = target;
    s.lastT = now;
  };

  const onUp = () => {
    sim.current.dragging = false;
    setGrabbing(false);
  };

  return (
    <div ref={wrap} className="relative mx-auto h-[540px] w-full max-w-[18rem] select-none sm:h-[560px]">
      {/* ceiling mount */}
      <div className="absolute left-1/2 top-0 z-20 h-3 w-24 -translate-x-1/2 rounded-b-xl bg-gradient-to-b from-zinc-400 to-zinc-600 shadow" />
      <div className="absolute left-1/2 top-1 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-300 ring-2 ring-zinc-500" />

      <div
        ref={rig}
        className="absolute left-1/2 top-2 z-10 w-64 -ml-32 will-change-transform"
        style={{ transformOrigin: "50% 0" }}
      >
        {/* lanyard strap */}
        <div className="relative mx-auto h-32 w-[18px] overflow-hidden bg-gradient-to-r from-[#5d6140] via-olive to-[#5d6140] shadow-md">
          <div className="absolute inset-y-0 left-[3px] border-l border-dashed border-white/30" />
          <div className="absolute inset-y-0 right-[3px] border-l border-dashed border-white/30" />
        </div>
        {/* clip */}
        <div className="relative z-10 mx-auto -mt-1 h-6 w-9 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-500 shadow">
          <div className="absolute inset-x-2 bottom-1 h-1.5 rounded-full bg-obsidian/70" />
        </div>

        {/* card */}
        <motion.div
          onPointerDown={onDown}
          onPointerMove={(e) => {
            onMove(e);
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          animate={{ scale: grabbing ? 1.04 : 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1100,
            transformStyle: "preserve-3d",
            touchAction: "none",
            cursor: grabbing ? "grabbing" : "grab",
          }}
          className="relative -mt-2 w-64 overflow-hidden rounded-3xl bg-obsidian p-5 text-cream shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background:repeating-linear-gradient(45deg,#fff_0_1px,transparent_1px_6px)]" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)",
              backgroundSize: "250% 100%",
              backgroundPositionX: glare,
            }}
          />

          <div className="mx-auto h-2 w-16 rounded-full bg-white/15" />
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>Developer</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available
            </span>
          </div>

          <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-b from-[#3a3b42] to-[#25262b]">
            <Image src={profile.badgePhoto} alt={profile.name} fill sizes="240px" className="object-cover object-[50%_22%]" draggable={false} />
          </div>

          <h3 className="mt-5 font-serif text-2xl leading-tight">{profile.name}</h3>
          <p className="text-sm text-white/60">{profile.role}</p>
          <p className="mt-3 font-mono text-xs tracking-widest text-amber2">{profile.badgeId}</p>

          <div className="mt-4 flex h-12 items-end gap-[2px] rounded-lg bg-cream/95 px-3 py-2" aria-hidden>
            {BARS.map((w, i) => (
              <span key={i} className="h-full bg-obsidian" style={{ width: w * 1.5 }} />
            ))}
          </div>
        </motion.div>
      </div>

      <p className="absolute -bottom-2 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Grab &amp; swing me
      </p>
    </div>
  );
}
