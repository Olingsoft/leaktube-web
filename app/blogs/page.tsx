import React from "react";
import { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import Sidebar from "../components/Sidebar";
import { getApiUrl } from "@/utils/api";

export const metadata: Metadata = {
    title: "Latest Football News & Insights | Live Football Streams",
    description: "Explore deep dives into football news, match reviews, and sports discussions on the Live Football Streams blog.",
    openGraph: {
        title: "Live Football Streams Blog | Sports News & Insights",
        description: "Stay informed with the latest football news, match insights, and tournament updates.",
        type: "website",
    }
};

async function getBlogs() {
    try {
        const url = getApiUrl('/api/blogs');
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (e) {
        console.error(e);
        return [];
    }
}



export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-8 overflow-x-hidden">
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Latest Football <span className="text-[#D02752]">News</span> & Insights
                    </h1>
                    <p className="text-white/60 text-sm md:text-lg max-w-2xl font-medium">
                        Explore deep dives into match reviews, transfer rumors, and sports discussions.
                    </p>
                </div>

                <BlogsClient
                    initialBlogs={blogs}
                />
            </div>
        </div>
    );
}
