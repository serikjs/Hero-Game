import { Tile} from '@/classes/Tile.ts';
import {Map} from "@/classes/Map.ts";

export const forest2 = new Map({
    id: 'forest_1',
    name: 'Лесная поляна',
    width: 6,
    height: 6,
    tiles: [
        [new Tile({ type: 'grass' }), new Tile({ type: 'water',passable:false }), new Tile({ type: 'tree' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }),new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }),new Tile({ type: 'tree' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
        [new Tile({ type: 'grass' }), new Tile({ type: 'grass' }),new Tile({ type: 'tree' }),new Tile({ type: 'grass' }), new Tile({ type: 'grass' }), new Tile({ type: 'grass' })],
    ],
    startPosition: { x: 0, y: 5 },
});