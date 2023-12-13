<template>
  <div class="flex items-center space-x-1">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="defaultChecked ? defaultChecked : checked"
      :disabled="disabled"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      data-test="radio"
      @change="handleChange"
    />
    <label v-if="label" :for="id" :class="{ 'opacity-50': disabled }" data-test="label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
  </div>
  <p v-if="hint" data-test="hint">{{ hint }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
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
  if (!props.disabled) {
    emit('change', event)
  }
}
</script>
