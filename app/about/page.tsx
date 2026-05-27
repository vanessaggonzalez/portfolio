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

// ── TMDB poster fetcher ────────────────────────────────────────────────────────
// We use the public TMDB search endpoint (no API key needed for basic search
// via the v3 free tier — swap in your own key if you have one).
// Falls back gracefully to a warm placeholder if the fetch fails.
const TMDB_KEY = "e08466a6e15057915ef671c8d3314b76"; // optional — leave empty to use placeholder art
type ShowPoster = { title: string; poster: string; note: string };

function useTVPosters(shows: { title: string; note: string }[]) {
  const [posters, setPosters] = useState<ShowPoster[]>(
    shows.map((s) => ({ ...s, poster: "" }))
  );

  useEffect(() => {
    if (!TMDB_KEY) return; // skip if no key, placeholders will show
    async function fetchAll() {
      const results = await Promise.all(
        shows.map(async (show) => {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_KEY}&query=${encodeURIComponent(show.title)}&page=1`
            );
            const data = await res.json();
            const path = data?.results?.[0]?.poster_path ?? "";
            return {
              ...show,
              poster: path ? `https://image.tmdb.org/t/p/w300${path}` : "",
            };
          } catch {
            return { ...show, poster: "" };
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

// Your photos — swap these paths with your actual images
// All slots use object-cover so any size/ratio works perfectly
const myPhotos = [
  { src: "/images/vanessa1.jpg", alt: "Vanessa", caption: "vanessa" },
  { src: "/images/vanessa2.jpg", alt: "Vanessa at the Huntington", caption: "at the huntington" },
  // add a third if you have one: { src: "/images/vanessa3.jpg", alt: "...", caption: "..." },
];

const ships = [
  {
    pair: "Ron & Hermione",
    from: "Harry Potter",
    note: "the original. always.",
    // Giphy embed IDs — these are real public Giphy IDs for each ship
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
    pair: "Chandler & Monica",
    from: "Friends",
    note: "best friends first, always",
    gifId: "105C2a2ieQtW00",
  },
  {
    pair: "Jake & Amy",
    from: "Brooklyn 99",
    note: "titles are hard but we try",
    gifId: "3osxY4WQT34ONC60XC",
  },
  {
    pair: "Seth & Summer",
    from: "The OC",
    note: "so many seasons of yearning (4)",
    gifId: "heD16mYrUb64E",
  },
  {
    pair: "Stefan & Caroline",
    from: "The Vampire Diaries",
    note: "quiet and devastating",
    gifId: "awnC06iQXQ0Ym94nc0",
  },
  {
    pair: "Nancy & Jonathan",
    from: "Stranger Things",
    note: "soft and steady",
    gifId: "3o7aDbX8g5rNzOzfyw",
  },
  {
    pair: "Jackie & Hyde",
    from: "That 70s Show",
    note: "opposites that just work",
    gifId: "9X4iKKnoDmptm",
  },
  {
    pair: "Stiles & Lydia",
    from: "Teen Wolf",
    note: "yearners omg",
    gifId: "vMLZUWYfNLAbe",
  },
];

const watchingShows = [
  { title: "New Girl", note: "with my boyfriend, first watch" },
  { title: "That 70s Show", note: "rewatch — Jackie & Hyde agenda" },
  { title: "Desperate Housewives", note: "started, need to finish" },
  { title: "Modern Family", note: "started this one too" },
];

const makingItems = [
  { title: "Ariana Grande edit", note: "eternal sunshine world tour" },
  { title: "this website", note: "that's where I've been" },
];

const listeningItems = [
  { title: "Dangerous Woman", note: "Ariana — 10th anniversary" },
  { title: "The Neighbourhood", note: "seeing them in december" },
  { title: "Lorde", note: "always" },
];

const coreArtists = [
  "The Neighbourhood", "Lana Del Rey", "Ariana Grande",
  "Lorde", "The 1975", "Twenty One Pilots", "Selena Gomez", "Taylor Swift",
];

const smallFacts = [
  "first thing I notice about someone: their teeth",
  "editing playlist from 2017, 3+ days long",
  "grew up in the 626, always in LA",
  "learned to code with a Taylor Swift quiz",
  "i will watch a show just for a ship",
  "fashion is documentation",
  "ron & hermione quizzed my mom before bed",
  "anqclic = misspelling of angelic, intentionally",
  "The Neighbourhood in december 🖤",
  "dangerous woman 10th anniversary on repeat",
  "business club president in high school",
  "vinyl > everything",
];

// ── SHIP CARD with gif ─────────────────────────────────────────────────────────
function ShipCard({ ship, index }: { ship: typeof ships[0]; index: number }) {
  const [gifLoaded, setGifLoaded] = useState(false);
  const rotation = index % 3 === 0 ? "rotate-[-0.5deg]" : index % 3 === 1 ? "rotate-[0.4deg]" : "rotate-0";

  return (
    <div className={`group relative overflow-hidden rounded-[22px] border border-black/5 bg-white/72 shadow-[0_14px_40px_rgba(68,44,29,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(68,44,29,0.10)] ${rotation}`}>
      {/* GIF area — iframe embed bypasses CSP/domain restrictions */}
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
        {/* warm gradient overlay so gifs blend with the cream palette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f7f1eb]/80 via-transparent to-transparent" />
        {/* skeleton shimmer while loading */}
        {!gifLoaded && (
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-r from-[#ede5dc] via-[#f5ede4] to-[#ede5dc]" />
        )}
      </div>

      {/* text */}
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

// ── SHOW POSTER CARD ───────────────────────────────────────────────────────────
// Uses a hardcoded palette of warm poster colors as fallbacks when no TMDB key
const posterFallbacks = [
  "#e8d5c4", "#d4c4b8", "#c8b8ac", "#ddd0c6", "#e2d4ca",
];

function ShowCard({ title, note, poster, index }: { title: string; note: string; poster: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const bg = posterFallbacks[index % posterFallbacks.length];

  return (
    <div className="group flex items-center gap-3 rounded-[18px] border border-black/5 bg-white/60 p-3 shadow-[0_8px_24px_rgba(68,44,29,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(68,44,29,0.07)]">
      {/* poster / placeholder */}
      <div
        className="relative h-16 w-11 shrink-0 overflow-hidden rounded-[10px] border border-black/5"
        style={{ background: bg }}
      >
        {poster && (
          <img
            src={poster}
            alt={title}
            className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
          />
        )}
        {/* film grain texture overlay on poster */}
        {!poster && (
          <div className="absolute inset-0 flex items-end p-1.5">
            <span className="text-[0.45rem] uppercase tracking-[0.15em] text-[#8a7d75]/60 leading-tight">{title.slice(0,12)}</span>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[0.85rem] font-medium text-[#1f1a18]">{title}</p>
        <p className="mt-0.5 truncate text-[0.68rem] uppercase tracking-[0.16em] text-[#a89d96]">{note}</p>
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  useReveal();
  const { tracks, topArtist } = useLastFm();
  const showPosters = useTVPosters(watchingShows);

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

            {/* ── HERO + PHOTOS ── */}
            <div className="reveal-item mt-10 grid gap-6 lg:grid-cols-[1fr_auto]" data-delay={0}>
              {/* text */}
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

              {/* photos — collage stack */}
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

            {/* mobile photos — horizontal scroll strip */}
            <div className="reveal-item mt-6 flex gap-3 overflow-x-auto pb-2 lg:hidden" data-delay={40}
              style={{ scrollbarWidth: "none" }}>
              {myPhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="relative shrink-0 overflow-hidden rounded-[18px] border border-black/6 shadow-[0_12px_32px_rgba(45,29,18,0.10)]"
                  style={{
                    width: "160px",
                    height: "220px",
                    transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
                  }}
                >
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>

            {/* ── PULL QUOTE ── */}
            <div className="reveal-item my-10 overflow-hidden rounded-[28px] border border-black/5 bg-white/72 px-8 py-8 shadow-[0_18px_50px_rgba(68,44,29,0.06)] sm:px-10 rotate-[-0.4deg]" data-delay={80}>
              <p className="font-serif text-[1.5rem] font-semibold italic leading-9 text-[#342d29] sm:text-[1.75rem]">
                "we accept the love we think we deserve."
              </p>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">
                perks of being a wallflower — the film that opened my eyes
              </p>
            </div>

            {/* ── 2-COL: ORIGIN + TASTE ── */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">how i got here</p>
                <h2 className="mt-3 font-serif text-[1.2rem] font-semibold leading-snug text-[#1f1a18]">It started with a free app and Harry Potter</h2>
                <div className="mt-4 space-y-4 text-[0.95rem] leading-8 text-[#4d413b]">
                  <p>I was 10 years old when I found fan edits on Vine — clips of Ariana Grande and Harry Potter cut together in ways that felt almost too beautiful. Like someone had distilled exactly why they loved something and put it in 15 seconds. I needed to learn how to do that.</p>
                  <p>I started on Video Star because it was free. Harry Potter mostly. Then Selena. Then Twenty One Pilots. In 2018 I saved up for a MacBook and begged my mom for After Effects. Growing up without a lot, that felt enormous — like I was finally getting tools that matched the ambition I'd had for years.</p>
                  <p>That account became <span className="font-medium text-[#342d29]">anqclic</span> — a misspelling of angelic, because I wanted to make things that were beautiful. It set the tone for everything.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">my aesthetic in a frame</p>
                  <h2 className="mt-3 font-serif text-[1.2rem] font-semibold leading-snug text-[#1f1a18]">Daisy in Gatsby's mansion</h2>
                  <p className="mt-4 text-[0.95rem] leading-8 text-[#4d413b]">Looking up at the ceiling, just enamored by the beauty around her. I've always had an eye for the luxurious, the editorial, the things that feel like they were made with intention — even when I didn't have access to them growing up. That hunger is what made me an editor.</p>
                </div>
                <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={120}>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">what I actually care about</p>
                  <div className="mt-4 space-y-3 text-[0.95rem] leading-7 text-[#4d413b]">
                    <p>— the systems behind why people keep coming back to things</p>
                    <p>— storytelling that makes you feel seen</p>
                    <p>— the half-second before a cut lands on a beat</p>
                    <p>— fashion as documentation of a moment</p>
                    <p>— love, in all its fictional forms</p>
                    <p>— building things that feel intentional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CODING ORIGIN ── */}
            <div className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={60}>
              <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">the other side of the brain</p>
                  <h2 className="mt-3 font-serif text-[1.2rem] font-semibold leading-snug text-[#1f1a18]">My first project was a Taylor Swift song quiz</h2>
                  <p className="mt-4 text-[0.95rem] leading-8 text-[#4d413b]">On code.org, in high school — you answered a quiz and got assigned a Taylor Swift song. Very me. That's when I realized there was a creative side to coding I genuinely loved. I was already president of my school's Business & Technology Academy and had always been drawn to the breadth of business. USC let me have both, and I've never had to choose.</p>
                </div>
                <div className="flex shrink-0 flex-col justify-center gap-2 lg:items-end">
                  {["CS + Business", "USC · May 2027", "Incoming @ BofA"].map((tag) => (
                    <span key={tag} className="rounded-full border border-black/5 bg-[#fffaf6] px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#7c7068]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SHIPS ── */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              top ships
            </div>

            <div className="reveal-item" data-delay={0}>
              <p className="mb-6 max-w-lg text-[0.88rem] leading-7 text-[#4d413b]">
                I will watch an entire series for a ship. I love love — the friends-to-lovers arc, the tension, the tiny moments. Here are the ones that live in me permanently.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {ships.map((ship, i) => (
                  <ShipCard key={ship.pair} ship={ship} index={i} />
                ))}
              </div>
            </div>

            {/* ── CURRENTLY ── */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              currently
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {/* WATCHING — with poster thumbnails */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
                <p className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">watching</p>
                <div className="flex flex-col gap-3">
                  {showPosters.map((show, i) => (
                    <ShowCard key={show.title} title={show.title} note={show.note} poster={show.poster} index={i} />
                  ))}
                </div>
              </div>

              {/* LISTENING — with last.fm album art */}
              <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
                <p className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">listening</p>
                <div className="flex flex-col gap-3">
                  {listeningItems.map((item, i) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-[18px] border border-black/5 bg-white/60 p-3 shadow-[0_8px_24px_rgba(68,44,29,0.04)]">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border border-black/5 bg-[#ede5dc]">
                        {/* album art placeholder — warm gradient */}
                        <div className="h-full w-full" style={{
                          background: i === 0 ? "linear-gradient(135deg,#e8c4c4,#d4a0b0)" :
                                      i === 1 ? "linear-gradient(135deg,#1a1a2e,#2d2d44)" :
                                               "linear-gradient(135deg,#c8d8b4,#a8c494)",
                        }} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[0.85rem] font-medium text-[#1f1a18]">{item.title}</p>
                        <p className="mt-0.5 truncate text-[0.68rem] uppercase tracking-[0.16em] text-[#a89d96]">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-black/5 pt-4">
                  <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">core artists</p>
                  <div className="flex flex-wrap gap-2">
                    {coreArtists.map((a) => (
                      <span key={a} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#5f554f]">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* MAKING + LIVE LAST.FM */}
              <div className="flex flex-col gap-4">
                <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={120}>
                  <p className="mb-4 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">making</p>
                  <div className="flex flex-col gap-3">
                    {makingItems.map((item, i) => (
                      <div key={item.title} className="flex items-center gap-3 rounded-[18px] border border-black/5 bg-white/60 p-3 shadow-[0_8px_24px_rgba(68,44,29,0.04)]">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[10px] bg-[#ede5dc] flex items-center justify-center">
                          <span className="text-[0.7rem] uppercase tracking-[0.1em] text-[#8a7d75]">{i === 0 ? "edit" : "web"}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[0.85rem] font-medium text-[#1f1a18]">{item.title}</p>
                          <p className="mt-0.5 truncate text-[0.68rem] uppercase tracking-[0.16em] text-[#a89d96]">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LIVE LAST.FM */}
                <div className="reveal-item rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={160}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">on rotation right now</p>
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
                    <div className="flex flex-col gap-2">
                      {tracks.slice(0, 3).map((track, i) => (
                        <a key={i} href={track.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-[14px] px-2 py-2 transition-all duration-150 hover:bg-[#f7f1eb]">
                          <div className="h-10 w-10 rounded-[10px] border border-black/5 overflow-hidden shrink-0 bg-[#ede5dc]">
                            {track.image && <img src={track.image} alt={track.name} className="h-full w-full object-cover" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.78rem] font-medium text-[#201c1a]">{track.name}</p>
                            <p className="truncate text-[0.65rem] uppercase tracking-[0.14em] text-[#a89d96]">{track.artist}</p>
                          </div>
                          {i === 0 && track.isNowPlaying && (
                            <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-[#c8bdb2]">live</span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  {topArtist && (
                    <div className="mt-3 border-t border-black/5 pt-3">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#c8bdb2]">
                        most played this week: <span className="text-[#8a7d75]">{topArtist.name}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── SMALL FACTS ── */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              small facts
            </div>
            <div className="reveal-item" data-delay={0}>
              <div className="flex flex-wrap gap-3">
                {smallFacts.map((fact, i) => (
                  <span key={fact} className={`rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-[#5f554f] tracking-[0.03em] shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "rotate-0"}`}>
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            {/* ── DAD NOTE ── */}
            <div className="reveal-item mt-10 overflow-hidden rounded-[28px] border border-black/5 bg-white/72 p-8 shadow-[0_18px_50px_rgba(68,44,29,0.06)] rotate-[0.3deg]" data-delay={60}>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">a little note</p>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#4d413b]">
                I grew up all around the 626, but my dad worked across Los Angeles — so the city always felt like mine too. He passed in December. I think a lot of what drives me, this need to build something that means something, comes from him. I want to contribute to something bigger than myself. I want to keep learning, keep making, and do work that feels intentional. That's the goal. That's always been the goal.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#a89d96]">anqclic / creative archive</p>
            </div>

            {/* ── BOTTOM CTA ── */}
            <div className="reveal-item mt-10 flex flex-col items-center gap-4 border-t border-black/5 pt-8" data-delay={0}>
              <p className="text-[0.82rem] uppercase tracking-[0.28em] text-[#7c7068]">want to know more?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/work" className="rounded-full bg-[#201c1a] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#f7f1eb] shadow-[0_8px_24px_rgba(32,28,26,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(32,28,26,0.28)]">see my work →</Link>
                <Link href="/resume" className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]">resume →</Link>
                <a href="mailto:vcnessaggonzalez@gmail.com" className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] text-[#5f554f] shadow-[0_8px_24px_rgba(68,44,29,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#201c1a] hover:shadow-[0_12px_32px_rgba(68,44,29,0.10)]">get in touch →</a>
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