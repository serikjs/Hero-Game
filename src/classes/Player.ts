import type {Positions} from "@/typespaces/types/Positions.ts";
import type {PlayerOptions} from "@/typespaces/types/Player.ts";
import {Map} from "@/classes/Map.ts";

export class ThePlayer {
    public position: Positions;
    public attack: number;
    public hp: number;

    constructor({position, attack = 10, hp = 100}: PlayerOptions) {
        this.position = position;
        this.attack = attack;
        this.hp = hp;
    }

    // Проверка валидности хода
    public canMoveTo(x: number, y: number, map: Map): boolean {
        const rezX =  x - this.position.x
        const rezY =  y - this.position.y
        return (
            map.isPassable(x,y) &&
            Math.abs(rezX) <= 1 &&
            Math.abs(rezY) <= 1
        );
    }

    // Перемещение персонажа
    public moveTo(x: number, y: number, map: Map): { item?: string; newLocation?: string } | null {
        if (this.canMoveTo(x, y, map)) {
            this.position = { x, y };
            return this.interactWithTile(x, y, map);
        }
        return null;
    }

    public handleKey(event: KeyboardEvent, map: Map): { item?: string; newLocation?: string } | null {
        const { x, y } = this.position;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                return this.moveTo(x, y - 1, map);
            case 'ArrowDown':
            case 's':
                return this.moveTo(x, y + 1, map);
            case 'ArrowLeft':
            case 'a':
                return this.moveTo(x - 1, y, map);
            case 'ArrowRight':
            case 'd':
                return this.moveTo(x + 1, y, map);
            default:
                return null;
        }
    }

    // Взаимодействие с тайлом
    public interactWithTile(x: number, y: number, map: Map): { item?: string; newLocation?: string } | null {
        const tile = map.getTile(x, y);
        if (tile && tile.canInteract()) {
            // if (tile instanceof Treasure) {
            //     console.log(`Подобрано: ${tile.item}`);
            //     map.tiles[y][x] = new Tile(); // Убираем сокровище
            // } else if (tile instanceof Door) {
            //     console.log(`Переход в ${tile.to}`);
            //     // Логика перехода на новую локацию может быть добавлена позже
            // }
        }
        return null
    }

    // function fightMonster(monster, x, y) {
    //   monster.takeDamage(game.player.attack);
    //   if (monster.hp <= 0) {
    //     const loot = monster.die();
    //     if (loot) game.pickupItem(loot);
    //     map.value.tiles[y][x] = new Tile();
    //   }
    // }
}