import { Tile} from '@/classes/Tile.ts';
import {Map} from "@/classes/Map.ts";
import {Door} from "@/classes/Door.ts";
import {SlimeBlue} from "@/classes/Slimes/Slimes.ts";
import {Weapon} from "@/classes/InventoryItem.ts";

export const forest1 = new Map({
    id: 'forest_1',
    name: 'Лесная поляна',
    width: 5,
    height: 5,
    tiles: [
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'tree' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Door({ to: 'forest_2' }),new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new SlimeBlue({hp: 20,attack:1, lootTable: [{ item: new Weapon({ id: 'sword', name: 'Меч', damageBonus: 5 }), chance: 1 }]}), new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new SlimeBlue({hp: 20,attack:1, lootTable: [{ item: new Weapon({ id: 'sword', name: 'Меч', damageBonus: 5 }), chance: 1 }]}), new Tile({ type: 'grass' }),new Tile({ type: 'tree' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
    ],
    startPosition: { x: 0, y: 0 },
});