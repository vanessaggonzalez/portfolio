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

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
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
            <div className="mx-auto flex justify-center max-w-[720px] -translate-x-45">
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
                  "adobe after effects"
                ].map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-full border border-black/8 bg-white/70 px-4 py-2 tracking-[0.04em] shadow-sm backdrop-blur-sm ${
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
            <div className="relative mt-20 min-h-[900px]">

              {/* MAIN PORTRAIT */}
              <div className="absolute left-0 top-0 h-[640px] w-[38%] overflow-hidden rounded-[36px] border border-[#201c1a]/6 shadow-[0_22px_65px_rgba(45,29,18,0.08)] rotate-[-2deg] animate-floatSlow">
                <Image
                  src="/images/vanessa1.jpg"
                  alt="Vanessa portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 38vw"
                  className="object-cover object-center"
                />
              </div>

              {/* MAGAZINE */}
              <div className="absolute left-[34%] top-[80px] h-[300px] w-[23%] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[6deg] animate-floatMedium">
                <Image
                  src="/images/ariana-audrey.jpg"
                  alt="Ariana and Audrey inspiration"
                  fill
                  sizes="(max-width: 768px) 100vw, 23vw"
                  className="object-cover"
                />
              </div>

              {/* LACE */}
              <div className="absolute left-[42%] top-[370px] h-[250px] w-[21%] overflow-hidden rounded-[28px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[-5deg] animate-floatSlow">
                <Image
                  src="/images/lace.jpg"
                  alt="Lace detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 21vw"
                  className="object-cover"
                />
              </div>

              {/* LITTLE NOTE */}
              <div className="absolute right-0 top-[30px] w-[38%] rounded-[30px] border border-black/5 bg-white/78 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  a little note
                </p>

                <p className="mt-4 text-[1.03rem] leading-8 text-[#342d29] sm:text-[1.08rem]">
                  I like things that feel edited, emotional, and a little
                  nostalgic — like a page torn from a diary and styled for a
                  gallery wall.
                </p>
              </div>

              {/* SECOND PHOTO */}
              <div className="absolute right-[4%] top-[330px] h-[260px] w-[28%] overflow-hidden rounded-[30px] border border-[#201c1a]/6 shadow-[0_18px_45px_rgba(45,29,18,0.08)] rotate-[3deg] animate-floatMedium">
                <Image
                  src="/images/vanessa2.jpg"
                  alt="Vanessa at the Huntington"
                  fill
                  sizes="(max-width: 768px) 100vw, 28vw"
                  className="object-cover"
                />
              </div>

              {/* THREADS */}
              <div className="absolute right-[6%] bottom-[40px] w-[34%] rounded-[30px] border border-black/5 bg-white/75 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                  current threads
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {currentThreads.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/5 bg-[#fffaf6] px-4 py-2 text-sm text-[#1f1a18]"
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
              <p className="text-sm uppercase tracking-[0.24em] text-[#7c7068]">
                Featured
              </p>

              <h3 className="mt-4 text-xl text-[#1f1a18]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#66574f]">
                {item.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes floatSlow {
          0%, 100% {
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
          0%, 100% {
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
      `}</style>
    </main>
  );
}

