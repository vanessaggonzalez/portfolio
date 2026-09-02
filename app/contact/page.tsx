"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

const EMAILJS_SERVICE_ID = "service_oiot1os";
const EMAILJS_TEMPLATE_ID = "template_o6cbsws";
const EMAILJS_PUBLIC_KEY = "_Hp9G2yhoTs_ic58Q";

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      setTimeout(() => element.classList.add("revealed"), Number(element.dataset.delay ?? 0));
      observer.unobserve(element);
    }), { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

const reasons = ["Recruiting / opportunity", "Collaboration", "Creative project", "Just saying hi", "Something else"];
type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ from_name: "", from_email: "", reason: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const set = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const valid = form.from_name.trim() && form.from_email.trim() && form.reason && form.message.trim();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const reset = () => {
    setForm({ from_name: "", from_email: "", reason: "", message: "" });
    setStatus("idle");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efdcd7]/55 blur-[120px]" />

      <div className="relative z-10 px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-black/5 bg-white/45 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px]">
          <header className="flex items-center justify-between gap-4 px-5 py-5 text-sm uppercase tracking-[0.22em] text-[#5f554f] sm:px-8 sm:py-7">
            <Link href="/" className="text-[0.72rem] tracking-[0.28em] text-[#7c7068]">← home</Link>
            <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">{[["Work", "/work"], ["About", "/about"], ["Resume", "/resume"], ["Contact", "/contact"]].map(([label, href]) => <Link key={label} href={href} className="transition hover:text-[#201c1a]">{label}</Link>)}</nav>
          </header>

          <section className="grid border-t border-black/5 lg:grid-cols-[0.78fr_1.22fr]">
            {/* DIRECT CONTACT */}
            <div className="reveal-item flex flex-col justify-center border-b border-black/5 px-6 py-14 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-20" data-delay={0}>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#9a8c84]">contact / the open line</p>
              <h1 className="mt-5 font-serif text-[2.8rem] font-semibold leading-[1.03] text-[#1f1a18] sm:text-[4rem]">Let’s make something thoughtful.</h1>
              <p className="mt-6 max-w-lg text-[1rem] leading-8 text-[#4d413b]">Whether you’re recruiting, collaborating, or simply found something here that made you curious, I’d love to hear from you.</p>

              <div className="mt-9 divide-y divide-black/5 border-y border-black/5">
                <a href="mailto:vcnessaggonzalez@gmail.com" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5">
                  <div><p className="text-[0.55rem] uppercase tracking-[0.23em] text-[#a89d96]">email · best way to reach me</p><p className="mt-2 font-serif text-lg text-[#342d29]">vcnessaggonzalez@gmail.com</p></div><span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a href="https://www.linkedin.com/in/vanessa-g-gonzalez" target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5">
                  <div><p className="text-[0.55rem] uppercase tracking-[0.23em] text-[#a89d96]">professional archive</p><p className="mt-2 font-serif text-lg text-[#342d29]">LinkedIn</p></div><span className="transition group-hover:translate-x-1">↗</span>
                </a>
                <a href="https://www.instagram.com/anqclic/" target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5">
                  <div><p className="text-[0.55rem] uppercase tracking-[0.23em] text-[#a89d96]">creative archive</p><p className="mt-2 font-serif text-lg text-[#342d29]">@anqclic</p></div><span className="transition group-hover:translate-x-1">↗</span>
                </a>
              </div>

              <div className="mt-9 rotate-[-1deg] border border-[#d9c9bd] bg-[#fffaf6] px-5 py-4 shadow-[0_12px_30px_rgba(68,44,29,0.06)]">
                <p className="font-serif text-[1rem] italic text-[#5e5048]">currently writing from Los Angeles</p>
                <p className="mt-2 text-[0.52rem] uppercase tracking-[0.22em] text-[#a89d96]">USC · CS + Business · graduating May 2027</p>
              </div>
            </div>

            {/* LETTER DESK */}
            <div className="reveal-item relative overflow-hidden bg-gradient-to-br from-[#e9dcd1] via-[#f5ece5] to-[#dfd0c6] p-6 sm:p-10 lg:p-14" data-delay={80}>
              <div aria-hidden="true" className="absolute left-9 top-8 h-20 w-24 -rotate-6 bg-[#d9c2ae]/55 shadow-sm" />
              <div aria-hidden="true" className="absolute bottom-8 right-8 rotate-6 font-serif text-[0.72rem] italic text-[#8b7c73]">postmarked with intention ✦</div>

              <div className="relative mx-auto max-w-2xl rotate-[0.4deg] bg-[#fffdf9] p-7 shadow-[0_28px_70px_rgba(68,44,29,0.15)] sm:p-10">
                <div className="mb-9 flex items-start justify-between gap-5 border-b border-[#eadfd7] pb-7">
                  <div><p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#aa9588]">send a note</p><p className="mt-2 font-serif text-2xl text-[#342d29]">A message for Vanessa</p></div>
                  <div className="relative grid h-20 w-16 place-items-center border border-dashed border-[#c9a997] bg-[#f5e5dc] text-center text-[#9d7665]"><span className="font-serif text-2xl">V</span><span className="absolute bottom-1 text-[0.38rem] uppercase tracking-[0.15em]">Los Angeles</span></div>
                </div>

                {status === "success" ? (
                  <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
                    <div className="message-stamp grid h-28 w-28 place-items-center rounded-full border-2 border-[#9c695d] text-[#9c695d]"><div><p className="font-serif text-xl italic">delivered</p><p className="mt-1 text-[0.42rem] uppercase tracking-[0.22em]">Los Angeles · CA</p></div></div>
                    <h2 className="mt-8 font-serif text-[2rem] text-[#342d29]">Your note is on its way.</h2>
                    <p className="mt-4 max-w-sm text-[0.84rem] leading-7 text-[#6b5d55]">Thank you for reaching out. I’ll write back as soon as I can.</p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/work" className="rounded-full bg-[#342d29] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white">explore my work →</Link><button onClick={reset} className="rounded-full border border-black/10 px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#6b5d55]">send another</button></div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block"><span className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">from / name</span><input required value={form.from_name} onChange={(event) => set("from_name", event.target.value)} placeholder="First and last" className="mt-2 w-full border-0 border-b border-[#d8cbc2] bg-transparent px-0 py-3 text-[0.9rem] text-[#342d29] outline-none placeholder:text-[#c8bdb2] focus:border-[#8d7567] focus:ring-0" /></label>
                      <label className="block"><span className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">return address / email</span><input required type="email" value={form.from_email} onChange={(event) => set("from_email", event.target.value)} placeholder="So I can write back" className="mt-2 w-full border-0 border-b border-[#d8cbc2] bg-transparent px-0 py-3 text-[0.9rem] text-[#342d29] outline-none placeholder:text-[#c8bdb2] focus:border-[#8d7567] focus:ring-0" /></label>
                    </div>

                    <fieldset><legend className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">about this note</legend><div className="mt-3 flex flex-wrap gap-2">{reasons.map((reason) => <button type="button" key={reason} onClick={() => set("reason", reason)} className={`rounded-full border px-3 py-2 text-[0.56rem] uppercase tracking-[0.15em] transition ${form.reason === reason ? "border-[#5b493e] bg-[#5b493e] text-white" : "border-[#ded2ca] bg-[#fffaf6] text-[#7c7068] hover:border-[#aa9588]"}`}>{reason}</button>)}</div></fieldset>

                    <label className="block"><span className="text-[0.55rem] uppercase tracking-[0.24em] text-[#a89d96]">your message</span><textarea required value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="Write whatever you’d like..." rows={7} className="letter-lines mt-3 w-full resize-none border-0 bg-transparent px-0 py-1 text-[0.9rem] leading-8 text-[#342d29] outline-none placeholder:text-[#c8bdb2] focus:ring-0" /></label>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eadfd7] pt-6">
                      <p className="text-[0.5rem] uppercase tracking-[0.18em] text-[#b4a59c]">sent directly to my inbox</p>
                      <button disabled={!valid || status === "sending"} className={`rounded-full px-6 py-3 text-[0.62rem] uppercase tracking-[0.21em] transition ${valid && status !== "sending" ? "bg-[#342d29] text-white shadow-[0_8px_22px_rgba(52,45,41,.16)] hover:-translate-y-0.5" : "cursor-not-allowed bg-[#e8dfd9] text-[#b3a69e]"}`}>{status === "sending" ? "sending..." : "send the note →"}</button>
                    </div>
                    {status === "error" && <p role="alert" className="text-[0.62rem] uppercase tracking-[0.17em] text-[#b75e57]">Something went wrong—please email me directly instead.</p>}
                  </form>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center justify-between gap-5 border-t border-black/5 px-6 py-9 text-center sm:flex-row sm:px-10 lg:px-14"><p className="font-serif text-xl text-[#342d29]">Prefer the work first?</p><div className="flex flex-wrap justify-center gap-3"><Link href="/work" className="rounded-full bg-[#201c1a] px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white">selected work →</Link><Link href="/resume" className="rounded-full border border-black/10 bg-white px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#5f554f]">résumé →</Link></div></section>
        </div>

        <footer className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-6 pt-7 text-[0.6rem] uppercase tracking-[0.26em] text-[#a89d96] sm:px-6"><span>Vanessa Gonzalez</span><span>anqclic / creative archive</span><span>© {new Date().getFullYear()}</span></footer>
      </div>

      <style>{`
        .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1); }
        .reveal-item.revealed { opacity: 1; transform: translateY(0); }
        .grain-overlay { opacity: .055; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size: 280px 280px; }
        .letter-lines { background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 31px, #e9dfd7 32px); background-attachment: local; }
        .message-stamp { transform: rotate(-8deg); animation: stampIn 520ms cubic-bezier(.2,.9,.3,1.3) both; }
        @keyframes stampIn { from { opacity: 0; transform: scale(1.5) rotate(-3deg); } to { opacity: 1; transform: scale(1) rotate(-8deg); } }
        @media (prefers-reduced-motion: reduce) { .reveal-item { opacity: 1; transform: none; transition: none; } .message-stamp { animation: none; } }
      `}</style>
    </main>
  );
}
