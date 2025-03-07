import {Monster} from "@/classes/Monster.ts";
import type {MonsterOptions} from "@/typespaces/types/Monster.ts";
import type {DisplayData} from "@/typespaces/types/Tile.ts";
import {tileImages} from "@/classes/Tile.ts";
import blueSlimeImg from '@/assets/slimes/blue/Idle.png';

export class Slime extends Monster {
    constructor(options: MonsterOptions = {}) {
        super({
            type: 'goblin',
            hp: options.hp ?? 10,
            attack: options.attack ?? 5,
            lootTable: options.lootTable ?? [],
        });
    }
}

export class SlimeBlue extends Slime {
    constructor(options: MonsterOptions = {}) {
        super({
            hp: options.hp ?? 15, // Больше здоровья
            attack: options.attack ?? 8, // Сильнее атака
            lootTable: options.lootTable ?? [],
        });
    }

    // Можно переопределить методы, если нужно
    public getDisplayData(): DisplayData {
        return {
            backgroundImage: tileImages['grass'],
            icon: blueSlimeImg,
        };
    }
}