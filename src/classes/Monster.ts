import type {MonsterOptions} from "@/typespaces/types/Monster.ts";
import {Tile} from "@/classes/Tile.ts";
import type {DisplayData} from "@/typespaces/types/Tile.ts";
import type {InventoryItem} from "@/classes/InventoryItem.ts";

export abstract class Monster extends Tile {
    public monsterType: string;
    public hp: number;
    public attack: number;
    protected lootTable: { item: InventoryItem; chance: number }[];

    protected constructor({ type = 'generic', hp = 10, attack = 5, lootTable = [] }: MonsterOptions = {}) {
        super({ type: 'grass', passable: true, description: `Монстр: ${type}` }); // Монстры стоят на траве
        this.monsterType = type;
        this.hp = hp;
        this.attack = attack;
        this.lootTable = lootTable;
    }

    public takeDamage(damage: number): {isDie:boolean, loot: InventoryItem | null} | null{
        this.hp -= damage;
        if (this.hp <= 0) return this.die();
        return null;
    }

    // Нанести урон
    public dealDamage(): number {
        return this.attack;
    }

    public die(): {isDie:boolean, loot: InventoryItem | null} {
        let loot: InventoryItem | null = null;
        if(this.hp <= 0){
            const roll = Math.random();
            let cumulativeChance = 0;

            for (const { item, chance } of this.lootTable) {
                cumulativeChance += chance;
                if (roll <= cumulativeChance) {
                    loot = item;
                }
            }
        }

        return {
            isDie: this.hp <= 0,
            loot: loot,
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