<template>
  <div class="map" :style="gridStyle">
    <template
        v-for="(row, y) in mapAdapter.getMap().tiles"
        :key="y"
    >
      <div
          v-for="(tile, x) in row"
          :key="`tile-${x}-${y}`"
          class="tile"
          :style="{ backgroundImage: `url(${tile.getDisplayData().backgroundImage})` }"
          @click="playerAdapter.movePlayer(x, y)"
      >
        <img
            v-if="tile.getDisplayData().icon"
            :src="tile.getDisplayData().icon"
            class="icon"
            alt="icon"
        />
      </div>
    </template>
    <Player :position="playerAdapter.getPlayer().position"/>
    <FightModal
        :is-visible="fightStore.getIsFighting"
        :player-hp="playerAdapter.getPlayer().hp"
        :monster-hp="fightStore.currentMonsterHp"
        :monster-icon="fightStore.currentMonsterIcon"
        @close="fightStore.endFight()"
        ref="fightModal"
    />
    <button class="inventory-button" @click="isInventoryOpen = true">Инвентарь</button>
    <InventoryModal
        :is-visible="isInventoryOpen"
        :player="playerAdapter.getPlayer()"
        @close="isInventoryOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import Player from "@/components/Player.vue";
import {TileSize} from "@/classes/Tile.ts";
import {PlayerAdapter} from "@/adapters/playerAdapter.ts";
import {MapAdapter} from "@/adapters/mapAdapter.ts";
import FightModal from "@/components/FightModal.vue";
import {useFightStore} from "@/store/FightStore.ts";
import InventoryModal from "@/components/InventoryModal.vue";

const mapAdapter = new MapAdapter();
const playerAdapter = new PlayerAdapter();
const fightStore = useFightStore();
const fightModal = ref<InstanceType<typeof FightModal> | null>(null);
const isInventoryOpen = ref(false);

// Стили сетки
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${mapAdapter.getMap().width}, ${TileSize.width}px)`,
  gridTemplateRows: `repeat(${mapAdapter.getMap().height}, ${TileSize.height}px)`,
  gap: '0',
}));


onMounted(() => {
  playerAdapter.initialize(fightModal.value);
});
</script>

<style>
.map{
  position: relative;
}
.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-size: cover;
}

</style>