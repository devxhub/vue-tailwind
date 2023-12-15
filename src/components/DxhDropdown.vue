<template>
  <div
    class="relative inline-block"
    @mouseleave="closeDropdown"
    @mouseenter="openDropdown"
    @click="handleClick"
  >
    <button class="py-2 px-4 border rounded flex items-center">
      {{ selectedOption || 'Select an option' }}
      <span class="ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512">
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          />
        </svg>
      </span>
    </button>

    <div v-if="isOpen" class="absolute top-full left-0 right-0 bg-white border rounded shadow-md" @click.stop="">
      <ul class="py-2 px-0">
        <li
          v-for="option in options"
          :key="option"
          @click.stop="selectOption(option)"
          class="cursor-pointer py-1 px-4 hover:bg-gray-200"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string | null
  options: string[]
  click?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref<string | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const openDropdown = () => {
  if (!props.click) {
    isOpen.value = true
  }
}

const closeDropdown = () => {
  if (!props.click) {
    isOpen.value = false
  }
}

const selectOption = (option: string) => {
  selectedOption.value = option
  isOpen.value = false
  emit('update:modelValue', option)
}

const handleClick = () => {
  if (props.click) {
    toggleDropdown()
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue
  }
)
</script>
