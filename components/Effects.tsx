"use client";

import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";
import { skills } from "@/data/portfolio";

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-amber2 via-olive to-obsidian"
    />
  );
}

/** Soft warm light that trails the cursor (desktop only). */
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 90, damping: 20 });
  const sy = useSpring(y, { stiffness: 90, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.16),transparent_65%)] md:block"
    />
  );
}

/** Infinite tech-stack ticker between hero and about. */
export function Marquee() {
  const items = [...skills, ...skills];
  return (
    <div className="relative overflow-hidden border-y border-black/[0.06] bg-white/40 py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee flex w-max gap-10">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl italic text-ink/70">
            {s.name}
            <span className="h-1.5 w-1.5 rounded-full bg-amber2" />
          </span>
        ))}
      </div>
    </div>
  );
}
