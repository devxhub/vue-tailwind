<template>
  <label v-if="label" class="block"> {{ label }}</label>
  <div ref="dropdown" class="relative inline-block w-full">
    <div
      @click="toggleDropdown"
      class="cursor-pointer border border-gray-300 p-2 rounded-md flex items-center justify-between bg-white"
    >
      <div
        v-if="clearable && selectedOptions[0]"
        class="absolute right-9 top-0 bottom-0 cursor-pointer flex items-center h-full"
        @click.stop="$emit('update:modelValue', (selectedOptions = []))"
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
      <div class="flex items-center space-x-2">
        <div v-if="!selectedOptions.length" class="text-gray-500">{{ placeholder }}</div>
        <div
          class="flex space-x-2"
          :selected-options="selectedOptions"
          :remove-option="removeOption"
        >
          <div
            v-for="option in selectedOptions"
            :key="option.id"
            :class="chips ? 'bg-gray-200 rounded-md p-1' : ''"
          >
            {{ option.label }}
            <span v-if="chips" @click.stop="removeOption(option)" class="ml-1 cursor-pointer"
              >&times;</span
            >
          </div>
        </div>
      </div>
      <slot name="dropdown">
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
        class="absolute w-full bg-white border border-gray-300 rounded-md shadow-md overflow-hidden min-w-[300px]"
      >
        <div :options="options" :toggle-option="toggleOption">
          <div
            v-for="option in options"
            :key="option.id"
            @click="toggleOption(option)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            <slot name="prepend" v-if="multiple"> </slot>
            {{ option.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
  <p v-if="hint">{{ hint }}</p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

interface Option {
  id: string | number
  label: string
}

const props = defineProps({
  modelValue: [Array, String, Object],
  label: {
    type: String,
    required: false
  },
  options: [Array, String, Object],
  multiple: {
    type: Boolean,
    required: false
  },
  chips: {
    type: Boolean,
    required: false
  },
  clearable: {
    type: Boolean,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  hint: {
    type: String,
    required: false
  }
})

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

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleOption = (option: Option) => {
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

const removeOption = (option: Option) => {
  selectedOptions.value = selectedOptions.value.filter(
    (o: { id: string | number }) => o.id !== option.id
  )
  emit('update:modelValue', getSelectedValues())
}

const isSelected = (option: Option): boolean => {
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
