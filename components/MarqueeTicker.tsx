"use client";

// ─── MarqueeTicker ─────────────────────────────────────────────────────────────
// Editorial marquee strip — sits between the Work and About sections.
// Single row, slow drift, warm palette to match the portfolio aesthetic.
//
// Usage: drop <MarqueeTicker /> between the #work and #about <section> tags
// in page.tsx. No props needed.
// ──────────────────────────────────────────────────────────────────────────────

export default function MarqueeTicker() {
  const items = [
    "product strategy",
    "visual storytelling",
    "emotional ux",
    "creative systems",
    "fandom + memory",
    "editorial thinking",
    "cinematic",
    "elevated",
    "saved fragments",
    "usc cs + business",
    "frontend",
    "anqclic",
  ];

  // Duplicate so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="marquee-ticker-wrapper">
      <div className="marquee-ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-ticker-item">
            {item}
            <span className="marquee-ticker-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        /* ── wrapper: full-bleed, sits between sections ── */
        .marquee-ticker-wrapper {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid rgba(32, 28, 26, 0.06);
          border-bottom: 1px solid rgba(32, 28, 26, 0.06);
          background: rgba(255, 255, 255, 0.38);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 14px 0;
          /* pull it out of the padded section containers */
          margin-left: calc(-1 * var(--page-px, 1rem));
          margin-right: calc(-1 * var(--page-px, 1rem));
          /* vertical breathing room */
          margin-bottom: 1rem;
        }

        /* ── scrolling track ── */
        .marquee-ticker-inner {
          display: flex;
          white-space: nowrap;
          animation: marquee-scroll 38s linear infinite;
          width: max-content;
        }

        /* pause on hover for readability */
        .marquee-ticker-wrapper:hover .marquee-ticker-inner {
          animation-play-state: paused;
        }

        /* ── individual item ── */
        .marquee-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7c7068;
          padding: 0 0.1rem;
          transition: color 180ms ease;
        }

        .marquee-ticker-wrapper:hover .marquee-ticker-item:hover {
          color: #201c1a;
        }

        /* ── separator ── */
        .marquee-ticker-sep {
          display: inline-block;
          margin: 0 1.1rem;
          font-size: 0.6rem;
          color: #c8bdb2;
          vertical-align: middle;
        }

        /* ── keyframe: scroll exactly half (one set of items) then reset ── */
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── respect reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .marquee-ticker-inner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}