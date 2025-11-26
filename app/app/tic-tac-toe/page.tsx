"use client";

import { GameHeader } from "./components/GameHeader";
import { GameControls } from "./components/GameControls";
import { GameBoard } from "./components/GameBoard";
import { ScoreBoard } from "./components/ScoreBoard";
import { useGameState } from "./hooks/useGameState";
import { useAI } from "./hooks/useAI";
import { calculateWinnerAndLine } from "./GameLogic";

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
        <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <div className="relative z-10 w-full pt-20 pb-20">
                {/* Header */}
                <GameHeader />

                <div className="flex flex-col items-center justify-center px-4">
                    {/* Game Controls */}
                    <GameControls
                        winner={winner}
                        isCurrX={isCurrX}
                        gameMode={gameMode}
                        onToggleMode={toggleGameMode}
                    />

                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                        {/* Game Board */}
                        <GameBoard
                            board={board}
                            winner={winner}
                            winningLine={winningLine}
                            onCellClick={handleClick}
                        />

                        {/* Score Board */}
                        <ScoreBoard
                            scores={scores}
                            gameMode={gameMode}
                            onNewGame={resetGame}
                            onResetScores={resetScores}
                        />
                    </div>
                </div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
    </div>
  );
}
