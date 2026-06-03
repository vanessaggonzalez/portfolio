"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

const LASTFM_API_KEY = "c23c1a26f6c242882d28b082dfa38a24";
const LASTFM_USER = "malfcytrash";
const TMDB_KEY = "e08466a6e15057915ef671c8d3314b76";

type Track = {
  name: string;
  artist: string;
  image: string;
  url: string;
  isNowPlaying: boolean;
};

function useLastFm() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [topArtist, setTopArtist] = useState<{ name: string; plays: string } | null>(null);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=5`
        );
        const data = await res.json();
        const raw = data?.recenttracks?.track ?? [];
        const trackList = Array.isArray(raw) ? raw : [raw];
        const recent: Track[] = trackList.map((t: any, i: number) => {
          const imgUrl = t.image?.find((img: any) => img.size === "large")?.["#text"] ?? "";
          return {
            name: t.name ?? "",
            artist: t.artist?.["#text"] ?? "",
            image: imgUrl.includes("2a96cbd8b46e442fc41c2b86b821562f") ? "" : imgUrl,
            url: t.url ?? "",
            isNowPlaying: i === 0 && t["@attr"]?.nowplaying === "true",
          };
        });
        setTracks(recent);
      } catch (e) {
        console.error("lastfm recent tracks error:", e);
      }
    }
    async function fetchTopArtist() {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1&period=7day`
        );
        const data = await res.json();
        const artist = data?.topartists?.artist?.[0];
        if (artist) setTopArtist({ name: artist.name, plays: artist.playcount });
      } catch (e) {
        console.error("lastfm top artists error:", e);
      }
    }
    fetchRecent();
    fetchTopArtist();
    const interval = setInterval(fetchRecent, 30_000);
    return () => clearInterval(interval);
  }, []);

  return { tracks, topArtist };
}

type Poster = { title: string; poster: string; note: string; type: "movie" | "tv" };

function usePosters(items: { title: string; note: string; type: "movie" | "tv" }[]) {
  const [posters, setPosters] = useState<Poster[]>(items.map((s) => ({ ...s, poster: "" })));
  useEffect(() => {
    if (!TMDB_KEY) return;
    async function fetchAll() {
      const results = await Promise.all(
        items.map(async (item) => {
          try {
            const endpoint = item.type === "movie" ? "search/movie" : "search/tv";
            const res = await fetch(
              `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_KEY}&query=${encodeURIComponent(item.title)}&page=1`
            );
            const data = await res.json();
            const path = data?.results?.[0]?.poster_path ?? "";
            return { ...item, poster: path ? `https://image.tmdb.org/t/p/w300${path}` : "" };
          } catch {
            return { ...item, poster: "" };
          }
        })
      );
      setPosters(results);
    }
    fetchAll();
  }, []);
  return posters;
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const myPhotos = [
  { src: "/images/vanessa1.jpg", alt: "Vanessa", caption: "vanessa" },
  { src: "/images/vanessa2.jpg", alt: "Vanessa at the Huntington", caption: "at the huntington" },
];

const ships = [
  {
    pair: "Ron & Hermione",
    from: "Harry Potter",
    note: "the original. always.",
    gifId: "tQ0USPyQfN1xm",
  },
  {
    pair: "Han & Leia",
    from: "Star Wars",
    note: "enemies to lovers before it had a name",
    gifId: "lBIvtWjqWseLC",
  },
  {
    pair: "Dan & Blair",
    from: "Gossip Girl",
    note: "unexpected and that's the point",
    gifId: "p4gPC9wMVLfG0",
  },
  {
    pair: "Nancy & Jonathan",
    from: "Stranger Things",
    note: "soft and steady",
    gifId: "3o7aDbX8g5rNzOzfyw",
  },
  {
    pair: "Jake & Amy",
    from: "Brooklyn 99",
    note: "titles are hard but they try",
    gifId: "3osxY4WQT34ONC60XC",
  },
  {
    pair: "Chandler & Monica",
    from: "Friends",
    note: "best friends first, always",
    gifId: "105C2a2ieQtW00",
  },
];

const films = [
  { title: "The Great Gatsby", note: "baz luhrmann", type: "movie" as const },
  { title: "Perks of Being a Wallflower", note: "opened my eyes", type: "movie" as const },
  { title: "Little Women", note: "greta gerwig", type: "movie" as const },
  { title: "Once Upon a Time in Hollywood", note: "tarantino", type: "movie" as const },
  { title: "La La Land", note: "chazelle", type: "movie" as const },
];

const watchingShows = [
  { title: "New Girl", note: "first watch with my boyfriend", type: "tv" as const },
  { title: "That '70s Show", note: "rewatch — Jackie & Hyde agenda", type: "tv" as const },
  { title: "Abbott Elementary", note: "just finished, obsessed", type: "tv" as const },
  { title: "Gossip Girl", note: "rewatching before NYC", type: "tv" as const },
  { title: "The Vampire Diaries", note: "almost done with rewatch", type: "tv" as const },
];

const concertLog = [
  {
    artist: "Ariana Grande",
    tour: "Eternal Sunshine World Tour",
    dates: "June 13, 2026",
    note: "next week!!!",
    upcoming: true,
  },
  {
    artist: "The Neighbourhood",
    tour: "upcoming shows",
    dates: "Nov + Dec 2026",
    note: "seeing them twice",
    upcoming: true,
  },
  {
    artist: "Twenty One Pilots",
    tour: "Clancy Breach Tour",
    dates: "Oct 24 + 25, 2025",
    note: "BMO Stadium, LA — also bandito, emotional roadshow, clancy tour",
    upcoming: false,
  },
  {
    artist: "The Neighbourhood",
    tour: "secret popup show",
    dates: "Nov 2025",
    note: "also saw them Oct 2021",
    upcoming: false,
  },
  {
    artist: "Tame Impala",
    tour: "",
    dates: "Nov 2025",
    note: "also saw them Nov 2021",
    upcoming: false,
  },
  {
    artist: "Lorde",
    tour: "",
    dates: "Nov 2025",
    note: "also saw her May 2021",
    upcoming: false,
  },
  {
    artist: "Cage the Elephant",
    tour: "",
    dates: "Jul 2024",
    note: "trouble era",
    upcoming: false,
  },
];

const coreArtists = [
  "Twenty One Pilots",
  "The Neighbourhood",
  "Lorde",
  "Lana Del Rey",
  "Selena Gomez",
  "Ariana Grande",
  "The 1975",
  "Tame Impala",
  "Taylor Swift",
];

const makingItems = [
  { title: "Ariana Grande edit", note: "eternal sunshine world tour" },
  { title: "this website", note: "where I've been" },
];

const smallFacts = [
  "first thing I notice about someone: their teeth",
  "editing playlist from 2017, 3+ days long",
  "grew up in the 626, always in LA",
  "learned to code with a Taylor Swift quiz",
  "i will watch a show just for a ship",
  "fashion is documentation",
  "ron & hermione are my favorite depiction of romance",
  "anqclic = misspelling of angelic, intentionally",
  "The Neighbourhood in november and december!!",
  "ariana grande next week omg",
  "mean girls is my comfort movie (genuinely)",
  "vinyl > any other form of streaming",
  "going to new york soon",
  "ive seen twenty one pilots more than any other artist",
];

// ── SHIP CARD ─────────────────────────────────────────────────────────────────
function ShipCard({ ship, index }: { ship: typeof ships[0]; index: number }) {
  const [gifLoaded, setGifLoaded] = useState(false);
  const rotation = index % 3 === 0 ? "rotate-[-0.5deg]" : index % 3 === 1 ? "rotate-[0.4deg]" : "rotate-0";

  return (
    <div className={`group relative overflow-hidden rounded-[22px] border border-black/5 bg-white/72 shadow-[0_14px_40px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(68,44,29,0.10)] ${rotation}`}>
      <div className="relative h-[180px] w-full overflow-hidden bg-[#ede5dc]">
        <iframe
          src={`https://giphy.com/embed/${ship.gifId}`}
          style={{
            border: "none",
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "160%",
            height: "160%",
            transform: "translate(-50%, -50%)",
          }}
          allowFullScreen
          title={`${ship.pair} gif`}
          onLoad={() => setGifLoaded(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f7f1eb]/80 via-transparent to-transparent" />
        {!gifLoaded && (
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-r from-[#ede5dc] via-[#f5ede4] to-[#ede5dc]" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif font-semibold text-[1rem] leading-snug text-[#1f1a18]">{ship.pair}</p>
          {index === 0 && (
            <span className="shrink-0 rounded-full border border-black/5 bg-[#fffaf6] px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-[#a89d96]">og</span>
          )}
        </div>
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#a89d96]">{ship.from}</p>
        <p className="mt-2 text-[0.82rem] italic leading-6 text-[#4d413b]">{ship.note}</p>
      </div>
    </div>
  );
}

// ── POSTER CARD ───────────────────────────────────────────────────────────────
const posterFallbacks = ["#e8d5c4", "#d4c4b8", "#c8b8ac", "#ddd0c6", "#e2d4ca"];

function PosterCard({
  title, note, poster, index, size = "film",
}: {
  title: string; note: string; poster: string; index: number; size?: "film" | "tv";
}) {
  const [loaded, setLoaded] = useState(false);
  const bg = posterFallbacks[index % posterFallbacks.length];

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden rounded-[14px] border border-black/5 shadow-[0_10px_28px_rgba(68,44,29,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(68,44,29,0.12)]"
        style={{ background: bg, aspectRatio: "2/3" }}
      >
        {poster ? (
          <img
            src={poster}
            alt={title}
            className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-2">
            <span className="text-[0.5rem] uppercase tracking-[0.12em] text-[#8a7d75]/70 leading-tight">{title.slice(0, 14)}</span>
          </div>
        )}
      </div>
      <p className="text-center text-[0.72rem] font-medium leading-tight text-[#1f1a18]">{title}</p>
      <p className="text-center text-[0.6rem] uppercase tracking-[0.16em] text-[#a89d96]">{note}</p>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  useReveal();
  const { tracks, topArtist } = useLastFm();
  const filmPosters = usePosters(films);
  const showPosters = usePosters(watchingShows);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#201c1a]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grain-overlay" />
      <div aria-hidden="true" className="pointer-events-none fixed left-1/2 top-[-10rem] z-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#efe1d4]/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none fixed right-[-8rem] top-[18rem] z-0 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-[100px]" />

      <div className="relative z-10">
        <div className="px-4 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-black/5 bg-white/42 px-5 py-5 shadow-[0_30px_120px_rgba(54,36,24,0.06)] backdrop-blur-[2px] sm:px-8 sm:py-8">

            {/* NAV */}
            <header className="flex items-center justify-between gap-4 text-sm tracking-[0.22em] uppercase text-[#5f554f]">
              <Link href="/" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">← back</Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">{link.label}</Link>
                ))}
              </nav>
            </header>

            {/* HERO + PHOTOS */}
            <div className="reveal-item mt-10 grid gap-6 lg:grid-cols-[1fr_auto]" data-delay={0}>
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">about / vanessa gonzalez</p>
                <h1 className="mt-5 max-w-2xl font-serif text-[2.4rem] font-semibold leading-[1.15] text-[#1f1a18] sm:text-[3.2rem]">
                  built from edits, ships, and things that feel collectible.
                </h1>
                <p className="mt-6 max-w-lg text-[1.02rem] leading-8 text-[#4d413b]">
                  I'm Vanessa — a USC CS + Business student from the 626, incoming at Bank of America, and someone who has always had an eye for beautiful things even without the means to have them growing up. I've been making edits since I was 10, falling for ships since before I knew what a ship was, and collecting moments ever since.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                  {["USC CS + Business", "626 → LA", "Incoming @ BofA", "editor since 2015", "anqclic"].map((tag) => (
                    <span key={tag} className="rounded-full border border-black/5 bg-white/70 px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="relative hidden lg:flex shrink-0 items-end" style={{ width: "280px", height: "340px" }}>
                {myPhotos.slice(0, 2).map((photo, i) => (
                  <div
                    key={photo.src}
                    className="absolute overflow-hidden rounded-[22px] border border-black/6 shadow-[0_18px_50px_rgba(45,29,18,0.12)]"
                    style={{
                      width: i === 0 ? "200px" : "180px",
                      height: i === 0 ? "280px" : "240px",
                      left: i === 0 ? "0px" : "90px",
                      top: i === 0 ? "0px" : "70px",
                      transform: i === 0 ? "rotate(-2.5deg)" : "rotate(2deg)",
                      zIndex: i === 0 ? 1 : 2,
                    }}
                  >
                    <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-top" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent px-3 pb-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/80">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* mobile photos */}
            <div className="reveal-item mt-6 flex gap-3 overflow-x-auto pb-2 lg:hidden" data-delay={40} style={{ scrollbarWidth: "none" }}>
              {myPhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="relative shrink-0 overflow-hidden rounded-[18px] border border-black/6 shadow-[0_12px_32px_rgba(45,29,18,0.10)]"
                  style={{ width: "160px", height: "220px", transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)" }}
                >
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>

            {/* PULL QUOTE */}
            <div className="reveal-item my-10 overflow-hidden rounded-[28px] border border-black/5 bg-white/72 px-8 py-8 shadow-[0_18px_50px_rgba(68,44,29,0.06)] sm:px-10 rotate-[-0.4deg]" data-delay={80}>
              <p className="font-serif text-[1.5rem] font-semibold italic leading-9 text-[#342d29] sm:text-[1.75rem]">
                "we accept the love we think we deserve."
              </p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                perks of being a wallflower — the film that opened my eyes
              </p>
            </div>

            {/* ORIGIN + TASTE + CODING */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              how i got here
            </div>

            {/* ORIGIN — wide, film strip on right */}
            <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={0}>
              <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">01</span>
              <div className="grid gap-6 lg:grid-cols-[1fr_120px]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">the origin</p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">It started with a free app and Harry Potter</h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-4">I was 10. I saw a fan edit on Vine and knew immediately I needed to learn how to do that.</p>
                  <p className="text-[0.88rem] leading-7 text-[#5e5048]">Started on Video Star because it was free. Harry Potter, Selena, Twenty One Pilots. In 2018 I saved up for a MacBook and begged my mom for After Effects — growing up without a lot, that felt enormous. That account became anqclic, a misspelling of angelic, because I wanted to make things that were beautiful.</p>
                </div>
                {/* film era strip */}
                <div className="hidden lg:flex flex-col gap-2">
                  {[
                    { label: "vine era", bg: "linear-gradient(160deg,#1a0a2e,#2d1b4e)" },
                    { label: "video star", bg: "linear-gradient(160deg,#0d1f3c,#1a3a6e)" },
                    { label: "after effects", bg: "linear-gradient(160deg,#1a1a1a,#2d2d2d)" },
                  ].map((era) => (
                    <div key={era.label} className="flex-1 rounded-[12px] border border-black/6 overflow-hidden" style={{ background: era.bg }}>
                      <div className="h-full flex items-center justify-center p-2">
                        <span className="text-[0.5rem] uppercase tracking-[0.2em] text-white/60 text-center leading-relaxed">{era.label}</span>
                      </div>
                    </div>
                  ))}
                  <p className="text-center text-[0.55rem] uppercase tracking-[0.2em] text-[#a89d96] mt-1">2015 → now</p>
                </div>
              </div>
            </div>

            {/* AESTHETIC + WHAT I CARE ABOUT */}
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={0}>
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">02</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">my aesthetic</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">Daisy in Gatsby's mansion</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-4">Looking up at the ceiling, enamored by the beauty around her.</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">I've always had an eye for the luxurious and editorial — things made with intention — even when I didn't have access to them growing up. That hunger is what made me an editor.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["lana del rey", "baz luhrmann", "lace details", "editorial campaigns", "selena's revival era"].map((t) => (
                    <span key={t} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">{t}</span>
                  ))}
                </div>
              </div>

              <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={80}>
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">03</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">what I actually care about</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">The details most people skip past</h2>
                <div className="my-4 h-px bg-black/5" />
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "why people keep coming back",
                    "storytelling that feels seen",
                    "the half-second before a cut",
                    "fashion as documentation",
                    "love in its fictional forms",
                    "things made with intention",
                  ].map((t) => (
                    <span key={t} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">{t}</span>
                  ))}
                </div>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">The systems behind emotional attachment. The details that make someone return to a story, a product, an experience. That's the space I want to keep building in.</p>
              </div>
            </div>

            {/* CODING */}
            <div className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={60}>
              <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">04</span>
              <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
                <div
                  className="hidden lg:flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] border border-black/8 text-[0.75rem] font-medium tracking-[0.05em] text-white/70"
                  style={{ background: "#1a1a2e", fontFamily: "monospace" }}
                >&lt;/&gt;</div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">the other side of the brain</p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">My first project was a Taylor Swift song quiz</h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.88rem] leading-7 text-[#5e5048]">On code.org in high school — you answered questions and got assigned a Taylor Swift song. Very me. That's when I realized there was a creative side to coding I genuinely loved. I was already president of my school's Business and Technology Academy. USC let me have both and I've never had to choose.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["CS + Business", "USC · May 2027", "incoming @ BofA", "built this site"].map((t) => (
                      <span key={t} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAVORITE FILMS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              favorite films
            </div>

            <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
              <p className="mb-6 text-[0.72rem] uppercase tracking-[0.28em] text-[#a89d96]">letterboxd top 5 · in order</p>
              <div className="grid grid-cols-5 gap-4 sm:gap-6">
                {filmPosters.map((film, i) => (
                  <PosterCard key={film.title} title={film.title} note={film.note} poster={film.poster} index={i} />
                ))}
              </div>
              <p className="mt-6 text-[0.78rem] leading-7 text-[#5e5048]">
                Baz Luhrmann's color world, Greta Gerwig's warmth, Tarantino's LA — films that feel like they were made for people who notice everything. Mean Girls is my comfort movie. I've seen it more times than I can count.
              </p>
            </div>

            {/* SHIPS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              top ships
            </div>

            <div className="reveal-item" data-delay={0}>
              <p className="mb-6 max-w-lg text-[0.88rem] leading-7 text-[#4d413b]">
                I will watch an entire series for a ship. I love love — the slow burn, the tension, the tiny moments before everything clicks. Here are the ones that live in me permanently.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ships.map((ship, i) => (
                  <ShipCard key={ship.pair} ship={ship} index={i} />
                ))}
              </div>
            </div>

            {/* CURRENTLY */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              currently
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">

              {/* WATCHING */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
                <p className="mb-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">watching</p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {showPosters.slice(0, 3).map((show, i) => (
                    <PosterCard key={show.title} title={show.title} note="" poster={show.poster} index={i} />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {showPosters.map((show, i) => (
                    <div key={show.title} className="flex items-center gap-2 py-1">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8bdb2]" />
                      <div className="min-w-0">
                        <p className="truncate text-[0.8rem] text-[#1f1a18]">{show.title}</p>
                        <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#a89d96]">{show.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LISTENING */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">on rotation</p>
                  {tracks.length > 0 && tracks[0].isNowPlaying && (
                    <span className="flex items-end gap-[2px]" aria-label="now playing">
                      <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar1" style={{ height: "8px" }} />
                      <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar2" style={{ height: "12px" }} />
                      <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar3" style={{ height: "6px" }} />
                    </span>
                  )}
                </div>
                {tracks.length === 0 ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex items-center gap-3 px-2 py-2">
                        <div className="h-10 w-10 rounded-[10px] bg-[#ede5dc] shrink-0" />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className="h-2.5 w-3/4 rounded-full bg-[#ede5dc]" />
                          <div className="h-2 w-1/2 rounded-full bg-[#f0e8e0]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {tracks.slice(0, 4).map((track, i) => (
                      <a key={i} href={track.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-[12px] px-2 py-2 transition-all duration-150 hover:bg-[#f7f1eb]">
                        <div className="h-9 w-9 rounded-[8px] border border-black/5 overflow-hidden shrink-0 bg-[#ede5dc]">
                          {track.image && <img src={track.image} alt={track.name} className="h-full w-full object-cover" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.75rem] font-medium text-[#201c1a]">{track.name}</p>
                          <p className="truncate text-[0.62rem] uppercase tracking-[0.12em] text-[#a89d96]">{track.artist}</p>
                        </div>
                        {i === 0 && track.isNowPlaying && (
                          <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.16em] text-[#c8bdb2]">live</span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
                {topArtist && (
                  <p className="mt-3 border-t border-black/5 pt-3 text-[0.6rem] uppercase tracking-[0.2em] text-[#c8bdb2]">
                    this week: <span className="text-[#8a7d75]">{topArtist.name}</span>
                  </p>
                )}
                <div className="mt-4 border-t border-black/5 pt-4">
                  <p className="mb-3 text-[0.62rem] uppercase tracking-[0.24em] text-[#a89d96]">core artists</p>
                  <div className="flex flex-wrap gap-1.5">
                    {coreArtists.map((a) => (
                      <span key={a} className="rounded-full border border-black/5 bg-[#fffaf6] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-[#5f554f]">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONCERT LOG */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={120}>
                <p className="mb-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">concert log</p>
                <div className="flex flex-col gap-3">
                  {concertLog.map((show) => (
                    <div key={show.artist + show.dates} className="flex items-start gap-3">
                      <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${show.upcoming ? "bg-[#342d29]" : "bg-[#c8bdb2]"}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[0.82rem] font-medium text-[#1f1a18]">{show.artist}</p>
                          {show.upcoming && (
                            <span className="rounded-full bg-[#342d29] px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-white/80">upcoming</span>
                          )}
                        </div>
                        {show.tour && <p className="text-[0.65rem] text-[#5e5048] mt-0.5">{show.tour}</p>}
                        <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#a89d96] mt-0.5">{show.dates}</p>
                        <p className="text-[0.68rem] italic text-[#7c7068] mt-0.5">{show.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAKING */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={160}>
                <p className="mb-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">making</p>
                <div className="flex flex-col gap-3">
                  {makingItems.map((item, i) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-[16px] border border-black/5 bg-white/60 p-3 shadow-[0_8px_24px_rgba(68,44,29,0.04)]">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[10px] bg-[#ede5dc] flex items-center justify-center">
                        <span className="text-[0.62rem] uppercase tracking-[0.1em] text-[#8a7d75]">{i === 0 ? "edit" : "web"}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.82rem] font-medium text-[#1f1a18]">{item.title}</p>
                        <p className="mt-0.5 truncate text-[0.65rem] uppercase tracking-[0.14em] text-[#a89d96]">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SMALL FACTS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              small facts
            </div>
            <div className="reveal-item" data-delay={0}>
              <div className="flex flex-wrap gap-3">
                {smallFacts.map((fact, i) => (
                  <span
                    key={fact}
                    className={`rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-[#5f554f] tracking-[0.03em] shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "rotate-0"}`}
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            {/* DAD NOTE */}
            <div className="reveal-item mt-10 overflow-hidden rounded-[28px] border border-black/5 bg-white/72 p-8 shadow-[0_18px_50px_rgba(68,44,29,0.06)] rotate-[0.3deg]" data-delay={60}>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">a little note</p>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#4d413b]">
                I grew up all around the 626, but my dad worked across Los Angeles — so the city always felt like mine too. He passed in December. I think a lot of what drives me, this need to build something that means something, comes from him. I want to contribute to something bigger than myself. I want to keep learning, keep making, and do work that feels intentional. That's the goal. That's always been the goal.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#a89d96]">anqclic / creative archive</p>
            </div>

            {/* BOTTOM CTA */}
            <div className="reveal-item mt-10 flex flex-col items-center gap-4 border-t border-black/5 pt-8" data-delay={0}>
              <p className="text-[0.82rem] uppercase tracking-[0.28em] text-[#7c7068]">want to know more?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/work" className="rounded-full bg-[#201c1a] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#f7f1eb] shadow-[0_8px_24px_rgba(32,28,26,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(32,28,26,0.28)]">see my work →</Link>
                <Link href="/resume" className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]">resume →</Link>
                <a href="/contact" className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]">get in touch →</a>
              </div>
            </div>

          </div>
        </div>

        <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between border-t border-black/5 pt-6 text-[0.68rem] uppercase tracking-[0.3em] text-[#a89d96]">
            <span>Vanessa Gonzalez</span>
            <span>anqclic / creative archive</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </footer>

        <style>{`
          .reveal-item { opacity: 0; transform: translateY(16px); transition: opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1); }
          .reveal-item.revealed { opacity: 1; transform: translateY(0); }
          @media (prefers-reduced-motion: reduce) { .reveal-item { opacity:1; transform:none; transition:none; } }
          .grain-overlay { opacity:0.06; mix-blend-mode:multiply; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); background-size:280px 280px; background-repeat:repeat; }
          @keyframes barBounce1 { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
          @keyframes barBounce2 { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.4)} }
          @keyframes barBounce3 { 0%,100%{transform:scaleY(0.6)} 33%{transform:scaleY(1)} 66%{transform:scaleY(0.3)} }
          .animate-bar1 { animation:barBounce1 0.9s ease-in-out infinite; transform-origin:bottom; }
          .animate-bar2 { animation:barBounce2 0.9s ease-in-out infinite 0.15s; transform-origin:bottom; }
          .animate-bar3 { animation:barBounce3 0.9s ease-in-out infinite 0.3s; transform-origin:bottom; }
        `}</style>
      </div>
    </main>
  );
}