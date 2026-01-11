import { useState, useCallback } from "react";
import { Board, Piece, Position, Scores, Side } from "../types";
import { calculateWinner, createInitialBoard, getLegalMoves, getPiece } from "../game-logic";

export function useGameState() {
    // State variables
    const [board, setBoard] = useState<Board>(createInitialBoard());
    const [currentSide, setCurrentSide] = useState<Side>("red");
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [legalMoves, setLegalMoves] = useState<Position[]>([]);
    const [capturedPieces, setCapturedPieces] = useState<{ red: Piece[]; black: Piece[] }>({
        red: [],
        black: [],
    });
    const [scores, setScores] = useState<Scores>({ red: 0, black: 0 });
    const [winner, setWinner] = useState<Side | null>(null);

    // Handle cell click
    const handleCellClick = useCallback(
        (position: Position) => {
            // If there's a winner, don't allow moves
            if (winner) return;

            const clickedPiece = getPiece(board, position);

            // If no piece is selected
            if (!selectedPosition) {
                // Select piece if it belongs to current player
                if (clickedPiece && clickedPiece.side === currentSide) {
                    setSelectedPosition(position);
                    setLegalMoves(getLegalMoves(board, position));
                }
                return;
            }

            // If clicking on same position, deselect
            if (selectedPosition.row === position.row && selectedPosition.col === position.col) {
                setSelectedPosition(null);
                setLegalMoves([]);
                return;
            }

            // If clicking on another piece of same side, select that instead
            if (clickedPiece && clickedPiece.side === currentSide) {
                setSelectedPosition(position);
                setLegalMoves(getLegalMoves(board, position));
                return;
            }

            // Check if move is legal
            const isLegalMove = legalMoves.some(
                (move) => move.row === position.row && move.col === position.col
            );

            if (isLegalMove) {
                // Execute move
                const newBoard = board.map((row) => row.map((piece) => (piece ? { ...piece } : null)));
                const movingPiece = newBoard[selectedPosition.row][selectedPosition.col];
                const capturedPiece = newBoard[position.row][position.col];

                // Update board
                newBoard[position.row][position.col] = movingPiece;
                newBoard[selectedPosition.row][selectedPosition.col] = null;

                // Update captured pieces
                if (capturedPiece) {
                    setCapturedPieces((prev) => ({
                        ...prev,
                        [capturedPiece.side]: [...prev[capturedPiece.side], capturedPiece],
                    }));
                }

                setBoard(newBoard);

                // Switch sides
                const nextSide: Side = currentSide === "red" ? "black" : "red";
                setCurrentSide(nextSide);

                // Check for winner
                const gameWinner = calculateWinner(newBoard, nextSide);
                if (gameWinner) {
                    setWinner(gameWinner);
                    setScores((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
                }

                // Clear selection
                setSelectedPosition(null);
                setLegalMoves([]);
            } else {
                // Invalid move, deselect
                setSelectedPosition(null);
                setLegalMoves([]);
            }
        },
        [board, currentSide, selectedPosition, legalMoves, winner]
    );

    // Reset game
    const resetGame = useCallback(() => {
        setBoard(createInitialBoard());
        setCurrentSide("red");
        setSelectedPosition(null);
        setLegalMoves([]);
        setCapturedPieces({ red: [], black: [] });
        setWinner(null);
    }, []);

    // Reset scores
    const resetScores = useCallback(() => {
        setScores({ red: 0, black: 0 });
        resetGame();
    }, [resetGame]);

    return {
        board,
        currentSide,
        selectedPosition,
        legalMoves,
        capturedPieces,
        scores,
        winner,
        handleCellClick,
        resetGame,
        resetScores,
    };
}
