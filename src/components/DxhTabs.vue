<template>
  <div
    class="flex gap-x-2"
    :class="direction === 'horizontal' ? 'flex-col' : 'flex-row'"
    data-test="dxh-tabs"
  >
    <div
      class="flex"
      :class="direction === 'horizontal' ? 'flex-row border-b' : 'flex-col border-r min-h-full'"
    >
      <div
        v-for="item in items"
        :key="item.id"
        @click="handleTabClick(item.id)"
        class="py-2 px-3 cursor-pointer transition-all duration-300 hover:bg-gray-200"
        :class="[
          direction === 'horizontal' ? ' border-b' : 'border-r ',
          { 'border-black': activeTab === item.id }
        ]"
        :data-test="`tab-${item.id}`"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="p-3" :data-test="`tab-content`">{{ findActiveTabContent().content }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface item {
  id: number
  label: string
  content: string
}

const props = defineProps<{
  direction: 'horizontal' | 'vertical'
  items: item[]
  defaultActive: number | string
}>()

const emit = defineEmits(['tabClick'])

const activeTab = ref(Number(props.defaultActive) || 1)

const handleTabClick = (id: number) => {
  activeTab.value = id
  emit('tabClick', id)
}

const findActiveTabContent = () => {
  return props.items.find((item) => item.id === activeTab.value) || { content: '' }
}
</script>
