"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";
import { EASE } from "./Reveal";
import Smoke from "./Smoke";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const tx = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const wmx = useTransform(sx, [-0.5, 0.5], [18, -18]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-24 sm:px-6 md:pb-16 md:pt-28"
    >
      <motion.span
        aria-hidden
        style={{ x: wmx }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-serif text-[28vw] font-bold uppercase leading-none tracking-tighter text-[#EBE6DA]/70"
      >
        {profile.firstName}
      </motion.span>

      <div aria-hidden className="float-slow pointer-events-none absolute right-[8%] top-[18%] h-24 w-24 rounded-full bg-gradient-to-br from-amber2/40 to-transparent blur-xl" />
      <div aria-hidden className="float-slow pointer-events-none absolute bottom-[12%] left-[6%] h-32 w-32 rounded-full bg-gradient-to-br from-olive/30 to-transparent blur-xl [animation-delay:-4s]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-block rounded-full bg-obsidian px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream"
            >
              Full Stack Developer
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Immediate joiner
            </motion.span>
          </div>
          <h1 className="mt-6 font-serif text-[2.6rem] font-bold leading-[1.02] tracking-tight min-[380px]:text-5xl sm:text-7xl lg:text-[5.5rem]">
            {["Full Stack", "Developer."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {i === 1 ? <span className="italic font-normal">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-5 font-serif text-lg italic text-ink-muted sm:text-2xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-obsidian px-6 py-3.5 text-sm font-medium text-cream shadow-sm"
            >
              Explore work
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
            </a>
            <a href="#contact" className="glass rounded-full px-6 py-3.5 text-sm font-medium transition hover:bg-white">
              Let&apos;s talk
            </a>
            <a href="#resume" className="rounded-full px-4 py-3.5 text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline">
              Resume ↓
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-black/[0.08] pt-6 md:mt-12"
          >
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-3xl font-bold">{s.value}</dt>
                <dd className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="flex justify-center [perspective:1000px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            style={{ rotateX, rotateY, x: tx }}
            className="relative aspect-[9/16] h-[min(62svh,36rem)] md:h-[min(72svh,38rem)]"
          >
            <div className="absolute inset-x-[6%] inset-y-[10%] rounded-full bg-gradient-to-b from-amber2/25 to-olive/15 blur-3xl" />
            {videoFailed ? (
              <Image
                src={profile.photo}
                alt={`${profile.name} portrait`}
                fill
                priority
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-contain drop-shadow-2xl"
              />
            ) : (
              <video
                ref={video}
                src="/intro2.webm"
                autoPlay
                loop
                muted={muted}
                playsInline
                preload="auto"
                aria-label={`${profile.name} introduction`}
                onError={() => setVideoFailed(true)}
                className="absolute inset-0 h-full w-full object-contain object-top drop-shadow-2xl [mask-image:linear-gradient(to_bottom,#000_60%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_96%)]"
              />
            )}
            <Smoke />
            {!videoFailed && (
              <button
                onClick={() => setMuted((m) => !m)}
                aria-pressed={!muted}
                aria-label={muted ? "Unmute intro" : "Mute intro"}
                className="glass absolute bottom-3 right-3 z-10 flex h-10 items-center gap-2 rounded-full px-4 text-xs font-medium transition hover:bg-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
                </svg>
                {muted ? "Sound on" : "Sound off"}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
