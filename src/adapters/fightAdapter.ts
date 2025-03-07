import { ThePlayer } from '@/classes/Player.ts';

import { Monster } from '@/classes/Monster.ts';
import type {InventoryItem} from "@/classes/InventoryItem.ts";
import {useFightStore} from "@/store/FightStore.ts";

export class FightAdapter {
    private player: ThePlayer;
    private monster: Monster;
    private resolveFight: ((result: { winner: 'player' | 'monster'; loot?: InventoryItem }) => void) | null = null;
    private fightStore = useFightStore();

    constructor(player: ThePlayer, monster: Monster) {
        this.player = player;
        this.monster = monster;
    }

    // Запуск боя
    async startFight(modal: any): Promise<{ winner: 'player' | 'monster'; loot?: InventoryItem }> {
        return new Promise((resolve) => {
            this.resolveFight = resolve;

            setTimeout(() => this.fightLoop(modal), 1000);
        });
    }

    // Пошаговая атака
    async fightLoop(modal: any): Promise<void> {
        while (this.player.hp > 0 && this.monster.hp > 0) {
            // Игрок бьёт монстра
            const playerDamage = this.player.dealDamage();
            modal.triggerMonsterHit();
            const loot = this.monster.takeDamage(playerDamage);
            await new Promise((r) => setTimeout(r, 500)); // Задержка для анимации


            if (this.monster.die().isDie) {
                this.fightStore.setFightResult('Монстр побеждён!');
                if(loot?.loot){
                    this.resolveFight?.({ winner: 'player', loot: loot.loot });
                }else{
                    this.resolveFight?.({ winner: 'player' });
                }

                return;
            }

            // Монстр бьёт игрока
            const monsterDamage = this.monster.dealDamage();
            modal.triggerPlayerHit();
            this.player.takeDamage(monsterDamage);
            await new Promise((r) => setTimeout(r, 500)); // Задержка для анимации

            if (this.player.die()) {
                this.fightStore.setFightResult('Вы проиграли!');
                this.resolveFight?.({ winner: 'monster' });
                return;
            }
        }

    }

    // Завершение боя
    endFight(): void {
        this.resolveFight = null;
    }
}