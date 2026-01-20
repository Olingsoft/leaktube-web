"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { Play, Loader2 } from "lucide-react";

const categories = ["All", "Music", "Gaming", "News", "Live", "Crypto", "Tech", "Sports", "Design", "Movies"];

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    // Mega links for thumbnails won't render as direct images in <img> tags
    if (!url || url.includes('mega.nz') || url.includes('mega.io')) {
      return "https://mega.nz/file/38ZU0Lga#KKuN0M31M0djmZY822iq0WiHdFw5MGcE6dpgtkrnsZk";
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
            {videos.map((video) => (
              <Link key={video._id} href={`/watch/${video._id}`} className="group relative">
                <div className="relative space-y-4">
                  {/* Thumbnail Layer */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-[#151515]">
                    <Image
                      src={getThumbnailUrl(video.thumbnailUrl)}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
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
                  <div className="flex space-x-2 md:space-x-4 px-1">
                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex-shrink-0 flex items-center justify-center group-hover:border-white/20 transition-colors">
                      <div className="w-5 h-5 md:w-7 md:h-7 rounded-md md:rounded-lg bg-[#FF2C80]/20 flex items-center justify-center text-[#FF2C80] text-[10px] md:text-xs font-black">
                        {video.title.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-[10px] md:text-base line-clamp-2 leading-tight md:leading-snug group-hover:text-[#FF2C80] transition-colors duration-300">
                        {video.title}
                      </h3>
                      <div className="mt-1 md:mt-2 flex flex-col md:flex-row md:items-center md:space-x-2 text-[8px] md:text-[11px] font-bold tracking-wider uppercase">
                        <span className="text-white/40 group-hover:text-white/60 transition-colors">{video.category || "General"}</span>
                        <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
                        <div className="flex items-center space-x-2">
                          <span className="text-white/20">{video.views?.toLocaleString() || 0} views</span>
                          <span className="text-white/20">{getRelativeTime(video.createdAt)}</span>
                        </div>
                      </div>
                    </div>
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



