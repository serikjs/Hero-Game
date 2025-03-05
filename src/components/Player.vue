<template>
  <div class="player" :style="playerStyle">
  </div>
</template>

<script setup lang="ts">
import type {Positions, Size} from "@/typespaces/types/Positions.ts";
import {computed, type CSSProperties} from "vue";
import {TileSize} from "@/classes/Tile.ts";
import playerImage from '@/assets/player.png';

const props = defineProps<{ position: Positions }>();

const playerSize: Size = {
  width: 50,
  height: 65
}

const playerStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  width: `${playerSize.width}px`,
  height: `${playerSize.height}px`,
  backgroundImage: `url(${playerImage})`,
  backgroundSize: `${playerSize.width}px ${playerSize.height}px`,
  backgroundPosition: '0 0',

  left: `${props.position.x * TileSize.width + TileSize.width/2 - playerSize.width/2}px`,
  top: `${props.position.y * TileSize.height + TileSize.height/2 - playerSize.height/2}px`,
  transition: 'all 0.2s ease',
}));
</script>

<style scoped>
</style>