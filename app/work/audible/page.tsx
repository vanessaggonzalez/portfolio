"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const tags = [
  "gen z behavior",
  "feature strategy",
  "audience research",
  "social interaction",
  "product thinking",
  "figma",
  "ux",
  "case competition",
];

const sections = [
  {
    label: "the brief",
    heading: "What we were solving for",
    body: `This was a product case competition run through ProductSC and sponsored by Amazon — the challenge was to design a new feature for Audible that would meaningfully increase Gen Z engagement on the platform. We had a limited window to go from research to a fully pitched concept, and we treated it like a real product sprint.

The insight we kept coming back to was that Gen Z doesn't just consume content — they collect it, share it, and build identity around it. Audiobooks had all the raw material for that kind of emotional resonance, but no real way to surface those moments socially. That gap became our starting point.`,
  },
  {
    label: "the concept",
    heading: "Clip & Share",
    body: `Clip & Share is a feature that lets users save short, meaningful moments from audiobooks — a line that hit differently, a chapter that made them cry, a quote they wanted to remember — and share them across Instagram, TikTok, and other platforms as styled audio cards.

The idea was rooted in how fan communities already behave: people screenshot passages, quote books in their bios, post aesthetic reading content. We were just giving Audible a native way to be part of that ecosystem rather than outside of it. The shareable cards would include the book cover, a waveform clip, and the listener's handle — keeping Audible in the frame every time something got shared.`,
  },
  {
    label: "my approach",
    heading: "How I showed up to this",
    body: `This was a fully collaborative project — four of us contributed across every part of it, from the initial research phase through the final pitch. I wasn't leading it so much as I was deeply in it: helping shape the research questions, pushing on the narrative arc of the deck, thinking through the user flows, and making sure the story we were telling felt cohesive and emotionally grounded, not just technically complete.

The part I found myself most drawn to was the "why does this matter to a real person" layer — making sure every slide answered that question, not just the feature mechanics. I care a lot about products that feel human, and I think that came through in how we positioned the concept.`,
  },
  {
    label: "the outcome",
    heading: "First place",
    body: `We won. Which still feels good to say.

Beyond the result, what I took away was a much clearer sense of how to move fast on a product problem without losing the craft of it. The constraints were real — limited time, a platform we didn't work at, an audience we had to understand quickly — and I think the work was better for it. It confirmed something I already suspected: I like working on things where emotional behavior and product strategy overlap. That's the space I want to keep building in.`,
  },
];

export default function AudiblePage() {
  useReveal();

  const navLinks = [
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Resume",  href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      {/* GRAIN */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      {/* GLOW */}
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]" />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link href="/work" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">
                ← work
              </Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* TITLE BLOCK */}
            <div className="reveal-item mt-10 max-w-3xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                01 · featured case study · productsc x amazon
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                Audible — Clip & Share
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Product strategy / UX / storytelling
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                A feature concept designed to help Audible users save and share
                emotionally resonant moments from audiobooks — built for the way
                Gen Z already moves through content.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ First-place winning concept · Amazon-sponsored case competition
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the deck
            </div>

            {/* FIGMA EMBED */}
            <div className="reveal-item" data-delay={80}>
              <div className="overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_70px_rgba(68,44,29,0.08)]" style={{ aspectRatio: "16/9", width: "100%" }}>
                <iframe
                  style={{ border: "none", width: "100%", height: "100%", display: "block" }}
                  src="https://embed.figma.com/slides/mWQs6hcMR2qGervNAAPTlu/Audible?node-id=1-335&embed-host=share"
                  allowFullScreen
                  title="Audible — Clip & Share presentation deck"
                />
              </div>
              <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                39 slides · figma presentation
              </p>
            </div>

            {/* DIVIDER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the story
            </div>

            {/* WRITTEN SECTIONS */}
            <div className="grid gap-5 lg:grid-cols-2">
              {sections.map((section, i) => (
                <div
                  key={section.label}
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                  data-delay={i * 80}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    {section.label}
                  </p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[0.95rem] leading-8 text-[#4d413b]">
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link
                href="/work"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                all work
              </Link>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                anqclic / creative archive
              </p>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between border-t border-black/5 pt-6 text-[0.68rem] uppercase tracking-[0.3em] text-[#a89d96]">
            <span>Vanessa Gonzalez</span>
            <span>anqclic / creative archive</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>

        <style>{`
          .reveal-item {
            opacity: 0;
            transform: translateY(16px);
            transition:
              opacity  700ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal-item { opacity: 1; transform: none; transition: none; }
          }
          .grain-overlay {
            opacity: 0.06;
            mix-blend-mode: multiply;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
            background-size: 280px 280px;
            background-repeat: repeat;
          }
        `}</style>
      </div>
    </main>
  );
}