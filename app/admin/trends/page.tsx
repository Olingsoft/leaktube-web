"use client";

import React, { useState, useEffect } from "react";
import {
    TrendingUp,
    Plus,
    Trash2,
    CheckCircle,
    AlertCircle,
    Video,
    Hash
} from "lucide-react";
import { API_BASE_URL } from "../../../utils/api";

export default function TrendsPage() {
    const [trends, setTrends] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        phrase: "",
        videoId: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
        show: false,
        type: 'success',
        message: ''
    });

    const fetchTrends = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trends`);
            const data = await response.json();
            if (data.success) {
                setTrends(data.data);
            }
        } catch (error) {
            console.error("Error fetching trends:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVideos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/videos`);
            const data = await response.json();
            if (data.success) {
                setVideos(data.data);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    useEffect(() => {
        fetchTrends();
        fetchVideos();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/trends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setModal({
                    show: true,
                    type: 'success',
                    message: "Trending phrase added successfully!"
                });
                setFormData({ phrase: "", videoId: "" });
                fetchTrends();
            } else {
                setModal({
                    show: true,
                    type: 'error',
                    message: data.message || "Failed to add trend."
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            setModal({
                show: true,
                type: 'error',
                message: "A connection error occurred."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this trend?")) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/trends/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                fetchTrends();
            }
        } catch (error) {
            console.error("Error deleting trend:", error);
        }
    };



    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1B3C53]/10 border border-[#1B3C53]/20 text-[#1B3C53]">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Admin Dashboard</span>
                </div>
                <h1 className="text-5xl font-black text-white tracking-tight">
                    Manage <span className="text-[#1B3C53]">Trends</span>
                </h1>
                <p className="text-white/40 font-medium text-lg">Create and manage trending topics and assign them to videos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent sticky top-24">
                        <div className="p-8 rounded-[2.4rem] bg-[#0f0f0f] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <h3 className="text-xl font-bold text-white mb-6">Add New Trend</h3>

                                <div className="space-y-3">
                                    <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                        <Hash className="w-3 h-3" />
                                        <span>Trending Phrase</span>
                                    </label>
                                    <input
                                        name="phrase"
                                        value={formData.phrase}
                                        onChange={handleInputChange}
                                        required
                                        type="text"
                                        placeholder="#FinanceBill2026"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 focus:bg-white/10 transition-all font-semibold"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center space-x-2 text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-2">
                                        <Video className="w-3 h-3" />
                                        <span>Assign Video (Optional)</span>
                                    </label>

                                    <select
                                        name="videoId"
                                        value={formData.videoId}
                                        onChange={(e) => setFormData(prev => ({ ...prev, videoId: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/50 focus:bg-white/10 transition-all font-semibold appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0f0f0f]">-- No Video Assigned --</option>
                                        {videos.map(video => (
                                            <option key={video._id} value={video._id} className="bg-[#0f0f0f]">
                                                {video.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.phrase}
                                    className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {isSubmitting ? "Adding..." : "Add Trend"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="grid gap-4">
                        {isLoading ? (
                            <div className="text-white/40 text-center py-20">Loading trends...</div>
                        ) : trends.length === 0 ? (
                            <div className="text-white/40 text-center py-20 bg-white/5 rounded-[2rem] border border-white/5">
                                No trending topics yet. Add one to get started.
                            </div>
                        ) : (
                            trends.map((trend) => (
                                <div key={trend._id} className="group flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1B3C53]/20 flex items-center justify-center text-[#1B3C53]">
                                            <Hash className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{trend.phrase}</h3>
                                            {trend.assignedVideo ? (
                                                <div className="flex items-center space-x-2 text-xs font-medium text-white/40">
                                                    <Video className="w-3 h-3" />
                                                    <span className="truncate max-w-[200px]">Linked: {trend.assignedVideo.title}</span>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-white/20 italic">No video assigned</div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(trend._id)}
                                        className="p-3 rounded-xl bg-white/5 text-white/20 hover:bg-red-500/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Delete Trend"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
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
