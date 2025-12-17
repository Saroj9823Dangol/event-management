"use client";
import { useEffect, useRef } from "react";

export function BackgroundPattern() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = ev;
      containerRef.current.style.setProperty("--x", `${clientX}px`);
      containerRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      style={
        {
          "--x": "0px",
          "--y": "0px",
        } as React.CSSProperties
      }
    >
      {/* Noise Texture - Increased opacity for a rougher surface feel */}
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>

      {/* Rectangular Grid - Base Layer */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(90deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px)
          `,
        }}
      ></div>

      {/* Rectangular Grid - Spotlight Layer */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay will-change-[mask-image]"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(90deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px)
          `,
          maskImage:
            "radial-gradient(circle 300px at var(--x) var(--y), black, transparent)",
          WebkitMaskImage:
            "radial-gradient(circle 300px at var(--x) var(--y), black, transparent)",
        }}
      ></div>

      {/* Gray Curves */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 C 30 40 70 40 100 0 L 100 100 L 0 100 Z"
          fill="url(#grad1)"
        />
        <path
          d="M0 100 C 30 60 70 60 100 100 L 100 0 L 0 0 Z"
          fill="url(#grad2)"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0 }}
            />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0.3 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
