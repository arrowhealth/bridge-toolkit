<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core'
import Boundaries from './components/Boundaries.vue';
import Controls from './components/Controls.vue';
import AppBar from './components/AppBar.vue';

const showBoundaries = useLocalStorage('emulator:show_boundaries', true)
</script>

<template>
  <AppBar v-model="showBoundaries" />
  <Boundaries v-if="showBoundaries" />
  <Controls />
</template>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
