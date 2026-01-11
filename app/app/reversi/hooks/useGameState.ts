import { useState, useCallback } from "react";
import { Board, Position, Scores, Side } from "../types";
import {
    createInitialBoard,
    getValidMoves,
    applyMove,
    countPieces,
    isGameOver,
    getWinner,
} from "../game-logic";

export function useGameState() {
    const [board, setBoard] = useState<Board>(createInitialBoard());
    const [currentSide, setCurrentSide] = useState<Side>("black");
    const [validMoves, setValidMoves] = useState<Position[]>(getValidMoves(createInitialBoard(), "black"));
    const [scores, setScores] = useState<Scores>(countPieces(createInitialBoard()));
    const [winner, setWinner] = useState<Side | "draw" | null>(null);
    const [gameOver, setGameOver] = useState(false);

    // Handle cell click
    const handleCellClick = useCallback(
        (position: Position) => {
            if (gameOver || winner) return;

            // Check if move is valid
            const isValid = validMoves.some(
                (move) => move.row === position.row && move.col === position.col
            );

            if (!isValid) return;

            // Apply move
            const newBoard = applyMove(board, position, currentSide);
            if (!newBoard) return;

            setBoard(newBoard);

            // Update scores
            const newScores = countPieces(newBoard);
            setScores(newScores);

            // Try to switch to opponent's turn
            const nextSide: Side = currentSide === "black" ? "white" : "black";
            const nextValidMoves = getValidMoves(newBoard, nextSide);

            if (nextValidMoves.length > 0) {
                // Opponent has valid moves
                setCurrentSide(nextSide);
                setValidMoves(nextValidMoves);
            } else {
                // Opponent has no valid moves, check if current player can move again
                const currentValidMoves = getValidMoves(newBoard, currentSide);
                if (currentValidMoves.length > 0) {
                    // Current player moves again
                    setValidMoves(currentValidMoves);
                } else {
                    // Game over
                    const gameWinner = getWinner(newBoard);
                    setWinner(gameWinner);
                    setGameOver(true);
                }
            }
        },
        [board, currentSide, validMoves, gameOver, winner]
    );

    // Reset game
    const resetGame = useCallback(() => {
        const newBoard = createInitialBoard();
        setBoard(newBoard);
        setCurrentSide("black");
        setValidMoves(getValidMoves(newBoard, "black"));
        setScores(countPieces(newBoard));
        setWinner(null);
        setGameOver(false);
    }, []);

    // Reset scores
    const resetScores = useCallback(() => {
        resetGame();
    }, [resetGame]);

    return {
        board,
        currentSide,
        validMoves,
        scores,
        winner,
        gameOver,
        handleCellClick,
        resetGame,
        resetScores,
    };
}
