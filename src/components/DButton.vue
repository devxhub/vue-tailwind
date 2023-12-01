<template>
  <button
    v-if="!href"
    :type="type"
    class="border px-1 pb-0.5"
    :class="{ 'w-full': block, 'opacity-70 cursor-not-allowed': disabled || loading }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <div class="flex items-center justify-center">
      <slot v-if="loading" name="loading">
        <Spinner />
      </slot>
      <slot v-else>
        <span>Click me</span>
      </slot>
    </div>
  </button>

  <a
    v-else
    :href="!disabled || (!loading && href)"
    :target="target"
    class="border px-1 pb-0.5 inline-block"
    :class="{ 'w-full': block, 'opacity-70 pointer-events-none': disabled || loading }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <div class="flex items-center justify-center">
      <slot v-if="loading" name="loading">
        <Spinner />
      </slot>
      <slot v-else>
        <span>Click me</span>
      </slot>
    </div>
  </a>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Spinner from '../assets/icons/LoadingSpinner.vue'

const props = defineProps([
  'name',
  'type',
  'value',
  'href',
  'target',
  'disabled',
  'block',
  'autofocus',
  'loading'
])

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.loading && !props.disabled) {
    emit('click')
  }
}
</script>
