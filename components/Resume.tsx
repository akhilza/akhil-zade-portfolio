import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import ResumeViewer from "./ResumeViewer";

const highlights = [
  { k: "Experience", v: "5 years · Java, React, Next.js, Node.js" },
  { k: "Delivered", v: "6 production + 3 personal projects" },
  { k: "Certified", v: "5 professional certifications" },
  { k: "Availability", v: "Immediate joiner" },
];

export default function Resume() {
  return (
    <section id="resume" className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal x={-30} y={0}>
          <p className="section-tag">— Résumé</p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            The full <span className="font-normal italic">story.</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
            Everything on this page, on one sheet — experience, projects, skills and certifications. Read it here or take a copy.
          </p>

          <dl className="glass mt-8 divide-y divide-black/[0.06] rounded-3xl px-6">
            {highlights.map((h) => (
              <div key={h.k} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">{h.k}</dt>
                <dd className="text-right text-sm font-medium">{h.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.links.resume}
              download="Akhil_Zade_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3.5 text-sm font-medium text-cream shadow-sm"
            >
              Download PDF
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-full px-6 py-3.5 text-sm font-medium transition hover:bg-white"
            >
              Open in new tab ↗
            </a>
          </div>
        </Reveal>

        <Reveal x={30} y={0} delay={0.1}>
          <ResumeViewer />
        </Reveal>
      </div>
    </section>
  );
}
