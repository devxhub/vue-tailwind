<template>
  <main>Vue-Tailwind</main>
  <div class="mx-20">
    <DTextInput v-model="file" @enter="console.log('enter')" @blur="console.log('blur')" clearable>
      <template #clear-icon></template>
    </DTextInput>
    <pre>{{ file?.size }}</pre>
  </div>
</template>

<script setup>
import DTextInput from './components/DTextInput.vue'
import { ref } from 'vue'

const file = ref(null)
</script>
