"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { achievements, certifications } from "@/data/portfolio";
import { EASE } from "./Reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => (node.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const span = {
  lg: "sm:col-span-2 lg:row-span-2",
  md: "lg:col-span-2",
  sm: "",
} as const;


const glyphs = [
  { t: "</>", cls: "right-[8%] top-[14%] text-5xl text-amber2/30", d: "0s" },
  { t: "{ }", cls: "left-[42%] top-[34%] text-4xl text-white/10", d: "-2s" },
  { t: "=>", cls: "left-[8%] top-[30%] text-3xl text-amber2/25", d: "-4s" },
  { t: "[ ]", cls: "right-[34%] bottom-[34%] text-3xl text-white/10", d: "-6s" },
  { t: "&&", cls: "right-[6%] bottom-[30%] text-3xl text-amber2/20", d: "-3s" },
  { t: "();", cls: "left-[30%] top-[14%] text-2xl text-white/10", d: "-5s" },
];

function CodeDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber2/20 blur-3xl" />
      {glyphs.map((g) => (
        <span key={g.t} className={`float-slow absolute font-mono font-bold ${g.cls}`} style={{ animationDelay: g.d }}>
          {g.t}
        </span>
      ))}
      <div className="absolute right-5 top-14 hidden w-[15.5rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-mono text-[11px] leading-relaxed shadow-xl backdrop-blur-sm sm:block lg:right-6">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <p><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">dev</span> <span className="text-white/50">=</span> {"{"}</p>
        <p className="pl-4"><span className="text-[#f78c6c]">years</span>: <span className="text-amber2">5</span>,</p>
        <p className="pl-4"><span className="text-[#f78c6c]">stack</span>: [<span className="text-[#c3e88d]">&quot;React&quot;</span>,</p>
        <p className="pl-10"><span className="text-[#c3e88d]">&quot;Node&quot;</span>, <span className="text-[#c3e88d]">&quot;Java&quot;</span>],</p>
        <p className="pl-4"><span className="text-[#f78c6c]">status</span>: <span className="text-[#c3e88d]">&quot;shipping&quot;</span></p>
        <p>{"}"}<span className="text-white/50">;</span><span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-amber2" /></p>
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="section-tag">06 — Achievements</p>
        <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-6xl">
          Proud <span className="italic font-normal">moments.</span>
        </h2>

        <div className="mt-12 grid auto-rows-[180px] gap-4 sm:grid-cols-2 sm:auto-rows-[190px] lg:grid-cols-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 hover:shadow-xl ${span[a.size]} ${
                a.size === "lg" ? "bg-obsidian text-cream" : "glass hover:bg-white"
              }`}
            >
              {a.size === "lg" && <CodeDecor />}
              <span className="relative font-mono text-[11px] uppercase tracking-wider opacity-60">{a.label}</span>
              <div className="relative">
                <div className={`font-serif font-bold leading-none ${a.size === "lg" ? "text-7xl sm:text-8xl" : "text-5xl sm:text-6xl"}`}>
                  <Counter to={a.value} suffix={a.suffix} />
                </div>
                <p className="mt-3 text-sm opacity-60">{a.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="section-tag mt-16">Certifications</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="glass flex items-start gap-4 rounded-2xl p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-obsidian font-serif text-amber2">✓</span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug">{c.name}</h3>
                <p className="text-xs text-ink-muted">
                  {c.issuer} · {c.date}
                </p>
                <p className="mt-1 truncate font-mono text-[10px] text-ink-muted/70">ID {c.id}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
