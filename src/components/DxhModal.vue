<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
    @click="handleOutsideClick"
    data-test="modal-overlay"
  >
    <div
      ref="modalRef"
      class="bg-white p-6 rounded-md relative cursor-auto min-w-[250px]"
      :style="{ zIndex, maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }"
      @keydown.esc="keyboardEsc ? handleCancel : ''"
      data-test="modal-content"
    >
      <div
        class="absolute top-6 right-4 cursor-pointer"
        @click="handleCancel"
        data-test="close-icon"
      >
        <slot name="close-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </slot>
      </div>
      <div v-if="title" class="text-lg font-bold mr-6" data-test="modal-title">{{ title }}</div>
      <div class="my-4" data-test="modal-body">
        <slot></slot>
      </div>
      <div v-if="footer" class="flex space-x-2 justify-end" data-test="modal-footer">
        <slot name="cancel">
          <button @click="handleCancel" class="border px-1" data-test="cancel-button">
            Cancel
          </button>
        </slot>
        <slot name="ok">
          <button @click="handleOk" class="border px-1" data-test="ok-button">OK</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  footer?: boolean
  maxWidth?: string
  maxHeight?: string
  open: boolean
  keyboardEsc?: boolean
  zIndex?: number
  persistent?: boolean
}

const { title, footer, maxWidth, maxHeight, open, keyboardEsc, zIndex, persistent } =
  defineProps<Props>()
const emit = defineEmits(['ok', 'cancel'])

const modalRef = ref<HTMLElement | null>(null)

const handleOutsideClick = (event: MouseEvent) => {
  if (!persistent && open) {
    const modalElement = event.target as HTMLElement
    if (!modalRef.value?.contains(modalElement)) {
      handleCancel()
    }
  }
}

onMounted(() => {
  if (keyboardEsc) {
    document.addEventListener('keydown', handleEscKey)
  }
})

onUnmounted(() => {
  if (keyboardEsc) {
    document.removeEventListener('keydown', handleEscKey)
  }
})

const handleCancel = () => {
  emit('cancel')
}

const handleOk = () => {
  emit('ok')
}

const handleEscKey = (event: KeyboardEvent) => {
  if (keyboardEsc && event.key === 'Escape') {
    handleCancel()
  }
}
</script>
