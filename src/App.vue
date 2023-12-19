<template>
  <div class="m-10">
    <StepComponent :steps="steps">
      <template #default="{ currentStep }">
        <div v-if="currentStep === 0">This is one man</div>
        <div v-if="currentStep === 1">This is two man yooo</div>
        <div v-if="currentStep === 2">This is 3 man yooo</div>
        <div v-if="currentStep === 3">This is 4 man yooo</div>
      </template>
    </StepComponent>
  </div>
</template>

<script setup lang="ts">
import StepComponent from './components/DxhSteps.vue'

const steps = [
  { title: 'Step 1', subtitle: 'Subtitle 1', content: 'this is content 1' },
  { title: 'Step 2', subtitle: 'Subtitle 2', content: 'this is content 2' },
  { title: 'Step 3', subtitle: 'Subtitle 3', content: 'this is content 3' },
  { title: 'Step 4', subtitle: 'Subtitle 4', content: 'this is content 4' }
  // Add more steps as needed
]
</script>
