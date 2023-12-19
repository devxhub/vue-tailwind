<template>
  <label :for="id" data-test="text-input-label">
    <slot name="label" :label="label">
      <span v-if="label">{{ label }}</span>
    </slot>
    <div class="relative">
      <input
        :id="id"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :hint="hint"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :required="required"
        :clearable="clearable"
        class="w-full border px-2 py-1 rounded"
        :class="[
          { 'pr-8': clearable && !append },
          { 'pl-10': prepend },
          { 'pr-10': prepend },
          { 'pr-16': clearable && append }
        ]"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @keyup.enter="$emit('enter')"
        @input="$emit('update:modelValue', inputValue)"
        data-test="text-input"
      />
      <span v-if="prepend" class="absolute top-1/2 -translate-y-1/2 left-3">
        <slot name="prepend"> </slot>
      </span>
      <span v-if="append" class="absolute top-1/2 -translate-y-1/2 right-3">
        <slot name="append"> </slot>
      </span>
      <span
        v-if="clearable && inputValue"
        class="absolute top-1/2 -translate-y-1/2 right-[14px] cursor-pointer"
        :class="{ '!right-11': append }"
        data-test="text-input-clear-button"
      >
        <slot name="clear" :onClick="clearInput">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512" @click="clearInput">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </slot>
      </span>
    </div>

    <p v-if="hint" data-test="text-input-hint">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface props {
  modelValue?: string
  label?: string
  id?: string
  type: string
  placeholder?: string
  hint?: string
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
  required?: boolean
  clearable?: boolean
  prepend?: boolean
  append?: boolean
}
const { modelValue } = withDefaults(defineProps<props>(), {
  type: 'text'
})
const emit = defineEmits(['focus', 'blur', 'change', 'enter', 'update:modelValue'])

const inputValue = ref(modelValue)
const clearInput = () => {
  inputValue.value = ''
}

watch(inputValue, (newValue: any) => {
  emit('change', newValue)
})
</script>
