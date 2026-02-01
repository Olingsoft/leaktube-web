"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Search, Calendar, User, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { getApiUrl, API_BASE_URL } from "@/utils/api";

function BlogsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<string[]>(["All"]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            let url = getApiUrl('/api/blogs');
            const params = new URLSearchParams();
            if (categoryParam && categoryParam !== "All") params.append("category", categoryParam);
            if (searchQuery) params.append("search", searchQuery);

            const response = await fetch(`${url}?${params.toString()}`);
            const data = await response.json();
            if (data.success) {
                setBlogs(data.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [categoryParam]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(getApiUrl('/api/categories'));
                const data = await response.json();
                if (data.success) {
                    const catNames = data.data.map((cat: any) => cat.name);
                    setCategories(["All", ...catNames]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const getThumbnailUrl = (url: string) => {
        if (!url) return null;
        if (url.includes('localhost:8000')) {
            return url.replace('http://localhost:8000', API_BASE_URL);
        }
        return url;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
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

                {/* Search & Filter Bar */}
                <div className="mb-10 space-y-6">
                    <div className="relative max-w-3xl mx-auto md:mx-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchBlogs()}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-[#D02752] transition-all duration-300 font-medium backdrop-blur-xl shadow-lg"
                        />
                    </div>

                    <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
                        {categories.map((cat) => {
                            const isActive = (cat === "All" && !categoryParam) || (categoryParam === cat);
                            return (
                                <Link
                                    key={cat}
                                    href={cat === "All" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`}
                                    className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isActive
                                        ? "bg-[#D02752] text-white shadow-[0_0_20px_rgba(208,39,82,0.4)]"
                                        : "bg-white/5 text-white/60 border border-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-[16/10] bg-white/5 rounded-3xl" />
                                <div className="h-6 bg-white/5 rounded-lg w-3/4" />
                                <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 opacity-30 text-center">
                        <BookOpen className="w-16 h-16 text-white mb-2" />
                        <p className="text-white font-black uppercase tracking-widest text-xl">No articles found</p>
                        <p className="text-white/60 max-w-xs">We couldn't find any blogs matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link key={blog._id} href={`/blogs/${blog._id}`} className="group">
                                <article className="relative h-full flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#D02752]/50 hover:-translate-y-2 hover:shadow-2xl">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        {blog.thumbnailUrl ? (
                                            <img
                                                src={getThumbnailUrl(blog.thumbnailUrl) || ''}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#1B3C53] to-[#D02752] opacity-50 flex items-center justify-center">
                                                <BookOpen className="w-12 h-12 text-white/20" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center space-x-4 mb-4 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                                            <div className="flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                {formatDate(blog.createdAt)}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="w-3.5 h-3.5 mr-1.5" />
                                                {blog.author}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D02752] transition-colors line-clamp-2 leading-tight">
                                            {blog.title}
                                        </h3>

                                        <p className="text-white/50 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                                            {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                        </p>

                                        <div className="flex items-center text-[#D02752] text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                                            Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BlogsPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
                <Loader2 className="w-10 h-10 text-[#D02752] animate-spin" />
            </div>
        }>
            <BlogsContent />
        </Suspense>
    );
}
