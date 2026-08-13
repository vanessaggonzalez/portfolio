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
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

const tags = [
  "business analysis",
  "AI agents",
  "enterprise AI",
  "COBOL / mainframe",
  "user research",
  "Jira",
  "Copilot Studio",
  "process design",
  "modernization",
];

const stats = [
  { value: "03", label: "AI-focused projects" },
  { value: "600+", label: "legacy files analyzed" },
  { value: "15", label: "Business Analysts interviewed" },
  { value: "01", label: "patent pending" },
];

const projects = [
  {
    number: "01",
    label: "legacy modernization",
    title: "5500 Documentation",
    subtitle: "Automating system discovery across undocumented legacy code.",
    pull:
      "How do you document 600+ mainframe files when the only existing context is a 2010 PowerPoint slide deck?",
    body:
      "Assigned to a legacy 401(k) mainframe system containing 600+ COBOL and VSAM files with minimal active documentation. Conducted technical analysis to map data flows, identify system dependencies, and establish a framework for enterprise modernization.",
    outcome:
      "Engineered an AI documentation agent that analyzes the codebase at both system-wide and file-by-file levels, surfacing function logic and dependencies while creating a reusable documentation model for other legacy systems.",
    tags: ["COBOL", "VSAM", "mainframe", "AI documentation"],
  },
  {
    number: "02",
    label: "user research + workflow design",
    title: "Mosaic",
    subtitle: "Designing AI workflows around real Business Analyst pain points.",
    pull:
      "The issue wasn't a lack of AI tools—it was that existing AI lacked the contextual knowledge required for BA workflows.",
    body:
      "Collaborated with two Business Analyst interns to conduct 15 semi-structured user research interviews across BA teams. Mapped daily workflows spanning epic creation, user stories, acceptance criteria, and Jira ticket management.",
    outcome:
      "Identified context loss as the primary friction point and co-developed Mosaic: a multi-agent AI system featuring dedicated tools for codebase parsing, story creation, and direct Jira handoffs. Co-filed an internal patent for the architecture.",
    tags: ["15 interviews", "user discovery", "multi-agent system", "Jira"],
  },
  {
    number: "03",
    label: "cross-functional codeathon",
    title: "AI Onboarding Agent",
    subtitle: "Streamlining team-specific developer and analyst onboarding.",
    pull:
      "New hires lost days navigating fragmented team documentation and requesting senior staff guidance.",
    body:
      "Partnered with software engineers, BAs, and finance team members during an internal Codeathon to solve team-level onboarding friction.",
    outcome:
      "Designed the UX workflow and agent persona for a team-specific Copilot Studio onboarding assistant, reducing repetitive onboarding support requests for senior team members.",
    tags: ["Copilot Studio", "onboarding", "cross-functional", "product design"],
  },
];

const handoffItems = [
  {
    label: "01",
    title: "Reusable Documentation Model",
    body:
      "Generalized the 5500 documentation approach from a single-codebase fix into a scalable framework for analyzing other legacy COBOL/mainframe applications.",
  },
  {
    label: "02",
    title: "Mosaic Handoff & Patent",
    body:
      "Prepared full system documentation and workflow architecture for Mosaic, resulting in an official internal patent filing (Pending).",
  },
  {
    label: "03",
    title: "BA Enablement & Office Hours",
    body:
      "Hosted weekly office hours to train Business Analysts on effective prompt structure, AI workflow integration, and tool navigation.",
  },
];

export default function BofaPage() {
  useReveal();

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
    {
      label: "LinkedIn ↗",
      href: "https://linkedin.com/in/vanessa-g-gonzalez",
      external: true,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      {/* GRAIN */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 grain-overlay"
      />

      {/* GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]"
      />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link
                href="/work"
                className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                ← work
              </Link>

              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-[#201c1a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* TITLE BLOCK */}
            <div
              className="reveal-item mt-10 max-w-4xl"
              data-delay={0}
            >
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                02 · experience · bank of america · global technology
              </p>

              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem] lg:text-[3.25rem]">
                Bank of America — Global Technology
              </h1>

              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Business Analyst Intern — AI Strategy & Product Discovery
              </p>

              <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[#4d413b]">
                During my Global Technology internship, I led product discovery and technical analysis across three enterprise AI initiatives: legacy mainframe modernization, BA workflow optimization, and internal employee onboarding.
              </p>

              <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-[#5e5048]">
                My work connected technical discovery, 15 user research interviews, and multi-agent system design—culminating in an official U.S. Patent filing (Pending) and a full-time Corporate Technology return offer.
              </p>

              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 600+ files analyzed · 15 BA interviews · patent pending · return offer received
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              by the numbers
            </div>

            {/* STATS */}
            <div
              className="reveal-item grid grid-cols-2 gap-4 sm:grid-cols-4"
              data-delay={80}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-black/5 bg-white/72 p-6 text-center shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                >
                  <p className="font-serif text-[2rem] font-semibold leading-none text-[#1f1a18]">
                    {stat.value}
                  </p>

                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the work
            </div>

            {/* PROJECT INDEX */}
            <div
              className="reveal-item grid gap-4 lg:grid-cols-3"
              data-delay={80}
            >
              {projects.map((project) => (
                <a
                  key={project.number}
                  href={`#project-${project.number}`}
                  className="group rounded-[26px] border border-black/5 bg-white/65 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_24px_60px_rgba(68,44,29,0.09)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                      {project.number} · {project.label}
                    </p>

                    <span className="font-serif text-[2rem] font-semibold leading-none text-[#e8ddd6]">
                      {project.number}
                    </span>
                  </div>

                  <h2 className="mt-6 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-[0.82rem] uppercase tracking-[0.16em] text-[#8a7d75]">
                    {project.subtitle}
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#4d413b]">
                    {project.pull}
                  </p>

                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#c8bdb2] transition group-hover:text-[#7c7068]">
                    jump to project ↓
                  </p>
                </a>
              ))}
            </div>

            {/* PROJECT 01 */}
            <section
              id="project-01"
              className="scroll-mt-8"
            >
              <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                <span className="h-px w-8 bg-[#c8bdb2]" />
                01 · legacy modernization
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={0}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    the problem
                  </p>

                  <h2 className="mt-3 font-serif text-[1.45rem] font-semibold leading-snug text-[#1f1a18]">
                    600+ Files. Minimal System Documentation.
                  </h2>

                  <div className="my-4 h-px bg-black/5" />

                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3">
                    Assigned to analyze a legacy 401(k) system built on COBOL, VSAM files, and mainframe infrastructure—supported only by a single outdated deck from 2010.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    The objective was to decode system logic, map data relationships across files, identify architectural bottlenecks, and establish a clear technical foundation for modernization.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    With no prior COBOL background, the core challenge was creating an automated, structured process to translate raw legacy code into understandable functional requirements.
                  </p>
                </div>

                <div
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={80}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    what I built
                  </p>

                  <h2 className="mt-3 font-serif text-[1.45rem] font-semibold leading-snug text-[#1f1a18]">
                    5500 AI Documentation Agent
                  </h2>

                  <div className="my-4 h-px bg-black/5" />

                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3">
                    An automated AI documentation agent that ingests legacy files and generates structured system documentation where manual records were missing.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    The system evaluates high-level module architecture down to individual file responsibilities and cross-file dependencies, producing a comprehensive technical system map.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {projects[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SYSTEM DIAGRAM */}
              <div
                className="reveal-item mt-4 overflow-hidden rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                data-delay={160}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                      the workflow
                    </p>

                    <h3 className="mt-2 font-serif text-[1.3rem] font-semibold text-[#1f1a18]">
                      Legacy Analysis Pipeline
                    </h3>
                  </div>

                  <p className="max-w-sm text-[0.78rem] leading-6 text-[#8a7d75]">
                    Simplified for portfolio presentation & confidentiality; proprietary system details omitted.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-5">
                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5 text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                      input
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      600+ Files
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      COBOL & VSAM codebase
                    </p>
                  </div>

                  <div className="hidden items-center justify-center md:flex">
                    <span className="text-[#c8bdb2]">→</span>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-white p-5 text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                      agent
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      5500 Agent
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      parses & synthesizes logic
                    </p>
                  </div>

                  <div className="hidden items-center justify-center md:flex">
                    <span className="text-[#c8bdb2]">→</span>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5 text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                      outputs
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      System Map
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      file relationships & roadmap
                    </p>
                  </div>

                  <div className="md:col-span-5 grid gap-3 pt-1 sm:grid-cols-3">
                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 01
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        System Overview & Logic
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 02
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        File-Level Relationships
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 03
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        Modernization Roadmap
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GENERALIZATION */}
              <div
                className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                data-delay={240}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                  scalability & impact
                </p>

                <h3 className="mt-3 max-w-3xl font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                  From a single codebase fix to a generalized documentation engine.
                </h3>

                <p className="mt-4 max-w-3xl text-[0.9rem] leading-7 text-[#5e5048]">
                  After validating the model on the 5500 system, I generalized the architecture so it could be deployed across other enterprise codebases. The resulting framework turned unstructured legacy systems into searchable, documented assets.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      initial state
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Unmapped 600+ COBOL codebase
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      innovation
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Systematized AI code-parsing agent
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      outcome
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Reusable enterprise-wide model
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PROJECT 02 */}
            <section
              id="project-02"
              className="scroll-mt-8"
            >
              <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                <span className="h-px w-8 bg-[#c8bdb2]" />
                02 · user research + workflow design
              </div>

              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                data-delay={0}
              >
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                      user research phase
                    </p>

                    <h2 className="mt-3 font-serif text-[1.55rem] font-semibold leading-snug text-[#1f1a18]">
                      Understanding Business Analyst AI Workflows
                    </h2>

                    <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                      Collaborated with two BA interns to conduct 15 in-depth user research interviews across cross-functional Business Analyst teams.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        15 interviews
                      </span>
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        3 BA interns
                      </span>
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        workflow discovery
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                        workflow bottlenecks
                      </p>
                      <p className="mt-3 text-[0.82rem] leading-6 text-[#342d29]">
                        Manual drafting of user stories, epics, acceptance criteria, Jira tracking, and repetitive documentation.
                      </p>
                    </div>

                    <div className="rounded-[20px] border border-black/5 bg-white p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                        AI tool friction
                      </p>
                      <p className="mt-3 text-[0.82rem] leading-6 text-[#342d29]">
                        Generative outputs lacked project-specific context, forcing BAs to spend excess time editing generated drafts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* KEY INSIGHT */}
              <div
                className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10"
                data-delay={80}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                  core discovery insight
                </p>

                <p className="mt-4 max-w-4xl font-serif text-[1.8rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.3rem]">
                  The problem wasn't a lack of AI tools.
                  <br />
                  <span className="text-[#8a7d75]">
                    It was a lack of workflow context.
                  </span>
                </p>

                <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                  Instead of building generic standalone AI assistants, we designed a context-aware framework that connects directly into the BA codebase, background documentation, and Jira ticket infrastructure.
                </p>
              </div>

              {/* MOSAIC WORKFLOW */}
              <div
                className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                data-delay={160}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                      the architecture
                    </p>

                    <h3 className="mt-2 font-serif text-[1.35rem] font-semibold text-[#1f1a18]">
                      Mosaic Multi-Agent System
                    </h3>
                  </div>

                  <p className="max-w-sm text-[0.78rem] leading-6 text-[#8a7d75]">
                    Simplified workflow model for portfolio presentation; confidential details omitted.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 lg:grid-cols-7 lg:items-center">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-5 text-center lg:col-span-2">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      context layer
                    </p>
                    <p className="mt-2 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      Mosaic Knowledge Base
                    </p>
                  </div>

                  <div className="hidden text-center text-[#c8bdb2] lg:block">
                    →
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
                    {[
                      "Codebase Agent",
                      "Story Agent",
                      "Workflow Agent",
                      "Jira Agent",
                    ].map((agent) => (
                      <div
                        key={agent}
                        className="rounded-[18px] border border-black/5 bg-white p-4"
                      >
                        <p className="text-[0.78rem] font-medium text-[#342d29]">
                          {agent}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden text-center text-[#c8bdb2] lg:block">
                    →
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-5 text-center lg:col-span-1">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      destination
                    </p>
                    <p className="mt-2 font-serif text-[0.95rem] font-semibold text-[#1f1a18]">
                      Jira Integration
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      my ownership
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Led product discovery and engineered the codebase documentation component using insights from the 5500 project.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      team collaboration
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Co-developed story creation and Jira handoff components alongside two BA intern peers.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      transition
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Documented full system architecture for seamless internal team handoff after internship conclusion.
                    </p>
                  </div>
                </div>
              </div>

              {/* PATENT / ENABLEMENT */}
              <div
                className="reveal-item mt-4 grid gap-4 sm:grid-cols-2"
                data-delay={240}
              >
                <div className="rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    recognition
                  </p>

                  <p className="mt-3 font-serif text-[1.45rem] font-semibold leading-snug text-[#1f1a18]">
                    U.S. Patent Filing (Pending)
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    Co-filed an internal U.S. patent within Bank of America recognizing the Mosaic architecture and knowledge-centered agent workflow.
                  </p>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    enablement
                  </p>

                  <p className="mt-3 font-serif text-[1.45rem] font-semibold leading-snug text-[#1f1a18]">
                    Weekly BA Office Hours
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    Hosted weekly office hours to train active Business Analysts on prompt engineering, workflow integration, and tool navigation.
                  </p>
                </div>
              </div>
            </section>

            {/* PROJECT 03 */}
            <section
              id="project-03"
              className="scroll-mt-8"
            >
              <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                <span className="h-px w-8 bg-[#c8bdb2]" />
                03 · cross-functional codeathon
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={0}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    the challenge
                  </p>

                  <h2 className="mt-3 font-serif text-[1.5rem] font-semibold leading-snug text-[#1f1a18]">
                    Streamlining Team-Specific Onboarding
                  </h2>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    Participated in an internal Codeathon alongside software engineers, Business Analysts, and finance team members to rethink developer onboarding.
                  </p>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    Designed a solution focused on delivering team-specific technical context to new hires, reducing repetitive onboarding overhead for managers and senior engineers.
                  </p>
                </div>

                <div
                  className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={80}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    what we created
                  </p>

                  <h2 className="mt-3 font-serif text-[1.5rem] font-semibold leading-snug text-[#1f1a18]">
                    Copilot Studio Onboarding Assistant
                  </h2>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    Designed the UX workflows and conversational architecture for a Copilot Studio onboarding agent, which was subsequently implemented by engineering.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {projects[2].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/5 bg-white/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* MOCKUP-STYLE FLOW */}
              <div
                className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                data-delay={160}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                  onboarding flow
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      01
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      Role & Team Context
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      New hires receive targeted codebase and team-specific guidance.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-white p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      02
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      AI Guided Q&A
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      Agent answers common technical and workflow setup questions.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      03
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      Reduced Manager Friction
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      Senior team members spend less time answering repetitive setup queries.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* HANDOFF */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              project handoff & impact
            </div>

            <div
              className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
              data-delay={0}
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {handoffItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-black/5 bg-[#fffaf6] p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#a89d96]">
                        {item.label}
                      </p>

                      <span className="font-serif text-[2.2rem] font-semibold leading-none text-[#e8ddd6]">
                        {item.label}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-[1.15rem] font-semibold text-[#1f1a18]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[0.84rem] leading-7 text-[#5e5048]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REFLECTION */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              key takeaway
            </div>

            <div
              className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10"
              data-delay={80}
            >
              <p className="max-w-4xl font-serif text-[1.65rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.1rem]">
                Product discovery in enterprise AI is about identifying structural context gaps, not just building chatbots.
              </p>

              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                Translating 15 BA interviews and 600+ legacy COBOL files showed me that technical systems succeed when user research directly informs system architecture.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  systems architecture
                </span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  product discovery
                </span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  user research
                </span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  enterprise AI
                </span>
              </div>
            </div>

            {/* CONFIDENTIALITY NOTE */}
            <p className="mt-5 text-center text-[0.66rem] uppercase tracking-[0.22em] text-[#a89d96]">
              Selected visuals are conceptualized for portfolio presentation; internal Bank of America code, systems, and proprietary documentation are omitted.
            </p>

            {/* BOTTOM NAV */}
            <div
              className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8"
              data-delay={0}
            >
              <Link
                href="/work/audible"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: audible
              </Link>

              <Link
                href="/work/anqclic"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                next: anqclic
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
              </Link>
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
              opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
          }

          @media (prefers-reduced-motion: reduce) {
            .reveal-item {
              opacity: 1;
              transform: none;
              transition: none;
            }
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