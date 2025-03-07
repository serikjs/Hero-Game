import type {Item} from "@/typespaces/types/ItemInventory.ts";

export interface MonsterOptions {
    type?: string;
    hp?: number;
    attack?: number;
    lootTable?: { item: Item; chance: number }[];
}