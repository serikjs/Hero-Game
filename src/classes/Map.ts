import type {MapOptions} from "@/typespaces/types/Map.ts";
import type {Positions} from "@/typespaces/types/Positions.ts";
import type {Tile} from "@/classes/Tile.ts";

export class Map {
    public id: string;
    public name: string;
    public width: number;
    public height: number;
    public tiles: Tile[][];
    public startPosition: Positions;

    constructor({ id, name, width, height, tiles, startPosition }: MapOptions) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.startPosition = startPosition;
    }

    // Проверка валидности координат
    public isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    // Проверка проходимости клетки
    public isPassable(x: number, y: number): boolean {
        if (!this.isValidPosition(x, y)) return false;
        const tile = this.tiles[y][x];
        return tile.passable
    }

    // Получение тайла по координатам
    public getTile(x: number, y: number): Tile | null {
        if (!this.isValidPosition(x, y)) return null;
        return this.tiles[y][x];
    }

    // Обновление тайла
    public setTile(x: number, y: number, tile: Tile): void {
        if (this.isValidPosition(x, y)) {
            this.tiles[y][x] = tile;
        }
    }
}