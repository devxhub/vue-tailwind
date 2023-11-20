<template>
  <!-- <main class="flex justify-center items-center h-screen w-full">
    <p class="text-5xl italic"><span class="text-red-600">Devxhub</span> component library</p>
  </main> -->
  <div  class="ml-20">
    <DButton size="md" color="white" rounded="0"  variant="outlined" block>BUTTON</DButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DButton from './components/DButton.vue'
</script>
