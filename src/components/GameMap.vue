<template>
  <div class="map" :style="gridStyle">
    <template
        v-for="(row, y) in mapService.getMap().tiles"
        :key="y"
    >
      <div
          v-for="(tile, x) in row"
          :key="`tile-${x}-${y}`"
          class="tile"
          :style="{ backgroundImage: `url(${tile.getDisplayData().backgroundImage})` }"
          @click="playerService.movePlayer(x, y)"
      >
        <img
            v-if="tile.getDisplayData().icon"
            :src="tile.getDisplayData().icon"
            class="icon"
            alt="icon"
        />
      </div>
    </template>
    <Player :position="playerService.getPlayer().position"/>
    <FightModal
        :is-visible="fightStore.getIsFighting()"
        :player-hp="playerService.getPlayer().hp"
        :monster-hp="fightStore.currentMonsterHp()"
        :monster-icon="fightStore.currentMonsterIcon()"
        @close="fightStore.endFight(fightStore.getFightResult()!)"
        ref="fightModal"
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
import {useFightStore} from "@/store/fightStore.ts";

// import { useGameStore } from '@/stores/game';

// const game = useGameStore();
const mapService = new MapAdapter();
const playerService = new PlayerAdapter();
const fightStore = useFightStore();
const fightModal = ref<InstanceType<typeof FightModal> | null>(null);

// Стили сетки
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${mapService.getMap().width}, ${TileSize.width}px)`,
  gridTemplateRows: `repeat(${mapService.getMap().height}, ${TileSize.height}px)`,
  gap: '0',
}));


onMounted(() => {
  playerService.initialize(fightModal.value);
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