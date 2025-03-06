import { usePlayerStore } from '@/store/PlayerStore';
import { useMapStore } from '@/store/MapStore';
import { ThePlayer } from '@/classes/Player.ts';
import { Map } from '@/classes/Map.ts';
import {Tile} from "@/classes/Tile.ts";
import {FightAdapter} from "@/adapters/fightAdapter.ts";
import {useFightStore} from "@/store/fightStore.ts";

export class PlayerAdapter {
    private playerStore = usePlayerStore();
    private mapStore = useMapStore();
    private fightStore = useFightStore();
    private fightModal: any = null;

    // Инициализация сервиса с модалкой
    initialize(fightModal: any) {
        this.fightModal = fightModal;
        this.startKeyListener();
    }

    // Получение персонажа
    getPlayer(): ThePlayer {
        return this.playerStore.getPlayer;
    }

    // Обновление персонажа
    setPlayer(player: ThePlayer): void {
        this.playerStore.setPlayer(player);
    }



    async movePlayer(x: number, y: number): Promise<void> {
        if (!this.fightStore.getIsFighting) {
            const map = this.mapStore.getCurrentMap;
            const player = this.playerStore.getPlayer;
            const result = player.moveTo(x, y, map);

            if (result) {
                if (result.newLocation) await this.handleLocationChange(result.newLocation);
                // if (result.item) this.inventoryStore.addItem(result.item);
                if(result.monster && result.monster.hp > 0){
                    const fightAdapter = new FightAdapter(player, result.monster);
                    this.fightStore.startFight(result.monster);
                    const fightResult = await fightAdapter.startFight(this.fightModal);
                    if (fightResult.winner === 'player') {
                        // if (fightResult.loot) this.inventoryStore.addItem(fightResult.loot);
                        map.setTile(x, y, new Tile());
                        this.fightStore.setFightResult('Монстр побеждён!');
                    }else {
                        this.fightStore.setFightResult('Вы проиграли!');
                    }
                }
            }
            this.setPlayer(player);
        }
    }

    // Обработка клавиш
    private async handleKey(event: KeyboardEvent): Promise<void> {
        if (!this.fightStore.getIsFighting) {
            const player = this.playerStore.getPlayer;
            const { x, y } = player.position;
            let newX = x;
            let newY = y;

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    newY = y - 1;
                    break;
                case 'ArrowDown':
                case 's':
                    newY = y + 1;
                    break;
                case 'ArrowLeft':
                case 'a':
                    newX = x - 1;
                    break;
                case 'ArrowRight':
                case 'd':
                    newX = x + 1;
                    break;
                default:
                    return;
            }

            await this.movePlayer(newX, newY);
        }
    }

    // Запуск слушателя клавиш
    private startKeyListener() {
        const handleKeyBound = (event: KeyboardEvent) => this.handleKey(event);
        window.addEventListener('keydown', handleKeyBound);
        return () => window.removeEventListener('keydown', handleKeyBound);
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
                const player = this.playerStore.getPlayer;
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