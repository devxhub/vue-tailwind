<template>
  <div class="autocomplete">
    <label v-if="label" class="block" data-test="autocomplete-label">{{ label }}</label>
    <div ref="dropdown">
      <div class="relative">
        <input
          v-model="inputValue"
          @input="handleInputChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.enter="handleEnter"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="disabled"
          :autofocus="autofocus"
          class="w-full p-2 border border-gray-300"
          data-test="autocomplete-input"
        />

        <div
          v-if="clearable && inputValue"
          @click="clearInput"
          class="absolute right-2 top-0 bottom-0 cursor-pointer flex items-center h-full"
          data-test="clear-icon"
        >
          <slot name="clear-icon">
            <svg
              class="inline"
              xmlns="http://www.w3.org/2000/svg"
              height="14px"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
              />
            </svg>
          </slot>
        </div>
      </div>

      <div
        v-if="isDropdownOpen"
        class="p-2 border border-gray-300 shadow-md bg-white"
        data-test="dropdown"
      >
        <slot name="loading" v-if="loading">
          <div class="flex w-full justify-center items-center">
            <Spinner />
          </div>
        </slot>
        <div v-if="options.length === 0 && !loading" class="text-center">{{ notFoundContent }}</div>
        <div v-if="options.length > 0 && !loading">
          <div v-for="option in options" :key="getOptionKey(option)" class="cursor-pointer">
            <button class="block" @click="selectOption(option)" data-test="dropdown-option">
              {{ getOptionLabel(option) }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="hint" class="text-sm text-gray-500 mt-1">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import Spinner from '../assets/icons/LoadingSpinner.vue'

interface Option {
  id: string | number
  label: string
}

interface Props {
  label?: string
  loading?: boolean
  value?: string
  options: Option[]
  placeholder?: string
  notFoundContent?: string
  clearable?: boolean
  hint?: string
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  notFoundContent: 'No data found'
})

const emit = defineEmits(['change', 'focus', 'blur', 'enter', 'selected'])

const dropdown = ref(null)
const isDropdownOpen = ref(false)
const inputValue = ref<string>(props.value || '')

const isClickOutside = (event: MouseEvent) => {
  const dropdownElement: any = dropdown.value
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const handleInputChange = () => {
  emit('change', inputValue.value)
  isDropdownOpen.value = true
}

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

const handleEnter = () => {
  emit('enter')
}

const clearInput = () => {
  inputValue.value = ''
}

const selectOption = (option: Option) => {
  inputValue.value = option.label
  emit('selected', option)
  isDropdownOpen.value = false
}

const getOptionKey = (option: Option) => {
  return typeof option === 'object' ? option.id : option
}

const getOptionLabel = (option: Option) => {
  return typeof option === 'object' ? option.label : option
}

onMounted(() => {
  document.addEventListener('click', isClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', isClickOutside)
})
</script>
