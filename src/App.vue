<template>
  <main>Vue-Tailwind</main>
  <div class="mx-20">
    <DTextarea v-model="file" :resize="false" clearable>
      <template #clear-icon></template>
    </DTextarea>
    <p>{{file}}</p>
  </div>
</template>

<script setup>
import DTextarea from './components/DTextarea.vue'
import { ref } from 'vue'

const file = ref('')
</script>
