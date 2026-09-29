"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ResumeModal } from "@/components/ResumeModal";
import { CodingBackground } from "@/components/CodingBackground";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100 relative selection:bg-[#00d4ff]/20 selection:text-[#00d4ff]">
      {/* Background Coding Symbols */}
      <CodingBackground />

      {/* Top Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Modal Viewer */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
