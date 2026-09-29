"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/15 bg-black py-12 text-xs text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-bold text-base text-white tracking-tight">{PERSONAL_INFO.name}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#00d4ff] transition-colors font-medium"
            >
              GitHub
            </a>
            <span className="text-[#00d4ff]">•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#00d4ff] transition-colors font-medium"
            >
              LinkedIn
            </a>
            <span className="text-[#00d4ff]">•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-white hover:text-[#00d4ff] transition-colors font-medium"
            >
              Email
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-neutral-950 px-3.5 py-1.5 text-[11px] text-white hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3 text-[#00d4ff]" />
          </button>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/80 gap-3 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Akhil Zade. All rights reserved.
          </div>
          <div>Nagpur, Maharashtra, India • +91-9730927203</div>
        </div>
      </div>
    </footer>
  );
}
