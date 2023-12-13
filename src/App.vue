<template>
  <div>
    <button @click="openModal">Open Modal</button>

    <DxhModal
      v-if="isModalOpen"
      :title="modalTitle"
      :footer="true"
      :maxWidth="'500px'"
      :maxHeight="'300px'"
      :open="isModalOpen"
      :keyboardEsc="true"
      :zIndex="1"
      :persistent="false"
      @ok="handleOk"
      @cancel="handleCancel"
      @close="isModalOpen = false"
    >
      <!-- Your modal content goes here -->
      <p>This is the modal content.</p>
    </DxhModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DxhModal from '@/components/DxhModal.vue'

const isModalOpen = ref(false)
const modalTitle = ref('Sample Modal')

const openModal = () => {
  isModalOpen.value = true
}

const handleOk = () => {
  // Handle OK button click
  isModalOpen.value = false
}

const handleCancel = () => {
  // Handle Cancel button click
  isModalOpen.value = false
}
</script>
