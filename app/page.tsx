"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { Play } from "lucide-react";

const categories = ["All", "Music", "Gaming", "News", "Live", "Crypto", "Tech", "Sports", "Design", "Movies"];

const mockVideos = [
  {
    id: 1,
    title: "The Future of Matrix Technology",
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
    author: "NeoCyber",
    views: "1.2M",
    timestamp: "2 days ago",
    duration: "12:45"
  },
  {
    id: 2,
    title: "Deep Sea Exploration: 10,000m Down",
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800",
    author: "Oceanic",
    views: "850K",
    timestamp: "1 week ago",
    duration: "24:15"
  },
  {
    id: 3,
    title: "Cyberpunk City - 4K Cinematic Walk",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800",
    author: "NightCity",
    views: "3.4M",
    timestamp: "3 days ago",
    duration: "15:20"
  },
  {
    id: 4,
    title: "Hidden Gems of the Swiss Alps",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    author: "AlpineLife",
    views: "425K",
    timestamp: "5 days ago",
    duration: "10:30"
  },
  {
    id: 5,
    title: "Building the World's Fastest AI",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    author: "TechGenius",
    views: "2.1M",
    timestamp: "1 day ago",
    duration: "18:50"
  },
  {
    id: 6,
    title: "The Art of Minimalist Living",
    thumbnail: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
    author: "ZenMaster",
    views: "920K",
    timestamp: "2 weeks ago",
    duration: "08:15"
  },
  {
    id: 7,
    title: "Street Food Tour - Tokyo Night Edition",
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    author: "FoodieJap",
    views: "5.6M",
    timestamp: "1 month ago",
    duration: "32:10"
  },
  {
    id: 8,
    title: "Mars Colony: 24 Hours on the Red Planet",
    thumbnail: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800",
    author: "SpaceXFan",
    views: "1.8M",
    timestamp: "4 days ago",
    duration: "21:40"
  }
];

export default function Home() {
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-10">
          {mockVideos.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="group relative">
              <div className="relative space-y-4">
                {/* Thumbnail Layer */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <Image
                    src={video.thumbnail}
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
                    {video.duration}
                  </div>
                </div>

                {/* Content Layer */}
                <div className="flex space-x-2 md:space-x-4 px-1">
                  <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex-shrink-0 flex items-center justify-center group-hover:border-white/20 transition-colors">
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-md md:rounded-lg bg-[#FF2C80]/20 flex items-center justify-center text-[#FF2C80] text-[10px] md:text-xs font-black">
                      {video.author.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-[10px] md:text-base line-clamp-2 leading-tight md:leading-snug group-hover:text-[#FF2C80] transition-colors duration-300">
                      {video.title}
                    </h3>
                    <div className="mt-1 md:mt-2 flex flex-col md:flex-row md:items-center md:space-x-2 text-[8px] md:text-[11px] font-bold tracking-wider uppercase">
                      <span className="text-white/40 group-hover:text-white/60 transition-colors">{video.author}</span>
                      <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
                      <div className="flex items-center space-x-2">
                        <span className="text-white/20">{video.views} views</span>
                        <span className="text-white/20">{video.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


