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
  "consumer research",
  "survey design",
  "intent modeling",
  "UX strategy",
  "personalization",
  "Figma",
  "streaming strategy",
];

const stats = [
  { value: "54", label: "survey starts" },
  { value: "44", label: "eligible viewers" },
  { value: "27", label: "submitted responses" },
  { value: "8–10", label: "interviews planned" },
];

const researchFindings = [
  {
    value: "97%",
    title: "Repeated recommendations",
    body: "agreed that they frequently see the same titles recommended repeatedly.",
    sample: "n = 34",
  },
  {
    value: "79%",
    title: "Browsing friction",
    body: "agreed that they sometimes spend more time browsing than they would like.",
    sample: "n = 34",
  },
  {
    value: "62%",
    title: "Situational decisions",
    body: "said mood and active-versus-background viewing influenced what they selected.",
    sample: "n = 37",
  },
  {
    value: "52%",
    title: "Misunderstood intent",
    body: "recalled a platform misunderstanding why they watched a particular title.",
    sample: "n = 33",
  },
  {
    value: "83%",
    title: "One-title overreaction",
    body: "had received unwanted recommendations because of one movie or show at least sometimes.",
    sample: "n = 24",
  },
  {
    value: "62%",
    title: "Pre-watch preference",
    body: "preferred clarifying intent before choosing or while browsing.",
    sample: "n = 24",
  },
];

const qualitativeSignals = [
  {
    title: "Genre missed the reason",
    body: "A viewer chose Sinners for its Southern Gothic qualities, then received horror recommendations despite not enjoying horror broadly.",
  },
  {
    title: "A shared account distorted taste",
    body: "After someone else watched a war movie on one respondent's account, war titles began filling their recommendations.",
  },
  {
    title: "Tone mattered within genre",
    body: "A respondent described wanting a particular kind of rom-com, while recommendations grouped together titles with very different levels of romance, humor, and sincerity.",
  },
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
    title: "General taste is not the same as moment-level intent.",
    pull:
      "Recommendations can be useful while still missing what a viewer wants right now.",
    body:
      "Among qualified respondents, recommendations were generally considered useful when viewers were undecided. The gap appeared in situational context: mood, attention level, available time, social setting, and the specific quality that made a previous title work.",
    tags: ["directional research", "viewing context", "similarity ≠ intent"],
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
    label: "post-watch learning",
    title: "Learn what made the experience work.",
    body:
      "An optional, title-specific prompt can ask what kept a viewer engaged—such as a relationship, tone, setting, or narrative dynamic—while that experience is still fresh.",
  },
  {
    number: "02",
    label: "pre-watch discovery",
    title: "Let viewers shape what fits right now.",
    body:
      "Before choosing or while browsing, viewers can combine optional intent tags such as background viewing, dark comedy, or chosen family to create a narrower and more explainable discovery set.",
  },
];

const mvpPhases = [
  {
    number: "01",
    label: "discovery research",
    title: "Study the viewing occasion.",
    body:
      "Use an exploratory survey and follow-up interviews to understand when recommendation context breaks down and which intent dimensions recur across viewers.",
  },
  {
    number: "02",
    label: "intent taxonomy",
    title: "Turn recurring motivations into a usable vocabulary.",
    body:
      "Organize recurring signals across mood, attention level, relationship dynamics, tone, familiarity, time, and social context without overwhelming the viewer.",
  },
  {
    number: "03",
    label: "pre-watch MVP",
    title: "Prototype the moment of indecision.",
    body:
      "Test an optional Help Me Choose flow where viewers select up to three signals, receive an explainable result set, and refine without restarting.",
  },
  {
    number: "04",
    label: "learning loop",
    title: "Connect discovery with lightweight feedback.",
    body:
      "Explore whether post-watch clarification improves future relevance, while keeping occasion-level intent temporary unless a viewer chooses to save it.",
  },
];

const intentExamples = [
  "chosen family",
  "background viewing",
  "dark comedy",
  "something comforting",
  "short on time",
  "something new",
];

const designPrinciples = [
  {
    title: "Optional",
    body: "A Help Me Choose mode supports moments of indecision without interrupting viewers who already know what they want.",
  },
  {
    title: "Low effort",
    body: "Viewers select only a few signals, with the ability to skip, remove, or refine without restarting.",
  },
  {
    title: "Compositional",
    body: "Mood, viewing mode, narrative qualities, time, and social context can be combined for the current occasion.",
  },
  {
    title: "Explainable",
    body: "Each result shows which selected qualities it matches, making the recommendation easier to evaluate and correct.",
  },
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
                Recommendation systems can learn what a viewer generally enjoys. Intent Layer asks a more situational question: what does that viewer want from this particular viewing occasion?
              </p>

              <p className="mt-4 max-w-3xl text-[0.95rem] leading-8 text-[#5e5048]">
                I developed the concept through an independent exploratory study of streaming behavior. Early findings suggest that existing recommendations remain useful, but often miss mood, attention level, social context, and the specific quality a viewer wants to experience next. Intent Layer explores how optional pre-watch signals could close that gap.
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
              research snapshot
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
              living product deck
            </div>

            <div className="reveal-item" data-delay={80}>
              <div
                className="overflow-hidden rounded-[28px] border border-black/8 shadow-[0_24px_70px_rgba(68,44,29,0.08)]"
                style={{ aspectRatio: "16/9", width: "100%" }}
              >
                <iframe
                  style={{
                    border: "none",
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                  src="https://embed.figma.com/slides/BGXG6RXj7t1dLyxUbmLhve/Intent-Layer?node-id=32-493&embed-host=share"
                  allowFullScreen
                  title="Intent Layer — Product Strategy Case Study"
                />
              </div>

              <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                evolving case study · research complete · prototype in development
              </p>
            </div>

            {/* RESEARCH METHOD */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              exploratory research
            </div>

            <section className="reveal-item rounded-[30px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10" data-delay={80}>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    method · august 2026
                  </p>
                  <h2 className="mt-3 font-serif text-[1.65rem] font-semibold leading-tight text-[#1f1a18]">
                    Directional evidence from real viewing occasions.
                  </h2>
                </div>

                <div>
                  <p className="text-[0.92rem] leading-7 text-[#5e5048]">
                    I designed and distributed an anonymous survey examining viewing intent, discovery behavior, and perceptions of platform recommendations. The study received 54 starts, including 44 eligible recent streaming viewers. Twenty-seven responses were formally submitted, while valid partial responses were retained at the question level.
                  </p>
                  <p className="mt-4 text-[0.82rem] leading-7 text-[#7c7068]">
                    Question-level sample sizes range from 24–43. Of respondents who reported age, 96% were 18–24; findings are therefore exploratory and primarily reflect Gen Z viewing behavior. Follow-up interviews are the next research phase.
                  </p>
                </div>
              </div>
            </section>

            {/* RESEARCH FINDINGS */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              what the survey surfaced
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {researchFindings.map((finding, index) => (
                <section key={finding.title} className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_16px_45px_rgba(68,44,29,0.05)]" data-delay={index * 60}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-serif text-[2.15rem] font-semibold leading-none text-[#1f1a18]">
                      {finding.value}
                    </p>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#a89d96]">
                      {finding.sample}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[0.74rem] font-semibold uppercase tracking-[0.19em] text-[#6c5e56]">
                    {finding.title}
                  </h3>
                  <p className="mt-3 text-[0.86rem] leading-7 text-[#5e5048]">
                    {finding.body}
                  </p>
                </section>
              ))}
            </div>

            {/* QUALITATIVE SIGNALS */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              what the numbers looked like in practice
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {qualitativeSignals.map((signal, index) => (
                <section key={signal.title} className="reveal-item rounded-[26px] border border-black/5 bg-[#fffaf6] p-6" data-delay={index * 70}>
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#a89d96]">
                    anonymized response · 0{index + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">
                    {signal.title}
                  </h3>
                  <p className="mt-3 text-[0.86rem] leading-7 text-[#5e5048]">
                    {signal.body}
                  </p>
                </section>
              ))}
            </div>

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
                Similarity asks what resembles the last title.
                <span className="text-[#8a7d75]"> Intent asks what fits what the viewer wants right now.</span>
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
                    Capture what matters for this viewing occasion.
                  </h2>

                  <p className="mt-5 max-w-xl text-[0.92rem] leading-7 text-[#5e5048]">
                    The proposed system combines two moments: an optional pre-watch experience that captures what fits now, and lightweight post-watch learning that clarifies what specifically worked. Intent supplements existing behavioral and content signals rather than replacing them.
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

            {/* PROTOTYPE STATUS */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              prototype in development
            </div>

            <section className="reveal-item overflow-hidden rounded-[30px] border border-[#d8c9bd] bg-gradient-to-br from-[#fffaf6] via-white/75 to-[#f4e9e0] shadow-[0_24px_70px_rgba(68,44,29,0.07)]" data-delay={100}>
              <div className="grid gap-8 p-7 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.26em] text-[#9a877a]">
                    current build · pre-watch discovery
                  </p>
                  <h2 className="mt-3 font-serif text-[1.7rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2rem]">
                    Designing for the moment of indecision.
                  </h2>
                  <p className="mt-5 text-[0.92rem] leading-7 text-[#5e5048]">
                    I am translating the research into an optional pre-watch flow: enter through Help Me Choose, select a small set of occasion and story signals, then receive a narrower result set that explains why each title fits.
                  </p>
                  <p className="mt-4 text-[0.78rem] uppercase tracking-[0.18em] text-[#8a7d75]">
                    Next: interviews · taxonomy refinement · Figma prototype · usability testing
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {designPrinciples.map((principle) => (
                    <div key={principle.title} className="rounded-[22px] border border-black/5 bg-white/70 p-5">
                      <h3 className="font-serif text-[1.08rem] font-semibold text-[#1f1a18]">
                        {principle.title}
                      </h3>
                      <p className="mt-2 text-[0.82rem] leading-6 text-[#5e5048]">
                        {principle.body}
                      </p>
                    </div>
                  ))}
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
                Watch history explains the past.
                <span className="text-[#8a7d75]"> Intent can shape what comes next.</span>
              </p>

              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                Intent Layer began as a question about why technically similar recommendations can still feel wrong. Research reframed that question around context: the opportunity is not to add more recommendation noise, but to let viewers supply a small amount of information that the platform cannot reliably infer on its own.
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