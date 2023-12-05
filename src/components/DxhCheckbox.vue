<template>
  <div class="flex items-center space-x-1">
    <input
      :id="id"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="defaultChecked ? defaultChecked : checked"
      :disabled="disabled"
      @change="handleChange"
    />
    <label :for="id" v-if="label">
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
  <p v-if="hint">{{ hint }}</p>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  id: String,
  name: String,
  value: String,
  label: String,
  checked: Boolean,
  defaultChecked: Boolean,
  hint: String,
  disabled: Boolean
})

const emit = defineEmits(['change'])

const handleChange = (event: any) => {
  emit('change', event)
}
</script>
