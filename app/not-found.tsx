"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 750ms ${delay}ms cubic-bezier(.22,1,.36,1), transform 750ms ${delay}ms cubic-bezier(.22,1,.36,1)`,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#ecdeda]/60 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← home</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          <section className="grid flex-1 border-t border-black/5 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-16" style={reveal(80)}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">archive note / no. 404</p>
              <h1 className="mt-5 max-w-xl font-serif text-[2.9rem] font-semibold leading-[1.03] text-[#1f1a18] sm:text-[4.2rem]">This page slipped out of the scrapbook.</h1>
              <p className="mt-6 max-w-lg text-[1rem] leading-8 text-[#4d413b]">The link may be old, the page may have moved, or this particular fragment was never filed. Either way, there’s plenty more to find.</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_rgba(32,28,26,.16)] transition hover:-translate-y-0.5">return home →</Link>
                <Link href="/work" className="rounded-full border border-black/10 bg-white/75 px-5 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#5f554f] transition hover:-translate-y-0.5">browse selected work</Link>
              </div>

              <div className="mt-10 flex items-center gap-3 text-[0.56rem] uppercase tracking-[0.22em] text-[#b0a39a]"><span className="h-px w-9 bg-[#c8bdb2]" />nothing is truly lost in an archive</div>
            </div>

            <div className="relative grid min-h-[540px] place-items-center overflow-hidden bg-gradient-to-br from-[#e8dbd1] via-[#f4ebe4] to-[#ddcec3] p-8 sm:p-12" style={reveal(160)}>
              <div aria-hidden="true" className="absolute left-10 top-10 h-24 w-32 -rotate-6 bg-[#d9c2ae]/55 shadow-sm" />
              <div aria-hidden="true" className="absolute bottom-10 right-10 rotate-3 bg-[#f6e9ca] px-5 py-4 font-serif text-[0.78rem] italic text-[#776a61] shadow-[0_10px_25px_rgba(68,44,29,.08)]">if found,<br />please return to vanessa</div>

              <div className="relative w-full max-w-[500px] rotate-[1.2deg] bg-[#fffdf9] p-6 shadow-[0_30px_80px_rgba(68,44,29,.18)] transition duration-500 hover:rotate-0 sm:p-8">
                <div aria-hidden="true" className="absolute left-1/2 top-[-15px] h-8 w-28 -translate-x-1/2 -rotate-2 bg-[#e5d2c2]/80 shadow-sm" />
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-[#e6ddd6] bg-[#eee8e3]">
                  <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:32px_32px]" />
                  <span className="select-none font-serif text-[8rem] font-semibold leading-none text-[#d5c8bf] sm:text-[10rem]">404</span>
                  <div className="absolute bottom-5 left-5 rounded-full border border-[#c7b8ae] bg-[#f7f1eb]/80 px-3 py-1.5 text-[0.48rem] uppercase tracking-[0.18em] text-[#9c8c82]">image unavailable</div>
                </div>
                <div className="flex items-end justify-between gap-5 px-2 pb-1 pt-6">
                  <div><p className="font-serif text-xl italic text-[#342d29]">untitled missing fragment</p><p className="mt-2 text-[0.52rem] uppercase tracking-[0.2em] text-[#a89d96]">location unknown · date unrecorded</p></div>
                  <span className="shrink-0 rounded-full border border-[#c99d91] px-3 py-3 text-center text-[0.45rem] uppercase leading-4 tracking-[0.15em] text-[#ac7367]">not<br />found</span>
                </div>
              </div>

              <span aria-hidden="true" className="absolute right-[13%] top-[12%] font-serif text-3xl italic text-[#b5a59a]">?</span>
              <span aria-hidden="true" className="absolute bottom-[15%] left-[10%] text-xl text-[#c1afa4]">✦</span>
            </div>
          </section>

          <section className="flex flex-col items-center justify-between gap-5 border-t border-black/5 px-6 py-8 text-center sm:flex-row sm:px-10 lg:px-14">
            <p className="font-serif text-lg text-[#342d29]">Try a known corner of the archive.</p>
            <div className="flex flex-wrap justify-center gap-3"><Link href="/about" className="text-[0.58rem] uppercase tracking-[0.2em] text-[#776a62] transition hover:text-[#201c1a]">about me ↗</Link><span className="text-[#c8bdb2]">·</span><Link href="/resume" className="text-[0.58rem] uppercase tracking-[0.2em] text-[#776a62] transition hover:text-[#201c1a]">résumé ↗</Link><span className="text-[#c8bdb2]">·</span><Link href="/contact" className="text-[0.58rem] uppercase tracking-[0.2em] text-[#776a62] transition hover:text-[#201c1a]">send a note ↗</Link></div>
          </section>
        </div>

        <footer className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 pb-2 pt-7 text-[0.6rem] uppercase tracking-[0.26em] text-[#a89d96] sm:px-6"><span>Vanessa Gonzalez</span><span>anqclic / creative archive</span><span>© {new Date().getFullYear()}</span></footer>
      </div>

      <style>{`
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
      `}</style>
    </main>
  );
}
