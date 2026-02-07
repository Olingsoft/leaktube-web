"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import {
    Play,
    Image as ImageIcon,
    Search,
    Eye,
    Clock,
    ChevronDown,
    ChevronUp,
    TrendingUp,
    X
} from "lucide-react";
import { slugify } from "@/utils/seo";
import { getThumbnailUrl, getRelativeTime, calculateViews } from "@/utils/format";
import VideoGridAd from "./components/VideoGridAd";
import HomeAdBanner from "./components/HomeAdBanner";
import TopBannerAd from "./components/TopBannerAd";

interface HomeClientProps {
    initialVideos: any[];
    trends: any[];
    categories: string[];
    categoryParam: string | undefined;
    initialSearch?: string;
}

export default function HomeClient({
    initialVideos,
    trends,
    categories,
    categoryParam,
    initialSearch = ""
}: HomeClientProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(!!initialSearch);
    const desktopCategoryRef = useRef<HTMLDivElement>(null);
    const mobileCategoryRef = useRef<HTMLDivElement>(null);
    const [isAgeVerified, setIsAgeVerified] = useState(false);

    useEffect(() => {
        const verified = localStorage.getItem("age_verified");
        if (verified === "true") {
            setIsAgeVerified(true);
        }

        const handleVerified = () => setIsAgeVerified(true);
        window.addEventListener("ageVerified", handleVerified);
        return () => window.removeEventListener("ageVerified", handleVerified);
    }, []);

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

    const handleTrendClick = (trend: any) => {
        if (trend.assignedVideo) {
            const videoId = typeof trend.assignedVideo === "object" ? trend.assignedVideo._id : trend.assignedVideo;
            const videoTitle = typeof trend.assignedVideo === "object" ? trend.assignedVideo.title : trend.phrase;
            router.push(`/watch/${slugify(videoTitle)}-${videoId}`);
        } else {
            setSearchQuery(trend.phrase);
            setShowSearch(true);
        }
    };

    const filteredVideos = initialVideos.filter((v) => {
        const matchesSearch = searchQuery ? v.title?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesSearch;
    });

    return (
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 pt-1">
            <TopBannerAd />
            {/* Mini Header: Trending + Category + Search */}
            {isAgeVerified && (
                <div className="mb-8 relative z-[9999]">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[#e15aed] shrink-0">
                                <div className="p-2 rounded-xl bg-[#e15aed]/10">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-black tracking-widest uppercase whitespace-nowrap">Trending</span>
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

                        <div className="w-px h-10 bg-white/10"></div>

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
                                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition ${active ? "bg-[#e15aed] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                                            >
                                                {cat}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="w-px h-10 bg-white/10"></div>

                        <div className="shrink-0">
                            {!showSearch ? (
                                <button onClick={() => setShowSearch(true)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition group">
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
                                    <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="hover:scale-110 transition">
                                        <X className="w-4 h-4 text-white/40 hover:text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
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
                                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${active ? "bg-[#e15aed] text-white" : "bg-white/5 text-white/60"}`}
                                                >
                                                    {cat}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {!showSearch ? (
                                <button onClick={() => setShowSearch(true)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
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
                                    <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="hover:scale-110 transition">
                                        <X className="w-4 h-4 text-white/40 hover:text-white" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 text-[#e15aed] mb-3">
                                <div className="p-2 rounded-xl bg-[#e15aed]/10">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-black tracking-widest uppercase">Trending Now</span>
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
            )}

            {/* Mobile Only Ad Banner */}
            <div className="md:hidden mb-6">
                <HomeAdBanner />
            </div>

            {/* <div className="mb-8">
                <HomeAdBanner />
            </div> */}

            {/* Videos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video, index) => (
                    <React.Fragment key={video._id}>
                        <Link
                            href={`/watch/${slugify(video.title)}-${video._id}`}
                            className="group space-y-3"
                        >
                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#151515] border border-white/5">
                                {video.thumbnailUrl ? (
                                    <NextImage
                                        src={getThumbnailUrl(video.thumbnailUrl) || ""}
                                        alt={video.title}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-110 transition"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
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
                                        {calculateViews(video._id, video.views)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {getRelativeTime(video.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {(index + 1) % 8 === 0 && <VideoGridAd />}
                    </React.Fragment>
                ))}
            </div>
        </div >
    );
}
