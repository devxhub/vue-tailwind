<template>
  <main>Vue-Tailwind</main>
  <DTextInput
    class="mx-20"
    v-model="text"
    clearable
    label="Label"
    @change="data"
    @focus="isFocused = true"
    @blue="isFocused = false"
  >
    <!-- <div v-if="isFocused"></div> -->
    <template #clear-icon >
      <!-- <p>car</p> -->
    </template>
  </DTextInput>
</template>

<script setup>
import { ref } from 'vue'
import DTextInput from './components/DTextInput.vue'

const text = ref()
const isFocused = ref(false)
const data = (d) => {
  // console.log(d)
}
</script>
