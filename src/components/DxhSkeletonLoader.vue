<template>
  <div
    :style="{
      height: `${height}px`,
      width: `${width}px`,
      maxWidth: `${maxWidth}px`,
      minWidth: `${minWidth}px`
    }"
    class="inline-block relative overflow-hidden align-middle w-full rounded-md bg-[#dddbdd]"
    :class="[
      { pulse: animate && mode === 'pulse' },
      { shimmer: animate && mode === 'shimmer' },
      { 'rounded-full': rounded }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface props {
  maxWidth?: number
  minWidth?: number
  height?: number
  width?: number
  mode?: 'shimmer' | 'pulse'
  rounded?: boolean
  animate?: boolean
}

withDefaults(defineProps<props>(), {
  height: 30,
  animate: true,
  mode: 'shimmer'
})
</script>

<style scoped>
.shimmer::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 3s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.pulse {
  animation: pulse 1s linear infinite alternate;
}

@keyframes pulse {
  0% {
    background-color: rgb(209, 209, 209);
  }
  100% {
    background-color: rgb(243, 243, 243);
  }
}
</style>
