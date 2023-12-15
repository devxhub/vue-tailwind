<template>
  <div class="m-8">
    <closable-chip
      :text="chipText"
      :closeable="true"
      classes="border border-red-400"
      draggable
      @close="console.log('cls')"
      @drop="dropped"
    >
      <template #close="{ onClick }"><div @click="onClick">x</div></template>
    </closable-chip>
  </div>
</template>

<script setup lang="ts">
import ClosableChip from './components/DxhChips.vue'

const chipText = 'Chip'
const dropped = (dd) => {
  console.log(dd)
}
</script>
