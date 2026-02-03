"use client";

import React from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
    title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="ml-auto w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/10 text-white/60 hover:text-white"
        >
            <Share2 className="w-5 h-5" />
        </button>
    );
}
