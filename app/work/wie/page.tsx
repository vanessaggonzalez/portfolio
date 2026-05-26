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
  "leadership",
  "content strategy",
  "graphic design",
  "canva",
  "wordpress",
  "canvas",
  "brand guidelines",
  "community building",
  "women in STEM",
];

const stats = [
  { value: "2,295", label: "students reached" },
  { value: "4", label: "person team led" },
  { value: "1 yr+", label: "and counting" },
  { value: "USC Viterbi", label: "school of engineering" },
];

const whatWeDo = [
  {
    title: "Events",
    desc: "From semester launch parties to grad send-offs, we design the graphics and spread the word that gets students in the door.",
  },
  {
    title: "Resources",
    desc: "WIE connects women in engineering to mentorship, community, and professional opportunities across USC Viterbi.",
  },
  {
    title: "Community",
    desc: "Open to all — grad and undergrad, any engineering major. Not a club, but a space where people actually show up for each other.",
  },
  {
    title: "Digital presence",
    desc: "Instagram, website, Canvas — our marketing team makes sure the WIE brand is consistent and accessible across every platform.",
  },
];

const embeds = [
  {
    url: "https://www.instagram.com/p/DW-G0ChD-mz/",
    label: "May 2025 · Graduate Send-Off",
    note: "Designed for our Class of 2026 celebration — a send-off event with sunglass decorating and polaroids for graduating engineers. Any engineering major was welcome.",
  },
  {
    url: "https://www.instagram.com/p/DWjr7F4lJUp/",
    label: "May 2025 · Meet the Eboard",
    note: "An appreciation post for our eboard before the semester wrapped — participated in a trending format to show off the team and the people behind WIE.",
  },
  {
    url: "https://www.instagram.com/p/DTa_4jtkuNm/",
    label: "Jan 2025 · Spring Launch",
    note: "Kicked off spring semester with a pink-and-girly aesthetic to match the event — hairclip decorating, dinner, and club tabling. This graphic set the visual tone for the whole semester.",
  },
];

const sections = [
  {
    label: "the role",
    heading: "Marketing Director, not just a marketer",
    body: `I came into this role as Director of Marketing and Development — which in practice means I'm both leading the team and doing the work. I manage three Associate Directors, but I'm also designing graphics, building out the website, and making sure every piece of content we put out actually reflects what WIE is trying to do.

WIE isn't a club with a membership list. It's a resource — for any student in USC Viterbi's School of Engineering who wants community, mentorship, or just a room full of people who get it. That changes how we think about marketing. There's no captive audience. Every event we promote has to earn its attendance.`,
  },
  {
    label: "how we work",
    heading: "Cross-team, request-driven design",
    body: `Our marketing workflow is collaborative by design. Other WIE departments — mentorship, professional development, community — come to us with event requests: a deadline, a vibe, sometimes a color palette or a photo they want included. From there, we have creative control over the execution.

That means every graphic I design is a translation problem: taking someone else's vision and making it feel cohesive, on-brand, and actually compelling enough for someone to stop scrolling. I work primarily in Canva and coordinate with the team to get approvals and incorporate feedback before anything goes live.`,
  },
  {
    label: "the website",
    heading: "Building within constraints",
    body: `I worked on the WIE website through USC Viterbi's web infrastructure — which came with real limitations. Without full admin access, I was working within a base template I didn't fully control, focusing on content architecture, copy, and making the structure as accessible and navigable as possible.

It's not my best technical work and I'll say that plainly. But it taught me something about how to do good work inside systems that aren't built for what you're trying to do — which is a skill in itself.`,
  },
  {
    label: "what I'm building",
    heading: "Brand consistency as infrastructure",
    body: `One of the first things I did in this role was establish brand guidelines — because consistent visual identity is how an organization starts to feel real and trustworthy to the people it's trying to reach. When every post looks like it belongs together, when the tone is the same across Instagram and email, when the website feels like an extension of the same thing — that's when marketing stops being noise and starts being trust.

I manage digital communications across WordPress and Canvas as well as Instagram, and I coordinate with executive leadership on events, workshops, and community initiatives. The goal has always been the same: make sure the people WIE is for actually know WIE exists.`,
  },
];

export default function WIEPage() {
  useReveal();
  useInstagramEmbed();

  const navLinks = [
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/#about" },
    { label: "Resume",  href: "/#resume" },
    { label: "Contact", href: "/#contact" },
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
                05 · leadership · usc viterbi school of engineering
              </p>
              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem]">
                USC Women in Engineering
              </h1>
              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Leadership / digital strategy / community
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-8 text-[#4d413b]">
                Director of Marketing and Development for USC Viterbi's WIE program — a resource for women in engineering to find community, mentorship, and support. I lead a 4-person team while designing the graphics, managing the digital presence, and making sure the people WIE is built for actually know it exists.
              </p>
              <p className="mt-4 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                ✦ Expanded reach and brand consistency across all digital communications
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
                  <p className="font-serif text-[1.7rem] font-semibold text-[#1f1a18] leading-tight">{stat.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              what wie does
            </div>

            {/* WHAT WE DO CARDS */}
            <div className="reveal-item grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-delay={80}>
              {whatWeDo.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="font-serif text-[1rem] font-semibold leading-snug text-[#1f1a18]">{item.title}</p>
                  <p className="mt-3 text-[0.85rem] leading-7 text-[#4d413b]">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              selected graphics · instagram
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
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#a89d96]">{embed.label}</p>
                    <p className="mt-1.5 text-[0.85rem] leading-7 text-[#4d413b]">{embed.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INSTAGRAM + WEBSITE LINKS */}
            <div className="reveal-item mt-6 flex flex-wrap justify-center gap-3" data-delay={80}>
              <a
                href="https://www.instagram.com/usc.viterbi.wie/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/8 bg-white/72 px-6 py-3 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
              >
                see the full feed on instagram →
              </a>
              <a
                href="https://viterbiundergrad.usc.edu/wie-website/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/8 bg-white/72 px-6 py-3 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
              >
                visit the wie website →
              </a>
            </div>

            {/* DIVIDER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the story
            </div>

            {/* WRITTEN SECTIONS */}
            <div className="grid gap-5 lg:grid-cols-2">
              {sections.map((section, i) => (
                <div
                  key={section.label}
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                  data-delay={i * 80}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{section.label}</p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-[0.95rem] leading-8 text-[#4d413b]">
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link href="/work/anqclic" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: anqclic
              </Link>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                anqclic / creative archive
              </p>
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