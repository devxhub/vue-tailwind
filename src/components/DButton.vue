<template>
  <button :class="buttonClasses" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['click']);

const props = defineProps({
  color: {
    type: String as () => 'red' | 'green' | 'blue',
    default: 'blue',
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
});

const colorClasses = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-500 text-white';
    case 'green':
      return 'bg-green-500 text-white';
    case 'blue':
    default:
      return 'bg-blue-500 text-white';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-2 py-1';
    case 'lg':
      return 'text-lg px-6 py-3';
    case 'md':
    default:
      return 'text-md px-4 py-2';
  }
});

const buttonClasses = computed(() => `rounded ${colorClasses.value} ${sizeClasses.value} hover:opacity-75 transition-opacity`);

const onClick = () => emit('click');
</script>
