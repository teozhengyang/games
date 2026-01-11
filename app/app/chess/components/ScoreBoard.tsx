import { motion } from "framer-motion";
import { Scores } from "../types";

interface ScoreBoardProps {
    scores: Scores;
    onNewGame: () => void;
    onResetScores: () => void;
}

export function ScoreBoard({ scores, onNewGame, onResetScores }: ScoreBoardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-auto flex flex-col gap-6"
        >
            {/* Score Board */}
            <div className="rounded-[22px] p-1 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50">
                <div className="bg-zinc-900 rounded-[22px] p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 text-center lg:text-left">
                        {/* White */}
                        <div className="lg:pb-4 lg:border-b lg:border-zinc-700/50">
                            <p className="text-sm text-neutral-400 mb-1">White</p>
                            <p className="text-3xl font-bold text-cyan-400">{scores.white}</p>
                        </div>
                        {/* Black */}
                        <div className="lg:pt-4">
                            <p className="text-sm text-neutral-400 mb-1">Black</p>
                            <p className="text-3xl font-bold text-purple-400">{scores.black}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={onNewGame}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                >
                    New Game
                </button>
                <button
                    onClick={onResetScores}
                    className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
                >
                    Reset Scores
                </button>
            </div>
        </motion.div>
    );
}
