<template>
  <main>Vue-Tailwind</main>
  <div class="mx-20">
    <DFileInput v-model="file" clearable>
      <template #clear-icon></template>
    </DFileInput>
    <p>Selected File: {{ file ? file.name : 'None' }}</p>
  </div>
</template>

<script setup>
import DFileInput from './components/DFileInput.vue'
import { ref } from 'vue';

const file = ref(null);
</script>
