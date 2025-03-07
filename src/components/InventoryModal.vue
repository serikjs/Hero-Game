<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Инвентарь</h2>
      <div class="inventory-grid">
        <div
            v-for="(item, index) in props.player.getInventory()"
            :key="item.id + '-' + index"
            class="inventory-slot"
            @click="useItem(item)"
        >
          <span>{{ item.name }}</span>
          <span v-if="item.quantity && item.quantity > 1">x{{ item.quantity }}</span>
        </div>
      </div>

      <div class="equipped-items">
        <h3>Экипировка</h3>
        <div class="equipped-slot">
          <span>Оружие: {{ player.equippedWeapon?.name || 'Нет' }}</span>
        </div>
<!--        <div class="equipped-slot">-->
<!--          <span>Броня: {{ player.equippedArmor?.name || 'Нет' }}</span>-->
<!--        </div>-->
      </div>

      <div class="stats">
        <h3>Статы</h3>
        <p>Здоровье: {{ playerStats.hp }} / {{ playerStats.maxHp }}</p>
        <p>Урон: {{ playerStats.attack }}</p>
      </div>

      <button @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { ThePlayer } from '@/classes/Player.ts';
import type {InventoryItem} from "@/classes/InventoryItem.ts";

const props = defineProps<{
  isVisible: boolean;
  player: ThePlayer;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const playerStats = computed(() => props.player.getStats());

function useItem(item: InventoryItem) {
  props.player.useItem(item);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  text-align: center;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.inventory-slot {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  background: #f9f9f9;
}

.inventory-slot:hover {
  background: #e0e0e0;
}

.equipped-items {
  margin-bottom: 20px;
}

.equipped-slot {
  border: 1px solid #aaa;
  padding: 5px;
  margin: 5px 0;
}

.stats {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>