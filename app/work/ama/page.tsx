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
  "leadership",
  "content strategy",
  "instagram",
  "short-form video",
  "team management",
  "brand identity",
  "campaigns",
  "operations",
];

const stats = [
  { value: "120K+", label: "views in 60 days" },
  { value: "47%", label: "increase in accounts reached" },
  { value: "14,358", label: "accounts reached" },
  { value: "5", label: "person team led" },
];

const growth = [
  { label: "Posts", fall: "22", spring: "26 + 6 dumps" },
  { label: "Reels", fall: "1", spring: "4" },
  { label: "Stories", fall: "72", spring: "96" },
  { label: "Takeovers", fall: "5", spring: "4" },
];

const teamRoles = [
  {
    role: "Graphic Design",
    desc: "Designed all promotional content and shaped AMA's visual identity — GM graphics, branded assets, and consistent Instagram layout.",
    members: "2 in Fall '25 · 1 in Spring '26",
  },
  {
    role: "Media",
    desc: "Captured photos and video at events like Kickback, Gala, and Retreat — the raw material behind every recap post and reel.",
    members: "1 in Fall '25 · 2 in Spring '26",
  },
  {
    role: "Social Content",
    desc: "Wrote captions, developed reel concepts, and introduced member takeovers to make the feed feel more personal and community-driven.",
    members: "2 each semester",
  },
];

const sections = [
  {
    label: "the role",
    heading: "Project manager, internal marketing",
    pull: "My job was less about doing the work myself and more about making sure the right people could do their best work.",
    body: "AMA USC is one of the most active student orgs at USC. I came in as PM for internal marketing — responsible for everything touching AMA's brand: Instagram, GM graphics, event recaps, the website. I managed a team of five across graphic design, media, and social content across two semesters.",
    tags: ["leadership", "content strategy", "instagram", "short-form video"],
  },
  {
    label: "fall 2025",
    heading: "Finding the structure",
    pull: "Workflows that semester were the whole job. Streamlined handoffs, cleaner comms, fewer things falling through the cracks.",
    body: "We rebuilt the Figma brand pack after the original got deleted, cleaned up the Instagram (captions, highlights, formatting), and established a weekly rhythm for GM graphics and recaps. Not glamorous, but it made everything downstream easier.",
  },
  {
    label: "spring 2026",
    heading: "Leaning into short-form",
    pull: "The goal: less polished-announcement-account, more actual community.",
    body: "We went from 1 reel in fall to 4 in spring, added 6 dump posts, grew stories from 72 to 96. Introduced member takeovers, covered Gala and Retreat, and started tracking metrics. The result: 120K+ views in 60 days, 14,358 accounts reached, 47% increase from the prior period.",
  },
  {
    label: "what's next",
    heading: "Incoming VP of Marketing",
    stat: "VP",
    statLabel: "of Marketing · next semester",
    body: "A lot of what I built as PM — the workflows, the content rhythms, the team culture — I get to carry forward at a higher level. What I'm most excited about is pushing the creative bar further. We proved we can hit the numbers. Now I want to make content people actually care about.",
    stamp: "AMA USC · Fall 25 to Spring 26",
  },
];

export default function AMAPage() {
  useReveal();

  const navLinks = [
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/about" },
    { label: "Resume",  href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  // Google Slides embed URLs (using /embed instead of /edit)
  const fall2025Embed = "https://docs.google.com/presentation/d/1papHnsv3kCHD2-InhZBpUl5sQwaGRkLLhkwzgTNHzo4/embed?start=false&loop=false&delayms=3000";
  const spring2026Embed = "https://docs.google.com/presentation/d/11KYnDoGkceYtF8tPn1Vrx6AC6VZ-MJzmkavsYSlDf4A/embed?start=false&loop=false&delayms=3000";

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
                03 · experience · american marketing association at USC
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                American Marketing Association
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Leadership / content / strategy
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                Project manager for AMA USC's internal marketing team — leading a five-person team across graphic design, media, and social content to build and maintain the chapter's brand presence across two semesters.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ Incoming VP of Marketing · Spring 2026
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
              fall '25 → spring '26
            </div>

            {/* GROWTH TABLE */}
            <div className="reveal-item overflow-hidden rounded-[24px] border border-black/5 bg-white/72 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
              <div className="grid grid-cols-3 border-b border-black/5 px-6 py-3">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">Content type</p>
                <p className="text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">Fall '25</p>
                <p className="text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">Spring '26</p>
              </div>
              {growth.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 px-6 py-4 ${i !== growth.length - 1 ? "border-b border-black/5" : ""}`}>
                  <p className="font-serif text-[0.95rem] font-semibold text-[#1f1a18]">{row.label}</p>
                  <p className="text-center text-[0.9rem] text-[#7c7068]">{row.fall}</p>
                  <p className="text-center text-[0.9rem] font-medium text-[#4d413b]">{row.spring}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the team
            </div>

            {/* TEAM ROLES */}
            <div className="reveal-item grid gap-4 sm:grid-cols-3" data-delay={80}>
              {teamRoles.map((item) => (
                <div key={item.role} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="font-serif text-[1rem] font-semibold text-[#1f1a18]">{item.role}</p>
                  <p className="mt-3 text-[0.88rem] leading-7 text-[#4d413b]">{item.desc}</p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#a89d96]">✦ {item.members}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the decks
            </div>

            {/* SLIDES EMBEDS */}
            <div className="reveal-item space-y-6" data-delay={80}>
              {/* Fall 2025 */}
              <div>
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">Fall 2025 — semester recap</p>
                <div className="overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_70px_rgba(68,44,29,0.08)]" style={{ aspectRatio: "16/9", width: "100%" }}>
                  <iframe
                    src={fall2025Embed}
                    style={{ border: "none", width: "100%", height: "100%", display: "block" }}
                    allowFullScreen
                    title="AMA USC — Fall 2025 Semester Recap"
                  />
                </div>
              </div>

              {/* Spring 2026 */}
              <div>
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">Spring 2026 — end-of-semester portfolio</p>
                <div className="overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_70px_rgba(68,44,29,0.08)]" style={{ aspectRatio: "16/9", width: "100%" }}>
                  <iframe
                    src={spring2026Embed}
                    style={{ border: "none", width: "100%", height: "100%", display: "block" }}
                    allowFullScreen
                    title="AMA USC — Spring 2026 End-of-Semester Portfolio"
                  />
                </div>
              </div>
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
              <Link href="/work/usc-marcomm" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: USC MarComm
              </Link>
              <Link href="/work/anqclic" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                next: Anqclic
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