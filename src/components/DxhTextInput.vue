<template>
  <label :for="id" data-test="text-input-label">
    <slot name="label" :label="label">
      <span v-if="label" :class="labelClasses">{{ label }}</span>
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
        :class="[{ 'pr-8': clearable }, inputClasses]"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @keyup.enter="$emit('enter')"
        @input="$emit('update:modelValue', inputValue)"
        data-test="text-input"
      />
      <div
        v-if="clearable && inputValue"
        class="absolute right-3 top-0 bottom-0 cursor-pointer flex items-center h-full"
        :class="clearButtonClasses"
        data-test="text-input-clear-button"
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
    <p v-if="hint" :class="hintClasses" data-test="text-input-hint">{{ hint }}</p>
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
  labelClasses?: string
  inputClasses?: string
  clearButtonClasses?: string
  hintClasses?: string
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
