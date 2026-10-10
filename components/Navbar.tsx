"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [active, setActive] = useState("#about");
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = mobileNav.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-4 pt-4 sm:px-6">
      <motion.a
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: -8, scale: 1.08 }}
        href="#top"
        aria-label="Home"
        className="grid h-11 w-11 place-items-center rounded-full bg-obsidian font-serif text-sm italic text-cream shadow-sm"
      >
        {profile.monogram}
      </motion.a>

      <nav
        aria-label="Primary"
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-black/[0.06] bg-white/70 p-1.5 shadow-sm backdrop-blur-xl md:flex"
      >
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative rounded-full px-3 py-2 text-sm font-medium lg:px-4"
          >
            {active === l.href && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-obsidian"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative transition-colors ${active === l.href ? "text-cream" : "text-ink-muted hover:text-ink"}`}>
              {l.label}
            </span>
          </a>
        ))}
      </nav>

      {/* mobile menu */}
      <nav
        ref={mobileNav}
        aria-label="Primary mobile"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex max-w-[94vw] -translate-x-1/2 gap-0.5 overflow-x-auto rounded-full border border-black/[0.06] bg-white/80 p-1 text-xs shadow-lg backdrop-blur-xl [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} data-active={active === l.href} className={`shrink-0 rounded-full px-3 py-2 ${active === l.href ? "bg-obsidian text-cream" : "text-ink-muted"}`}>
            {l.label}
          </a>
        ))}
      </nav>

    </header>
  );
}
