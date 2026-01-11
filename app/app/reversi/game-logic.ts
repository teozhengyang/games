import { Board, COLS, Piece, Position, ROWS, Side } from "./types";

// Create initial reversi board setup
export function createInitialBoard(): Board {
    const board: Board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    // Initial setup: 4 pieces in the center
    board[3][3] = { side: "white" };
    board[3][4] = { side: "black" };
    board[4][3] = { side: "black" };
    board[4][4] = { side: "white" };

    return board;
}

// Check if position is inside board
export function isInsideBoard({ row, col }: Position): boolean {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

// Get piece at position
export function getPiece(board: Board, position: Position): Piece | null {
    if (!isInsideBoard(position)) return null;
    return board[position.row][position.col];
}

// Clone board
function cloneBoard(board: Board): Board {
    return board.map((row) => row.map((piece) => (piece ? { ...piece } : null)));
}

// Get all directions
const DIRECTIONS = [
    { dr: -1, dc: -1 },
    { dr: -1, dc: 0 },
    { dr: -1, dc: 1 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
    { dr: 1, dc: -1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
];

// Get pieces that would be flipped in a given direction
function getFlippedPieces(board: Board, position: Position, side: Side, dr: number, dc: number): Position[] {
    const flipped: Position[] = [];
    let row = position.row + dr;
    let col = position.col + dc;
    const opponent: Side = side === "black" ? "white" : "black";

    while (isInsideBoard({ row, col })) {
        const piece = getPiece(board, { row, col });

        if (!piece) {
            // Empty square - no valid flip
            return [];
        }

        if (piece.side === side) {
            // Found own piece - valid flip
            return flipped;
        }

        // Opponent piece - continue
        flipped.push({ row, col });
        row += dr;
        col += dc;
    }

    // Reached edge without finding own piece
    return [];
}

// Get all pieces that would be flipped by a move
function getAllFlippedPieces(board: Board, position: Position, side: Side): Position[] {
    const flipped: Position[] = [];

    // Can't place on occupied square
    if (getPiece(board, position)) {
        return [];
    }

    for (const { dr, dc } of DIRECTIONS) {
        const flippedInDirection = getFlippedPieces(board, position, side, dr, dc);
        flipped.push(...flippedInDirection);
    }

    return flipped;
}

// Check if a move is valid
export function isValidMove(board: Board, position: Position, side: Side): boolean {
    return getAllFlippedPieces(board, position, side).length > 0;
}

// Get all valid moves for a side
export function getValidMoves(board: Board, side: Side): Position[] {
    const moves: Position[] = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const position = { row, col };
            if (isValidMove(board, position, side)) {
                moves.push(position);
            }
        }
    }

    return moves;
}

// Apply a move and return the new board with flipped pieces
export function applyMove(board: Board, position: Position, side: Side): Board | null {
    const flipped = getAllFlippedPieces(board, position, side);

    if (flipped.length === 0) {
        return null; // Invalid move
    }

    const newBoard = cloneBoard(board);
    newBoard[position.row][position.col] = { side };

    // Flip all opponent pieces
    for (const pos of flipped) {
        newBoard[pos.row][pos.col] = { side };
    }

    return newBoard;
}

// Count pieces on board
export function countPieces(board: Board): { black: number; white: number } {
    let black = 0;
    let white = 0;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (piece) {
                if (piece.side === "black") {
                    black++;
                } else {
                    white++;
                }
            }
        }
    }

    return { black, white };
}

// Check if game is over
export function isGameOver(board: Board): boolean {
    return getValidMoves(board, "black").length === 0 && getValidMoves(board, "white").length === 0;
}

// Get the winner (or draw)
export function getWinner(board: Board): Side | "draw" | null {
    if (!isGameOver(board)) {
        return null;
    }

    const { black, white } = countPieces(board);

    if (black > white) {
        return "black";
    } else if (white > black) {
        return "white";
    } else {
        return "draw";
    }
}
