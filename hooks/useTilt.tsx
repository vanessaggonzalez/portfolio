"use client";

import { useEffect } from "react";

// ─── useTilt ───────────────────────────────────────────────────────────────────
// Adds a 3D perspective tilt to any element with class "tilt-card".
// If the card contains a "tilt-gloss" child, a specular highlight moves
// with the tilt — like light catching a physical photo.
//
// Usage:
//   1. Call useTilt() in your page component.
//   2. Add className="tilt-card" to any card you want affected.
//   3. Optionally add <div className="tilt-gloss pointer-events-none absolute inset-0 rounded-[...]" />
//      as the last child of the card for the gloss overlay.
// ──────────────────────────────────────────────────────────────────────────────

const MAX_TILT   = 10;   // degrees — keep it subtle for the editorial aesthetic
const GLOSS_OPACITY = 0.13;

export function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".tilt-card");

    const handlers: Array<{
      el: HTMLElement;
      onMove: (e: MouseEvent) => void;
      onLeave: () => void;
    }> = [];

    cards.forEach((el) => {
      // Ensure the card has perspective context
      el.style.transformStyle = "preserve-3d";
      el.style.willChange     = "transform";

      const gloss = el.querySelector<HTMLElement>(".tilt-gloss");

      function onMove(e: MouseEvent) {
        const rect  = el.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
        const dy    = (e.clientY - cy) / (rect.height / 2); // -1 to 1

        const rotateX = -dy * MAX_TILT;
        const rotateY =  dx * MAX_TILT;

        el.style.transform  = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        el.style.transition = "transform 0.12s ease";

        if (gloss) {
          // Move a radial highlight toward the light source (opposite of tilt)
          const gx = 50 - dx * 30; // percent
          const gy = 50 - dy * 30;
          gloss.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${GLOSS_OPACITY}), transparent 65%)`;
          gloss.style.opacity = "1";
        }
      }

      function onLeave() {
        el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
        el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";

        if (gloss) {
          gloss.style.opacity    = "0";
          gloss.style.transition = "opacity 0.4s ease";
        }
      }

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform      = "";
        el.style.transition     = "";
        el.style.transformStyle = "";
        el.style.willChange     = "";
      });
    };
  }, []);
}