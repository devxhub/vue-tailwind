<template>
  <div
    class="relative inline-block"
    :class="{ 'opacity-50': disabled }"
    ref="dropdown"
    @mouseleave="closeDropdown"
    @mouseenter="openDropdown"
    @click="handleClick"
    data-test="dropdown-container"
  >
    <button
      :disabled="disabled"
      :autofocus="autofocus"
      class="py-2 px-4 border border-gray-400 rounded flex items-center"
      data-test="dropdown-button"
    >
      <span>{{ selectedOption ? selectedOption.option : 'Select an item' }}</span>
      <span class="ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512">
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          />
        </svg>
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 bg-white border rounded shadow-md"
      data-test="dropdown-list"
    >
      <ul class="py-2 px-0">
        <li
          v-for="item in items"
          :key="item.id"
          @click.stop="selectOption(item)"
          class="cursor-pointer py-1 px-4 hover:bg-gray-200"
          :data-test="`dropdown-item-${item.id}`"
        >
          {{ item.option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: { id: string; option: string } | null
  items: Array<{ id: string; option: string }>
  arrow?: boolean
  click?: boolean
  disabled?: boolean
  autofocus?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref<{ id: string; option: string } | null>(null)

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

const selectOption = (item: { id: string; option: string }) => {
  selectedOption.value = item
  isOpen.value = false
  emit('update:modelValue', item)
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

const dropdown = ref(null)

const isClickOutside = (event: MouseEvent) => {
  const dropdownElement: any = dropdown.value
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', isClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', isClickOutside)
})
</script>
