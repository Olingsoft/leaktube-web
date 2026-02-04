"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import Script from "next/script";
import { X } from "lucide-react";
=======
import { X } from "lucide-react";
import Script from "next/script";
>>>>>>> SEO-brch

export default function InVideoAd() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
<<<<<<< HEAD
        }, 3000);
=======
        }, 3000); // Show after 3 seconds
>>>>>>> SEO-brch
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
<<<<<<< HEAD
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', pointerEvents: 'auto', maxWidth: '100%' }}>
                <button
                    onClick={() => setIsVisible(false)}
                    style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#D02752', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 110 }}
                >
                    <X size={16} />
                </button>

                <div style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '12px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                }}>
                    <ins id="1110438" data-width="308" data-height="286"></ins>

                    <Script
                        id="juicyads-invideo-script-1"
=======
        <div className="absolute inset-x-0 bottom-4 mx-auto w-[90%] md:w-[600px] z-[20] animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="relative p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition group z-[30]"
                >
                    <X className="w-3 h-3 text-white/40 group-hover:text-white" />
                </button>

                <div className="flex items-center justify-center min-h-[100px]">
                    <ins id="1110439" data-width="468" data-height="60"></ins>
                    <Script
                        id="juicyads-in-video-1"
>>>>>>> SEO-brch
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        src="https://poweredby.jads.co/js/jads.js"
                    />
                    <Script
<<<<<<< HEAD
                        id="juicyads-invideo-script-2"
=======
                        id="juicyads-in-video-2"
>>>>>>> SEO-brch
                        type="text/javascript"
                        data-cfasync="false"
                        async
                        dangerouslySetInnerHTML={{
<<<<<<< HEAD
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110438});"
                        }}
                    />
                </div>
=======
                            __html: "(window.adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1110439});"
                        }}
                    />
                </div>
                <div className="absolute top-1 left-2 text-[8px] font-black uppercase text-white/20 tracking-widest">Sponsored</div>
>>>>>>> SEO-brch
            </div>
        </div>
    );
}
