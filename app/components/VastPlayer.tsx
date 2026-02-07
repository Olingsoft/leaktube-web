"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";

interface VastPlayerProps {
    vastUrl: string;
    onEnded: () => void;
}

export default function VastPlayer({ vastUrl, onEnded }: VastPlayerProps) {
    const [mediaUrl, setMediaUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [canSkip, setCanSkip] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchVast = async () => {
            try {
                const response = await fetch(vastUrl);
                const text = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, "text/xml");

                // Simple VAST parsing logic
                // Try to find the first MP4/WebM MediaFile
                const mediaFiles = Array.from(xml.getElementsByTagName("MediaFile"));

                let selectedMedia = null;
                // Prioritize mp4
                selectedMedia = mediaFiles.find(mf => mf.getAttribute("type")?.includes("mp4") || mf.textContent?.includes(".mp4"));

                if (!selectedMedia && mediaFiles.length > 0) {
                    selectedMedia = mediaFiles[0];
                }

                if (selectedMedia && selectedMedia.textContent) {
                    if (isMounted) {
                        setMediaUrl(selectedMedia.textContent.trim());
                        setLoading(false);
                    }
                } else {
                    throw new Error("No compatible media file found in VAST response");
                }
            } catch (err) {
                console.error("VAST Fetch Error:", err);
                if (isMounted) {
                    setError(true);
                    onEnded(); // Skip ad on error
                }
            }
        };

        fetchVast();

        return () => {
            isMounted = false;
        };
    }, [vastUrl, onEnded]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            const remaining = Math.ceil(duration - current);

            if (!isNaN(remaining)) {
                setTimeLeft(remaining);
            }

            // Enable skip after 5 seconds
            if (current > 5 && !canSkip) {
                setCanSkip(true);
            }
        }
    };

    if (error) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center font-sans">
            {loading ? (
                <div className="flex flex-col items-center space-y-2 text-white/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-widest">Loading Ad...</span>
                </div>
            ) : (
                <div className="relative w-full h-full bg-black group">
                    <video
                        ref={videoRef}
                        src={mediaUrl || ""}
                        className="w-full h-full object-contain"
                        autoPlay
                        playsInline
                        muted={isMuted}
                        onEnded={onEnded}
                        onTimeUpdate={handleTimeUpdate}
                        onError={() => onEnded()}
                    />

                    {/* Controls Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 transition-opacity opacity-100">
                        {/* Top Bar */}
                        <div className="flex items-start justify-between">
                            <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-white pointer-events-auto">
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Advertisement {timeLeft !== null && `• ${timeLeft}s`}
                                </span>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="flex items-end justify-between">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition pointer-events-auto group/vol"
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={onEnded}
                                disabled={!canSkip}
                                className={`
                                    pointer-events-auto flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all
                                    ${canSkip
                                        ? "bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        : "bg-black/60 border border-white/10 text-white/40 cursor-not-allowed"}
                                `}
                            >
                                <span>Skip Ad</span>
                                {!canSkip && <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin ml-2" />}
                                {canSkip && <X className="w-4 h-4 ml-1" />}
                            </button>
                        </div>
                    </div>

                    {/* Click trap (optional: click on video to pause/play or visit ad link if tracking was implemented) */}
                    {/* For now we leave simple video controls */}
                </div>
            )}
        </div>
    );
}
