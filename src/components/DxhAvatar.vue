<template>
  <div
    :style="{ width: `${width}px`, height: `${height}px` }"
    :class="[{ 'rounded-full': rounded }]"
    class="inline-block overflow-hidden shadow-lg bg-gray-200 object-cover"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  height: number
  width: number
  rounded?: boolean
}>()
</script>
