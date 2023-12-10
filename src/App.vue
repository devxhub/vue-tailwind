<template>
  <div id="app">
    <TabComponent direction="horizontal" defaultActive="3" :items="tabsData" />
  </div>
</template>

<script setup lang="ts">
import TabComponent from './components/DxhTabs.vue'

const tabsData = [
  { id: 1, label: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, label: 'Tab 2', content: 'Content for Tab 2' },
  { id: 3, label: 'Tab 3', content: 'Content for Tab 3' },
  { id: 4, label: 'Tab 4', content: 'Content for Tab 4' },
  { id: 5, label: 'Tab 5', content: 'Content for Tab 5' }
]
</script>
