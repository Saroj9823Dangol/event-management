"use client";

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Noise Texture - Increased opacity for a rougher surface feel */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>

      {/* Rectangular Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundSize: "50px 50px",
          backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px),
            repeating-linear-gradient(90deg, hsl(var(--accent)) 0, hsl(var(--accent)) 1px, transparent 1px, transparent 50px)
          `,
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

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gray-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gray-700/10 rounded-full blur-3xl"></div>
    </div>
  );
}
