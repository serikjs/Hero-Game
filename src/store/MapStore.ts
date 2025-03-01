// src/stores/mapStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Map } from '@/classes/Map.ts';
import { forest1 } from '@/locations/forest_1';

export const useMapStore = defineStore('map', () => {
    const currentMap = ref<Map>(forest1);

    // Только геттеры и сеттеры, без логики
    function setMap(map: Map) {
        currentMap.value = map;
    }

    return {
        currentMap,
        setMap,
    };
});