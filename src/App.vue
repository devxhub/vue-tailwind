<template>
  <main>Vue-Tailwind</main>
  <DTextInput v-model="text" label="Label" @change="data" @enter="console.log('enter')" autofocus />
</template>

<script setup>
import { ref } from 'vue'
import DTextInput from './components/DTextInput.vue'

const text = ref()
const data = (d) => {
  // console.log(d)
}
</script>
