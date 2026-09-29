"use client";

import React from "react";

export function CodingBackground() {
  const symbols = [
    // Top / Hero region
    { text: ">_", top: "10%", left: "8%", size: "text-3xl sm:text-4xl", opacity: "opacity-[0.07]" },
    { text: "{ }", top: "18%", left: "14%", size: "text-2xl sm:text-3xl", opacity: "opacity-[0.06]" },
    { text: "</>", top: "12%", left: "86%", size: "text-3xl sm:text-4xl", opacity: "opacity-[0.07]" },
    { text: "() =>", top: "22%", left: "80%", size: "text-xl sm:text-2xl", opacity: "opacity-[0.05]" },
    { text: "const", top: "28%", left: "6%", size: "text-lg", opacity: "opacity-[0.04]" },

    // Middle region
    { text: "{ }", top: "38%", left: "90%", size: "text-2xl sm:text-3xl", opacity: "opacity-[0.06]" },
    { text: ">_", top: "44%", left: "84%", size: "text-2xl sm:text-3xl", opacity: "opacity-[0.06]" },
    { text: "[ ]", top: "42%", left: "10%", size: "text-2xl sm:text-3xl", opacity: "opacity-[0.05]" },
    { text: "//", top: "52%", left: "5%", size: "text-2xl", opacity: "opacity-[0.04]" },
    { text: "async", top: "58%", left: "12%", size: "text-base sm:text-lg", opacity: "opacity-[0.05]" },

    // Lower region
    { text: "</>", top: "66%", left: "86%", size: "text-3xl sm:text-4xl", opacity: "opacity-[0.07]" },
    { text: "{ }", top: "74%", left: "80%", size: "text-2xl", opacity: "opacity-[0.06]" },
    { text: ">_", top: "78%", left: "7%", size: "text-3xl sm:text-4xl", opacity: "opacity-[0.07]" },
    { text: "{ }", top: "86%", left: "13%", size: "text-2xl sm:text-3xl", opacity: "opacity-[0.06]" },
    { text: "=== true", top: "88%", left: "75%", size: "text-sm sm:text-base", opacity: "opacity-[0.05]" },
    { text: "return;", top: "94%", left: "45%", size: "text-sm", opacity: "opacity-[0.04]" },
  ];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {symbols.map((item, idx) => (
        <span
          key={idx}
          className={`absolute font-mono font-bold text-white ${item.size} ${item.opacity}`}
          style={{ top: item.top, left: item.left }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
