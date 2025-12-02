"use client";

import { GameHeader } from "./components/GameHeader";
import { GameControls } from "./components/GameControls";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGameState } from "./hooks/useGameState";
import { useAI } from "./hooks/useAI";
import { calculateWinnerAndLine } from "./game-logic";

export default function TicTacToePage() {
    // store game state handlers
    const {
        board,
        isCurrX,
        scores,
        gameMode,
        makeMove,
        resetGame,
        resetScores,
        toggleGameMode,
    } = useGameState();

    // determine winner and winning line if any
    const { winner, line: winningLine } = calculateWinnerAndLine(board);

    // call AI for next move
    useAI({ board, isCurrX, winner, gameMode, makeMove });

    // handle cell click 
    const handleClick = (index: number) => {
        // no clicking when it's AI's turn (X is always human)
        if (gameMode === "ai" && !isCurrX) {
            return;
        } 
        // make move
        makeMove(index, board, isCurrX ? "X" : "O");
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <GameHeader />

                {/* Controls */}
                <div className="flex flex-col items-center justify-center">
                    <GameControls
                        winner={winner}
                        isCurrX={isCurrX}
                        gameMode={gameMode}
                        onToggleMode={toggleGameMode}
                    />

                    {/* Main content: board + scoreboard */}
                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Simple board without neon wrappers/lines */}
                        <GameBoard
                            board={board}
                            winner={winner}
                            winningLine={winningLine}
                            onCellClick={handleClick}
                        />

                        {/* Simple scoreboard without neon wrappers/lines */}
                        <ScoreBoard
                            scores={scores}
                            gameMode={gameMode}
                            onNewGame={resetGame}
                            onResetScores={resetScores}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
