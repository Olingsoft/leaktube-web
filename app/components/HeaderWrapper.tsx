"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");
    const [isAgeVerified, setIsAgeVerified] = useState(false); // Change to false by default

    useEffect(() => {
        // Check initial state
        const verified = localStorage.getItem("age_verified");
        if (verified === "true") {
            setIsAgeVerified(true);
        }

        // Listen for verification event
        const handleVerified = () => setIsAgeVerified(true);
        window.addEventListener("ageVerified", handleVerified);

        return () => window.removeEventListener("ageVerified", handleVerified);
    }, []);

    // Also hide if on admin path
    if (isAdminPath || !isAgeVerified) return null;

    return <Header />;
}
