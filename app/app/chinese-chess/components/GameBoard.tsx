import { motion, AnimatePresence } from "framer-motion";
import { Board, Position, Side } from "../types";

interface GameBoardProps {
    board: Board;
    selectedPosition: Position | null;
    legalMoves: Position[];
    onCellClick: (position: Position) => void;
}

// Chinese characters for pieces
const PIECE_CHARS: Record<string, { red: string; black: string }> = {
    general: { red: "帥", black: "將" },
    advisor: { red: "仕", black: "士" },
    elephant: { red: "相", black: "象" },
    horse: { red: "傌", black: "馬" },
    chariot: { red: "俥", black: "車" },
    cannon: { red: "炮", black: "砲" },
    soldier: { red: "兵", black: "卒" },
};

export function GameBoard({ board, selectedPosition, legalMoves, onCellClick }: GameBoardProps) {
    const isSelected = (row: number, col: number) =>
        selectedPosition?.row === row && selectedPosition?.col === col;

    const isLegalMove = (row: number, col: number) =>
        legalMoves.some((move) => move.row === row && move.col === col);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="rounded-3xl p-1 bg-gradient-to-br from-amber-900/50 to-amber-950/50 backdrop-blur-sm border border-amber-700/50">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl p-4">
                    {/* Board grid */}
                    <div className="relative" style={{ width: "450px", height: "500px" }}>
                        {/* Horizontal lines */}
                        {Array.from({ length: 10 }).map((_, row) => (
                            <div
                                key={`h-${row}`}
                                className="absolute bg-amber-900/60"
                                style={{
                                    left: "25px",
                                    top: `${row * 50 + 25}px`,
                                    width: "400px",
                                    height: "2px",
                                }}
                            />
                        ))}

                        {/* Vertical lines */}
                        {Array.from({ length: 9 }).map((_, col) => (
                            <div
                                key={`v-${col}`}
                                className="absolute bg-amber-900/60"
                                style={{
                                    left: `${col * 50 + 25}px`,
                                    top: "25px",
                                    width: "2px",
                                    height: "450px",
                                }}
                            />
                        ))}

                        {/* Palace diagonals - Black */}
                        <svg className="absolute" style={{ left: "25px", top: "25px", width: "400px", height: "450px" }}>
                            <line x1={150} y1={0} x2={250} y2={100} stroke="#78350f" strokeWidth="2" opacity="0.6" />
                            <line x1={250} y1={0} x2={150} y2={100} stroke="#78350f" strokeWidth="2" opacity="0.6" />
                        </svg>

                        {/* Palace diagonals - Red */}
                        <svg className="absolute" style={{ left: "25px", top: "25px", width: "400px", height: "450px" }}>
                            <line x1={150} y1={350} x2={250} y2={450} stroke="#78350f" strokeWidth="2" opacity="0.6" />
                            <line x1={250} y1={350} x2={150} y2={450} stroke="#78350f" strokeWidth="2" opacity="0.6" />
                        </svg>

                        {/* Pieces and intersection points */}
                        {board.map((row, rowIndex) =>
                            row.map((piece, colIndex) => {
                                const position = { row: rowIndex, col: colIndex };
                                const selected = isSelected(rowIndex, colIndex);
                                const legal = isLegalMove(rowIndex, colIndex);

                                return (
                                    <motion.button
                                        key={`${rowIndex}-${colIndex}`}
                                        onClick={() => onCellClick(position)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`absolute flex items-center justify-center rounded-full transition-all ${
                                            piece
                                                ? "w-12 h-12 border-2 cursor-pointer"
                                                : "w-3 h-3 cursor-pointer"
                                        } ${
                                            selected
                                                ? "ring-4 ring-cyan-400 ring-offset-2 ring-offset-amber-100"
                                                : ""
                                        } ${
                                            legal && !piece
                                                ? "bg-green-400/50 hover:bg-green-400/70"
                                                : legal && piece
                                                ? "ring-4 ring-green-400"
                                                : ""
                                        } ${
                                            piece
                                                ? piece.side === "red"
                                                    ? "bg-gradient-to-br from-red-500 to-red-700 border-red-900 shadow-lg hover:shadow-xl"
                                                    : "bg-gradient-to-br from-gray-800 to-gray-950 border-gray-950 shadow-lg hover:shadow-xl"
                                                : "bg-amber-900/20"
                                        }`}
                                        style={{
                                            left: `${colIndex * 50 + 25 - (piece ? 24 : 6)}px`,
                                            top: `${rowIndex * 50 + 25 - (piece ? 24 : 6)}px`,
                                        }}
                                    >
                                        <AnimatePresence>
                                            {piece && (
                                                <motion.span
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    className={`text-2xl font-bold ${
                                                        piece.side === "red"
                                                            ? "text-red-50"
                                                            : "text-gray-50"
                                                    }`}
                                                >
                                                    {PIECE_CHARS[piece.type][piece.side]}
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
