import { useState, useCallback } from "react";
import { Board, Player, Scores, GameMode } from "../types";
import { calculateWinnerAndLine } from "../game-logic";

export function useGameState() {
    // state variables (board, current player, scores, game mode)
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isCurrX, setIsCurrX] = useState(true);
    const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });
    const [gameMode, setGameMode] = useState<GameMode>("pvp");

    // handle a player's move
    const makeMove = useCallback((index: number, currentBoard: Board, currentPlayer: Player) => {
        // Prevent move if cell is occupied or if there's already a winner
        let winner = calculateWinnerAndLine(currentBoard).winner;
        if (currentBoard[index] || winner) return;

        // Update the board with the new move
        const newBoard = [...currentBoard];
        newBoard[index] = currentPlayer;
        
        // Check if this move creates a winner
        winner = calculateWinnerAndLine(newBoard).winner;
        if (winner === "X" || winner === "O") {
            setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
        } else if (winner === "draw") {
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
        
        // Update state
        setBoard(newBoard);
        setIsCurrX(currentPlayer === "X" ? false : true);
    }, []);

    // reset the game to initial state
    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setIsCurrX(true);
    }, []);

    // reset scores and game state
    const resetScores = useCallback(() => {
        setScores({ X: 0, O: 0, draws: 0 });
        resetGame();
    }, [resetGame]);

    // toggle between player vs player and player vs AI modes
    const toggleGameMode = useCallback(() => {
        setGameMode((prev) => (prev === "pvp" ? "ai" : "pvp"));
        resetGame();
    }, [resetGame]);

    return {
        board,
        isCurrX,
        scores,
        gameMode,
        makeMove,
        resetGame,
        resetScores,
        toggleGameMode,
    };
}
