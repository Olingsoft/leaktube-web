import React from "react";
import { ChevronLeft } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#070707] text-white">
            <div className="max-w-[2000px] mx-auto flex flex-col xl:flex-row gap-8 pb-20">
                {/* Main Content Skeleton */}
                <div className="flex-1 space-y-6">
                    {/* Back Button Placeholder */}
                    <div className="flex items-center px-4 md:px-0 pt-4 md:pt-6">
                        <div className="h-10 w-32 bg-white/5 rounded-xl animate-pulse" />
                    </div>

                    {/* Video Player Placeholder */}
                    <div className="relative aspect-video rounded-none md:rounded-[3rem] overflow-hidden bg-white/5 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
                    </div>

                    {/* Info Section Placeholder */}
                    <div className="space-y-4 px-4 md:px-0">
                        {/* Title */}
                        <div className="h-8 w-3/4 bg-white/5 rounded-lg animate-pulse" />

                        {/* Stats Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-1 h-12 w-full md:w-auto animate-pulse" />
                        </div>

                        {/* Description Box */}
                        <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-3xl space-y-3 h-40 animate-pulse" />
                    </div>
                </div>

                {/* Sidebar Placeholder */}
                <div className="w-full xl:w-[400px] space-y-6 px-4 md:px-0 pt-4 md:pt-6">
                    {/* Ad Placeholder */}
                    <div className="aspect-[4/3] rounded-[2.5rem] bg-white/5 border border-white/5 animate-pulse" />

                    {/* Related Videos List */}
                    <div className="space-y-6">
                        <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-40 aspect-video rounded-2xl bg-white/5 animate-pulse shrink-0" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                    <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
