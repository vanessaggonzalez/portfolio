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
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useInstagramEmbed() {
  useEffect(() => {
    const win = window as typeof window & { instgrm?: { Embeds?: { process: () => void } } };
    if (win.instgrm?.Embeds) { win.instgrm.Embeds.process(); return; }
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);
}

const campaigns = [
  ["https://www.instagram.com/p/DW-G0ChD-mz/", "Graduate Send-Off", "Class of 2026 celebration collateral"],
  ["https://www.instagram.com/p/DWjr7F4lJUp/", "Meet the Eboard", "Putting people at the center of the organization"],
  ["https://www.instagram.com/p/DTa_4jtkuNm/", "Spring Launch", "A clear visual reset for a new semester"],
];

export default function WIECaseStudy() {
  useReveal();
  useInstagramEmbed();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] z-0 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#d9e8e5]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          {/* SHARED CASE-STUDY HEADER */}
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO — same proportions, WIE-specific network art */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">USC Viterbi · Women in Engineering</p>
              <h1 className="mt-5 font-serif text-[2.7rem] font-semibold leading-[1.04] text-[#1f1a18] sm:text-[3.7rem]">Building the systems behind belonging.</h1>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#4f7f7a]">Director of Marketing · Second Consecutive Term</p>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">I lead marketing for USC Viterbi Women in Engineering—turning programs, resources, and student stories into one clear, recognizable community presence.</p>
              <div className="mt-7 flex flex-wrap gap-2">{["team leadership", "digital operations", "community brand", "web management"].map((tag) => <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[#7c7068]">{tag}</span>)}</div>
            </div>

            <div className="reveal-item relative min-h-[470px] overflow-hidden bg-gradient-to-br from-[#244c4d] via-[#477d79] to-[#203e40] p-7 sm:p-10" data-delay={80}>
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9ebe5]/20 blur-[70px]" />
              <div className="relative h-full min-h-[390px] rounded-[28px] border border-white/10 bg-white/[0.045] text-white shadow-[0_25px_65px_rgba(20,18,35,0.25)] backdrop-blur-sm">
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:h-[325px] sm:w-[325px]" />
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.07]" />
                <div className="absolute left-1/2 top-1/2 z-10 grid h-[135px] w-[135px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f1cf7a] p-5 text-center text-[#173f49] shadow-[0_22px_55px_rgba(0,0,0,.2)]"><div><p className="font-serif text-3xl">WIE</p><p className="mt-2 text-[0.45rem] uppercase leading-4 tracking-[0.18em]">one connected community</p></div></div>
                {[
                  ["left-[8%] top-[11%]", "Events + outreach"],
                  ["right-[7%] top-[15%]", "Resources + mentorship"],
                  ["bottom-[10%] left-[9%]", "Student community"],
                  ["bottom-[14%] right-[8%]", "Cross-platform media"],
                ].map(([position, label]) => <div key={label} className={`absolute z-20 grid h-[88px] w-[88px] place-items-center rounded-full bg-[#fffdf8] p-3 text-center text-[0.47rem] uppercase leading-4 tracking-[0.12em] text-[#244c4d] shadow-[0_15px_36px_rgba(0,0,0,.18)] sm:h-[98px] sm:w-[98px] ${position}`}>{label}</div>)}
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.45rem] uppercase tracking-[0.19em] text-white/30">marketing connects the system</p>
              </div>
            </div>
          </section>

          {/* SHARED METRIC RAIL */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{[["02", "consecutive terms"], ["100%", "associate director retention"], ["04", "person marketing team"], ["03", "connected platforms"]].map(([value, label], index) => <div key={label} className={`p-6 text-center sm:p-8 ${index > 0 ? "sm:border-l sm:border-black/5" : ""} ${index > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#4f7e7a]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* CASE THESIS */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.35fr_1.65fr]" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the assignment</p><p className="max-w-5xl font-serif text-[1.7rem] leading-[1.42] text-[#342d29] sm:text-[2.1rem]">Brand consistency is not only visual. In a student organization, it becomes a form of <span className="italic text-[#4f7e7a]">community trust.</span></p></div>
            <div className="reveal-item mt-9 grid gap-6 text-[0.86rem] leading-7 text-[#5e5048] md:grid-cols-2" data-delay={80}><p>WIE supports undergraduate and graduate women across engineering through outreach, professional development, mentorship, and shared resources. My job is to make that work easy to find, understand, and feel part of.</p><p>That meant treating marketing as infrastructure: a dependable intake process, a repeatable publishing rhythm, and a visual language that could hold many programs without becoming fragmented.</p></div>
          </section>

          {/* LEADERSHIP FEATURE */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">01 · leadership & retention</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">A team people chose to return to.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">Clear ownership, useful systems, and room to contribute turned individual creatives into a steady marketing function.</p></div>
              <div className="rounded-[30px] bg-white p-7 shadow-[0_22px_55px_rgba(68,44,29,0.07)]"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#a89d96]">second-term team</p><p className="mt-2 font-serif text-2xl text-[#342d29]">Continuity became an advantage.</p></div><span className="font-serif text-4xl text-[#4f7e7a]">100%</span></div><div className="mt-9 grid grid-cols-4 gap-3">{["Director", "Associate", "Associate", "Associate"].map((role, index) => <div key={`${role}-${index}`} className={`rounded-[20px] p-4 text-center ${index === 0 ? "bg-[#315d5b] text-white" : "bg-[#e5f0ed] text-[#315d5b]"}`}><span className="mx-auto block h-11 w-11 rounded-full bg-current opacity-20" /><p className="mt-4 text-[0.5rem] uppercase tracking-[0.13em]">{index === 0 ? role : `${role} · returned`}</p></div>)}</div><p className="mt-7 border-t border-black/5 pt-5 text-[0.8rem] leading-6 text-[#5e5048]">All three associate directors returned for another term, preserving context, working relationships, and momentum.</p></div>
            </div>
          </section>

          {/* OPERATING SYSTEM */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">02 · cross-team operations</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">One path from request to community.</h2><p className="mt-4 max-w-2xl text-[0.86rem] leading-7 text-[#5e5048]">A centralized workflow helped events, outreach, and professional development teams get the right asset to the right channel.</p></div>
            <div className="reveal-item relative mt-10 grid gap-5 sm:grid-cols-4" data-delay={80}>
              <div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#b9ceca] sm:block" />
              {[["01", "Request", "Centralize collateral, reel, and digital-asset needs."], ["02", "Prioritize", "Clarify audience, deadline, channel, and intended outcome."], ["03", "Produce", "Build inside a consistent Canva and Figma system."], ["04", "Publish", "Coordinate Instagram, Canvas, and WordPress."]].map(([number, title, body]) => <div key={number} className="relative"><span className="relative z-10 inline-grid h-8 w-8 place-items-center rounded-full bg-[#315d5b] font-serif text-xs text-white">{number}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}
            </div>
          </section>

          {/* PROGRAM SCOPE */}
          <section className="border-y border-black/5 bg-gradient-to-r from-[#e2efec] via-[#fffaf6] to-[#e9efea] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#547f7c]">what the system supports</p><h2 className="mt-3 font-serif text-[2rem] leading-tight text-[#342d29]">Different programs, one recognizable presence.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">The system needed to stay consistent without flattening the distinct purpose of each initiative.</p></div><div className="grid gap-5 sm:grid-cols-2">{[["01", "Events & outreach", "Promoting STEM initiatives for USC students and local youth."], ["02", "Resources & mentorship", "Connecting students with careers, faculty mentors, and peer networks."], ["03", "Community growth", "Creating an inclusive space across disciplines and degree levels."], ["04", "Cross-platform media", "Carrying the same message across Instagram, Canvas, and WordPress."]].map(([number, title, body]) => <div key={number} className="border-t border-[#76a39e]/30 pt-4"><span className="font-serif text-lg text-[#5f908b]">{number}</span><p className="mt-2 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div></div>
          </section>

          {/* WEB CONSTRAINTS */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">03 · web management</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">Designing clearly inside real constraints.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">With restricted administrative permissions in USC’s Cornerstone WordPress environment, I focused on the layer I could shape: content hierarchy, organization, and maintenance.</p><p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">Resource pages, event archives, and student information became easier to navigate without pretending the platform constraints did not exist.</p><a href="https://viterbiundergrad.usc.edu/wie-website/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#315d5b] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5">visit WIE website ↗</a></div>
              <div className="overflow-hidden rounded-[30px] border border-black/5 bg-white shadow-[0_22px_55px_rgba(68,44,29,0.07)]"><div className="flex gap-2 bg-[#e9ece9] px-5 py-4"><i className="h-2 w-2 rounded-full bg-[#9fb2af]" /><i className="h-2 w-2 rounded-full bg-[#9fb2af]" /><i className="h-2 w-2 rounded-full bg-[#9fb2af]" /></div><div className="grid min-h-[300px] grid-cols-[7rem_1fr]"><div className="bg-[#f1f5f3] p-5 text-[0.5rem] uppercase leading-8 tracking-[0.12em] text-[#6b7e7a]">Home<br />Resources<br />Mentorship<br />Events<br />Archive</div><div className="p-7"><p className="text-[0.52rem] uppercase tracking-[0.2em] text-[#8ea29e]">Women in Engineering</p><p className="mt-3 font-serif text-2xl text-[#342d29]">Find what you need.</p><p className="mt-4 max-w-md text-[0.75rem] leading-6 text-[#6b5d55]">A clearer content hierarchy for programs, opportunities, event archives, and student information.</p><div className="mt-8 space-y-3"><span className="block h-3 rounded-full bg-[#dcebe8]" /><span className="block h-3 w-4/5 rounded-full bg-[#dcebe8]" /><span className="block h-3 w-3/5 rounded-full bg-[#eadbd4]" /></div></div></div></div>
            </div>
          </section>

          {/* SOCIAL ARCHIVE */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item flex flex-wrap items-end justify-between gap-5" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">04 · community archive</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Milestones, people, and semester rhythms.</h2></div><a href="https://www.instagram.com/usc.viterbi.wie/" target="_blank" rel="noopener noreferrer" className="text-[0.58rem] uppercase tracking-[0.2em] text-[#4f7e7a]">explore Instagram ↗</a></div>
            <div className="reveal-item mt-9 grid gap-5 lg:grid-cols-3" data-delay={80}>{campaigns.map(([url, title, note]) => <article key={url}><div className="h-[490px] overflow-hidden rounded-[24px] border border-black/5 bg-white"><blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ minWidth: "100%", width: "100%", margin: 0 }} /></div><p className="mt-4 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-[#a89d96]">{note}</p></article>)}</div>
          </section>

          {/* SHARED DARK CLOSE */}
          <section className="bg-[#294f4f] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16"><div className="reveal-item" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/35">what changed</p><p className="mt-5 max-w-5xl font-serif text-[2rem] leading-[1.2] text-white/90 sm:text-[2.8rem]">Standardized templates, clearer intake, and coordinated publishing created a more dependable voice—while a returning team kept <span className="italic text-[#b8ddd7]">the system and its relationships growing.</span></p></div></section>

          {/* SHARED PROJECT NAVIGATION */}
          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work/sharemeal" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← ShareMeal</Link><Link href="/work" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">all selected work →</Link></div>
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