"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Edit2, Trash2, Loader2, Eye, X, Upload } from "lucide-react";
import { getApiUrl, API_BASE_URL } from "@/utils/api";

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
            setThumbnailPreview(blog.thumbnailUrl?.replace('http://localhost:8000', API_BASE_URL) || "");
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
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
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

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <Sidebar />
            <div className="flex-1 lg:ml-72 p-4 md:p-8 pt-4 md:pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Blog <span className="text-[#D02752]">Manager</span></h1>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Create and curate stories for the community</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#D02752] text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-[0_10px_30px_rgba(208,39,82,0.3)] hover:scale-105 transition-all"
                    >
                        <Plus className="w-5 h-5 mr-2" /> New Article
                    </button>
                </div>

                {/* Filters */}
                <div className="mb-8 relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search articles by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:bg-white/10 transition-all font-medium"
                    />
                </div>

                {/* Blog Table */}
                <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Article</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <Loader2 className="w-8 h-8 text-[#D02752] animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : blogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-white/40 font-bold uppercase tracking-widest text-xs">No articles found</td>
                                    </tr>
                                ) : blogs.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).map((blog) => (
                                    <tr key={blog._id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-20 h-12 rounded-lg bg-white/10 mr-4 overflow-hidden border border-white/10 flex-shrink-0">
                                                    {blog.thumbnailUrl && (
                                                        <img
                                                            src={blog.thumbnailUrl.replace('http://localhost:8000', API_BASE_URL)}
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-white font-bold line-clamp-1">{blog.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/60">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${blog.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/blogs/${blog._id}`} target="_blank" className="p-2 text-white/40 hover:text-white transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleOpenModal(blog)} className="p-2 text-white/40 hover:text-white transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(blog._id)} className="p-2 text-white/40 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                        <div className="relative bg-[#151515] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-3xl font-black text-white">{editingBlog ? 'Edit' : 'Create'} <span className="text-[#D02752]">Article</span></h2>
                                    <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors bg-white/5 p-3 rounded-2xl">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Title</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:bg-white/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Category</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:bg-white/10 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Status</label>
                                                <select
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:bg-white/10 transition-all outline-none appearance-none"
                                                >
                                                    <option value="published">Published</option>
                                                    <option value="draft">Draft</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Author</label>
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:bg-white/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Thumbnail</label>
                                            <div className="relative group cursor-pointer">
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
                                                <div className="aspect-video bg-white/5 border border-dashed border-white/20 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center group-hover:bg-white/10 transition-all">
                                                    {thumbnailPreview ? (
                                                        <img src={thumbnailPreview} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <>
                                                            <Upload className="w-8 h-8 text-white/20 mb-3" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Upload Image</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Content (HTML Support)</label>
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 text-white min-h-[300px] focus:bg-white/10 transition-all outline-none font-medium leading-relaxed"
                                        />
                                    </div>

                                    <div className="md:col-span-2 pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-black font-black uppercase tracking-widest px-8 py-5 rounded-2xl hover:bg-[#D02752] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-xl"
                                        >
                                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : editingBlog ? 'Update Article' : 'Publish Article'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
