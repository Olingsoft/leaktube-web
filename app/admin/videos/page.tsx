"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    ChevronDown,
    Plus,
    Download,
    Link as LinkIcon,
    Image as ImageIcon,
    X,
    Play
} from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "../../../utils/api";
import { getThumbnailUrl as getCentralizedThumbnailUrl } from "@/utils/format";

const mockVideos = [
    {
        id: "1",
        title: "The Future of Web Development in 2026",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
        author: "TechVibe",
        views: "1.2M",
        status: "Published",
        date: "2026-01-18",
        duration: "12:45"
    },
    {
        id: "2",
        title: "Exploring Hidden Treasures of the Deep Sea",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=600",
        author: "NatureExplorer",
        views: "850K",
        status: "Review",
        date: "2026-01-19",
        duration: "24:12"
    },
    {
        id: "3",
        title: "Cyberpunk City - Cinematic 4K Experience",
        thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=600",
        author: "CinemaCraft",
        views: "3.5M",
        status: "Published",
        date: "2026-01-15",
        duration: "08:15"
    },
    {
        id: "4",
        title: "Ultimate Gaming Setup Tour 2026",
        thumbnail: "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&q=80&w=600",
        author: "GamerPro",
        views: "2.1M",
        status: "Draft",
        date: "2026-01-20",
        duration: "18:30"
    },
];



export default function ManageVideos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [videos, setVideos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [previewVideo, setPreviewVideo] = useState<any | null>(null);

    const categories = ['All', 'Trending', 'Premium', 'Gaming', 'Music', 'Movies'];

    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        // Handle Mega.nz
        if (url.includes('mega.nz') || url.includes('mega.io')) {
            const parts = url.split('/');
            const filePart = parts[parts.length - 1];
            if (filePart.includes('#')) {
                const [id, key] = filePart.replace('file/', '').split('#');
                return `https://mega.nz/embed/${id}#${key}`;
            }
            return url.replace('mega.nz/file/', 'mega.nz/embed/').replace('mega.nz/#', 'mega.nz/embed/#');
        }
        return url;
    };

    const getThumbnailUrl = (video: any) => {
        const url = video.thumbnailUrl;
        if (!url) return null;

        // 1. Resolve relative/localhost URLs using centralized utility
        const resolvedUrl = getCentralizedThumbnailUrl(url);

        // 2. Handle Mega.nz for thumbnails (we use embed in iframe)
        if (resolvedUrl && (resolvedUrl.includes('mega.nz') || resolvedUrl.includes('mega.io'))) {
            return getEmbedUrl(resolvedUrl);
        }
        return resolvedUrl;
    };

    const getVideoSource = (video: any) => {
        const url = video.videoUrl;
        if (!url) return "";

        // If it's a Mega link, we need the embed version
        if (url.includes('mega.nz') || url.includes('mega.io')) {
            return getEmbedUrl(url);
        }

        // Only append #t=1 for actual video files
        if (url.includes('.mp4') || url.includes('.webm') || url.includes('.m4v')) {
            return `${url}#t=1`;
        }
        return url;
    };

    const fetchVideos = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            if (searchTerm) query.append('search', searchTerm);
            if (selectedCategory !== 'All') query.append('category', selectedCategory);

            const response = await fetch(`${API_BASE_URL}/api/videos?${query.toString()}`);
            const data = await response.json();
            if (data.success) {
                setVideos(data.data);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVideos();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        setIsDeleting(id);
        try {
            const response = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setVideos(prev => prev.filter(v => v._id !== id));
            }
        } catch (error) {
            console.error("Error deleting video:", error);
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="p-4 w-[98%] md:p-8 space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Manage <span className="text-[#1B3C53]">Videos</span></h1>
                    <p className="text-white/40 font-medium">You have total {videos.length} videos published.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/add-content" className="flex items-center space-x-2 px-8 py-3 bg-[#1B3C53] rounded-2xl text-white hover:scale-[1.05] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(27,60,83,0.2)]">
                        <Plus className="w-5 h-5" />
                        <span>Add New Video</span>
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl flex flex-col lg:flex-row gap-6 shadow-2xl">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#1B3C53] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 transition-all font-semibold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${selectedCategory === cat
                                ? "bg-[#1B3C53] border-[#1B3C53] text-white shadow-[0_10px_20px_rgba(27,60,83,0.2)]"
                                : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Videos Grid/Table */}
            <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-[#1B3C53]/20">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="px-8 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Content Info</th>
                                <th className="px-4 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Category</th>
                                <th className="px-4 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Stats</th>
                                <th className="px-4 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Added At</th>
                                <th className="px-8 py-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-10 py-8">
                                            <div className="h-16 bg-white/5 rounded-2xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : videos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-10 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4 opacity-20">
                                            <div className="p-6 rounded-full bg-white/5">
                                                <Eye className="w-12 h-12" />
                                            </div>
                                            <p className="font-black uppercase tracking-[0.2em]">No videos found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                videos.map((video) => {
                                    const thumbUrl = getThumbnailUrl(video);
                                    const vSource = getVideoSource(video);

                                    return (
                                        <tr key={video._id} className="group hover:bg-white/[0.03] transition-all duration-300">
                                            <td className="px-8 py-6 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                                                <div className="flex items-center space-x-6">
                                                    <div className="relative w-32 h-20 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 group-hover:scale-105 transition-all duration-500 bg-[#0f0f0f] border border-white/5">
                                                        {thumbUrl ? (
                                                            thumbUrl.includes('mega.nz') || thumbUrl.includes('mega.io') ? (
                                                                <iframe
                                                                    src={thumbUrl}
                                                                    className="absolute inset-0 w-full h-full border-none pointer-events-none"
                                                                    style={{ transform: 'scale(1.5)' }} // Zoom in slightly to fill the box
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={thumbUrl}
                                                                    alt={video.title}
                                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                                                />
                                                            )
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 opacity-20 text-white">
                                                                <ImageIcon className="w-6 h-6" />
                                                                <span className="text-[8px] font-black uppercase">No Preview</span>
                                                            </div>
                                                        )}

                                                        {/* Video Preview on Hover */}
                                                        {vSource.includes('mega.nz') || vSource.includes('mega.io') ? (
                                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <iframe
                                                                    src={vSource}
                                                                    className="w-full h-full border-none pointer-events-none"
                                                                    style={{ transform: 'scale(1.2)' }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <video
                                                                src={vSource}
                                                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                                muted
                                                                playsInline
                                                                preload="none"
                                                                onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                                                                onMouseOut={(e) => {
                                                                    const v = (e.target as HTMLVideoElement);
                                                                    v.pause();
                                                                    v.currentTime = 0;
                                                                }}
                                                            />
                                                        )}

                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                                                        <div className="flex items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                            <div className="p-2 rounded-full bg-[#1B3C53] text-white">
                                                                <Play className="w-4 h-4 fill-current" />
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-2 right-2 bg-[#1B3C53] px-2 py-0.5 rounded-lg text-[8px] font-black text-white shadow-lg pointer-events-none">
                                                            {video.duration || "LINK"}
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-base font-bold text-white truncate max-w-[300px] group-hover:text-[#1B3C53] transition-colors">{video.title}</p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <LinkIcon className="w-3 h-3 text-white/20" />
                                                            <p className="text-xs text-white/20 font-medium truncate max-w-[200px]">{video.videoUrl}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                                                <div className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-white/60 w-fit">
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{video.category}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center space-x-2">
                                                        <Eye className="w-3.5 h-3.5 text-[#1B3C53]" />
                                                        <span className="text-xs font-black text-white">{video.views.toLocaleString()}</span>
                                                    </div>
                                                    <p className="text-[10px] font-black text-white/10 uppercase">Total Views</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-6 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black text-white/60">{new Date(video.createdAt).toLocaleDateString()}</p>
                                                    <p className="text-[10px] font-black text-white/10 uppercase">{new Date(video.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/20 hover:text-white transition-all group/btn">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(video._id);
                                                        }}
                                                        disabled={isDeleting === video._id}
                                                        className="p-3 bg-white/5 hover:bg-red-500/20 rounded-2xl text-white/20 hover:text-red-500 transition-all disabled:opacity-50"
                                                    >
                                                        {isDeleting === video._id ? (
                                                            <div className="w-4 h-4 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                    <button className="p-3 bg-white/5 hover:bg-[#1B3C53]/20 rounded-2xl text-white/20 hover:text-[#1B3C53] transition-all">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Meta */}
                {!isLoading && videos.length > 0 && (
                    <div className="p-8 border-t border-white/5 flex items-center justify-center">
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">End of results • {videos.length} videos loaded</p>
                    </div>
                )}
            </div>

            {/* Video Preview Modal */}
            {previewVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(27,60,83,0.2)] border border-white/10">
                        {/* Modal Header */}
                        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-2xl bg-[#1B3C53] text-white shadow-lg shadow-[#1B3C53]/20">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">{previewVideo.title}</h3>
                                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{previewVideo.category} • {previewVideo.views?.toLocaleString() || 0} previews</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setPreviewVideo(null)}
                                className="p-4 bg-white/5 hover:bg-red-500/20 rounded-2xl text-white/40 hover:text-red-500 transition-all active:scale-95 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        {/* Video Player Iframe */}
                        <div className="w-full h-full pt-20">
                            <iframe
                                src={getEmbedUrl(previewVideo.videoUrl)}
                                className="w-full h-full border-none"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>

                        {/* Modal Footer Meta */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Playing from external secure server</span>
                                </div>
                                <div className="flex items-center space-x-2 text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    <span>Source: {previewVideo.videoUrl?.split('/')[2] || 'Direct Stream'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
