"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Play,
  Loader2,
  Image as ImageIcon,
  Search,
  Eye,
  Clock,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  X
} from "lucide-react";
import { getApiUrl, API_BASE_URL } from "@/utils/api";

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const router = useRouter();

  const [videos, setVideos] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const desktopCategoryRef = useRef<HTMLDivElement>(null);
  const mobileCategoryRef = useRef<HTMLDivElement>(null);

  /* ------------------ Click Outside to Close Category Dropdown ------------------ */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop = !desktopCategoryRef.current?.contains(event.target as Node);
      const isOutsideMobile = !mobileCategoryRef.current?.contains(event.target as Node);

      if (isOutsideDesktop && isOutsideMobile) {
        setIsMobileCatOpen(false);
      }
    };

    if (isMobileCatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileCatOpen]);

  /* ------------------ Fetch Trending ------------------ */
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch(getApiUrl("/api/trends"));
        const data = await res.json();
        if (data.success) setTrends(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTrends();
  }, []);

  const handleTrendClick = (trend: any) => {
    if (trend.assignedVideo) {
      const videoId =
        typeof trend.assignedVideo === "object"
          ? trend.assignedVideo._id
          : trend.assignedVideo;
      router.push(`/watch/${videoId}`);
    } else {
      setSearchQuery(trend.phrase);
      setShowSearch(true);
    }
  };

  /* ------------------ Helpers ------------------ */
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("mega.nz") || url.includes("mega.io")) {
      const parts = url.split("/");
      const filePart = parts[parts.length - 1];
      if (filePart.includes("#")) {
        const [id, key] = filePart.replace("file/", "").split("#");
        return `https://mega.nz/embed/${id}#${key}`;
      }
    }
    return url;
  };

  const getThumbnailUrl = (url: string) => {
    if (!url) return undefined;
    if (url.includes("localhost:8000")) {
      return url.replace("http://localhost:8000", API_BASE_URL);
    }
    return url;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "Just now";
  };

  const calculateViews = (id: string, base = 0) => {
    const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (base + ((seed % 43000) + 7000)).toLocaleString();
  };

  /* ------------------ Fetch Videos ------------------ */
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      let url = getApiUrl("/api/videos");
      if (categoryParam) url += `?category=${encodeURIComponent(categoryParam)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setVideos(data.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [categoryParam]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(getApiUrl("/api/categories"));
      const data = await res.json();
      if (data.success) {
        setCategories(["All", ...data.data.map((c: any) => c.name)]);
      }
    };
    fetchCategories();
  }, []);

  /* ========================== UI ========================== */
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 pt-1 md:pt-1">

        {/* ---------------- Mini Header: Trending + Category + Search ---------------- */}
        <div className="mb-8 relative z-[9999]">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            {/* Trending Section */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[#e15aed] shrink-0">
                <div className="p-2 rounded-xl bg-[#e15aed]/10">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-black tracking-widest uppercase whitespace-nowrap">
                  Trending
                </span>
              </div>
              <div className="flex flex-wrap gap-2 min-w-0">
                {trends.slice(0, 4).map((t) => (
                  <button
                    key={t._id}
                    onClick={() => handleTrendClick(t)}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#D02752] hover:bg-[#e15aed]/10 transition-all"
                  >
                    {t.phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-white/10"></div>

            {/* Category Dropdown */}
            <div ref={desktopCategoryRef} className="relative z-[9999]">
              <button
                onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition whitespace-nowrap"
              >
                <span className="text-sm">{categoryParam || "All Categories"}</span>
                {isMobileCatOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isMobileCatOpen && (
                <div className="absolute top-full mt-2 right-0 min-w-[250px] bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-wrap gap-2 backdrop-blur-xl z-[999]">
                  {categories.map((cat) => {
                    const active = (cat === "All" && !categoryParam) || cat === categoryParam;
                    return (
                      <Link
                        key={cat}
                        href={cat === "All" ? "/" : `/?category=${cat}`}
                        onClick={() => setIsMobileCatOpen(false)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition ${active
                          ? "bg-[#e15aed] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-white/10"></div>

            {/* Search */}
            <div className="shrink-0">
              {!showSearch ? (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition group"
                >
                  <Search className="w-5 h-5 text-white/70 group-hover:text-white transition" />
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl w-[280px] animate-in fade-in zoom-in backdrop-blur-xl">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearch(false);
                    }}
                    className="hover:scale-110 transition"
                  >
                    <X className="w-4 h-4 text-white/40 hover:text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">
            {/* Top Row: Category + Search */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
              {/* Category Dropdown */}
              <div ref={mobileCategoryRef} className="relative flex-1 z-[9999]">
                <button
                  onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm"
                >
                  <span className="truncate">{categoryParam || "All Categories"}</span>
                  {isMobileCatOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </button>

                {isMobileCatOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-wrap gap-2 backdrop-blur-xl z-[999]">
                    {categories.map((cat) => {
                      const active = (cat === "All" && !categoryParam) || cat === categoryParam;
                      return (
                        <Link
                          key={cat}
                          href={cat === "All" ? "/" : `/?category=${cat}`}
                          onClick={() => setIsMobileCatOpen(false)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${active
                            ? "bg-[#e15aed] text-white"
                            : "bg-white/5 text-white/60"
                            }`}
                        >
                          {cat}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Search Button */}
              {!showSearch ? (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <Search className="w-5 h-5 text-white/70" />
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 backdrop-blur-xl">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearch(false);
                    }}
                    className="hover:scale-110 transition"
                  >
                    <X className="w-4 h-4 text-white/40 hover:text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Trending Section */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#e15aed] mb-3">
                <div className="p-2 rounded-xl bg-[#e15aed]/10">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-black tracking-widest uppercase">
                  Trending Now
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trends.map((t) => (
                  <button
                    key={t._id}
                    onClick={() => handleTrendClick(t)}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-[#D02752] hover:bg-[#e15aed]/10 transition-all"
                  >
                    {t.phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Videos Grid ---------------- */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-3xl bg-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos
              .filter((v) =>
                searchQuery
                  ? v.title?.toLowerCase().includes(searchQuery.toLowerCase())
                  : true
              )
              .map((video) => (
                <Link
                  key={video._id}
                  href={`/watch/${video._id}`}
                  className="group space-y-3"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#151515] border border-white/5">
                    {video.thumbnailUrl ? (
                      <img
                        src={getThumbnailUrl(video.thumbnailUrl)}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/10">
                        <ImageIcon />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-sm line-clamp-2 group-hover:text-[#e15aed]">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/50 text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {calculateViews(video._id)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(video.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          <Loader2 className="w-10 h-10 animate-spin text-[#1B3C53]" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
