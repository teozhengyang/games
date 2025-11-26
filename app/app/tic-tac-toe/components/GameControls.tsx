import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GameMode, Player } from "../types";

interface GameControlsProps {
    winner: Player | "draw" | null;
    isCurrX: boolean;
    gameMode: GameMode;
    onToggleMode: () => void;
}

export function GameControls({ winner, isCurrX, gameMode, onToggleMode }: GameControlsProps) {
    return (
        <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row gap-4 w-full max-w-3xl"
        >
            <Link href="/" className="flex-1">
                <button className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all duration-300 border border-zinc-700">
                Return to Games
                </button>
            </Link>
            
            <div className="flex-1">
                <div className="w-full px-6 py-3 rounded-xl bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 text-center">
                    <AnimatePresence mode="wait">
                        {winner ? (
                            <motion.div
                                key="winner"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-bold"
                            >
                                {winner === "draw" ? (
                                    <span className="text-yellow-400">Draw!</span>
                                    ) : (
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                        {winner} Wins!
                                    </span>
                                )}
                            </motion.div>
                            ) : (
                            <motion.div
                                key="current"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-medium text-neutral-200"
                            >
                                Current:{" "}
                                <span className={isCurrX ? "text-cyan-400 font-bold" : "text-purple-400 font-bold"}>
                                    {isCurrX ? "X" : gameMode === "ai" ? "AI" : "O"}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            <button
                onClick={onToggleMode}
                className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
            >
                Mode: {gameMode === "pvp" ? "PvP" : "AI"}
            </button>
        </motion.div>
    );
}
