export type Player = "X" | "Y";
export type Cell = Player | null;
export type Board = Cell[][];
export type GameMode = "pvp" | "ai";

export type Scores = {
    X: number;
    Y: number;
    draws: number;
};
