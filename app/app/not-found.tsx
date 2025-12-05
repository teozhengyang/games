"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Zap } from "lucide-react";
import { BackgroundBeams } from "@/app/components/ui/BackgroundBeams";
import { HeroHighlight } from "@/app/components/ui/HeroHighlight";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
                <BackgroundBeams />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
                <div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
                style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                        <HeroHighlight>
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            BUILDING IN PROGRESS
                        </h1>
                        </HeroHighlight>
                        <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                    <p className="text-base md:text-lg text-cyan-300 font-light tracking-[0.25em]">This route isn&#39;t ready yet.</p>
                </div>

                {/* Message Card */}
                <div className="max-w-3xl mx-auto relative bg-black/90 p-10 rounded-xl overflow-hidden border-2 border-purple-500/30 flex flex-col items-center gap-6 relative z-10">
                    <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse" />
                            <div className="relative bg-black/50 p-6 rounded-full border-4 border-cyan-400/50 backdrop-blur-sm">
                                <Wrench className="w-14 h-14 text-cyan-400" strokeWidth={1.5} />
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-400">We&#39;re crafting something awesome here. Check back soon!</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link href="/" className="flex-1">
                                <button className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all duration-300 border border-zinc-700">
                                    Return to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <footer className="text-center mt-16 text-gray-500">
                    <p className="text-sm tracking-[0.3em]">INSERT COIN TO CONTINUE</p>
                </footer>
            </div>
        </div>
    );
}
