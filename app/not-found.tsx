"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      {/* GRAIN */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      {/* GLOW */}
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="px-4 py-4 sm:px-6 lg:px-10 flex-1 flex flex-col">
          <div className="mx-auto w-full max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8 flex-1 flex flex-col">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link href="/" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">
                ← home
              </Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6 text-[0.72rem]">
                <Link href="/work" className="transition hover:text-[#201c1a]">Work</Link>
                <Link href="/about" className="transition hover:text-[#201c1a]">About</Link>
                <Link href="/contact" className="transition hover:text-[#201c1a]">Contact</Link>
              </nav>
            </header>

            {/* MAIN CONTENT */}
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">

              {/* BIG 404 */}
              <div
                className="select-none font-serif leading-none text-[#e8ddd6]"
                style={{
                  fontSize: "clamp(7rem, 22vw, 18rem)",
                  fontWeight: 600,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                404
              </div>

              {/* TEXT BLOCK */}
              <div
                className="mt-[-1rem] max-w-md"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 800ms 120ms cubic-bezier(0.22,1,0.36,1), transform 800ms 120ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#a89d96]">
                  page not found
                </p>
                <h1 className="mt-4 font-serif text-[1.8rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.2rem]">
                  This page doesn't exist.
                </h1>
                <p className="mt-4 text-[0.97rem] leading-8 text-[#4d413b]">
                  You might have followed a broken link, or this page moved somewhere else. Either way — nothing to see here.
                </p>
              </div>

              {/* DIVIDER */}
              <div
                className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 800ms 200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span className="h-px w-8 bg-[#c8bdb2]" />
                find your way back
                <span className="h-px w-8 bg-[#c8bdb2]" />
              </div>

              {/* LINKS */}
              <div
                className="flex flex-wrap justify-center gap-3"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 800ms 260ms cubic-bezier(0.22,1,0.36,1), transform 800ms 260ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <Link
                  href="/"
                  className="rounded-full border border-black/8 bg-white/72 px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
                >
                  ← home
                </Link>
                <Link
                  href="/work"
                  className="rounded-full border border-black/8 bg-white/72 px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
                >
                  work
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-black/8 bg-white/72 px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)] hover:text-[#201c1a]"
                >
                  contact
                </Link>
              </div>

              {/* LITTLE FLOURISH */}
              <p
                className="mt-12 text-[0.68rem] uppercase tracking-[0.3em] text-[#c8bdb2]"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 800ms 360ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                ✦ anqclic / creative archive
              </p>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between border-t border-black/5 pt-6 text-[0.68rem] uppercase tracking-[0.3em] text-[#a89d96]">
            <span>Vanessa Gonzalez</span>
            <span>anqclic / creative archive</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>

      <style>{`
        .grain-overlay {
          opacity: 0.06;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 280px 280px;
          background-repeat: repeat;
        }
      `}</style>
    </main>
  );
}