"use client";

import React, { useEffect, useState } from "react";
import {
    Users,
    Video,
    Eye,
    TrendingUp,
    Clock,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MousePointer2,
    Briefcase,
    Calendar,
    ChevronDown,
    Activity,
    Layers,
    Tag,
    BarChart3
} from "lucide-react";
import { getAnalyticsData, getBackendStats } from "@/app/actions/analytics";

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [backendStats, setBackendStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const [anaData, backData] = await Promise.all([
                getAnalyticsData(),
                getBackendStats()
            ]);
            setAnalytics(anaData);
            setBackendStats(backData);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3C53]"></div>
            </div>
        );
    }

    const gaMetrics = [
        { name: "Active users", value: analytics?.activeUsers || "0", change: analytics?.activeUsersChange || "N/A", positive: analytics?.positive, description: "vs. Prev Period" },
        { name: "New users", value: analytics?.newUsers || "0", change: "No data", positive: true, description: "" },
        { name: "New User %", value: analytics?.newUserPercent || "0%", change: "No data", positive: true, description: "" },
        { name: "Pct Engaged", value: analytics?.pctEngaged || "0%", change: "No data", positive: true, description: "" },
        { name: "Pageviews per User", value: analytics?.pageviewsPerUser || "0", change: "No data", positive: true, description: "" },
        { name: "Engage Time", value: analytics?.engagementTime || "00:00", change: "No data", positive: true, description: "" },
    ];

    const platformStats = [
        { name: "Total Videos", value: backendStats?.totalVideos || "0", icon: Video, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Total Blogs", value: backendStats?.totalBlogs || "0", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
        { name: "Categories", value: backendStats?.totalCategories || "0", icon: Layers, color: "text-orange-500", bg: "bg-orange-500/10" },
        { name: "Trending Topics", value: backendStats?.totalTrends || "0", icon: TrendingUp, color: "text-red-500", bg: "bg-red-500/10" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white tracking-tight">Google Analytics 4 Report</h1>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
                        <div className="w-5 h-5 bg-[#F9AB00] rounded-md flex items-center justify-center">
                            <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white/80">unitekenyans</span>
                        <ChevronDown className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span className="text-xs font-bold text-white/80">28 Jan 2026 - 3 Feb 2026</span>
                    </div>
                </div>
            </div>

            {/* GA4 Summary Section */}
            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B3C53] via-purple-500 to-transparent opacity-50" />
                <h2 className="text-sm font-black text-[#1B3C53] uppercase tracking-[0.2em] mb-8 flex items-center">
                    Summary <div className="ml-4 h-[1px] flex-1 bg-[#1B3C53]/20" />
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
                    {gaMetrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1">
                            <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{metric.name}</h3>
                            <p className="text-2xl font-black text-white">{metric.value}</p>
                            <div className="flex items-center space-x-1">
                                {metric.change !== "No data" && metric.change !== "N/A" && (
                                    <span className={`text-[10px] font-black flex items-center ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                                        {metric.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                        {metric.change}
                                    </span>
                                )}
                                <span className="text-white/20 text-[10px] font-medium">{metric.change === "N/A" ? "↑ N/A" : ""} {metric.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="relative group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                            <div className="relative z-10 flex items-center space-x-4">
                                <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{stat.name}</h3>
                                    <p className="text-2xl font-black text-white">{stat.value}</p>
                                </div>
                            </div>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                                <Icon className="w-24 h-24 rotate-12" />
                            </div>
                        </div>
                    );
                })}
            </div>

            
        </div>
    );
}
