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

const portals = [
  { number: "01", name: "Undergraduate Admissions", href: "https://admission.usc.edu/", role: "Content deployments · layout updates · mobile optimization", signal: "10K+ weekly users" },
  { number: "02", name: "Graduate Admissions", href: "https://gradadm.usc.edu/", role: "Program requirements · page structure · cross-device QA", signal: "Multi-program hub" },
  { number: "03", name: "Academic Records & Registrar", href: "https://arr.usc.edu/", role: "Full legacy-site migration · unified enrollment architecture", signal: "Enrollment-critical" },
  { number: "04", name: "Financial Aid", href: "https://financialaid.usc.edu/", role: "Aid resources · application deadlines · student documentation", signal: "High-traffic resource" },
];

const operatingLoop = [
  ["01", "Plan", "Translate PM requirements into scoped content and site changes."],
  ["02", "Publish", "Deploy accessible updates across WordPress, Elementor, HTML, and CSS."],
  ["03", "Reach", "Format, audit, and dispatch prospective-student communications."],
  ["04", "Learn", "Report on traffic, referrals, search, delivery, and email performance."],
];

export default function USCMarCommPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#efe0d4]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">University of Southern California · 2 years</p>
              <h1 className="mt-5 font-serif text-[2.7rem] font-semibold leading-[1.04] text-[#1f1a18] sm:text-[3.7rem]">Enrollment communications at digital scale.</h1>
              <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">Web Operations · CRM & Email · Analytics</p>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">Operating four major USC enrollment and registrar portals while connecting CMS delivery, campaign operations, and performance reporting for prospective and current students.</p>
            </div>

            <div className="reveal-item relative min-h-[470px] overflow-hidden bg-gradient-to-br from-[#6f1721] via-[#8b2632] to-[#471016] p-7 sm:p-10" data-delay={80}>
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#ffcc00]/15 blur-[70px]" />
              <div className="relative h-full overflow-hidden rounded-[26px] border border-white/15 bg-[#fffaf6] shadow-[0_25px_65px_rgba(40,5,10,0.25)]">
                <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-[#b74750]" /><span className="h-2.5 w-2.5 rounded-full bg-[#e3b34c]" /><span className="h-2.5 w-2.5 rounded-full bg-[#96ad86]" /><div className="ml-3 h-5 flex-1 rounded-full bg-[#f1ece8]" /></div>
                <div className="grid h-[calc(100%-45px)] grid-cols-[0.35fr_1.65fr]">
                  <div className="border-r border-black/5 bg-[#f8f3ef] p-4"><p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#a89d96]">USC enrollment</p><div className="mt-5 space-y-3">{["Admissions", "Graduate", "Registrar", "Financial Aid"].map((item, i) => <div key={item} className={`rounded-[9px] px-3 py-2 text-[0.58rem] ${i === 0 ? "bg-[#7d202b] text-white" : "text-[#7c7068]"}`}>{item}</div>)}</div></div>
                  <div className="p-5"><div className="flex items-end justify-between"><div><p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#a89d96]">weekly performance</p><p className="mt-2 font-serif text-xl text-[#342d29]">Enrollment ecosystem</p></div><span className="rounded-full bg-[#fff1c2] px-3 py-1 text-[0.52rem] text-[#7d6316]">+15% traffic</span></div>
                    <div className="relative mt-8 h-32 border-b border-l border-black/5"><svg viewBox="0 0 500 130" className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b2632" stopOpacity=".25" /><stop offset="100%" stopColor="#8b2632" stopOpacity="0" /></linearGradient></defs><path d="M0,105 C60,100 82,88 125,91 C170,95 190,68 235,73 C285,79 308,50 350,57 C400,63 430,25 500,18 L500,130 L0,130 Z" fill="url(#chartFill)" /><path d="M0,105 C60,100 82,88 125,91 C170,95 190,68 235,73 C285,79 308,50 350,57 C400,63 430,25 500,18" fill="none" stroke="#8b2632" strokeWidth="4" /></svg></div>
                    <div className="mt-6 grid grid-cols-3 gap-3">{[["10K+", "weekly users"], ["04", "portals"], ["02", "years"]].map(([value, label]) => <div key={label}><p className="font-serif text-lg text-[#342d29]">{value}</p><p className="text-[0.48rem] uppercase tracking-[0.14em] text-[#a89d96]">{label}</p></div>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{[["4", "core portals"], ["10K+", "weekly users"], ["15%", "traffic growth"], ["2 yrs", "experience"]].map(([value, label], i) => <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#791f29]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* OPERATING LOOP */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.42fr_1.58fr]" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the operating model</p><p className="mt-3 text-[0.78rem] leading-6 text-[#7c7068]">From requirement to live experience to measurable signal.</p></div><h2 className="font-serif text-[2rem] leading-[1.25] text-[#342d29] sm:text-[2.5rem]">The work connected implementation, communication, and learning—not three isolated responsibilities.</h2></div>
            <div className="reveal-item relative mt-12 grid gap-5 sm:grid-cols-4" data-delay={80}><div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#d3c3b8] sm:block" />{operatingLoop.map(([num, title, body]) => <div key={num} className="relative"><span className="relative z-10 inline-grid h-8 w-8 place-items-center rounded-full bg-[#7d202b] font-serif text-xs text-white">{num}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div>
          </section>

          {/* PORTAL DIRECTORY */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item mb-8 flex flex-wrap items-end justify-between gap-4" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">managed web portals</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">One enrollment ecosystem, four public doors.</h2></div><p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#9a8c84]">live external sites ↗</p></div>
            <div className="reveal-item divide-y divide-black/5 border-y border-black/5" data-delay={80}>{portals.map((portal) => <a key={portal.number} href={portal.href} target="_blank" rel="noopener noreferrer" className="group grid gap-3 py-6 transition hover:bg-white/65 sm:grid-cols-[3rem_1fr_1.25fr_auto] sm:items-center sm:px-4"><span className="font-serif text-xl text-[#c79b62]">{portal.number}</span><p className="font-serif text-lg text-[#342d29] group-hover:text-[#7d202b]">{portal.name}</p><p className="text-[0.75rem] leading-6 text-[#6b5d55]">{portal.role}</p><span className="text-[0.55rem] uppercase tracking-[0.17em] text-[#a89d96]">{portal.signal} ↗</span></a>)}</div>
          </section>

          {/* MIGRATION SPOTLIGHT */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">project spotlight · ARR</p><h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#342d29]">Moving a legacy registrar site into a unified enrollment architecture.</h2><p className="mt-5 text-[0.9rem] leading-7 text-[#5e5048]">I supported the complete migration of the Academic Records & Registrar portal, translating project requirements into page structures, content deployment, navigation updates, and cross-device quality checks.</p></div>
              <div className="overflow-hidden rounded-[30px] border border-black/5 bg-[#2b2523] p-7 text-white shadow-[0_24px_60px_rgba(43,37,35,0.15)]">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-[18px] border border-white/10 bg-white/[0.05] p-5"><p className="text-[0.52rem] uppercase tracking-[0.2em] text-white/35">before</p><p className="mt-3 font-serif text-lg text-white/75">Legacy structure</p><div className="mt-4 space-y-2">{[80, 55, 70, 45].map((w, i) => <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />)}</div></div><span className="hidden text-[#e7c56f] sm:block">→</span><div className="rounded-[18px] border border-[#e7c56f]/20 bg-[#7d202b]/35 p-5"><p className="text-[0.52rem] uppercase tracking-[0.2em] text-[#e7c56f]">after</p><p className="mt-3 font-serif text-lg text-white/90">Unified experience</p><div className="mt-4 grid grid-cols-2 gap-2">{["records", "registration", "calendar", "support"].map((x) => <span key={x} className="rounded-[8px] bg-white/10 px-2 py-2 text-[0.55rem] text-white/60">{x}</span>)}</div></div></div>
                <p className="mt-6 border-t border-white/10 pt-5 text-[0.65rem] uppercase tracking-[0.18em] text-white/40">standardized design · clearer navigation · mobile consistency</p>
              </div>
            </div>
          </section>

          {/* CHANNELS */}
          <section className="grid border-t border-black/5 lg:grid-cols-2">
            <div className="reveal-item px-6 py-14 sm:px-10 lg:border-r lg:px-14" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">email + CRM operations</p><h2 className="mt-3 font-serif text-[1.8rem] text-[#342d29]">From audience list to prospective-student inbox.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">Managed campaign logistics in Slate and Campaign Monitor: formatting communications, auditing lists, dispatching student emails, and monitoring delivery errors. I also supported the department’s transition toward Salesforce-based segmentation and automation.</p><div className="mt-6 flex flex-wrap gap-2">{["Slate", "Campaign Monitor", "Salesforce transition", "delivery QA"].map((x) => <span key={x} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.58rem] uppercase tracking-[0.15em] text-[#7c7068]">{x}</span>)}</div></div>
            <div className="reveal-item bg-[#fffaf6]/65 px-6 py-14 sm:px-10 lg:px-14" data-delay={80}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">analytics + reporting</p><h2 className="mt-3 font-serif text-[1.8rem] text-[#342d29]">Turn telemetry into a story leadership can use.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">Aggregated traffic, search, page, referral, open-rate, bounce, and delivery data into visual reporting for department leaders—surfacing performance patterns and diagnosing outreach issues.</p><div className="mt-7 grid grid-cols-4 items-end gap-2 border-b border-black/5 pb-1">{[38, 54, 45, 67, 72, 63, 88, 95].map((h, i) => <div key={i} className={`rounded-t-[5px] ${i > 5 ? "bg-[#7d202b]" : "bg-[#d9c9bf]"}`} style={{ height: `${h}px` }} />)}</div></div>
          </section>

          {/* TOOLS + IMPACT */}
          <section className="bg-[#741c26] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-12 lg:grid-cols-[0.75fr_1.25fr]" data-delay={0}>
              <div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/45">impact</p><p className="mt-4 font-serif text-[4rem] font-semibold leading-none text-[#f0c85b]">15%</p><p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-white/60">increase in weekly traffic across primary enrollment pages</p><p className="mt-6 text-[0.85rem] leading-7 text-white/60">Consistent site operations and performance reporting helped identify opportunities across high-traffic enrollment experiences.</p></div>
              <div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/45">working toolkit</p><div className="mt-5 space-y-5">{[["Web + CMS", "WordPress · Elementor · HTML · CSS · migrations"], ["Email + CRM", "Slate · Campaign Monitor · Salesforce transition"], ["Data + reporting", "Google Analytics · email telemetry · SEO · visualization"]].map(([category, tools]) => <div key={category} className="border-t border-white/15 pt-4 sm:grid sm:grid-cols-[9rem_1fr]"><p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#f0c85b]">{category}</p><p className="mt-2 text-[0.8rem] leading-6 text-white/65 sm:mt-0">{tools}</p></div>)}</div></div>
            </div>
          </section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work/bofa" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← Bank of America</Link><Link href="/work/anqclic" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Anqclic →</Link></div>
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
