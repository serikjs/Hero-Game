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
    public moveTo(x: number, y: number, map: Map): void {
        if (this.canMoveTo(x, y, map)) {
            this.position = { x, y };
            this.interactWithTile(x, y, map);
        }
    }

    public handleKey(event: KeyboardEvent, map: Map): void {
        const { x, y } = this.position;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.moveTo(x, y - 1, map);
                break;
            case 'ArrowDown':
            case 's':
                this.moveTo(x, y + 1, map);
                break;
            case 'ArrowLeft':
            case 'a':
                this.moveTo(x - 1, y, map);
                break;
            case 'ArrowRight':
            case 'd':
                this.moveTo(x + 1, y, map);
                break;
        }
    }

    // Взаимодействие с тайлом
    public interactWithTile(x: number, y: number, map: Map): void {
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