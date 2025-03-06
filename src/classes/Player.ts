import type {Positions} from "@/typespaces/types/Positions.ts";
import type {PlayerOptions} from "@/typespaces/types/Player.ts";
import {Map} from "@/classes/Map.ts";
import {Door} from "@/classes/Door.ts";
import {Monster} from "@/classes/Monster.ts";

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
    public moveTo(x: number, y: number, map: Map): { item?: string; newLocation?: string;monster?:Monster  } | null {
        if (this.canMoveTo(x, y, map)) {
            this.position = { x, y };
            return this.interactWithTile(x, y, map);
        }
        return null;
    }

    // Взаимодействие с тайлом
    public interactWithTile(x: number, y: number, map: Map): { item?: string; newLocation?: string;monster?:Monster  } | null {
        const tile = map.getTile(x, y);
        if (tile && tile.canInteract()) {
            if (tile instanceof Door) {
                return { newLocation: tile.to };
            }
            if (tile instanceof Monster) {
                return { monster: tile };
            }
        }
        return null
    }

    // Нанести урон
    public dealDamage(): number {
        return this.attack;
    }


    // Получить урон
    public takeDamage(damage: number): void {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }

    // Смерть
    public die(): boolean {
        return this.hp <= 0;
    }
}