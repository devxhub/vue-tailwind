<template>
  <!-- <main class="flex justify-center items-center h-screen w-full">
    <p class="text-5xl italic"><span class="text-red-600">Devxhub</span> component library</p>
  </main> -->
  <DInput v-model="text" :placeholder="'test'" type="email" class="mx-32 mt-6" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DInput from './components/DInput.vue'
const text = ref('')
</script>
