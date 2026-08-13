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
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const tags = [
  "wordpress cms",
  "web migrations",
  "email operations",
  "slate & campaign monitor",
  "web analytics",
  "salesforce CRM",
  "content strategy",
  "data visualization",
];

const stats = [
  { value: "4", label: "core web portals" },
  { value: "10K+", label: "weekly active users" },
  { value: "15%", label: "homepage traffic growth" },
  { value: "2 yrs", label: "experience" },
];

const toolGroups = [
  {
    category: "Web & CMS",
    tools: ["WordPress", "Elementor", "HTML", "CSS", "Site Migrations"],
  },
  {
    category: "Email & CRM",
    tools: ["Slate", "Campaign Monitor", "Salesforce (In Progress)"],
  },
  {
    category: "Data & Reporting",
    tools: ["Google Analytics", "Email Telemetry", "Data Visualization", "SEO Tracking"],
  },
];

const websites = [
  {
    name: "USC Undergraduate Admissions",
    href: "https://admission.usc.edu/",
    desc: "Primary prospective student portal—managed routine content deployments, layout updates, and mobile optimization.",
    stat: "10K+ weekly users",
  },
  {
    name: "USC Graduate Admissions",
    href: "https://gradadm.usc.edu/",
    desc: "Updated page structures, program requirements, and cross-device display consistency.",
    stat: "Multi-program hub",
  },
  {
    name: "USC ARR (Registrar)",
    href: "https://arr.usc.edu/",
    desc: "Executed full web migration from legacy site to align with unified USC enrollment site architecture.",
    stat: "Enrollment-critical",
  },
  {
    name: "USC Financial Aid",
    href: "https://financialaid.usc.edu/",
    desc: "Maintained financial resources, application deadlines, and student aid documentation.",
    stat: "High-traffic resource",
  },
];

const sections = [
  {
    label: "web operations",
    heading: "Managing 4 High-Traffic USC Web Portals",
    pull: "Translating PM requirements into live, accessible web updates across USC's primary enrollment ecosystems.",
    body: "Work directly with Project Managers to execute site edits, feature updates, and content migrations across four primary web properties: Undergraduate Admissions, Graduate Admissions, Financial Aid, and Academic Records & Registrar (ARR). Recently supported the complete site migration of the new ARR portal to standardize design and navigation with core enrollment sites.",
    tags: ["wordpress", "site migrations", "html/css", "web maintenance"],
  },
  {
    label: "email & CRM ops",
    heading: "Email Campaign Dispatch & Tracking",
    pull: "Executing multi-channel prospective student emails while managing CRM system transitions.",
    body: "Manage end-to-end email campaign logistics using Slate and Campaign Monitor—formatting communications, auditing mailing lists, and executing student dispatches. Currently assisting with the departmental migration to Salesforce to streamline audience segmentation and email automation.",
  },
  {
    label: "analytics & reporting",
    heading: "Performance Tracking & Data Visualization",
    pull: "Turning web telemetry and email delivery metrics into visual dashboards for leadership.",
    body: "Responsible for aggregating site-wide analytics—tracking search rankings, page visits, and referral channels to build clear visual charts for department heads. Simultaneously track email performance metrics (open rates, bounce rates, and delivery errors) to diagnose delivery issues and improve outreach efficiency.",
  },
  {
    label: "impact & growth",
    heading: "Data-Informed Content Strategy",
    stat: "15%",
    statLabel: "increase in homepage traffic",
    body: "Combining hands-on web management with consistent analytics reporting helped identify drop-off points, contributing to a 15% increase in weekly traffic across Admissions channels. The role balances technical implementation with direct communication strategy for thousands of prospective students.",
    stamp: "USC MarComm · 2 yrs",
  },
];

export default function USCMarCommPage() {
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
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      {/* GLOW */}
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]" />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link href="/work" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">
                ← work
              </Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* TITLE BLOCK */}
            <div className="reveal-item mt-10 max-w-3xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                03 · experience · university of southern california
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                USC Marketing Communications
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Web Operations / CRM & Email / Data Analytics
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                Managing WordPress development, email campaign operations (Slate & Campaign Monitor), and web performance reporting across four major USC enrollment and registrar portals serving 10,000+ weekly users.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 15% increase in weekly traffic across primary enrollment pages
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
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
            <div className="reveal-item grid grid-cols-2 gap-4 sm:grid-cols-4" data-delay={80}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] text-center">
                  <p className="font-serif text-[2rem] font-semibold text-[#1f1a18]">{stat.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              managed web portals
            </div>

            {/* WEBSITE CARDS */}
            <div className="reveal-item grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-delay={80}>
              {websites.map((site) => (
                <a
                  key={site.name}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(68,44,29,0.08)]"
                >
                  <p className="font-serif text-[1rem] font-semibold leading-snug text-[#1f1a18] group-hover:underline">
                    {site.name}
                  </p>

                  <p className="mt-3 text-[0.85rem] leading-7 text-[#4d413b]">{site.desc}</p>

                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#a89d96]">
                    ✦ {site.stat}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#8a7d75] transition-all group-hover:text-[#201c1a]">
                    <span>Visit site</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              tools & software
            </div>

            {/* TOOLS */}
            <div className="reveal-item grid gap-4 sm:grid-cols-3" data-delay={80}>
              {toolGroups.map((group) => (
                <div key={group.category} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{group.category}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              responsibilities & breakdown
            </div>

            {/* WRITTEN SECTIONS */}
            <div className="grid gap-4 lg:grid-cols-2">

              {/* SECTION 01: WEB OPS */}
              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] flex flex-col relative overflow-hidden"
                data-delay={0}
              >
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">01</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[0].label}</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[0].heading}</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-4">{sections[0].pull}</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">{sections[0].body}</p>
                {sections[0].tags && (
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {sections[0].tags.map((tag: string) => (
                      <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 02: EMAIL & CRM */}
              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden"
                data-delay={80}
              >
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">02</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[1].label}</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[1].heading}</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-3">{sections[1].pull}</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">{sections[1].body}</p>
              </div>

              {/* SECTION 03: ANALYTICS */}
              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden"
                data-delay={120}
              >
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">03</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[2].label}</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[2].heading}</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-3">{sections[2].pull}</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">{sections[2].body}</p>
              </div>

              {/* SECTION 04: OUTCOME */}
              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] flex flex-col relative overflow-hidden"
                data-delay={160}
              >
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">04</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[3].label}</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[3].heading}</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">{sections[3].body}</p>
                <span className="mt-auto pt-4 inline-block rounded-full border border-black/5 bg-[#fffaf6] px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-[#8a7d75] self-start">{sections[3].stamp}</span>
              </div>

            </div>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link href="/work/bofa" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: bank of america
              </Link>
              <Link href="/work/anqclic" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
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
              opacity  700ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal-item { opacity: 1; transform: none; transition: none; }
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