"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Edit,
    Trash2,
    Layers,
    Eye,
    EyeOff,
    ChevronRight,
    GripVertical
} from "lucide-react";

export default function ManageCategories() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setSelectedColor] = useState("bg-[#FF2C80]");

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/categories');
            const data = await response.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return alert("Please provide a category name");

        setIsSaving(true);
        try {
            const response = await fetch('http://localhost:8000/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, color })
            });
            const data = await response.json();
            if (data.success) {
                setCategories(prev => [...prev, data.data]);
                setName("");
                setDescription("");
                alert("Category created successfully!");
            } else {
                alert(data.message || "Error creating category");
            }
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This may affect videos in this category.")) return;

        try {
            const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                setCategories(prev => prev.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white">Categories</h1>
                    <p className="text-white/40 font-medium">Organize and manage platform content categories.</p>
                </div>
                <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#FF2C80] rounded-xl text-white hover:scale-[1.02] active:scale-95 transition-all text-sm font-bold shadow-[0_0_20px_rgba(255,44,128,0.3)]">
                    <Plus className="w-4 h-4" />
                    <span>Create Category</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add/Edit Form Sidebar (Quick Add) */}
                <div className="space-y-6">
                    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Plus className="w-5 h-5 mr-2 text-[#FF2C80]" />
                            Quick Add
                        </h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-2">Category Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Entertainment"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF2C80]/50 transition-all font-semibold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF2C80]/50 transition-all font-semibold resize-none h-24"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-2">Display Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {["bg-orange-500", "bg-blue-500", "bg-purple-500", "bg-[#FF2C80]", "bg-green-500", "bg-cyan-500"].map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setSelectedColor(c)}
                                            className={`w-8 h-8 rounded-full ${c} border-2 ${color === c ? 'border-white' : 'border-transparent'} hover:border-white transition-all`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all mt-4 disabled:opacity-50"
                            >
                                {isSaving ? "Adding..." : "Add Category"}
                            </button>
                        </form>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-gradient-to-br from-[#FF2C80]/10 to-transparent border border-white/5">
                        <p className="text-white/40 text-xs font-bold leading-relaxed">
                            Pro Tip: Categorizing your content correctly helps users find what they're looking for faster and increases platform engagement.
                        </p>
                    </div>
                </div>

                {/* Categories List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {isLoading ? (
                            <div className="text-center py-20 text-white/20 font-black uppercase tracking-widest">Loading categories...</div>
                        ) : filteredCategories.length === 0 ? (
                            <div className="text-center py-20 text-white/20 font-black uppercase tracking-widest">No categories found</div>
                        ) : (
                            filteredCategories.map((category) => (
                                <div key={category._id} className="group flex items-center justify-between p-4 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 text-white/10 group-hover:text-white/30 transition-colors cursor-grab active:cursor-grabbing">
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl ${category.color || 'bg-[#FF2C80]'} flex items-center justify-center shadow-lg shadow-black/20 text-white`}>
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-[#FF2C80] transition-colors">{category.name}</h3>
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">/{category.slug} • Active</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${category.status === "active" ? "bg-green-400/10 text-green-400" : "bg-white/5 text-white/20"}`}>
                                            {category.status === "active" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            <span>{category.status}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
