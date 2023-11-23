<template>
  <label :for="id" class="block">
    <span>{{ label }}</span>
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :required="required"
      class="w-full border"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('change')"
      @keyup.enter="$emit('enter')"
      @input="$emit('update:modelValue', inputValue)"
    />
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
  disabled: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  required: Boolean,
})
const emit = defineEmits(['focus', 'blur', 'change','enter', 'update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue: any) => {
  emit('change', newValue)
})
</script>
