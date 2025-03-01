// src/stores/playerStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ThePlayer } from '@/classes/Player.ts';
import { useMapStore } from './MapStore';

export const usePlayerStore = defineStore('player', () => {
    const mapStore = useMapStore();
    const player = ref<ThePlayer>(new ThePlayer({ position: mapStore.currentMap.startPosition }));

    // Только обновление состояния
    function setPlayer(newPlayer: ThePlayer) {
        player.value = newPlayer;
    }

    return {
        player,
        setPlayer,
    };
});