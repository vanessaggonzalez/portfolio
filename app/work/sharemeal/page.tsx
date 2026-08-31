"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      setTimeout(() => el.classList.add("revealed"), Number(el.dataset.delay ?? 0));
      observer.unobserve(el);
    }), { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const flow = [
  ["01", "Recipes", "Search an external source and select dishes."],
  ["02", "Meal", "Combine recipes, nutrition, servings, and allergens."],
  ["03", "Event", "Turn a favorite meal into a social invitation."],
  ["04", "Guests", "Match recommendations and surface dietary conflicts."],
];

const surfaces = [
  ["01", "Homepage", "Discovery, recent meals, invitations, and upcoming events."],
  ["02", "Login", "Validation, error states, and lockout behavior."],
  ["03", "Favorites", "Save, name, edit, reorder, and activate meals."],
  ["04", "Profile", "Identity, privacy, and allergen preferences."],
];

export default function ShareMealPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#dce7dc]/70 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/work" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← work</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          {/* HERO */}
          <section className="grid border-t border-black/5 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="reveal-item flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">USC CSCI 310 · Software Engineering</p>
              <h1 className="mt-5 font-serif text-[3rem] font-semibold leading-[1.02] text-[#1f1a18] sm:text-[4.1rem]">ShareMeal</h1>
              <p className="mt-4 font-serif text-[1.35rem] italic text-[#6f8e71]">A meal, then a reason to gather.</p>
              <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#4d413b]">A semester-long full-stack product that turns favorite recipes into shared meals, meals into social events, and dietary information into a safer guest experience.</p>
              <p className="mt-5 text-[0.66rem] uppercase tracking-[0.2em] text-[#7c7068]">Product Design · Frontend Engineering · Agile Delivery</p>
              <div className="mt-7 flex flex-wrap gap-2">{["Figma", "React", "Spring Boot", "Cucumber", "Jira / Scrum"].map((tag) => <span key={tag} className="rounded-full border border-black/5 bg-[#f7fbf5] px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-[#687868]">{tag}</span>)}</div>
            </div>

            <div className="reveal-item relative min-h-[480px] overflow-hidden bg-gradient-to-br from-[#dce8d8] via-[#f3eadc] to-[#d5e3d4] p-7 sm:p-10" data-delay={80}>
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#f6c178]/30 blur-[70px]" />
              <div className="relative h-full overflow-hidden rounded-[30px] border border-white/70 bg-[#fffdf8] shadow-[0_28px_65px_rgba(60,75,52,0.16)]">
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4"><div><p className="font-serif text-lg text-[#344337]">ShareMeal</p><p className="text-[0.48rem] uppercase tracking-[0.18em] text-[#91a091]">discover · plan · gather</p></div><div className="flex gap-3 text-[0.55rem] text-[#718071]"><span>Meals</span><span>Events</span><span>Profile</span></div></div>
                <div className="p-5"><p className="text-[0.52rem] uppercase tracking-[0.2em] text-[#91a091]">your next gathering</p><div className="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-4"><div className="rounded-[22px] bg-[#31483a] p-5 text-white"><span className="rounded-full bg-white/10 px-3 py-1 text-[0.5rem]">favorite meal</span><p className="mt-8 font-serif text-2xl">Sunday Dinner</p><p className="mt-2 text-[0.62rem] text-white/55">3 recipes · serves 6</p><div className="mt-5 flex -space-x-2">{["#e7b36e", "#c57658", "#7a9b78"].map((color, i) => <span key={i} className="h-9 w-9 rounded-full border-2 border-[#31483a]" style={{ background: color }} />)}</div></div><div className="space-y-3">{[["Pasta", "dinner"], ["Salad", "side"], ["Tart", "dessert"]].map(([name, type], i) => <div key={name} className={`rounded-[17px] p-4 ${i === 1 ? "translate-x-2 bg-[#eef5eb]" : "bg-[#f7eee2]"}`}><p className="font-serif text-sm text-[#3d4b40]">{name}</p><p className="mt-1 text-[0.48rem] uppercase tracking-[0.15em] text-[#91a091]">{type}</p></div>)}</div></div>
                  <div className="mt-4 flex items-center justify-between rounded-[16px] border border-[#dbe7d8] bg-[#f7fbf5] px-4 py-3"><div><p className="text-[0.52rem] uppercase tracking-[0.18em] text-[#769078]">guest safety</p><p className="mt-1 text-[0.65rem] text-[#4d5f50]">2 dietary preferences matched · 1 allergen warning</p></div><span className="grid h-8 w-8 place-items-center rounded-full bg-[#78977a] text-xs text-white">✓</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* METRICS */}
          <section className="grid grid-cols-2 border-y border-black/5 bg-[#fffaf6]/75 sm:grid-cols-4">{[["04", "interfaces owned"], ["02 wk", "sprint cycles"], ["01", "stakeholder product"], ["~92%", "final project score"]].map(([value, label], i) => <div key={label} className={`p-6 text-center sm:p-8 ${i > 0 ? "sm:border-l sm:border-black/5" : ""} ${i > 1 ? "border-t border-black/5 sm:border-t-0" : ""}`}><p className="font-serif text-[2rem] font-semibold text-[#668268]">{value}</p><p className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#9a8c84]">{label}</p></div>)}</section>

          {/* PRODUCT FLOW */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-8 lg:grid-cols-[0.4fr_1.6fr]" data-delay={0}><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">the product</p><p className="mt-3 text-[0.78rem] leading-6 text-[#7c7068]">Four connected moments, not four disconnected features.</p></div><h2 className="font-serif text-[2rem] leading-[1.25] text-[#342d29] sm:text-[2.5rem]">The social object wasn’t a recipe. It was the meal people could build and experience together.</h2></div>
            <div className="reveal-item relative mt-12 grid gap-5 sm:grid-cols-4" data-delay={80}><div aria-hidden="true" className="absolute left-8 right-8 top-4 hidden border-t border-dashed border-[#bfcfbd] sm:block" />{flow.map(([num, title, body]) => <div key={num} className="relative"><span className="relative z-10 inline-grid h-8 w-8 place-items-center rounded-full bg-[#69866b] font-serif text-xs text-white">{num}</span><p className="mt-5 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div>
          </section>

          {/* SAFETY SPOTLIGHT */}
          <section className="reveal-item border-y border-black/5 bg-gradient-to-r from-[#e8f1e5] via-[#fffaf6] to-[#f3e8d9] px-6 py-14 sm:px-10 lg:px-14 lg:py-16" data-delay={0}>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#718c73]">a product constraint that mattered</p><h2 className="mt-3 font-serif text-[2rem] leading-tight text-[#342d29]">The invitation had to protect the guest—not just delight the host.</h2><p className="mt-5 text-[0.88rem] leading-7 text-[#5e5048]">Allergen data followed recipes into the meal and then into the event. Guests with dietary conflicts were highlighted and warned before accepting an invitation.</p></div><div className="rounded-[28px] bg-[#2f4435] p-7 text-white shadow-[0_24px_60px_rgba(47,68,53,0.16)]"><div className="flex items-start justify-between"><div><p className="text-[0.52rem] uppercase tracking-[0.2em] text-white/35">event invitation</p><p className="mt-2 font-serif text-xl text-white/90">Sunday Dinner</p></div><span className="rounded-full bg-[#f1b96d]/20 px-3 py-1 text-[0.52rem] text-[#f1c98f]">review needed</span></div><div className="mt-7 space-y-3">{[["Vanessa", "all clear", true], ["Guest 02", "contains tree nuts", false], ["Guest 03", "vegetarian match", true]].map(([name, state, okay]) => <div key={String(name)} className="flex items-center justify-between border-t border-white/10 pt-3"><span className="text-[0.72rem] text-white/65">{name}</span><span className={`text-[0.55rem] ${okay ? "text-[#a9c8aa]" : "text-[#f1c98f]"}`}>{state}</span></div>)}</div></div></div>
          </section>

          {/* OWNERSHIP */}
          <section className="px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item grid gap-10 lg:grid-cols-[0.72fr_1.28fr]" data-delay={0}>
              <div><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">my ownership</p><h2 className="mt-3 font-serif text-[2rem] font-semibold text-[#342d29]">From visual system to working interface.</h2><p className="mt-5 text-[0.9rem] leading-7 text-[#5e5048]">I led the evolving Figma mockup and primarily implemented the homepage, login, favorites, and profile experiences on the frontend.</p><a href="https://www.figma.com/make/K3Rjmz6JfaAVPrKvt7yD6M/Website-Showcase-File?t=2FSY11HNs39fr0y7-20&fullscreen=1" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-[#324738] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5">open Figma prototype ↗</a></div>
              <div className="grid gap-4 sm:grid-cols-2">{surfaces.map(([num, title, body], i) => <article key={num} className={`relative p-6 ${i === 1 || i === 2 ? "rounded-[24px] bg-[#f5f9f2] shadow-[0_16px_38px_rgba(68,80,60,0.05)]" : "border-t border-black/5"}`}><span className="font-serif text-xl text-[#86a188]">{num}</span><p className="mt-3 font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.78rem] leading-6 text-[#5e5048]">{body}</p></article>)}</div>
            </div>
          </section>

          {/* REQUIREMENTS TO CODE */}
          <section className="border-t border-black/5 bg-[#fffaf6]/55 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="reveal-item" data-delay={0}><p className="text-[0.62rem] uppercase tracking-[0.28em] text-[#a89d96]">how we built it</p><h2 className="mt-3 font-serif text-[2rem] text-[#342d29]">Ambiguity in. Tested software out.</h2></div>
            <div className="reveal-item mt-10 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center" data-delay={80}>
              {[["01", "Probe", "Clarify requirements and edge cases."], ["02", "Design", "Make behavior concrete in Figma."], ["03", "Build", "Implement through the Jira backlog."], ["04", "Verify", "Test with Cucumber and Spring Boot."]].map(([num, title, body], i) => <div key={num} className="contents"><div className={`rounded-[22px] border border-black/5 p-6 ${i === 2 ? "bg-[#314638] text-white shadow-[0_20px_45px_rgba(49,70,56,0.14)]" : "bg-white/80"}`}><span className={`font-serif text-lg ${i === 2 ? "text-[#b9d0b9]" : "text-[#86a188]"}`}>{num}</span><p className="mt-3 font-serif text-lg">{title}</p><p className={`mt-2 text-[0.72rem] leading-6 ${i === 2 ? "text-white/55" : "text-[#5e5048]"}`}>{body}</p></div>{i < 3 && <span className="hidden text-[#bcc9ba] md:block">→</span>}</div>)}
            </div>

            <div className="reveal-item mt-10 grid gap-6 border-t border-black/5 pt-9 sm:grid-cols-3" data-delay={120}>{[["Stakeholder", "Requirements evolved through questions and reviews—not from a finished specification."], ["Accessibility", "Labels, semantics, and interaction behavior were part of the build rather than final polish."], ["Team delivery", "Two-week sprints connected Jira, GitHub, implementation, testing, and review."]].map(([title, body]) => <div key={title}><p className="font-serif text-lg text-[#342d29]">{title}</p><p className="mt-2 text-[0.8rem] leading-6 text-[#5e5048]">{body}</p></div>)}</div>
          </section>

          {/* TAKEAWAY */}
          <section className="bg-[#2f4335] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16"><div className="reveal-item" data-delay={0}><p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/35">key takeaway</p><p className="mt-5 max-w-5xl font-serif text-[2rem] leading-[1.2] text-white/90 sm:text-[2.8rem]">The hardest part wasn’t drawing the screen. It was <span className="italic text-[#bdd1bc]">turning an ambiguous requirement into something a team could actually build.</span></p><p className="mt-6 max-w-3xl text-[0.85rem] leading-7 text-white/50">ShareMeal taught me to work in the layer between stakeholder intent, product behavior, visual design, engineering constraints, and testable acceptance criteria.</p><p className="mt-6 text-[0.56rem] uppercase tracking-[0.2em] text-white/30">Academic project · private repository · USC CSCI 310</p></div></section>

          <div className="flex flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-14"><Link href="/work/ama" className="text-[0.65rem] uppercase tracking-[0.24em] text-[#7c7068]">← AMA</Link><Link href="/work/wie" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5">next: Women in Engineering →</Link></div>
        </div>
      </div>

      <style>{`
        .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); }
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        @media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </main>
  );
}
