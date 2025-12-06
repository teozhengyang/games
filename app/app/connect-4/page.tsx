"use client";

import { GameHeader } from "./components/GameHeader";
import { GameControls } from "./components/GameControls";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGameState } from "./hooks/useGameState";
import { useAI } from "./hooks/useAI";

export default function Connect4Page() {
    // game state management
    const { board, isCurrX, scores, gameMode, winner, makeMove, resetGame, resetScores, toggleGameMode, validMoves } = useGameState();

    // AI hook
    useAI({ board, gameMode, isCurrX, winner, makeMove, validMoves });

    // handle column click
    const handleColumnClick = (col: number) => {
        if (gameMode === "ai" && !isCurrX) return; // human is X
        makeMove(col);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden z-10 mx-auto px-4 py-12">
            <GameHeader />
            <div className="flex flex-col items-center justify-center">
                <GameControls winner={winner} isCurrX={isCurrX} gameMode={gameMode} onToggleMode={toggleGameMode} />
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    <GameBoard board={board} winner={winner} onColumnClick={handleColumnClick} />

                    <ScoreBoard scores={scores} gameMode={gameMode} onNewGame={resetGame} onResetScores={resetScores} />
                </div>
            </div>
        </div>
    );
}
