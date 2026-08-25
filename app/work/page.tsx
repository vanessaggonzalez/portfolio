"use client";

import Image from "next/image";
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
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

const featuredProjects = [
  {
    slug: "audible",
    num: "01",
    title: "Audible — Clip & Share",
    category: "Product Strategy Lead / UX / Growth",
    image: "/images/clip-and-share.png",
    imageAlt: "Audible Clip & Share product concept",
    blurb:
      "Led product strategy for a 5-person team tackling Audible's Gen Z acquisition problem. Designed 'Clip & Share'—a low-friction social loop letting users export key audiobook moments straight to TikTok or Instagram without cluttering Audible's core app. Defined our proposed North Star metric (Share-to-Play Conversion Rate) and rethought the free-trial flow around a full first chapter instead of a locked preview.",
    impact:
      "First-place winning concept · Amazon-sponsored product case competition",
    tags: [
      "product strategy",
      "growth loops",
      "user discovery",
      "onboarding redesign",
    ],
  },
  {
    slug: "intent-layer",
    num: "02",
    title: "Intent Layer",
    category: "Original Product / AI / UX / Strategy",
    image: null,
    imageAlt: "Intent Layer product mockup placeholder",
    blurb:
      "An original product concept exploring how intent can shape the way people interact with digital systems. Full case study details, product flows, and interface mockups will be added here as the project develops.",
    impact: "Original product concept · Case study in progress",
    tags: ["product thinking", "AI", "UX strategy", "prototyping"],
  },
];

const spotlightExperience = {
  slug: "bofa",
  num: "03",
  title: "Bank of America — Global Technology",
  org: "Business Analyst Intern — AI Strategy & Discovery",
  category: "AI agents / user research / legacy systems",
  blurb:
    "Documented a 600+ file COBOL mainframe system with no real active docs beyond a 2010 slide deck, then built an AI agent to explain it file by file—now being generalized across teams. Interviewed 15 Business Analysts to pinpoint where existing AI tools were failing, leading to Mosaic (a multi-agent documentation system) and an official U.S. Patent filing (Pending).",
  impact:
    "600+ files analyzed · 15 BA interviews · U.S. patent filing pending",
  tags: [
    "AI agents",
    "product discovery",
    "user research",
    "legacy systems",
    "Copilot Studio",
  ],
};

const mainProjects = [
  {
    slug: "usc-marcomm",
    num: "04",
    title: "USC Marketing Communications",
    org: "University of Southern California",
    category: "Brand / digital strategy / web analytics",
    blurb:
      "Managed WordPress development, email campaign operations (Slate & Campaign Monitor), and web performance reporting across four major USC enrollment portals serving 10,000+ weekly users.",
    impact: "15% increase in weekly traffic across primary enrollment pages.",
    tags: [
      "wordpress",
      "site migrations",
      "slate & campaign monitor",
      "web analytics",
    ],
  },
  {
    slug: "ama",
    num: "05",
    title: "American Marketing Association",
    org: "VP of Marketing & Co-Lead",
    category: "Leadership / division ops / client strategy",
    blurb:
      "Co-leading 30 members across internal marketing and client consulting groups. Formerly Internal Marketing PM, managing a 5-person creative team that drove 120K+ organic social views in 60 days.",
    impact: "30 members managed · 3 project tracks · 120K+ views",
    tags: [
      "vp leadership",
      "30-member org",
      "client consulting",
      "brand ops",
    ],
  },
  {
    slug: "sharemeal",
    num: "06",
    title: "ShareMeal",
    org: "USC Computer Science · CSCI 310",
    category: "Product Design / Frontend Engineering / Agile",
    blurb:
      "Designed the primary UI/UX for ShareMeal, a social meal-planning platform built by a software engineering team across two-week Scrum sprints. Created and continuously iterated the Figma prototype, implemented major frontend experiences including the homepage, login, favorites, and profile, and translated stakeholder requirements into a tested, accessible product.",
    impact: "Semester-long full-stack build · ~92% final project score",
    tags: ["figma", "frontend", "scrum / jira", "accessibility"],
  },
  {
    slug: "anqclic",
    num: "07",
    title: "Anqclic — Creator Archive",
    org: "Creator & Content Strategist",
    category: "Creative archive / audience growth / video",
    blurb:
      "Grew an independent digital video platform to 5,000+ followers and 630K+ organic views using Instagram Business analytics (drop-off timing, demographics) and Close Friends story preview testing to refine pacing and audio trends. Earned a paid commercial sponsorship outreach from Funimate.",
    impact: "5K+ Followers · 630K+ Views · Brand Sponsored",
    tags: [
      "content strategy",
      "audience analytics",
      "qualitative testing",
      "video editing",
    ],
  },
  {
    slug: "wie",
    num: "08",
    title: "USC Women in Engineering",
    org: "Director of Marketing (2nd Term)",
    category: "Leadership / digital operations",
    blurb:
      "Re-elected for a second consecutive term as Director of Marketing—retaining 100% of Associate Directors, managing cross-department marketing requests, and organizing WordPress content.",
    impact: "2nd Term Director · 100% Associate Director Retention",
    tags: [
      "leadership",
      "team retention",
      "cross-team ops",
      "canva & wordpress",
    ],
  },
];

// Additional technical & coursework experiences
const additionalProjects = [
  {
    num: "09",
    title: "CAIS++ — Applied Machine Learning",
    org: "USC Center for AI in Society",
    category: "Applied AI / ML / Technical Literacy",
    blurb:
      "Completed USC's competitive applied AI curriculum, gaining hands-on Python experience building ML classification models for medical imaging (Alzheimer's detection). Provided the technical foundation for evaluating LLM architectures and AI workflows.",
    tags: ["python", "applied ml", "llm literacy", "computer vision"],
  },
  {
    num: "10",
    title: "Techsalerator — Market Intelligence",
    org: "B2B Sales & Discovery Intern",
    category: "B2B Outreach / Market Research",
    blurb:
      "Conducted B2B market research and qualified enterprise data leads, managing outreach strategy to connect corporate partners (including prospective clients like Uber and Postmates) with global demographic intelligence datasets.",
    tags: ["b2b research", "lead qualification", "market discovery"],
  },
];

export default function WorkPage() {
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
        className="grain-overlay pointer-events-none fixed inset-0 z-0"
      />

      {/* AMBIENT GLOW */}
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
                href="/"
                className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                ← back home
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

            {/* INTRO */}
            <div className="reveal-item mt-10 max-w-2xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                selected work / 2021 — present
              </p>

              <h1 className="mt-4 font-serif text-[2.2rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.8rem]">
                Selected Work
              </h1>

              <p className="mt-5 text-[1.02rem] leading-8 text-[#4d413b]">
                My background spans computer science, product strategy, and
                visual culture. Across enterprise AI discovery at Bank of
                America, consumer growth strategy for Audible, and a decade of
                building an independent digital video account, I focus on
                breaking down complex problems and designing products, systems,
                and content that feel intentional and clear.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">
                  USC CS + Business
                </span>

                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">
                  Adobe Student Ambassador
                </span>

                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">
                  Product & GTM Strategy
                </span>
              </div>
            </div>

            {/* CURRENTLY */}
            <div
              className="reveal-item mt-8"
              data-delay={80}
            >
              <div className="relative overflow-hidden rounded-[30px] border border-[#e8a0b0]/30 bg-gradient-to-br from-[#fff8fa] via-white/75 to-[#f8eee8] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#e8a0b0]/20 blur-[70px]"
                />

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a26f7b]">
                      currently
                    </p>

                    <span className="rounded-full border border-[#e8a0b0]/25 bg-white/75 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-[#9b6d78]">
                      2026 — present
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-[1.5rem] font-semibold leading-tight text-[#1f1a18] sm:text-[1.75rem]">
                    Adobe Student Ambassador
                  </h2>

                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    University of Southern California
                  </p>

                  <p className="mt-5 max-w-3xl text-[0.95rem] leading-8 text-[#4d413b]">
                    Selected to represent Adobe at USC after nearly a decade of using Adobe
                    tools for video editing and visual storytelling through anqclic.
                    Currently completing ambassador training in Adobe Express, content
                    creation, and campus event support, with future projects focused on
                    helping students explore accessible creative tools.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "creative technology",
                      "product education",
                      "campus engagement",
                      "content creation",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e8a0b0]/20 bg-white/75 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/work/anqclic"
                    className="mt-6 inline-block text-[0.68rem] uppercase tracking-[0.28em] text-[#b47a87] transition hover:text-[#7c4f59]"
                  >
                    explore the creative foundation →
                  </Link>
                </div>
              </div>
            </div>

            {/* PRODUCT WORK */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              product work
            </div>

            <div className="space-y-6">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="reveal-item block"
                  data-delay={80 + index * 80}
                >
                  <article className="group overflow-hidden rounded-[34px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(68,44,29,0.10)] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
                    {/* IMAGE */}
                    <div className="relative h-[280px] overflow-hidden border-b border-black/5 lg:h-full lg:min-h-[420px] lg:border-b-0 lg:border-r">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#eee3da]">
                          <div className="absolute inset-6 rounded-[24px] border border-dashed border-[#cdbfb5]">
                            <div className="flex h-full items-center justify-center px-8 text-center">
                              <div>
                                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#9d8f86]">
                                  mockup placeholder
                                </p>
                                <p className="mt-2 font-serif text-lg text-[#7c7068]">
                                  Intent Layer
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent lg:bg-gradient-to-r" />

                      <div className="absolute bottom-5 left-5 lg:hidden">
                        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/80">
                          {project.slug === "audible"
                            ? "featured case study"
                            : "original product"}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-center p-7 lg:p-10">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                        {project.num} ·{" "}
                        {project.slug === "audible"
                          ? "featured case study"
                          : "original product"}
                      </p>

                      <h2 className="mt-3 font-serif text-[1.6rem] font-semibold leading-tight text-[#1f1a18] sm:text-[1.9rem]">
                        {project.title}
                      </h2>

                      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                        {project.category}
                      </p>

                      <p className="mt-5 text-[0.97rem] leading-8 text-[#4d413b]">
                        {project.blurb}
                      </p>

                      <p className="mt-4 text-[0.78rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                        ✦ {project.impact}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition-all duration-200 group-hover:text-[#7c7068]">
                        {project.slug === "audible"
                          ? "view case study →"
                          : "explore product →"}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* SELECTED EXPERIENCE */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              selected experience
            </div>

            <Link
              href={`/work/${spotlightExperience.slug}`}
              className="reveal-item block"
              data-delay={180}
            >
              <article className="group relative overflow-hidden rounded-[30px] border border-black/5 bg-white/65 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_26px_70px_rgba(68,44,29,0.09)] lg:p-10">
                {/* NUMBER */}
                <span className="absolute right-7 top-6 select-none font-serif text-[3rem] font-semibold leading-none text-[#e8ddd6]">
                  {spotlightExperience.num}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                    {spotlightExperience.org}
                  </p>

                  <span className="rounded-full border border-black/5 bg-[#fffaf6] px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-[#a89d96]">
                    summer 2025
                  </span>
                </div>

                <h3 className="mt-3 max-w-2xl pr-12 font-serif text-[1.5rem] font-semibold leading-snug text-[#1f1a18] sm:text-[1.75rem]">
                  {spotlightExperience.title}
                </h3>

                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                  {spotlightExperience.category}
                </p>

                <p className="mt-5 max-w-3xl text-[0.95rem] leading-8 text-[#4d413b]">
                  {spotlightExperience.blurb}
                </p>

                <p className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                  ✦ {spotlightExperience.impact}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {spotlightExperience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition-all duration-200 group-hover:text-[#7c7068]">
                  explore the work →
                </p>
              </article>
            </Link>

            {/* MAIN PROJECTS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              experience
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {mainProjects.map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="reveal-item block"
                  data-delay={i * 80}
                >
                  <article className="group relative h-full overflow-hidden rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.09)]">
                    <span className="absolute right-6 top-6 select-none font-serif text-[2.4rem] font-semibold leading-none text-[#e8ddd6]">
                      {project.num}
                    </span>

                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                      {project.org}
                    </p>

                    <h3 className="mt-2 pr-10 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                      {project.category}
                    </p>

                    <p className="mt-4 text-[0.9rem] leading-7 text-[#4d413b]">
                      {project.blurb}
                    </p>

                    <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      ✦ {project.impact}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition-all duration-200 group-hover:text-[#7c7068]">
                      read more →
                    </p>
                  </article>
                </Link>
              ))}
            </div>

            {/* ADDITIONAL TECHNICAL & COURSEWORK WORK */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              additional work & technical coursework
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {additionalProjects.map((project, i) => (
                <div
                  key={project.num}
                  className="reveal-item block"
                  data-delay={i * 80}
                >
                  <article className="relative h-full overflow-hidden rounded-[28px] border border-black/5 bg-white/55 p-6 shadow-[0_14px_40px_rgba(68,44,29,0.04)]">
                    <span className="absolute right-5 top-5 select-none font-serif text-[2rem] font-semibold leading-none text-[#ede5df]">
                      {project.num}
                    </span>

                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#a89d96]">
                      {project.org}
                    </p>

                    <h3 className="mt-2 pr-8 font-serif text-[1.05rem] font-semibold leading-snug text-[#1f1a18]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#8a7d75]">
                      {project.category}
                    </p>

                    <p className="mt-3 text-[0.88rem] leading-7 text-[#4d413b]">
                      {project.blurb}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-[#7c7068]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              ))}
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