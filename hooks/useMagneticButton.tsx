"use client";

import { useEffect } from "react";

// ─── useMagneticButton ─────────────────────────────────────────────────────────
// Adds a magnetic pull effect to any element with the class "magnetic-btn".
// As the cursor approaches, the button drifts toward it. On mouse leave it
// springs back smoothly.
//
// Usage:
//   1. Call useMagneticButton() in your page component (alongside useTilt etc.)
//   2. Add className="magnetic-btn" to any button/anchor you want affected.
//
// Strength and radius are tuned for the portfolio's two hero CTAs — tweak
// STRENGTH and RADIUS below if you add it to other elements.
// ──────────────────────────────────────────────────────────────────────────────

const STRENGTH = 0.38;  // how far the button travels (0 = none, 1 = full offset)
const RADIUS   = 90;    // px from center where the magnet activates

export function useMagneticButton() {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-btn");

    const handlers: Array<{
      el: HTMLElement;
      onMove: (e: MouseEvent) => void;
      onLeave: () => void;
    }> = [];

    buttons.forEach((el) => {
      function onMove(e: MouseEvent) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH;
          el.style.transform  = `translate(${dx * pull}px, ${dy * pull}px)`;
          el.style.transition = "transform 0.1s ease";
        } else {
          onLeave();
        }
      }

      function onLeave() {
        el.style.transform  = "translate(0px, 0px)";
        el.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
      }

      window.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        // reset transform on unmount
        el.style.transform  = "";
        el.style.transition = "";
      });
    };
  }, []);
}