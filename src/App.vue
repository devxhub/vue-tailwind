<template>
  <div class="p-8">
    <Dropdown v-model="selectedItem" :options="dropdownOptions" click />
    <p class="mt-4">Selected Item: {{ selectedItem }}</p>
  </div>
</template>

<script setup lang="ts">
import Dropdown from './components/DxhDropdown.vue'
import { ref } from 'vue'

const dropdownOptions = ['Option 1', 'Option 2', 'Option 3']
const selectedItem = ref<string | null>(null)
</script>
