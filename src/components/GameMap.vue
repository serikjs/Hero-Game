<template>
  <div class="map" :style="gridStyle">
    <template
        v-for="(row, y) in processedTiles"
        :key="y"
    >
      <div
          v-for="(tile, x) in row"
          :key="`tile-${x}-${y}`"
          class="tile"
          :style="{ backgroundImage: `url(${tile.getDisplayData().backgroundImage})` }"
          @click="player.moveTo(x, y, map)"
      >
        <img
            v-if="tile.getDisplayData().icon"
            :src="tile.getDisplayData().icon"
            class="icon"
            alt="icon"
        />
      </div>
    </template>
    <Player :position="player.position" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { forest1 } from "@/locations/forest_1.ts";
import Player from "@/components/Player.vue";
import {ThePlayer} from "@/classes/Player.ts";
import {TileSize} from "@/classes/Tile.ts";

// import { useGameStore } from '@/stores/game';

// const game = useGameStore();
const map = ref(forest1);
const processedTiles = ref(map.value.tiles);

const player = ref(new ThePlayer({ position: map.value.objects.startPosition }));

// Стили сетки
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${map.value.width}, ${TileSize.width}px)`,
  gridTemplateRows: `repeat(${map.value.height}, ${TileSize.height}px)`,
  gap: '0',
}));

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