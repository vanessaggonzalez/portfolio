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
    "entertainment + fandom",
    "product taste + storytelling",
    "soft luxury + visual mood",
  ];

  const featuredProjects = [
    {
      title: "Audible case competition",
      blurb:
        "A product story about clipping, sharing, and making moments feel collectible.",
    },
    {
      title: "Marketing + communications",
      blurb:
        "Writing, branding, and visual direction shaped by audience and taste.",
    },
    {
      title: "Entertainment product ideas",
      blurb:
        "Concepts that sit at the intersection of fandom, utility, and emotion.",
    },
  ];

  const inspirationItems = [
    "supercut — lorde",
    "margaret — lana del rey",
    "editorial perfume campaigns",
    "fandom archives",
    "beautiful interfaces",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 grain-overlay"
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
            <div className="mt-10 lg:mt-14">
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#7c7068]">
                editorial diary / soft luxury / cinematic taste
              </p>

              {/* SIGNATURE */}
              <div className="mx-auto flex max-w-[720px] justify-center -translate-x-[170px]">
                <Signature />
              </div>

              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[#4c413b] sm:text-[1.14rem]">
                A personal portfolio that feels like a polished magazine spread —
                soft, cinematic, and made to hold the things I love.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="rounded-full border border-[#201c1a] bg-[#201c1a] px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  View Work
                </a>

                <a
                  href="#resume"
                  className="rounded-full border border-[#201c1a]/20 bg-white/70 px-6 py-3 text-sm text-[#201c1a] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Resume
                </a>
              </div>

              <div className="mt-10 rounded-[28px] border border-black/5 bg-white/45 p-4 shadow-[0_16px_40px_rgba(68,44,29,0.04)] backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
                  <span className="h-px w-8 bg-[#c8bdb2]" />
                  selected fragments
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#5f554f]">
                  {[
                    "Harry Potter edits",
                    "editorial moodboards",
                    "late-night editing",
                    "storytelling + taste",
                    "soft luxury",
                    "fandom archives",
                    "adobe after effects",
                  ].map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-full border border-black/8 bg-white/70 px-4 py-2 tracking-[0.04em] shadow-sm backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${
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
              <div className="relative mt-20 min-h-[1050px]">
                {/* MAIN PORTRAIT */}
                <div className="group absolute left-0 top-0 h-[640px] w-[38%] overflow-hidden rounded-[36px] border border-[#201c1a]/6 shadow-[0_22px_65px_rgba(45,29,18,0.08)] rotate-[-2deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(45,29,18,0.14)] animate-floatSlow">
                  <Image
                    src="/images/vanessa1.jpg"
                    alt="Vanessa portrait"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 38vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* MAGAZINE */}
                <div className="group absolute left-[34%] top-[80px] h-[300px] w-[23%] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[6deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium">
                  <Image
                    src="/images/ariana-audrey.jpg"
                    alt="Ariana and Audrey inspiration"
                    fill
                    sizes="(max-width: 768px) 100vw, 23vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* LACE */}
                <div className="group absolute left-[42%] top-[370px] h-[250px] w-[21%] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[-5deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatSlow">
                  <Image
                    src="/images/lace.jpg"
                    alt="Lace detail"
                    fill
                    sizes="(max-width: 768px) 100vw, 21vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* LITTLE NOTE */}
                <div className="absolute right-0 top-[30px] w-[38%] rounded-[30px] border border-black/5 bg-white/78 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
                  <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                    a little note
                  </p>

                  <p className="mt-4 text-[1.03rem] leading-8 text-[#342d29] sm:text-[1.08rem]">
                    I like things that feel edited, emotional, and a little
                    nostalgic — like a page torn from a diary and styled for a
                    gallery wall.
                  </p>
                </div>

                {/* SECOND PHOTO */}
                <div className="group absolute right-[4%] top-[230px] h-[260px] w-[28%] overflow-hidden rounded-[30px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[3deg] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(45,29,18,0.12)] animate-floatMedium">
                  <Image
                    src="/images/vanessa2.jpg"
                    alt="Vanessa at the Huntington"
                    fill
                    sizes="(max-width: 768px) 100vw, 28vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* CURRENTLY INSPIRING ME */}
                <div className="absolute right-[10%] bottom-[250px] w-[20%] rounded-[26px] border border-black/5 bg-white/82 p-5 shadow-[0_18px_45px_rgba(68,44,29,0.05)] backdrop-blur-sm rotate-[2deg] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
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
                <div className="absolute right-[26%] bottom-[10px] w-[28%] rounded-[30px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.08)]">
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
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProjects.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-black/5 bg-white/70 px-6 py-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
              >
                <p className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  Featured
                </p>

                <h3 className="mt-4 text-xl text-[#1f1a18]">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-[#66574f]">
                  {item.blurb}
                </p>
              </div>
            ))}
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

          @keyframes drawStroke {
            to {
              stroke-dashoffset: 0;
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

          .animate-floatSlow {
            animation: floatSlow 8s ease-in-out infinite;
          }

          .animate-floatMedium {
            animation: floatMedium 10s ease-in-out infinite;
          }

          .grain-overlay {
            opacity: 0.055;
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