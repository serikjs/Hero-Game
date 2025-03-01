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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted} from 'vue';
import Player from "@/components/Player.vue";
import {TileSize} from "@/classes/Tile.ts";
import {PlayerAdapter} from "@/adapters/playerAdapter.ts";
import {MapAdapter} from "@/adapters/mapAdapter.ts";

// import { useGameStore } from '@/stores/game';

// const game = useGameStore();
const mapService = new MapAdapter();
const playerService = new PlayerAdapter();

// Стили сетки
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${mapService.getMap().width}, ${TileSize.width}px)`,
  gridTemplateRows: `repeat(${mapService.getMap().height}, ${TileSize.height}px)`,
  gap: '0',
}));

function handleKey(event: KeyboardEvent) {
  playerService.handleKey(event);
}

onMounted(() => window.addEventListener('keydown', handleKey));
onUnmounted(() => window.removeEventListener('keydown', handleKey));

</script>

<style>
.map{
  position: relative;
}
.tile {
  border: 1px solid black;
  background-size: cover;
}
</style>