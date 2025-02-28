<template>
  <div class="game-screen">
    <GameMap/>
  </div>

</template>

<script setup lang="ts">

import GameMap from "@/components/GameMap.vue";
</script>

<style scoped>
.game-screen{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
