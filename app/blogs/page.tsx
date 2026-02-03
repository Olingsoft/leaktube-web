import React from "react";
import { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import Sidebar from "../components/Sidebar";
import { getApiUrl } from "@/utils/api";

export const metadata: Metadata = {
    title: "Latest Stories & Insights | Unite Kenyans",
    description: "Explore deep dives into viral trends, digital safety guides, and community discussions on the Unite Kenyans blog.",
    openGraph: {
        title: "Unite Kenyans Blog | Trending Stories & Insights",
        description: "Stay informed with the latest viral trends and digital awareness stories in Kenya.",
        type: "website",
    }
};

async function getBlogs(category?: string) {
    try {
        let url = getApiUrl('/api/blogs');
        if (category && category !== "All") {
            url += `?category=${encodeURIComponent(category)}`;
        }
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

async function getCategories() {
    try {
        const res = await fetch(getApiUrl('/api/categories'), { next: { revalidate: 3600 } });
        const data = await res.json();
        if (data.success) {
            return ["All", ...data.data.map((cat: any) => cat.name)];
        }
        return ["All"];
    } catch (e) {
        console.error(e);
        return ["All"];
    }
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const [blogs, categories] = await Promise.all([
        getBlogs(category),
        getCategories()
    ]);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-8 overflow-x-hidden">
                {/* Header Section */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Latest <span className="text-[#D02752]">Stories</span> & Insights
                    </h1>
                    <p className="text-white/60 text-sm md:text-lg max-w-2xl font-medium">
                        Explore deep dives into viral trends, digital safety guides, and community discussions.
                    </p>
                </div>

                <BlogsClient
                    initialBlogs={blogs}
                    categories={categories}
                    initialCategory={category}
                />
            </div>
        </div>
    );
}
