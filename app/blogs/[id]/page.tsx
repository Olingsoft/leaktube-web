import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { User, ArrowLeft, BookOpen } from "lucide-react";
import { getApiUrl } from "@/utils/api";
import { extractIdFromSlug } from "@/utils/seo";
import { getThumbnailUrl as formatThumbnailUrl } from "@/utils/format";
import ShareButton from "./ShareButton";

interface Blog {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    thumbnailUrl: string;
    createdAt: string;
}

async function getBlogData(id: string) {
    const actualId = id.includes('-') ? extractIdFromSlug(id) : id;
    try {
        const res = await fetch(getApiUrl(`/api/blogs/${actualId}`), { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.success ? data.data : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const blog = await getBlogData(id);
    if (!blog) return { title: "Blog Not Found - Unite Kenyans" };

    const thumbnail = formatThumbnailUrl(blog.thumbnailUrl);

    return {
        title: `${blog.title} | Unite Kenyans`,
        description: blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
        openGraph: {
            title: blog.title,
            description: blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
            type: "article",
            images: thumbnail ? [{ url: thumbnail }] : [],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogData(id);

    if (!blog) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-white font-black uppercase tracking-widest">Article Not Found</p>
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "image": formatThumbnailUrl(blog.thumbnailUrl),
        "author": {
            "@type": "Person",
            "name": blog.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Unite Kenyans",
            "logo": {
                "@type": "ImageObject",
                "url": "https://unitekenyans.co.ke/logo.png" // Update with real logo
            }
        },
        "datePublished": blog.createdAt,
        "description": blog.content.replace(/<[^>]*>/g, '').substring(0, 160)
    };

    return (
        <div className="flex min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-8 overflow-x-hidden">
                {/* Navigation */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stories
                </Link>

                {/* Article Container */}
                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="px-3 py-1 bg-[#D02752] rounded-lg text-[10px] font-black uppercase tracking-widest text-white">
                                {blog.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-white/5">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 border border-white/10 text-white/40">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">Written by</p>
                                    <p className="text-white font-bold">{blog.author}</p>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/5 hidden md:block" />

                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">Published on</p>
                                <p className="text-white font-bold">
                                    {new Date(blog.createdAt).toLocaleDateString('en-KE', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>

                            <ShareButton title={blog.title} />
                        </div>
                    </header>

                    {/* Featured Image */}
                    {blog.thumbnailUrl && (
                        <div className="mb-12 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative aspect-video md:aspect-[21/9]">
                            <img
                                src={formatThumbnailUrl(blog.thumbnailUrl) || ''}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-a:text-[#D02752] prose-strong:text-white prose-img:rounded-3xl">
                        <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            className="whitespace-pre-wrap text-white/70 leading-loose text-lg font-medium"
                        />
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-white/5">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Stay Safe Online</h4>
                            <p className="text-white/60 mb-6 leading-relaxed">
                                We believe in digital awareness and information sharing. Always be cautious with your digital footprint and data privacy.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform"
                            >
                                Explore Trending Videos
                            </Link>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}
