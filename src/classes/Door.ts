import {Tile} from "@/classes/Tile.ts";
import type {DoorOptions} from "@/typespaces/types/Door.ts";
import type {DisplayData} from "@/typespaces/types/Tile.ts";

export class Door extends Tile {
    public to: string;

    constructor({ to = 'unknown' }: DoorOptions = {}) {
        super({ type: 'door', passable: true, description: `Дверь в ${to}` });
        this.to = to;
    }

    public canInteract(): boolean {
        return true;
    }

    public getDisplayData(): DisplayData {
        return {
            backgroundImage: `/assets/tiles/door.png`,
        };
    }
}