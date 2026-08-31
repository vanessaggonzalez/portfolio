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

function useInstagramEmbed() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).instgrm) { (window as any).instgrm.Embeds.process(); return; }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

const timeline = [
  ["2015–16", "Video Star", "Started editing short-form video on mobile at age 10."],
  ["2018", "After Effects", "Launched anqclic and moved into custom keyframing and audio cuts."],
  ["2020–21", "Viral cycles", "Timed work to #DracoTok and cultural revivals, driving outsized reach."],
  ["2021", "Commercial", "Secured a paid Funimate partnership at age 15."],
  ["2023–25", "New dimension", "Moved into 3D cameras, tracked elements, and complex typography."],
];

const embeds = [
  { url: "https://www.instagram.com/p/B3nHVlhHQMb/", date: "Oct 2019", title: "Early After Effects", note: "Structured keyframing and custom audio cuts.", fandom: "Harry Potter" },
  { url: "https://www.instagram.com/p/CGsXlUSFgpN/", date: "Oct 2020", title: "Highest-performing edit", note: "44K+ views and 10K+ likes through audio pacing and scene selection.", fandom: "Harry Potter" },
  { url: "https://www.instagram.com/p/CSXA0UmrxVC/", date: "Aug 2021", title: "Retention experiment", note: "Shorter opening hooks designed to reduce early drop-off.", fandom: "Romione · Lana Del Rey" },
  { url: "https://www.instagram.com/reel/Cu-GuClhWbZ/", date: "Jul 2023", title: "3D collaboration", note: "Spatial camera movement and custom element tracking.", fandom: "The Neighbourhood" },
  { url: "https://www.instagram.com/reel/DKAmqBcB6Fn/", date: "May 2025", title: "Narrative typography", note: "Color, beat-matching, and character-led pacing.", fandom: "Romione · Tame Impala" },
  { url: "https://www.instagram.com/reel/DNJOdkuvoSU/", date: "Aug 2025", title: "Ten-year showcase", note: "A synthesis of the archive’s evolving visual language.", fandom: "Lana Del Rey" },
];

export default function AnqclicPage() {
  useReveal();
  useInstagramEmbed();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#ecd9df]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="relative overflow-hidden border-t border-black/5 bg-[#211b20] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-[#b77c9b]/25 blur-[90px]" /><div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#6e527c]/20 blur-[90px]" />
            <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div className="reveal-item" data-delay={0}>
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/35">Creative archive · 2015 — present</p>
                <h1 className="mt-5 font-serif text-[3.2rem] font-semibold leading-none sm:text-[4.7rem]">anqclic</h1>
                <p className="mt-4 font-serif text-[1.15rem] italic text-[#ddaabd]">misspelling of angelic, intentionally.</p>
                <p className="mt-7 max-w-lg text-[0.95rem] leading-8 text-white/60">A decade-long laboratory in visual storytelling, fandom psychology, audience retention, and the cultural timing that makes content travel.</p>
                <div className="mt-7 flex flex-wrap gap-2">{["After Effects", "audience analytics", "fandom strategy", "qualitative testing"].map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/45">{tag}</span>)}</div>
              </div>

              <div className="reveal-item relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/10 bg-black/25 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm" data-delay={80}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-[0.52rem] uppercase tracking-[0.2em] text-white/35">composition / final.aep</span><span className="text-[0.52rem] text-white/25">00:00:15:24</span></div>
                <div className="relative h-52 overflow-hidden border-b border-white/10"><div className="absolute inset-0 grid place-items-center"><span className="select-none font-serif text-[4.2rem] italic tracking-[-0.05em] text-white/90 animate-titleFloat sm:text-[5.5rem]">anqclic</span></div><div className="absolute left-[12%] top-[30%] h-20 w-20 rounded-full border border-[#cf91aa]/35" /><div className="absolute right-[18%] top-[18%] h-32 w-32 rotate-12 border border-white/10" /><p className="absolute bottom-3 left-4 text-[0.48rem] uppercase tracking-[0.2em] text-white/25">visual culture · interface taste · fandom memory</p></div>
                <div className="mt-4 space-y-2">{[["type / anqclic", "w-[82%]", "bg-[#9c6781]"], ["camera / 3D", "w-[64%]", "bg-[#665070]"], ["audio / markers", "w-[92%]", "bg-[#b57e64]"], ["color / grade", "w-[48%]", "bg-[#6d7b75]"]].map(([label, width, color], i) => <div key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3"><span className="text-[0.5rem] text-white/35">{label}</span><div className="h-5 rounded-[4px] bg-white/[0.04]"><div className={`h-full ${width} ${color} rounded-[4px] opacity-70`} style={{ marginLeft: `${i * 6}%` }} /></div></div>)}</div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section className="grid grid-cols-2 border-b border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{[["630K+", "organic views"], ["116K+", "total likes"], ["5K+", "followers · 10K peak"], ["10+", "years creating"]].map(([value, label], i) => <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#8f5f76]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* ORIGIN */}
          <section className="reveal-item grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.35fr_1.65fr] lg:px-14 lg:py-16" data-delay={0}>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the origin</p>
            <p className="max-w-5xl font-serif text-[1.7rem] leading-[1.42] text-[#342d29] sm:text-[2.1rem]">I started editing at 10 because I saw a Harry Potter fan edit on Vine and needed to know how it was made. What began as curiosity became <span className="italic text-[#9f687f]">a ten-year practice in earning attention.</span></p>
          </section>

          {/* TIMELINE */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">platform evolution</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">The tools changed. The instinct stayed.</h2></div>
            <div className="reveal-item relative mt-11 grid gap-5 sm:grid-cols-5" data-delay={80}><div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#d7c6ce] sm:block" />{timeline.map(([year, title, note], i) => <article key={year} className={`relative ${i % 2 ? "sm:translate-y-5" : ""}`}><span className="relative z-10 inline-grid h-8 min-w-8 place-items-center rounded-full bg-[#352b32] px-2 font-serif text-[0.55rem] text-white">{year}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.74rem] leading-6 text-[#5e5048]">{note}</p></article>)}</div>
          </section>

          {/* STRATEGY SYSTEM */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the real strategy</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">Not just editing. A feedback system.</h2><p className="mt-5 text-[0.9rem] leading-7 text-[#5e5048]">Anqclic became a real-world testing ground for what makes someone stop, stay, feel something, and share.</p></div>
              <div className="grid gap-6 border-l border-black/5 pl-7">{[["01", "Retention", "Instagram Business analytics exposed drop-off timing. Slow intros lost viewers, so I tightened hooks and pacing."], ["02", "Qualitative testing", "Close Friends previews let trusted editors react to early drafts before public posting."], ["03", "Cultural timing", "Franchise anniversaries, nostalgia, viral revivals, and audio cycles shaped when work had the best chance to travel."]].map(([num, title, body]) => <div key={num} className="grid grid-cols-[2.5rem_1fr] gap-4"><span className="font-serif text-xl text-[#c08aa1]">{num}</span><div><p className="font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.82rem] leading-7 text-[#5e5048]">{body}</p></div></div>)}</div>
            </div>
          </section>

          {/* RETENTION VISUAL */}
          <section className="reveal-item border-y border-black/5 bg-gradient-to-r from-[#f2e5eb] via-[#fffaf6] to-[#e9e2ec] px-6 py-14 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#9f687f]">iteration principle</p><p className="mt-4 font-serif text-[2.1rem] leading-[1.2] text-[#342d29] sm:text-[2.8rem]">The first seconds decide whether the rest gets seen.</p><p className="mt-5 text-[0.84rem] leading-7 text-[#5e5048]">I used drop-off patterns to compress setup, surface emotional payoff earlier, and align cuts more tightly with audio markers.</p></div><div className="rounded-[28px] bg-[#251f24] p-7 text-white shadow-[0_24px_60px_rgba(37,31,36,0.16)]"><div className="flex items-end justify-between"><p className="text-[0.54rem] uppercase tracking-[0.2em] text-white/35">viewer retention / illustrative</p><p className="font-serif text-lg text-[#deaabd]">tighter hook</p></div><div className="relative mt-7 h-44 border-b border-l border-white/10"><svg viewBox="0 0 500 170" className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><path d="M0,20 C50,40 65,95 120,110 C190,130 260,138 500,145" fill="none" stroke="#71626d" strokeWidth="5" strokeDasharray="7 7" /><path d="M0,20 C70,28 95,54 155,65 C240,78 330,91 500,100" fill="none" stroke="#dc9eb6" strokeWidth="6" /></svg><span className="absolute bottom-2 left-2 text-[0.48rem] text-white/25">0s</span><span className="absolute bottom-2 right-2 text-[0.48rem] text-white/25">end</span></div><div className="mt-4 flex gap-5 text-[0.52rem] text-white/35"><span>— refined pacing</span><span>⋯ slow intro</span></div></div></div>
          </section>

          {/* FANDOM CYCLES */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[1.15fr_0.85fr]" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">franchise + fandom cycles</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Emotionally durable IP resurfaces in waves.</h2><p className="mt-5 max-w-2xl text-[0.9rem] leading-7 text-[#5e5048]">Harry Potter was not only popular; it had a deep emotional archive that resurfaced around nostalgia, anniversaries, cast moments, and viral revivals like #DracoTok. Timing work to those cycles produced more reliable reach than chasing unrelated trends.</p></div><div className="relative h-64 overflow-hidden rounded-full border border-black/5 bg-[#fffaf6] shadow-[0_20px_50px_rgba(68,44,29,0.06)]"><div className="absolute inset-[12%] rounded-full border border-dashed border-[#cfa9b8]" /><div className="absolute inset-[28%] rounded-full border border-[#9f687f]/30 bg-[#f2e3e9]" /><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-serif text-lg text-[#684854]">emotional<br />attachment</span>{[["nostalgia", "left-7 top-1/2"], ["anniversary", "left-1/2 top-5"], ["viral revival", "right-4 top-1/2"], ["new audio", "bottom-5 left-1/2"]].map(([label, pos]) => <span key={label} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[0.52rem] uppercase tracking-[0.14em] text-[#8a6673] shadow-sm`}>{label}</span>)}</div></div>
          </section>

          {/* ARCHIVE REEL */}
          <section className="border-t border-black/5 bg-[#211b20] py-14 text-white lg:py-16">
            <div className="reveal-item flex flex-wrap items-end justify-between gap-4 px-6 sm:px-10 lg:px-14" data-delay={0}><div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/35">selected content archive · 2019 — 2025</p><h2 className="mt-3 font-serif text-[2rem] text-white/90">Scroll through the evolution →</h2></div><a href="https://www.instagram.com/anqclic/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-white/50 transition hover:bg-white/5">full archive ↗</a></div>
            <div className="reveal-item mt-9 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 sm:px-10 lg:px-14" data-delay={80} style={{ scrollbarWidth: "thin" }}>{embeds.map((embed) => <article key={embed.url} className="w-[330px] shrink-0 snap-start sm:w-[360px]"><div className="overflow-hidden rounded-[22px] bg-white shadow-[0_24px_55px_rgba(0,0,0,0.25)]"><blockquote className="instagram-media !m-0 !w-full !max-w-none !min-w-0 !border-0 !shadow-none" data-instgrm-captioned data-instgrm-permalink={`${embed.url}?utm_source=ig_embed&utm_campaign=loading`} data-instgrm-version="14" /></div><p className="mt-4 text-[0.52rem] uppercase tracking-[0.2em] text-[#d49aaf]">{embed.date} · {embed.fandom}</p><p className="mt-2 font-serif text-lg text-white/85">{embed.title}</p><p className="mt-2 text-[0.75rem] leading-6 text-white/45">{embed.note}</p></article>)}</div>
          </section>

          {/* COMMERCIAL + TAKEAWAY */}
          <section className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal-item bg-[#bd849c] px-6 py-14 text-white sm:px-10 lg:px-14" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/55">commercial outcome</p><p className="mt-4 font-serif text-[3.7rem] font-semibold leading-none">15</p><p className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/65">years old · paid Funimate partnership</p><p className="mt-6 text-[0.86rem] leading-7 text-white/75">Organic reach and editing authority led to direct sponsorship outreach from a mobile editing platform.</p></div>
            <div className="reveal-item border-t border-black/5 px-6 py-14 sm:px-10 lg:px-14" data-delay={80}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-[#a89d96]">what the archive became</p><p className="mt-4 max-w-3xl font-serif text-[2rem] leading-[1.2] text-[#342d29] sm:text-[2.7rem]">Before I knew the terms product marketing or audience strategy, <span className="italic text-[#9f687f]">I was already testing how creative decisions changed behavior.</span></p><p className="mt-6 max-w-2xl text-[0.85rem] leading-7 text-[#5e5048]">That decade now informs how I approach consumer research, GTM strategy, product storytelling, and entertainment experiences built around identity and memory.</p></div>
          </section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work/usc-marcomm" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← USC MarComm</Link><Link href="/work/ama" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: AMA →</Link></div>
        </div>
      </div>

      <style>{`
        .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); }
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        .instagram-media { margin: 0 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; box-shadow: none !important; border: none !important; }
        @keyframes titleFloat { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
        .animate-titleFloat { animation: titleFloat 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } .animate-titleFloat { animation: none; } }
      `}</style>
    </main>
  );
}
