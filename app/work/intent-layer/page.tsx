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
  "product discovery",
  "recommendation systems",
  "audience research",
  "intent modeling",
  "UX strategy",
  "personalization",
  "Figma",
  "product thinking",
];

const stats = [
  { value: "01", label: "discovery gap" },
  { value: "02", label: "ways to capture intent" },
  { value: "02", label: "MVP phases" },
  { value: "01", label: "product concept" },
];

const discoveryCards = [
  {
    number: "01",
    label: "the discovery gap",
    title: "Every story ends. But “what's next?” isn't that simple.",
    pull:
      "Recommendation systems know what I watched. They do not necessarily know why I stayed.",
    body:
      "The starting point for Intent Layer was a familiar streaming problem: a viewer can finish a show they loved and still receive recommendations that feel completely wrong. The deck frames that gap as a difference between what a platform can observe and what a viewer is actually trying to recreate.",
    tags: ["watch history", "recommendations", "viewer intent"],
  },
  {
    number: "02",
    label: "research",
    title: "Same genre. Wrong reasons.",
    pull:
      "Two viewers can watch the same show for completely different reasons.",
    body:
      "The research moves beyond genre labels and surface similarity. Examples like Gossip Girl, The Vampire Diaries, Shameless, and Skins are used to show how one title can satisfy different emotional or situational needs—comfort, relationships, identity, familiar worlds, or simply a specific feeling.",
    tags: ["qualitative research", "behavioral context", "similarity ≠ intent"],
  },
  {
    number: "03",
    label: "the signal",
    title: "Small, personal signals can explain more than another content label.",
    pull:
      "A viewer's reason for watching can be more useful than another description of the thing they watched.",
    body:
      "The research points toward intent as a missing layer of personalization. Instead of only grouping content by genre, cast, tone, or other content traits, the system can begin learning the reason a specific viewer chose something in the first place.",
    tags: ["intent signal", "personalization", "context"],
  },
  {
    number: "04",
    label: "the opportunity",
    title: "The gap is the Intent Layer.",
    pull:
      "Recommendation systems answer “what's similar?” Viewers are asking “what will make me feel this way again?”",
    body:
      "Intent Layer proposes a new layer between watch history and recommendation: a lightweight representation of what the viewer was actually seeking. The goal is not to replace content similarity, but to give similarity a human reason to start from.",
    tags: ["product opportunity", "intent layer", "recommendation strategy"],
  },
];

const captureMethods = [
  {
    number: "01",
    label: "survey prompt",
    title: "Ask at the moment the signal is fresh.",
    body:
      "A lightweight post-watch prompt can capture why a viewer chose a title without turning the experience into a long survey. The prompt is designed to make intent explicit while the viewing context is still available.",
  },
  {
    number: "02",
    label: "tag / metadata",
    title: "Let intent become reusable product data.",
    body:
      "A tag system can translate the viewer's reason into structured metadata that becomes useful across future recommendations. The deck frames this as a way to move from a one-time answer toward a persistent understanding of the viewer.",
  },
];

const mvpPhases = [
  {
    number: "01",
    label: "phase 1",
    title: "Start with the survey.",
    body:
      "Introduce a lightweight intent prompt after viewing and use the responses to test whether explicit intent changes recommendation quality or perceived relevance.",
  },
  {
    number: "02",
    label: "phase 2",
    title: "Build the tag system.",
    body:
      "Translate repeated signals into a structured intent vocabulary that can travel across titles, sessions, and recommendation moments.",
  },
  {
    number: "03",
    label: "validate the concept",
    title: "Test whether intent actually improves the decision.",
    body:
      "The immediate goal is not a full recommendation engine. It is proving that knowing why someone watched can produce recommendations that feel more personally relevant.",
  },
  {
    number: "04",
    label: "the full vision",
    title: "Grow from a prompt into a persistent layer.",
    body:
      "A mature Intent Layer could connect viewer-supplied signals with content metadata and recommendation logic, making personalization feel more like understanding than prediction.",
  },
];

const intentExamples = [
  "chosen family",
  "deep comfort",
  "relationship tension",
  "coming-of-age",
  "escape",
  "nostalgia",
];

export default function IntentLayerPage() {
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
            <div className="reveal-item mt-10 max-w-4xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                02 · original product · intent layer
              </p>

              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem] lg:text-[3.25rem]">
                Intent Layer
              </h1>

              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Product discovery / recommendation systems / UX strategy
              </p>

              <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-[#4d413b]">
                Recommendation systems are good at answering what is similar. Intent Layer asks a different question: what was the viewer actually looking for when they pressed play?
              </p>

              <p className="mt-4 max-w-3xl text-[0.95rem] leading-8 text-[#5e5048]">
                The concept grew from a discovery gap in entertainment personalization: two people can watch the same show for completely different reasons, yet a platform can treat those reasons as if they were the same. Intent Layer proposes capturing that missing context and carrying it into what comes next.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* BY THE NUMBERS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              by the framework
            </div>

            <div className="reveal-item grid grid-cols-2 gap-4 sm:grid-cols-4" data-delay={80}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-black/5 bg-white/72 p-6 text-center shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                  <p className="font-serif text-[2rem] font-semibold leading-none text-[#1f1a18]">{stat.value}</p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* FIGMA DECK */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the deck
            </div>

            {/* Add the final Figma embed here once the presentation URL is ready. */}

            {/* DISCOVERY */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the discovery
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {discoveryCards.map((card, index) => (
                <section key={card.number} className={`reveal-item relative overflow-hidden rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8 ${index === 0 ? "lg:row-span-2" : ""}`} data-delay={index * 80}>
                  <span className="pointer-events-none absolute right-5 bottom-2 select-none font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">
                    {card.number}
                  </span>

                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    {card.number} · {card.label}
                  </p>

                  <h2 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                    {card.title}
                  </h2>

                  <div className="my-4 h-px bg-black/5" />

                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3">
                    {card.pull}
                  </p>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    {card.body}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CORE INSIGHT */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the insight
            </div>

            <section className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10" data-delay={80}>
              <p className="max-w-5xl font-serif text-[1.8rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.35rem]">
                Recommendation systems answer “what's similar?”
                <span className="text-[#8a7d75]"> Viewers are asking “what will make me feel this way again?”</span>
              </p>

              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                Intent Layer treats the gap between those questions as a product opportunity. Rather than throwing away existing recommendation logic, the concept adds a human signal that can explain what the viewer was chasing in the first place.
              </p>
            </section>

            {/* INTENT LAYER */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the intent layer
            </div>

            <section className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_24px_70px_rgba(68,44,29,0.07)] lg:p-10" data-delay={120}>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    from watch history → viewer intent
                  </p>

                  <h2 className="mt-3 max-w-xl font-serif text-[1.7rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2rem]">
                    Capture the reason behind the watch.
                  </h2>

                  <p className="mt-5 max-w-xl text-[0.92rem] leading-7 text-[#5e5048]">
                    The proposed system starts with a small intervention. Ask the viewer for one piece of context, translate that response into reusable intent data, and use it to make the next recommendation feel less generic.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {intentExamples.map((item, index) => (
                    <div key={item} className="rounded-[20px] border border-black/5 bg-[#fffaf6] p-5">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">intent signal 0{index + 1}</p>
                      <p className="mt-3 font-serif text-[1.05rem] font-semibold text-[#1f1a18]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CAPTURE METHODS */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              two ways to capture intent
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {captureMethods.map((method, index) => (
                <section key={method.number} className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={index * 80}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{method.number} · {method.label}</p>
                    <span className="font-serif text-[2.5rem] font-semibold leading-none text-[#e8ddd6]">{method.number}</span>
                  </div>

                  <h2 className="mt-5 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                    {method.title}
                  </h2>

                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    {method.body}
                  </p>
                </section>
              ))}
            </div>

            {/* MVP */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              start small, build toward the full layer
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {mvpPhases.map((phase, index) => (
                <section key={phase.number} className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8" data-delay={index * 70}>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{phase.number} · {phase.label}</p>
                  <h2 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">{phase.title}</h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.88rem] leading-7 text-[#5e5048]">{phase.body}</p>
                </section>
              ))}
            </div>

            {/* PRODUCT LOGIC */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              grouping ≠ answering
            </div>

            <section className="reveal-item overflow-hidden rounded-[30px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.07)]" data-delay={120}>
              <div className="grid lg:grid-cols-2">
                <div className="p-7 lg:p-10">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">what platforms already know</p>
                  <h2 className="mt-3 font-serif text-[1.55rem] font-semibold leading-snug text-[#1f1a18]">
                    Content traits can group things together.
                  </h2>
                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    Genre, cast, tone, title similarity, watch history, and other content signals can explain why two titles look related on paper.
                  </p>
                </div>

                <div className="border-t border-black/5 bg-[#fffaf6] p-7 lg:border-l lg:border-t-0 lg:p-10">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">what intent tries to answer</p>
                  <h2 className="mt-3 font-serif text-[1.55rem] font-semibold leading-snug text-[#1f1a18]">
                    Viewer intent can explain why the grouping matters.
                  </h2>
                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">
                    The same title can belong to different recommendation journeys because the viewer may be chasing a different feeling, context, or relationship pattern each time.
                  </p>
                </div>
              </div>
            </section>

            {/* TAKEAWAY */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              key takeaway
            </div>

            <section className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10" data-delay={80}>
              <p className="max-w-4xl font-serif text-[1.7rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.2rem]">
                The next generation of personalization shouldn't just know what I watched.
                <span className="text-[#8a7d75]"> It should understand what I was looking for.</span>
              </p>

              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                Intent Layer started as a recommendation-system critique and became a product concept about context. The opportunity is not to make recommendations noisier or more complicated—it is to give the system one more human signal to work with.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["product discovery", "intent modeling", "recommendation UX", "audience research", "personalization"].map((tag) => (
                  <span key={tag} className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link href="/work/audible" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: audible
              </Link>

              <Link href="/work/bofa" className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]">
                next: bank of america
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