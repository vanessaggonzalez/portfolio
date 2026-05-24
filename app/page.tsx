/*
PENDING IDEAS

- refine grain opacity
- delayed collage reveal
- cursor glow effect
- imported typography refinements
- hover tilt interactions
- project detail pages
- cinematic transitions
*/

import Image from "next/image";
import Signature from "@/components/Signature";

export default function Home() {
  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  const currentThreads = [
    "fandom + emotional memory",
    "product taste + storytelling",
    "elevated girlhood + visual mood",
  ];

  const featuredProjects = [
    {
      title: "Audible case competition",
      category: "Product strategy / UX / storytelling",
      blurb:
        "Designed Clip & Share, a feature concept that helps users save and share meaningful audiobook moments across social platforms.",
      impact:
        "First-place winning concept for an Amazon-sponsored product case competition.",
      tags: ["Gen Z engagement", "social sharing", "product thinking"],
    },
    {
      title: "Marketing + communications",
      category: "Brand / content / analytics",
      blurb:
        "Redesigned and managed digital content for USC enrollment and communications, blending visual direction with audience-aware messaging.",
      impact:
        "Improved accessibility, mobile responsiveness, and weekly traffic across digital campaigns.",
      tags: ["web", "analytics", "content strategy"],
    },
    {
      title: "Creative + technical leadership",
      category: "Leadership / systems / execution",
      blurb:
        "Led marketing teams, built workflows, and coordinated cross-functional work across student organizations and internships.",
      impact:
        "Experience spanning team leadership, process design, and creative execution in structured environments.",
      tags: ["operations", "leadership", "execution"],
    },
  ];

  const inspirationItems = [
    "supercut — lorde",
    "margaret — lana del rey",
    "editorial perfume campaigns",
    "lace details",
    "beautiful interfaces",
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
                saved fragments / elevated girlhood / cinematic taste
              </p>

              <div className="relative mx-auto flex max-w-[1100px] justify-center">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[44%] h-[170%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6eee7]/90 blur-[90px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-20 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent"
                />
                <div className="relative z-10 w-full max-w-[860px]">
                  {/* Accessible text fallback for screen readers */}
                  <span className="sr-only">Vanessa Gonzalez</span>
                  <Signature aria-hidden="true" />
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-2xl text-center">
                <p className="text-[1.02rem] leading-8 text-[#4c413b] sm:text-[1.12rem]">
                  A portfolio built like an archive of things I keep coming back
                  to — edits, details, stories, and products that feel
                  collectible.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href="#work"
                    className="rounded-full border border-[#201c1a] bg-[#201c1a] px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    View Work
                  </a>

                  <a
                    href="#about"
                    className="rounded-full border border-[#201c1a]/20 bg-white/70 px-6 py-3 text-sm text-[#201c1a] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    About
                  </a>
                </div>
              </div>

              <div className="mt-10 rounded-[28px] border border-black/5 bg-white/45 p-4 shadow-[0_16px_40px_rgba(68,44,29,0.04)] backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                  <span className="h-px w-8 bg-[#c8bdb2]" />
                  selected fragments
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#5f554f]">
                  {fragments.map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-full border border-black/10 bg-white/70 px-4 py-2 tracking-[0.04em] shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${
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

              {/* COLLAGE */}
              <div className="mt-16 grid gap-4 lg:relative lg:mt-[4.5rem] lg:block lg:min-h-[980px]">
                {/* MAIN PORTRAIT */}
                <div className="reveal-item group h-[420px] overflow-hidden rounded-[36px] border border-[#201c1a]/6 shadow-[0_22px_65px_rgba(45,29,18,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(45,29,18,0.14)] animate-floatSlow lg:absolute lg:left-[2%] lg:top-[20px] lg:h-[610px] lg:w-[36%]">
                  <Image
                    src="/images/vanessa1.jpg"
                    alt="Vanessa portrait"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 36vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* MAGAZINE */}
                <div className="reveal-item group h-[280px] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[2deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium lg:absolute lg:left-[33%] lg:top-[95px] lg:h-[300px] lg:w-[22%] lg:rotate-[6deg]">
                  <Image
                    src="/images/ariana-audrey.jpg"
                    alt="Ariana and Audrey inspiration"
                    fill
                    sizes="(max-width: 768px) 100vw, 22vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* LACE */}
                <div className="reveal-item group h-[240px] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[-2deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatSlow lg:absolute lg:left-[41%] lg:top-[382px] lg:h-[245px] lg:w-[20%] lg:rotate-[-5deg]">
                  <Image
                    src="/images/lace.jpg"
                    alt="Lace detail"
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* LITTLE NOTE */}
                <div className="reveal-item rounded-[30px] border border-black/5 bg-white/78 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)] lg:absolute lg:right-[2%] lg:top-[30px] lg:w-[36%]">
                  <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                    a little note
                  </p>

                  <p className="mt-4 text-[1.03rem] leading-8 text-[#342d29] sm:text-[1.08rem]">
                    I like things that feel edited, emotional, and a little
                    nostalgic — like a page torn from a diary and styled for a
                    gallery wall.
                  </p>

                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#8a7d75]">
                    anqclic / creative archive
                  </p>
                </div>

                {/* SECOND PHOTO */}
                <div className="reveal-item group h-[280px] overflow-hidden rounded-[30px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[2deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium lg:absolute lg:right-[6%] lg:top-[236px] lg:h-[258px] lg:w-[27%] lg:rotate-[3deg]">
                  <Image
                    src="/images/vanessa2.jpg"
                    alt="Vanessa at the Huntington"
                    fill
                    sizes="(max-width: 768px) 100vw, 27vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* CURRENTLY INSPIRING ME */}
                <div className="reveal-item rounded-[26px] border border-black/5 bg-white/82 p-5 shadow-[0_18px_45px_rgba(68,44,29,0.05)] backdrop-blur-sm rotate-[1deg] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)] lg:absolute lg:right-[12%] lg:bottom-[250px] lg:w-[19%] lg:rotate-[2deg]">
                  <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                    currently inspiring me
                  </p>

                  <div className="mt-4 grid gap-2 text-sm leading-6 text-[#342d29]">
                    {inspirationItems.map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                </div>

                {/* THREADS */}
                <div className="reveal-item rounded-[30px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)] lg:absolute lg:right-[24%] lg:bottom-[10px] lg:w-[28%]">
                  <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                    current threads
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentThreads.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/5 bg-[#fffaf6] px-4 py-2 text-sm text-[#1f1a18] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SMALL ARCHIVE TAG — desktop only */}
                <div className="reveal-item hidden rounded-full border border-black/5 bg-white/80 px-4 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-[#7c7068] shadow-[0_10px_26px_rgba(68,44,29,0.05)] lg:absolute lg:left-[10%] lg:bottom-[96px] lg:block">
                  saved fragments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section
          id="work"
          className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10"
        >
          <div className="mb-5 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
            <span className="h-px w-8 bg-[#c8bdb2]" />
            selected work
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            {/* FEATURED AUDIBLE */}
            <article className="reveal-item overflow-hidden rounded-[34px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(68,44,29,0.09)]">
              <div className="relative h-[260px] overflow-hidden border-b border-black/5">
                <Image
                  src="/images/audible-case-comp.jpg"
                  alt="Audible case competition"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/80">
                    featured case study
                  </p>

                  <h3 className="mt-2 text-2xl text-white">
                    Audible — Clip & Share
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                  product strategy / storytelling / ux
                </p>

                <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#4d413b]">
                  Co-developed a social sharing feature concept designed to help users
                  save and share emotionally resonant audiobook moments across platforms
                  like Instagram and TikTok.
                </p>

                <p className="mt-4 text-[1rem] leading-8 text-[#4d413b]">
                  The project explored how fandom behavior, collectibility, and replayable
                  moments could increase Gen Z engagement on Audible.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "gen z behavior",
                    "feature strategy",
                    "audience research",
                    "social interaction",
                    "product thinking",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* SIDE CARDS */}
            <div className="grid gap-4">
              <article className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
                <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  marketing + communications
                </p>

                <p className="mt-4 text-sm leading-7 text-[#4d413b]">
                  Redesigned enrollment websites, managed multimedia campaigns, and used
                  analytics + audience behavior to improve messaging and accessibility.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["web", "analytics", "branding"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
                <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  creative systems + leadership
                </p>

                <p className="mt-4 text-sm leading-7 text-[#4d413b]">
                  Built workflows, led creative teams, and managed digital content
                  strategy across organizations, balancing visual storytelling with
                  structured execution.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["leadership", "operations", "execution"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
              <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                about
              </p>

              <h2 className="mt-4 max-w-2xl text-2xl leading-tight text-[#1f1a18] sm:text-[2rem]">
                I’m a USC student studying Computer Science and Business Administration,
                with a creative brain that has always been drawn to edits, movies,
                music, and the tiny details that make people care.
              </h2>

              <div className="mt-5 space-y-4 text-[1rem] leading-8 text-[#4d413b]">
                <p>
                  I have been video editing since I was 10, and I still love the process
                  of turning fragments into feeling — whether that is a ship edit, a
                  soundtrack moment, a visual era, or a product experience that makes
                  something memorable.
                </p>

                <p>
                  I am especially interested in the space where storytelling, branding,
                  and technology overlap. I like building things that are thoughtful and
                  emotionally resonant, but also structured, technically sound, and
                  useful.
                </p>

                <p>
                  My goal is to keep working in creative spaces where I can combine
                  analytical thinking with taste, audience understanding, and visual
                  intuition — whether that is in product, business, strategy, or even
                  software.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div
                id="resume"
                className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  what I bring
                </p>

                <div className="mt-4 grid gap-3 text-sm leading-7 text-[#4d413b]">
                  <p>• Computer Science + Business Administration training</p>
                  <p>• Product, business, and systems thinking</p>
                  <p>• Creative direction through editing and visual storytelling</p>
                  <p>• Strong interest in media, fandom, and emotionally engaging experiences</p>
                </div>
              </div>

              <div
                id="contact"
                className="reveal-item rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  current direction
                </p>

                <p className="mt-4 text-sm leading-7 text-[#4d413b]">
                  I want to keep building in spaces where creativity and structure meet:
                  product, strategy, media, entertainment, or tools that help people
                  connect more deeply with the things they love.
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#8a7d75]">
                  anqclic / creative archive
                </p>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes floatSlow {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes floatMedium {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-16px);
            }
          }

          @keyframes drawStroke {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes revealUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-floatSlow {
            animation: floatSlow 8s ease-in-out infinite;
          }

          .animate-floatMedium {
            animation: floatMedium 10s ease-in-out infinite;
          }

          .reveal-item {
            animation: revealUp 700ms ease both;
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