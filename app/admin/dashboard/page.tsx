"use client";

import React from "react";
import {
    Users,
    Video,
    Eye,
    TrendingUp,
    Clock,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        {
            name: "Total Users",
            value: "1,284",
            change: "+12.5%",
            positive: true,
            icon: Users,
            color: "from-blue-500/20 to-transparent"
        },
        {
            name: "Total Videos",
            value: "256",
            change: "+4.2%",
            positive: true,
            icon: Video,
            color: "from-purple-500/20 to-transparent"
        },
        {
            name: "Total Views",
            value: "84.2K",
            change: "-2.1%",
            positive: false,
            icon: Eye,
            color: "from-[#FF2C80]/20 to-transparent"
        },
        {
            name: "Revenue",
            value: "$4,250",
            change: "+18.7%",
            positive: true,
            icon: DollarSign,
            color: "from-green-500/20 to-transparent"
        },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="relative group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/5 rounded-2xl">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-bold ${stat.positive ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}>
                                        {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.name}</h3>
                                <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Uploads</h2>
                        <button className="text-[#FF2C80] text-xs font-bold hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group p-4 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-10 rounded-xl bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center">
                                        <Video className="w-4 h-4 text-white/20" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-[#FF2C80] transition-colors line-clamp-1">Example Premium Video Content #{i}</p>
                                        <p className="text-xs text-white/40 flex items-center mt-1">
                                            <Clock className="w-3 h-3 mr-1" /> 2 hours ago • <Eye className="w-3 h-3 mx-1" /> 1.2K views
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 rounded-md bg-[#FF2C80]/10 text-[#FF2C80] text-[10px] font-bold uppercase">Trending</span>
                                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                                        <TrendingUp className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Performance */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Platform Health</h2>
                    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-400/10 blur-[60px]" />

                        <div className="relative space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-white/40 uppercase tracking-widest">Server Load</span>
                                    <span className="text-green-400">22%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[22%] bg-green-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-white/40 uppercase tracking-widest">Storage</span>
                                    <span className="text-purple-400">64%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[64%] bg-purple-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-white/40 uppercase tracking-widest">Bandwidth</span>
                                    <span className="text-[#FF2C80]">48%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[48%] bg-[#FF2C80]" />
                                </div>
                            </div>

                            <button className="w-full mt-4 py-3 bg-white text-black rounded-2xl text-xs font-black uppercase hover:scale-[1.02] active:scale-95 transition-all">
                                Optimization Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
