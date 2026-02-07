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
import { getThumbnailUrl } from "@/utils/format";

export default function AddContentPage() {
    const [selectedType, setSelectedType] = useState("video");
    const [formData, setFormData] = useState({
        title: "",
        category: [] as string[],
        description: "",
        videoUrl: "",
        thumbnailUrl: ""
    });
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
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log("Categories data fetched:", data);
            if (data.success && Array.isArray(data.data)) {
                setCategories(data.data);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const body = {
                title: formData.title.trim(),
                category: formData.category,
                description: formData.description.trim(),
                videoUrl: formData.videoUrl.trim(),
                thumbnailUrl: formData.thumbnailUrl.trim()
            };

            const response = await fetch(`${API_BASE_URL}/api/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
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
                    category: [],
                    description: "",
                    videoUrl: "",
                    thumbnailUrl: ""
                });
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
                        {/* Row 1: Title and URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Content Title</span>
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    type="text"
                                    placeholder="Enter a catchy title..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#e15aed]/50 focus:bg-white/10 transition-all font-semibold text-lg"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                    <LinkIcon className="w-4 h-4" />
                                    <span>Video URL</span>
                                </label>
                                <div className="space-y-3">
                                    <input
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        required
                                        type="url"
                                        placeholder="Enter video link..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#e15aed]/50 focus:bg-white/10 transition-all font-semibold text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row: Thumbnail URL */}
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                <ImageIcon className="w-4 h-4" />
                                <span>Thumbnail (Mega.io or Image Link)</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="space-y-3">
                                    <input
                                        name="thumbnailUrl"
                                        value={formData.thumbnailUrl}
                                        onChange={handleInputChange}
                                        required
                                        type="url"
                                        placeholder="Paste image link here..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#e15aed]/50 focus:bg-white/10 transition-all font-semibold text-lg"
                                    />
                                    <p className="text-[10px] text-white/20 font-black uppercase tracking-widest ml-4">
                                        Tip: Upload to Mega.io and paste the direct link here
                                    </p>
                                </div>

                                {formData.thumbnailUrl && (
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                                        <img
                                            src={getThumbnailUrl(formData.thumbnailUrl)}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                (e.target as any).src = "https://placehold.co/600x400/151515/white?text=Invalid+Image+Link";
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, thumbnailUrl: "" }));
                                            }}
                                            className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white hover:bg-red-500 transition-colors backdrop-blur-md"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Categories */}
                        <div className="space-y-5">
                            <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                <Globe className="w-4 h-4" />
                                <span>Target Categories (Multi-Select)</span>
                            </label>
                            <div className="flex flex-wrap gap-3 p-6 bg-white/5 border border-white/10 rounded-[2rem] min-h-[140px] items-center">
                                {isLoadingCategories ? (
                                    <div className="flex items-center space-x-3 text-white/20 animate-pulse px-4 w-full justify-center">
                                        <div className="w-2 h-2 rounded-full bg-current" />
                                        <span className="text-xs font-black uppercase tracking-widest">Loading categories from server...</span>
                                    </div>
                                ) : categories.length === 0 ? (
                                    <div className="flex items-center justify-center w-full text-white/20 text-xs font-bold italic">
                                        No categories available. Please check the backend.
                                    </div>
                                ) : (
                                    categories.map((cat) => {
                                        const isSelected = formData.category.includes(cat.name);
                                        return (
                                            <button
                                                key={cat._id}
                                                type="button"
                                                onClick={() => {
                                                    const newCategories = isSelected
                                                        ? formData.category.filter(c => c !== cat.name)
                                                        : [...formData.category, cat.name];
                                                    setFormData(prev => ({ ...prev, category: newCategories }));
                                                }}
                                                className={`px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 border ${isSelected
                                                    ? "bg-[#e15aed] border-[#e15aed] text-white shadow-[0_10px_30px_rgba(225,90,237,0.3)] scale-105"
                                                    : "bg-white/5 border-white/10 text-white/30 hover:border-white/20 hover:text-white"
                                                    }`}
                                            >
                                                {cat.name}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                            {formData.category.length === 0 && !isLoadingCategories && (
                                <p className="text-[10px] text-[#e15aed]/60 font-black uppercase tracking-[0.2em] ml-4">
                                    * Selection required to continue
                                </p>
                            )}
                        </div>

                        {/* Row 3: Description */}
                        <div className="space-y-4">
                            <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                <FileText className="w-4 h-4" />
                                <span>Short Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="What's this content about?"
                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#e15aed]/50 focus:bg-white/10 transition-all font-semibold resize-none text-lg"
                            />
                        </div>

                        {/* Footer actions */}
                        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-white/5">
                            <div className="flex items-center space-x-5">
                                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${formData.title && formData.videoUrl && formData.thumbnailUrl && formData.category.length > 0 ? "bg-green-500/10 border-green-500/20 text-green-500 scale-110" : "bg-white/5 border-white/10 text-white/20"}`}>
                                    <CheckCircle className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Form Status</p>
                                    <p className={`text-sm font-bold ${formData.title && formData.videoUrl && formData.thumbnailUrl && formData.category.length > 0 ? "text-white" : "text-white/40"}`}>
                                        {formData.title && formData.videoUrl && formData.thumbnailUrl && formData.category.length > 0 ? "Ready to Deploy" : "Missing Requirements"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.title || !formData.videoUrl || !formData.thumbnailUrl || formData.category.length === 0}
                                className="w-full sm:w-auto px-20 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-[#e15aed] hover:text-white hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(225,90,237,0.3)] active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale"
                            >
                                {isSubmitting ? "Publishing..." : "Publish Content"}
                            </button>
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

