import type {MonsterOptions} from "@/typespaces/types/Monster.ts";
import {Tile} from "@/classes/Tile.ts";
import type {DisplayData} from "@/typespaces/types/Tile.ts";

export abstract class Monster extends Tile {
    public monsterType: string;
    public hp: number;
    public attack: number;
    public loot: string | null;

    constructor({ type = 'generic', hp = 10, attack = 5, loot = null }: MonsterOptions = {}) {
        super({ type: 'grass', passable: true, description: `Монстр: ${type}` }); // Монстры стоят на траве
        this.monsterType = type;
        this.hp = hp;
        this.attack = attack;
        this.loot = loot;
    }

    public takeDamage(damage: number): string | null {
        this.hp -= damage;
        if (this.hp <= 0) return this.die();
        return null;
    }

    public die(): string | null {
        return this.loot;
    }

    public canInteract(): boolean {
        return true;
    }

    public getDisplayData(): DisplayData {
        return {
            backgroundImage: `/assets/tiles/grass.png`,
            icon: `/assets/icons/${this.monsterType}.svg`,
        };
    }
}