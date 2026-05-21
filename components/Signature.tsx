"use client";

import { useEffect, useRef } from "react";

export default function Signature() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSignature() {
      try {
        const response = await fetch("/images/signature.svg");
        const svgText = await response.text();

        if (cancelled || !containerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) return;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "auto");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

        const paths = svg.querySelectorAll("path");

        paths.forEach((path, index) => {
          const p = path as SVGPathElement;
          const length = p.getTotalLength();

          p.setAttribute("fill", "none");
          p.setAttribute("stroke", "currentColor");
          p.setAttribute("stroke-width", "2.4");
          p.setAttribute("stroke-linecap", "round");
          p.setAttribute("stroke-linejoin", "round");

          p.style.strokeDasharray = `${length}`;
          p.style.strokeDashoffset = `${length}`;
          p.style.animation = `drawStroke 3.8s ease forwards ${index * 0.015}s`;
        });

        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(svg);
      } catch {
        // ignore for now
      }
    }

    loadSignature();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={containerRef} className="signature-wrap w-full max-w-[760px] scale-[1.45] origin-left select-none text-[#1e1917]" />;
}