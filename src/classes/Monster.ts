import type {MonsterOptions} from "@/typespaces/types/Monster.ts";
import {Tile} from "@/classes/Tile.ts";
import type {DisplayData} from "@/typespaces/types/Tile.ts";

export abstract class Monster extends Tile {
    public monsterType: string;
    public hp: number;
    public attack: number;
    public loot: string | null;

    protected constructor({ type = 'generic', hp = 10, attack = 5, loot = null }: MonsterOptions = {}) {
        super({ type: 'grass', passable: true, description: `Монстр: ${type}` }); // Монстры стоят на траве
        this.monsterType = type;
        this.hp = hp;
        this.attack = attack;
        this.loot = loot;
    }

    public takeDamage(damage: number): {isDie:boolean, loot: string | null} | null{
        this.hp -= damage;
        if (this.hp <= 0) return this.die();
        return null;
    }

    // Нанести урон
    public dealDamage(): number {
        return this.attack;
    }

    public die(): {isDie:boolean, loot: string | null} {
        return {
            isDie: this.hp <= 0,
            loot: this.loot,
        }
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