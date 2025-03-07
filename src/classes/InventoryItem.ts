// Базовый класс для всех предметов
import type {InventoryItemType} from "@/typespaces/types/ItemInventory.ts";


export abstract class InventoryItem {
    public id: string;
    public name: string;
    public type: string;
    public quantity: number;

    protected constructor({ id, name, type, quantity = 1 }: InventoryItemType) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
    }

    // Метод использования предмета (переопределяется в подклассах)
    // public use(player: Person): void {
    //     console.log(`${this.name} не имеет действия.`);
    // }
}

// Оружие (добавляет урон)
export class Weapon extends InventoryItem {
    public damageBonus: number;

    constructor({ id, name, damageBonus }: { id: string; name: string; damageBonus: number }) {
        super({ id, name, type: 'weapon' });
        this.damageBonus = damageBonus;
    }

    // public use(player: Person): void {
    //     console.log(`${player} экипировал ${this.name}, увеличив урон на ${this.damageBonus}.`);
    //     // Здесь можно добавить логику экипировки, если нужно
    // }
}

// Броня (добавляет здоровье)
export class Armor extends InventoryItem {
    public healthBonus: number;

    constructor({ id, name, healthBonus }: { id: string; name: string; healthBonus: number }) {
        super({ id, name, type: 'armor' });
        this.healthBonus = healthBonus;
    }

    // public use(player: Person): void {
    //     player.hp += this.healthBonus;
    //     console.log(`${player} экипировал ${this.name}, увеличив здоровье на ${this.healthBonus}.`);
    // }
}