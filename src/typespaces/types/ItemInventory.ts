// src/game/types.ts
export interface InventoryItemType {
    id: string;       // Уникальный идентификатор предмета
    name: string;     // Название предмета
    type: string;     // Тип предмета (weapon, armor, potion, currency и т.д.)
    quantity?: number; // Количество (для стековых предметов, опционально)
}