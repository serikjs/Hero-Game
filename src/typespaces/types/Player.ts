import type {Positions} from "@/typespaces/types/Positions.ts";

export interface PlayerOptions {
    position: Positions;
    attack?: number;
    hp?: number;
}
