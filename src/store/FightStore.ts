// src/stores/FightStore.ts
import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import { Monster } from '@/classes/Monster.ts';

export const useFightStore = defineStore('fight', () => {
    const isFighting = ref(false);
    const currentMonster = ref<Monster | null>(null);
    const fightResult = ref<string | null>(null);

    const getIsFighting = computed(() => isFighting.value)
    const getCurrentMonster = computed(() => currentMonster.value)
    const currentMonsterHp = computed(() => getCurrentMonster.value?.hp || 0)
    const currentMonsterIcon = computed(() => getCurrentMonster.value?.getDisplayData().icon || '')
    const getFightResult = computed(() => fightResult.value)


    const startFight = (monster: Monster)=>{
        isFighting.value = true;
        currentMonster.value = monster;
        fightResult.value = null;
    }

    const setFightResult = (result: string)=>{
        fightResult.value = result;
    }

    const endFight = ()=>{
        isFighting.value = false;
        currentMonster.value = null;
    }

    return {
        startFight,
        setFightResult,
        endFight,
        getIsFighting,
        getCurrentMonster,
        currentMonsterHp,
        currentMonsterIcon,
        getFightResult,
    };
});