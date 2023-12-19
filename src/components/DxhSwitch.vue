<template>
  <div :class="{ 'opacity-70': disabled }" data-test="checkbox-container">
    <input
      type="checkbox"
      :id="id"
      :checked="checked"
      :disabled="disabled"
      :autofocus="autofocus"
      @change="handleChange"
      class="sr-only"
      data-test="checkbox-input"
    />
    <label :for="id" class="flex items-center w-10 h-5 rounded-full bg-gray-300 cursor-pointer">
      <div class="transition duration-300 ease-in-out">
        <div
          :class="{ '!bg-gray-400': checked, 'translate-x-5': checked }"
          class="w-5 h-5 bg-slate-100 rounded-full shadow-md transform transition-all duration-300 ease-in-out"
          data-test="checkbox-indicator"
        ></div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const { defaultChecked, disabled } = defineProps<{
  id?: string
  autofocus?: boolean
  defaultChecked?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['change'])

const checked = ref(false)

const handleChange = (event: any) => {
  if (!disabled) {
    checked.value = !checked.value
    emit('change', (event.target as HTMLInputElement).checked)
  }
}

onMounted(() => {
  if (defaultChecked) {
    checked.value = defaultChecked
  }
})
</script>
