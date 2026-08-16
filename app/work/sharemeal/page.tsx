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
  "Figma",
  "frontend",
  "React",
  "Spring Boot",
  "Cucumber",
  "Jira / Scrum",
  "accessibility",
  "recipe API",
];

const stats = [
  { value: "04", label: "core interfaces I owned" },
  { value: "02", label: "week sprint cycles" },
  { value: "05", label: "Scrum meetings / sprint" },
  { value: "01", label: "stakeholder-driven product" },
];

const productFlow = [
  {
    number: "01",
    label: "build a meal",
    title: "Combine recipes into a shared meal.",
    body:
      "Users can search an external recipe source, select multiple recipes, and organize them into a meal. A meal is defined by at least two recipes, with recipe images, servings, nutrition, ingredients, and allergens carried into the collection.",
  },
  {
    number: "02",
    label: "favorite it",
    title: "Save the meals worth sharing.",
    body:
      "Meals can be named, favorited, edited, reordered, and revisited from the user's meal library. Favorited meals become the starting point for event creation.",
  },
  {
    number: "03",
    label: "make it social",
    title: "Turn a meal into an event.",
    body:
      "Hosts choose a favorite meal, create an event, and invite friends. Guest recommendations can be filtered or ranked by meal compatibility.",
  },
  {
    number: "04",
    label: "protect the guest experience",
    title: "Surface dietary conflicts before people accept.",
    body:
      "Allergen information follows the meal into invitations. Guests with conflicts are highlighted and warned before an invitation is accepted.",
  },
];

const ownership = [
  {
    title: "Figma → interface",
    body:
      "I led the product mockup in Figma and continuously iterated the interface as requirements and stakeholder feedback evolved.",
  },
  {
    title: "Frontend implementation",
    body:
      "I primarily worked on the frontend, including the homepage, login, favorites, and profile experiences.",
  },
  {
    title: "Team software process",
    body:
      "I worked within the team's Scrum cadence, Jira backlog, stakeholder reviews, GitHub workflow, and testing process.",
  },
];

const engineeringSteps = [
  {
    label: "requirements",
    title: "Probe the stakeholder",
    body:
      "The team received requirements and a stakeholder rather than a finished product specification. Questions were a core part of the work: clarify the request, define acceptance criteria, and surface edge cases before implementation.",
  },
  {
    label: "sprint execution",
    title: "Build in two-week cycles",
    body:
      "Each sprint involved recurring Scrum meetings, Jira backlog movement, implementation, testing, and a stakeholder review. Work was adjusted as the team learned what the requirements actually implied.",
  },
  {
    label: "quality",
    title: "Test against the requirements",
    body:
      "The project used automated and acceptance-level testing, including Cucumber scenarios and Spring Boot tests, alongside GitHub-based collaboration and review.",
  },
  {
    label: "accessibility",
    title: "Treat access as part of the product",
    body:
      "Accessibility was part of the requirements rather than a final polish pass, influencing labeling, interaction semantics, and interface behavior throughout the build.",
  },
];

export default function ShareMealPage() {
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
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]"
      />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">
            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link
                href="/work"
                className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                ← work
              </Link>

              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-[#201c1a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* TITLE BLOCK */}
            <div className="reveal-item mt-10 max-w-4xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                05 · software engineering project · usc csci 310
              </p>

              <h1 className="mt-4 font-serif text-[2.4rem] font-semibold leading-tight text-[#1f1a18] sm:text-[3rem] lg:text-[3.25rem]">
                ShareMeal
              </h1>

              <p className="mt-3 text-[0.82rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                Product Design / Frontend Engineering / Agile Development
              </p>

              <p className="mt-5 max-w-3xl text-[1rem] leading-8 text-[#4d413b]">
                A semester-long software engineering project built around a simple idea:
                turn favorite recipes into meals, then turn meals into social events. Our
                team worked from stakeholder requirements through two-week Scrum sprints,
                testing, accessibility requirements, and a final full-stack implementation.
              </p>

              <p className="mt-4 max-w-3xl text-[0.95rem] leading-8 text-[#5e5048]">
                I led the product mockup in Figma and primarily contributed to the frontend,
                including the homepage, login, favorites, and profile experiences.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* BY THE NUMBERS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              by the numbers
            </div>

            <div className="reveal-item grid grid-cols-2 gap-4 sm:grid-cols-4" data-delay={80}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[24px] border border-black/5 bg-white/72 p-6 text-center shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                >
                  <p className="font-serif text-[2rem] font-semibold leading-none text-[#1f1a18]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* THE PRODUCT */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the product
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {productFlow.map((item, index) => (
                <section
                  key={item.number}
                  className="reveal-item relative overflow-hidden rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={index * 80}
                >
                  <span className="pointer-events-none absolute right-5 bottom-2 select-none font-serif text-[4rem] font-semibold leading-none text-black/[0.03]">
                    {item.number}
                  </span>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    {item.number} · {item.label}
                  </p>
                  <h2 className="mt-3 max-w-xl font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">
                    {item.title}
                  </h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.9rem] leading-7 text-[#5e5048]">{item.body}</p>
                </section>
              ))}
            </div>

            {/* MY OWNERSHIP */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              my ownership
            </div>

            <div className="reveal-item grid gap-4 lg:grid-cols-3" data-delay={80}>
              {ownership.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    0{index + 1}
                  </p>
                  <h2 className="mt-3 font-serif text-[1.25rem] font-semibold leading-snug text-[#1f1a18]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">{item.body}</p>
                </div>
              ))}
            </div>

            {/* FIGMA */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              the design
            </div>

            <section
              className="reveal-item overflow-hidden rounded-[30px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.07)]"
              data-delay={120}
            >
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="min-h-[300px] bg-[#fffaf6] p-8 lg:p-10">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                    Figma prototype
                  </p>
                  <h2 className="mt-3 max-w-xl font-serif text-[1.7rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2rem]">
                    Designing the experience before we built it.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[0.92rem] leading-7 text-[#5e5048]">
                    I used Figma as the working visual system for ShareMeal—not just a final
                    presentation artifact. The interface evolved alongside requirements and
                    stakeholder feedback, then became the reference point for the frontend build.
                  </p>
                  <a
                    href="https://www.figma.com/make/K3Rjmz6JfaAVPrKvt7yD6M/Website-Showcase-File?t=2FSY11HNs39fr0y7-20&fullscreen=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex rounded-full border border-black/8 bg-white px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.05)] transition hover:-translate-y-0.5 hover:text-[#201c1a]"
                  >
                    open Figma prototype ↗
                  </a>
                </div>

                <div className="flex min-h-[300px] items-center justify-center border-t border-black/5 bg-white p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <div className="w-full max-w-md rounded-[24px] border border-black/5 bg-[#f7f1eb] p-4 shadow-[0_18px_50px_rgba(68,44,29,0.08)]">
                    <div className="rounded-[18px] border border-black/5 bg-white p-5">
                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#a89d96]">ShareMeal</p>
                          <p className="mt-1 font-serif text-[1.1rem] font-semibold text-[#1f1a18]">A meal, then a reason to gather.</p>
                        </div>
                        <span className="rounded-full bg-[#fffaf6] px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-[#8a7d75]">Figma</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {[
                          ["Homepage", "Discover + favorites"],
                          ["Login", "Access + validation"],
                          ["Favorites", "Save + manage meals"],
                          ["Profile", "Preferences + allergens"],
                        ].map(([title, body]) => (
                          <div key={title} className="rounded-[16px] border border-black/5 bg-[#fffaf6] p-3">
                            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#a89d96]">{title}</p>
                            <p className="mt-2 text-[0.72rem] leading-5 text-[#5e5048]">{body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DESIGN TO CODE */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              design → implementation
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Homepage",
                  body: "A primary navigation and discovery surface connecting recent meals, invitations, and upcoming events.",
                },
                {
                  title: "Login",
                  body: "A designed authentication flow with validation, error states, and temporary lockout behavior after repeated failed attempts.",
                },
                {
                  title: "Favorites / My Meals",
                  body: "A meal library for naming, favoriting, editing, reordering, and turning saved meals into events.",
                },
                {
                  title: "Profile",
                  body: "User settings that connect identity and privacy preferences to allergen-aware product behavior.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]"
                  data-delay={index * 60}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">0{index + 1}</p>
                  <h2 className="mt-3 font-serif text-[1.3rem] font-semibold text-[#1f1a18]">{item.title}</h2>
                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">{item.body}</p>
                </div>
              ))}
            </div>

            {/* ENGINEERING PROCESS */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              how we built it
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {engineeringSteps.map((step, index) => (
                <section
                  key={step.label}
                  className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-8"
                  data-delay={index * 70}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">{step.label}</p>
                  <h2 className="mt-3 font-serif text-[1.35rem] font-semibold leading-snug text-[#1f1a18]">{step.title}</h2>
                  <p className="mt-4 text-[0.89rem] leading-7 text-[#5e5048]">{step.body}</p>
                </section>
              ))}
            </div>

            {/* TAKEAWAY */}
            <div className="my-10 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              key takeaway
            </div>

            <section
              className="reveal-item rounded-[28px] border border-black/5 bg-[#fffaf6] p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:p-10"
              data-delay={80}
            >
              <p className="max-w-4xl font-serif text-[1.7rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.2rem]">
                The hardest part of software development wasn't the screen.
                <span className="text-[#8a7d75]"> It was turning an ambiguous requirement into something a team could actually build.</span>
              </p>
              <p className="mt-5 max-w-3xl text-[0.92rem] leading-7 text-[#5e5048]">
                ShareMeal taught me to think about product work as the layer between people,
                requirements, design, and engineering. The Figma made the product concrete;
                the sprint process taught me how much has to happen around the interface for that
                interface to become real.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["product thinking", "UI / UX", "frontend", "stakeholder discovery", "agile delivery"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/5 bg-white px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c7068]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* NOTE */}
            <p className="mt-5 text-center text-[0.66rem] uppercase tracking-[0.22em] text-[#a89d96]">
              Academic project · built as part of USC CSCI 310 · repository remained private
            </p>

            {/* BOTTOM NAV */}
            <div className="reveal-item mt-10 flex items-center justify-between border-t border-black/5 pt-8" data-delay={0}>
              <Link
                href="/work/ama"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                <span className="h-px w-4 bg-[#c8bdb2] transition-all duration-200 group-hover:w-6" />
                prev: AMA
              </Link>

              <Link
                href="/work/anqclic"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-[#7c7068] transition hover:text-[#201c1a]"
              >
                next: anqclic
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