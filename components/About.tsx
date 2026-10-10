import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import IdBadge from "./IdBadge";

const pills = [
  { label: "Résumé ↓", href: "#resume" },
  { label: "GitHub ↗", href: profile.links.github },
  { label: "LinkedIn ↗", href: profile.links.linkedin },
];

export default function About() {
  return (
    <section id="about" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_auto_1fr]">
        <Reveal x={-30} y={0}>
          <p className="section-tag">02 — About</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="italic font-normal">{profile.firstName}.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-muted">{profile.bio}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {pills.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white"
              >
                {p.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <IdBadge />
        </Reveal>

        <Reveal x={30} y={0} delay={0.15}>
          <p className="section-tag">Quick facts</p>
          <dl className="glass mt-4 divide-y divide-black/[0.06] rounded-3xl px-6">
            {profile.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{f.label}</dt>
                <dd className="text-right text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-8 border-l-2 border-amber2 pl-5 font-serif text-2xl italic leading-snug">
            “{profile.quote}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
