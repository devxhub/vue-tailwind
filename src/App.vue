<template>
  <div>
    <CheckboxInput
      id="1"
      name="checkboxGroup"
      value="option1"
      :checked="selectedOptions.includes('option1')"
      :disabled="isDisabled"
      @change="handleCheckboxChange"
    >
      <template #label="{ label }">
        <span class="font-semibold">{{ label }}</span>
        <span class="text-gray-500">(Option 1)</span>
      </template>
    </CheckboxInput>

    <CheckboxInput
      id="checkbox2"
      name="checkboxGroup"
      value="option2"
      :checked="selectedOptions.includes('option2')"
      :disabled="isDisabled"
      @change="handleCheckboxChange"
    >
      <template #label="{ label }">
        <span class="font-semibold">{{ label }}</span>
        <span class="text-gray-500">(Option 2)</span>
      </template>
    </CheckboxInput>

    <p v-if="hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import CheckboxInput from './components/DxhCheckbox.vue'
import { ref } from 'vue'

const selectedOptions = ref<string[]>([])
const isDisabled = ref(false)
const hint = ref('This is a hint.')

const handleCheckboxChange = (value) => {
  console.log('Selected Options:', value.target.checked)
}
</script>
