<template>
  <div class="autocomplete">
    <label v-if="label" class="block" data-test="label">{{ label }}</label>
    <div ref="dropdown" class="relative inline-block w-full">
      <div
        @click="toggleDropdown"
        class="cursor-pointer border p-2 flex items-center justify-between bg-white"
        data-test="dropdown-toggle"
      >
        <div
          v-if="clearable && selectedOptions[0]"
          class="absolute right-9 top-0 bottom-0 cursor-pointer flex items-center h-full"
          data-test="clear-icon"
        >
          <slot name="clear" :onClick="clearInput">
            <svg
              class="inline"
              xmlns="http://www.w3.org/2000/svg"
              height="14px"
              viewBox="0 0 512 512"
              @click="clearInput"
            >
              <path
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
              />
            </svg>
          </slot>
        </div>
        <div class="flex items-center space-x-2">
          <div v-if="!selectedOptions.length" class="text-gray-500" data-test="placeholder">
            {{ placeholder }}
          </div>
          <div
            class="flex space-x-2"
            :selected-options="selectedOptions"
            :remove-option="removeOption"
          >
            <div
              v-for="option in selectedOptions"
              :key="option.id"
              :class="chips ? 'bg-gray-200 p-1' : ''"
            >
              {{ option.label }}
              <span v-if="chips" @click.stop="removeOption(option)" class="ml-1 cursor-pointer"
                >&times;</span
              >
            </div>
          </div>
        </div>
        <slot name="dropdown" :isOpen="isDropdownOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="{ 'rotate-180': isDropdownOpen }"
            class="w-4 h-4 transition-transform transform"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </slot>
      </div>

      <transition name="fade">
        <div
          v-show="isDropdownOpen"
          class="absolute w-full bg-white border border-gray-300 shadow-md overflow-hidden min-w-[300px]"
        >
          <slot name="loading" v-if="loading">
            <div class="flex w-full justify-center items-center h-12" data-test="loading">
              <Spinner />
            </div>
          </slot>
          <div v-else>
            <div
              v-for="option in options"
              :key="option.id"
              @click="toggleOption(option)"
              class="p-2 hover:bg-gray-100 cursor-pointer"
              :data-test="'dropdown-option-' + option.id"
            >
              <input
                v-if="multiple"
                type="checkbox"
                :checked="isSelected(option)"
                @click.stop="toggleOption(option)"
              />
              {{ option.label }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <p v-if="hint" class="text-sm text-gray-500 mt-1" data-test="hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import Spinner from '../assets/icons/LoadingSpinner.vue'

interface Option {
  id: string | number
  label: string
}

const props = defineProps<{
  modelValue: any
  label?: string
  options: any
  multiple?: boolean
  loading?: boolean
  chips?: boolean
  clearable?: boolean
  placeholder?: string
  hint?: string
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const selectedOptions: any = ref([])
const isDropdownOpen = ref(false)
const dropdown = ref(null)

const isClickOutside = (event: MouseEvent) => {
  const dropdownElement: any = dropdown.value
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const clearInput = () => {
  emit('update:modelValue', (selectedOptions.value = []))
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleOption = (option: any) => {
  if (isSelected(option)) {
    removeOption(option)
  } else {
    addOption(option)
    if (!props.multiple) {
      isDropdownOpen.value = false
    }
  }
}

const addOption = (option: Option) => {
  if (props.multiple) {
    selectedOptions.value = [...selectedOptions.value, option]
    emit('select', selectedOptions.value)
  } else {
    selectedOptions.value = [option]
    isDropdownOpen.value = false
    emit('select', selectedOptions.value)
  }

  emit('update:modelValue', getSelectedValues())
}

const removeOption = (option: any) => {
  selectedOptions.value = selectedOptions.value.filter((o: { id: number }) => o.id !== option.id)
  emit('update:modelValue', getSelectedValues())
}

const isSelected = (option: any): boolean => {
  return selectedOptions.value.some((o: { id: string | number }) => o.id === option.id)
}

const getSelectedValues = (): any => {
  return props.multiple
    ? selectedOptions.value.map((o: { id: any }) => o.id)
    : selectedOptions.value[0]?.id || null
}

onMounted(() => {
  document.addEventListener('click', isClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', isClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
