"use client";

import React from "react";
import { Sparkles, Zap, Swords, Puzzle, Joystick, FlaskConical } from "lucide-react";
import { BackgroundBeams } from "@/app/components/ui/BackgroundBeams";
import { SpotlightCard } from "@/app/components/ui/SpotlightCard";
import { HeroHighlight } from "@/app/components/ui/HeroHighlight";

export default function Home() {

    const catalog = [
        {
            key: "classic",
            icon: <Swords className="w-6 h-6 text-yellow-400" />,
            items: [
                { title: "Tic-Tac-Toe", description: "Classic strategy", href: "/tic-tac-toe" },
                { title: "Connect 4", description: "Connect four discs", href: "/connect-4" },
                { title: "Chinese Chess", description: "Xiangqi battles", href: "/chinese-chess" },
                { title: "Chess", description: "Checkmate the king", href: "/chess" },
                { title: "Reversi", description: "Flip to dominate", href: "/reversi" },
                { title: "Snakes and Ladders", description: "Climb and slide", href: "/snakes-and-ladders" },
            ],
        },
        {
            key: "puzzle",
            icon: <Puzzle className="w-6 h-6 text-pink-400" />,
            items: [
                { title: "Sudoku", description: "Number logic", href: "/sudoku" },
                { title: "Crossword", description: "Fill the grid", href: "/crossword" },
                { title: "Word Search", description: "Find the words", href: "/word-search" },
                { title: "Wordle", description: "Guess the word", href: "/wordle" },
                { title: "Trivia", description: "Test knowledge", href: "/trivia" },
                { title: "Solitaire", description: "Card patience", href: "/solitaire" },
            ],
        },
        {
            key: "arcade",
            icon: <Joystick className="w-6 h-6 text-cyan-400" />,
            items: [
                { title: "Snake", description: "Retro slither", href: "/snake" },
                { title: "Pac-Man", description: "Arcade chase", href: "/pac-man" },
                { title: "Tetris", description: "Stack blocks", href: "/tetris" },
                { title: "Minesweeper", description: "Flag or boom", href: "/minesweeper" },
                { title: "2048", description: "Merge tiles", href: "/2048" },
            ],
        },
        {
            key: "simulation",
            icon: <FlaskConical className="w-6 h-6 text-purple-400" />,
            items: [
                { title: "Game Theory", description: "Strategy models", href: "/game-theory" },
                { title: "Counting Cards", description: "Probability play", href: "/counting-cards" },
            ],
        },
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

                {/* Catalog Sections */}
                <div className="max-w-7xl mx-auto">
                    {catalog.map((section, sIdx) => (
                        <div key={section.key} className={sIdx === 0 ? "" : "mt-16"}>
                            {/* Section header */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    {section.icon}
                                    <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
                                        {section.key.toUpperCase()}
                                    </h3>
                                    {section.icon}
                                </div>
                            </div>

                            {/* Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {section.items.map((game, idx) => (
                                    <SpotlightCard key={`${section.key}-${idx}`} className="group">
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
                    ))}
                </div>

                <footer className="text-center mt-20 text-gray-500">
                    <p className="text-sm tracking-[0.3em]">INSERT COIN TO CONTINUE</p>
                </footer>
            </div>
        </div>
    );
}
