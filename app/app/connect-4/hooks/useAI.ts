"use client";

import { useEffect } from "react";
import { Board, GameMode } from "../types";
import { getBestMove } from "../game-logic";

export function useAI({
    board,
    gameMode,
    isCurrX,
    winner,
    makeMove,
    validMoves,
}: {
    board: Board;
    gameMode: GameMode;
    isCurrX: boolean;
    winner: "draw" | "X" | "Y" | null;
    makeMove: (col: number) => void;
    validMoves: number[];
}) {
    useEffect(() => {
        // return early if not AI's turn
        if (gameMode !== "ai" || isCurrX || winner || validMoves.length === 0) return;

        const timer = setTimeout(() => {
            const bestMove = getBestMove(board, { validColumns: validMoves });
            if (bestMove !== -1) {
                makeMove(bestMove);
            }
        }, 450);

        return () => clearTimeout(timer);
    }, [board, gameMode, isCurrX, winner, validMoves, makeMove]);
}
