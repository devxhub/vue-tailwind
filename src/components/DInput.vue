<template>
  <div
    class="relative mt-4 transition-all duration-300 pt-4 rounded-t-md"
    :class="[
      disabled ? 'opacity-50 hover:bg-gray-100' : '',
      { 'bg-gray-100 hover:bg-gray-200 px-4': variant === 'default' },
      { 'bg-transparent px-0': variant === 'underlined' }
    ]"
  >
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="isFocused ? placeholder : ''"
      :disabled="disabled"
      class="w-full py-1 focus:outline-none focus:border-transparent bg-transparent"
      :class="[{ 'focus:border-black': isFocused }]"
      @focus="isFocused = true"
      @blur="handleBlur"
      @input="$emit('update:modelValue', inputValue)"
    />
    <label
      v-if="label"
      class="absolute top-3 text-gray-600 text-md transform origin-left transition-transform duration-150 pointer-events-none"
      :class="[
        { '-translate-y-3 scale-75': isFocused },
        { 'left-4': variant === 'default' },
        { 'left-0': variant === 'underlined' }
      ]"
      for="my-input"
    >
      {{ label }}
    </label>
    <div
      v-if="isFocused"
      class="border-b-2 border-black absolute bottom-0 left-0 right-0 transition-all duration-300"
    ></div>
    <div v-else class="border-b border-gray-600 absolute bottom-0 left-0 right-0"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { id, modelValue, label, type, placeholder, disabled } = defineProps({
  id: {
    type: String
  },
  modelValue: {
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  },
  variant: {
    type: String,
    default: 'default'
  },
  disabled: {
    type: Boolean
  }
})

const inputValue = ref(modelValue)
const isFocused: any = ref(modelValue)

const handleBlur = () => {
  if (inputValue.value) {
    isFocused.value = true
  } else {
    isFocused.value = false
  }
}
</script>
