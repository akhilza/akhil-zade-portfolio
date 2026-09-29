"use client";

import React from "react";
import { Building2, Code2, Sparkles, ExternalLink, Globe } from "lucide-react";
import { GitHubIcon } from "@/components/Icons";
import { COMPANY_PROJECTS, PERSONAL_PROJECTS } from "@/data/portfolioData";

export function ProjectsSection() {
  return (
    <div id="projects" className="space-y-24 bg-black text-white py-20 md:py-28">
      {/* SECTION 1: COMPANY & PRODUCTION PROJECTS */}
      <section id="company-projects" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-3.5 py-1 text-xs font-semibold text-white">
                <Building2 className="h-3.5 w-3.5 text-[#00d4ff]" />
                <span>Enterprise &amp; Client Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Company &amp; Production Projects
              </h2>
              <p className="text-sm sm:text-base text-white leading-relaxed">
                Commercial web applications, e-commerce storefronts, mobile RESTful APIs, and banking systems built for Wegile,
                Tissa Technology, and Labhanya Infotech.
              </p>
            </div>

            <div className="text-xs font-mono text-[#00d4ff] bg-neutral-950 px-3.5 py-1.5 rounded-lg border border-[#00d4ff]/30 shrink-0">
              6 Production Projects
            </div>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/15 bg-black p-6 sm:p-7 flex flex-col justify-between hover:border-[#00d4ff]/60 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Company */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#00d4ff] font-mono px-2.5 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
                      {project.affiliation}
                    </span>
                    <span className="text-xs text-white/80 font-mono">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs text-white/90 font-medium mt-1">
                        {project.tagline}
                      </div>
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} website`}
                        title="Open Project Website"
                        className="p-1.5 rounded-lg border border-[#00d4ff]/30 bg-neutral-950 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all shrink-0 active:scale-95"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Contributions */}
                  <ul className="space-y-2 pt-1">
                    {project.bulletPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-white/90 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#00d4ff] mt-0.5 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-white bg-neutral-950 px-2.5 py-1 rounded-md border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/80 font-mono">
                    Role: <strong className="text-white">{project.role}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} live website`}
                        title="Open Live Website"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00d4ff]/40 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff] text-white text-xs font-semibold transition-all group/live active:scale-95"
                      >
                        <Globe className="h-3.5 w-3.5 text-[#00d4ff] group-hover/live:scale-110 transition-transform" />
                        <span>Live</span>
                        <ExternalLink className="h-3 w-3 text-[#00d4ff]" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View on GitHub"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff]/60 text-white text-xs font-semibold transition-all group/btn active:scale-95"
                      >
                        <GitHubIcon className="h-3.5 w-3.5 text-[#00d4ff]" />
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3 text-[#00d4ff] group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: PERSONAL & INDEPENDENT PROJECTS */}
      <section id="personal-projects" className="scroll-mt-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-3.5 py-1 text-xs font-semibold text-white">
                <Code2 className="h-3.5 w-3.5 text-[#00d4ff]" />
                <span>Independent Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Personal &amp; Independent Projects
              </h2>
              <p className="text-sm sm:text-base text-white leading-relaxed">
                Production-ready web applications, modern developer tooling, and automated QA systems built to streamline engineering workflows.
              </p>
            </div>

            <div className="text-xs font-mono text-[#00d4ff] bg-neutral-950 px-3.5 py-1.5 rounded-lg border border-[#00d4ff]/30 shrink-0">
              2 Personal Projects
            </div>
          </div>

          {/* Personal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PERSONAL_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/15 bg-black p-6 sm:p-7 flex flex-col justify-between hover:border-[#00d4ff]/60 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#00d4ff] font-mono px-2.5 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
                      {project.badge}
                    </span>
                    <span className="text-xs text-white/80 font-mono">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs sm:text-sm text-white/90 font-medium mt-1">
                        {project.tagline}
                      </div>
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} website`}
                        title="Open Project Website"
                        className="p-1.5 rounded-lg border border-[#00d4ff]/30 bg-neutral-950 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all shrink-0 active:scale-95"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Contributions */}
                  <ul className="space-y-2 pt-1">
                    {project.bulletPoints.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-white/90 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#00d4ff] mt-0.5 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-white bg-neutral-950 px-2.5 py-1 rounded-md border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/80 font-mono">
                    Role: <strong className="text-white">{project.role}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} website`}
                        title="Open Live Website"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00d4ff]/40 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff] text-white text-xs font-semibold transition-all group/live active:scale-95"
                      >
                        <Globe className="h-3.5 w-3.5 text-[#00d4ff] group-hover/live:scale-110 transition-transform" />
                        <span>Live</span>
                        <ExternalLink className="h-3 w-3 text-[#00d4ff]" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        title="View on GitHub"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff]/60 text-white text-xs font-semibold transition-all group/btn active:scale-95"
                      >
                        <GitHubIcon className="h-3.5 w-3.5 text-[#00d4ff]" />
                        <span>GitHub</span>
                        <ExternalLink className="h-3 w-3 text-[#00d4ff] group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
