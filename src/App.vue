<template>
  <div class="relative">
    <span class="absolute top-11 left-4 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512">
        <path
          d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
        />
      </svg>
    </span>
    <TextInput
      v-model="textValue"
      label="E-mail"
      id="E-mail"
      type="text"
      placeholder="Enter your Email"
      clearable
      labelClasses="font-semibold"
      inputClasses="w-full z-0 pl-11 py-3 border border-gray-400 placeholder:text-gray-400 rounded-xl"
      @change="handleInputChange"
    >
    <template #label="{label}">
    <p class="mb-1 font-semibold">{{ label }} <span class="text-red-400 font-bold">*</span></p></template>
    </TextInput>
  </div>
  <p>Entered Value: {{ textValue }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from './components/DxhTextInput.vue'

const textValue = ref('')

const handleInputChange = (newValue) => {
  console.log('Input changed:', newValue)
}
</script>

<style>
body {
  margin: 40px;
}
</style>
