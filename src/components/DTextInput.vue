<template>
  <label :for="id" class="block">
    <span>{{ label }}</span>
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
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @keyup.enter="$emit('enter')"
        @input="$emit('update:modelValue', inputValue)"
      />
      <div
        v-if="clearable && inputValue !== ''"
        class="absolute right-2 top-0 bottom-0 cursor-pointer flex items-center h-full"
        @click="inputValue = ''"
      >
        <slot name="clear-icon">
          <svg
            class="inline"
            xmlns="http://www.w3.org/2000/svg"
            height="14px"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        </slot>
      </div>
    </div>
    <p v-if="hint">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  hint: String,
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  required: Boolean,
  clearable: Boolean
})
const emit = defineEmits(['focus', 'blur', 'change', 'enter', 'update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue: any) => {
  emit('change', newValue)
})
</script>
