"use client";

import React from "react";
import { Gamepad2, Sparkles, Zap, Trophy } from "lucide-react";
import { BackgroundBeams } from "@/app/components/ui/BackgroundBeams";
import { SpotlightCard } from "@/app/components/ui/SpotlightCard";
import { NeonBorder } from "@/app/components/ui/NeonBorder";
import { HeroHighlight } from "@/app/components/ui/HeroHighlight";

export default function Home() {
    const quote = {
        title: "LEVEL UP YOUR FUN",
        subtitle: "All your favorite games in one epic hub",
    };

    const games = [
        { title: "Tic-Tac-Toe", description: "Classic strategy game", href: "/tic-tac-toe" },
        { title: "Connect 4", description: "Connect four discs!", href: "/connect-4" },
        { title: "Trivia", description: "Test your knowledge", href: "/trivia" },
        { title: "Wordle", description: "Guess the hidden word", href: "/wordle" },
        { title: "Word Search", description: "Find all the words", href: "/word-search" },
        { title: "Crossword", description: "Fill the puzzle grid", href: "/crossword" },
        { title: "Sudoku", description: "Number puzzle game", href: "/sudoku" },
        { title: "Simulation", description: "Interactive sims", href: "/simulation" },
    ];

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

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Zap className="w-10 h-10 text-yellow-400 animate-pulse" />
                        <HeroHighlight>
                            <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                GAME HUB
                            </h1>
                        </HeroHighlight>
                        <Zap className="w-10 h-10 text-yellow-400 animate-pulse" />
                    </div>
                    <p className="text-xl text-cyan-300 font-light tracking-[0.3em]">
                        PLAY. CHALLENGE. WIN.
                    </p>
                </header>

                {/* Hero Card with Neon Border */}
                <div className="max-w-4xl mx-auto mb-20">
                    <NeonBorder className="p-[2px]">
                        <div className="relative bg-black/90 p-12 rounded-xl overflow-hidden">
                            {/* Pixel glow overlay */}
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#0ff0,#0ff0 1px,transparent 1px,transparent 2px)] opacity-10 pointer-events-none animate-pulse" />
                            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                {/* Controller Icon */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse" />
                                    <div className="relative bg-black/50 p-8 rounded-full border-4 border-cyan-400/50 backdrop-blur-sm">
                                        <Gamepad2 className="w-24 h-24 text-cyan-400" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-flicker">
                                        {quote.title}
                                    </h2>
                                    <p className="text-lg text-gray-400 font-light">{quote.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </NeonBorder>
                </div>

                {/* Games Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Trophy className="w-8 h-8 text-yellow-400" />
                            <h3 className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
                                CHOOSE YOUR GAME
                            </h3>
                            <Trophy className="w-8 h-8 text-yellow-400" />
                        </div>
                        <p className="text-gray-400">Pick your adventure and start playing</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {games.map((game, idx) => (
                            <SpotlightCard key={idx} className="group">
                                <a href={game.href} className="block">
                                    <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 p-6 rounded-xl border-2 border-purple-500/30 group-hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2">
                                        <div className="flex items-start justify-between mb-3">
                                            <Sparkles className="w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-2 text-cyan-300 group-hover:text-pink-300 transition-colors">
                                            {game.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {game.description}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-sm font-semibold">PLAY NOW</span>
                                            <span className="text-xl">→</span>
                                        </div>
                                    </div>
                                </a>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                <footer className="text-center mt-20 text-gray-500">
                    <p className="text-sm tracking-[0.3em]">INSERT COIN TO CONTINUE</p>
                </footer>
            </div>
        </div>
    );
}
