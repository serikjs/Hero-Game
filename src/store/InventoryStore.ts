// src/stores/inventoryStore.ts
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import type {Item} from "@/typespaces/types/ItemInventory.ts";

export const useInventoryStore = defineStore('inventory', () => {
    const items = ref<Item[]>([]);

    const getItems = computed(() => items.value)

    // Добавление предмета в инвентарь
    const addItem = (item: Item)=>{
        const existingItem = items.value.find(i => i.id === item.id && i.type === item.type);
        if (existingItem && item.quantity !== undefined) {
            // Если предмет стековый, увеличиваем количество
            existingItem.quantity = (existingItem.quantity || 0) + (item.quantity || 1);
        } else {
            // Добавляем новый предмет
            items.value.push({ ...item, quantity: item.quantity || 1 });
        }
    }
    // Удаление предмета из инвентаря
    const removeItem = (itemId: string, quantity: number = 1)=>{
        const index = items.value.findIndex(i => i.id === itemId);
        if (index !== -1) {
            const item = items.value[index];
            if (item.quantity && item.quantity > quantity) {
                item.quantity -= quantity;
            } else {
                items.value.splice(index, 1);
            }
        }
    }
    // Очистка инвентаря
    const clearInventory = ()=>{
        items.value = [];
    }

    return {
        addItem,
        removeItem,
        getItems,
        clearInventory,
    };
});