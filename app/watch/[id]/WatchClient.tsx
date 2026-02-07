"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronLeft,
    Eye,
    ThumbsUp,
    MessageCircle,
    Share2,
    ArrowDownToLine
} from "lucide-react";
import { calculateViews, calculateLikes, getThumbnailUrl } from "@/utils/format";
import InVideoAd from "@/app/components/InVideoAd";
import HomeAdBanner from "@/app/components/HomeAdBanner";
import JuicyAdsInterstitial from "@/app/components/JuicyAdsInterstitial";

interface Video {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    category: string;
    thumbnailUrl: string;
    views: number;
    createdAt: string;
}

interface WatchClientProps {
    video: Video;
    relatedVideos: Video[];
    videoEmbedUrl: string;
    thumbnailUrl: string;
}

export default function WatchClient({
    video,
    relatedVideos,
    videoEmbedUrl,
    thumbnailUrl,
}: WatchClientProps) {
    return (
        <div className="max-w-[2000px] mx-auto flex flex-col xl:flex-row gap-8">
            {/* Main Video Section */}
            <div className="flex-1 space-y-6">
                {/* Back Button */}
                <div className="flex items-center px-4 md:px-3">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-[#D02752]/50 transition-all duration-300"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Videos</span>
                    </Link>
                </div>

                {/* Video Player Section */}
                <div className="relative aspect-video rounded-none md:rounded-[3rem] overflow-hidden bg-[#0a0a0a]">
                    <iframe
                        width="100%"
                        height="110%"
                        frameBorder="0"
                        src={videoEmbedUrl}
                        allowFullScreen
                        allow="autoplay;"
                        title={video.title}
                        className="absolute -top-[13%] left-0 w-full h-[110%] z-10"
                    ></iframe>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <InVideoAd />
                </div>

                {/* Video Info */}
                <div className="space-y-4 px-4 md:px-0">
                    <h1 className="text-xl md:text-lg font-black text-white tracking-tight leading-tight">
                        {video.title}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-1 overflow-x-auto scrollbar-none">
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all">
                                <Eye className="w-4 h-4 text-white/70" />
                                <span className="text-sm font-bold">{calculateViews(video._id, video.views || 0)}</span>
                            </button>
                            <div className="w-px h-6 bg-white/10" />
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all group">
                                <ThumbsUp className="w-4 h-4 group-hover:text-[#D02752]" />
                                <span className="text-sm font-bold">{calculateLikes(video._id, video.views || 0)}</span>
                            </button>
                            <div className="w-px h-6 bg-white/10" />
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all group">
                                <MessageCircle className="w-4 h-4 group-hover:text-[#D02752]" />
                            </button>
                            <div className="w-px h-6 bg-white/10" />
                            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all">
                                <Share2 className="w-4 h-4" />
                                <span className="hidden md:inline text-sm font-bold">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Small Screen Related Videos */}
                    <div className="xl:hidden space-y-4 py-4 border-b border-white/5">
                        <h4 className="text-sm font-black uppercase text-white/40 tracking-widest px-1">Related Videos</h4>
                        {relatedVideos.map((v) => (
                            <Link key={v._id} href={`/watch/${v._id}`} className="flex gap-4 group">
                                <div className="relative w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={getThumbnailUrl(v.thumbnailUrl) || "/placeholder.jpg"}
                                            alt={v.title}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-lg text-[8px] font-black text-white/80">
                                        05:00
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h5 className="text-white font-bold text-xs line-clamp-2 group-hover:text-[#D02752] transition-colors mb-1">
                                        {v.title}
                                    </h5>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider truncate">Unite Kenyans</p>
                                    <div className="flex items-center space-x-1.5 text-[10px] text-white/20 font-bold mt-0.5">
                                        <span>{calculateViews(v._id, v.views)}</span>
                                        <span className="w-0.5 h-0.5 bg-white/10 rounded-full" />
                                        <span>{new Date(v.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Description Box */}
                    <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
                        <div className="flex items-center space-x-3 text-[10px] md:text-sm font-bold">
                            <span className="text-white">{calculateViews(video._id, video.views || 0)} views</span>
                            <span className="text-white/40 truncate">Streamed on {new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-white/60 text-[11px] md:text-sm leading-relaxed max-w-4xl">
                            {video.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sidebar - Related & Ads */}
            <div className="w-full xl:w-[400px] space-y-6 px-4 md:px-0">
                <div className="p-4 bg-gradient-to-br from-[#1B3C53]/10 to-transparent border border-white/5 rounded-[2.5rem] relative overflow-hidden group flex justify-center">
                    <HomeAdBanner />
                    <JuicyAdsInterstitial />
                </div>

                <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase text-white/40 tracking-widest pl-2">Related Videos</h4>
                    {relatedVideos.map((v) => (
                        <Link key={v._id} href={`/watch/${v._id}`} className="flex gap-4 group">
                            <div className="relative w-40 aspect-video rounded-2xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={getThumbnailUrl(v.thumbnailUrl) || "/placeholder.jpg"}
                                    alt={v.title}
                                    fill
                                    unoptimized
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-lg text-[8px] font-black text-white/80">
                                    05:00
                                </div>
                            </div>
                            <div className="flex-1 space-y-1">
                                <h5 className="text-white font-bold text-xs line-clamp-2 group-hover:text-[#D02752] transition-colors">
                                    {v.title}
                                </h5>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Unite Kenyans</p>
                                <div className="flex items-center space-x-1.5 text-[10px] text-white/20 font-bold">
                                    <span>{calculateViews(v._id, v.views)}</span>
                                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                                    <span>{new Date(v.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="aspect-[4/3] rounded-[2.5rem] bg-white/[0.02] border border-white/5 border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                        <ArrowDownToLine className="w-6 h-6 text-white/20" />
                    </div>
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Premium Ad Slot</p>
                </div>
            </div>
        </div>
    );
}
