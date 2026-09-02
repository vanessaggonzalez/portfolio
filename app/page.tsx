/*
PENDING IDEAS

- refine grain opacity
- delayed collage reveal ✅
- cursor glow effect ✅
- imported typography refinements
- hover tilt interactions ✅
- project detail pages
- cinematic transitions
- now playing widget ✅
- scroll parallax ✅
- marquee ticker strip ✅
- magnetic buttons ✅
*/

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Signature from "@/components/Signature";
import NowPlaying from "@/components/NowPlaying";
import MarqueeTicker from "@/components/MarqueeTicker";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { useCursorGlow } from "@/hooks/useCursorGlow";

// ─── Staggered reveal: fires when each card scrolls into view ─────────────────
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Scroll parallax: offset is relative to each card's own start position ───
function useParallax() {
  useEffect(() => {
    const speeds: Record<string, number> = {
      portrait: 0.018,
      magazine: 0.026,
      lace: 0.032,
      "second-photo": 0.022,
    };

    let cards: { el: HTMLElement; speed: number; center: number }[] = [];
    let ticking = false;

    const measure = () => {
      const scrollY = window.scrollY;
      cards = Array.from(
        document.querySelectorAll<HTMLElement>(".collage-card[data-parallax]")
      ).flatMap((el) => {
        const key = el.dataset.parallax ?? "";
        const speed = speeds[key];
        if (!speed) {
          el.style.removeProperty("transform");
          return [];
        }
        const rect = el.getBoundingClientRect();
        const center = rect.top + scrollY + rect.height / 2;
        return [{ el, speed, center }];
      });
    };

    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportCenter = scrollY + window.innerHeight / 2;
        for (const { el, speed, center } of cards) {
          const rawOffset = (viewportCenter - center) * speed;
          const offset = Math.max(-14, Math.min(14, rawOffset));
          el.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);
}

// ─── Album art fetch via iTunes Search API (no key required) ─────────────────
type ObsessedItem = { label: string; sub: string };
type ObsessedWithArt = ObsessedItem & { art: string };

function useAlbumArt(items: ObsessedItem[]) {
  const [withArt, setWithArt] = useState<ObsessedWithArt[]>(
    items.map((item) => ({ ...item, art: "" }))
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      const results = await Promise.all(
        items.map(async (item) => {
          try {
            const term = encodeURIComponent(`${item.label} ${item.sub}`);
            const res = await fetch(
              `https://itunes.apple.com/search?term=${term}&media=music&limit=1`
            );
            const data = await res.json();
            const artworkUrl = data?.results?.[0]?.artworkUrl100 ?? "";
            const art = artworkUrl ? artworkUrl.replace("100x100", "300x300") : "";
            return { ...item, art };
          } catch {
            return { ...item, art: "" };
          }
        })
      );
      if (!cancelled) setWithArt(results);
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [items]);

  return withArt;
}

export default function Home() {
  useReveal();
  useParallax();
  useMagneticButton();
  useCursorGlow();

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

  const currentThreads = [
    "fandom + audience psychology",
    "product strategy + user friction",
    "visual culture + interface taste",
  ];

  const inspirationItems = [
    "lana del rey's visual world",
    "selena gomez's revival era",
    "editorial perfume campaigns",
    "lace + textile details",
    "baz luhrmann's color palette",
    "beautiful interfaces",
  ];

  const obsessedWith = useMemo<ObsessedItem[]>(() => [
    { label: "cry baby",        sub: "the neighbourhood" },
    { label: "robbers",         sub: "the 1975" },
    { label: "hometown",        sub: "twenty one pilots" },
    { label: "perfect",         sub: "selena gomez" },
    { label: "ultraviolence",   sub: "lana del rey" },
    { label: "a world alone",   sub: "lorde" },
    { label: "sometimes",       sub: "ariana grande" },
    { label: "call it what you want", sub: "taylor swift" },
  ], []);

  const tools = [
    "after effects",
    "figma",
    "photoshop",
    "media encoder",
    "intellij",
    "next.js",
    "react",
    "notion",
  ];

  const fragments = [
    "ship edits",
    "editorial moodboards",
    "late-night editing",
    "storytelling + taste",
    "fandom archives",
    "lace + collage",
    "adobe after effects",
  ];

  const obsessedWithArt = useAlbumArt(obsessedWith);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 grain-overlay"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]"
      />

      <div className="relative z-10">
        <section className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto min-h-[92vh] max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-end gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-[#201c1a]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </header>

            {/* HERO */}
            <div className="mt-8 lg:mt-10">
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#7c7068]">
                saved fragments / elevated / cinematic
              </p>

              <div className="relative mx-auto flex max-w-[1100px] justify-center">
                {/* BLACK + PINK POLKA DOT TEXTURE */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[48px]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, #201c1a 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                      opacity: 0.97,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, #e8a0b0 1.5px, transparent 1.5px)`,
                      backgroundSize: "32px 32px",
                      backgroundPosition: "16px 16px",
                      opacity: 0.98,
                    }}
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[680px] rounded-full bg-white/85 blur-[80px]" />
                </div>

                {/* SIGNATURE */}
                <div className="relative z-10 w-full max-w-[860px]">
                  <span className="sr-only">Vanessa Gonzalez</span>
                  <Signature aria-hidden="true" />
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-2xl text-center">
                <p className="text-[1.02rem] leading-8 text-[#433833] sm:text-[1.12rem]">
                  Computer Science + Business Administration senior at USC and Adobe Student
                  Ambassador. LA native building at the intersection of product strategy, user
                  discovery, and creative technology.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href="#work"
                    className="magnetic-btn rounded-full border border-[#201c1a] bg-[#201c1a] px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    View Selected Work
                  </a>
                  <a
                    href="#about"
                    className="magnetic-btn rounded-full border border-[#201c1a]/20 bg-white/70 px-6 py-3 text-sm text-[#201c1a] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    About Me
                  </a>
                </div>
              </div>

              {/* NOW PLAYING */}
              <div className="mx-auto mt-6 flex max-w-xs justify-center">
                <NowPlaying />
              </div>

              {/* CURATED SCRAPBOOK — a compact, clickable visual index */}
              <div className="reveal-item relative mx-auto mt-12 max-w-[1120px] lg:mt-14" data-delay={80}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                    <span className="h-px w-8 bg-[#c8bdb2]" />
                    a few things I keep returning to
                  </div>
                  <span className="hidden font-serif text-[0.78rem] italic text-[#a89d96] sm:block">click a fragment to wander ↘</span>
                </div>

                <div className="scrapbook-grid relative grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[210px_210px_170px] lg:gap-4">
                  <a href="/about" className="group relative min-h-[390px] overflow-hidden rounded-[30px] border border-black/5 shadow-[0_20px_55px_rgba(68,44,29,.09)] sm:col-span-1 lg:col-span-4 lg:row-span-3 lg:min-h-0">
                    <Image src="/images/VanessaG.jpg" alt="Vanessa Gonzalez" fill priority sizes="(max-width: 1024px) 50vw, 32vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div aria-hidden="true" className="absolute left-1/2 top-[-8px] h-8 w-24 -translate-x-1/2 -rotate-2 bg-[#e7d6c8]/80 shadow-sm" />
                    <div className="absolute bottom-5 left-5 text-white"><p className="font-serif text-xl italic">vanessa, lately</p><p className="mt-1 text-[0.52rem] uppercase tracking-[0.2em] text-white/65">open the personal archive →</p></div>
                  </a>

                  <a href="/about" className="group relative min-h-[250px] overflow-hidden rounded-[27px] border border-black/5 shadow-[0_18px_48px_rgba(68,44,29,.08)] sm:col-span-1 lg:col-span-4 lg:min-h-0 lg:-rotate-[1deg]">
                    <Image src="/images/ariana-audrey.jpg" alt="Ariana Grande and Audrey Hepburn editorial inspiration" fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-4 pt-12"><p className="text-[0.52rem] uppercase tracking-[0.2em] text-white/80">visual culture / old icons, new language</p></div>
                  </a>

                  <a href="/work" className="relative flex min-h-[250px] flex-col justify-between rounded-[27px] border border-black/5 bg-[#fffdf9] p-6 shadow-[0_18px_48px_rgba(68,44,29,.07)] sm:col-span-2 lg:col-span-4 lg:min-h-0 lg:rotate-[.7deg]">
                    <div aria-hidden="true" className="absolute right-7 top-[-9px] h-7 w-20 rotate-3 bg-[#e5d2c2]/75 shadow-sm" />
                    <div><p className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">a little field note</p><p className="mt-4 font-serif text-[1.35rem] leading-7 text-[#342d29]">I like turning messy systems into experiences that feel clean, intentional, and obvious.</p></div>
                    <p className="mt-5 text-[0.54rem] uppercase tracking-[0.2em] text-[#8d796c]">see how I think →</p>
                  </a>

                  <a href="/about" className="group relative min-h-[230px] overflow-hidden rounded-[27px] border border-black/5 shadow-[0_18px_48px_rgba(68,44,29,.08)] sm:col-span-1 lg:col-span-3 lg:min-h-0 lg:-rotate-[.8deg]">
                    <Image src="/images/lace.jpg" alt="Lace textile detail" fill sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-[#6d5545]/5" />
                    <p className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1.5 text-[0.48rem] uppercase tracking-[0.18em] text-[#75665e] backdrop-blur-sm">texture matters</p>
                  </a>

                  <a href="/about" className="relative flex min-h-[230px] flex-col justify-center rounded-[27px] border border-black/5 bg-[#f5ebe5] p-6 shadow-[0_18px_48px_rgba(68,44,29,.06)] sm:col-span-1 lg:col-span-5 lg:min-h-0">
                    <p className="font-serif text-[1.45rem] italic leading-8 text-[#342d29]">“collecting moments, tattoos on my mind”</p>
                    <p className="mt-4 text-[0.54rem] uppercase tracking-[0.22em] text-[#a18779]">Ariana Grande · Sometimes</p>
                    <span aria-hidden="true" className="absolute right-6 top-5 text-[#d5b9ad]">✦</span>
                  </a>

                  <a href="/about" className="group relative min-h-[250px] overflow-hidden rounded-[27px] border border-black/5 shadow-[0_18px_48px_rgba(68,44,29,.08)] sm:col-span-1 lg:col-span-4 lg:min-h-0 lg:rotate-[1deg]">
                    <Image src="/images/vanessa2.jpg" alt="Vanessa at the Huntington" fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-4 text-[0.5rem] uppercase tracking-[0.2em] text-white/80">Los Angeles / saved afternoon</p>
                  </a>

                  <a href="/about" className="relative min-h-[250px] rounded-[27px] border border-black/5 bg-white/80 p-6 shadow-[0_18px_48px_rgba(68,44,29,.06)] sm:col-span-1 lg:col-span-4 lg:min-h-0">
                    <p className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">current threads</p>
                    <div className="mt-5 space-y-3 font-serif text-[1rem] text-[#342d29]"><p>fandom + audience psychology</p><p>product strategy + user friction</p><p>visual culture + interface taste</p></div>
                    <p className="absolute bottom-5 right-5 text-[0.5rem] uppercase tracking-[0.18em] text-[#aa9588]">more about me →</p>
                  </a>
                </div>
              </div>

              <div className="mt-7 px-1">
                <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                  <span className="h-px w-8 bg-[#c8bdb2]" />
                  selected fragments
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5 text-sm text-[#5f554f]">
                  {fragments.map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-full border border-black/10 bg-[#fffaf6]/85 px-4 py-2 tracking-[0.04em] shadow-[0_7px_18px_rgba(68,44,29,.045)] backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-md ${
                        index % 3 === 0
                          ? "-rotate-1"
                          : index % 3 === 1
                            ? "rotate-1"
                            : "rotate-0"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* COLLAGE — MOBILE / TABLET */}
              <div className="hidden mt-10 grid-cols-2 gap-3 sm:gap-4">
                <div
                  className="collage-card reveal-item col-span-2 sm:col-span-1 group h-[340px] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_50px_rgba(45,29,18,0.08)] transition-shadow duration-300"
                  data-parallax="portrait" data-delay={0}
                >
                  <Image src="/images/VanessaG.jpg" alt="Vanessa Gonzalez" fill priority sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top" />
                </div>

                <div
                  className="collage-card reveal-item col-span-2 sm:col-span-1 rounded-[24px] border border-black/5 bg-white/80 p-5 shadow-[0_14px_40px_rgba(68,44,29,0.06)] backdrop-blur-sm"
                  data-parallax="note-card" data-delay={80}
                >
                  <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">a little note</p>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#342d29]">I like taking messy problems—whether it's legacy mainframe documentation or Gen Z audio sharing—and designing interfaces and strategies that feel clean, intentional, and obvious.</p>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#8a7d75]">anqclic / creative archive</p>
                </div>

                <div
                  className="collage-card reveal-item group h-[200px] overflow-hidden rounded-[24px] border border-[#201c1a]/6 shadow-[0_14px_40px_rgba(45,29,18,0.08)] transition-shadow duration-300"
                  data-parallax="magazine" data-delay={120}
                >
                  <Image src="/images/ariana-audrey.jpg" alt="Ariana and Audrey inspiration" fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item group h-[200px] overflow-hidden rounded-[24px] border border-[#201c1a]/6 shadow-[0_14px_40px_rgba(45,29,18,0.08)] transition-shadow duration-300"
                  data-parallax="lace" data-delay={160}
                >
                  <Image src="/images/lace.jpg" alt="Lace detail" fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item col-span-2 rounded-[24px] border border-black/5 bg-white/80 px-6 py-5 shadow-[0_14px_40px_rgba(68,44,29,0.06)] backdrop-blur-sm"
                  data-parallax="quote-card" data-delay={200}
                >
                  <p className="font-serif font-semibold text-[1.25rem] italic leading-8 text-[#342d29]">"collecting moments, tattoos on my mind"</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">ariana grande — sometimes</p>
                </div>

                <div
                  className="collage-card reveal-item col-span-2 group h-[220px] overflow-hidden rounded-[24px] border border-[#201c1a]/6 shadow-[0_14px_40px_rgba(45,29,18,0.08)] transition-shadow duration-300"
                  data-parallax="second-photo" data-delay={240}
                >
                  <Image src="/images/vanessa2.jpg" alt="Vanessa at the Huntington" fill sizes="100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item rounded-[24px] border border-black/5 bg-white/75 p-4 shadow-[0_14px_40px_rgba(68,44,29,0.05)] backdrop-blur-sm"
                  data-parallax="tools-card" data-delay={280}
                >
                  <p className="font-serif font-semibold text-xs uppercase tracking-[0.24em] text-[#7c7068]">always open</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#5f554f]">{tool}</span>
                    ))}
                  </div>
                </div>

                <div
                  className="collage-card reveal-item rounded-[24px] border border-black/5 bg-white/82 p-4 shadow-[0_14px_40px_rgba(68,44,29,0.05)] backdrop-blur-sm"
                  data-parallax="inspire-card" data-delay={300}
                >
                  <p className="font-serif font-semibold text-xs uppercase tracking-[0.24em] text-[#7c7068]">currently inspiring me</p>
                  <div className="mt-3 grid gap-1.5 text-[0.82rem] leading-5 text-[#342d29]">
                    {inspirationItems.map((item) => <p key={item}>• {item}</p>)}
                  </div>
                </div>

                <div
                  className="collage-card reveal-item col-span-2 rounded-[24px] border border-black/5 bg-white/75 p-5 shadow-[0_14px_40px_rgba(68,44,29,0.05)]"
                  data-parallax="threads" data-delay={320}
                >
                  <p className="font-serif font-semibold text-xs uppercase tracking-[0.24em] text-[#7c7068]">current threads</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentThreads.map((item) => (
                      <span key={item} className="rounded-full border border-black/5 bg-[#fffaf6] px-4 py-2 text-sm text-[#1f1a18]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* COLLAGE — DESKTOP */}
              <div className="relative mt-[4.5rem] !hidden" style={{ minHeight: "1000px" }}>
                {/* LEFT COLUMN */}
                <div
                  className="collage-card reveal-item group absolute overflow-hidden rounded-[36px] border border-[#201c1a]/6 shadow-[0_22px_65px_rgba(45,29,18,0.08)] transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(45,29,18,0.14)] animate-floatSlow"
                  style={{ left: "0%", top: "0px", width: "32%", height: "620px" }}
                  data-parallax="portrait" data-delay={0}
                >
                  <Image src="/images/VanessaG.jpg" alt="Vanessa Gonzalez" fill priority sizes="32vw" className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item absolute rounded-[26px] border border-black/5 bg-white/80 px-7 py-6 shadow-[0_18px_50px_rgba(68,44,29,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(68,44,29,0.09)] rotate-[-1.5deg]"
                  style={{ left: "1%", top: "648px", width: "31%" }}
                  data-parallax="quote-card" data-delay={60}
                >
                  <p className="font-serif font-semibold text-[1.45rem] italic leading-8 text-[#342d29]">"collecting moments, tattoos on my mind"</p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">ariana grande — sometimes</p>
                </div>

                <div
                  className="collage-card reveal-item absolute rounded-[26px] border border-black/5 bg-white/75 p-5 shadow-[0_18px_45px_rgba(68,44,29,0.05)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)] rotate-[0.5deg]"
                  style={{ left: "1%", top: "840px", width: "31%" }}
                  data-parallax="tools-card" data-delay={120}
                >
                  <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">always open</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#5f554f] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* CENTRE COLUMN */}
                <div
                  className="collage-card reveal-item group absolute overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium"
                  style={{ left: "34%", top: "40px", width: "24%", height: "320px", rotate: "6deg" }}
                  data-parallax="magazine" data-delay={80}
                >
                  <Image src="/images/ariana-audrey.jpg" alt="Ariana and Audrey inspiration" fill sizes="24vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item group absolute overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatSlow"
                  style={{ left: "36%", top: "400px", width: "22%", height: "250px", rotate: "-5deg" }}
                  data-parallax="lace" data-delay={160}
                >
                  <Image src="/images/lace.jpg" alt="Lace detail" fill sizes="22vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item absolute rounded-full border border-black/5 bg-white/80 px-4 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-[#7c7068] shadow-[0_10px_26px_rgba(68,44,29,0.05)]"
                  style={{ left: "36%", top: "678px" }}
                  data-parallax="fragments-tag" data-delay={280}
                >
                  saved fragments
                </div>

                <div
                  className="collage-card reveal-item absolute rounded-[30px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]"
                  style={{ left: "34%", top: "720px", width: "27%" }}
                  data-parallax="threads" data-delay={340}
                >
                  <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">current threads</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentThreads.map((item) => (
                      <span key={item} className="rounded-full border border-black/5 bg-[#fffaf6] px-4 py-2 text-sm text-[#1f1a18] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md">{item}</span>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div
                  className="collage-card reveal-item absolute rounded-[30px] border border-black/5 bg-white/78 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]"
                  style={{ right: "0%", top: "0px", width: "37%" }}
                  data-parallax="note-card" data-delay={100}
                >
                  <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">a little note</p>
                  <p className="mt-4 text-[1.03rem] leading-8 text-[#342d29] sm:text-[1.08rem]">I like taking messy problems—whether it's legacy mainframe documentation or Gen Z audio sharing—and designing interfaces and strategies that feel clean, intentional, and obvious.</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#8a7d75]">anqclic / creative archive</p>
                </div>

                <div
                  className="collage-card reveal-item group absolute overflow-hidden rounded-[30px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium"
                  style={{ right: "4%", top: "230px", width: "30%", height: "300px", rotate: "3deg" }}
                  data-parallax="second-photo" data-delay={200}
                >
                  <Image src="/images/vanessa2.jpg" alt="Vanessa at the Huntington" fill sizes="30vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                </div>

                <div
                  className="collage-card reveal-item absolute rounded-[26px] border border-black/5 bg-white/82 p-7 shadow-[0_18px_45px_rgba(68,44,29,0.05)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)] rotate-[1.5deg]"
                  style={{ right: "0%", top: "570px", width: "37%" }}
                  data-parallax="inspire-card" data-delay={280}
                >
                  <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">currently inspiring me</p>
                  <div className="mt-5 grid gap-3 text-sm leading-6 text-[#342d29]">
                    {inspirationItems.map((item) => <p key={item}>• {item}</p>)}
                  </div>
                </div>
              </div>
            </div>

            {/* CURRENTLY OBSESSED WITH */}
            <div className="reveal-item mt-8 lg:mt-10" data-delay={320}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    <span className="h-px w-8 bg-[#c8bdb2]" />
                    currently obsessed with
                  </div>
                  <p className="mt-2 font-serif text-[1.45rem] italic text-[#342d29]">soundtrack to the archive</p>
                </div>
                <p className="-rotate-1 font-serif text-[0.74rem] italic text-[#9a8c84]">yes, the same songs stay here forever ♡</p>
              </div>
              <div className="mt-6 grid grid-cols-4 items-start gap-3 sm:grid-cols-8">
                {obsessedWithArt.map((item, index) => (
                  <div
                    key={item.label}
                    className={`album-tile group flex flex-col gap-1.5 transition-transform duration-500 ease-out ${
                      index % 4 === 0
                        ? "sm:translate-y-2 sm:-rotate-1"
                        : index % 4 === 1
                          ? "sm:-translate-y-1 sm:rotate-[0.8deg]"
                          : index % 4 === 2
                            ? "sm:translate-y-3 sm:rotate-[1.2deg]"
                            : "sm:translate-y-0 sm:-rotate-[0.6deg]"
                    } hover:z-10 hover:!-translate-y-3 hover:!rotate-0`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-[14px] border border-black/5 bg-[#ede5dc] shadow-[0_10px_26px_rgba(68,44,29,0.06)] transition-all duration-500 ease-out group-hover:scale-[1.045] group-hover:shadow-[0_20px_44px_rgba(68,44,29,0.16)]">
                      {item.art && (
                        <Image
                          src={item.art}
                          alt={`${item.label} by ${item.sub}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-black/35 text-[0.55rem] text-white/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[0.7rem] leading-tight text-[#342d29]">{item.label}</span>
                    <span className="text-[0.58rem] uppercase tracking-[0.14em] text-[#a89d96]">{item.sub}</span>
                  </div>
                ))}
              </div>

              <div aria-hidden="true" className="mt-7 flex items-center gap-3 px-1">
                <span className="text-[0.46rem] uppercase tracking-[0.18em] text-[#b8aaa1]">side a</span>
                <div className="relative h-px flex-1 bg-[#d9cec7]">
                  <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#8c776b] shadow-[0_0_0_4px_rgba(140,119,107,.08)]" />
                  {["12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%"].map((left) => <span key={left} className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-[#c8bdb2]" style={{ left }} />)}
                </div>
                <span className="text-[0.46rem] uppercase tracking-[0.18em] text-[#b8aaa1]">08 tracks</span>
              </div>
            </div>

          </div>
        </section>

        {/* WORK SECTION */}
        <section
          id="work"
          className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              selected work
            </div>

            <a
              href="/work"
              className="group flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96] transition hover:text-[#201c1a]"
            >
              all work
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="space-y-4">
            {/* AUDIBLE */}
            <a
              href="/work/audible"
              className="reveal-item group block"
              data-delay={0}
            >
              <article className="overflow-hidden rounded-[34px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_85px_rgba(68,44,29,0.10)] lg:grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative h-[300px] overflow-hidden border-b border-black/5 lg:h-auto lg:min-h-[520px] lg:border-b-0 lg:border-r">
                  <Image
                    src="/images/clip-and-share.png"
                    alt="Audible Clip and Share case study"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/75">
                      01 · featured case study
                    </p>
                    <h3 className="mt-2 font-serif text-[1.65rem] font-semibold text-white">
                      Audible — Clip & Share
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 lg:p-10">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                    Product Strategy Lead
                  </p>

                  <p className="mt-4 max-w-2xl text-[0.97rem] leading-8 text-[#4d413b]">
                    Led product strategy for a 5-person team tackling Audible's Gen Z growth challenge. Designed "Clip & Share"—a low-friction loop letting users pull audiobook moments directly to TikTok or Instagram without cluttering Audible's core app. Defined our proposed North Star metric (Share-to-Play Conversion Rate) and rethought the free-trial onboarding flow around a full first chapter instead of a locked preview.
                  </p>

                  <p className="mt-5 text-[0.76rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    ✦ First-place winning concept · Amazon-sponsored product case competition
                  </p>

                  <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-[20px] border border-black/5 bg-[#fffaf6] sm:grid-cols-4">
                    {[
                      ["01", "friction", "Gen Z discovery"],
                      ["02", "product loop", "Clip & Share"],
                      ["03", "north star", "Share-to-Play"],
                      ["04", "result", "First place"],
                    ].map(([num, label, value], index) => (
                      <div
                        key={label}
                        className={`p-4 ${index > 0 ? "sm:border-l sm:border-black/5" : ""} ${index > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}
                      >
                        <p className="font-serif text-sm text-[#c69aa5]">{num}</p>
                        <p className="mt-2 text-[0.56rem] uppercase tracking-[0.18em] text-[#a89d96]">{label}</p>
                        <p className="mt-1 text-[0.76rem] leading-5 text-[#342d29]">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "feature strategy",
                      "growth loops",
                      "user discovery",
                      "onboarding redesign",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition group-hover:text-[#7c7068]">
                    view case study →
                  </p>
                </div>
              </article>
            </a>

            {/* SUPPORTING PROJECTS */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* BOFA */}
              <a
                href="/work/bofa"
                className="reveal-item group block"
                data-delay={100}
              >
                <article className="relative h-full overflow-hidden rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.09)]">
                  <span className="absolute right-6 top-5 select-none font-serif text-[2.5rem] font-semibold leading-none text-[#e8ddd6]">
                    02
                  </span>

                  <p className="pr-12 text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                    Business Analyst Intern — AI Strategy & Discovery
                  </p>

                  <h3 className="mt-3 pr-12 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                    Bank of America — Global Technology
                  </h3>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#4d413b]">
                    Documented a 600+ file COBOL mainframe system with no real active docs beyond a 2010 slide deck, then built an AI agent to explain it file by file—now being generalized across teams. Interviewed 15 Business Analysts to pinpoint where existing AI tools failed, leading to Mosaic, a context-aware AI platform submitted for internal patent review.
                  </p>

                  <div className="mt-5 rounded-[18px] border border-black/5 bg-[#fffaf6] p-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="font-serif text-[1.15rem] font-semibold text-[#1f1a18]">
                          600+
                        </p>
                        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#a89d96]">
                          files analyzed
                        </p>
                      </div>

                      <div className="border-x border-black/5">
                        <p className="font-serif text-[1.15rem] font-semibold text-[#1f1a18]">
                          15
                        </p>
                        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#a89d96]">
                          BA interviews
                        </p>
                      </div>

                      <div>
                        <p className="font-serif text-[1.15rem] font-semibold text-[#1f1a18]">
                          01
                        </p>
                        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#a89d96]">
                          internal review
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                    ✦ Corporate Technology Return Offer Received
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "AI agents",
                      "product discovery",
                      "user research",
                      "legacy systems",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition group-hover:text-[#7c7068]">
                    explore the work →
                  </p>
                </article>
              </a>

              {/* INTENT LAYER */}
              <a
                href="/work/intent-layer"
                className="reveal-item group block"
                data-delay={200}
              >
                <article className="relative h-full overflow-hidden rounded-[30px] border border-black/5 bg-white/62 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.045)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
                  <span className="absolute right-6 top-5 select-none font-serif text-[2.5rem] font-semibold leading-none text-[#ede5df]">
                    03
                  </span>

                  <p className="pr-12 text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                    Independent Product Research
                  </p>

                  <h3 className="mt-3 pr-12 font-serif text-[1.3rem] font-semibold leading-snug text-[#1f1a18]">
                    Intent Layer
                  </h3>

                  <p className="mt-4 text-[0.9rem] leading-7 text-[#4d413b]">
                    Exploring what streaming recommendations miss: why a viewer connected with a title. Currently gathering survey and interview data to build an intent taxonomy, post-watch capture experience, and intent-informed recommendation framework.
                  </p>

                  <p className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-[#a89d96]">
                    ✦ Original consumer research · Framework and prototype in progress
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "streaming strategy",
                      "consumer research",
                      "personalization",
                      "audience insights",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition group-hover:text-[#7c7068]">
                    explore the research →
                  </p>
                </article>
              </a>
            </div>
          </div>
        </section>

        <MarqueeTicker />

        {/* ABOUT SECTION */}
        <section id="about" className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[36px] border border-black/5 bg-white/55 p-5 shadow-[0_24px_80px_rgba(68,44,29,0.05)] sm:p-8 lg:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#e8a0b0]/10 blur-[80px]" />
            <div className="relative mb-8 grid gap-6 border-b border-black/5 pb-8 lg:grid-cols-[0.35fr_1.65fr] lg:items-start">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#9a8c84]">
                about / approach
              </p>
              <h2 className="max-w-4xl font-serif text-[2rem] font-semibold leading-[1.12] text-[#1f1a18] sm:text-[2.8rem] lg:text-[3.4rem]">
                I turn messy systems and human behavior into products that feel
                <span className="italic text-[#a66f7c]"> intuitive, personal, and intentional.</span>
              </h2>
            </div>

            <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div
              className="reveal-item p-2 sm:p-4"
              data-delay={0}
            >
              <p className="max-w-2xl text-lg leading-8 text-[#342d29] sm:text-xl sm:leading-9">
                USC senior combining technical depth in CS with business strategy and a creative background in digital media.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1">USC CS + Business</span>
                <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1">Bank of America Return Offer</span>
                <span className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1">Product & GTM Strategy</span>
              </div>

              <div className="mt-7 max-w-2xl space-y-4 text-[0.96rem] leading-8 text-[#4d413b]">
                <p>
                  I've been editing video since I was 10 years old, growing an independent account to 630K+ views by paying attention to pacing, audience drop-off, and visual trends. That early interest in human behavior eventually led me to study Computer Science and Business Administration at USC.
                </p>
                <p>
                  In corporate environments like Bank of America, I focus on user discovery and systems design—translating user research from 15 Business Analysts into multi-agent AI tooling and modernizing 600+ complex legacy mainframe files.
                </p>
                <p>
                  Whether I'm mapping product wireframes, evaluating GTM loops, or refining a visual interface, I bring the same mix of curiosity, structure, and visual instinct.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div
                id="resume"
                className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6]/85 p-7 shadow-[0_14px_40px_rgba(68,44,29,0.04)]"
                data-delay={80}
              >
                <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  what I bring
                </p>
                <div className="mt-5 grid gap-2">
                  {[
                    ["01", "Product strategy", "Discovery · research · wireframing"],
                    ["02", "Technical fluency", "CS · Next.js · React · Java"],
                    ["03", "Audience instinct", "Behavior · drop-off · retention"],
                    ["04", "Enterprise delivery", "AI workflows · cross-functional alignment"],
                    ["05", "Visual storytelling", "After Effects · Figma · editorial systems"],
                  ].map(([num, title, detail]) => (
                    <div key={num} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-black/5 py-3 first:border-t-0">
                      <span className="font-serif text-sm text-[#c69aa5]">{num}</span>
                      <div>
                        <p className="text-sm text-[#342d29]">{title}</p>
                        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-[#a89d96]">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                id="contact"
                className="reveal-item relative overflow-hidden rounded-[28px] border border-[#e8a0b0]/20 bg-gradient-to-br from-[#f8e8ec] via-[#fff8fa] to-white/80 p-7 shadow-[0_14px_40px_rgba(68,44,29,0.05)]"
                data-delay={160}
              >
                <p className="font-serif font-semibold text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  target direction
                </p>
                <p className="mt-4 text-sm leading-7 text-[#4d413b]">
                  Seeking permanent roles in Los Angeles across Product Strategy, Product Operations, GTM Analysis, Product Marketing (PMM), or Creative Tech Analytics.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="mailto:vcnessaggonzalez@gmail.com"
                    className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
                  >
                    <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                    vcnessaggonzalez@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/vanessa-g-gonzalez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
                  >
                    <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                    linkedin.com/in/vanessa-g-gonzalez
                  </a>
                </div>
                <div className="mt-7 flex items-end justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8a7d75]">anqclic / creative archive</p>
                  <span className="font-serif text-3xl italic text-[#c996a2]">VG</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between border-t border-black/5 pt-6 text-[0.68rem] uppercase tracking-[0.3em] text-[#a89d96]">
            <span>Vanessa Gonzalez</span>
            <span>anqclic / creative archive</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>

        <style>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes floatMedium {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-16px); }
          }

          @keyframes drawStroke {
            to { stroke-dashoffset: 0; }
          }

          .animate-floatSlow { animation: floatSlow 8s ease-in-out infinite; }
          .animate-floatMedium { animation: floatMedium 10s ease-in-out infinite; }

          /* Staggered reveal */
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

          /* Parallax */
          .collage-card {
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .collage-card { will-change: auto; }
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
