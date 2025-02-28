import type {TileOptions} from "@/typespaces/types/Tile.ts";

export class Tile {
    public type: string;
    public passable: boolean;
    public description: string;

    constructor({ type = 'grass', passable = true, description = '' }: TileOptions = {}) {
        this.type = type;
        this.passable = passable;
        this.description = description;
    }

    // Метод проверки интерактивности
    public canInteract(): boolean {
        return false; // Обычные тайлы не интерактивны
    }

    // Метод получения описания
    public getDescription(): string {
        return this.description || `Это ${this.type}`;
    }
}