// src/stores/playerStore.ts
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import { ThePlayer } from '@/classes/Player.ts';
import { useMapStore } from './MapStore';

export const usePlayerStore = defineStore('player', () => {
    const mapStore = useMapStore();
    const player = ref<ThePlayer>(new ThePlayer({ position: mapStore.getCurrentMap.startPosition }));

    const getPlayer = computed(() => player.value)

    const setPlayer = (newPlayer: ThePlayer)=>{
        player.value = newPlayer;
    }


    return {
        getPlayer,
        setPlayer,
    };
});