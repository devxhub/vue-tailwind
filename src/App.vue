<template>
  <div>
    <RadioInput
      id="radio1"
      name="radioGroup"
      label="radioGroup"
      value="option1"
      :checked="selectedOption === 'option1'"
      :disabled="isDisabled"
      @change="handleRadioChange"
    >
      <template #label="{ label }">
        <span class="font-semibold">{{ label }}</span>
      </template>
    </RadioInput>

    <RadioInput
      id="radio2"
      name="radioGroup"
      value="option2"
      label="option2"
      :checked="selectedOption === 'option2'"
      :disabled="isDisabled"
      @change="handleRadioChange"
    >
      <template #label="{ label }">
        <span>{{ label }}</span>
      </template>
    </RadioInput>

    <p v-if="hint" data-test="hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import RadioInput from './components/DxhRadio.vue'
import { ref } from 'vue'

const selectedOption = ref<string | null>(null)
const isDisabled = ref(false)
const hint = ref('This is a hint.')

const handleRadioChange = (value) => {
  selectedOption.value = value
  console.log('Selected Option:', value)
}
</script>
