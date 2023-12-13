<template>
  <div class="flex items-center">
    <Button @click="handleButtonClick">Click me</Button>
    <Button class="w-20" :loading="true">Loading</Button>
    <Button :disabled="true">Disabled Button</Button>

    <Button href="https://example.com" target="_blank">Visit Example</Button>
    <Button href="https://example.com" target="_blank" :loading="true">Loading Link</Button>
    <Button href="https://example.com" target="_blank" :disabled="true">Disabled Link</Button>
  </div>
</template>

<script setup lang="ts">
import Button from './components/DxhButton.vue';

const handleButtonClick = () => {
  console.log('Button clicked!');
};
</script>
