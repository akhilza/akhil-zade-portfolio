"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, Copy, MessageSquare, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      // Fallback mailto trigger
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Akhil,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-3.5 py-1 text-xs font-semibold text-white">
            <Mail className="h-3.5 w-3.5 text-[#00d4ff]" />
            <span>Let&apos;s Connect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Start a Conversation or Hire Akhil
          </h2>

          <p className="text-sm sm:text-base text-white leading-relaxed">
            Looking to build scalable web applications, robust APIs, or need an experienced
            Senior Full-Stack engineer? I&apos;d love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/15 bg-black p-6 space-y-6 shadow-2xl">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#00d4ff]" />
                <span>Contact Channels</span>
              </h3>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Direct Email</span>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1 text-[11px] text-[#00d4ff] hover:text-white transition-colors font-semibold"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3 w-3 text-[#00d4ff]" />
                        <span className="text-[#00d4ff] font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-[#00d4ff]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-white hover:text-[#00d4ff] transition-colors block font-mono"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone Card with Click to call */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                <div className="text-xs text-white/80 font-medium">Phone &amp; WhatsApp</div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-white hover:text-[#00d4ff] transition-colors block font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-1">
                <div className="text-xs text-white/80 font-medium">Current Location</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#00d4ff]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Social profiles */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-950 hover:border-[#00d4ff]/50 p-3 text-xs font-semibold text-white transition-colors"
                >
                  <LinkedInIcon className="h-4 w-4 text-[#00d4ff]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-950 hover:border-[#00d4ff]/50 p-3 text-xs font-semibold text-white transition-colors"
                >
                  <GitHubIcon className="h-4 w-4 text-[#00d4ff]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/15 bg-black p-6 sm:p-8 shadow-2xl">
              <h3 className="text-base font-bold text-white tracking-tight mb-6 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#00d4ff]" />
                <span>Send a Direct Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full rounded-xl border border-white/15 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="s.connor@company.com"
                      className="w-full rounded-xl border border-white/15 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity for Akhil"
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team goals, or timeline..."
                    className="w-full rounded-xl border border-white/15 bg-neutral-950 p-3 text-xs text-white placeholder-white/40 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/50 bg-neutral-950 hover:bg-neutral-900 hover:border-[#00d4ff] py-3.5 text-xs font-semibold text-white active:scale-95 transition-all disabled:opacity-50"
                  id="btn-submit-contact"
                >
                  {isSending ? (
                    <div className="h-4 w-4 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
                  ) : sentSuccess ? (
                    <>
                      <Check className="h-4 w-4 text-[#00d4ff]" />
                      <span>Message Dispatched! Opening Mail Client...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-[#00d4ff]" />
                      <span>Send Message to Akhil Zade</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
