"use client";

import { GameCard } from "@/components/game-card";
import { Spotlight } from "@/components/ui/spotlight";
import { motion } from "framer-motion";

const games = [
  {
    title: "Tic-Tac-Toe",
    description: "Classic strategy game for two players",
    icon: "❌⭕",
    href: "/tic-tac-toe",
  },
  {
    title: "Connect 4",
    description: "Connect four discs in a row to win",
    icon: "🔴",
    href: "/connect-4",
  },
  {
    title: "Trivia",
    description: "Test your knowledge with fun questions",
    icon: "🧠",
    href: "/trivia",
  },
  {
    title: "Wordle",
    description: "Guess the word in six tries",
    icon: "📝",
    href: "/wordle",
  },
  {
    title: "Word Search",
    description: "Find hidden words in the grid",
    icon: "🔍",
    href: "/word-search",
  },
  {
    title: "Crossword",
    description: "Solve clues to fill the puzzle",
    icon: "📰",
    href: "/crossword",
  },
  {
    title: "Sudoku",
    description: "Fill the grid with numbers 1-9",
    icon: "🔢",
    href: "/sudoku",
  },
  {
    title: "Simulation",
    description: "Interactive simulation games",
    icon: "🎮",
    href: "/simulation",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Games
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Choose your favorite game and start playing! From classic puzzles to brain teasers.
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              icon={game.icon}
              href={game.href}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
