"use client";

import Image from "next/image";
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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const featuredProject = {
  slug: "audible",
  title: "Audible — Clip & Share",
  category: "Product strategy / UX / storytelling",
  image: "/images/clip-and-share.png",
  blurb:
    "Co-developed a social sharing feature concept designed to help users save and share emotionally resonant audiobook moments across platforms like Instagram and TikTok. Explored how fandom behavior, collectibility, and replayable moments could increase Gen Z engagement on Audible.",
  impact: "First-place winning concept for an Amazon-sponsored product case competition.",
  tags: ["gen z behavior", "feature strategy", "audience research", "social interaction", "product thinking"],
};

const mainProjects = [
  {
    slug: "usc-marcomm",
    num: "02",
    title: "USC Marketing Communications",
    org: "University of Southern California",
    category: "Brand / content / analytics",
    blurb:
      "Redesigned undergraduate enrollment websites, managed multimedia campaigns, and used analytics + audience behavior to improve messaging and accessibility for 10,000+ weekly users.",
    impact: "15% increase in weekly traffic across digital campaigns.",
    tags: ["web", "analytics", "branding", "wordpress"],
  },
  {
    slug: "ama",
    num: "03",
    title: "American Marketing Association",
    org: "VP of Marketing & Project Manager",
    category: "Leadership / content / strategy",
    blurb:
      "Led a team of 5 to plan and execute marketing initiatives, managed end-to-end content production for Instagram campaigns and event coverage, and coordinated cross-functional workflows.",
    impact: "Increased community engagement and brand visibility across digital channels.",
    tags: ["leadership", "content", "campaigns", "operations"],
  },
  {
    slug: "anqclic",
    num: "04",
    title: "Anqclic — Content Creator",
    org: "Self-employed · 8 years",
    category: "Creative / storytelling / platform growth",
    blurb:
      "Built and scaled a digital content platform to 5,000+ followers, generating 630K+ views and 116K+ likes through iterative content experimentation, A/B testing, and audience behavior analysis. Secured a sponsored brand partnership with Funimate.",
    impact: "630K+ views · 116K+ likes · brand partnership secured.",
    tags: ["video editing", "storytelling", "audience strategy", "brand partnership"],
  },
  {
    slug: "wie",
    num: "05",
    title: "USC Women in Engineering",
    org: "Director of Marketing & Development",
    category: "Leadership / digital strategy / community",
    blurb:
      "Led a 4-person marketing team to develop content strategy for initiatives supporting women in STEM. Managed digital communications across WordPress and Canvas, and established brand guidelines to improve operational efficiency.",
    impact: "Expanded reach and consistency across all digital communications.",
    tags: ["leadership", "brand", "communications", "STEM"],
  },
];

const additionalProjects = [
  {
    slug: "techsalerator",
    num: "06",
    title: "Techsalerator — Data Intelligence",
    org: "Sales Intern",
    category: "B2B / research / product positioning",
    blurb:
      "Generated and qualified B2B leads through targeted outreach, contributing to partnerships with companies including Uber and Postmates. Conducted market research and documented user engagement patterns.",
    tags: ["B2B", "market research", "product positioning"],
  },
  {
    slug: "scope-cais",
    num: "07",
    title: "Scope + CAIS++",
    org: "Cohort Member",
    category: "Engineering / AI / full-stack",
    blurb:
      "Developed a web application using Next.js at Scope. Selected for USC's competitive AI student organization, gaining exposure to applied machine learning concepts and ML fundamentals.",
    tags: ["next.js", "react", "AI/ML", "full-stack"],
  },
];

export default function WorkPage() {
  useReveal();

  const navLinks = [
    { label: "Work",    href: "/work" },
    { label: "About",   href: "/#about" },
    { label: "Resume",  href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      {/* GRAIN */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      {/* AMBIENT GLOW */}
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]" />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link href="/" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">
                ← back
              </Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>

            {/* INTRO */}
            <div className="reveal-item mt-10 max-w-2xl" data-delay={0}>
              <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">
                selected work / 2021 — present
              </p>
              <h1 className="mt-4 font-serif text-[2.2rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.8rem]">
                Selected Work
              </h1>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#4d413b]">
                I've spent the last few years moving between creative work, product thinking, and marketing strategy — and honestly the through-line is always the same: I'm drawn to the details that make people care. Whether that's a feature concept for a case competition, a campaign that actually moved numbers, or a content platform I've been building since I was 10, I want everything I touch to feel intentional and a little bit collectible.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">USC CS + Business</span>
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">Incoming @ BofA</span>
                <span className="rounded-full border border-black/5 bg-white/70 px-3 py-1">Product + creative</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              featured
            </div>

            {/* FEATURED CARD */}
            <Link href={`/work/${featuredProject.slug}`} className="reveal-item block" data-delay={80}>
              <article className="group overflow-hidden rounded-[34px] border border-black/5 bg-white/72 shadow-[0_24px_70px_rgba(68,44,29,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(68,44,29,0.10)] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
                {/* IMAGE */}
                <div className="relative h-[280px] overflow-hidden border-b border-black/5 lg:h-auto lg:border-b-0 lg:border-r">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-5 left-5 lg:hidden">
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/80">featured case study</p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-center p-7 lg:p-10">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">01 · featured case study</p>
                  <h2 className="mt-3 font-serif text-[1.6rem] font-semibold leading-tight text-[#1f1a18] sm:text-[1.9rem]">
                    {featuredProject.title}
                  </h2>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    {featuredProject.category}
                  </p>
                  <p className="mt-5 text-[0.97rem] leading-8 text-[#4d413b]">
                    {featuredProject.blurb}
                  </p>
                  <p className="mt-4 text-[0.78rem] uppercase tracking-[0.2em] text-[#8a7d75]">
                    ✦ {featuredProject.impact}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition-all duration-200 group-hover:text-[#7c7068]">
                    view case study →
                  </p>
                </div>
              </article>
            </Link>

            {/* MAIN PROJECTS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              experience
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {mainProjects.map((project, i) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="reveal-item block" data-delay={i * 80}>
                  <article className="group relative h-full overflow-hidden rounded-[30px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,44,29,0.09)]">
                    <span className="absolute right-6 top-6 select-none font-serif text-[2.4rem] font-semibold leading-none text-[#e8ddd6]">
                      {project.num}
                    </span>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">{project.org}</p>
                    <h3 className="mt-2 pr-10 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#8a7d75]">{project.category}</p>
                    <p className="mt-4 text-[0.9rem] leading-7 text-[#4d413b]">{project.blurb}</p>
                    <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-[#a89d96]">✦ {project.impact}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#c8bdb2] transition-all duration-200 group-hover:text-[#7c7068]">
                      read more →
                    </p>
                  </article>
                </Link>
              ))}
            </div>

            {/* ADDITIONAL PROJECTS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              also
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {additionalProjects.map((project, i) => (
                <Link key={project.slug} href={`/work/${project.slug}`} className="reveal-item block" data-delay={i * 80}>
                  <article className="group relative h-full overflow-hidden rounded-[28px] border border-black/5 bg-white/55 p-6 shadow-[0_14px_40px_rgba(68,44,29,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/72 hover:shadow-[0_18px_50px_rgba(68,44,29,0.07)]">
                    <span className="absolute right-5 top-5 select-none font-serif text-[2rem] font-semibold leading-none text-[#ede5df]">
                      {project.num}
                    </span>
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#a89d96]">{project.org}</p>
                    <h3 className="mt-2 pr-8 font-serif text-[1.05rem] font-semibold leading-snug text-[#1f1a18]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#8a7d75]">{project.category}</p>
                    <p className="mt-3 text-[0.88rem] leading-7 text-[#4d413b]">{project.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-[#7c7068]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
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
        `}</style>
      </div>
    </main>
  );
}