<template>
  <main>Vue-Tailwind</main>
  <div class="mx-20">
    <DFileInput v-model="file" multiple clearable>
      <template #clear-icon></template>
    </DFileInput>
    <div v-for="fil of file">
      <p>{{ fil.name }}</p>
    </div>
  </div>
</template>

<script setup>
import DFileInput from './components/DFileInput.vue'
import { ref } from 'vue'

const file = ref(null)
</script>
