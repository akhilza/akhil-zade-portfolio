"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap } from "lucide-react";
import { WORK_EXPERIENCE, EDUCATION } from "@/data/portfolioData";
import { TiltCard } from "@/components/TiltCard";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 relative scroll-mt-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-3.5 py-1 text-xs font-semibold text-white">
            <Briefcase className="h-3.5 w-3.5 text-[#00d4ff]" />
            <span>Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Work Experience &amp; Engineering Roles
          </h2>

          <p className="text-sm sm:text-base text-white leading-relaxed">
            5 years of total software engineering experience spanning modern React/Next.js full-stack ecosystems,
            high-traffic e-commerce, and enterprise Java/Spring Boot banking services.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <TiltCard
              key={idx}
              maxTilt={4}
              liftPx={4}
              className="rounded-2xl border border-white/15 bg-black p-6 sm:p-8 hover:border-[#00d4ff]/50 transition-colors shadow-2xl cursor-pointer"
            >
              <div className="border-b border-white/10 pb-6">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-[#00d4ff] font-bold text-lg sm:text-xl">@ {exp.company}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 pt-1">
                    <span className="flex items-center gap-1 font-mono text-white">
                      <Calendar className="h-3.5 w-3.5 text-[#00d4ff]" />
                      {exp.period}
                    </span>
                    <span className="text-[#00d4ff]">•</span>
                    <span className="flex items-center gap-1 text-white">
                      <MapPin className="h-3.5 w-3.5 text-[#00d4ff]" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements Bullet List */}
              <div className="pt-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00d4ff]">
                  Key Deliverables &amp; Engineering Contributions
                </div>
                <ul className="space-y-2.5">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[#00d4ff] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-white/80 font-semibold mr-2">Technologies:</span>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono text-white bg-neutral-950 px-2.5 py-1 rounded-lg border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}

          {/* Education Box */}
          <TiltCard
            maxTilt={4}
            liftPx={4}
            className="rounded-2xl border border-white/15 bg-black p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl hover:border-[#00d4ff]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-neutral-950 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] shrink-0">
                <GraduationCap className="h-6 w-6 text-[#00d4ff]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#00d4ff]">
                  Education &amp; Academic Background
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {EDUCATION.degree}
                </h4>
                <p className="text-xs text-white/90">
                  {EDUCATION.institution} • {EDUCATION.location}
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-[#00d4ff] font-bold bg-[#00d4ff]/10 border border-[#00d4ff]/40 px-3.5 py-1.5 rounded-lg shrink-0">
              Graduated: {EDUCATION.graduationDate}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
