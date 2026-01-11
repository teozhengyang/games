"use client";

import { GameHeader } from "./components/GameHeader";
import { GameControls } from "./components/GameControls";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGameState } from "./hooks/useGameState";

export default function ChineseChessPage() {
    const {
        board,
        currentSide,
        selectedPosition,
        legalMoves,
        scores,
        winner,
        handleCellClick,
        resetGame,
        resetScores,
    } = useGameState();

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden z-10 mx-auto px-4 py-12">
            <GameHeader />

            <div className="flex flex-col items-center justify-center">
                <GameControls currentSide={currentSide} winner={winner} />
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    <GameBoard
                        board={board}
                        selectedPosition={selectedPosition}
                        legalMoves={legalMoves}
                        onCellClick={handleCellClick}
                    />
                    <ScoreBoard
                        scores={scores}
                        onNewGame={resetGame}
                        onResetScores={resetScores}
                    />
                </div>
            </div>
        </div>
    );
}
