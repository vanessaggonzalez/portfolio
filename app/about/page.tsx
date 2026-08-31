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

const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY ?? "";
const LASTFM_USER = "malfcytrash";
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_KEY ?? "";

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
      if (!LASTFM_API_KEY) return;
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
      if (!LASTFM_API_KEY) return;
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
  }, [items]);
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
    isOG: true,
    images: [
      "/images/ships/ronhermione1.jpg",
      "/images/ships/ronhermione2.jpg",
      "/images/ships/ronhermione3.jpg",
    ],
  },
  {
    pair: "Han & Leia",
    from: "Star Wars",
    note: "enemies to lovers before it had a name",
    isOG: false,
    images: [
      "/images/ships/hanleia1.jpg",
      "/images/ships/hanleia2.jpg",
      "/images/ships/hanleia3.jpg",
    ],
  },
  {
    pair: "Dan & Blair",
    from: "Gossip Girl",
    note: "unexpected and that's the point",
    isOG: false,
    images: [
      "/images/ships/danblair1.jpg",
      "/images/ships/danblair2.jpg",
      "/images/ships/danblair3.jpg",
    ],
  },
  {
    pair: "Nancy & Jonathan",
    from: "Stranger Things",
    note: "soft and steady",
    isOG: false,
    images: [
      "/images/ships/nancyjonathan1.jpg",
      "/images/ships/nancyjonathan2.jpg",
      "/images/ships/nancyjonathan3.jpg",
    ],
  },
  {
    pair: "Jake & Amy",
    from: "Brooklyn 99",
    note: "titles are hard but they try",
    isOG: false,
    images: [
      "/images/ships/jakeamy1.jpg",
      "/images/ships/jakeamy2.jpg",
      "/images/ships/jakeamy3.jpg",
    ],
  },
  {
    pair: "Chandler & Monica",
    from: "Friends",
    note: "best friends first, always",
    isOG: false,
    images: [
      "/images/ships/chandlermonica1.jpg",
      "/images/ships/chandlermonica2.jpg",
      "/images/ships/chandlermonica3.jpg",
    ],
  },
];

const films = [
  { title: "The Great Gatsby", note: "baz luhrmann", type: "movie" as const },
  { title: "Perks of Being a Wallflower", note: "opened my eyes", type: "movie" as const },
  { title: "Little Women", note: "greta gerwig", type: "movie" as const },
  { title: "Once Upon a Time in Hollywood", note: "tarantino", type: "movie" as const },
];

const watchingShows = [
  { title: "Gossip Girl", note: "comfort show #1 forever", type: "tv" as const },
  { title: "The O.C.", note: "active rewatch era", type: "tv" as const },
  { title: "New Girl", note: "watching with my boyfriend", type: "tv" as const },
  { title: "Brooklyn Nine-Nine", note: "Jake & Amy agenda", type: "tv" as const },
];

const memoryLog = [
  {
    title: "The Neighbourhood",
    subtitle: "upcoming shows",
    kind: "concert",
    date: "Nov + Dec 2026",
    note: "seeing them twice",
    upcoming: true,
  },
  {
    title: "New Jersey",
    subtitle: "Wealth Management Technology",
    kind: "presentation",
    date: "Aug 2026",
    note: "flew out to present my project after the internship",
    upcoming: false,
  },
  {
    title: "Dallas, Texas",
    subtitle: "BofA Global Technology Base",
    kind: "work",
    date: "Summer 2026",
    note: "three projects, a lot of AI, and a very different kind of learning",
    upcoming: false,
  },
  {
    title: "New York City",
    subtitle: "BofA National Intern Orientation",
    kind: "milestone",
    date: "June 2026",
    note: "kicked off the summer in NYC before heading to Texas",
    upcoming: false,
  },
  {
    title: "Ariana Grande",
    subtitle: "Eternal Sunshine World Tour",
    kind: "concert",
    date: "June 2026",
    note: "finally saw her after waiting years",
    upcoming: false,
  },
  {
    title: "Harry Potter rewatch",
    subtitle: "",
    kind: "milestone",
    date: "2026",
    note: "tiny daily escape, full emotional ecosystem",
    upcoming: false,
  },
  {
    title: "San Francisco",
    subtitle: "trip with friends",
    kind: "trip",
    date: "summer 2025",
    note: "good weather, better company",
    upcoming: false,
  },
  {
    title: "Twenty One Pilots",
    subtitle: "Clancy Breach Tour",
    kind: "concert",
    date: "Oct 24 + 25, 2025",
    note: "BMO Stadium, LA",
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
  { title: "personal archive", note: "turning this site into a scrapbook" },
  { title: "this website", note: "built with next.js + react" },
  { title: "Intent Layer", note: "researching why viewers connect" },
];

const originTimeline = [
  {
    year: "2015",
    label: "the spark",
    title: "A Harry Potter edit on Vine",
    text: "I was 10, saw a fan edit, and immediately needed to know how it was made.",
    tone: "from-[#eadde7] to-[#f8eff4]",
  },
  {
    year: "2015–17",
    label: "first tool",
    title: "Video Star, because it was free",
    text: "Editing taught me pacing, emotional payoff, and how tiny visual choices change what people feel.",
    tone: "from-[#e2e8f1] to-[#f4f6fa]",
  },
  {
    year: "2018",
    label: "leveling up",
    title: "Saved for a MacBook + After Effects",
    text: "Anqclic grew into a 630K-view creative archive shaped by analytics, experimentation, and fandom.",
    tone: "from-[#e9e2dc] to-[#faf6f2]",
  },
  {
    year: "2023–27",
    label: "building",
    title: "USC CS + Business",
    text: "I found the bridge between technical systems, human behavior, creative technology, and product strategy.",
    tone: "from-[#f2e2e1] to-[#fff7f6]",
  },
  {
    year: "now",
    label: "direction",
    title: "Products people connect with",
    text: "I want to build where entertainment, fandom, discovery, and thoughtful interfaces meet.",
    tone: "from-[#e6dfd8] to-[#fbf8f4]",
  },
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
  "rewatching the o.c. & new girl",
  "mean girls is my comfort movie (genuinely)",
  "vinyl > any other form of streaming",
  "i organize memories like playlists",
];

const shipPalettes: [string, string][] = [
  ["#2a1f3d", "#3d2520"],
  ["#1a2a1f", "#1c1a2a"],
  ["#2a1f1a", "#1a1f2a"],
  ["#1a2020", "#2a1a1f"],
  ["#1f2a20", "#2a2a1f"],
  ["#2a2015", "#1f1f2a"],
];

function ShipCard({ ship, index }: { ship: typeof ships[0]; index: number }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = ship.images.length;
  const [palette] = useState(shipPalettes[index % shipPalettes.length]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 4200 + index * 240);
    return () => clearInterval(timer);
  }, [index, paused, total]);

  return (
    <div
      className={`flex flex-col gap-2 transition-transform duration-500 ${
        index % 3 === 0 ? "sm:-rotate-1" : index % 3 === 1 ? "sm:translate-y-3 sm:rotate-1" : "sm:-translate-y-1 sm:rotate-[0.5deg]"
      } hover:z-10 hover:!translate-y-[-8px] hover:!rotate-0`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="group relative overflow-hidden rounded-[14px] border border-black/5 shadow-[0_10px_28px_rgba(68,44,29,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(68,44,29,0.12)]"
        style={{ aspectRatio: "2/3", background: `linear-gradient(160deg, ${palette[0]}, ${palette[1]})` }}
      >
        {ship.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${ship.pair} still ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 flex items-end p-2 pointer-events-none">
          <span className="text-[0.5rem] uppercase tracking-[0.12em] text-white/30 leading-tight">
            {ship.pair.slice(0, 14)}
          </span>
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="previous image"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-black/8 bg-white/80 text-[#5f554f] text-[13px] leading-none opacity-0 shadow-sm transition-all duration-150 group-hover:opacity-100 hover:bg-white hover:scale-105 z-10"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="next image"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-black/8 bg-white/80 text-[#5f554f] text-[13px] leading-none opacity-0 shadow-sm transition-all duration-150 group-hover:opacity-100 hover:bg-white hover:scale-105 z-10"
            >
              ›
            </button>
          </>
        )}

        {total > 1 && (
          <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1 z-10">
            {ship.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? "w-3 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-[0.72rem] font-medium leading-tight text-[#1f1a18]">
        {ship.pair}
        {ship.isOG && (
          <span className="ml-1.5 rounded-full border border-black/5 bg-[#fffaf6] px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-[#a89d96] align-middle">
            og
          </span>
        )}
      </p>
      <p className="text-center text-[0.6rem] uppercase tracking-[0.16em] text-[#a89d96]">{ship.from}</p>
      <p className="text-center text-[0.6rem] italic text-[#7c7068] leading-snug">{ship.note}</p>
    </div>
  );
}

const posterFallbacks = ["#e8d5c4", "#d4c4b8", "#c8b8ac", "#ddd0c6", "#e2d4ca"];

function PosterCard({
  title,
  note,
  poster,
  index,
}: {
  title: string;
  note: string;
  poster: string;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const bg = posterFallbacks[index % posterFallbacks.length];

  return (
    <div className={`group flex flex-col gap-2 transition-transform duration-500 ${
      index % 4 === 0 ? "sm:-rotate-1" : index % 4 === 1 ? "sm:translate-y-3 sm:rotate-1" : index % 4 === 2 ? "sm:-translate-y-1 sm:rotate-[0.5deg]" : "sm:translate-y-2 sm:-rotate-[0.7deg]"
    } hover:z-10 hover:!translate-y-[-8px] hover:!rotate-0`}>
      <div
        className="relative overflow-hidden rounded-[14px] border border-black/5 shadow-[0_10px_28px_rgba(68,44,29,0.07)] transition-all duration-500 group-hover:scale-[1.025] group-hover:shadow-[0_20px_42px_rgba(68,44,29,0.15)]"
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
            <span className="text-[0.5rem] uppercase tracking-[0.12em] text-[#8a7d75]/70 leading-tight">
              {title.slice(0, 14)}
            </span>
          </div>
        )}
      </div>
      <p className="text-center text-[0.72rem] font-medium leading-tight text-[#1f1a18]">{title}</p>
      {note && <p className="text-center text-[0.6rem] uppercase tracking-[0.16em] text-[#a89d96]">{note}</p>}
    </div>
  );
}

function MemoryCard({ item }: { item: typeof memoryLog[0] }) {
  return (
    <div
      className="group relative flex w-[250px] shrink-0 flex-col gap-2 overflow-hidden rounded-[18px] border border-black/5 bg-[#fffaf6] p-5 shadow-[0_14px_36px_rgba(68,44,29,0.06)] transition-all duration-300 odd:-rotate-[0.6deg] even:rotate-[0.7deg] hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_22px_50px_rgba(68,44,29,0.12)]"
    >
      <div aria-hidden="true" className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-black/5 bg-[#f7f1eb]" />
      <div aria-hidden="true" className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-black/5 bg-[#f7f1eb]" />
      <div aria-hidden="true" className="absolute bottom-0 left-5 right-5 border-t border-dashed border-black/10" />
      <div className="flex items-center gap-2 flex-wrap">
        {item.upcoming ? (
          <span className="rounded-full bg-[#342d29] px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-white/85">upcoming</span>
        ) : (
          <span className="rounded-full bg-[#fffaf6] border border-black/5 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-[#a89d96]">{item.kind}</span>
        )}
      </div>
      <p className="mt-1 font-serif text-[1rem] font-semibold leading-snug text-[#1f1a18]">{item.title}</p>
      {item.subtitle && <p className="text-[0.68rem] text-[#5e5048]">{item.subtitle}</p>}
      <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#a89d96]">{item.date}</p>
      {item.note && <p className="text-[0.7rem] italic leading-snug text-[#7c7068]">{item.note}</p>}
      <p className="mt-auto pt-3 text-[0.52rem] uppercase tracking-[0.24em] text-[#c8bdb2]">admit one · archive copy</p>
    </div>
  );
}

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
    {
      label: "LinkedIn ↗",
      href: "https://linkedin.com/in/vanessa-g-gonzalez",
      external: true,
    },
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
              <Link href="/" className="text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068] transition hover:text-[#201c1a]">← back home</Link>
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#201c1a]">{link.label}</Link>
                ))}
              </nav>
            </header>

            {/* HERO + PHOTOS */}
            <div className="reveal-item relative mt-10 overflow-hidden rounded-[34px] border border-black/5 bg-gradient-to-br from-white/70 via-[#fffaf6]/60 to-[#f6e8e9]/45 p-6 shadow-[0_24px_70px_rgba(68,44,29,0.06)] sm:p-9 lg:grid lg:grid-cols-[1fr_auto] lg:gap-10" data-delay={0}>
              <div aria-hidden="true" className="absolute -left-10 top-10 h-28 w-44 rotate-[-8deg] rounded-full bg-[#e8a0b0]/10 blur-[45px]" />
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.35em] text-[#7c7068]">about / vanessa gonzalez</p>
                <h1 className="mt-5 max-w-2xl font-serif text-[2.4rem] font-semibold leading-[1.15] text-[#1f1a18] sm:text-[3.2rem]">
                  built from edits, ships, and things that feel collectible.
                </h1>
                <p className="mt-6 max-w-lg text-[1.02rem] leading-8 text-[#4d413b]">
                  I'm Vanessa, an LA native and USC senior studying Computer Science and Business Administration with a full-time return offer from Bank of America Global Technology. I'm fascinated by consumer behavior, digital fandom, and why people build emotional connections to products, stories, and visual media.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#8a7d75]">
                  {["USC CS + Business", "626 → LA", "BofA Return Offer", "Editor Since 2015", "Product & GTM"].map((tag) => (
                    <span key={tag} className="rounded-full border border-black/5 bg-white/70 px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="relative mt-8 hidden lg:flex shrink-0 items-end lg:mt-0" style={{ width: "300px", height: "350px" }}>
                <div aria-hidden="true" className="absolute left-7 top-[-9px] z-10 h-7 w-20 rotate-[-7deg] border-x border-white/40 bg-[#ead8c8]/80 shadow-sm" />
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
                <p className="absolute -bottom-1 right-0 z-10 rotate-[-3deg] font-serif text-sm italic text-[#9b7580]">from the 626, always in LA ♡</p>
              </div>
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

            {/* ORIGIN + ENTERTAINMENT MOTIVATION */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              how i got here
            </div>

            {/* SCRAPBOOK ORIGIN TIMELINE */}
            <div className="reveal-item relative overflow-hidden rounded-[32px] border border-black/5 bg-white/50 p-5 shadow-[0_20px_60px_rgba(68,44,29,0.05)] sm:p-8" data-delay={0}>
              <div aria-hidden="true" className="absolute bottom-9 left-8 right-8 hidden border-t border-dashed border-[#cdbfb5] sm:block" />
              <div className="relative grid gap-4 sm:grid-cols-5">
                {originTimeline.map((chapter, index) => (
                  <article
                    key={chapter.year}
                    className={`group relative rounded-[20px] border border-black/5 bg-gradient-to-br ${chapter.tone} p-5 shadow-[0_12px_32px_rgba(68,44,29,0.05)] transition-all duration-300 ${
                      index % 2 === 0 ? "sm:-rotate-[0.7deg]" : "sm:translate-y-5 sm:rotate-[0.8deg]"
                    } hover:z-10 hover:!-translate-y-2 hover:!rotate-0 hover:shadow-[0_20px_46px_rgba(68,44,29,0.12)]`}
                  >
                    <span className="font-serif text-[1.35rem] font-semibold text-[#b7808c]">{chapter.year}</span>
                    <p className="mt-3 text-[0.56rem] uppercase tracking-[0.22em] text-[#a89d96]">{chapter.label}</p>
                    <h2 className="mt-2 font-serif text-[1rem] font-semibold leading-snug text-[#1f1a18]">{chapter.title}</h2>
                    <p className="mt-3 text-[0.76rem] leading-6 text-[#5e5048]">{chapter.text}</p>
                    <span aria-hidden="true" className="absolute -bottom-[2.35rem] left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-[#f7f1eb] bg-[#b98c96] shadow-sm sm:block" />
                  </article>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-5">
                <p className="max-w-2xl text-[0.82rem] leading-7 text-[#5e5048]">
                  The tools changed, but the instinct stayed the same: notice what makes people care, then build around it.
                </p>
                <a
                  href="https://studio.code.org/projects/applab/UjzuxRowfB3RcT0DDziGpsX4uci2CGe7ZdsjWtmwuvY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/10 bg-white/75 px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#5f554f] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  my first Taylor Swift quiz ↗
                </a>
              </div>
              <div className="mt-5 grid gap-5 border-t border-black/5 pt-6 sm:grid-cols-2">
                <div className="border-l-2 border-[#d7aeb7] pl-4">
                  <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#a89d96]">why entertainment tech</p>
                  <p className="mt-2 text-[0.82rem] leading-7 text-[#5e5048]">Entertainment is more than content—it is how communities form identity. I want to build products and campaigns that deepen that connection.</p>
                </div>
                <div className="border-l-2 border-[#d8c8bc] pl-4">
                  <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#a89d96]">my visual language</p>
                  <p className="mt-2 text-[0.82rem] leading-7 text-[#5e5048]">Editorial campaigns, thoughtful typography, lace details, cinematic color, and interfaces that make complex work feel obvious and collectible.</p>
                </div>
              </div>
            </div>

            {false && (<>

            {/* ORIGIN */}
            <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={0}>
              <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">01</span>
              <div className="grid gap-6 lg:grid-cols-[1fr_120px]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">the origin</p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">It started with a free app and Harry Potter</h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-4">I was 10. I saw a fan edit on Vine and knew immediately I needed to learn how to do that.</p>
                  <p className="text-[0.88rem] leading-7 text-[#5e5048]">Started on Video Star because it was free. In 2018, I saved up for a MacBook Pro and got After Effects. That editing account became anqclic, generating 630K+ views and teaching me everything I know about pacing, typography, and audience drop-off.</p>
                  <p className="mt-4 text-[0.88rem] leading-7 text-[#5e5048]">That curiosity eventually led me to study Computer Science and Business Administration at USC, bridging my technical analytical background with my creative instincts for digital culture.</p>
                </div>
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

            {/* AESTHETIC + ENTERTAINMENT INTEREST */}
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={0}>
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">02</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">why entertainment tech</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">The intersection of tech, fandom, and media</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.92rem] font-medium leading-7 text-[#342d29] border-l-2 border-black/10 pl-3 mb-4">Entertainment isn't just content—it's how modern communities form identity.</p>
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">Growing up in Los Angeles, I’ve always been drawn to the entertainment ecosystem. I want to build at the intersection of creative tech, digital marketing, and product strategy—creating platforms, features, and campaigns that make users feel deeply connected to the stories they love.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["product strategy", "digital fandom", "creative tech", "la ecosystem", "gtm analytics"].map((t) => (
                    <span key={t} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">{t}</span>
                  ))}
                </div>
              </div>

              <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={80}>
                <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">03</span>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">my aesthetic</p>
                <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">Intentionality in the details</h2>
                <div className="my-4 h-px bg-black/5" />
                <p className="text-[0.88rem] leading-7 text-[#5e5048]">I appreciate editorial campaigns, thoughtful typography, and interfaces built with real care. Whether I'm building a multi-agent AI system or keyframing an edit in After Effects, my goal is always to make complex work feel obvious and collectible.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "lana del rey",
                    "baz luhrmann",
                    "editorial campaigns",
                    "selena's revival era",
                    "lace details",
                  ].map((t) => (
                    <span key={t} className="rounded-full border border-black/5 bg-[#fffaf6] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[#7c7068]">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CODING STORY */}
            <div className="reveal-item mt-4 rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)] relative overflow-hidden" data-delay={60}>
              <span className="pointer-events-none select-none absolute right-5 bottom-3 font-serif text-[5rem] font-semibold leading-none text-black/[0.025]">04</span>
              <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
                <div
                  className="hidden lg:flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] border border-black/8 text-[0.75rem] font-medium tracking-[0.05em] text-white/70"
                  style={{ background: "#1a1a2e", fontFamily: "monospace" }}
                >
                  &lt;/&gt;
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">the early builder</p>
                  <h2 className="mt-3 font-serif text-[1.18rem] font-semibold leading-snug text-[#1f1a18]">
                    My first app is still online
                  </h2>
                  <div className="my-4 h-px bg-black/5" />
                  <p className="text-[0.88rem] leading-7 text-[#5e5048]">
                    I built this in high school on Code.org: a Taylor Swift song quiz that matched your answers to a song. Looking back, the logic is a giant mountain of nested if-else statements, but it was the first time programming felt creative instead of intimidating. I keep it around as a reminder of where my CS path started.
                  </p>
                  <a
                    href="https://studio.code.org/projects/applab/UjzuxRowfB3RcT0DDziGpsX4uci2CGe7ZdsjWtmwuvY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#5f554f] transition hover:-translate-y-0.5 hover:text-[#201c1a] hover:bg-white"
                  >
                    play the original quiz ↗
                  </a>
                </div>
              </div>
            </div>

            </>)}

            {/* FAVORITE FILMS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              favorite films
            </div>

            <div className="reveal-item rounded-[28px] border border-black/5 bg-white/72 p-7 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
              <p className="mb-6 text-[0.72rem] uppercase tracking-[0.28em] text-[#a89d96]">letterboxd top 4 · in order</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {filmPosters.map((film, i) => (
                  <PosterCard key={film.title} title={film.title} note={film.note} poster={film.poster} index={i} />
                ))}
              </div>
              <p className="mt-6 text-[0.78rem] leading-7 text-[#5e5048]">
                Baz Luhrmann's color world, Greta Gerwig's warmth, Tarantino's LA—films made for people who notice details. Mean Girls is my comfort movie; I've lost count of how many times I've rewatched it.
              </p>
            </div>

            {/* SHIPS */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              top ships
            </div>

            <div className="reveal-item" data-delay={0}>
              <p className="mb-6 max-w-lg text-[0.88rem] leading-7 text-[#4d413b]">
                I will watch an entire series for a ship. I love the slow burn, the character dynamics, and the storytelling tension. Here are the ones that live in my head permanently.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
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

            <div className="grid items-start gap-4 lg:grid-cols-2">

              {/* WATCHING */}
              <div className="reveal-item relative overflow-hidden rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={0}>
                <div aria-hidden="true" className="absolute left-12 top-[4.35rem] z-10 h-5 w-16 -rotate-6 bg-[#ead8c8]/75 shadow-sm" />
                <div aria-hidden="true" className="absolute left-1/2 top-[4.2rem] z-10 h-5 w-16 -translate-x-1/2 rotate-3 bg-[#ead8c8]/75 shadow-sm" />
                <div aria-hidden="true" className="absolute right-12 top-[4.5rem] z-10 h-5 w-16 rotate-6 bg-[#ead8c8]/75 shadow-sm" />
                <p className="mb-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">watching</p>
                <div className="mb-5 grid grid-cols-3 gap-3">
                  {showPosters.slice(0, 3).map((show, i) => (
                    <PosterCard key={show.title} title={show.title} note="" poster={show.poster} index={i} />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {showPosters.map((show) => (
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
              <div className="reveal-item relative overflow-hidden rounded-[26px] border border-black/5 bg-white/72 p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)]" data-delay={80}>
                <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-[#342d29]/[0.035]" />
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

              {/* MAKING */}
              <div className="reveal-item relative overflow-hidden rounded-[26px] border border-[#e8a0b0]/15 bg-gradient-to-r from-[#fff8fa] via-white/75 to-[#fffaf6] p-6 shadow-[0_18px_50px_rgba(68,44,29,0.05)] lg:col-span-2" data-delay={160}>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">making / open tabs</p>
                    <p className="mt-2 font-serif text-lg italic text-[#4d413b]">things taking shape lately</p>
                  </div>
                  <span className="text-[0.58rem] uppercase tracking-[0.2em] text-[#c8bdb2]">03 works in progress</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {makingItems.map((item, i) => (
                    <div key={item.title} className={`group flex items-center gap-3 rounded-[16px] border border-black/5 bg-white/70 p-4 shadow-[0_8px_24px_rgba(68,44,29,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_32px_rgba(68,44,29,0.09)] ${i === 1 ? "sm:translate-y-2" : ""}`}>
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[10px] bg-[#ede5dc] flex items-center justify-center">
                        <span className="text-[0.62rem] uppercase tracking-[0.1em] text-[#8a7d75]">{i === 0 ? "edit" : i === 1 ? "web" : "lab"}</span>
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

            {/* MEMORY LOG */}
            <div className="my-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#7c7068]">
              <span className="h-px w-8 bg-[#c8bdb2]" />
              memory log
            </div>

            <div className="reveal-item" data-delay={0}>
              <p className="mb-5 max-w-lg text-[0.85rem] leading-7 text-[#4d413b]">
                concerts, trips, and small milestones that ended up mattering more than expected.
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-[2.6rem] h-px bg-black/5" />
                <div
                  className="flex gap-4 overflow-x-auto pb-3"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {memoryLog.map((item) => (
                    <MemoryCard key={item.title + item.date} item={item} />
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
                    className={`border border-black/10 px-4 py-2 text-sm text-[#5f554f] tracking-[0.03em] shadow-sm backdrop-blur-sm transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:rotate-0 hover:bg-white hover:shadow-md ${
                      i % 4 === 0
                        ? "-rotate-1 rounded-[4px] bg-[#fff5f7]"
                        : i % 4 === 1
                          ? "rotate-1 rounded-full bg-white/75"
                          : i % 4 === 2
                            ? "-rotate-[0.5deg] rounded-[12px] bg-[#fffaf0]"
                            : "rotate-[0.7deg] rounded-[3px] bg-[#f4f0eb]"
                    }`}
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </div>

            {/* DAD NOTE */}
            <div className="reveal-item relative mt-12 overflow-hidden border-y border-black/5 px-4 py-12 sm:px-10" data-delay={60}>
              <div aria-hidden="true" className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#e8a0b0]/10 blur-[55px]" />
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#a89d96]">a little note</p>
              <p className="relative mt-5 max-w-3xl font-serif text-[1.15rem] leading-9 text-[#4d413b] sm:text-[1.3rem]">
                I grew up all around the 626, but my dad worked across Los Angeles, so the city always felt like mine too. He passed in December. A lot of what drives me—the desire to build things with intention and leave something meaningful behind—comes from him.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.28em] text-[#a89d96]">for my dad · anqclic / creative archive</p>
            </div>

            {/* BOTTOM CTA */}
            <div className="reveal-item mt-10 flex flex-col items-center gap-4 border-t border-black/5 pt-8" data-delay={0}>
              <p className="text-[0.82rem] uppercase tracking-[0.28em] text-[#7c7068]">want to connect?</p>
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
