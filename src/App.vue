<template>
  <div>
    <button @click="openModal">Open Modal</button>

    <DxhModal
    v-if="isModalOpen"
      :title="modalTitle"
      :footer="true"
      :open="isModalOpen"
      :keyboardEsc="true"
      :zIndex="100"
      :persistent="false"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <!-- Your modal content goes here -->
      <p>This is the modal content.</p>
    </DxhModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxhModal from './components/DxhModal.vue';

const isModalOpen = ref(false);
const modalTitle = ref('');

const openModal = () => {
  isModalOpen.value = true;
  modalTitle.value = 'Your Modal Title';
};

const handleOk = () => {
  // Handle OK button click
  isModalOpen.value = false;
};

const handleCancel = () => {
  // Handle Cancel button click
  isModalOpen.value = false;
};
</script>


