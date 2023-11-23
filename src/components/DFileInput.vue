<template>
  <div
    class="relative transition-all duration-300 pt-4 rounded-t-md"
    :class="[
      disabled ? 'opacity-50' : '',
      { 'bg-gray-100 hover:bg-gray-200 px-4': variant === 'default' },
      { 'bg-transparent px-0': variant === 'underlined' }
    ]"
  >
    <input
      type="file"
      id="fileInput"
      ref="fileInput"
      :accept="accept"
      :disabled="disabled"
      :readonly="readonly"
      class="w-full py-1 focus:outline-none focus:border-transparent bg-transparent placeholder:text-md absolute inset-0 h-full opacity-0 cursor-pointer"
      :class="[{ 'focus:border-black': isFocused }]"
      @focus="isFocused = true"
      @blur="handleBlur"
      @change="handleFileChange"
    />
    <input
      :id="id"
      v-model="inputValue"
      :placeholder="isFocused ? placeholder : ''"
      :disabled="disabled"
      :readonly="readonly"
      class="w-full py-1 focus:outline-none focus:border-transparent bg-transparent placeholder:text-md"
      :class="[{ 'focus:border-black': isFocused }]"
      @focus="isFocused = true"
      @blur="handleBlur"
    />
    <div v-if="isFocused && clearable && inputValue">
      <CircleXmark
        @click="clearFile"
        class="w-5 h-5 absolute right-5 top-0 bottom-0 my-auto cursor-pointer"
      />
    </div>
    <label
      v-if="label"
      class="absolute top-3 text-md transform origin-left transition-transform duration-150 pointer-events-none"
      :class="[
        color ? `${textColorClasses}` : 'text-gray-600',
        { '-translate-y-3 scale-75': isFocused },
        { 'left-4': variant === 'default' },
        { 'left-0': variant === 'underlined' }
      ]"
      for="my-input"
    >
      {{ label }}
    </label>
    <div
      v-if="isFocused"
      class="border-b-2 border-black absolute bottom-0 left-0 right-0 transition-all duration-300"
      :class="color ? `${borderColorClasses}` : 'border-black'"
    ></div>
    <div v-else class="border-b border-gray-600 absolute bottom-0 left-0 right-0"></div>
  </div>
  <transition name="form-slide-fade">
    <div
      v-if="isFocused && hint"
      class="text-gray-500 text-sm mt-0.5"
      :class="[{ 'px-4': variant === 'default' }, { 'px-0': variant === 'underlined' }]"
    >
      {{ hint }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CircleXmark from '../assets/icons/CircleXmark.vue'

const emit = defineEmits(['update:modelValue', 'file-cleared'])
const {
  id,
  modelValue,
  label,
  placeholder,
  disabled,
  readonly,
  clearable,
  color,
  variant,
  accept
} = defineProps({
  id: {
    type: String
  },
  modelValue: {
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String
  },
  hint: {
    type: String
  },
  variant: {
    type: String,
    default: 'default'
  },
  accept: {
    type: String
  },
  color: {
    type: String,
    default: 'black'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const fileInput = ref(null)

const selectedFileName = ref('')
const handleFileChange = () => {
  const input: any = fileInput.value
  const file = input.files?.[0]
  emit('update:modelValue', file)

  if (file) {
    selectedFileName.value = file.name
  } else {
    selectedFileName.value = ''
  }
}

const clearFile = () => {
  selectedFileName.value = ''
  isFocused.value = false
  fileInput.value = null
  emit('file-cleared')
}

const textColorClasses = computed(() => {
  switch (color) {
    case 'black':
      return 'text-gray-600'
    case 'green':
      return 'text-green-500'
    case 'blue':
      return 'text-blue-500'
    case 'red':
      return 'text-red-500'
    default:
      return 'text-gray-600'
  }
})

const borderColorClasses = computed(() => {
  switch (color) {
    case 'black':
      return 'border-black'
    case 'green':
      return 'border-green-500'
    case 'blue':
      return 'border-blue-500'
    case 'red':
      return 'border-red-500'
    default:
      return 'border-black'
  }
})

const inputValue = ref(selectedFileName)
const isFocused: any = ref(modelValue)

const handleBlur = () => {
  if (inputValue.value) {
    isFocused.value = true
  } else {
    isFocused.value = false
  }
}
</script>