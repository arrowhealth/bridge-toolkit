<script setup lang="ts">
const ver = import.meta.env.EMULATOR_VERSION
const props = defineProps({
  modelValue: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center justify-between bg-teal-600 text-white px-4 py-2 ">
    <div class="text-lg">Bridge Emulator {{ ver }}</div>
    <button v-if="modelValue" class="border  px-3  py-1 border-white rounded-lg text-sm font-medium" @click="$emit('update:modelValue', false)">Hide Boundaries</button>
    <button v-else class="border  px-3  py-1 border-white rounded-lg text-sm font-medium" @click="$emit('update:modelValue', true)">Show Boundaries</button>
  </div>
</template>
