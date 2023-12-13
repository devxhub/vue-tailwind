<template>
  <label :for="id" class="block" data-test="textarea-label">
    <span v-if="label">{{ label }}</span>
    <div class="relative">
      <textarea
        :id="id"
        v-model="inputValue"
        :rows="Number(rows)"
        :cols="Number(cols)"
        :maxlength="Number(maxlength)"
        :placeholder="placeholder"
        :hint="hint"
        :resize="resize"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        :required="required"
        :clearable="clearable"
        class="w-full border px-2 py-1 rounded"
        :class="resize ? 'resize-y' : 'resize-none'"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @keyup.enter="$emit('enter')"
        @input="$emit('update:modelValue', inputValue)"
        data-test="textarea-element"
      />
      <div
        v-if="clearable && inputValue"
        class="absolute right-1.5 top-0 cursor-pointer"
        data-test="textarea-clear-button"
      >
        <slot name="clear" :onClick="clearInput">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            height="14px"
            viewBox="0 0 512 512"
            @click="clearInput"
          >
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        </slot>
      </div>
    </div>
    <p v-if="hint" data-test="textarea-hint">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface props {
  modelValue: string
  label?: string
  id?: string
  type: string
  rows?: any
  cols?: any
  maxlength?: any
  placeholder?: string
  hint?: string
  disabled?: boolean
  resize?: boolean
  readonly?: boolean
  autofocus?: boolean
  required?: boolean
  clearable?: boolean
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
