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

// Load Instagram embed script once
function useInstagramEmbed() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // If already loaded, just re-process
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
  "adobe after effects",
  "photoshop",
  "media encoder",
  "typography",
  "audio editing",
  "video editing",
  "storytelling",
  "brand partnership",
  "freelance",
];

const stats = [
  { value: "630K+", label: "total views" },
  { value: "116K+", label: "total likes" },
  { value: "5K+", label: "followers" },
  { value: "10+", label: "years editing" },
];

const timeline = [
  { year: "2015", note: "Downloaded Vine. Saw an edit. Had to make one." },
  { year: "2016–17", note: "Video Star era; Harry Potter, Selena, Twenty One Pilots, etc." },
  { year: "2018", note: "Saved up for a MacBook. Begged for After Effects. Everything changed." },
  { year: "2019", note: "First edit that made it feel real. The hard work actually showed." },
  { year: "2021", note: "Funimate brand partnership. The account started meaning something." },
  { year: "2023", note: "Collab era. 3D work. Pushing the craft while managing school." },
  { year: "2025", note: "Birthday edit!! Last major edit I've made but poured my heart into it." },
];

const embeds = [
  {
    url: "https://www.instagram.com/p/B3nHVlhHQMb/",
    date: "Oct 2019",
    note: "One of my first edits where I felt like all the hours actually paid off. The style doesn't match what I make now but the feeling of finishing it does.",
    fandom: "Harry Potter",
  },
  {
    url: "https://www.instagram.com/p/CGsXlUSFgpN/",
    date: "Oct 2020",
    note: "My most-viewed edit ever — 44K+ views, 10K+ likes. A Harry edit to Trouble by Cage the Elephant. Simple, but it connected with people in a way I didn't expect.",
    fandom: "Harry Potter · most viewed",
  },
  {
    url: "https://www.instagram.com/p/CSXA0UmrxVC/",
    date: "Aug 2021",
    note: "Ron and Hermione to Cinnamon Girl by Lana Del Rey. I edit them a lot — they're kind of my constant. This one felt pretty and quiet in a way I loved.",
    fandom: "Romione · Lana Del Rey",
  },
  {
    url: "https://www.instagram.com/reel/Cu-GuClhWbZ/",
    date: "Jul 2023",
    note: "A collab with another editor — she did Hermione, I did Ron. We were both experimenting with 3D. Void by The Neighbourhood. One of my favorite things I've made.",
    fandom: "Collab · 3D · The Neighbourhood",
  },
  {
    url: "https://www.instagram.com/reel/DKAmqBcB6Fn/",
    date: "May 2025",
    note: "Made this for my boyfriend when I got into USC. Eventually by Tame Impala. Another Romione edit — they just keep showing up in my best ones.",
    fandom: "Romione · Tame Impala",
  },
  {
    url: "https://www.instagram.com/reel/DNJOdkuvoSU/",
    date: "Aug 2025",
    note: "My birthday edit. All the characters that feel like me. Black Beauty by Lana Del Rey. This one is the most me thing I've ever made.",
    fandom: "Birthday edit · Lana Del Rey",
  },
];

const sections = [
  {
    label: "the origin",
    heading: "It started with Vine",
    pull: "I was 10. I saw a fan edit on Vine and knew immediately I needed to learn how to do that.",
    body: "I didn't have money for software so I downloaded Video Star because it was free and spent years making the best edits I could with what I had. Harry Potter, Selena Gomez, Twenty One Pilots. The fandoms I lived in.",
    tags: ["after effects", "photoshop", "storytelling", "fan community"],
  },
  {
    label: "the turning point",
    heading: "A MacBook and After Effects",
    pull: "Growing up without a lot of money, finally having the right tools felt enormous.",
    body: "In 2018 I saved up for a MacBook Pro and got After Effects. It completely changed what I could make: masking, 3D, motion blur, typographic sequences. I started spending hours on single edits, obsessing over timing, font choices, the way a clip landed on a beat.",
  },
  {
    label: "the community",
    heading: "The people made it real",
    pull: "A niche shared language: caring deeply about fictional characters and wanting to make something beautiful about them.",
    body: "Collabs, freelance work, and in 2021 a brand partnership with Funimate — they reached out because of the audience I'd built and the quality of the work. That was the first time someone outside the community treated it like a professional credential.",
  },
  {
    label: "what it's taught me",
    heading: "Everything I know about craft",
    stat: "10+",
    statLabel: "years editing",
    body: "After Effects, Photoshop, audio editing, typography, color grading — all self-taught through iteration. More than the tools, anqclic taught me to care about the details most people won't notice. That sensibility lives in everything I make now, even when it's a campaign brief or a slide deck.",
    stamp: "anqclic · 2015 to present",
  },
];

export default function AnqclicPage() {
  useReveal();
  useInstagramEmbed();

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
                04 · creative archive · 2015 — present
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                Anqclic
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Creative / storytelling / platform growth
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                A video editing account I've been building since I was 10. What started as a free app and a lot of love for Harry Potter became a decade-long obsession with craft — and the place where I learned everything I know about making things feel intentional.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ 630K+ views · 116K+ likes · Funimate brand partnership
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
              a decade in
            </div>

            {/* TIMELINE */}
            <div className="reveal-item overflow-hidden rounded-[24px] border border-black/5 bg-white/72 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
              {timeline.map((item, i) => (
                <div key={item.year} className={`flex items-start gap-6 px-6 py-4 ${i !== timeline.length - 1 ? "border-b border-black/5" : ""}`}>
                  <p className="w-16 shrink-0 font-serif text-[0.95rem] font-semibold text-[#1f1a18]">{item.year}</p>
                  <p className="text-[0.88rem] leading-7 text-[#4d413b]">{item.note}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              selected edits · 2019 — 2025
            </div>

            {/* INSTAGRAM EMBEDS — 2 column grid */}
            <div className="reveal-item grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-delay={80}>
              {embeds.map((embed) => (
                <div key={embed.url} className="flex flex-col gap-3">
                  {/* Embed */}
                  <div className="overflow-hidden rounded-[20px] border border-black/5 shadow-[0_14px_40px_rgba(68,44,29,0.06)]">
                    <blockquote
                      className="instagram-media !m-0 !w-full !max-w-none !min-w-0 !shadow-none !border-0 !rounded-none"
                      data-instgrm-captioned
                      data-instgrm-permalink={`${embed.url}?utm_source=ig_embed&utm_campaign=loading`}
                      data-instgrm-version="14"
                    />
                  </div>
                  {/* Caption */}
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
              <Link href="/work/ama" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: AMA
              </Link>
              <Link href="/work/wie" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                next: USC WIE
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
          /* Override Instagram embed default styles to fit our grid */
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