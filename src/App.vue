<template>
  <div>
    <Autocomplete
      v-model="selectedOptions"
      :label="label"
      :options="options"
      :multiple="multiple"
      :loading="loading"
      :chips="chips"
      :clearable="clearable"
      :placeholder="placeholder"
      :hint="hint"
      @select="handleSelect"
    >
      <template #clear="{ onClick }">
        <div @click="onClick">
          cl
        </div>
      </template>
    </Autocomplete>
  </div>
</template>

<script setup lang="ts">
import Autocomplete from './components/DxhSelect.vue'
import { ref } from 'vue'

const selectedOptions = ref([])
const label = 'Select Options'
const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' }
]
const multiple = true
const loading = false
const chips = true
const clearable = true
const placeholder = 'Select an option'
const hint = 'This is a hint.'

const handleSelect = (value) => {
  console.log('Selected Options:', value)
}
</script>
