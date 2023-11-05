<script setup lang="ts">
import DButton from '@/components/DButton.vue'

const handleClick = () => {
  console.log('clicked');
}
</script>

<template>
  <main>
    <DButton color="blue" size="md" @click="handleClick">Click Me</DButton>
  </main>
</template>

<style scoped>

</style>
