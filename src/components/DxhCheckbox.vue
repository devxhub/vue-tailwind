<template>
  <div class="flex items-center space-x-1" data-test="checkbox">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="defaultChecked ? defaultChecked : checked"
      :disabled="disabled"
      @change="handleChange"
      data-test="checkbox-input"
    />
    <label :for="id" v-if="label" data-test="checkbox-label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
  </div>
  <p v-if="hint" data-test="checkbox-hint">{{ hint }}</p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  id: string
  name?: string
  value?: string
  label?: string
  checked: boolean
  defaultChecked?: boolean
  hint?: string
  disabled?: boolean
}>()

const emit = defineEmits(['change'])

const handleChange = (event: any) => {
  emit('change', event)
}
</script>
