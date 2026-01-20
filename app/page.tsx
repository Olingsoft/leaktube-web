"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
import { Play, Loader2, Image as ImageIcon } from "lucide-react";

const categories = ["All", "Music", "Gaming", "News", "Live", "Crypto", "Tech", "Sports", "Design", "Movies"];

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/videos');
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
    fetchVideos();
  }, []);

  const getRelativeTime = (dateString: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const getThumbnailUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('mega.nz') || url.includes('mega.io')) {
      return getEmbedUrl(url);
    }
    return url;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-8 overflow-x-hidden">
        {/* Mobile Categories - Only visible on small screens */}
        <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-4 mb-4 scrollbar-none -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${cat === "All"
                ? "bg-white text-[#0a0a0a] shadow-lg"
                : "bg-white/5 text-white/60 border border-white/5"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <Loader2 className="w-12 h-12 text-[#FF2C80] animate-spin" />
            <p className="text-white/20 font-black uppercase tracking-widest animate-pulse">Scanning Archive...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 opacity-20">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-white flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xl">No files found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-10">
            {videos.map((video) => {
              const thumbUrl = getThumbnailUrl(video.thumbnailUrl);
              const videoUrl = video.videoUrl;
              // eg https://mega.nz/embed/etZyRYxI#_hMbsNucef-rchIVQBcKg3RIA2DEAxtYRgVO2sF1p6I!1a

              const videoId = video._id;
              return (
                <Link key={video._id} href={`/watch/${videoId}`} className="group relative">
                  <div className="relative space-y-4">
                    {/* Thumbnail Layer */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-[#151515] border border-white/5">
                      {thumbUrl ? (
                        thumbUrl.includes('mega.nz') || thumbUrl.includes('mega.io') ? (
                          <iframe
                            src={thumbUrl}
                            className="w-full h-full border-none pointer-events-none"
                            scrolling="no"
                          />
                        ) : (
                          <img
                            src={thumbUrl}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 text-white/10">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-[8px] font-black uppercase tracking-widest">No Preview</span>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                      {/* Duration Pin */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-xl text-white text-[10px] font-black border border-white/10">
                        {video.duration || "LINK"}
                      </div>
                    </div>

                    {/* Content Layer */}
                    <div className="flex space-x-3 px-1.5">
                      {/* Author Avatar/Icon */}
                      {/* <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex-shrink-0 flex items-center justify-center group-hover:border-[#FF2C80]/30 transition-all duration-500 shadow-inner">
                        <div className="w-5 h-5 rounded-lg bg-[#FF2C80]/10 flex items-center justify-center text-[#FF2C80] text-[9px] font-black tracking-tighter shadow-sm group-hover:bg-[#FF2C80]/20 transition-colors">
                          {video.title.charAt(0).toUpperCase()}
                        </div>
                      </div> */}

                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-white font-bold text-[10px] md:text-sm line-clamp-2 leading-[1.3] group-hover:text-[#FF2C80] transition-colors duration-300">
                          {video.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-white/70 text-[8px] md:text-[11px] font-black uppercase tracking-[0.15em] group-hover:text-white/70 transition-colors">
                            {video.category || "General"}
                          </span>

                          <div className="flex items-center space-x-1.5 border-l border-white/10 pl-2">
                            <span className="text-white/70 text-[8px] md:text-[11px] font-bold whitespace-nowrap">
                              {video.views?.toLocaleString() || 0} views
                            </span>
                            <span className="w-0.5 h-0.5 bg-white/0 rounded-full" />
                            <span className="text-white/70 text-[8px] md:text-[11px] font-bold whitespace-nowrap">
                              {getRelativeTime(video.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}




