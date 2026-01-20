"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import {
    Play,
    ThumbsUp,
    ThumbsDown,
    Share2,
    MoreVertical,
    Flag,
    ListPlus,
    ArrowDownToLine,
    Loader2,
    Eye,
    MessageCircle
} from "lucide-react";
import { getApiUrl, API_BASE_URL } from "@/utils/api";

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



export default function WatchPage() {
    const params = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        if (url.includes('mega.nz')) {
            const cleanedUrl = url.replace('https://mega.nz/embed/', '').replace('https://mega.nz/file/', '');
            return `https://mega.nz/embed/${cleanedUrl}`; // Ensure # is preserved if it wasn't stripped, or just use as is if browser handles it.
            // Actually, the previous logic was: remove prefix, then encodeURIComponent if needed, or just append. 
            // IF we assume the API returns the FULL URL, we just need to ensure the IFRAME src is correct.
            // If the backend returns `https://mega.nz/file/ID#KEY`, we want `https://mega.nz/embed/ID#KEY`.
            // Simple replace is safest.
            return url.replace('mega.nz/file/', 'mega.nz/embed/');
        }
        return url;
    };

    const getThumbnailUrl = (url: string) => {
        if (!url) return null;
        if (url.includes('mega.nz') || url.includes('mega.io')) {
            return getEmbedUrl(url);
        }
        // Fix for images stored with localhost URL when accessing from other devices
        if (url.includes('localhost:8000')) {
            return url.replace('http://localhost:8000', API_BASE_URL);
        }
        return url;
    };

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                if (!params.id) return;

                // Try fetching as if it is a Mongo ID
                const response = await fetch(getApiUrl(`/api/videos/${params.id}`));
                const data = await response.json();

                if (data.success) {
                    setVideo(data.data);

                    // Fetch related videos
                    const relatedResponse = await fetch(getApiUrl(`/api/videos?category=${encodeURIComponent(data.data.category)}`));
                    const relatedData = await relatedResponse.json();
                    if (relatedData.success) {
                        setRelatedVideos(relatedData.data.filter((v: Video) => v._id !== params.id));
                    }
                } else {
                    // Handle case where params.id is NOT a mongo ID but might be a legacy Mega ID (though user said they want to pass video._id)
                    // If fetch fails, we could optionally fallback to treating params.id as a mega ID for backward compat
                    console.error("Video not found via API");
                }
            } catch (error) {
                console.error("Error fetching video:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-12 h-12 text-[#FF2C80] animate-spin" />
                    <p className="text-white/40 font-black uppercase tracking-widest text-sm animate-pulse">Loading Stream...</p>
                </div>
            </div>
        );
    }

    if (!video) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
                <p className="text-white/40 font-black uppercase tracking-widest">Video Not Found</p>
            </div>
        );
    }

    const videoEmbedUrl = getEmbedUrl(video.videoUrl);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-72 md:p-8 pt-0 md:pt-8 pb-20 overflow-x-hidden">
                <div className="max-w-[1700px] mx-auto flex flex-col xl:flex-row gap-8">

                    {/* Main Video Section */}
                    <div className="flex-1 space-y-6 px-3">
                        {/* Video Player Placeholder */}
                        <div className="relative aspect-[4/3] md:aspect-video rounded-none md:rounded-[2.5rem] overflow-hidden bg-black/40 border-b md:border border-white/5 shadow-2xl group">
                            {/* embed mega player */}
                            <iframe width="100%" height="100%" frameBorder="0" src={videoEmbedUrl} allowFullScreen allow="autoplay;"></iframe>
                        </div>

                        {/* Video Info */}
                        <div className="space-y-4 px-4 md:px-0">
                            <h1 className="text-xl md:text-lg font-black text-white tracking-tight leading-tight">
                                {video.title}
                            </h1>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">


                                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-1 overflow-x-auto scrollbar-none">
                                    {/* Views */}
                                    <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all">
                                        <Eye className="w-4 h-4 text-white/70" />
                                        <span className="text-sm font-bold">{video.views?.toLocaleString() || "0"}</span>
                                    </button>
                                    <div className="w-px h-6 bg-white/10" />

                                    {/* Likes */}
                                    <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all group">
                                        <ThumbsUp className="w-4 h-4 group-hover:text-[#FF2C80]" />
                                        <span className="text-sm font-bold">42K</span>
                                    </button>
                                    <div className="w-px h-6 bg-white/10" />

                                    {/* Comments */}
                                    <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all group">
                                        <MessageCircle className="w-4 h-4 group-hover:text-[#FF2C80]" />
                                        <span className="text-sm font-bold">1.2K</span>
                                    </button>
                                    <div className="w-px h-6 bg-white/10" />

                                    {/* Share */}
                                    <button className="flex items-center space-x-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all">
                                        <Share2 className="w-4 h-4" />
                                        <span className="hidden md:inline text-sm font-bold">Share</span>
                                    </button>
                                </div>
                            </div>
                            {/* Small Screen Related Videos */}
                            <div className="xl:hidden space-y-4 py-4 border-b border-white/5">
                                <h4 className="text-sm font-black uppercase text-white/40 tracking-widest px-1">Related Videos</h4>
                                {relatedVideos.map((video) => (
                                    <Link key={video._id} href={`/watch/${video._id}`} className="flex gap-4 group">
                                        <div className="relative w-32 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={getThumbnailUrl(video.thumbnailUrl) || "/placeholder.jpg"}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-lg text-[8px] font-black text-white/80">
                                                {/* {video.duration} */} 05:00
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h5 className="text-white font-bold text-xs ring-1 ring-transparent line-clamp-2 group-hover:text-[#FF2C80] transition-colors mb-1">
                                                {video.title}
                                            </h5>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider truncate">LeakTube</p>
                                            <div className="flex items-center space-x-1.5 text-[10px] text-white/20 font-bold mt-0.5">
                                                <span>{video.views?.toLocaleString()}</span>
                                                <span className="w-0.5 h-0.5 bg-white/10 rounded-full" />
                                                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Description Box */}
                            <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3">
                                <div className="flex items-center space-x-3 text-[10px] md:text-sm font-bold">
                                    <span className="text-white">{video.views?.toLocaleString() || 0} views</span>
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

                        {/* Sidebar Ad 1 */}
                        <div className="p-8 bg-gradient-to-br from-[#FF2C80]/10 to-transparent border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-4 left-4 text-[8px] font-black uppercase text-white/20 tracking-[0.2em]">Ad Placement</div>
                            <p className="text-white/60 text-xs font-bold leading-tight mb-4 mt-2">Get 3 months of LeakTube+ for the price of one.</p>
                            <button className="w-full py-2.5 bg-gradient-to-r from-[#FF2C80] to-[#990764] rounded-xl text-[10px] font-black uppercase text-white shadow-xl hover:shadow-[0_0_20px_#FF2C80/40] transition-all">
                                Claim Offer
                            </button>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-black uppercase text-white/40 tracking-widest pl-2">Up Next</h4>
                            {relatedVideos.map((video) => (
                                <Link key={video._id} href={`/watch/${video._id}`} className="flex gap-4 group">
                                    <div className="relative w-40 aspect-video rounded-2xl overflow-hidden flex-shrink-0">
                                        <Image
                                            src={getThumbnailUrl(video.thumbnailUrl) || "/placeholder.jpg"}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-lg text-[8px] font-black text-white/80">
                                            05:00
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h5 className="text-white font-bold text-xs ring-1 ring-transparent line-clamp-2 group-hover:text-[#FF2C80] transition-colors">
                                            {video.title}
                                        </h5>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">LeakTube</p>
                                        <div className="flex items-center space-x-1.5 text-[10px] text-white/20 font-bold">
                                            <span>{video.views?.toLocaleString()}</span>
                                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                                            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Sidebar Ad 2 */}
                        <div className="aspect-[4/3] rounded-[2.5rem] bg-white/[0.02] border border-white/5 border-dashed flex flex-col items-center justify-center p-8 text-center space-y-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <ArrowDownToLine className="w-6 h-6 text-white/20" />
                            </div>
                            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Premium Ad Slot</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
