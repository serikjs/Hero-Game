

<template>
<div class="player" :style="playerStyle">
</div>
</template>

<script setup lang="ts">
import type {Positions} from "@/typespaces/types/Positions.ts";
import {computed, type CSSProperties} from "vue";

const props  = defineProps<{ position: Positions }>();

const playerStyle = computed<CSSProperties>(() => ({
  position: 'absolute',
  width: '50px',
  height: '65px',
  backgroundImage: 'url(/Idle.png)',
  backgroundSize: '50px 65px',
  backgroundPosition: '0 0',

  left: `${props.position.x * 80}px`,
  top: `${props.position.y * 80}px`,
  transition: 'all 0.2s ease',
}));
</script>

<style scoped>
</style>