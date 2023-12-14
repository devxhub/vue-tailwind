<template>
  <div>
    <h1>Page Content</h1>
    <div class="flex flex-col space-y-2">
      <SkeletonBox mode="pulse" :animate="false"/>
      <SkeletonBox mode="shimmer"/>
      <SkeletonBox />
      <SkeletonBox />

      <SkeletonBox :rounded="true" :height="100" :width="100" :animate="false">
      </SkeletonBox>
      <SkeletonBox :height="150" :maxWidth="100" :minWidth="80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonBox from './components/DxhSkeletonLoader.vue'
</script>
