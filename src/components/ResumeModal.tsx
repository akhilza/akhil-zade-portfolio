"use client";

import React from "react";
import { X, Printer, Mail, Phone, MapPin, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import {
  PERSONAL_INFO,
  WORK_EXPERIENCE,
  SKILL_CATEGORIES,
  EDUCATION,
  PERSONAL_PROJECTS,
} from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-black shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white">
        {/* Top bar with actions */}
        <div className="flex items-center justify-between border-b border-white/15 bg-black px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#00d4ff]" />
            <span className="text-sm font-bold text-white tracking-wide">
              Akhil Zade — Full-Stack Developer Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Akhil_Zade_Resume.pdf"
              download="Akhil_Zade_Resume.pdf"
              className="flex items-center gap-1.5 rounded-lg border border-[#00d4ff]/50 bg-neutral-900 hover:bg-neutral-800 hover:border-[#00d4ff] px-3 py-1.5 text-xs font-semibold text-white transition-all shadow-sm"
              title="Download Akhil Zade Resume PDF"
            >
              <Download className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              title="Print Resume"
            >
              <Printer className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Request%20for%20Akhil%20Zade`}
              className="flex items-center gap-1.5 rounded-lg border border-[#00d4ff]/40 bg-neutral-900 hover:bg-neutral-800 hover:border-[#00d4ff] text-white px-3.5 py-1.5 text-xs font-semibold transition-all"
            >
              <Mail className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span>Contact Directly</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white hover:text-[#00d4ff] hover:bg-neutral-900 transition-colors ml-2"
            >
              <X className="h-5 w-5 text-[#00d4ff]" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-8 bg-black text-white space-y-6 text-sm print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-white/15 pb-6 print:border-black/20 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-bold text-[#00d4ff] print:text-blue-700 mt-1">
                {PERSONAL_INFO.headline}
              </p>
              <p className="text-xs text-white/90 print:text-gray-600 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="h-3 w-3 text-[#00d4ff]" /> {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs text-white print:text-gray-700 space-y-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-[#00d4ff] flex items-center gap-1.5 justify-center sm:justify-end"
              >
                <Mail className="h-3.5 w-3.5 text-[#00d4ff]" /> {PERSONAL_INFO.email}
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="hover:text-[#00d4ff] flex items-center gap-1.5 justify-center sm:justify-end"
              >
                <Phone className="h-3.5 w-3.5 text-[#00d4ff]" /> {PERSONAL_INFO.phone}
              </a>
              <div className="flex items-center gap-3 pt-1 justify-center sm:justify-end">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#00d4ff] hover:underline flex items-center gap-1"
                >
                  <LinkedInIcon className="h-3 w-3 text-[#00d4ff]" /> LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#00d4ff] hover:underline flex items-center gap-1"
                >
                  <GitHubIcon className="h-3 w-3 text-[#00d4ff]" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] print:text-blue-800 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-white print:text-gray-800 leading-relaxed font-normal">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] print:text-blue-800 mb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 print:border-gray-200">
                  <div className="font-bold text-white print:text-black mb-1">{cat.category}:</div>
                  <div className="text-white/85 print:text-gray-700 leading-relaxed">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] print:text-blue-800 mb-3">
              Work Experience
            </h2>
            <div className="space-y-6">
              {WORK_EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-[#00d4ff]/60 pl-4 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="font-bold text-white print:text-black text-sm">
                      {exp.role} <span className="text-[#00d4ff]">| {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#00d4ff] print:text-gray-600 font-bold">{exp.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#00d4ff] print:text-cyan-800">
                    Project: {exp.project}
                  </div>
                  <div className="text-[11px] text-white/80 print:text-gray-600 font-mono">
                    Technologies: {exp.technologies.join(", ")}
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white print:text-gray-800 leading-relaxed">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] print:text-blue-800 mb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {PERSONAL_PROJECTS.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-white/10 print:border-gray-200 space-y-2 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white print:text-black text-sm">{proj.title}</span>
                    <span className="font-mono text-[#00d4ff] font-bold">{proj.badge}</span>
                  </div>
                  <div className="text-[11px] text-[#00d4ff] print:text-gray-600 font-mono">
                    Technologies: {proj.technologies.join(", ")}
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-white print:text-gray-800 leading-relaxed">
                    {proj.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] print:text-blue-800 mb-1">
              Education
            </h2>
            <div className="flex flex-wrap items-baseline justify-between text-xs pt-1">
              <div>
                <span className="font-bold text-white print:text-black block text-sm">
                  {EDUCATION.degree}
                </span>
                <span className="text-white/80 print:text-gray-700">
                  {EDUCATION.institution}, {EDUCATION.location}
                </span>
              </div>
              <span className="font-mono text-[#00d4ff] font-bold">{EDUCATION.graduationDate}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/15 bg-black px-6 py-3 flex items-center justify-between text-xs text-white shrink-0">
          <span className="text-[#00d4ff] font-semibold">Akhil Zade • Verified Full-Stack Developer Resume</span>
          <button onClick={onClose} className="hover:text-[#00d4ff] font-bold">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
