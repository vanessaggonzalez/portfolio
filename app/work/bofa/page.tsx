"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        setTimeout(() => el.classList.add("revealed"), Number(el.dataset.delay ?? 0));
        observer.unobserve(el);
      }),
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const chapters = [
  { number: "01", href: "#mosaic", title: "Mosaic", label: "Product discovery" },
  { number: "02", href: "#documentation", title: "5500 Agent", label: "Legacy modernization" },
  { number: "03", href: "#onboarding", title: "Onboarding Agent", label: "Codeathon prototype" },
];

const stats = [
  ["15", "BA interviews"],
  ["600+", "legacy files"],
  ["03", "AI initiatives"],
  ["01", "internal review"],
];

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function BofaPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] z-0 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#eadfd7]/65 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
              {navLinks.map((link) => <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">{link.label}</Link>)}
            </nav>
          </header>

          {/* HERO */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#9a8c84]">Bank of America · Global Technology · Summer 2026</p>
              <h1 className="mt-5 max-w-xl font-serif text-[2.6rem] font-semibold leading-[1.06] text-[#1f1a18] sm:text-[3.5rem]">Enterprise AI, grounded in how people actually work.</h1>
              <p className="mt-5 text-[0.72rem] uppercase tracking-[0.2em] text-[#8a7d75]">Business Analyst Intern · AI Strategy & Product Discovery</p>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">Across three AI initiatives, I moved from user problems to product direction: interviewing Business Analysts, designing context-aware workflows, analyzing an undocumented mainframe system, and prototyping employee onboarding support.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["user discovery", "AI workflows", "technical analysis", "cross-functional delivery"].map((tag) => <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[#7c7068]">{tag}</span>)}
              </div>
            </div>

            <div className="reveal-item relative min-h-[470px] overflow-hidden bg-gradient-to-br from-[#2b2526] via-[#49373b] to-[#211b1d] p-7 sm:p-10" data-delay={80}>
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#d29ba7]/20 blur-[70px]" />
              <div className="relative flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/40">Mosaic / simplified system view</p><p className="mt-2 font-serif text-lg text-white/90">Context before generation</p></div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.5rem] uppercase tracking-[0.15em] text-white/45">confidential details omitted</span>
                </div>
                <div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="space-y-2">
                    {["codebase knowledge", "project history", "BA workflows"].map((item, i) => <div key={item} className={`rounded-[13px] border border-white/10 bg-white/[0.07] px-4 py-3 text-[0.65rem] text-white/65 ${i === 1 ? "translate-x-3" : ""}`}>{item}</div>)}
                  </div>
                  <span className="text-[#dcabb6]">→</span>
                  <div className="rounded-[20px] border border-[#d8a4af]/25 bg-[#d19aa7]/15 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
                    <p className="text-[0.55rem] uppercase tracking-[0.22em] text-[#efc1ca]">context engine</p>
                    <p className="mt-3 font-serif text-xl text-white">Mosaic</p>
                    <div className="mt-4 flex flex-wrap gap-2">{["stories", "docs", "Jira"].map((x) => <span key={x} className="rounded-full bg-white/10 px-3 py-1 text-[0.55rem] text-white/60">{x}</span>)}</div>
                  </div>
                </div>
                <p className="border-t border-white/10 pt-5 font-serif text-xl italic leading-8 text-white/75">“The problem wasn’t access to AI. It was missing workflow context.”</p>
              </div>
            </div>
          </section>

          {/* METRIC RAIL */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">
            {stats.map(([value, label], i) => (
              <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}>
                <p className="font-serif text-[2rem] font-semibold text-[#342d29]">{value}</p>
                <p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p>
              </div>
            ))}
          </section>

          {/* ROLE CLARITY */}
          <section className="reveal-item grid gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[0.35fr_1.65fr] lg:px-14" data-delay={0}>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">my scope</p>
            <p className="max-w-4xl font-serif text-[1.55rem] leading-[1.45] text-[#342d29] sm:text-[1.9rem]">My formal title was Business Analyst, but the primary assignment functioned like early product work: <span className="italic text-[#a26f7b]">research the workflow, define the problem, shape the direction, and help build the solution.</span></p>
          </section>

          {/* CHAPTERS */}
          <div className="grid border-t border-black/5 lg:grid-cols-[250px_1fr]">
            <aside className="hidden border-r border-black/5 bg-[#fffaf6]/45 p-7 lg:block">
              <div className="sticky top-8">
                <p className="text-[0.58rem] uppercase tracking-[0.26em] text-[#a89d96]">three initiatives</p>
                <nav className="mt-6 space-y-2">
                  {chapters.map((chapter) => <a key={chapter.number} href={chapter.href} className="group block border-t border-black/5 py-4"><span className="font-serif text-lg text-[#d1a1ab]">{chapter.number}</span><p className="mt-1 text-sm text-[#342d29] group-hover:text-[#9b6874]">{chapter.title}</p><p className="mt-1 text-[0.55rem] uppercase tracking-[0.16em] text-[#a89d96]">{chapter.label}</p></a>)}
                </nav>
              </div>
            </aside>

            <div>
              {/* MOSAIC */}
              <section id="mosaic" className="scroll-mt-8 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="reveal-item" data-delay={0}>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">01 / product discovery</p>
                  <h2 className="mt-3 font-serif text-[2rem] font-semibold text-[#1f1a18] sm:text-[2.5rem]">Mosaic</h2>
                  <p className="mt-3 max-w-2xl text-[1rem] leading-8 text-[#5e5048]">With two fellow BA interns, I conducted 15 semi-structured interviews across two offices to understand why existing generative tools were not reducing Business Analyst workload.</p>
                </div>

                <div className="reveal-item mt-10 grid gap-8 border-y border-black/5 py-9 sm:grid-cols-2" data-delay={80}>
                  <div><p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#a89d96]">what we heard</p><p className="mt-3 text-[0.9rem] leading-7 text-[#4d413b]">BAs repeatedly drafted epics, user stories, acceptance criteria, documentation, and Jira handoffs—then spent additional time correcting generic AI output.</p></div>
                  <div><p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#a89d96]">what it meant</p><p className="mt-3 text-[0.9rem] leading-7 text-[#4d413b]">The tools lacked project-specific context: codebase knowledge, historical stories, team language, and the connective tissue between documentation and delivery.</p></div>
                </div>

                <div className="reveal-item my-12" data-delay={120}>
                  <p className="max-w-4xl font-serif text-[2rem] font-semibold leading-[1.18] text-[#342d29] sm:text-[2.7rem]">We stopped asking, “What should the chatbot write?” and started asking, <span className="italic text-[#a26f7b]">“What context does the workflow need?”</span></p>
                </div>

                <div className="reveal-item overflow-hidden rounded-[28px] bg-[#2a2325] p-6 text-white shadow-[0_26px_65px_rgba(42,35,37,0.16)] sm:p-8" data-delay={160}>
                  <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[0.55rem] uppercase tracking-[0.24em] text-white/40">product direction</p><h3 className="mt-2 font-serif text-2xl">A context-aware agent system</h3></div><p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/35">simplified · confidential details omitted</p></div>
                  <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-center">
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.06] p-5 text-center"><p className="text-[0.55rem] uppercase tracking-[0.18em] text-[#e6b8c2]">context</p><p className="mt-2 text-sm text-white/75">Knowledge base</p></div><span className="hidden text-white/30 md:block">→</span>
                    <div className="grid grid-cols-2 gap-2">{["Codebase", "Story", "Workflow", "Jira"].map((agent) => <div key={agent} className="rounded-[14px] bg-white/[0.07] p-3 text-center text-[0.68rem] text-white/65">{agent} Agent</div>)}</div><span className="hidden text-white/30 md:block">→</span>
                    <div className="rounded-[18px] border border-white/10 bg-[#d29aa7]/10 p-5 text-center"><p className="text-[0.55rem] uppercase tracking-[0.18em] text-[#e6b8c2]">handoff</p><p className="mt-2 text-sm text-white/75">Jira-ready work</p></div>
                  </div>
                </div>

                <div className="reveal-item mt-8 grid gap-5 sm:grid-cols-2" data-delay={200}>
                  <div className="border-l-2 border-[#d2a0aa] pl-5"><p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#a89d96]">recognition</p><p className="mt-2 font-serif text-lg text-[#342d29]">Submitted for internal patent review</p><p className="mt-2 text-[0.82rem] leading-6 text-[#5e5048]">I contributed to Mosaic’s architecture, workflow design, and supporting documentation.</p></div>
                  <div className="border-l-2 border-[#d8c8bc] pl-5"><p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#a89d96]">enablement</p><p className="mt-2 font-serif text-lg text-[#342d29]">Weekly BA office hours</p><p className="mt-2 text-[0.82rem] leading-6 text-[#5e5048]">I trained active BAs on prompt structure, workflow integration, and tool navigation.</p></div>
                </div>
              </section>

              {/* DOCUMENTATION */}
              <section id="documentation" className="scroll-mt-8 border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="reveal-item grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" data-delay={0}>
                  <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">02 / legacy modernization</p><h2 className="mt-3 font-serif text-[2rem] font-semibold text-[#1f1a18] sm:text-[2.5rem]">5500 Documentation Agent</h2><p className="mt-5 text-[0.95rem] leading-8 text-[#5e5048]">I was assigned to a 401(k) mainframe system containing 600+ COBOL and VSAM files with almost no active documentation beyond a 2010 slide deck—and no prior COBOL background.</p></div>
                  <div className="rounded-[26px] border border-black/5 bg-white/75 p-7 shadow-[0_18px_45px_rgba(68,44,29,0.05)]"><p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#a89d96]">the question</p><p className="mt-4 font-serif text-[1.6rem] italic leading-9 text-[#342d29]">How do you make an undocumented system understandable without manually decoding every file?</p></div>
                </div>

                <div className="reveal-item mt-10 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center" data-delay={100}>
                  {[["input", "600+ files", "COBOL + VSAM"], ["agent", "5500 engine", "parse + synthesize"], ["output", "system map", "logic + dependencies"]].map(([label, title, detail], i) => <div key={label} className="contents"><div className={`rounded-[22px] border border-black/5 p-6 text-center ${i === 1 ? "bg-[#382d30] text-white shadow-[0_20px_45px_rgba(56,45,48,0.14)]" : "bg-white/80"}`}><p className={`text-[0.55rem] uppercase tracking-[0.2em] ${i === 1 ? "text-white/40" : "text-[#a89d96]"}`}>{label}</p><p className="mt-3 font-serif text-lg">{title}</p><p className={`mt-2 text-[0.68rem] ${i === 1 ? "text-white/55" : "text-[#7c7068]"}`}>{detail}</p></div>{i < 2 && <span className="hidden text-center text-[#c8bdb2] md:block">→</span>}</div>)}
                </div>

                <div className="reveal-item mt-10 grid gap-6 border-t border-black/5 pt-9 sm:grid-cols-3" data-delay={160}>
                  {[["01", "System logic", "A high-level view of modules and responsibilities."], ["02", "File relationships", "Dependencies and data movement across the codebase."], ["03", "Reusable model", "A generalized approach for other legacy applications."]].map(([num, title, text]) => <div key={num}><span className="font-serif text-xl text-[#d0a0aa]">{num}</span><p className="mt-2 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.8rem] leading-6 text-[#5e5048]">{text}</p></div>)}
                </div>
              </section>

              {/* ONBOARDING */}
              <section id="onboarding" className="scroll-mt-8 border-t border-black/5 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
                <div className="reveal-item max-w-3xl" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">03 / cross-functional codeathon</p><h2 className="mt-3 font-serif text-[2rem] font-semibold text-[#1f1a18] sm:text-[2.5rem]">AI Onboarding Agent</h2><p className="mt-5 text-[0.95rem] leading-8 text-[#5e5048]">Working with software engineers, Business Analysts, and finance teammates, I designed the UX flow and conversational persona for a Copilot Studio assistant that delivered team-specific context to new hires.</p></div>
                <div className="reveal-item mt-10 grid gap-4 sm:grid-cols-3" data-delay={100}>
                  {[["01", "Team context", "Role-specific codebase and workflow guidance."], ["02", "Guided Q&A", "Answers for recurring setup and process questions."], ["03", "Less repetition", "Reduced intended support burden for senior teammates."]].map(([num, title, text], i) => <div key={num} className={`relative p-6 ${i === 1 ? "rounded-[24px] bg-[#fffaf6] shadow-[0_16px_38px_rgba(68,44,29,0.05)]" : "border-t border-black/5"}`}><span className="font-serif text-xl text-[#d0a0aa]">{num}</span><p className="mt-3 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.8rem] leading-6 text-[#5e5048]">{text}</p></div>)}
                </div>
              </section>
            </div>
          </div>

          {/* HANDOFF + TAKEAWAY */}
          <section className="border-t border-black/5 bg-[#2b2426] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.7fr_1.3fr]" data-delay={0}>
              <div><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/40">handoff + impact</p><h2 className="mt-4 font-serif text-[2rem] leading-tight sm:text-[2.5rem]">The work continued after the internship.</h2></div>
              <div className="grid gap-5 sm:grid-cols-3">{[["01", "Patent review", "Mosaic architecture and documentation entered the internal review process."], ["02", "Reusable model", "The documentation approach was generalized beyond one codebase."], ["03", "Return offer", "Received a full-time Corporate Technology return offer."]].map(([num, title, text]) => <div key={num} className="border-t border-white/15 pt-4"><span className="font-serif text-lg text-[#e5b5bf]">{num}</span><p className="mt-2 text-sm text-white/85">{title}</p><p className="mt-2 text-[0.75rem] leading-6 text-white/50">{text}</p></div>)}</div>
            </div>
            <div className="reveal-item mt-14 border-t border-white/10 pt-10" data-delay={100}><p className="text-[0.58rem] uppercase tracking-[0.26em] text-white/35">what I took with me</p><p className="mt-5 max-w-5xl font-serif text-[2rem] leading-[1.22] text-white/90 sm:text-[2.8rem]">Enterprise AI succeeds when user research informs the system architecture—not when another chatbot is added to the workflow.</p></div>
          </section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14">
            <Link href="/work" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068] transition hover:text-[#201c1a]">← all work</Link>
            <Link href="/work/intent-layer" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Intent Layer →</Link>
          </div>
        </div>
      </div>

      <style>{`
        .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); }
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        @media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </main>
  );
}
