<template>
  <label :for="id" class="block">
    <span class="text-gray-700">{{ label }}</span>
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      @input="$emit('update:modelValue', inputValue)"
    />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  disabled: Boolean,
});

const inputValue = ref(props.modelValue);

inputValue.value = props.modelValue;
</script>

<style scoped>
/* Add any additional styles here */
</style>
