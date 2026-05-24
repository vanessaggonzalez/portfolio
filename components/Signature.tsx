"use client";

import { useEffect, useRef, useState } from "react";

export default function Signature() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    async function loadSignature() {
      try {
        const response = await fetch("/images/signature.svg");
        if (!response.ok) return;

        const svgText = await response.text();
        if (cancelled || !containerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) return;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "auto");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("aria-hidden", "true");
        svg.style.display = "block";
        svg.style.overflow = "visible";

        const paths = svg.querySelectorAll("path");

        paths.forEach((path, index) => {
          const p = path as SVGPathElement;

          p.setAttribute("fill", "none");
          p.setAttribute("stroke", "currentColor");
          p.setAttribute("stroke-width", "2.1");
          p.setAttribute("stroke-linecap", "round");
          p.setAttribute("stroke-linejoin", "round");

          if (reducedMotion) {
            p.style.strokeDasharray = "none";
            p.style.strokeDashoffset = "0";
            p.style.animation = "none";
            return;
          }

          const length = p.getTotalLength();
          p.style.strokeDasharray = `${length}`;
          p.style.strokeDashoffset = `${length}`;
          p.style.animation = `drawStroke 3.4s ease forwards ${index * 0.015}s`;
        });

        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(svg);
        setIsReady(true);
      } catch {
        // ignore for now
      }
    }

    loadSignature();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[920px] justify-center">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[90%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6eee7]/90 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-20 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/6 to-transparent"
      />

      <div
        ref={containerRef}
        className={`signature-wrap relative z-10 w-full max-w-[760px] select-none text-[#1e1917] transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-80"
        }`}
      />

      <style jsx>{`
        @keyframes drawStroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        .signature-wrap :global(svg) {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </div>
  );
}