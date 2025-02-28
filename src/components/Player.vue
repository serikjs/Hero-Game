

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
  height: '50px',
  backgroundColor: 'blue',
  left: `${props.position.x * 50}px`,
  top: `${props.position.y * 50}px`,
  transition: 'all 0.2s ease',
}));
</script>

<style scoped>
</style>