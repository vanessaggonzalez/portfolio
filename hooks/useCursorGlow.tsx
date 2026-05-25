"use client";

import { useEffect } from "react";

// ─── useCursorGlow ─────────────────────────────────────────────────────────────
// Renders a warm candlelight orb that follows the cursor around the page.
// The orb is injected as a fixed div so it never affects layout.
// ──────────────────────────────────────────────────────────────────────────────

export function useCursorGlow() {
  useEffect(() => {
    // Create the orb element
    const orb = document.createElement("div");
    orb.id = "cursor-glow-orb";
    orb.setAttribute("aria-hidden", "true");

    Object.assign(orb.style, {
      position:        "fixed",
      top:             "0",
      left:            "0",
      width:           "420px",
      height:          "420px",
      borderRadius:    "50%",
      pointerEvents:   "none",
      zIndex:          "9999",
      transform:       "translate(-50%, -50%)",
      background:      "radial-gradient(circle, rgba(230,185,140,0.18) 0%, rgba(230,185,140,0.07) 40%, transparent 70%)",
      transition:      "opacity 0.4s ease",
      opacity:         "0",
      willChange:      "transform",
    });

    document.body.appendChild(orb);

    let visible = false;
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let orbX   = 0;
    let orbY   = 0;

    // Smooth lerp so the orb drifts slightly behind the cursor
    const LERP = 0.1;

    function tick() {
      orbX += (mouseX - orbX) * LERP;
      orbY += (mouseY - orbY) * LERP;
      orb.style.left = `${orbX}px`;
      orb.style.top  = `${orbY}px`;
      rafId = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        orb.style.opacity = "1";
        visible = true;
      }
    }

    function onLeave() {
      orb.style.opacity = "0";
      visible = false;
    }

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      orb.style.display = "none";
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      orb.remove();
    };
  }, []);
}