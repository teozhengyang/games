export type Player = "X" | "O" | null;
export type Board = Player[];
export type GameMode = "pvp" | "ai";

export interface Scores {
    X: number;
    O: number;
    draws: number;
}
