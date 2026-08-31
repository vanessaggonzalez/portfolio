"use client";

import Link from "next/link";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useInstagramEmbed() {
  useEffect(() => {
    const win = window as typeof window & {
      instgrm?: { Embeds?: { process: () => void } };
    };

    if (win.instgrm?.Embeds) {
      win.instgrm.Embeds.process();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
  }, []);
}

const campaigns = [
  {
    url: "https://www.instagram.com/p/DW-G0ChD-mz/",
    eyebrow: "May 2025",
    title: "Graduate Send-Off",
    note: "Class of 2026 celebration collateral",
  },
  {
    url: "https://www.instagram.com/p/DWjr7F4lJUp/",
    eyebrow: "Community",
    title: "Meet the Eboard",
    note: "Putting people at the center of the organization",
  },
  {
    url: "https://www.instagram.com/p/DTa_4jtkuNm/",
    eyebrow: "January 2025",
    title: "Spring Launch",
    note: "A clear visual reset for a new semester",
  },
];

export default function WIECaseStudy() {
  useReveal();
  useInstagramEmbed();

  return (
    <main className="wie-page">
      <style jsx global>{`
        :root {
          --wie-ink: #142c35;
          --wie-muted: #62747a;
          --wie-paper: #f8f5ef;
          --wie-blue: #bfe4e8;
          --wie-deep: #173f49;
          --wie-coral: #ed806f;
          --wie-yellow: #f3c969;
          --wie-line: rgba(20, 44, 53, 0.14);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: var(--wie-paper); color: var(--wie-ink); }

        .wie-page {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 9% 15%, rgba(191, 228, 232, 0.5), transparent 24rem),
            radial-gradient(circle at 92% 42%, rgba(237, 128, 111, 0.12), transparent 28rem),
            var(--wie-paper);
          font-family: Arial, Helvetica, sans-serif;
        }

        .wie-outer { position: relative; z-index: 1; padding: 16px 40px; }
        .wie-frame {
          width: min(1280px, 100%);
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,.05);
          border-radius: 34px;
          background: rgba(255,255,255,.45);
          box-shadow: 0 30px 120px rgba(54,36,24,.06);
          backdrop-filter: blur(2px);
        }

        .wie-shell { width: min(1120px, calc(100% - 56px)); margin: 0 auto; }
        .wie-serif { font-family: Georgia, "Times New Roman", serif; }
        .wie-kicker {
          margin: 0 0 18px;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--wie-muted);
        }

        [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .75s ease, transform .75s ease; }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }

        .wie-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 26px 0;
          font-size: 11px;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .wie-topbar a { color: inherit; text-decoration: none; }
        .wie-topbar a:hover { opacity: .6; }

        .wie-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(380px, .98fr);
          min-height: 470px;
          border-top: 1px solid var(--wie-line);
          border-bottom: 1px solid var(--wie-line);
        }
        .wie-hero-copy { padding: 64px 54px; }
        .wie-hero-copy h1 {
          max-width: 720px;
          margin: 0;
          font: 600 clamp(43px, 4.8vw, 68px)/1.04 Georgia, "Times New Roman", serif;
          letter-spacing: -.045em;
        }
        .wie-hero-copy h1 em { display: block; color: var(--wie-coral); font-weight: 400; }
        .wie-hero-copy .lead {
          max-width: 560px;
          margin: 26px 0 0;
          font-size: 16px;
          line-height: 1.75;
          color: #40545a;
        }
        .wie-role {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          margin-top: 30px;
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--wie-muted);
        }

        .wie-network {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 470px;
          background: var(--wie-deep);
          overflow: hidden;
        }
        .wie-network::before,
        .wie-network::after {
          content: "";
          position: absolute;
          width: 330px;
          height: 330px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50%;
        }
        .wie-network::after { width: 470px; height: 470px; border-color: rgba(255,255,255,.08); }
        .wie-center {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 160px;
          height: 160px;
          padding: 28px;
          border-radius: 50%;
          background: var(--wie-yellow);
          text-align: center;
          box-shadow: 0 24px 70px rgba(0,0,0,.2);
        }
        .wie-center strong { font: 400 29px/1 Georgia, serif; }
        .wie-center span { margin-top: 10px; font-size: 9px; letter-spacing: .18em; text-transform: uppercase; }
        .wie-orbit {
          position: absolute;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 88px;
          height: 88px;
          padding: 14px;
          border-radius: 50%;
          background: #fffdf8;
          color: var(--wie-ink);
          text-align: center;
          font-size: 8px;
          line-height: 1.35;
          letter-spacing: .1em;
          text-transform: uppercase;
          box-shadow: 0 16px 40px rgba(0,0,0,.18);
        }
        .wie-orbit.one { top: 15%; left: 17%; }
        .wie-orbit.two { top: 19%; right: 13%; }
        .wie-orbit.three { bottom: 13%; left: 17%; }
        .wie-orbit.four { right: 14%; bottom: 17%; }
        .wie-network-note {
          position: absolute;
          right: 24px;
          bottom: 20px;
          color: rgba(255,255,255,.55);
          font-size: 9px;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .wie-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--wie-line);
        }
        .wie-metric { padding: 32px 24px; border-right: 1px solid var(--wie-line); }
        .wie-metric:last-child { border-right: 0; }
        .wie-metric strong { display: block; font: 400 34px/1 Georgia, serif; }
        .wie-metric span { display: block; margin-top: 10px; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: var(--wie-muted); }

        .wie-thesis {
          display: grid;
          grid-template-columns: .58fr 1.42fr;
          gap: 70px;
          padding: 72px 0;
          border-bottom: 1px solid var(--wie-line);
        }
        .wie-thesis blockquote { margin: 0; font: 400 clamp(27px, 3vw, 38px)/1.32 Georgia, serif; letter-spacing: -.025em; }
        .wie-thesis blockquote em { color: var(--wie-coral); font-weight: 400; }
        .wie-thesis-body { max-width: 720px; }
        .wie-thesis-body p { margin: 0 0 22px; font-size: 17px; line-height: 1.78; color: #40545a; }

        .wie-retention { padding: 72px 0; }
        .wie-section-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 55px; }
        .wie-section-head h2 { max-width: 780px; margin: 0; font: 600 clamp(31px, 3.5vw, 44px)/1.08 Georgia, serif; letter-spacing: -.035em; }
        .wie-section-head p { max-width: 350px; margin: 0; line-height: 1.65; color: var(--wie-muted); }
        .wie-team-stage {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: var(--wie-line);
          border: 1px solid var(--wie-line);
        }
        .wie-person { position: relative; min-height: 305px; padding: 30px; background: #fffdf9; }
        .wie-person::before {
          content: "";
          display: block;
          width: 76px;
          height: 76px;
          margin: 38px auto 24px;
          border-radius: 50%;
          background: var(--tone, var(--wie-blue));
        }
        .wie-person::after {
          content: "";
          display: block;
          width: 126px;
          height: 64px;
          margin: -8px auto 24px;
          border-radius: 70px 70px 8px 8px;
          background: var(--tone, var(--wie-blue));
        }
        .wie-person:nth-child(2) { --tone: #f0cbd0; }
        .wie-person:nth-child(3) { --tone: #f3d797; }
        .wie-person:nth-child(4) { --tone: #c9d8ef; }
        .wie-person small { position: absolute; top: 24px; left: 26px; font-size: 9px; letter-spacing: .17em; text-transform: uppercase; color: var(--wie-muted); }
        .wie-person strong { display: block; text-align: center; font: 400 19px Georgia, serif; }
        .wie-returned { margin: 34px 0 0; font: 400 clamp(24px, 2.8vw, 42px)/1.25 Georgia, serif; text-align: center; }
        .wie-returned em { color: var(--wie-coral); font-weight: 400; }

        .wie-pipeline-wrap { padding: 72px 0; background: #e7f1f0; }
        .wie-pipeline { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 50px; }
        .wie-step { position: relative; padding: 32px 34px 40px; border-top: 1px solid rgba(20,44,53,.22); }
        .wie-step:not(:last-child)::after { content: "→"; position: absolute; top: 30px; right: -7px; z-index: 2; font-size: 20px; color: var(--wie-coral); }
        .wie-step span { font: 400 50px/1 Georgia, serif; color: rgba(20,44,53,.18); }
        .wie-step h3 { margin: 30px 0 12px; font: 400 24px Georgia, serif; }
        .wie-step p { margin: 0; line-height: 1.65; color: var(--wie-muted); }

        .wie-scope { display: grid; grid-template-columns: .85fr 1.15fr; gap: 70px; padding: 72px 0; }
        .wie-scope h2 { margin: 0; font: 600 clamp(31px, 3.5vw, 44px)/1.08 Georgia, serif; letter-spacing: -.035em; }
        .wie-scope-list { border-top: 1px solid var(--wie-line); }
        .wie-scope-row { display: grid; grid-template-columns: 180px 1fr; gap: 28px; padding: 27px 0; border-bottom: 1px solid var(--wie-line); }
        .wie-scope-row strong { font: 400 18px Georgia, serif; }
        .wie-scope-row p { margin: 0; line-height: 1.65; color: var(--wie-muted); }

        .wie-web { padding: 72px 0; color: #f8f5ef; background: var(--wie-deep); }
        .wie-web-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 80px; align-items: center; }
        .wie-web-copy h2 { margin: 0 0 28px; font: 600 clamp(31px, 3.5vw, 44px)/1.08 Georgia, serif; letter-spacing: -.035em; }
        .wie-web-copy p { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,.7); }
        .wie-browser { transform: rotate(1.2deg); border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 35px 80px rgba(0,0,0,.28); color: var(--wie-ink); }
        .wie-browser-bar { display: flex; gap: 7px; align-items: center; padding: 14px 18px; background: #e8e5df; }
        .wie-browser-bar i { width: 9px; height: 9px; border-radius: 50%; background: #aeb8ba; }
        .wie-browser-body { display: grid; grid-template-columns: 150px 1fr; min-height: 330px; }
        .wie-browser-nav { padding: 25px 18px; background: #f2f5f5; font-size: 10px; letter-spacing: .11em; line-height: 3; text-transform: uppercase; }
        .wie-browser-content { padding: 34px; }
        .wie-browser-content h3 { margin: 0 0 14px; font: 400 30px Georgia, serif; }
        .wie-browser-content p { max-width: 460px; line-height: 1.6; color: var(--wie-muted); }
        .wie-content-lines { display: grid; gap: 12px; margin-top: 30px; }
        .wie-content-lines span { height: 12px; border-radius: 20px; background: #d7e8e8; }
        .wie-content-lines span:nth-child(2) { width: 82%; }
        .wie-content-lines span:nth-child(3) { width: 63%; background: #f2d0c9; }

        .wie-campaigns { padding: 72px 0; }
        .wie-reel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .wie-post { min-width: 0; }
        .wie-post-frame { height: 500px; overflow: hidden; border: 1px solid var(--wie-line); border-radius: 18px; background: #fff; }
        .wie-post-frame blockquote { min-width: 100% !important; width: 100% !important; margin: 0 !important; }
        .wie-post-meta { padding: 18px 4px 0; }
        .wie-post-meta small { font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: var(--wie-coral); }
        .wie-post-meta h3 { margin: 9px 0 5px; font: 400 22px Georgia, serif; }
        .wie-post-meta p { margin: 0; font-size: 13px; color: var(--wie-muted); }
        .wie-external { display: inline-block; margin-top: 36px; color: inherit; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 6px; }

        .wie-outcome { padding: 78px 0; text-align: center; background: var(--wie-yellow); }
        .wie-outcome .wie-kicker { color: rgba(20,44,53,.65); }
        .wie-outcome h2 { max-width: 900px; margin: 0 auto; font: 600 clamp(34px, 4vw, 52px)/1.08 Georgia, serif; letter-spacing: -.04em; }
        .wie-outcome p { max-width: 650px; margin: 34px auto 0; font-size: 17px; line-height: 1.7; }

        .wie-next { display: grid; grid-template-columns: 1fr 1fr; }
        .wie-next a { padding: 60px max(24px, calc((100vw - 1180px) / 2)); color: inherit; text-decoration: none; border-right: 1px solid var(--wie-line); }
        .wie-next a:last-child { border-right: 0; text-align: right; }
        .wie-next small { font-size: 9px; letter-spacing: .18em; text-transform: uppercase; color: var(--wie-muted); }
        .wie-next strong { display: block; margin-top: 10px; font: 400 26px Georgia, serif; }

        @media (max-width: 900px) {
          .wie-outer { padding: 16px 24px; }
          .wie-hero { grid-template-columns: 1fr; }
          .wie-hero-copy { padding: 70px 24px; }
          .wie-network { min-height: 520px; }
          .wie-metrics { grid-template-columns: 1fr 1fr; }
          .wie-metric:nth-child(2) { border-right: 0; }
          .wie-metric:nth-child(-n+2) { border-bottom: 1px solid var(--wie-line); }
          .wie-thesis, .wie-scope, .wie-web-grid { grid-template-columns: 1fr; gap: 45px; }
          .wie-team-stage { grid-template-columns: 1fr 1fr; }
          .wie-pipeline { grid-template-columns: 1fr 1fr; }
          .wie-step:nth-child(2)::after { display: none; }
          .wie-reel { grid-template-columns: 1fr; }
          .wie-post-frame { height: 650px; }
        }

        @media (max-width: 600px) {
          .wie-outer { padding: 10px; }
          .wie-frame { border-radius: 24px; }
          .wie-shell { width: min(100% - 28px, 1180px); }
          .wie-topbar { padding: 22px 0; }
          .wie-hero-copy h1 { font-size: 43px; }
          .wie-network { min-height: 440px; }
          .wie-center { width: 155px; height: 155px; }
          .wie-center strong { font-size: 27px; }
          .wie-orbit { width: 82px; height: 82px; font-size: 8px; }
          .wie-orbit.one, .wie-orbit.three { left: 7%; }
          .wie-orbit.two, .wie-orbit.four { right: 7%; }
          .wie-thesis, .wie-retention, .wie-scope, .wie-campaigns { padding: 82px 0; }
          .wie-section-head { display: block; }
          .wie-section-head p { margin-top: 22px; }
          .wie-team-stage { grid-template-columns: 1fr 1fr; }
          .wie-person { min-height: 245px; padding: 18px; }
          .wie-person::before { width: 55px; height: 55px; }
          .wie-person::after { width: 88px; height: 48px; }
          .wie-pipeline { grid-template-columns: 1fr; }
          .wie-step::after { display: none; }
          .wie-scope-row { grid-template-columns: 1fr; gap: 9px; }
          .wie-browser-body { grid-template-columns: 92px 1fr; }
          .wie-browser-content { padding: 24px 18px; }
          .wie-post-frame { height: 510px; }
          .wie-next a { padding: 42px 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="wie-outer"><div className="wie-frame">
      <nav className="wie-topbar wie-shell" aria-label="Case study navigation">
        <Link href="/work">← Selected work</Link>
        <span>USC Viterbi · Women in Engineering</span>
      </nav>

      <header className="wie-hero">
        <div className="wie-hero-copy" data-reveal>
          <p className="wie-kicker">Director of Marketing · Second Consecutive Term</p>
          <h1>
            Building the systems
            <em>behind belonging.</em>
          </h1>
          <p className="lead">
            I lead marketing for USC Viterbi Women in Engineering—turning a busy
            calendar of programs, resources, and student stories into one clear,
            recognizable community presence.
          </p>
          <div className="wie-role">
            <span>Team Leadership</span><span>Digital Operations</span>
            <span>Community Brand</span><span>Web Management</span>
          </div>
        </div>

        <div className="wie-network" aria-label="Women in Engineering community network visual">
          <div className="wie-center">
            <strong>WIE</strong>
            <span>One connected community</span>
          </div>
          <div className="wie-orbit one">Events + Outreach</div>
          <div className="wie-orbit two">Resources + Mentorship</div>
          <div className="wie-orbit three">Student Community</div>
          <div className="wie-orbit four">Cross-platform Media</div>
          <span className="wie-network-note">Marketing connects the system</span>
        </div>
      </header>

      <section className="wie-metrics">
        <div className="wie-metric"><strong>02</strong><span>Consecutive terms</span></div>
        <div className="wie-metric"><strong>100%</strong><span>Associate director retention</span></div>
        <div className="wie-metric"><strong>04</strong><span>People on marketing</span></div>
        <div className="wie-metric"><strong>04</strong><span>Connected media channels</span></div>
      </section>

      <section className="wie-thesis wie-shell" data-reveal>
        <p className="wie-kicker">The assignment</p>
        <div className="wie-thesis-body">
          <blockquote>
            Brand consistency is not only visual. In a student organization, it is a form of <em>community trust.</em>
          </blockquote>
          <p>
            WIE supports undergraduate and graduate women across engineering through
            outreach, professional development, mentorship, and shared resources. My
            job is to make that work easy to find, understand, and feel part of.
          </p>
          <p>
            That meant treating marketing as infrastructure: a dependable intake
            process for internal teams, a repeatable publishing rhythm, and a visual
            language that could hold many programs without becoming fragmented.
          </p>
        </div>
      </section>

      <section className="wie-retention wie-shell" data-reveal>
        <div className="wie-section-head">
          <div>
            <p className="wie-kicker">01 · Leadership & retention</p>
            <h2>A team people chose to return to.</h2>
          </div>
          <p>
            Clear ownership, useful systems, and room to contribute turned a group of
            individual creatives into a steady marketing function.
          </p>
        </div>
        <div className="wie-team-stage">
          <div className="wie-person"><small>Director</small><strong>Marketing lead</strong></div>
          <div className="wie-person"><small>Returned</small><strong>Associate Director</strong></div>
          <div className="wie-person"><small>Returned</small><strong>Associate Director</strong></div>
          <div className="wie-person"><small>Returned</small><strong>Associate Director</strong></div>
        </div>
        <p className="wie-returned">
          My entire three-person associate director team returned for a second term—<em>100% retention.</em>
        </p>
      </section>

      <section className="wie-pipeline-wrap" data-reveal>
        <div className="wie-shell">
          <p className="wie-kicker">02 · Cross-team operations</p>
          <div className="wie-section-head">
            <h2>One path from request to community.</h2>
            <p>
              A centralized workflow helped events, outreach, and professional
              development teams get the right asset to the right channel.
            </p>
          </div>
          <div className="wie-pipeline">
            <div className="wie-step"><span>01</span><h3>Request</h3><p>Bring collateral, reel, or digital asset needs into one shared intake.</p></div>
            <div className="wie-step"><span>02</span><h3>Prioritize</h3><p>Clarify audience, deadline, channel, and what success should look like.</p></div>
            <div className="wie-step"><span>03</span><h3>Produce</h3><p>Build within a consistent visual system using Canva and Figma.</p></div>
            <div className="wie-step"><span>04</span><h3>Publish</h3><p>Coordinate Instagram, Canvas, and WordPress so the message travels.</p></div>
          </div>
        </div>
      </section>

      <section className="wie-scope wie-shell" data-reveal>
        <div>
          <p className="wie-kicker">What the system supports</p>
          <h2>Different needs. One community voice.</h2>
        </div>
        <div className="wie-scope-list">
          <div className="wie-scope-row"><strong>Events & outreach</strong><p>Promoting STEM initiatives for USC students and local youth.</p></div>
          <div className="wie-scope-row"><strong>Resources & mentorship</strong><p>Connecting women in engineering with career resources, faculty mentorship, and peer networks.</p></div>
          <div className="wie-scope-row"><strong>Community growth</strong><p>Creating an inclusive shared space for undergraduate and graduate women across engineering disciplines.</p></div>
          <div className="wie-scope-row"><strong>Cross-platform media</strong><p>Carrying the same message across Instagram, Canvas, and the WIE website.</p></div>
        </div>
      </section>

      <section className="wie-web" data-reveal>
        <div className="wie-shell wie-web-grid">
          <div className="wie-web-copy">
            <p className="wie-kicker">03 · Web management</p>
            <h2>Designing clearly inside real constraints.</h2>
            <p>
              With restricted administrative permissions in USC&apos;s Cornerstone
              WordPress environment, I focused on the layer I could shape: content
              hierarchy, organization, and maintenance.
            </p>
            <p>
              Resource pages, event archives, and student information became easier to
              navigate—without pretending the platform constraints did not exist.
            </p>
            <a className="wie-external" href="https://viterbiundergrad.usc.edu/wie-website/" target="_blank" rel="noreferrer">Visit the WIE website ↗</a>
          </div>
          <div className="wie-browser" aria-label="Abstract website content management interface">
            <div className="wie-browser-bar"><i /><i /><i /></div>
            <div className="wie-browser-body">
              <div className="wie-browser-nav">Home<br />Resources<br />Mentorship<br />Events<br />Archive</div>
              <div className="wie-browser-content">
                <p className="wie-kicker">Women in Engineering</p>
                <h3>Find what you need.</h3>
                <p>A clearer content hierarchy for programs, opportunities, and community information.</p>
                <div className="wie-content-lines"><span /><span /><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wie-campaigns wie-shell" data-reveal>
        <div className="wie-section-head">
          <div>
            <p className="wie-kicker">04 · In the feed</p>
            <h2>Campaign moments from the community.</h2>
          </div>
          <p>Not isolated posts—a living archive of milestones, people, and semester rhythms.</p>
        </div>
        <div className="wie-reel">
          {campaigns.map((campaign) => (
            <article className="wie-post" key={campaign.url}>
              <div className="wie-post-frame">
                <blockquote className="instagram-media" data-instgrm-permalink={campaign.url} data-instgrm-version="14" />
              </div>
              <div className="wie-post-meta">
                <small>{campaign.eyebrow}</small>
                <h3>{campaign.title}</h3>
                <p>{campaign.note}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="wie-external" href="https://www.instagram.com/usc.viterbi.wie/" target="_blank" rel="noreferrer">Explore @usc.viterbi.wie ↗</a>
      </section>

      <section className="wie-outcome" data-reveal>
        <div className="wie-shell">
          <p className="wie-kicker">The result</p>
          <h2>A recognizable presence built to make people feel included.</h2>
          <p>
            Standardized templates, clearer intake timelines, and coordinated publishing
            gave WIE a more dependable voice—while a returning team kept the system and
            its relationships growing from one term to the next.
          </p>
        </div>
      </section>

      <footer className="wie-next">
        <Link href="/work/sharemeal"><small>Previous project</small><strong>← ShareMeal</strong></Link>
        <Link href="/work"><small>End of the collection</small><strong>All selected work →</strong></Link>
      </footer>
      </div></div>
    </main>
  );
}
