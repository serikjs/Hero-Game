// src/stores/inventoryStore.ts
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import type {InventoryItem} from "@/classes/InventoryItem.ts";

export const useInventoryStore = defineStore('inventory', () => {
    const items = ref<InventoryItem[]>([]);

    const getItems = computed(() => items.value)

    // Добавление предмета в инвентарь
    function addItem(item: InventoryItem) {
        const existingItem = items.value.find(i => i.id === item.id && i.type === item.type);
        if (existingItem && item.quantity !== undefined) {
            existingItem.quantity = (existingItem.quantity || 0) + (item.quantity || 1);
        } else {
            items.value.push(item);
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