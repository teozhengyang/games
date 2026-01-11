import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Side } from "../types";

interface GameControlsProps {
    currentSide: Side;
    winner: Side | null;
}

export function GameControls({ currentSide, winner }: GameControlsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row gap-4 w-full max-w-3xl"
        >
            <Link href="/" className="flex-1">
                <button className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all duration-300 border border-zinc-700">
                    Return to Games
                </button>
            </Link>
            
            <div className="flex-1">
                <div className="w-full px-6 py-3 rounded-xl bg-black/70 backdrop-blur-sm border-2 border-purple-500/30 text-center">
                    <AnimatePresence mode="wait">
                        {winner ? (
                            <motion.div
                                key="winner"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-bold"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                                    {winner === "red" ? "Red" : "Black"} Wins!
                                </span>
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
                                <span className={currentSide === "red" ? "text-cyan-400 font-bold" : "text-purple-400 font-bold"}>
                                    {currentSide === "red" ? "Red" : "Black"}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
