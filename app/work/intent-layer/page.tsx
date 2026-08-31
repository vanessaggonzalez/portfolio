"use client";

import Link from "next/link";
import { useEffect } from "react";

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

const findings = [
  { value: 97, title: "Repeated recommendations", body: "frequently saw the same titles repeatedly", sample: "n=34" },
  { value: 83, title: "One-title overreaction", body: "received unwanted recs after one title", sample: "n=24" },
  { value: 79, title: "Browsing friction", body: "sometimes browsed longer than they wanted", sample: "n=34" },
  { value: 62, title: "Situational choice", body: "said mood or viewing mode shaped selection", sample: "n=37" },
  { value: 62, title: "Pre-watch preference", body: "preferred clarifying intent while browsing", sample: "n=24" },
  { value: 52, title: "Misunderstood intent", body: "recalled a platform misreading why they watched", sample: "n=33" },
];

const respondentSignals = [
  { number: "01", title: "Genre missed the reason", body: "A viewer chose Sinners for its Southern Gothic qualities, then received horror recommendations despite not broadly enjoying horror." },
  { number: "02", title: "A shared account distorted taste", body: "After someone else watched a war movie on one respondent’s account, war titles began filling their recommendations." },
  { number: "03", title: "Tone mattered within genre", body: "A viewer wanted a particular kind of rom-com, while recommendations grouped titles with very different levels of romance, humor, and sincerity." },
];

const intentSignals = ["chosen family", "background viewing", "dark comedy", "something comforting", "short on time", "something new"];

const roadmap = [
  ["01", "Research", "Study when context breaks down."],
  ["02", "Taxonomy", "Turn motivations into usable language."],
  ["03", "Pre-watch MVP", "Prototype the moment of indecision."],
  ["04", "Learning loop", "Test lightweight post-watch feedback."],
];

const principles = [
  ["Optional", "Support indecision without interrupting viewers who already know what they want."],
  ["Low effort", "Select only a few signals, then skip, remove, or refine without restarting."],
  ["Compositional", "Combine mood, viewing mode, narrative qualities, time, and social context."],
  ["Explainable", "Show which selected qualities each result matches."],
];

export default function IntentLayerPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#e7d8dd]/60 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="relative overflow-hidden border-t border-black/5 bg-gradient-to-br from-[#2c2528] via-[#4a373d] to-[#211b1e] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#d49ba8]/20 blur-[90px]" />
            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="reveal-item" data-delay={0}>
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/40">Original product research · Streaming discovery</p>
                <h1 className="mt-5 font-serif text-[3rem] font-semibold leading-[1.02] sm:text-[4.2rem]">Intent Layer</h1>
                <p className="mt-5 max-w-xl font-serif text-[1.45rem] italic leading-9 text-white/80">Recommendation systems know what you watched. What if they understood why?</p>
                <p className="mt-6 max-w-xl text-[0.95rem] leading-8 text-white/60">An independent exploratory study of how mood, attention, social context, time, and story qualities shape what a viewer wants from a particular streaming occasion.</p>
                <div className="mt-7 flex flex-wrap gap-2">{["consumer research", "intent modeling", "personalization", "UX strategy"].map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/50">{tag}</span>)}</div>
              </div>

              <div className="reveal-item relative min-h-[390px]" data-delay={100}>
                {[
                  ["I want to feel understood", "left-0 top-12 -rotate-3", "intent 01"],
                  ["I need something comforting", "left-[28%] top-0 rotate-1", "intent 02"],
                  ["I loved their dynamic", "right-0 top-16 rotate-3", "intent 03"],
                  ["I only have 40 minutes", "left-[14%] bottom-5 rotate-2", "occasion"],
                  ["I want something in the background", "right-[2%] bottom-2 -rotate-2", "viewing mode"],
                ].map(([copy, position, label]) => <div key={copy} className={`absolute ${position} w-[43%] rounded-[20px] border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_55px_rgba(0,0,0,0.20)] backdrop-blur-md transition-transform duration-500 hover:z-10 hover:scale-105 hover:rotate-0`}><p className="text-[0.52rem] uppercase tracking-[0.2em] text-[#e7b6c1]">{label}</p><p className="mt-3 font-serif text-[1rem] italic leading-6 text-white/80">“{copy}”</p></div>)}
              </div>
            </div>
          </section>

          {/* RESEARCH SNAPSHOT */}
          <section className="grid grid-cols-2 border-b border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">
            {[["54", "survey starts"], ["44", "eligible viewers"], ["27", "submitted responses"], ["8–10", "interviews planned"]].map(([value, label], i) => <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#342d29]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}
          </section>

          {/* METHOD */}
          <section className="reveal-item grid gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[0.38fr_1.62fr] lg:px-14" data-delay={0}>
            <div><p className="text-[0.62rem] uppercase tracking-[0.27em] text-[#a89d96]">method · August 2026</p><p className="mt-2 text-[0.65rem] leading-5 text-[#a89d96]">Exploratory, directional evidence</p></div>
            <div><p className="max-w-4xl font-serif text-[1.6rem] leading-[1.42] text-[#342d29] sm:text-[1.9rem]">I designed an anonymous survey around real viewing occasions—not general taste—to examine where recommendation context breaks down.</p><p className="mt-5 max-w-3xl text-[0.82rem] leading-7 text-[#6b5d55]">Question-level sample sizes range from 24–43 because valid partial responses were retained. Of respondents reporting age, 96% were 18–24, so these findings primarily reflect Gen Z behavior and should be treated as exploratory.</p></div>
          </section>

          {/* FINDINGS DASHBOARD */}
          <section className="border-t border-black/5 bg-[#fffaf6]/50 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item flex flex-wrap items-end justify-between gap-5" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">what the survey surfaced</p><h2 className="mt-3 font-serif text-[2rem] font-semibold text-[#342d29] sm:text-[2.5rem]">Useful recommendations can still miss the moment.</h2></div><p className="max-w-sm text-[0.75rem] leading-6 text-[#8a7d75]">Percentages use valid responses for each question; sample sizes are shown individually.</p></div>
            <div className="reveal-item mt-10 grid gap-x-10 gap-y-7 lg:grid-cols-2" data-delay={80}>
              {findings.map((finding) => <div key={finding.title} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 border-t border-black/5 pt-5"><div><p className="font-serif text-[2rem] text-[#a26f7b]">{finding.value}%</p><p className="text-[0.5rem] uppercase tracking-[0.16em] text-[#a89d96]">{finding.sample}</p></div><div><div className="h-1.5 overflow-hidden rounded-full bg-[#eadfd8]"><div className="h-full rounded-full bg-gradient-to-r from-[#bd8491] to-[#dfb3bc]" style={{ width: `${finding.value}%` }} /></div><p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-[#5e5048]">{finding.title}</p><p className="mt-1 text-[0.76rem] leading-6 text-[#7c7068]">{finding.body}</p></div></div>)}
            </div>
          </section>

          {/* QUALITATIVE RECEIPTS */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-5 lg:grid-cols-[0.55fr_1.45fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the numbers in practice</p><h2 className="mt-3 font-serif text-[1.8rem] leading-tight text-[#342d29]">Three moments where similarity misunderstood the viewer.</h2></div>
              <div className="space-y-4">{respondentSignals.map((signal, i) => <article key={signal.number} className={`relative border-t border-black/5 py-5 pl-14 ${i === 1 ? "sm:translate-x-8" : ""}`}><span className="absolute left-0 top-5 font-serif text-xl text-[#d0a0aa]">{signal.number}</span><p className="font-serif text-lg text-[#342d29]">{signal.title}</p><p className="mt-2 max-w-2xl text-[0.84rem] leading-7 text-[#5e5048]">{signal.body}</p></article>)}</div>
            </div>
          </section>

          {/* CORE INSIGHT */}
          <section className="reveal-item border-y border-black/5 bg-gradient-to-r from-[#f7e9ed] via-[#fffaf6] to-[#eee5de] px-6 py-16 sm:px-10 lg:px-14 lg:py-20" data-delay={0}>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#a89d96]">the product opportunity</p>
            <p className="mt-5 max-w-5xl font-serif text-[2.25rem] font-semibold leading-[1.15] text-[#342d29] sm:text-[3.3rem]">Similarity asks what resembles the last title. <span className="italic text-[#a26f7b]">Intent asks what fits what the viewer wants right now.</span></p>
          </section>

          {/* PRODUCT SYSTEM */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the intent layer</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">Capture what matters for this viewing occasion.</h2><p className="mt-5 text-[0.9rem] leading-7 text-[#5e5048]">Intent supplements watch history and content similarity. It does not replace them; it gives those systems a human reason to start from.</p></div>
              <div className="relative overflow-hidden rounded-[30px] bg-[#2d2528] p-7 text-white shadow-[0_25px_60px_rgba(45,37,40,0.16)]">
                <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div><p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#e7b6c1]">pre-watch</p><p className="mt-2 font-serif text-xl">Shape what fits now</p><p className="mt-3 text-[0.75rem] leading-6 text-white/50">Choose a few occasion and story signals while browsing.</p></div><span className="hidden text-white/25 sm:block">↔</span><div><p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#e7b6c1]">post-watch</p><p className="mt-2 font-serif text-xl">Learn what worked</p><p className="mt-3 text-[0.75rem] leading-6 text-white/50">Clarify the relationship, tone, setting, or dynamic that mattered.</p></div></div>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">{intentSignals.map((signal) => <span key={signal} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.58rem] text-white/60">{signal}</span>)}</div>
              </div>
            </div>

            <div className="reveal-item mt-12 grid gap-6 border-t border-black/5 pt-9 sm:grid-cols-4" data-delay={100}>{principles.map(([title, body], i) => <div key={title}><span className="font-serif text-xl text-[#d0a0aa]">0{i + 1}</span><p className="mt-2 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div>
          </section>

          {/* LIVE DECK */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item mb-7 flex flex-wrap items-end justify-between gap-4" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">living product deck</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Research in motion</h2></div><p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#9a8c84]">research complete · prototype in development</p></div>
            <div className="reveal-item overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_24px_70px_rgba(68,44,29,0.10)]" style={{ aspectRatio: "16/9" }} data-delay={80}><iframe className="block h-full w-full border-0" src="https://embed.figma.com/slides/BGXG6RXj7t1dLyxUbmLhve/Intent-Layer?node-id=1-33&embed-host=share" allowFullScreen title="Intent Layer — Product Strategy Case Study" /></div>
          </section>

          {/* ROADMAP */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">start small · build toward the layer</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">The path from signal to product</h2></div>
            <div className="reveal-item relative mt-10 grid gap-5 sm:grid-cols-4" data-delay={80}><div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#d4c5bb] sm:block" />{roadmap.map(([num, title, body]) => <div key={num} className="relative"><span className="relative z-10 inline-grid h-8 w-8 place-items-center rounded-full bg-[#3a2e31] font-serif text-xs text-white">{num}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div>
          </section>

          {/* CLOSING */}
          <section className="bg-[#2b2427] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/35">key takeaway</p><p className="mt-5 max-w-5xl font-serif text-[2rem] leading-[1.2] text-white/90 sm:text-[2.8rem]">Watch history explains the past. <span className="italic text-[#e5b5bf]">Intent can shape what comes next.</span></p><p className="mt-6 max-w-3xl text-[0.85rem] leading-7 text-white/50">The opportunity is not more recommendation noise. It is a lightweight signal that the platform cannot reliably infer on its own—and an experience that lets viewers correct the system without managing it.</p></div>
          </section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← all work</Link><Link href="/work/audible" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Audible →</Link></div>
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
