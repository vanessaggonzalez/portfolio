"use client";

import Image from "next/image";
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

const flow = [
  ["01", "Hear it", "A line or moment resonates while listening."],
  ["02", "Clip it", "Select the moment without leaving the listening flow."],
  ["03", "Style it", "Turn audio into a visual, platform-ready share card."],
  ["04", "Discover it", "Friends tap through to play and explore the title."],
];

export default function AudiblePage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#f0d7c1]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">ProductSC × Amazon · Winning case study</p>
              <h1 className="mt-5 font-serif text-[2.8rem] font-semibold leading-[1.03] text-[#1f1a18] sm:text-[3.8rem]">Audible<br /><span className="italic text-[#ce6f2c]">Clip & Share</span></h1>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">Product Strategy Lead · UX · Growth</p>
              <p className="mt-6 max-w-lg text-[1rem] leading-8 text-[#4d413b]">A social discovery loop that turns emotionally resonant audiobook moments into shareable entry points for younger listeners.</p>
              <div className="mt-7 flex flex-wrap gap-2">{["5-person team", "growth loops", "Gen Z behavior", "onboarding redesign"].map((tag) => <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-[#7c7068]">{tag}</span>)}</div>
            </div>
            <div className="reveal-item relative min-h-[450px] overflow-hidden bg-black" data-delay={80}>
              <Image src="/images/clip-and-share.png" alt="Audible Clip and Share product concept" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9"><p className="text-[0.55rem] uppercase tracking-[0.26em] text-white/50">the behavior</p><p className="mt-3 max-w-xl font-serif text-[1.55rem] italic leading-8 text-white/90">“Gen Z doesn’t just consume content. They collect it, share it, and build identity around it.”</p></div>
            </div>
          </section>

          {/* STRATEGY RAIL */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fff7ed] sm:grid-cols-4">
            {[["01", "challenge", "younger-user growth"], ["02", "product", "social audio clips"], ["03", "north star", "share-to-play"], ["04", "result", "first place"]].map(([num, label, value], i) => <div key={num} className={`p-6 sm:p-7 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><span className="font-serif text-lg text-[#df8a4d]">{num}</span><p className="mt-2 text-[0.52rem] uppercase tracking-[0.2em] text-[#a89d96]">{label}</p><p className="mt-1 text-[0.78rem] text-[#4d413b]">{value}</p></div>)}
          </section>

          {/* BRIEF */}
          <section className="reveal-item grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.35fr_1.65fr] lg:px-14 lg:py-16" data-delay={0}>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the brief</p>
            <div><p className="max-w-4xl font-serif text-[1.7rem] leading-[1.4] text-[#342d29] sm:text-[2.1rem]">Audible had the raw material for emotional resonance, but no native way to let those moments travel socially.</p><p className="mt-5 max-w-3xl text-[0.9rem] leading-7 text-[#5e5048]">In an Amazon-sponsored sprint, our five-person team explored how Audible could improve engagement and trial conversion among younger consumers without turning the core listening app into another social feed.</p></div>
          </section>

          {/* BEHAVIOR TO OPPORTUNITY */}
          <section className="border-t border-black/5 bg-[#fffaf6]/60 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.75fr_1.25fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the audience insight</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">The sharing behavior already existed.</h2><p className="mt-5 text-[0.9rem] leading-7 text-[#5e5048]">Fan communities screenshot passages, quote lines in bios, create aesthetic reading content, and use stories to communicate identity. The opportunity was to make Audible a source for that behavior—not build a destination social network inside it.</p></div>
              <div className="relative overflow-hidden rounded-[30px] bg-[#241e1c] p-7 text-white shadow-[0_24px_60px_rgba(36,30,28,0.16)] sm:p-9">
                <p className="text-[0.55rem] uppercase tracking-[0.24em] text-white/35">product principle</p>
                <p className="mt-5 font-serif text-[2rem] leading-[1.2] text-white/90">Let the moment leave Audible.<br /><span className="italic text-[#ef9a59]">Keep the listening experience focused.</span></p>
                <div className="mt-9 flex items-center gap-3"><div className="flex h-10 items-center gap-1">{[12, 22, 34, 18, 29, 40, 24, 15, 31, 20, 38, 17].map((h, i) => <span key={i} className="w-[3px] rounded-full bg-[#f08c45]" style={{ height: `${h}px` }} />)}</div><span className="h-px flex-1 bg-white/10" /><span className="text-[0.56rem] uppercase tracking-[0.2em] text-white/40">clip → share → play</span></div>
              </div>
            </div>
          </section>

          {/* PRODUCT LOOP */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the product loop</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">From private resonance to social discovery</h2></div>
            <div className="reveal-item relative mt-10 grid gap-5 sm:grid-cols-4" data-delay={80}>
              <div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#d7c7bc] sm:block" />
              {flow.map(([num, title, body]) => <div key={num} className="relative"><span className="relative z-10 inline-grid h-8 w-8 place-items-center rounded-full bg-[#e57c35] font-serif text-xs text-white shadow-sm">{num}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}
            </div>
          </section>

          {/* METRIC */}
          <section className="reveal-item border-y border-black/5 bg-gradient-to-r from-[#fce8d6] via-[#fff8ef] to-[#f6e2d3] px-6 py-16 sm:px-10 lg:px-14 lg:py-20" data-delay={0}>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#a57758]">proposed north star</p><p className="mt-4 font-serif text-[2.5rem] font-semibold leading-none text-[#ce6f2c] sm:text-[3.5rem]">Share-to-Play<br />Conversion Rate</p></div>
              <div><p className="max-w-2xl font-serif text-[1.5rem] leading-9 text-[#4d413b]">The useful outcome wasn’t the number of clips created. It was whether a shared moment inspired someone else to start listening.</p><p className="mt-4 text-[0.82rem] leading-7 text-[#6b5d55]">Supporting signals could include clip completion, share rate, click-through, title starts, and trial conversion—while monitoring whether sharing disrupted listening retention.</p></div>
            </div>
          </section>

          {/* SECOND BET */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">a second conversion bet</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">Let the story earn the trial.</h2><p className="mt-5 max-w-2xl text-[0.9rem] leading-7 text-[#5e5048]">We also rethought free-trial onboarding around access to a complete first chapter rather than a locked preview. The goal was to let prospective listeners experience narrative momentum before asking them to commit.</p></div>
              <div className="rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_20px_50px_rgba(68,44,29,0.06)]"><div className="flex items-center justify-between"><span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#a89d96]">trial experience</span><span className="font-serif text-2xl text-[#df8a4d]">01</span></div><p className="mt-5 font-serif text-xl text-[#342d29]">A complete first chapter</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#eadfd7]"><div className="h-full w-full rounded-full bg-gradient-to-r from-[#e47b34] to-[#f1ad72]" /></div><p className="mt-3 text-[0.68rem] text-[#7c7068]">enough time to build attachment · clear value before conversion</p></div>
            </div>
          </section>

          {/* DECK */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item mb-7 flex flex-wrap items-end justify-between gap-4" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the complete pitch</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">39 slides · Figma presentation</h2></div><p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#9a8c84]">research · strategy · UX · GTM</p></div>
            <div className="reveal-item overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_24px_70px_rgba(68,44,29,0.10)]" style={{ aspectRatio: "16/9" }} data-delay={80}><iframe className="block h-full w-full border-0" src="https://embed.figma.com/slides/mWQs6hcMR2qGervNAAPTlu/Audible?node-id=1-335&embed-host=share" allowFullScreen title="Audible — Clip & Share presentation deck" /></div>
          </section>

          {/* ROLE + OUTCOME */}
          <section className="grid lg:grid-cols-2">
            <div className="reveal-item border-t border-black/5 px-6 py-14 sm:px-10 lg:border-r lg:px-14" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#a89d96]">my role</p><h2 className="mt-3 font-serif text-[1.8rem] text-[#342d29]">Leading product strategy inside a five-person team</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">I helped shape the problem framing, audience logic, feature strategy, North Star metric, onboarding recommendation, UX direction, and final storytelling. Throughout the sprint, I kept returning the team to one question: why would this matter to a real listener?</p></div>
            <div className="reveal-item border-t border-black/5 bg-[#e77e36] px-6 py-14 text-white sm:px-10 lg:px-14" data-delay={80}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/55">the outcome</p><p className="mt-4 font-serif text-[4rem] font-semibold leading-none">1st</p><p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-white/65">Amazon-sponsored · ProductSC</p><p className="mt-6 max-w-xl font-serif text-[1.35rem] italic leading-8 text-white/90">The project confirmed that I want to keep working where emotional behavior, audience insight, and product strategy overlap.</p></div>
          </section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← all work</Link><Link href="/work/bofa" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Bank of America →</Link></div>
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
