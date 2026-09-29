"use client";

import React, { useState } from "react";
import { Sparkles, Dumbbell, ShoppingBag } from "lucide-react";
import { TestForgeDemo } from "./demos/TestForgeDemo";
import { PulseFitDemo } from "./demos/PulseFitDemo";
import { SKPearlsDemo } from "./demos/SKPearlsDemo";

export function LiveWorkSection() {
  const [activeTab, setActiveTab] = useState<"test-forge" | "pulsefit" | "skpearls">("test-forge");

  const tabs = [
    {
      id: "test-forge",
      name: "Test Forge AI",
      tagline: "AI Test Suite Generator",
      badge: "Featured AI Project",
      icon: Sparkles,
      color: "from-indigo-500 to-cyan-400",
    },
    {
      id: "pulsefit",
      name: "PulseFit Platform",
      tagline: "Fitness & Stripe Subscriptions",
      badge: "Wegile (5k+ Users)",
      icon: Dumbbell,
      color: "from-amber-500 to-rose-500",
    },
    {
      id: "skpearls",
      name: "SKPearls Storefront",
      tagline: "E-Commerce & Optimistic Cart",
      badge: "Tissa Technology",
      icon: ShoppingBag,
      color: "from-cyan-400 to-indigo-500",
    },
  ];

  return (
    <section id="live-work" className="py-20 md:py-28 relative scroll-mt-20">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Engineering Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Live Work &amp; <span className="gradient-accent">Interactive Demos</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Test and explore live interactive implementations of the actual systems, AI integrations,
            and e-commerce architectures built by Akhil across 5+ years of engineering.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl w-full max-w-3xl shadow-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex flex-col items-center sm:items-start p-3 rounded-xl transition-all text-left relative ${
                    isSelected
                      ? "bg-slate-900 border border-white/15 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`h-6 w-6 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? "bg-gradient-to-tr " + tab.color + " text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold truncate">{tab.name}</span>
                  </div>

                  <span className="hidden sm:block text-[11px] text-slate-400 truncate w-full">
                    {tab.tagline}
                  </span>

                  <span
                    className={`text-[9px] font-semibold mt-1 px-1.5 py-0.2 rounded border ${
                      isSelected
                        ? "text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
                        : "text-slate-500 bg-slate-950 border-white/5"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Demo Container */}
        <div className="transition-all duration-300">
          {activeTab === "test-forge" && <TestForgeDemo />}
          {activeTab === "pulsefit" && <PulseFitDemo />}
          {activeTab === "skpearls" && <SKPearlsDemo />}
        </div>
      </div>
    </section>
  );
}
