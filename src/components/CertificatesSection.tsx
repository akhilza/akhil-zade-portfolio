"use client";

import React, { useState } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  X,
  Search,
  BookOpen,
} from "lucide-react";
import { CERTIFICATES, Certificate, PERSONAL_INFO } from "@/data/portfolioData";

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "AI & Modern Tooling",
    "Backend & APIs",
    "Agile & Project Management",
    "Languages & Core",
  ];

  const filteredCerts = CERTIFICATES.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="certificates"
      className="py-20 md:py-28 relative bg-black text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-4 py-1.5 text-xs font-semibold text-white">
            <Award className="h-3.5 w-3.5 text-[#00d4ff]" />
            <span>Verified Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Certificates &amp; Specializations
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
            Verified credentials and continuous learning in modern full-stack development, backend systems, agile delivery, and emerging developer tooling.
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#00d4ff]/15 border-[#00d4ff] text-white font-semibold"
                    : "bg-black border-white/15 text-white/80 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search certificates or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-black border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveModalCert(cert)}
              className="group relative rounded-2xl border border-white/15 bg-neutral-950/80 p-6 hover:border-[#00d4ff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl border border-[#00d4ff]/40 bg-black flex items-center justify-center shrink-0 group-hover:border-[#00d4ff] transition-colors">
                      <Award className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#00d4ff] block uppercase tracking-wider">
                        {cert.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-950/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 shrink-0">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Issuer & Date meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-white/50" />
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-white/50" />
                    {cert.issueDate}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  {cert.description}
                </p>

                {/* Verified Skills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-lg border border-white/10 bg-black text-[11px] font-mono text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom action row */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                {cert.credentialId ? (
                  <button
                    onClick={(e) => handleCopyId(cert.credentialId!, e)}
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors font-mono text-[11px]"
                    title="Click to copy Credential ID"
                  >
                    {copiedId === cert.credentialId ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#00d4ff]" />
                        <span>ID: {cert.credentialId}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-1 text-[#00d4ff] font-medium group-hover:underline">
                  <span>View Details</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-white/10 bg-neutral-950 p-8 space-y-2">
            <p className="text-white font-medium">No certificates match your search query.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs text-[#00d4ff] underline hover:text-white transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Certificate Preview Modal */}
      {activeModalCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-black p-6 sm:p-8 space-y-6 shadow-2xl text-white animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalCert(null)}
              className="absolute top-4 right-4 p-2 rounded-xl border border-white/15 bg-neutral-900 text-white hover:border-[#00d4ff] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Simulated Official Certificate Card */}
            <div className="border border-white/20 rounded-xl p-6 bg-neutral-950/90 relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg border border-[#00d4ff]/40 bg-black flex items-center justify-center">
                    <Award className="h-4 w-4 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono tracking-widest text-[#00d4ff] uppercase">
                      Certificate of Achievement
                    </h4>
                    <p className="text-[11px] text-white/60">{activeModalCert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 border border-emerald-500/40 rounded-full px-2.5 py-0.5 bg-emerald-950/40 font-mono">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </div>
              </div>

              <div className="text-center space-y-2 py-3">
                <p className="text-xs text-white/60 font-mono uppercase tracking-wider">
                  This certifies that
                </p>
                <h3 className="text-2xl font-black text-white tracking-wide">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-white/70">
                  has demonstrated verified competency and successfully completed
                </p>
                <p className="text-base sm:text-lg font-bold text-[#00d4ff]">
                  {activeModalCert.title}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  {activeModalCert.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-white/60 font-mono uppercase tracking-wider block">
                    Verified Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded border border-white/15 bg-black text-[11px] font-mono text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credential ID and issue date footer */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/60 font-mono">
                <span>Issued: {activeModalCert.issueDate}</span>
                {activeModalCert.credentialId && (
                  <span>ID: {activeModalCert.credentialId}</span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              {activeModalCert.credentialUrl && (
                <a
                  href={activeModalCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-[#00d4ff]/40 bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 px-4 py-2 text-xs font-semibold text-[#00d4ff] transition-all"
                  title="Verify official credential online"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Verify at {activeModalCert.issuer}</span>
                </a>
              )}
              {activeModalCert.credentialId && (
                <button
                  onClick={(e) => handleCopyId(activeModalCert.credentialId!, e)}
                  className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-neutral-950 px-4 py-2 text-xs font-semibold text-white hover:border-[#00d4ff] transition-all"
                >
                  {copiedId === activeModalCert.credentialId ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Credential ID Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#00d4ff]" />
                      <span>Copy Credential ID</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => setActiveModalCert(null)}
                className="rounded-xl border border-[#00d4ff]/40 bg-black hover:border-[#00d4ff] px-4 py-2 text-xs font-semibold text-white transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
