import type {Positions} from "@/typespaces/types/Positions.ts";
import type {PlayerOptions} from "@/typespaces/types/Player.ts";
import type {Tile} from "@/classes/Tile.ts";

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
    public canMoveTo(x: number, y: number, map: { width: number; height: number; tiles: Tile[][] }): boolean {
        const tile = map.tiles[y][x];

        const rezX =  x - this.position.x
        const rezY =  y - this.position.y
        return (
            x >= 0 &&
            x < map.width &&
            y >= 0 &&
            y < map.height &&
            tile.passable &&
            Math.abs(rezX) <= 1 &&
            Math.abs(rezY) <= 1
        );
    }

    // Перемещение персонажа
    public moveTo(x: number, y: number, map: { width: number; height: number; tiles: Tile[][] }): void {
        if (this.canMoveTo(x, y, map)) {
            this.position = { x, y };
            this.interactWithTile(x, y, map);
        }
    }

    // Взаимодействие с тайлом
    public interactWithTile(x: number, y: number, map: { tiles: Tile[][] }): void {
        const tile = map.tiles[y][x];
        if (tile.canInteract()) {
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