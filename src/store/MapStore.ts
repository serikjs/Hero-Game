// src/stores/mapStore.ts
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import { Map } from '@/classes/Map.ts';
import { forest1 } from '@/locations/forest_1';

export const useMapStore = defineStore('map', () => {
    const currentMap = ref<Map>(forest1);

    const getCurrentMap = computed(() => currentMap.value)

    const setMap = (map: Map)=>{
        currentMap.value = map;
    }

    return {
        getCurrentMap,
        setMap,
    };
});