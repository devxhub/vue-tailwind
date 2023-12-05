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
      @change="handleChange"
    />
    <label :for="id" :class="{ 'opacity-50': disabled }" v-if="label">
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
  <p v-if="hint">{{ hint }}</p>
</template>

<script setup lang="ts">
const props = defineProps({
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
  if (!props.disabled) {
    emit('change', event)
  }
}
</script>
