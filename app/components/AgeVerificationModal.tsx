"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AlertTriangle, LogOut, CheckCircle2 } from "lucide-react";

export default function AgeVerificationModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already verified their age
        const isVerified = localStorage.getItem("age_verified");
        if (!isVerified) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleEnter = () => {
        localStorage.setItem("age_verified", "true");
        window.dispatchEvent(new Event("ageVerified"));
        setIsVisible(false);
        document.body.style.overflow = 'auto';
    };

    const handleLeave = () => {
        window.location.href = "https://www.google.com";
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
            <div className="relative max-w-xl w-full">
                {/* Background Glows */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D02752]/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1B3C53]/20 rounded-full blur-[100px] animate-pulse" />

                <div className="relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden text-center space-y-8">
                    {/* Header Icon */}
                    <div className="flex justify-center flex-col items-center space-y-6">
                      
                        <div className="w-16 h-16 rounded-full bg-[#D02752]/10 border border-[#D02752]/20 flex items-center justify-center">
                            {/* <AlertTriangle className="w-8 h-8 text-[#D02752]" /> */}
                        </div>

                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D02752]/20 to-[#1B3C53]/20 rounded-lg blur-xl opacity-50" />
                            <Image
                                src="/logo.png"
                                alt="Unite Kenyans"
                                width={180}
                                height={44}
                                className="h-10 md:h-12 w-auto object-contain relative z-10"
                            />
                        </div>

                    </div>

                    <div className="space-y-4">
                        <p className="text-white/80 text-lg md:text-xl font-bold leading-tight">
                            This website contains highly sensitive and adult content.
                        </p>
                        <p className="text-white/40 text-sm md:text-base leading-relaxed">
                            By clicking "Enter", you confirm that you are over 18 years old and agree to our terms of service and privacy policy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <button
                            onClick={handleEnter}
                            className="group flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#D02752] hover:text-white transition-all duration-500 shadow-xl"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            I am 18+ Enter
                        </button>

                        <button
                            onClick={handleLeave}
                            className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all duration-500"
                        >
                            <LogOut className="w-5 h-5 text-white/40 group-hover:text-white" />
                            I am Under 18
                        </button>
                    </div>

                    <div className="pt-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                            Unite Kenyans &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
