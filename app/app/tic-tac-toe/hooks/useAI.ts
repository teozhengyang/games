import { useEffect } from "react";
import { Board, Player, GameMode } from "../types";
import { findBestMove } from "../GameLogic";

interface UseAIProps {
    board: Board;
    isCurrX: boolean;
    winner: Player | "draw" | null;
    gameMode: GameMode;
    makeMove: (index: number, board: Board, player: Player) => void;
}

// hook to make AI move
export function useAI({ board, isCurrX, winner, gameMode, makeMove }: UseAIProps) {
    useEffect(() => {
        // AI only plays when game mode is "ai", it's AI's turn, and there's no winner yet
        if (gameMode === "ai" && !isCurrX && !winner) {
            // simulate thinking time
            const timer = setTimeout(() => {
                const bestMove = findBestMove([...board]);
                if (bestMove !== -1) {
                    makeMove(bestMove, board, "O");
                }
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [board, isCurrX, winner, gameMode, makeMove]);
}
