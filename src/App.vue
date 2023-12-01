<template>
  <main>Vue-Tailwind</main>

  <DButton class="w-40" loading="true" @click="console.log('button')" > click me</DButton>
</template>

<script setup lang="ts">
import DButton from './components/DButton.vue'
</script>
