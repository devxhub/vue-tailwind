<template>
  <main>Vue-Tailwind</main>
  <div class="mx-20">
    <DFileInput v-model="file" @enter="console.log('enter')" @blur="console.log('blur')" clearable>
      <template #clear-icon></template>
    </DFileInput>
    <pre>{{ file?.size }}</pre>
  </div>
</template>

<script setup>
import DFileInput from './components/DFileInput.vue'
import { ref } from 'vue'

const file = ref(null)
</script>
