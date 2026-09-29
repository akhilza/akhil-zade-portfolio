"use client";

import React, { useState } from "react";
import {
  Cpu,
  Search,
  Code2,
  Server,
  Database,
  Layout,
  Wrench,
  GripVertical,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { SKILL_CATEGORIES, SkillCategory } from "@/data/portfolioData";

export function SkillsSection() {
  const [categories, setCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedCardIndex, setDraggedCardIndex] = useState<number | null>(null);
  const [dragOverCardIndex, setDragOverCardIndex] = useState<number | null>(null);

  const [draggedSkill, setDraggedSkill] = useState<{
    catIndex: number;
    skillIndex: number;
  } | null>(null);
  const [dragOverSkill, setDragOverSkill] = useState<{
    catIndex: number;
    skillIndex: number;
  } | null>(null);

  const categoryIcons: Record<string, typeof Code2> = {
    Languages: Code2,
    "Frontend Frameworks": Layout,
    "Backend & APIs": Server,
    "Databases & Cloud (DB)": Database,
    "Tools & Workflow": Wrench,
  };

  const handleResetOrder = () => {
    setCategories(SKILL_CATEGORIES);
    setSearchQuery("");
  };

  // Card Drag and Drop
  const handleCardDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", `card-${index}`);
    setDraggedCardIndex(index);
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedCardIndex !== null && draggedCardIndex !== index) {
      setDragOverCardIndex(index);
    }
  };

  const handleCardDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedCardIndex !== null && draggedCardIndex !== targetIndex) {
      const updated = [...categories];
      const [removed] = updated.splice(draggedCardIndex, 1);
      updated.splice(targetIndex, 0, removed);
      setCategories(updated);
    }
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
  };

  const handleCardDragEnd = () => {
    setDraggedCardIndex(null);
    setDragOverCardIndex(null);
  };

  // Skill Item Drag and Drop
  const handleSkillDragStart = (
    e: React.DragEvent,
    catIndex: number,
    skillIndex: number
  ) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", `skill-${catIndex}-${skillIndex}`);
    setDraggedSkill({ catIndex, skillIndex });
  };

  const handleSkillDragOver = (
    e: React.DragEvent,
    catIndex: number,
    skillIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      draggedSkill &&
      (draggedSkill.catIndex !== catIndex || draggedSkill.skillIndex !== skillIndex)
    ) {
      setDragOverSkill({ catIndex, skillIndex });
    }
  };

  const handleSkillDrop = (
    e: React.DragEvent,
    targetCatIndex: number,
    targetSkillIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedSkill) {
      const updated = categories.map((cat) => ({
        ...cat,
        skills: [...cat.skills],
      }));

      const sourceCat = updated[draggedSkill.catIndex];
      const targetCat = updated[targetCatIndex];

      const [movedSkill] = sourceCat.skills.splice(draggedSkill.skillIndex, 1);
      targetCat.skills.splice(targetSkillIndex, 0, movedSkill);

      setCategories(updated);
    }

    setDraggedSkill(null);
    setDragOverSkill(null);
  };

  const handleSkillDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedSkill(null);
    setDragOverSkill(null);
  };

  // Filter with search
  const filteredCategories = categories
    .map((cat, origIndex) => ({
      ...cat,
      originalIndex: origIndex,
      skills: cat.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.tags?.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 md:py-28 relative scroll-mt-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/40 bg-black px-3.5 py-1 text-xs font-semibold text-white">
              <Cpu className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Skills &amp; Technology Stack
            </h2>
            <p className="text-sm sm:text-base text-white leading-relaxed">
              Curated expertise grouped into Languages, Frontend Frameworks, Backend &amp; APIs, Databases &amp; Cloud (DB), and Tools.
            </p>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00d4ff]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter skills (e.g. Next.js, MySQL)..."
                className="w-full rounded-xl border border-white/15 bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/50 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-mono"
              />
            </div>

            {/* Reset Order Button */}
            <button
              onClick={handleResetOrder}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/15 bg-neutral-950 hover:bg-neutral-900 text-white/90 hover:text-[#00d4ff] text-xs font-semibold transition-all shrink-0 active:scale-95"
              title="Reset Cards to Default Order"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#00d4ff]" />
              <span>Reset Order</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Hint Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-950/80 border border-[#00d4ff]/30 text-xs">
          <div className="flex items-center gap-2 text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]" />
            </span>
            <span className="font-semibold text-white">
              Drag &amp; Drop Enabled:
            </span>
            <span className="text-white/80">
              Grab any card header or skill badge to rearrange your preferred stack order.
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#00d4ff]">
            <GripVertical className="h-3.5 w-3.5" />
            <span>Interactive Skill Board</span>
          </div>
        </div>

        {/* Categories Grid (Draggable Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((categoryGroup, displayIdx) => {
            const actualCatIndex = categoryGroup.originalIndex;
            const Icon = categoryIcons[categoryGroup.category] || Code2;
            const isCardDragging = draggedCardIndex === actualCatIndex;
            const isCardDragOver = dragOverCardIndex === actualCatIndex;

            return (
              <div
                key={categoryGroup.category}
                draggable
                onDragStart={(e) => handleCardDragStart(e, actualCatIndex)}
                onDragOver={(e) => handleCardDragOver(e, actualCatIndex)}
                onDrop={(e) => handleCardDrop(e, actualCatIndex)}
                onDragEnd={handleCardDragEnd}
                className={`rounded-2xl border bg-black p-6 space-y-5 transition-all shadow-2xl group ${
                  isCardDragging
                    ? "opacity-40 scale-[0.98] border-dashed border-[#00d4ff]"
                    : isCardDragOver
                    ? "border-[#00d4ff] ring-2 ring-[#00d4ff]/50 bg-[#00d4ff]/5 scale-[1.01]"
                    : "border-white/15 hover:border-[#00d4ff]/50"
                }`}
              >
                {/* Card Header (with drag grip) */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 cursor-grab active:cursor-grabbing select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-neutral-950 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff]">
                      <Icon className="h-4 w-4 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {categoryGroup.category}
                      </h3>
                      <span className="text-[11px] font-mono text-white/60 block">
                        Drag to reorder section
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00d4ff] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
                      {categoryGroup.skills.length} skills
                    </span>
                    <div
                      className="p-1 rounded-md text-white/50 group-hover:text-[#00d4ff] hover:bg-white/10 transition-colors"
                      title="Drag to reorder card"
                    >
                      <GripVertical className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Skills List inside Card */}
                <div className="space-y-3">
                  {categoryGroup.skills.map((skill, sIdx) => {
                    const isSkillDragging =
                      draggedSkill?.catIndex === actualCatIndex &&
                      draggedSkill?.skillIndex === sIdx;
                    const isSkillDragOver =
                      dragOverSkill?.catIndex === actualCatIndex &&
                      dragOverSkill?.skillIndex === sIdx;

                    return (
                      <div
                        key={skill.name}
                        draggable
                        onDragStart={(e) =>
                          handleSkillDragStart(e, actualCatIndex, sIdx)
                        }
                        onDragOver={(e) =>
                          handleSkillDragOver(e, actualCatIndex, sIdx)
                        }
                        onDrop={(e) =>
                          handleSkillDrop(e, actualCatIndex, sIdx)
                        }
                        onDragEnd={handleSkillDragEnd}
                        className={`p-3 rounded-xl bg-neutral-950/80 border transition-all space-y-1.5 cursor-grab active:cursor-grabbing select-none ${
                          isSkillDragging
                            ? "opacity-40 border-dashed border-[#00d4ff]"
                            : isSkillDragOver
                            ? "border-[#00d4ff] ring-1 ring-[#00d4ff] bg-[#00d4ff]/10"
                            : "border-white/10 hover:border-[#00d4ff]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] shrink-0" />
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {skill.name}
                            </span>
                          </div>
                          <GripVertical className="h-3.5 w-3.5 text-white/40 group-hover:text-[#00d4ff]" />
                        </div>

                        {/* Sub-tags */}
                        {skill.tags && skill.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pl-3.5 pt-0.5">
                            {skill.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono text-white/90 bg-black px-2 py-0.5 rounded border border-white/15 hover:border-[#00d4ff]/40 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
