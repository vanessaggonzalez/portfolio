"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      setTimeout(() => element.classList.add("revealed"), Number(element.dataset.delay ?? 0));
      observer.unobserve(element);
    }), { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

const RESUME_FILE_ID = "17g0oVao4KjBlYx_6EWgEKClY48EI9o-6";
const RESUME_EMBED_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing`;

const proof = [
  ["USC", "CS + Business · May 2027"],
  ["600+", "legacy files analyzed"],
  ["15", "business analysts interviewed"],
  ["630K+", "organic views built from scratch"],
];

const skillRows = [
  ["Product & strategy", "Product discovery · User research · Journey mapping · Backlog prioritization · GTM analytics · A/B testing"],
  ["AI & technical", "AI agents · Copilot Studio · Next.js · React · Python · Java · C++ · HTML/CSS"],
  ["Design & creative", "Figma · After Effects · Photoshop · Premiere Pro · Media Encoder · Canva"],
  ["Operations & platforms", "Jira · Confluence · WordPress · Google Analytics · Campaign Monitor · Salesforce"],
];

export default function ResumePage() {
  useReveal();

  const navLinks = [
    ["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"],
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/55 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← home</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{navLinks.map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* EDITORIAL DESK */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-20" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">resume / vanessa gonzalez</p>
              <h1 className="mt-5 font-serif text-[2.8rem] font-semibold leading-[1.03] text-[#1f1a18] sm:text-[4rem]">The one-pager.</h1>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">USC CS + Business senior working at the intersection of product strategy, technical systems, and visual storytelling.</p>
              <p className="mt-4 max-w-xl text-[0.86rem] leading-7 text-[#756860]">The résumé is the compressed version. The work across this site holds the research, decisions, interfaces, and creative instincts behind each line.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={RESUME_DOWNLOAD_URL} className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#f7f1eb] shadow-[0_10px_28px_rgba(32,28,26,0.18)] transition hover:-translate-y-0.5">download PDF ↓</a>
                <a href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/10 bg-white/72 px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#5f554f] transition hover:-translate-y-0.5 hover:text-[#201c1a]">open full document ↗</a>
              </div>
              <div className="mt-10 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.22em] text-[#afa198]"><span className="h-px w-9 bg-[#c8bdb2]" />Los Angeles · open to product-family roles</div>
            </div>

            <div className="reveal-item relative min-h-[590px] overflow-hidden bg-gradient-to-br from-[#e8ddd2] via-[#f5eee7] to-[#dcd0c5] p-8 sm:p-12" data-delay={80}>
              <div aria-hidden="true" className="absolute left-[17%] top-5 z-20 h-20 w-8 -rotate-12 rounded-full border-[3px] border-[#9f948c] border-b-transparent shadow-sm" />
              <div aria-hidden="true" className="absolute bottom-12 left-7 -rotate-6 font-serif text-[0.72rem] italic text-[#8b7c73]">the short version →</div>
              <div className="relative mx-auto h-full max-w-[470px] rotate-[1.2deg] overflow-hidden rounded-[4px] bg-white shadow-[0_30px_75px_rgba(64,45,34,0.20)] transition duration-500 hover:rotate-0">
                <iframe src={RESUME_EMBED_URL} className="block h-full min-h-[520px] w-full border-0" title="Vanessa Gonzalez — résumé preview" />
              </div>
              <div aria-hidden="true" className="absolute right-8 top-12 rotate-6 bg-[#f5e9cf]/90 px-4 py-3 font-serif text-[0.75rem] italic text-[#786a60] shadow-[0_8px_20px_rgba(68,44,29,0.08)]">one page,<br />many threads</div>
            </div>
          </section>

          {/* PROOF STRIP */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{proof.map(([value, label], index) => <div key={label} className={`p-6 text-center sm:p-8 ${index > 0 ? "sm:border-l sm:border-black/5" : ""} ${index > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[1.85rem] font-semibold text-[#796456]">{value}</p><p className="mt-2 text-[0.56rem] uppercase tracking-[0.19em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* SKILLS AS EDITORIAL INDEX */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.38fr_1.62fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">working index</p><h2 className="mt-3 font-serif text-[2rem] leading-tight text-[#342d29]">The range behind the résumé.</h2></div>
              <div className="divide-y divide-black/5 border-y border-black/5">{skillRows.map(([category, items], index) => <div key={category} className="grid gap-3 py-6 sm:grid-cols-[2.2rem_0.62fr_1.38fr] sm:items-start"><span className="font-serif text-lg text-[#c3b3a7]">0{index + 1}</span><p className="font-serif text-lg text-[#342d29]">{category}</p><p className="text-[0.78rem] leading-6 text-[#6b5d55]">{items}</p></div>)}</div>
            </div>
          </section>

          {/* BRIDGE TO PORTFOLIO */}
          <section className="border-y border-black/5 bg-gradient-to-r from-[#eadfd5] via-[#fffaf6] to-[#eee3dc] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.38fr_1.62fr]" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#9d8779]">beyond the bullet points</p><div><p className="max-w-4xl font-serif text-[1.8rem] leading-[1.35] text-[#342d29] sm:text-[2.35rem]">A résumé can name the outcome. A case study can show <span className="italic text-[#90705c]">how I think.</span></p><p className="mt-5 max-w-2xl text-[0.86rem] leading-7 text-[#6b5d55]">Explore the research, tradeoffs, systems, interfaces, and strategy underneath the one-page summary.</p><Link href="/work" className="mt-7 inline-flex rounded-full bg-[#5b493e] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5">see selected work →</Link></div></div>
          </section>

          {/* DOCUMENT DRAWER */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item flex flex-col items-center text-center" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">document drawer · current edition</p>
              <h2 className="mt-4 font-serif text-[2rem] text-[#342d29]">Need the clean copy?</h2>
              <p className="mt-4 max-w-xl text-[0.84rem] leading-7 text-[#6b5d55]">Open it in a new tab for the full-size view, or download the PDF directly.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3"><a href={RESUME_DOWNLOAD_URL} className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white">download résumé ↓</a><a href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-black/10 bg-white px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#5f554f]">view on Drive ↗</a><Link href="/contact" className="rounded-full border border-black/10 bg-white px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#5f554f]">get in touch →</Link></div>
            </div>
          </section>
        </div>

        <footer className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-6 pt-7 text-[0.6rem] uppercase tracking-[0.26em] text-[#a89d96] sm:px-6"><span>Vanessa Gonzalez</span><span>anqclic / creative archive</span><span>© {new Date().getFullYear()}</span></footer>
      </div>

      <style>{`
        .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); }
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        @media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </main>
  );
}