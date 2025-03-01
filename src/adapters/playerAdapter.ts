import { usePlayerStore } from '@/store/PlayerStore';
import { useMapStore } from '@/store/MapStore';
import { ThePlayer } from '@/classes/Player.ts';
import { Map } from '@/classes/Map.ts';

export class PlayerAdapter {
    private playerStore = usePlayerStore();
    private mapStore = useMapStore();

    // Перемещение персонажа
    async movePlayer(x: number, y: number): Promise<void> {
        const map = this.mapStore.currentMap;
        const player = this.playerStore.player;
        const result = player.moveTo(x, y, map);
        if (result) {
            // if (result.item) this.inventoryStore.addItem(result.item);
            if (result.newLocation) await this.handleLocationChange(result.newLocation);
        }
        this.setPlayer(player);
    }

    // Обработка нажатий клавиш
    async handleKey(event: KeyboardEvent): Promise<void>{
        const map = this.mapStore.currentMap;
        const player = this.playerStore.player;
        const result = player.handleKey(event, map);
        if (result) {
            // if (result.item) this.inventoryStore.addItem(result.item);
            if (result.newLocation) await this.handleLocationChange(result.newLocation);
        }
        this.setPlayer(player);
    }

    // Получение персонажа
    getPlayer(): ThePlayer {
        return this.playerStore.player;
    }

    // Обновление персонажа
    setPlayer(player: ThePlayer): void {
        this.playerStore.setPlayer(player);
    }

    // Заглушка для смены локации
    private async handleLocationChange(locationId: string): Promise<void> {
        console.log(`Переход в ${locationId}`);
        try {
            const module = await import(`@/locations/${locationId}.ts`);
            // Предполагаем, что экспорт назван в стиле camelCase (forest2, cave1 и т.д.)
            const newMap = module[locationId.replace('_', '')] as Map;
            if (newMap) {
                this.mapStore.setMap(newMap);
                const player = this.playerStore.player;
                player.position = newMap.startPosition;
                this.playerStore.setPlayer(player);
            } else {
                console.error(`Карта с ID ${locationId} не найдена`);
            }
        } catch (error) {
            console.error(`Ошибка загрузки карты ${locationId}:`, error);
        }
    }
}