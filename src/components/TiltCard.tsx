"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 8)
  scale?: number; // Scale on hover (default: 1.015)
  liftPx?: number; // Vertical lift in px (default: 6)
  glare?: boolean; // Enable interactive cursor spotlight glare (default: true)
  glareColor?: string; // Glare color (default: cyan rgba)
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  scale = 1.012,
  liftPx = 5,
  glare = true,
  glareColor = "rgba(0, 212, 255, 0.12)",
  style: userStyle,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [canHover, setCanHover] = useState(true);

  // Check hover media capability on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  const [cardTransform, setCardTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    translateY: 0,
    isHovered: false,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !cardRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate cursor position inside the card (px)
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Normalized between -1 and 1
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const normX = (x - centerX) / centerX;
        const normY = (y - centerY) / centerY;

        // Inverted rotateX: cursor up -> tilts up; cursor down -> tilts down
        const rotX = -normY * maxTilt;
        const rotY = normX * maxTilt;

        setCardTransform({
          rotateX: parseFloat(rotX.toFixed(2)),
          rotateY: parseFloat(rotY.toFixed(2)),
          scale: scale,
          translateY: -liftPx,
          isHovered: true,
          glareX: parseFloat(((x / rect.width) * 100).toFixed(1)),
          glareY: parseFloat(((y / rect.height) * 100).toFixed(1)),
          glareOpacity: 1,
        });
      });
    },
    [canHover, maxTilt, scale, liftPx]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setCardTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateY: 0,
      isHovered: false,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  }, []);

  const transformStyle: React.CSSProperties = canHover
    ? {
        transform: `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, 1) translateY(${cardTransform.translateY}px)`,
        transition: cardTransform.isHovered
          ? "transform 0.12s cubic-bezier(0.03, 0.98, 0.52, 0.99)"
          : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }
    : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...transformStyle,
        ...userStyle,
      }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Light Glare Overlay */}
      {glare && canHover && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: cardTransform.glareOpacity,
            background: `radial-gradient(circle 320px at ${cardTransform.glareX}% ${cardTransform.glareY}%, ${glareColor}, transparent 70%)`,
          }}
        />
      )}

      {children}
    </div>
  );
}
