<template>
  <div class="p-8">
    <Dropdown v-model="selectedItem" :items="dropdownItems" click  arrow></Dropdown>
    <p class="mt-4">Selected Item: {{ selectedItem }}</p>
  </div>
</template>

<script setup lang="ts">
import Dropdown from './components/DxhDropdown.vue'
import { ref } from 'vue'

const dropdownItems = [
  { id: '1', option: 'Option 1' },
  { id: '2', option: 'Option 2' },
  { id: '3', option: 'Option 3' }
]
const selectedItem = ref<string | null>(null)
</script>
