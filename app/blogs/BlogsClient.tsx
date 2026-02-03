"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { slugify } from "@/utils/seo";
import { getThumbnailUrl as formatThumbnailUrl } from "@/utils/format";

interface Blog {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    thumbnailUrl: string;
    createdAt: string;
}

interface BlogsClientProps {
    initialBlogs: Blog[];
    categories: string[];
    initialCategory?: string;
}

export default function BlogsClient({
    initialBlogs,
    categories,
    initialCategory = "All"
}: BlogsClientProps) {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-10">
            {/* Search & Filter Bar */}
            <div className="space-y-6">
                <div className="relative max-w-3xl mx-auto md:mx-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none z-10" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-[#D02752] transition-all duration-300 font-medium backdrop-blur-xl shadow-lg"
                    />
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isActive
                                    ? "bg-[#D02752] text-white shadow-[0_0_20px_rgba(208,39,82,0.4)]"
                                    : "bg-white/5 text-white/60 border border-white/5 hover:bg-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 opacity-30 text-center">
                    <BookOpen className="w-16 h-16 text-white mb-2" />
                    <p className="text-white font-black uppercase tracking-widest text-xl">No articles found</p>
                    <p className="text-white/60 max-w-xs">We couldn't find any blogs matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
                        <Link key={blog._id} href={`/blogs/${slugify(blog.title)}-${blog._id}`} className="group">
                            <article className="relative h-full flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#D02752]/50 hover:-translate-y-2 hover:shadow-2xl">
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    {blog.thumbnailUrl ? (
                                        <img
                                            src={formatThumbnailUrl(blog.thumbnailUrl) || ''}
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
    );
}
