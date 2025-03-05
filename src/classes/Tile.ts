import type {DisplayData, TileOptions} from "@/typespaces/types/Tile.ts";
import grassImg from '@/assets/tiles/grass.png';
import waterImg from '@/assets/tiles/water.webp';
import type {Size} from "@/typespaces/types/Positions.ts";

export const tileImages: Record<string, string> = {
    grass: grassImg,
    water: waterImg,
};

export const TileSize: Size = {height: 80, width:80};

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

    public getDisplayData(): DisplayData {
        return {
            backgroundImage: tileImages[this.type] || tileImages['grass'], // Фон для типа тайла
        };
    }
}