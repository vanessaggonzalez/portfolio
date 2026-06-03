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
  "digital marketing",
  "web development",
  "analytics",
  "branding",
  "wordpress",
  "html / css",
  "content strategy",
  "campaign management",
];

const stats = [
  { value: "15%", label: "increase in weekly traffic" },
  { value: "10K+", label: "weekly users reached" },
  { value: "4", label: "websites maintained" },
  { value: "1 yr 9 mos", label: "and counting" },
];

const toolGroups = [
  {
    category: "Web & CMS",
    tools: ["WordPress", "Elementor", "HTML", "CSS"],
  },
  {
    category: "Data & Analytics",
    tools: ["Google Analytics", "Slate", "Campaign Monitor"],
  },
  {
    category: "Marketing",
    tools: ["Email Campaigns", "Digital Advertising", "SEO", "A/B Testing"],
  },
];

const websites = [
  {
    name: "USC Undergraduate Admissions",
    desc: "Primary enrollment site — redesigned for mobile responsiveness and accessibility.",
    stat: "10K+ weekly users",
  },
  {
    name: "USC Graduate Admissions",
    desc: "Updated content architecture and improved cross-device rendering.",
    stat: "Multi-program reach",
  },
  {
    name: "USC ARR",
    desc: "Maintained and optimized page structure and messaging consistency.",
    stat: "Enrollment-critical",
  },
  {
    name: "USC Financial Aid",
    desc: "Improved accessibility and ensured accurate, up-to-date content for prospective students.",
    stat: "High-traffic resource",
  },
];

const sections = [
  {
    label: "the role",
    heading: "What I was brought in to do",
    pull: "Real work from day one — not executing tasks, but thinking through how all the pieces connected.",
    body: "I joined USC's Marketing Communications team embedded within Undergraduate Admissions, redesigning enrollment websites and managing campaigns that served 10,000+ weekly users. The scope was broader than a typical intern role, and that kind of ownership early shaped how I approach this work now.",
    tags: ["web", "analytics", "branding", "campaigns"],
  },
  {
    label: "the work",
    heading: "Web, content, and campaigns",
    pull: "Mobile responsiveness was a consistent focus. A lot of prospective students are on their phones.",
    body: "I redesigned undergraduate enrollment sites in HTML, CSS, WordPress, and Elementor, improving accessibility and visual experience. On the campaign side, data-informed content contributed to a 15% increase in weekly traffic to the Admissions homepage.",
  },
  {
    label: "my approach",
    heading: "Analytics as a creative tool",
    pull: "I used data as a creative input, not just a report card.",
    body: "Google Analytics week-over-week to track what was working. Slate and Campaign Monitor to understand open rates and audience behavior. The goal was to let those insights shape the work rather than just validate it after the fact.",
  },
  {
    label: "what I took from it",
    heading: "The habit of intentionality",
    stat: "15%",
    statLabel: "increase in weekly traffic",
    body: "Good marketing isn't about doing more. It's about doing the right things with enough care that people notice. Every page edit and every analytics dive was practice in that. Working across audiences at USC also taught me how to make messaging feel personal even at scale.",
    stamp: "USC MarComm · 1 yr 9 mos",
  },
];

export default function USCMarCommPage() {
  useReveal();

  const navLinks = [
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Resume",  href: "/resume" },
    { label: "Contact", href: "/contact" },
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
                02 · experience · university of southern california
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                USC Marketing Communications
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Brand / content / analytics
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                Redesigned undergraduate enrollment websites, managed multimedia campaigns, and used analytics and audience behavior to improve messaging and accessibility for 10,000+ weekly users.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 15% increase in weekly traffic across digital campaigns
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
              websites
            </div>

            {/* WEBSITE CARDS */}
            <div className="reveal-item grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-delay={80}>
              {websites.map((site) => (
                <div key={site.name} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="font-serif text-[1rem] font-semibold leading-snug text-[#1f1a18]">{site.name}</p>
                  <p className="mt-3 text-[0.85rem] leading-7 text-[#4d413b]">{site.desc}</p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#a89d96]">✦ {site.stat}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              tools & platforms
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
              the story
            </div>

            {/* WRITTEN SECTIONS */}
            <div className="grid gap-4 lg:grid-cols-2" style={{ gridTemplateRows: "auto auto auto" }}>

              {/* TALL LEFT — card 0 */}
              <div
                className="reveal-item row-span-2 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] flex flex-col relative overflow-hidden"
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

              {/* TOP RIGHT — card 1 */}
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

              {/* BOTTOM RIGHT — card 2 */}
              <div
                className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden"
                data-delay={160}
              >
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">03</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[2].label}</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[2].heading}</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-3">{sections[2].pull}</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">{sections[2].body}</p>
              </div>

              {/* FULL WIDTH BOTTOM — card 3 (outcome/final) */}
              <div
                className="reveal-item lg:col-span-2 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] flex flex-col sm:flex-row items-start gap-6"
                data-delay={240}
              >
                <div className="shrink-0">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{sections[3].label}</p>
                  <p className="mt-2 font-serif text-[2.4rem] font-semibold leading-none text-[#1f1a18]">{sections[3].stat}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#a89d96]">{sections[3].statLabel}</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-black/5" />
                <div className="flex-1">
                  <h2 className="font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{sections[3].heading}</h2>
                  <p className="mt-3 text-[0.88rem] leading-7 text-[#5e5048]">{sections[3].body}</p>
                  <span className="mt-4 inline-block rounded-full border border-black/5 bg-[#fffaf6] px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-[#8a7d75]">{sections[3].stamp}</span>
                </div>
              </div>

            </div>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link href="/work" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                all work
              </Link>
              <Link href="/work/ama" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                next: AMA
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