<template>
  <nav class="flex items-center" :class="{ 'pointer-events-none': disabled }" data-test="breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <template v-if="index === items.length - 1">
        <div class="mr-1">
          <slot v-if="item?.icon" name="prepend">{{ item?.icon }}</slot>
        </div>

        <span class="text-gray-500 font-semibold" data-test="breadcrumb-item">{{ item.text }}</span>
      </template>
      <template v-else>
        <div class="mr-1">
          <slot v-if="item?.icon" name="prepend">{{ item?.icon }}</slot>
        </div>
        <a v-if="!disabled" class="font-semibold" :href="item.to" data-test="breadcrumb-link">{{ item.text }}</a>
        <span v-else class="font-semibold opacity-50" data-test="breadcrumb-item">{{ item.text }}</span>
      </template>

      <template v-if="index < items.length - 1">
        <slot name="divider">
          <span class="mx-2 text-gray-500" data-test="breadcrumb-divider">></span>
        </slot>
      </template>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface BreadcrumbItem {
  text: string;
  to: string;
  icon?: any;
}

defineProps<{
  items: BreadcrumbItem[];
  disabled: boolean;
}>();
</script>
