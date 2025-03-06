// src/stores/fightStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Monster } from '@/classes/Monster.ts';

export const useFightStore = defineStore('fight', () => {
    const isFighting = ref(false);
    const currentMonster = ref<Monster | null>(null);
    const fightResult = ref<string | null>(null);

    function startFight(monster: Monster) {
        isFighting.value = true;
        currentMonster.value = monster;
        fightResult.value = null;
    }

    function setFightResult(result: string) {
        fightResult.value = result;
    }

    function endFight(result: string) {
        fightResult.value = result;
        isFighting.value = false;
        currentMonster.value = null;
    }

    function getIsFighting(): boolean {
        return isFighting.value;
    }

    function getCurrentMonster(): Monster | null {
        return currentMonster.value;
    }

    function currentMonsterHp(): number{
        return getCurrentMonster()?.hp || 0;
    }
    function currentMonsterIcon(): string{
        return getCurrentMonster()?.getDisplayData().icon || '';
    }


    function getFightResult(): string | null {
        return fightResult.value;
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