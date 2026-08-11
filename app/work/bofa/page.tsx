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
  { value: "01", label: "internal patent filing" },
];

const projects = [
  {
    number: "01",
    label: "legacy modernization",
    title: "5500 Documentation",
    subtitle: "Understanding a system built long before I arrived.",
    pull:
      "How do you document hundreds of files when the system itself has become the documentation problem?",
    body:
      "I was given a legacy 401(k) system containing 600+ COBOL files alongside a small set of outdated documentation. The goal was to understand how the system worked, identify its current pain points, and develop a path toward modernization.",
    outcome:
      "Built an AI documentation agent that analyzes the codebase at both a system level and an individual-file level, surfacing file purpose, relationships, and system behavior while supporting a longer-term modernization roadmap.",
    tags: ["COBOL", "VSAM", "mainframe", "AI documentation"],
  },
  {
    number: "02",
    label: "user research + workflow design",
    title: "Mosaic",
    subtitle: "Designing AI around the context people actually need.",
    pull:
      "The problem wasn't that Business Analysts needed more AI. It was that AI didn't know enough about what they were doing.",
    body:
      "Working with two other Business Analyst interns, I helped interview 15 Business Analysts across their day-to-day workflows, including user stories, epics, acceptance criteria, Jira administration, and existing AI usage.",
    outcome:
      "The research pointed to context as the underlying problem. We co-developed Mosaic, a knowledge-centered AI workflow with specialized agents for codebase documentation, story creation, workflow support, and Jira handoff.",
    tags: ["15 interviews", "context", "knowledge base", "Jira"],
  },
  {
    number: "03",
    label: "cross-functional codeathon",
    title: "AI Onboarding",
    subtitle: "Making team-specific onboarding less overwhelming.",
    pull:
      "New hires shouldn't need to rely on a dozen people to figure out where to start.",
    body:
      "For an internal Codeathon, I worked with software engineers, Business Analysts, and finance team members to design a targeted onboarding solution for team-specific new hires.",
    outcome:
      "We created the concept and mockups for an onboarding agent in Copilot Studio, designed to give new hires more structured guidance while reducing repetitive onboarding support for managers and senior employees.",
    tags: ["Copilot Studio", "onboarding", "cross-functional", "product design"],
  },
];

const handoffItems = [
  {
    label: "01",
    title: "Documentation",
    body:
      "The legacy-system work evolved from a one-off analysis into a more reusable documentation model that can be generalized beyond a single codebase.",
  },
  {
    label: "02",
    title: "Mosaic",
    body:
      "The Mosaic workflow and supporting documentation were prepared for continued use and development after the internship.",
  },
  {
    label: "03",
    title: "Enablement",
    body:
      "I also began hosting office hours so Business Analysts could learn how to use the tools and understand the workflow behind them.",
  },
];

export default function BofaPage() {
  useReveal();

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
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
                Business analysis / AI systems / enterprise modernization
              </p>

              <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[#4d413b]">
                During my Global Technology internship, I worked across three
                AI-focused projects spanning legacy-system modernization,
                Business Analyst workflows, and employee onboarding.
              </p>

              <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-[#5e5048]">
                The work moved between technical investigation, user research,
                workflow design, and cross-functional product thinking — often
                starting with an ambiguous problem and ending with something
                tangible enough for another team to continue.
              </p>

              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 600+ files analyzed · 15 BA interviews · patent filing ·
                internal handoff
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
                    600+ files. Very little context.
                  </h2>

                  <div className="my-4 h-px bg-black/5" />

                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3">
                    I was handed a legacy 401(k) system built around COBOL,
                    VSAM files, and mainframe infrastructure — plus a handful
                    of documents, including a PowerPoint from 2010.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    The assignment was deliberately broad: understand how the
                    system works, document it, identify current pain points, and
                    propose a roadmap for modernization.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    I had never worked with COBOL or mainframe systems before.
                    That meant the first challenge wasn't simply analyzing the
                    code — it was figuring out how to make the system legible in
                    the first place.
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
                    5500 Documentation
                  </h2>

                  <div className="my-4 h-px bg-black/5" />

                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3">
                    An AI-powered documentation workflow that reads through
                    the codebase and creates structure where the source
                    material doesn't provide enough of it.
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    It analyzes the system at a high level while also drilling
                    down into the purpose of individual files and how those
                    files interact with one another.
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
                      From a codebase to a usable system map
                    </h3>
                  </div>

                  <p className="max-w-sm text-[0.78rem] leading-6 text-[#8a7d75]">
                    Conceptualized for the portfolio — no internal code or
                    proprietary system details shown.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-5">
                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5 text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                      input
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      600+ files
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      legacy code + docs
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
                      5500 Documentation
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      parses + synthesizes
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
                      System map
                    </p>
                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6b5d55]">
                      overview + file-level detail
                    </p>
                  </div>

                  <div className="md:col-span-5 grid gap-3 pt-1 sm:grid-cols-3">
                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 01
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        System overview
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 02
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        File-level documentation
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-black/5 bg-white p-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                        layer 03
                      </p>
                      <p className="mt-2 text-[0.8rem] font-medium text-[#342d29]">
                        Pain points + modernization roadmap
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
                  what changed in my thinking
                </p>

                <h3 className="mt-3 max-w-3xl font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                  I stopped thinking of it as a one-system solution.
                </h3>

                <p className="mt-4 max-w-3xl text-[0.9rem] leading-7 text-[#5e5048]">
                  Once the workflow worked for the 5500 system, I started
                  generalizing the model so the same approach could be applied
                  to other codebases and documentation sets. The interesting
                  problem wasn't the specific legacy system anymore — it was
                  the repeatable pattern underneath it.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      before
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      One unfamiliar codebase
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      insight
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Documentation can be systematized
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      after
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      A reusable documentation model
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
                      the research question
                    </p>

                    <h2 className="mt-3 font-serif text-[1.55rem] font-semibold leading-snug text-[#1f1a18]">
                      How are BAs actually using AI?
                    </h2>

                    <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                      I worked with two other Business Analyst interns and we
                      each interviewed roughly five Business Analysts, for 15
                      interviews total.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        15 interviews
                      </span>
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        3 interns
                      </span>
                      <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        workflow research
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                        workflow pain points
                      </p>
                      <p className="mt-3 text-[0.82rem] leading-6 text-[#342d29]">
                        User stories, epics, acceptance criteria, Jira
                        administration, and repetitive documentation work.
                      </p>
                    </div>

                    <div className="rounded-[20px] border border-black/5 bg-white p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                        AI pain points
                      </p>
                      <p className="mt-3 text-[0.82rem] leading-6 text-[#342d29]">
                        Outputs lacked enough context, forcing BAs to maintain
                        and refine what AI produced.
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
                  the key insight
                </p>

                <p className="mt-4 max-w-4xl font-serif text-[1.8rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.3rem]">
                  The problem wasn't a lack of AI.
                  <br />
                  <span className="text-[#8a7d75]">
                    It was a lack of context.
                  </span>
                </p>

                <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                  Instead of building isolated agents for every individual
                  pain point, we focused on the underlying reason the AI wasn't
                  consistently useful: it didn't know enough about the
                  environment, workflow, and history surrounding the task.
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
                      the solution
                    </p>

                    <h3 className="mt-2 font-serif text-[1.35rem] font-semibold text-[#1f1a18]">
                      Mosaic
                    </h3>
                  </div>

                  <p className="max-w-sm text-[0.78rem] leading-6 text-[#8a7d75]">
                    A knowledge-centered workflow with specialized agents
                    layered around the context BAs actually need.
                  </p>
                </div>

                <div className="mt-7 grid gap-3 lg:grid-cols-7 lg:items-center">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-5 text-center lg:col-span-2">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      context layer
                    </p>
                    <p className="mt-2 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      Mosaic knowledge base
                    </p>
                  </div>

                  <div className="hidden text-center text-[#c8bdb2] lg:block">
                    →
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
                    {[
                      "Codebase scraper",
                      "Story creator",
                      "Workflow support",
                      "Jira story handoff",
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
                      output
                    </p>
                    <p className="mt-2 font-serif text-[0.95rem] font-semibold text-[#1f1a18]">
                      Jira
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      my ownership
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      I worked on the codebase documentation component, building
                      on the same ideas developed through 5500 Documentation.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      team
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      Two other Business Analyst interns owned the other agents
                      and workflow components.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#a89d96]">
                      next step
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-6 text-[#342d29]">
                      The workflow was documented for handoff and continued
                      development beyond the internship.
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
                    Internal patent filing
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    Our group filed an internal patent within Bank of America
                    to recognize the Mosaic concept and the work behind it.
                  </p>
                </div>

                <div className="rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    enablement
                  </p>

                  <p className="mt-3 font-serif text-[1.45rem] font-semibold leading-snug text-[#1f1a18]">
                    Office hours
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    I began hosting office hours and helping Business Analysts
                    understand the workflow and how the tools fit into their
                    day-to-day process.
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
                    Make onboarding feel less overwhelming.
                  </h2>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    For an internal Codeathon, I worked alongside software
                    engineers, Business Analysts, and finance team members to
                    rethink how team-specific onboarding could work for new
                    hires.
                  </p>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    We designed the experience around reducing repetitive
                    questions and helping new hires understand what matters to
                    their specific team rather than receiving the same generic
                    onboarding information.
                  </p>
                </div>

                <div
                  className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={80}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    what we made
                  </p>

                  <h2 className="mt-3 font-serif text-[1.5rem] font-semibold leading-snug text-[#1f1a18]">
                    A targeted onboarding agent
                  </h2>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#5e5048]">
                    We created the concept and mockups for a team-specific
                    onboarding experience in Copilot Studio. The software team
                    then developed the solution from the design.
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
                  experience flow
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      01
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      New hire arrives
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      Team and role context shape what the person actually
                      needs.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-white p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      02
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      AI guides
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      The agent surfaces relevant information and next steps.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      03
                    </p>
                    <p className="mt-3 font-serif text-[1rem] font-semibold text-[#1f1a18]">
                      Manager load decreases
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">
                      Less repetitive onboarding support is required from
                      senior team members.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* HANDOFF */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              what happens after the internship
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
              what I took from it
            </div>

            <div
              className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10"
              data-delay={80}
            >
              <p className="max-w-4xl font-serif text-[1.65rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.1rem]">
                I came in thinking business analysis was about understanding
                requirements. I left much more interested in understanding the
                systems around them.
              </p>

              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                The most valuable part of the internship wasn't just learning
                new technical tools. It was learning how to enter unfamiliar
                systems, find the underlying problem, talk to the people
                affected by it, and turn that understanding into something
                another person can actually use.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  systems thinking
                </span>
                <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                  product thinking
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
              Selected visuals are conceptualized for portfolio presentation;
              internal Bank of America code, systems, and proprietary
              documentation are not shown.
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
                href="/work/usc-marcomm"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                next: usc marcomm
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