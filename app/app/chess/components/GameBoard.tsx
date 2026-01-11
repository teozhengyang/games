import { motion, AnimatePresence } from "framer-motion";
import { Board, Position } from "../types";

interface GameBoardProps {
    board: Board;
    selectedPosition: Position | null;
    legalMoves: Position[];
    onCellClick: (position: Position) => void;
}

// Unicode chess pieces
const PIECE_SYMBOLS: Record<string, { white: string; black: string }> = {
    king: { white: "♔", black: "♚" },
    queen: { white: "♕", black: "♛" },
    rook: { white: "♖", black: "♜" },
    bishop: { white: "♗", black: "♝" },
    knight: { white: "♘", black: "♞" },
    pawn: { white: "♙", black: "♟" },
};

export function GameBoard({ board, selectedPosition, legalMoves, onCellClick }: GameBoardProps) {
    const isSelected = (row: number, col: number) =>
        selectedPosition?.row === row && selectedPosition?.col === col;

    const isLegalMove = (row: number, col: number) =>
        legalMoves.some((move) => move.row === row && move.col === col);

    const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="rounded-3xl p-1 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50">
                <div className="bg-zinc-900 rounded-3xl p-2">
                    <div className="grid grid-cols-8 gap-0 w-[448px] h-[448px]">
                        {board.map((row, rowIndex) =>
                            row.map((piece, colIndex) => {
                                const position = { row: rowIndex, col: colIndex };
                                const selected = isSelected(rowIndex, colIndex);
                                const legal = isLegalMove(rowIndex, colIndex);
                                const isLight = isLightSquare(rowIndex, colIndex);

                                return (
                                    <motion.button
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => onCellClick(position)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative w-14 h-14 flex items-center justify-center text-5xl transition-all ${
                                            isLight
                                                ? "bg-amber-100"
                                                : "bg-amber-800"
                                        } ${
                                            selected
                                                ? "ring-4 ring-cyan-400 ring-inset"
                                                : ""
                                        } ${
                                            legal
                                                ? "after:absolute after:w-3 after:h-3 after:rounded-full after:bg-green-400/60"
                                                : ""
                                        } ${
                                            rowIndex === 0 && colIndex === 0
                                                ? "rounded-tl-2xl"
                                                : rowIndex === 0 && colIndex === 7
                                                ? "rounded-tr-2xl"
                                                : rowIndex === 7 && colIndex === 0
                                                ? "rounded-bl-2xl"
                                                : rowIndex === 7 && colIndex === 7
                                                ? "rounded-br-2xl"
                                                : ""
                                        }`}
                                    >
                                        <AnimatePresence>
                                            {piece && (
                                                <motion.span
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    className={`relative z-10 ${
                                                        piece.side === "white"
                                                            ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                                                            : "text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"
                                                    }`}
                                                >
                                                    {PIECE_SYMBOLS[piece.type][piece.side]}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
