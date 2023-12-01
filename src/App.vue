<template>
  <main>Vue-Tailwind</main>

  <DButton class="w-40" :loading="false" @click="console.log('button')" href="/dd" target="_blank">
    click me</DButton
  >
</template>

<script setup lang="ts">
import DButton from './components/DButton.vue'
</script>
