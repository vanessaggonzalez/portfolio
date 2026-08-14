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

function useInstagramEmbed() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

const tags = [
  "content strategy",
  "audience analytics",
  "adobe after effects",
  "video editing",
  "franchise lifecycle",
  "trend forecasting",
  "qualitative testing",
  "paid sponsorship",
  "fandom psychology",
];

const stats = [
  { value: "630K+", label: "total organic views" },
  { value: "116K+", label: "total likes" },
  { value: "5K+", label: "followers (10K+ peak)" },
  { value: "10+", label: "years content experience" },
];

const timeline = [
  { year: "2015–16", note: "Started editing short-form video on mobile apps (Video Star) at age 10." },
  { year: "2018", note: "Launched anqclic on Instagram. Upgraded to After Effects and Photoshop." },
  { year: "2020–21", note: "Capitalized on viral cultural waves (#DracoTok, trending audios), driving 630K+ views." },
  { year: "2021", note: "Secured commercial brand ambassador partnership with Funimate at age 15." },
  { year: "2023–25", note: "Pivoted to 3D typography and complex motion graphics while maintaining core fanbase." },
];

const embeds = [
  {
    url: "https://www.instagram.com/p/B3nHVlhHQMb/",
    date: "Oct 2019",
    note: "Early After Effects milestone—transitioning from basic mobile clips to structured keyframing and custom audio cuts.",
    fandom: "Harry Potter",
  },
  {
    url: "https://www.instagram.com/p/CGsXlUSFgpN/",
    date: "Oct 2020",
    note: "Highest-performing single edit—44K+ organic views and 10K+ likes by aligning audio pacing with high-engagement scenes.",
    fandom: "Harry Potter · 44K+ Views",
  },
  {
    url: "https://www.instagram.com/p/CSXA0UmrxVC/",
    date: "Aug 2021",
    note: "Focused on watch-time retention—testing shorter introductory hooks to minimize early drop-off.",
    fandom: "Romione · Lana Del Rey",
  },
  {
    url: "https://www.instagram.com/reel/Cu-GuClhWbZ/",
    date: "Jul 2023",
    note: "Collaborative edit utilizing 3D spatial camera movement and custom element tracking.",
    fandom: "3D Motion · The Neighbourhood",
  },
  {
    url: "https://www.instagram.com/reel/DKAmqBcB6Fn/",
    date: "May 2025",
    note: "Character narrative edit demonstrating typography, color grading, and precise beat-matching.",
    fandom: "Romione · Tame Impala",
  },
  {
    url: "https://www.instagram.com/reel/DNJOdkuvoSU/",
    date: "Aug 2025",
    note: "Personal showcase synthesizing 10 years of video editing technique and visual style.",
    fandom: "Creative Showcase · Lana Del Rey",
  },
];

const sections = [
  {
    label: "the core strategy",
    heading: "10 Years of Consumer Media & Audience Testing",
    pull: "A decade-long lab in digital content, visual storytelling, and audience psychology.",
    body: "Started video editing at age 10 in 2015 and built anqclic into an independent platform generating 630K+ views and 116K+ likes. Beyond editing, the account served as a real-world testing ground for understanding what holds consumer attention across shifting social algorithms.",
    tags: ["content strategy", "audience research", "after effects", "trend analysis", "fandom psychology"],
  },
  {
    label: "analytics & retention",
    heading: "Data-Informed Content Iteration",
    pull: "Using creator business analytics to optimize watch time, audio trends, and retention hooks.",
    body: "Analyzed Instagram Business analytics to study drop-off rates and audience demographics. Discovered that slow intro hooks caused immediate viewer drop-off, prompting tighter pacing. Leveraged qualitative A/B testing by sharing early drafts to Instagram Close Friends stories with trusted editors to refine cuts before posting.",
  },
  {
    label: "trend forecasting",
    heading: "Reading Franchise & Fandom Cycles",
    pull: "IP with deep emotional attachment doesn't fade—it resurfaces in predictable waves.",
    body: "Focusing heavily on Harry Potter was a calculated bet on franchise lifecycle, not just popularity: even decades after release, IP with strong emotional attachment resurges around anniversaries, nostalgia moments, and viral revivals like #DracoTok. Timing content to those cycles—rather than chasing generic trending audio—consistently drove outsized reach against one-off or niche content.",
  },
  {
    label: "monetization & outcome",
    heading: "Commercial Brand Partnership",
    stat: "630K+",
    statLabel: "organic views",
    body: "The account's organic reach and editing authority led to direct sponsorship outreach from mobile editing app Funimate, resulting in a paid commercial partnership at age 15. The decade spent building anqclic directly informs how I think about GTM strategy, product marketing, and franchise/content strategy in entertainment and media.",
    stamp: "anqclic · 2015 to present",
  },
];

export default function AnqclicPage() {
  useReveal();
  useInstagramEmbed();

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
                05 · creative archive · 2015 — present
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                Anqclic — Creator Archive
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Creator & Content Strategist / Audience Analytics / Video Production
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                An independent digital video platform built over a decade—using audience analytics, retention testing, and franchise-cycle forecasting to grow a fandom-driven audience to 630K+ organic views and a paid brand partnership.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 630K+ views · 116K+ likes · Funimate commercial sponsorship
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
              platform evolution
            </div>

            {/* TIMELINE */}
            <div className="reveal-item overflow-hidden rounded-[24px] border border-black/5 bg-white/72 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
              {timeline.map((item, i) => (
                <div key={item.year} className={`flex items-start gap-6 px-6 py-4 ${i !== timeline.length - 1 ? "border-b border-black/5" : ""}`}>
                  <p className="w-20 shrink-0 font-serif text-[0.95rem] font-semibold text-[#1f1a18]">{item.year}</p>
                  <p className="text-[0.88rem] leading-7 text-[#4d413b]">{item.note}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              selected content archive · 2019 — 2025
            </div>

            {/* INSTAGRAM EMBEDS */}
            <div className="reveal-item grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-delay={80}>
              {embeds.map((embed) => (
                <div key={embed.url} className="flex flex-col gap-3">
                  <div className="overflow-hidden rounded-[20px] border border-black/5 shadow-[0_14px_40px_rgba(68,44,29,0.06)]">
                    <blockquote
                      className="instagram-media !m-0 !w-full !max-w-none !min-w-0 !shadow-none !border-0 !rounded-none"
                      data-instgrm-captioned
                      data-instgrm-permalink={`${embed.url}?utm_source=ig_embed&utm_campaign=loading`}
                      data-instgrm-version="14"
                    />
                  </div>
                  <div className="px-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#a89d96]">{embed.date} · {embed.fandom}</p>
                    <p className="mt-1.5 text-[0.85rem] leading-7 text-[#4d413b]">{embed.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INSTAGRAM LINK */}
            <div className="reveal-item mt-6 flex justify-center" data-delay={80}>
              <a
                href="https://www.instagram.com/anqclic/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/8 bg-white/72 px-6 py-3 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
              >
                see the full archive on instagram →
              </a>
            </div>

            {/* DIVIDER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the story
            </div>

            {/* WRITTEN SECTIONS */}
            <div className="grid gap-4 lg:grid-cols-2">

              {/* SECTION 01 */}
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

              {/* SECTION 02 */}
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

              {/* SECTION 03 */}
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

              {/* SECTION 04 */}
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
              <Link href="/work/ama" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: AMA
              </Link>
              <Link href="/work" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                all work
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
          .instagram-media {
            margin: 0 !important;
            min-width: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
        `}</style>
      </div>
    </main>
  );
}