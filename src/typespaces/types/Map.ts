import type {Tile} from "@/classes/Tile.ts";
import type {Positions} from "@/typespaces/types/Positions.ts";

export interface MapOptions {
    id: string;
    name: string;
    width: number;
    height: number;
    tiles: Tile[][];
    startPosition: Positions;
}