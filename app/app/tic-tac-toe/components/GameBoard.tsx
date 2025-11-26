import { motion, AnimatePresence } from "framer-motion";
import { Board, Player } from "../types";

interface GameBoardProps {
    board: Board;
    winner: Player | "draw" | null;
    winningLine: number[];
    onCellClick: (index: number) => void;
}

export function GameBoard({ board, winner, winningLine, onCellClick }: GameBoardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="rounded-3xl p-1 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50">
                <div className="bg-zinc-900 rounded-3xl p-8">
                    <div className="grid grid-cols-3 gap-4">
                        {/* board cells */}
                        {board.map((value, index) => (
                            <motion.button
                                key={index}
                                onClick={() => onCellClick(index)}
                                disabled={!!value || !!winner}
                                whileHover={{ scale: value || winner ? 1 : 1.05 }}
                                whileTap={{ scale: value || winner ? 1 : 0.95 }}
                                className={`
                                w-20 h-20 md:w-28 md:h-28 rounded-xl
                                flex items-center justify-center
                                text-4xl md:text-5xl font-bold
                                transition-all duration-300
                                ${value ? "cursor-not-allowed" : "cursor-pointer"}
                                ${
                                    winningLine.includes(index)
                                    ? "bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400"
                                    : "bg-zinc-800/50 hover:bg-zinc-700/50 border-2 border-zinc-700/50 hover:border-zinc-600"
                                }
                                `}
                            >
                                <AnimatePresence>
                                    {value && (
                                        <motion.span
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        className={
                                            value === "X"
                                            ? "bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-blue-500"
                                            : "bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-500"
                                        }
                                        >
                                        {value}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
