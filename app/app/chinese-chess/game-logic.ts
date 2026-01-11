import { Board, COLS, Piece, PieceType, Position, ROWS, Side } from "./types";

// Palace boundaries
const PALACE_COLS = new Set([3, 4, 5]);
const RED_PALACE_ROWS = new Set([7, 8, 9]);
const BLACK_PALACE_ROWS = new Set([0, 1, 2]);

// River boundary
const RIVER_ROW = 4; // Row 0-4 is black side, row 5-9 is red side

// Direction vectors
const ORTHOGONAL = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
];

// Horse moves with blocking positions
const HORSE_MOVES = [
    { dr: -2, dc: -1, blockRow: -1, blockCol: 0 },
    { dr: -2, dc: 1, blockRow: -1, blockCol: 0 },
    { dr: -1, dc: -2, blockRow: 0, blockCol: -1 },
    { dr: 1, dc: -2, blockRow: 0, blockCol: -1 },
    { dr: 2, dc: -1, blockRow: 1, blockCol: 0 },
    { dr: 2, dc: 1, blockRow: 1, blockCol: 0 },
    { dr: -1, dc: 2, blockRow: 0, blockCol: 1 },
    { dr: 1, dc: 2, blockRow: 0, blockCol: 1 },
];

// Elephant moves with blocking positions
const ELEPHANT_MOVES = [
    { dr: -2, dc: -2, blockRow: -1, blockCol: -1 },
    { dr: -2, dc: 2, blockRow: -1, blockCol: 1 },
    { dr: 2, dc: -2, blockRow: 1, blockCol: -1 },
    { dr: 2, dc: 2, blockRow: 1, blockCol: 1 },
];

// Piece display order for captured pieces
export const PIECE_DISPLAY_ORDER: PieceType[] = [
    "general",
    "advisor",
    "elephant",
    "horse",
    "chariot",
    "cannon",
    "soldier",
];

// Create initial board setup
export function createInitialBoard(): Board {
    const board: Board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    const createPiece = (row: number, col: number, type: PieceType, side: Side): Piece => ({
        id: `${side}-${type}-${row}-${col}`,
        side,
        type,
    });

    // Back rank pieces (chariots, horses, elephants, advisors, generals)
    const backRank: PieceType[] = ["chariot", "horse", "elephant", "advisor", "general", "advisor", "elephant", "horse", "chariot"];

    backRank.forEach((type, col) => {
        board[0][col] = createPiece(0, col, type, "black");
        board[9][col] = createPiece(9, col, type, "red");
    });

    // Cannons
    board[2][1] = createPiece(2, 1, "cannon", "black");
    board[2][7] = createPiece(2, 7, "cannon", "black");
    board[7][1] = createPiece(7, 1, "cannon", "red");
    board[7][7] = createPiece(7, 7, "cannon", "red");

    // Soldiers
    [0, 2, 4, 6, 8].forEach((col) => {
        board[3][col] = createPiece(3, col, "soldier", "black");
        board[6][col] = createPiece(6, col, "soldier", "red");
    });

    return board;
}

// Check if position is inside board
export function isInsideBoard({ row, col }: Position): boolean {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

// Check if position is in palace for given side
function isInPalace(position: Position, side: Side): boolean {
    const { row, col } = position;
    if (!PALACE_COLS.has(col)) return false;
    return side === "red" ? RED_PALACE_ROWS.has(row) : BLACK_PALACE_ROWS.has(row);
}

// Check if soldier has crossed river
function hasCrossedRiver(position: Position, side: Side): boolean {
    return side === "red" ? position.row <= RIVER_ROW : position.row > RIVER_ROW;
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

// Find general position
function findGeneral(board: Board, side: Side): Position | null {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (piece && piece.type === "general" && piece.side === side) {
                return { row, col };
            }
        }
    }
    return null;
}

// Count pieces between two positions (same row or column)
function countPiecesBetween(board: Board, from: Position, to: Position): number {
    if (from.row === to.row) {
        const [start, end] = from.col < to.col ? [from.col + 1, to.col] : [to.col + 1, from.col];
        let count = 0;
        for (let col = start; col < end; col++) {
            if (board[from.row][col]) count++;
        }
        return count;
    }

    if (from.col === to.col) {
        const [start, end] = from.row < to.row ? [from.row + 1, to.row] : [to.row + 1, from.row];
        let count = 0;
        for (let row = start; row < end; row++) {
            if (board[row][from.col]) count++;
        }
        return count;
    }

    return -1;
}

// Check if generals are facing each other (no pieces between them)
function areGeneralsFacing(board: Board): boolean {
    const redGeneral = findGeneral(board, "red");
    const blackGeneral = findGeneral(board, "black");
    if (!redGeneral || !blackGeneral) return false;
    if (redGeneral.col !== blackGeneral.col) return false;
    return countPiecesBetween(board, redGeneral, blackGeneral) === 0;
}

// Get possible moves for general
function getGeneralMoves(board: Board, position: Position, side: Side): Position[] {
    const moves: Position[] = [];

    for (const { dr, dc } of ORTHOGONAL) {
        const target = { row: position.row + dr, col: position.col + dc };
        if (isInsideBoard(target) && isInPalace(target, side)) {
            moves.push(target);
        }
    }

    return moves;
}

// Get possible moves for advisor
function getAdvisorMoves(position: Position, side: Side): Position[] {
    const diagonals = [
        { dr: -1, dc: -1 },
        { dr: -1, dc: 1 },
        { dr: 1, dc: -1 },
        { dr: 1, dc: 1 },
    ];

    return diagonals
        .map(({ dr, dc }) => ({ row: position.row + dr, col: position.col + dc }))
        .filter((target) => isInsideBoard(target) && isInPalace(target, side));
}

// Get possible moves for elephant
function getElephantMoves(board: Board, position: Position, side: Side): Position[] {
    const moves: Position[] = [];

    for (const { dr, dc, blockRow, blockCol } of ELEPHANT_MOVES) {
        const target = { row: position.row + dr, col: position.col + dc };
        const blockPos = { row: position.row + blockRow, col: position.col + blockCol };

        if (!isInsideBoard(target)) continue;

        // Elephant cannot cross river
        if (side === "red" && target.row <= RIVER_ROW) continue;
        if (side === "black" && target.row > RIVER_ROW) continue;

        // Check if blocked
        if (getPiece(board, blockPos)) continue;

        moves.push(target);
    }

    return moves;
}

// Get possible moves for horse
function getHorseMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = [];

    for (const { dr, dc, blockRow, blockCol } of HORSE_MOVES) {
        const target = { row: position.row + dr, col: position.col + dc };
        const blockPos = { row: position.row + blockRow, col: position.col + blockCol };

        if (!isInsideBoard(target)) continue;

        // Check if blocked
        if (getPiece(board, blockPos)) continue;

        moves.push(target);
    }

    return moves;
}

// Get possible moves for chariot (rook)
function getChariotMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = [];

    for (const { dr, dc } of ORTHOGONAL) {
        let row = position.row + dr;
        let col = position.col + dc;

        while (isInsideBoard({ row, col })) {
            const target = { row, col };
            const piece = getPiece(board, target);

            if (!piece) {
                moves.push(target);
            } else {
                moves.push(target); // Can capture
                break;
            }

            row += dr;
            col += dc;
        }
    }

    return moves;
}

// Get possible moves for cannon
function getCannonMoves(board: Board, position: Position): Position[] {
    const moves: Position[] = [];

    for (const { dr, dc } of ORTHOGONAL) {
        let row = position.row + dr;
        let col = position.col + dc;
        let jumped = false;

        while (isInsideBoard({ row, col })) {
            const target = { row, col };
            const piece = getPiece(board, target);

            if (!jumped) {
                if (!piece) {
                    moves.push(target); // Can move without jumping
                } else {
                    jumped = true; // Jump over piece
                }
            } else {
                if (piece) {
                    moves.push(target); // Can capture after jump
                    break;
                }
            }

            row += dr;
            col += dc;
        }
    }

    return moves;
}

// Get possible moves for soldier
function getSoldierMoves(position: Position, side: Side): Position[] {
    const moves: Position[] = [];
    const forward = side === "red" ? -1 : 1;

    // Can always move forward
    const forwardPos = { row: position.row + forward, col: position.col };
    if (isInsideBoard(forwardPos)) {
        moves.push(forwardPos);
    }

    // Can move sideways if crossed river
    if (hasCrossedRiver(position, side)) {
        const leftPos = { row: position.row, col: position.col - 1 };
        const rightPos = { row: position.row, col: position.col + 1 };
        if (isInsideBoard(leftPos)) moves.push(leftPos);
        if (isInsideBoard(rightPos)) moves.push(rightPos);
    }

    return moves;
}

// Get all pseudo-legal moves (before checking for check)
function getPseudoLegalMoves(board: Board, position: Position, piece: Piece): Position[] {
    switch (piece.type) {
        case "general":
            return getGeneralMoves(board, position, piece.side);
        case "advisor":
            return getAdvisorMoves(position, piece.side);
        case "elephant":
            return getElephantMoves(board, position, piece.side);
        case "horse":
            return getHorseMoves(board, position);
        case "chariot":
            return getChariotMoves(board, position);
        case "cannon":
            return getCannonMoves(board, position);
        case "soldier":
            return getSoldierMoves(position, piece.side);
        default:
            return [];
    }
}

// Check if side is in check
export function isInCheck(board: Board, side: Side): boolean {
    const generalPos = findGeneral(board, side);
    if (!generalPos) return true; // No general = lost

    // Check if generals are facing each other
    if (areGeneralsFacing(board)) return true;

    // Check if any opponent piece can attack the general
    const opponent: Side = side === "red" ? "black" : "red";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (!piece || piece.side !== opponent) continue;

            const moves = getPseudoLegalMoves(board, { row, col }, piece);
            for (const move of moves) {
                if (move.row === generalPos.row && move.col === generalPos.col) {
                    return true;
                }
            }
        }
    }

    return false;
}

// Get all legal moves for a piece at position
export function getLegalMoves(board: Board, position: Position): Position[] {
    const piece = getPiece(board, position);
    if (!piece) return [];

    const pseudoMoves = getPseudoLegalMoves(board, position, piece);
    const legalMoves: Position[] = [];

    for (const target of pseudoMoves) {
        const targetPiece = getPiece(board, target);

        // Cannot capture own piece
        if (targetPiece && targetPiece.side === piece.side) continue;

        // Simulate move and check if it results in check
        const simulatedBoard = cloneBoard(board);
        simulatedBoard[target.row][target.col] = piece;
        simulatedBoard[position.row][position.col] = null;

        // Check if this move results in check or facing generals
        if (isInCheck(simulatedBoard, piece.side)) continue;
        if (areGeneralsFacing(simulatedBoard)) continue;

        legalMoves.push(target);
    }

    return legalMoves;
}

// Check if side has any legal moves
export function hasLegalMoves(board: Board, side: Side): boolean {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const piece = board[row][col];
            if (!piece || piece.side !== side) continue;
            if (getLegalMoves(board, { row, col }).length > 0) {
                return true;
            }
        }
    }
    return false;
}

// Calculate winner
export function calculateWinner(board: Board, currentSide: Side): Side | null {
    // Check if current player is in checkmate
    if (isInCheck(board, currentSide) && !hasLegalMoves(board, currentSide)) {
        return currentSide === "red" ? "black" : "red";
    }

    // Check if current player is in stalemate (no legal moves but not in check)
    if (!isInCheck(board, currentSide) && !hasLegalMoves(board, currentSide)) {
        return currentSide === "red" ? "black" : "red";
    }

    return null;
}
