"use client";

import { useCallback, useMemo, useState } from "react";
import { Board, GameMode, Player, Scores } from "../types";
import { createEmptyBoard, dropDisc, calculateWinner, getValidColumns } from "../game-logic";

// hook to manage game state
export function useGameState() {
    // State variables
    const [board, setBoard] = useState<Board>(() => createEmptyBoard());
    const [isCurrX, setIsCurrX] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<GameMode>("ai");
    const [scores, setScores] = useState<Scores>({ X: 0, Y: 0, draws: 0 });

    const winner = useMemo(() => calculateWinner(board), [board]);

    const makeMove = useCallback(
        (col: number) => {
            // no moves allowed if game over
            if (winner) return;
            // drop disc
            const player: Player = isCurrX ? "X" : "Y";
            const res = dropDisc(board, col, player);
            // if column full, do nothing
            if (!res) return;
            // update board and check for winner
            const nextBoard = res.board;
            const winnerNow = calculateWinner(nextBoard);
            setBoard(nextBoard);
            if (winnerNow) {
                setScores((s) =>
                    winnerNow === "draw" ? { ...s, draws: s.draws + 1 } : { ...s, [winnerNow]: s[winnerNow] + 1 }
                );
            } else {
                setIsCurrX((prev) => !prev);
            }
        }, 
        [board, isCurrX, winner]
    );
    
    // function to reset the game
    const resetGame = useCallback(() => {
        setBoard(createEmptyBoard());
        setIsCurrX(true);
    }, []);

    // function to reset scores
    const resetScores = useCallback(() => {
        setScores({ X: 0, Y: 0, draws: 0 });
        resetGame();
    }, [resetGame]);

    // function to toggle game mode
    const toggleGameMode = useCallback(() => {
        setGameMode((m) => (m === "ai" ? "pvp" : "ai"));
        resetGame();
    }, [resetGame]);
    
    // compute valid moves
    const validMoves = useMemo(() => {
        return getValidColumns(board);
    }, [board]);

    return {
        board,
        isCurrX,
        scores,
        gameMode,
        winner,
        makeMove,
        resetGame,
        resetScores,
        toggleGameMode,
        validMoves,
    };
}
