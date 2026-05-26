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

const RESUME_FILE_ID = "11DqOy3xDl43M3p3GnzbAreNiny16SDfa";
const RESUME_EMBED_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;

const highlights = [
  { value: "USC", label: "CS + Business · May 2027" },
  { value: "BofA", label: "Incoming · Global Tech & Ops" },
  { value: "4+", label: "years of experience" },
  { value: "630K+", label: "views built from scratch" },
];

const skills = [
  {
    category: "Marketing & Strategy",
    items: ["Content strategy", "Campaign management", "Analytics", "A/B testing", "Brand guidelines", "SEO"],
  },
  {
    category: "Design & Creative",
    items: ["Canva", "Adobe After Effects", "Photoshop", "Media Encoder", "Figma", "Typography"],
  },
  {
    category: "Web & Technical",
    items: ["Next.js", "React", "HTML / CSS", "WordPress", "Elementor", "Google Analytics"],
  },
  {
    category: "Tools & Platforms",
    items: ["Slate", "Campaign Monitor", "Canvas LMS", "Instagram", "Google Suite", "AI/ML basics"],
  },
];

export default function ResumePage() {
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
              <Link href="/" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">
                ← back
              </Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* INTRO */}
            <div className="reveal-item mt-10 max-w-2xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                resume / vanessa gonzalez
              </p>
              <h1 className="mt-4 font-serif text-[2.2rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.8rem]">
                The one-pager.
              </h1>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#4d413b]">
                USC CS + Business, graduating May 2027. I'm incoming at Bank of America's Global Tech & Ops group — and I've spent the last few years building things at the intersection of creative work, marketing strategy, and product thinking. The resume is below. Download it if you need it.
              </p>
              {/* CTA BUTTONS */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={RESUME_DOWNLOAD_URL}
                  download
                  className="rounded-full bg-[#201c1a] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#f7f1eb] shadow-[0_8px_24px_rgba(32,28,26,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(32,28,26,0.28)]"
                >
                  download pdf →
                </a>
                <a
                  href={RESUME_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  open in google drive ↗
                </a>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              at a glance
            </div>

            {/* HIGHLIGHT STATS */}
            <div className="reveal-item grid grid-cols-2 gap-4 sm:grid-cols-4" data-delay={80}>
              {highlights.map((h) => (
                <div key={h.label} className="rounded-[24px] border border-black/5 bg-white/72 p-6 text-center shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="font-serif text-[1.5rem] font-semibold leading-tight text-[#1f1a18]">{h.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">{h.label}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              skills & tools
            </div>

            {/* SKILLS */}
            <div className="reveal-item grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-delay={80}>
              {skills.map((group) => (
                <div key={group.category} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{group.category}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the full thing
            </div>

            {/* PDF EMBED */}
            <div className="reveal-item" data-delay={80}>
              <div
                className="overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_70px_rgba(68,44,29,0.08)]"
                style={{ aspectRatio: "8.5/11", width: "100%", maxWidth: "860px", margin: "0 auto" }}
              >
                <iframe
                  src={RESUME_EMBED_URL}
                  style={{ border: "none", width: "100%", height: "100%", display: "block" }}
                  allow="autoplay"
                  title="Vanessa Gonzalez — Resume"
                />
              </div>
              <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                vanessa gonzalez · resume · 2026
              </p>
            </div>

            {/* BOTTOM CTA */}
            <div className="reveal-item mt-10 flex flex-col items-center gap-4 border-t border-black/5 pt-8" data-delay={0}>
              <p className="text-[0.82rem] uppercase tracking-[0.28em] text-[#7c7068]">want to work together?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={RESUME_DOWNLOAD_URL}
                  download
                  className="rounded-full bg-[#201c1a] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#f7f1eb] shadow-[0_8px_24px_rgba(32,28,26,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(32,28,26,0.28)]"
                >
                  download resume →
                </a>
                <Link
                  href="/contact"
                  className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  get in touch →
                </Link>
                <Link
                  href="/work"
                  className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  see my work →
                </Link>
              </div>
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