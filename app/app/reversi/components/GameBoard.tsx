import { motion, AnimatePresence } from "framer-motion";
import { Board, Position } from "../types";

interface GameBoardProps {
    board: Board;
    validMoves: Position[];
    onCellClick: (position: Position) => void;
}

export function GameBoard({ board, validMoves, onCellClick }: GameBoardProps) {
    const isValidMove = (row: number, col: number) =>
        validMoves.some((move) => move.row === row && move.col === col);

    const isLightSquare = (row: number, col: number) => (row + col) % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="rounded-3xl p-1 bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 backdrop-blur-sm border border-emerald-700/50">
                <div className="bg-zinc-900 rounded-3xl p-2">
                    <div className="grid grid-cols-8 gap-0 w-[448px] h-[448px]">
                        {board.map((row, rowIndex) =>
                            row.map((piece, colIndex) => {
                                const position = { row: rowIndex, col: colIndex };
                                const valid = isValidMove(rowIndex, colIndex);
                                const isLight = isLightSquare(rowIndex, colIndex);

                                return (
                                    <motion.button
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => onCellClick(position)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative w-14 h-14 flex items-center justify-center transition-all ${
                                            isLight ? "bg-amber-50" : "bg-emerald-700"
                                        } ${
                                            valid
                                                ? "after:absolute after:w-3 after:h-3 after:rounded-full after:bg-yellow-400/70"
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
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    className={`relative z-10 w-9 h-9 rounded-full ${
                                                        piece.side === "black"
                                                            ? "bg-gray-900 border-2 border-gray-700"
                                                            : "bg-white border-2 border-gray-200"
                                                    }`}
                                                />
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
