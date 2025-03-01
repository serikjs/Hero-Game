import { useMapStore } from '@/store/MapStore';
import { Map } from '@/classes/Map.ts';
import type {Tile} from "@/classes/Tile.ts";

export class MapAdapter {
    private mapStore = useMapStore();

    // Получение текущей карты
    getMap(): Map {
        return this.mapStore.currentMap;
    }

    // Установка новой карты
    setMap(map: Map): void {
        this.mapStore.setMap(map);
    }

    // Обновление тайла на карте
    updateTile(x: number, y: number, tile: Tile): void {
        this.mapStore.currentMap.setTile(x, y, tile);
    }
}