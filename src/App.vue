<template>
  <div>
    <Autocomplete
      v-model="selectedOption"
      :options="autocompleteOptions"
      label="Select an option:"
      placeholder="Start typing..."
      @selected="handleSelected"
      :loading="isLoading"
      :clearable="true"
      hint="Type to search"
    />
    <div class="mt-4">
      <p>Selected Option: {{ selectedOption }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Autocomplete from './components/DxhAutocomplete.vue'

const selectedOption = ref<string | null>(null)
const isLoading = ref(false)

const autocompleteOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  // Add more options as needed
]

const handleSelected = (option) => {
  console.log('Selected:', option)
  // Do something with the selected option
}
</script>
