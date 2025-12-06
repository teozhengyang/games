import { motion } from "framer-motion";
import { Scores, GameMode } from "../types";

interface ScoreBoardProps {
    scores: Scores;
    gameMode: GameMode;
    onNewGame: () => void;
    onResetScores: () => void;
}

export function ScoreBoard({ scores, gameMode, onNewGame, onResetScores }: ScoreBoardProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full lg:w-auto flex flex-col gap-6">
            {/* Score Board */}
            <div className="rounded-[22px] p-6 bg-zinc-900 ">
                <div className="lg:pb-4 lg:border-b lg:border-zinc-700/50">
                    <p className="text-sm text-neutral-400 mb-1">Player X</p>
                    <p className="text-3xl font-bold text-cyan-400">{scores.X}</p>
                </div>
                <div className="lg:py-4 lg:border-b lg:border-zinc-700/50">
                    <p className="text-sm text-neutral-400 mb-1">Draws</p>
                    <p className="text-3xl font-bold text-yellow-400">{scores.draws}</p>
                </div>
                <div className="lg:pt-4">
                    <p className="text-sm text-neutral-400 mb-1">{gameMode === "ai" ? "AI (Player Y)" : "Player Y"}</p>
                    <p className="text-3xl font-bold text-purple-400">{scores.Y}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <button
                onClick={onNewGame}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600"
                >
                    New Game
                </button>
                <button
                onClick={onResetScores}
                className="w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700"
                >
                    Reset Scores
                </button>
            </div>
        </motion.div>
    );
}
