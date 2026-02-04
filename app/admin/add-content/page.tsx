"use client";

import React, { useState, useEffect } from "react";
import {
    Upload,
    Link as LinkIcon,
    FileText,
    Image as ImageIcon,
    Plus,
    X,
    Globe,
    Zap,
    Shield,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { API_BASE_URL } from "../../../utils/api";

export default function AddContentPage() {
    const [selectedType, setSelectedType] = useState("video");
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: ""
    });
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
        show: false,
        type: 'success',
        message: ''
    });

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories`);
            const data = await response.json();
            if (data.success) {
                setCategories(data.data);
                if (data.data.length > 0) {
                    setFormData(prev => ({ ...prev, category: data.data[0].name }));
                }
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const previewUrl = URL.createObjectURL(file);
            setThumbnailPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dataToSend = new FormData();
            dataToSend.append('title', formData.title.trim());
            dataToSend.append('category', formData.category);
            dataToSend.append('description', formData.description.trim());
            dataToSend.append('videoUrl', formData.videoUrl.trim());

            if (thumbnailFile) {
                dataToSend.append('thumbnail', thumbnailFile);
            } else if (formData.thumbnailUrl) {
                dataToSend.append('thumbnailUrl', formData.thumbnailUrl.trim());
            }

            const response = await fetch(`${API_BASE_URL}/api/videos`, {
                method: 'POST',
                body: dataToSend, // Fetch handles Boundary correctly with FormData
            });

            const data = await response.json();

            if (data.success) {
                setModal({
                    show: true,
                    type: 'success',
                    message: "Your video content has been published successfully and is now live!"
                });
                setFormData({
                    title: "",
                    category: categories.length > 0 ? categories[0].name : "",
                    description: "",
                    videoUrl: "",
                    thumbnailUrl: ""
                });
                setThumbnailFile(null);
                setThumbnailPreview(null);
            } else {
                setModal({
                    show: true,
                    type: 'error',
                    message: data.message || "Failed to publish content. Please check your data and try again."
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setModal({
                show: true,
                type: 'error',
                message: "A connection error occurred. Please ensure your backend server is running."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1B3C53]/10 border border-[#1B3C53]/20 text-[#1B3C53]">
                    <Zap className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Admin Dashboard</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tight">
                    Add New <span className="text-[#1B3C53]">Content</span>
                </h1>
                <p className="text-white/40 font-medium text-lg">Share direct video links with your community efficiently.</p>
            </div>

            {/* Type Selector */}
            <div className="flex flex-wrap gap-4">
                {[
                    { id: "video", label: "Video Link", icon: LinkIcon, active: true },
                    { id: "link", label: "External Link", icon: Globe, active: false },
                    { id: "post", label: "Text Post", icon: FileText, active: false },
                    { id: "gallery", label: "Image Gallery", icon: ImageIcon, active: false },
                ].map((type) => {
                    const Icon = type.icon;
                    const isActive = selectedType === type.id;
                    return (
                        <button
                            key={type.id}
                            type="button"
                            onClick={() => type.id === "video" && setSelectedType(type.id)}
                            className={`flex items-center space-x-3 px-8 py-5 rounded-2xl border transition-all duration-300 ${isActive
                                ? "bg-[#1B3C53] border-[#1B3C53] text-white shadow-[0_20px_40px_rgba(27,60,83,0.3)] scale-105"
                                : "bg-white/5 border-white/5 text-white/20 opacity-50 cursor-not-allowed"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                            <span className="font-bold text-sm tracking-wide">{type.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Form Area */}
            <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
                <div className="p-12 rounded-[2.4rem] bg-[#0f0f0f] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                    <Shield className="w-3 h-3" />
                                    <span>Content Title</span>
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    type="text"
                                    placeholder="Enter a catchy title..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 focus:bg-white/10 transition-all font-semibold text-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                    <Globe className="w-3 h-3" />
                                    <span>Category</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 focus:bg-white/10 transition-all font-semibold appearance-none text-lg cursor-pointer disabled:opacity-50"
                                    disabled={isLoadingCategories}
                                >
                                    {isLoadingCategories ? (
                                        <option className="bg-[#0f0f0f]">Loading...</option>
                                    ) : categories.length === 0 ? (
                                        <option className="bg-[#0f0f0f]">No categories found</option>
                                    ) : (
                                        categories.map((cat) => (
                                            <option key={cat._id} value={cat.name} className="bg-[#0f0f0f]">
                                                {cat.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Video Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="Tell us more about this video..."
                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 focus:bg-white/10 transition-all font-semibold resize-none text-lg"
                            />
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-[#1B3C53] uppercase tracking-[0.2em] ml-2 font-black">Direct Video URL</label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-[#1B3C53]/10 rounded-[2rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 focus-within:border-[#1B3C53]/50 focus-within:bg-white/10 transition-all">
                                        <LinkIcon className="w-6 h-6 text-[#1B3C53] mr-6" />
                                        <input
                                            name="videoUrl"
                                            value={formData.videoUrl}
                                            onChange={handleInputChange}
                                            required
                                            type="url"
                                            placeholder="https://pixeldrain.com/u/xxxxxx or https://youtube.com/..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 font-bold text-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">Thumbnail Image</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                    <div className="relative group">
                                        <label className="flex flex-col items-center justify-center w-full h-48 bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-[#1B3C53]/30 transition-all cursor-pointer group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 text-white/20 mb-4 group-hover:text-[#1B3C53] transition-colors" />
                                                <p className="text-sm text-white/40 font-bold uppercase tracking-widest">
                                                    {thumbnailFile ? thumbnailFile.name : "Select Image File"}
                                                </p>
                                                <p className="text-[10px] text-white/20 mt-2">JPG, PNG, WebP (Max 5MB)</p>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                    </div>

                                    {thumbnailPreview ? (
                                        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black group">
                                            <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); }}
                                                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border border-white/5 bg-white/[0.02] text-white/10">
                                            <ImageIcon className="w-12 h-12 mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Preview Area</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                    <CheckCircle className={`w-5 h-5 ${formData.title && formData.videoUrl ? "text-green-500" : "text-white/20"}`} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Validation</p>
                                    <p className="text-sm font-bold text-white/60">
                                        {formData.title && formData.videoUrl ? "Ready to Publish" : "Please fill required fields"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.title || !formData.videoUrl}
                                    className="flex-1 sm:flex-none px-20 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Publishing..." : "Publish Video"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {modal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="relative max-w-sm w-full bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-10 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                        <div className="space-y-6">
                            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${modal.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {modal.type === 'success' ? <CheckCircle className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-3xl font-black text-white">
                                    {modal.type === 'success' ? 'Success!' : 'Error'}
                                </h2>
                                <p className="text-white/40 font-medium">{modal.message}</p>
                            </div>
                            <button
                                onClick={() => setModal({ ...modal, show: false })}
                                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm bg-white text-black hover:bg-neutral-200 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

