import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";

const contacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { label: "LinkedIn", value: "akhil-zade", href: profile.links.linkedin },
  { label: "GitHub", value: "akhilza", href: profile.links.github },
];

export default function Footer() {
  return (
    <footer id="contact" className="px-5 pb-28 pt-24 sm:px-6 md:pb-10 md:pt-28">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-obsidian px-5 py-14 text-center text-cream sm:px-8 sm:py-24">
          <div aria-hidden className="float-slow pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-amber2/20 blur-3xl" />
          <div aria-hidden className="float-slow pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-olive/25 blur-3xl [animation-delay:-5s]" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">07 — Contact</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
              Let&apos;s build something <span className="italic text-amber2">worth shipping.</span>
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-10 inline-block max-w-full break-all rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition hover:scale-105 sm:px-7"
            >
              {profile.email} →
            </a>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">{c.label}</span>
                  <span className="block truncate text-sm">{c.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <p className="mt-8 text-center font-mono text-xs text-ink-muted">
        © {new Date().getFullYear()} {profile.name} · {profile.location}
      </p>
    </footer>
  );
}
