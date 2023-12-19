<template>
  <div class="m-10">
    <StepComponent :steps="steps">
      <template #content="{ currentStep }">
        <div class="py-10" v-if="currentStep === 1">This is one man</div>
        <div class="py-10" v-if="currentStep === 2">This is two man yooo</div>
        <div class="py-10" v-if="currentStep === 3">This is three man yooo</div>
        <div class="py-10" v-if="currentStep === 4">This is four man yooo</div>
      </template>
    </StepComponent>
  </div>
</template>

<script setup lang="ts">
import StepComponent from './components/DxhSteps.vue'

const steps = [
  { id: 1, title: 'Step 1', subtitle: 'Subtitle 1', content: 'this is content 1' },
  { id: 2, title: 'Step 2', subtitle: 'Subtitle 2', content: 'this is content 2' },
  { id: 3, title: 'Step 3', subtitle: 'Subtitle 3', content: 'this is content 3' },
  { id: 4, title: 'Step 4', subtitle: 'Subtitle 4', content: 'this is content 4' }
  // Add more steps as needed
]
</script>
