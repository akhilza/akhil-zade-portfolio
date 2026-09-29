"use client";

import React, { useState, useEffect } from "react";
import { Mail, Menu, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Company Projects", href: "#company-projects" },
    { name: "Personal Projects", href: "#personal-projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/15 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#"
            className="group cursor-pointer py-1 z-10"
            id="nav-logo"
          >
            <span className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-[#00d4ff] transition-colors">
              Akhil Zade
            </span>
          </a>

          {/* Desktop Nav Items - Centered */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 lg:gap-1 bg-black/90 border border-white/15 rounded-full px-3 lg:px-4 py-1.5 backdrop-blur-lg shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 lg:px-4 py-1.5 text-xs font-semibold text-white hover:text-[#00d4ff] rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions - LinkedIn Profile */}
          <div className="flex items-center gap-2 z-10">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black hover:border-[#00d4ff] hover:bg-neutral-900 transition-all text-xs font-semibold text-white group"
              title="Visit Akhil Zade's LinkedIn Profile"
            >
              <LinkedInIcon className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span className="group-hover:text-[#00d4ff] transition-colors">LinkedIn</span>
            </a>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-white/15 bg-black text-white hover:border-[#00d4ff]/40 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-[#00d4ff]" />
                ) : (
                  <Menu className="h-5 w-5 text-[#00d4ff]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/15 bg-black p-4 space-y-2 backdrop-blur-xl shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-white hover:text-[#00d4ff] hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-white hover:text-[#00d4ff]"
              >
                <GitHubIcon className="h-3.5 w-3.5 text-[#00d4ff]" /> GitHub
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-white hover:text-[#00d4ff]"
              >
                <LinkedInIcon className="h-3.5 w-3.5 text-[#00d4ff]" /> LinkedIn
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 text-white hover:text-[#00d4ff]"
              >
                <Mail className="h-3.5 w-3.5 text-[#00d4ff]" /> Email
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
