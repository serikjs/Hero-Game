import { usePlayerStore } from '@/store/PlayerStore';
import { useMapStore } from '@/store/MapStore';
import { ThePlayer } from '@/classes/Player.ts';
import { Map } from '@/classes/Map.ts';

export class PlayerAdapter {
    private playerStore = usePlayerStore();
    private mapStore = useMapStore();

    // Перемещение персонажа
    movePlayer(x: number, y: number): void {
        const map = this.mapStore.currentMap;
        const player = this.playerStore.player;
        const result = player.moveTo(x, y, map);
        // if (result) {
            // if (result.item) this.inventoryStore.addItem(result.item);
            // if (result.newLocation) this.handleLocationChange(result.newLocation);
        // }
        this.setPlayer(player);
    }

    // Обработка нажатий клавиш
    handleKey(event: KeyboardEvent): void {
        const map = this.mapStore.currentMap;
        const player = this.playerStore.player;
        const result = player.handleKey(event, map);
        // if (result) {
            // if (result.item) this.inventoryStore.addItem(result.item);
            // if (result.newLocation) this.handleLocationChange(result.newLocation);
        // }
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
    // private handleLocationChange(locationId: string): void {
    //     console.log(`Переход в ${locationId}`);
    //     // Здесь можно будет загрузить новую карту и обновить mapStore
    // }
}