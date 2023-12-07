<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <div
        @click="collapsible === 'header' ? handleItemClick(item.id) : ''"
        class="bg-gray-200 p-3 flex items-center font-semibold"
        :class="[
          { 'space-x-3 flex-row': expandIconPosition === 'left' },
          { 'justify-between flex-row-reverse': expandIconPosition === 'right' },
          { 'cursor-pointer': collapsible === 'header' },
          { 'pointer-events-none opacity-50': collapsible === 'disabled' }
        ]"
        :data-test="`collapse-item-header-${item.id}`"
      >
        <div
          @click="collapsible === 'icon' ? handleItemClick(item.id) : ''"
          :class="{ 'cursor-pointer': collapsible === 'icon' }"
        >
          <span v-if="isItemActive(item.id)">
            <slot name="collapse-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 448 512"
                :data-test="`collapse-item-collapse-icon-${item.id}`"
              >
                <path
                  d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </slot>
          </span>
          <span v-else>
            <slot name="expand-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 448 512"
                :data-test="`collapse-item-expand-icon-${item.id}`"
              >
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                />
              </svg>
            </slot>
          </span>
        </div>
        <p :data-test="`collapse-item-header-text-${item.id}`">{{ item.header }}</p>
      </div>
      <div v-if="isItemActive(item.id)" class="p-3" :data-test="`collapse-item-content-${item.id}`">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CollapseItem {
  id: number
  header: string
  content: string
}

interface props {
  items: CollapseItem[]
  accordion?: boolean
  defaultActiveKey: number
  collapsible?: string | string[]
  expandIconPosition?: string
}

const { items, accordion, defaultActiveKey, collapsible, expandIconPosition } = withDefaults(
  defineProps<props>(),
  {
    accordion: false
  }
)
const emit = defineEmits(['change'])

const activeItems = ref<any>(accordion ? defaultActiveKey : [defaultActiveKey])

const handleItemClick = (id: number) => {
  if (accordion) {
    activeItems.value = activeItems.value === id ? null : id
  } else {
    if (activeItems.value.includes(id)) {
      activeItems.value = activeItems.value.filter((item: number) => item !== id)
    } else {
      activeItems.value = [...activeItems.value, id]
    }
  }
  emit('change', activeItems.value)
}

const isItemActive = (id: number) => {
  if (accordion) {
    return activeItems.value === id
  } else {
    return activeItems.value.includes(id)
  }
}

onMounted(() => {
  if (accordion) {
    activeItems.value = defaultActiveKey
  } else {
    activeItems.value = [defaultActiveKey]
  }
})
</script>
