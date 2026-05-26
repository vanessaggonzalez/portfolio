"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ─── EmailJS config ───────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail works great) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
//    In the template body use: {{from_name}}, {{from_email}}, {{reason}}, {{message}}
// 4. Go to Account → API Keys → copy your Public Key
// Then replace the three placeholder strings below:
const EMAILJS_SERVICE_ID  = "service_oiot1os";
const EMAILJS_TEMPLATE_ID = "template_o6cbsws";
const EMAILJS_PUBLIC_KEY  = "_Hp9G2yhoTs_ic58Q";
// ─────────────────────────────────────────────────────────────────

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

const reasons = [
  "Just saying hi",
  "Recruiting / opportunity",
  "Collaboration",
  "Creative project",
  "Something else",
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  useReveal();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canAdvanceStep1 = form.from_name.trim() && form.from_email.trim();
  const canAdvanceStep2 = form.reason.trim();
  const canSubmit = form.message.trim();

  async function handleSubmit() {
    setStatus("sending");
    try {
      // Dynamically import EmailJS so it's client-only
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          reason:     form.reason,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const navLinks = [
    { label: "Work",   href: "/work" },
    { label: "About",  href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      {/* GRAIN */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      {/* GLOW */}
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
                contact / let's talk
              </p>
              <h1 className="mt-4 font-serif text-[2.2rem] font-semibold leading-tight text-[#1f1a18] sm:text-[2.8rem]">
                Say hello.
              </h1>
              <p className="mt-5 text-[1.02rem] leading-8 text-[#4d413b]">
                Whether you're recruiting, collaborating, or just want to connect — I'd love to hear from you. Fill out the form below or reach me directly.
              </p>

              {/* DIRECT LINKS */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:vcnessaggonzalez@gmail.com"
                  className="flex items-center gap-2 rounded-full border border-black/8 bg-white/72 px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  <span className="text-[#a89d96]">✉</span> gmail
                </a>
                <a
                  href="https://www.linkedin.com/in/vanessa-g-gonzalez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-black/8 bg-white/72 px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  <span className="text-[#a89d96]">↗</span> linkedin
                </a>
                <a
                  href="https://www.instagram.com/anqclic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-black/8 bg-white/72 px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]"
                >
                  <span className="text-[#a89d96]">✦</span> instagram
                </a>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              send a message
            </div>

            {/* FORM CARD */}
            <div className="reveal-item mx-auto max-w-2xl" data-delay={80}>
              <div className="rounded-[32px] border border-black/5 bg-white/72 p-8 shadow-[0_24px_70px_rgba(68,44,29,0.07)] sm:p-10">

                {/* STEP INDICATOR */}
                {status !== "success" && (
                  <div className="mb-8 flex items-center gap-3">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.65rem] font-semibold tracking-wide transition-all duration-300 ${
                            step === s
                              ? "bg-[#201c1a] text-[#f7f1eb]"
                              : step > s
                              ? "bg-[#c8bdb2] text-white"
                              : "border border-black/10 bg-white/80 text-[#a89d96]"
                          }`}
                        >
                          {step > s ? "✓" : s}
                        </div>
                        {s < 3 && <span className="h-px w-6 bg-[#e0d8d2]" />}
                      </div>
                    ))}
                    <p className="ml-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#a89d96]">
                      {step === 1 ? "who are you?" : step === 2 ? "why are you writing?" : "your message"}
                    </p>
                  </div>
                )}

                {/* SUCCESS STATE */}
                {status === "success" ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0ebe6] text-[1.4rem]">
                      ✦
                    </div>
                    <h2 className="font-serif text-[1.5rem] font-semibold text-[#1f1a18]">Got it — thank you!</h2>
                    <p className="max-w-sm text-[0.95rem] leading-7 text-[#4d413b]">
                      I'll get back to you as soon as I can. In the meantime, feel free to explore my work.
                    </p>
                    <div className="mt-2 flex flex-wrap justify-center gap-3">
                      <Link
                        href="/work"
                        className="rounded-full bg-[#201c1a] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#f7f1eb] transition-all duration-200 hover:-translate-y-0.5"
                      >
                        see my work →
                      </Link>
                      <button
                        onClick={() => { setStatus("idle"); setStep(1); setForm({ from_name: "", from_email: "", reason: "", message: "" }); }}
                        className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] transition-all duration-200 hover:-translate-y-0.5"
                      >
                        send another
                      </button>
                    </div>
                  </div>
                ) : (

                  <div>
                    {/* STEP 1 — who are you */}
                    {step === 1 && (
                      <div className="form-step space-y-5">
                        <div>
                          <label className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                            your name
                          </label>
                          <input
                            type="text"
                            value={form.from_name}
                            onChange={(e) => set("from_name", e.target.value)}
                            placeholder="First and last"
                            className="mt-2 w-full rounded-[14px] border border-black/8 bg-[#fdfaf7] px-4 py-3 text-[0.95rem] text-[#201c1a] placeholder-[#c8bdb2] outline-none transition focus:border-[#a89d96] focus:ring-0"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                            your email
                          </label>
                          <input
                            type="email"
                            value={form.from_email}
                            onChange={(e) => set("from_email", e.target.value)}
                            placeholder="so I can write back"
                            className="mt-2 w-full rounded-[14px] border border-black/8 bg-[#fdfaf7] px-4 py-3 text-[0.95rem] text-[#201c1a] placeholder-[#c8bdb2] outline-none transition focus:border-[#a89d96] focus:ring-0"
                          />
                        </div>
                        <button
                          onClick={() => canAdvanceStep1 && setStep(2)}
                          disabled={!canAdvanceStep1}
                          className={`mt-2 rounded-full px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] transition-all duration-200 ${
                            canAdvanceStep1
                              ? "bg-[#201c1a] text-[#f7f1eb] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(32,28,26,0.15)]"
                              : "cursor-not-allowed bg-[#e8ddd6] text-[#b0a49d]"
                          }`}
                        >
                          next →
                        </button>
                      </div>
                    )}

                    {/* STEP 2 — why are you writing */}
                    {step === 2 && (
                      <div className="form-step space-y-5">
                        <div>
                          <label className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                            reason for reaching out
                          </label>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {reasons.map((r) => (
                              <button
                                key={r}
                                onClick={() => set("reason", r)}
                                className={`rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition-all duration-150 ${
                                  form.reason === r
                                    ? "border-[#201c1a] bg-[#201c1a] text-[#f7f1eb]"
                                    : "border-black/8 bg-[#fffaf6] text-[#7c7068] hover:border-[#a89d96]"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(1)}
                            className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#7c7068] transition-all duration-200 hover:-translate-y-0.5"
                          >
                            ← back
                          </button>
                          <button
                            onClick={() => canAdvanceStep2 && setStep(3)}
                            disabled={!canAdvanceStep2}
                            className={`rounded-full px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] transition-all duration-200 ${
                              canAdvanceStep2
                                ? "bg-[#201c1a] text-[#f7f1eb] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(32,28,26,0.15)]"
                                : "cursor-not-allowed bg-[#e8ddd6] text-[#b0a49d]"
                            }`}
                          >
                            next →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 — message */}
                    {step === 3 && (
                      <div className="form-step space-y-5">
                        {/* recap */}
                        <div className="rounded-[14px] border border-black/5 bg-[#fdfaf7] px-4 py-3 text-[0.78rem] leading-6 text-[#7c7068]">
                          <span className="text-[#201c1a]">{form.from_name}</span>
                          <span className="mx-2 text-[#c8bdb2]">·</span>
                          <span>{form.from_email}</span>
                          <span className="mx-2 text-[#c8bdb2]">·</span>
                          <span className="italic">{form.reason}</span>
                        </div>
                        <div>
                          <label className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                            your message
                          </label>
                          <textarea
                            value={form.message}
                            onChange={(e) => set("message", e.target.value)}
                            placeholder="Say whatever you'd like..."
                            rows={6}
                            className="mt-2 w-full rounded-[14px] border border-black/8 bg-[#fdfaf7] px-4 py-3 text-[0.95rem] text-[#201c1a] placeholder-[#c8bdb2] outline-none transition focus:border-[#a89d96] focus:ring-0 resize-none"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#7c7068] transition-all duration-200 hover:-translate-y-0.5"
                          >
                            ← back
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!canSubmit || status === "sending"}
                            className={`rounded-full px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] transition-all duration-200 ${
                              canSubmit && status !== "sending"
                                ? "bg-[#201c1a] text-[#f7f1eb] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(32,28,26,0.15)]"
                                : "cursor-not-allowed bg-[#e8ddd6] text-[#b0a49d]"
                            }`}
                          >
                            {status === "sending" ? "sending..." : "send it →"}
                          </button>
                        </div>
                        {status === "error" && (
                          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-red-400">
                            something went wrong — try emailing me directly.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
          .form-step {
            animation: stepIn 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes stepIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </main>
  );
}