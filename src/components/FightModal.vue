<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="fight-modal">
      <h2>Бой</h2>
      <div class="fight-container">
        <div class="fighter player" :class="{ 'hit': playerHit }">
          <img src="@/assets/player.png" alt="Player" />
          <p>HP: {{ playerHp }}</p>
        </div>
        <div class="fighter monster" :class="{ 'hit': monsterHit }">
          <img :src="monsterIcon" alt="Monster" />
          <p>HP: {{ monsterHp }}</p>
        </div>
      </div>
      <p v-if="fightResult">{{ fightResult }}</p>
      <button v-if="fightResult" @click="close">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineProps<{
  isVisible: boolean;
  playerHp: number;
  monsterHp: number;
  monsterIcon: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const playerHit = ref(false);
const monsterHit = ref(false);
const fightResult = ref<string | null>(null);

// Анимация удара
watch(playerHit, (newVal) => {
  if (newVal) setTimeout(() => {playerHit.value = false}, 500);
});
watch(monsterHit, (newVal) => {
  if (newVal) setTimeout(() => {monsterHit.value = false}, 500);
});

function setResult(result: string) {
  fightResult.value = result;
}

function close() {
  emit('close');
}

defineExpose({
  setResult,
  triggerPlayerHit: () => (playerHit.value = true),
  triggerMonsterHit: () => (monsterHit.value = true),
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.fight-modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
}

.fight-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.fighter {
  width: 150px;
}

.fighter img {
  width: 100px;
  height: 100px;
}

.hit {
  animation: hit 0.3s ease;
}

@keyframes hit {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>