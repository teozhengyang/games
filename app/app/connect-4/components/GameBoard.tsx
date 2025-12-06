import { motion, AnimatePresence } from "framer-motion";
import { Board } from "../types";

const COLS = 7;
const ROWS = 6;

interface GameBoardProps {
    board: Board;
    winner: "draw" | "X" | "Y" | null;
    onColumnClick: (col: number) => void;
}

export function GameBoard({ board, winner, onColumnClick }: GameBoardProps) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="rounded-3xl p-6 bg-zinc-800/50 backdrop-blur-sm">
                {/* Column selectors */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {Array.from({ length: COLS }, (_, c) => (
                        <button
                            key={`selector-${c}`}
                            onClick={() => onColumnClick(c)}
                            disabled={!!winner}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-xs text-neutral-300"
                        >
                            ▼
                        </button>
                    ))}
                </div>

                {/* Board grid */}
                <div className="space-y-2">
                    {Array.from({ length: ROWS }, (_, r) => (
                        <div key={`row-${r}`} className="grid grid-cols-7 gap-2">
                            {Array.from({ length: COLS }, (_, c) => {
                                const value = board[r][c];
                                return (
                                    <motion.div
                                        key={`cell-${r}-${c}`}
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-zinc-800/50`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                    <AnimatePresence>
                                        {value && (
                                        <motion.span
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            className={
                                            value === "X"
                                                ? "w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
                                                : "w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500"
                                            }
                                        />
                                        )}
                                    </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
