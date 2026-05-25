"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const LASTFM_API_KEY = "c23c1a26f6c242882d28b082dfa38a24";
const LASTFM_USER = "malfcytrash";

type Track = {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  isPlaying: boolean;
};

export default function NowPlaying() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  async function fetchTracks() {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=5`
      );
      const data = await res.json();
      const recent: Track[] = (data?.recenttracks?.track ?? []).map(
        (t: any, i: number) => ({
          name: t.name,
          artist: t.artist["#text"],
          album: t.album["#text"],
          image:
            t.image?.find((img: any) => img.size === "large")?.["#text"] ||
            t.image?.[2]?.["#text"] ||
            "",
          url: t.url,
          isPlaying: i === 0 && t["@attr"]?.nowplaying === "true",
        })
      );
      setTracks(recent);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTracks();
    const interval = setInterval(fetchTracks, 30_000);
    return () => clearInterval(interval);
  }, []);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading || tracks.length === 0) return null;

  const current = tracks[0];
  const rest = tracks.slice(1);

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      {/* PILL — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-3 rounded-[20px] border border-black/5 bg-white/70 px-4 py-3 shadow-[0_12px_32px_rgba(68,44,29,0.07)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_rgba(68,44,29,0.11)]"
      >
        {/* album art */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] border border-black/5">
          {current.image ? (
            <Image src={current.image} alt={current.album} fill sizes="40px" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-[#ede5dc]" />
          )}
        </div>

        {/* track info */}
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-[0.78rem] font-medium text-[#201c1a]">{current.name}</p>
          <p className="truncate text-[0.68rem] uppercase tracking-[0.16em] text-[#a89d96]">{current.artist}</p>
        </div>

        {/* status + chevron */}
        <div className="flex shrink-0 items-center gap-2">
          {current.isPlaying ? (
            <span className="flex items-end gap-[2px]" aria-label="now playing">
              <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar1" style={{ height: "10px" }} />
              <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar2" style={{ height: "14px" }} />
              <span className="w-[3px] rounded-full bg-[#7c7068] animate-bar3" style={{ height: "8px" }} />
            </span>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8bdb2]" />
          )}
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[#c8bdb2]">
            {current.isPlaying ? "live" : "recent"}
          </span>
          {/* chevron */}
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={`text-[#c8bdb2] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* EXPANDED DROPDOWN */}
      <div
        className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[20px] border border-black/5 bg-white/90 shadow-[0_20px_60px_rgba(68,44,29,0.12)] backdrop-blur-md transition-all duration-300 ease-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-3 pb-3 pt-3">
          <p className="mb-2 px-1 text-[0.62rem] uppercase tracking-[0.28em] text-[#c8bdb2]">
            recently played
          </p>
          <div className="flex flex-col gap-1">
            {rest.map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[14px] px-2 py-2 transition-all duration-150 hover:bg-[#f7f1eb]"
              >
                {/* art */}
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[8px] border border-black/5">
                  {t.image ? (
                    <Image src={t.image} alt={t.album} fill sizes="32px" className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-[#ede5dc]" />
                  )}
                </div>
                {/* info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.75rem] text-[#201c1a]">{t.name}</p>
                  <p className="truncate text-[0.65rem] uppercase tracking-[0.14em] text-[#a89d96]">{t.artist}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes barBounce1 {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes barBounce2 {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes barBounce3 {
          0%, 100% { transform: scaleY(0.6); }
          33% { transform: scaleY(1); }
          66% { transform: scaleY(0.3); }
        }
        .animate-bar1 { animation: barBounce1 0.9s ease-in-out infinite; transform-origin: bottom; }
        .animate-bar2 { animation: barBounce2 0.9s ease-in-out infinite 0.15s; transform-origin: bottom; }
        .animate-bar3 { animation: barBounce3 0.9s ease-in-out infinite 0.3s; transform-origin: bottom; }
      `}</style>
    </div>
  );
}