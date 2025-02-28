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
          @click="moveTo(x, y)"
      ></div>
    </template>
    <Player :position="playerPosition" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { forest1 } from "@/locations/forest_1.ts";
import type {TileOptions} from "@/typespaces/types/Tile.ts";
import type {Positions} from "@/typespaces/types/Positions.ts";
import Player from "@/components/Player.vue";
// import { useGameStore } from '@/stores/game';

// const game = useGameStore();
const map = ref(forest1); // Просто присваиваем объект карты
const playerPosition = ref<Positions>(map.value.objects.startPosition);
const processedTiles = ref(map.value.tiles);


// Стили сетки
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${map.value.width}, 80px)`,
  gridTemplateRows: `repeat(${map.value.height}, 80px)`,
  gap: '0',
}));

// Логика перемещения и взаимодействия остается почти такой же
function moveTo(x: number, y: number) {
  if (isValidMove(x, y)) {
    playerPosition.value = { x, y};
    interactWithTile(x, y);
  }
}

function isValidMove(x: number, y: number) {
  // const tile = map.value.tiles[y][x];

  const rezX =  x - playerPosition.value.x
  const rezY =  y - playerPosition.value.y
  return (
      x >= 0 &&
      x < map.value.width &&
      y >= 0 &&
      y < map.value.height &&
      (rezX === 1 || rezX === -1 || rezX === 0) &&
      (rezY === 1 || rezY === -1 || rezY === 0)
      // && !(tile instanceof Tile && tile.type === 'tree')
  );
}

function interactWithTile(x: number, y: number) {
  const tile = map.value.tiles[y][x];
  // if (tile instanceof Door) {
  //   game.loadLocation(tile.to);
  //   // Здесь можно динамически импортировать новую локацию
  // } else
  //
  // if (tile instanceof Treasure) {
  //   // game.pickupItem(tile.item);
  //   map.value.tiles[y][x] = new Tile(); // Заменяем тайл
  // } else if (tile instanceof Monster) {
  //   fightMonster(tile, x, y);
  // }
}

// function fightMonster(monster, x, y) {
//   monster.takeDamage(game.player.attack);
//   if (monster.hp <= 0) {
//     const loot = monster.die();
//     if (loot) game.pickupItem(loot);
//     map.value.tiles[y][x] = new Tile();
//   }
// }
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