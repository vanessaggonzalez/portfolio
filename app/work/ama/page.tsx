"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      setTimeout(() => el.classList.add("revealed"), Number(el.dataset.delay ?? 0));
      observer.unobserve(el);
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const decks = {
  fall: { label: "Fall 2025", note: "semester recap", src: "https://docs.google.com/presentation/d/1papHnsv3kCHD2-InhZBpUl5sQwaGRkLLhkwzgTNHzo4/embed?start=false&loop=false&delayms=3000" },
  spring: { label: "Spring 2026", note: "end-of-semester portfolio", src: "https://docs.google.com/presentation/d/11KYnDoGkceYtF8tPn1Vrx6AC6VZ-MJzmkavsYSlDf4A/embed?start=false&loop=false&delayms=3000" },
};

const growth = [
  { label: "Posts", fall: 22, spring: 32 },
  { label: "Reels", fall: 1, spring: 4 },
  { label: "Stories", fall: 72, spring: 96 },
  { label: "Takeovers", fall: 5, spring: 4 },
];

export default function AMAPage() {
  useReveal();
  const [activeDeck, setActiveDeck] = useState<keyof typeof decks>("spring");
  const deck = decks[activeDeck];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#dedbea]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">American Marketing Association · USC</p>
              <h1 className="mt-5 font-serif text-[2.7rem] font-semibold leading-[1.04] text-[#1f1a18] sm:text-[3.7rem]">From running the work to leading the portfolio.</h1>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#77708a]">VP of Marketing · Team Leadership · Client Strategy</p>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">After managing a five-person internal marketing team and building a repeatable content operation, I was promoted to co-lead a 30-member division spanning AMA’s brand and two external client engagements.</p>
              <span className="mt-7 w-fit rounded-full bg-[#50496b] px-4 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-white">promoted · Internal PM → VP Marketing</span>
            </div>

            <div className="reveal-item relative min-h-[470px] overflow-hidden bg-gradient-to-br from-[#302d46] via-[#514b70] to-[#252336] p-7 sm:p-10" data-delay={80}>
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#b8a7e6]/20 blur-[70px]" />
              <div className="relative flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.055] p-6 text-white shadow-[0_25px_65px_rgba(20,18,35,0.25)] backdrop-blur-sm">
                <div className="flex items-center justify-between"><div><p className="text-[0.52rem] uppercase tracking-[0.23em] text-white/35">marketing division / current portfolio</p><p className="mt-2 font-serif text-xl text-white/90">Three workstreams. One operating system.</p></div><span className="font-serif text-3xl text-[#cbbbf0]">30</span></div>
                <div className="my-auto grid gap-3 sm:grid-cols-3">
                  {[["internal", "AMA brand", "recruitment · content · events"], ["returning", "But Cute", "consumer brand · client retention"], ["new", "Live Lagree", "USC acquisition · local growth"]].map(([type, title, detail], i) => <div key={title} className={`rounded-[19px] border border-white/10 p-5 ${i === 0 ? "bg-[#a997db]/15" : "bg-white/[0.045]"}`}><p className="text-[0.5rem] uppercase tracking-[0.18em] text-[#cbbbf0]">{type}</p><p className="mt-3 font-serif text-lg text-white/85">{title}</p><p className="mt-3 text-[0.65rem] leading-5 text-white/40">{detail}</p></div>)}
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">{[["03", "workstreams"], ["02", "clients"], ["01", "division"]].map(([value, label]) => <div key={label}><p className="font-serif text-lg text-white/80">{value}</p><p className="text-[0.48rem] uppercase tracking-[0.16em] text-white/30">{label}</p></div>)}</div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{[["VP", "Marketing & Co-Lead"], ["30", "members co-led"], ["02", "client engagements"], ["120K+", "views in 60 days"]].map(([value, label], i) => <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#5b5379]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* PROMOTION ARC */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.38fr_1.62fr]" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the evolution</p><p className="max-w-5xl font-serif text-[1.7rem] leading-[1.42] text-[#342d29] sm:text-[2.1rem]">I earned the opportunity to lead the division by first getting close to the work: rebuilding systems, managing delivery, and showing that <span className="italic text-[#71658f]">creative operations could produce measurable growth.</span></p></div>
            <div className="reveal-item mt-11 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center" data-delay={80}>
              <div className="rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_45px_rgba(68,44,29,0.05)]"><p className="text-[0.56rem] uppercase tracking-[0.22em] text-[#a89d96]">then · Internal Marketing PM</p><p className="mt-3 font-serif text-xl text-[#342d29]">Own the operation</p><p className="mt-4 text-[0.82rem] leading-7 text-[#5e5048]">Managed five creatives, rebuilt AMA’s Figma kit, standardized event-promotion handoffs, and expanded community-led short-form content.</p></div>
              <div className="hidden flex-col items-center gap-2 text-[#8f82b4] lg:flex"><span className="h-px w-12 bg-current" /><span className="text-xl">→</span><span className="h-px w-12 bg-current" /></div>
              <div className="rounded-[28px] bg-[#312d46] p-7 text-white shadow-[0_22px_55px_rgba(49,45,70,0.16)]"><p className="text-[0.56rem] uppercase tracking-[0.22em] text-white/35">now · VP of Marketing</p><p className="mt-3 font-serif text-xl text-white/90">Design the system around the work</p><p className="mt-4 text-[0.82rem] leading-7 text-white/55">Set direction across 30 members, support project managers, align scopes, place people by strength, and create accountability across three simultaneous workstreams.</p></div>
            </div>
          </section>

          {/* INTERNAL FOUNDATION */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">internal foundation</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">A repeatable content operation—not isolated posts.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">Standardized assets, clearer handoffs, consistent publishing, and more community-centered short form gave the team a system it could execute together.</p></div>
              <div className="rounded-[30px] bg-white p-7 shadow-[0_22px_55px_rgba(68,44,29,0.07)]"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#a89d96]">60-day organic performance</p><p className="mt-2 font-serif text-2xl text-[#342d29]">Audience growth dashboard</p></div><span className="rounded-full bg-[#eee9f7] px-3 py-1 text-[0.55rem] text-[#675b89]">+47% engagement</span></div><div className="mt-8 grid grid-cols-3 gap-4">{[["120K+", "organic views"], ["14,358", "accounts reached"], ["5", "team members"]].map(([value, label]) => <div key={label}><p className="font-serif text-2xl text-[#5b5379]">{value}</p><p className="mt-1 text-[0.5rem] uppercase tracking-[0.16em] text-[#a89d96]">{label}</p></div>)}</div>
                <div className="mt-8 space-y-4">{growth.map((row) => { const max = 100; const fallWidth = Math.max(10, (row.fall / max) * 100); const springWidth = Math.max(10, (row.spring / max) * 100); return <div key={row.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3"><span className="text-[0.62rem] text-[#6b5d55]">{row.label}</span><div className="space-y-1"><div className="h-2 rounded-full bg-[#ddd8e8]" style={{ width: `${fallWidth}%` }} /><div className="h-2 rounded-full bg-[#75699a]" style={{ width: `${springWidth}%` }} /></div></div>; })}</div><div className="mt-5 flex gap-5 text-[0.52rem] uppercase tracking-[0.14em] text-[#a89d96]"><span>— Fall ’25</span><span className="text-[#675b89]">— Spring ’26</span></div>
              </div>
            </div>
          </section>

          {/* PORTFOLIO */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">current portfolio</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Internal brand, returning trust, new-market growth.</h2></div>
            <div className="reveal-item mt-10 divide-y divide-black/5 border-y border-black/5" data-delay={80}>
              {[
                ["01", "AMA Internal Marketing", "Internal brand team", "Recruitment marketing, social strategy, campus event coverage, and operational support for the Internal Marketing PM."],
                ["02", "But Cute", "Returning consumer client", "Continuing a retained relationship with a plush-products brand and building on the previous semester’s engagement."],
                ["03", "Live Lagree", "New local client", "Developing a USC acquisition strategy around student partnerships, accessible introductory offers, and convenience-led positioning."],
              ].map(([num, name, type, body]) => <article key={num} className="grid gap-3 py-7 sm:grid-cols-[3rem_0.8fr_0.7fr_1.5fr] sm:items-start"><span className="font-serif text-xl text-[#9a8ebd]">{num}</span><p className="font-serif text-lg text-[#342d29]">{name}</p><p className="text-[0.56rem] uppercase tracking-[0.17em] text-[#8f82aa]">{type}</p><p className="text-[0.8rem] leading-6 text-[#5e5048]">{body}</p></article>)}
            </div>
          </section>

          {/* LEADERSHIP SYSTEM */}
          <section className="border-y border-black/5 bg-gradient-to-r from-[#ece9f5] via-[#fffaf6] to-[#e6e2ee] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.75fr_1.25fr]" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#776c95]">leadership approach</p><h2 className="mt-3 font-serif text-[2rem] leading-tight text-[#342d29]">Structure without micromanagement.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">My job is to create clarity around outcomes, owners, and decision points—then preserve room for members to bring their own strengths and creative judgment.</p></div><div className="grid gap-5 sm:grid-cols-2">{[["01", "Set direction", "Define the problem, success criteria, and strategic guardrails."], ["02", "Place by strength", "Match responsibilities to how people work best."], ["03", "Support the PMs", "Create escalation paths and unblock delivery without taking over."], ["04", "Protect ownership", "Hold teams accountable while leaving room for creative decisions."]].map(([num, title, body]) => <div key={num} className="border-t border-[#9c91b5]/30 pt-4"><span className="font-serif text-lg text-[#887ba6]">{num}</span><p className="mt-2 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div></div>
          </section>

          {/* DECK SWITCHER */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item flex flex-wrap items-end justify-between gap-5" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">internal marketing archive</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Two semesters of the work</h2></div><div className="flex rounded-full border border-black/5 bg-[#fffaf6] p-1">{(Object.keys(decks) as Array<keyof typeof decks>).map((key) => <button key={key} onClick={() => setActiveDeck(key)} className={`rounded-full px-4 py-2 text-[0.58rem] uppercase tracking-[0.17em] transition ${activeDeck === key ? "bg-[#4d4667] text-white shadow-sm" : "text-[#8a7d75] hover:text-[#342d29]"}`}>{decks[key].label}</button>)}</div></div>
            <div className="reveal-item mt-7" data-delay={80}><p className="mb-3 text-[0.58rem] uppercase tracking-[0.2em] text-[#a89d96]">{deck.label} · {deck.note}</p><div className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_24px_70px_rgba(68,44,29,0.10)]" style={{ aspectRatio: "16/9" }}><iframe key={activeDeck} src={deck.src} className="block h-full w-full border-0" allowFullScreen title={`AMA USC — ${deck.label}`} /></div></div>
          </section>

          {/* CLOSE */}
          <section className="bg-[#302d45] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16"><div className="reveal-item" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/35">what changed</p><p className="mt-5 max-w-5xl font-serif text-[2rem] leading-[1.2] text-white/90 sm:text-[2.8rem]">Leadership became less about personally touching every deliverable—and more about <span className="italic text-[#c9b9ed]">designing the conditions for good work to happen repeatedly.</span></p></div></section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work/usc-marcomm" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← USC MarComm</Link><Link href="/work/anqclic" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Anqclic →</Link></div>
        </div>
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
