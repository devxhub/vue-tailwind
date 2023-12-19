<template>
  <div
    class="inline-block"
    :class="{ 'cursor-grab': draggable }"
    :draggable="draggable"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
    @dragend="handleDragEnd"
  >
    <div :class="['flex items-center py-2 px-3 border bg-gray-300 rounded-lg', classes]">
      <slot :text="text">
        <span class="text mr-2">{{ text }}</span>
      </slot>
      <span v-if="closeable" class="cursor-pointer">
        <slot name="close" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            @click="close"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const { classes, text, closeable, draggable } = defineProps<{
  classes?: string
  text: string
  closeable?: boolean
  draggable?: boolean
}>()

const emit = defineEmits(['close', 'drop'])

const close = () => {
  emit('close')
}

const handleDragStart = (event: DragEvent) => {
  if (draggable) {
    event.dataTransfer?.setData('text/plain', text)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleDragEnd = () => {
  if (draggable) {
    emit('drop', text)
  }
}
</script>
