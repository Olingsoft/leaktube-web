"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Edit2, Trash2, Loader2, Eye, X, Upload, FileText, CheckCircle2, AlertCircle, TrendingUp, Calendar, User, Tag } from "lucide-react";
import { getApiUrl, API_BASE_URL } from "@/utils/api";
import { getThumbnailUrl as getCentralizedThumbnailUrl } from "@/utils/format";

export default function AdminBlogsClient() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        status: "published",
        author: "Admin"
    });
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(getApiUrl('/api/blogs?status=all'));
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
    }, []);

    const filteredBlogs = useMemo(() => {
        return blogs.filter(b =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [blogs, searchQuery]);

    const stats = useMemo(() => {
        return {
            total: blogs.length,
            published: blogs.filter(b => b.status === 'published').length,
            drafts: blogs.filter(b => b.status === 'draft').length
        };
    }, [blogs]);

    const handleOpenModal = (blog: any = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                category: blog.category,
                content: blog.content,
                status: blog.status,
                author: blog.author || "Admin"
            });
            // Robust image URL handling using centralized utility
            setThumbnailPreview(getCentralizedThumbnailUrl(blog.thumbnailUrl) || "");
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                category: "",
                content: "",
                status: "published",
                author: "Admin"
            });
            setThumbnailPreview("");
            setThumbnail(null);
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article forever?")) return;
        try {
            const response = await fetch(getApiUrl(`/api/blogs/${id}`), { method: 'DELETE' });
            if (response.ok) fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => data.append(key, value));
            if (thumbnail) data.append('thumbnail', thumbnail);

            const url = editingBlog ? getApiUrl(`/api/blogs/${editingBlog._id}`) : getApiUrl('/api/blogs');
            const method = editingBlog ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: data
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchBlogs();
            }
        } catch (error) {
            console.error("Error saving blog:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const isPublished = status === 'published';
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isPublished
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPublished ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></span>
                {status}
            </span>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#070707] text-white">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-10">

                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 bg-[#D02752]/10 border border-[#D02752]/20 rounded-full text-[#D02752] text-[10px] font-black uppercase tracking-[0.2em]">
                            <TrendingUp className="w-3 h-3 mr-2" />
                            Content Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tightest leading-tight">
                            Blog <span className="text-[#D02752]">Hub.</span>
                        </h1>
                        <p className="text-white/40 text-lg font-medium max-w-xl">
                            Create, manage and publish stories that matter to the community.
                        </p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#D02752] text-white font-black uppercase tracking-tighter text-sm rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(208,39,82,0.4)] hover:shadow-[0_20px_50px_rgba(208,39,82,0.6)] transition-all active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <Plus className="w-5 h-5 mr-3 relative z-10" />
                        <span className="relative z-10">Write New Story</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Stories", value: stats.total, icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
                        { label: "Published", value: stats.published, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                        { label: "Drafts", value: stats.drafts, icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/10" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.05] transition-all group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-4xl font-black tracking-tighter group-hover:scale-110 origin-left transition-transform">{stat.value}</h3>
                                </div>
                                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-12 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#D02752] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-[1.5rem] text-white focus:outline-none focus:bg-white/[0.06] focus:border-[#D02752]/50 transition-all font-semibold placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-4">
                        {/* Add filter buttons here if needed */}
                    </div>
                </div>

                {/* Blog Table Section */}
                <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-3xl">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.01]">
                                    <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-white/30">Article Details</th>
                                    <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-white/30">Category</th>
                                    <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-white/30">Status</th>
                                    <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-white/30">Date Created</th>
                                    <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-white/30 text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-16 h-16 border-4 border-[#D02752]/20 border-t-[#D02752] rounded-full animate-spin"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Loader2 className="w-6 h-6 text-[#D02752] animate-pulse" />
                                                    </div>
                                                </div>
                                                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Retrieving data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-40">
                                                <Search className="w-12 h-12" />
                                                <p className="font-bold uppercase tracking-widest text-xs">No matching articles found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-white/[0.03] transition-all group/row">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-16 rounded-2xl bg-white/5 overflow-hidden border border-white/10 flex-shrink-0 group-hover/row:scale-105 transition-transform duration-500">
                                                    {blog.thumbnailUrl ? (
                                                        <img
                                                            src={getCentralizedThumbnailUrl(blog.thumbnailUrl)}
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                            onError={(e) => {
                                                                (e.target as any).src = "https://placehold.co/600x400/151515/white?text=No+Image";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/10">
                                                            <Upload className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-white font-bold text-lg line-clamp-1 group-hover/row:text-[#D02752] transition-colors">{blog.title}</h4>
                                                    <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author || "Admin"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center gap-1.5 text-white/60 font-black text-[10px] uppercase tracking-widest">
                                                <Tag className="w-3 h-3" />
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={blog.status} />
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-4 group-hover/row:translate-x-0">
                                                <Link
                                                    href={`/blogs/${blog._id}`}
                                                    target="_blank"
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                                >
                                                    <Eye className="w-4 h-4 text-white/60" />
                                                </Link>
                                                <button
                                                    onClick={() => handleOpenModal(blog)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all group/btn"
                                                >
                                                    <Edit2 className="w-4 h-4 text-white/60 group-hover/btn:text-blue-400" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl transition-all group/btn"
                                                >
                                                    <Trash2 className="w-4 h-4 text-white/60 group-hover/btn:text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modern Editor Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <div
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
                            onClick={() => !isSubmitting && setIsModalOpen(false)}
                        />

                        <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-[0_0_100px_rgba(208,39,82,0.15)] animate-in zoom-in-95 duration-500">

                            <div className="sticky top-0 z-20 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5 p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black tracking-tighter">
                                        {editingBlog ? 'Refine' : 'Compose'} <span className="text-[#D02752]">Article</span>
                                    </h2>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                        Fill in the fields below to {editingBlog ? 'update' : 'publish'} your story
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-[#D02752] rounded-2xl transition-all text-white/40 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                    {/* Content Column */}
                                    <div className="lg:col-span-8 space-y-8">
                                        <div className="space-y-4">
                                            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#D02752]">Headline</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Enter a captivating title..."
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-xl font-bold text-white focus:bg-white/[0.06] focus:border-[#D02752]/50 transition-all outline-none"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-[#D02752]">The Story (HTML)</label>
                                            <textarea
                                                required
                                                placeholder="Write your content here..."
                                                value={formData.content}
                                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-8 text-white min-h-[500px] focus:bg-white/[0.06] focus:border-[#D02752]/50 transition-all outline-none font-medium leading-relaxed text-lg resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Sidebar/Meta Column */}
                                    <div className="lg:col-span-4 space-y-8">
                                        {/* Status & Options */}
                                        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                                            <div className="space-y-4">
                                                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40 text-center">Publication Status</label>
                                                <div className="flex bg-white/5 p-1.5 rounded-2xl">
                                                    {['published', 'draft'].map((s) => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, status: s })}
                                                            className={`flex-1 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all ${formData.status === s
                                                                ? 'bg-[#D02752] text-white shadow-xl'
                                                                : 'text-white/40 hover:text-white'
                                                                }`}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Category</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Global, Local, etc..."
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.08] outline-none transition-all font-bold"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Author Identity</label>
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.08] outline-none transition-all font-bold"
                                                />
                                            </div>
                                        </div>

                                        {/* Thumbnail Upload */}
                                        <div className="space-y-4">
                                            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Cover Image</label>
                                            <div className="relative group aspect-[4/3] rounded-[2.5rem] overflow-hidden border-2 border-dashed border-white/10 hover:border-[#D02752]/50 transition-all bg-white/[0.02]">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            setThumbnail(e.target.files[0]);
                                                            setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
                                                        }
                                                    }}
                                                />
                                                {thumbnailPreview ? (
                                                    <div className="relative h-full">
                                                        <img src={thumbnailPreview} className="w-full h-full object-cover" alt="" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Upload className="w-8 h-8 text-white" />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setThumbnail(null);
                                                                setThumbnailPreview("");
                                                            }}
                                                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                                                        >
                                                            <X className="w-5 h-5 text-white" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                                                        <div className="w-16 h-16 rounded-3xl bg-[#D02752]/10 flex items-center justify-center text-[#D02752]">
                                                            <Upload className="w-8 h-8" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-black text-[10px] uppercase tracking-widest text-white">Select Cover</p>
                                                            <p className="text-[10px] text-white/30 font-medium">PNG, JPG up to 10MB</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Footer */}
                                <div className="border-t border-white/5 pt-10 flex gap-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-10 py-5 bg-white/5 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden shadow-2xl transition-all hover:bg-[#D02752] hover:text-white disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <span>{editingBlog ? 'Update Publication' : 'Launch Story Now'}</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
