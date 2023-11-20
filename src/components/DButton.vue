<template>
  <button :class="buttonClasses" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  color: {
    type: String as () => 'red' | 'green' | 'blue' | 'transparent' | 'white',
    default: 'blue'
  },
  size: {
    type: String as () => 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    default: 'md'
  },
  rounded: {
    type: String as () => '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full',
    default: 'md'
  },
  block: {
    type: Boolean as () => true | false,
    default: false
  },
  variant: {
    type: String as () => 'flat' | 'outlined' | 'elevated' | 'fade',
    default: 'flat'
  }
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-500 text-white'
    case 'green':
      return 'bg-green-500 text-white'
    case 'blue':
      return 'bg-blue-500 text-white'
    case 'transparent':
      return 'bg-transparent text-black'
    case 'white':
      return 'bg-white text-black'
    default:
      return 'bg-white text-black'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs px-1 py-0.5'
    case 'sm':
      return 'text-sm px-2 py-1'
    case 'md':
      return 'text-md px-4 py-2'
    case 'lg':
      return 'text-lg px-6 py-3'
    case 'xl':
      return 'text-xl px-8 py-4'
    default:
      return 'text-md px-4 py-2'
  }
})

const borderRadiusClasses = computed(() => {
  switch (props.rounded) {
    case '0':
      return 'rounded-none'
    case 'xs':
      return 'rounded-sm'
    case 'sm':
      return 'rounded'
    case 'md':
      return 'rounded-md'
    case 'lg':
      return 'rounded-lg'
    case 'xl':
      return 'rounded-xl'
    case '2xl':
      return 'rounded-2xl'
    case 'full':
      return 'rounded-full'
    default:
      return 'rounded-md'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'flat':
      return ''
    case 'outlined':
      return 'outline outline-1'
    case 'elevated':
      return 'drop-shadow-lg'
    case 'fade':
      return 'bg-opacity-50'
    default:
      return ''
  }
})

const block = computed(() => (props.block ? 'w-full' : ''))

const buttonClasses = computed(
  () =>
    `${borderRadiusClasses.value} ${colorClasses.value} ${sizeClasses.value} ${block.value} ${variantClasses.value} hover:bg-opacity-75 hover:text-opacity-100 hover:transition-all hover:duration-300`
)

const onClick = () => emit('click')
</script>
