/**
 * Smoke / fog that rises over the bottom edge of the hero figure.
 * An SVG turbulence filter roughens the edges of the soft clouds so they read
 * as wisps of smoke; the CSS `smoke` keyframes make them drift.
 */
const clouds = [
  { cls: "left-[-6%] bottom-[-10%] h-40 w-72 bg-[#F6F1E6]", delay: "0s" },
  { cls: "left-[22%] bottom-[-14%] h-44 w-80 bg-[#F3EDE0]", delay: "-3s" },
  { cls: "right-[-6%] bottom-[-10%] h-40 w-72 bg-[#F6F1E6]", delay: "-6s" },
  { cls: "left-[8%] bottom-[2%] h-28 w-56 bg-[#F8F4EB]/90", delay: "-1.5s" },
  { cls: "right-[10%] bottom-[4%] h-28 w-56 bg-[#F8F4EB]/90", delay: "-4.5s" },
  { cls: "left-[35%] bottom-[10%] h-24 w-60 bg-[#FAF8F5]/80", delay: "-7.5s" },
];

export default function Smoke() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-28%] bottom-[-6%] z-[5] h-[46%] [mask-image:radial-gradient(ellipse_50%_85%_at_50%_100%,#000_45%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_50%_85%_at_50%_100%,#000_45%,transparent_100%)]"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="smoke-filter" x="-20%" y="-30%" width="140%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.018" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" result="warp" />
            <feGaussianBlur in="warp" stdDeviation="10" />
          </filter>
        </defs>
      </svg>

      {/* progressive blur: stronger toward the bottom */}
      <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_top,#000_40%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_40%,transparent)]" />

      {/* drifting clouds */}
      <div className="absolute inset-0" style={{ filter: "url(#smoke-filter)" }}>
        {clouds.map((c, i) => (
          <span key={i} className={`smoke absolute rounded-full blur-2xl ${c.cls}`} style={{ animationDelay: c.delay }} />
        ))}
      </div>

      {/* solid fade so the very bottom edge is always hidden */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />
    </div>
  );
}
