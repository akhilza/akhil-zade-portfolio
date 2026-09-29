"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Mail,
  MapPin,
  Copy,
  Check,
  Download,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Status Pill */}
          <div className="inline-flex max-w-full items-center justify-center rounded-full border border-[#00d4ff]/40 bg-black px-4 py-1.5 text-xs font-semibold text-white text-center leading-normal">
            <span>{PERSONAL_INFO.status}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Hi, I&apos;m {PERSONAL_INFO.name}.
              <br />
              <span className="text-white">
                Full-Stack Developer
              </span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-white/90 font-medium pt-1">
              React.js • Next.js • TypeScript • Node.js • Express.js • Java (Java 8) &amp; Spring Boot • MySQL • AWS
            </p>
          </div>

          {/* Description */}
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Full-Stack Developer with <strong className="text-white font-bold">5 years</strong> of total software development experience, including <strong className="text-white font-bold">4 years</strong> building scalable web applications with React, Next.js, Node.js, and MySQL, plus <strong className="text-white font-bold">1+ year</strong> of banking backend engineering with Java and Spring Boot.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-xl border border-[#00d4ff]/50 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff] px-6 py-3.5 text-sm font-semibold text-white active:scale-95 transition-all"
              id="btn-explore-projects"
            >
              <Sparkles className="h-4 w-4 text-[#00d4ff]" />
              <span>Explore Featured Projects</span>
              <ArrowRight className="h-4 w-4 text-[#00d4ff]" />
            </a>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-black hover:bg-neutral-900 px-5 py-3.5 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm"
              id="btn-open-resume-hero"
            >
              <FileText className="h-4 w-4 text-[#00d4ff]" />
              <span>View Full Resume</span>
            </button>

            <a
              href="/Akhil_Zade_Resume.pdf"
              download="Akhil_Zade_Resume.pdf"
              className="flex items-center gap-2 rounded-xl border border-[#00d4ff]/40 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff] px-4 py-3.5 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm"
              id="btn-download-resume-hero"
              title="Download Akhil Zade Resume PDF"
            >
              <Download className="h-4 w-4 text-[#00d4ff]" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-black hover:bg-neutral-900 px-4 py-3.5 text-xs font-medium text-white transition-colors"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#00d4ff] font-bold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[#00d4ff]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Quick Contact info */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#00d4ff]" />
              {PERSONAL_INFO.location}
            </span>
            <span className="text-[#00d4ff]">•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[#00d4ff] transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
            <span className="text-[#00d4ff]">•</span>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="hover:text-[#00d4ff] transition-colors"
            >
              {PERSONAL_INFO.phone}
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/15 max-w-5xl mx-auto">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/15 bg-black text-center hover:border-[#00d4ff]/50 transition-colors shadow-xl"
            >
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white mt-1">{stat.label}</div>
              {stat.subtext && (
                <div className="text-[11px] text-[#00d4ff] mt-0.5 font-medium">{stat.subtext}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
