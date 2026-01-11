export const ROWS = 8;
export const COLS = 8;

export type Side = "white" | "black";

export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

export interface Piece {
    id: string;
    side: Side;
    type: PieceType;
    hasMoved?: boolean;
}

export type Square = Piece | null;

export type Board = Square[][];

export interface Position {
    row: number;
    col: number;
}

export interface Scores {
    white: number;
    black: number;
}
