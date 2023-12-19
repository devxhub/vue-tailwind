<template>
  <div class="p-8 shadow-md">
    <div class="flex items-center justify-between space-x-3 w-full">
      <template v-for="(step, id) in steps" :key="id">
        <div
          class="flex items-center justify-center space-x-2"
          :class="{
            'text-gray-500': id >1 && id > currentStep,
            'text-black': id <= currentStep
          }"
        >
          <div
            class="rounded-full border"
            :class="{
              'border-gray-500 bg-white': id > 1 && id > currentStep,
              'border-blue-500 bg-blue-500 text-white': id <= currentStep
            }"
          >
            <p class="px-3 py-[5px]">
              {{ id + 1 }}
            </p>
          </div>
          <div class="text-center">
            <div
              v-if="step.title"
              class="whitespace-nowrap"
              :class="{ 'font-bold': id === currentStep }"
            >
              {{ step.title }}
            </div>
            <div
              v-if="step.subtitle"
              class="whitespace-nowrap"
              :class="{ 'font-bold': id === currentStep }"
            >
              {{ step.subtitle }}
            </div>
          </div>
        </div>
        <div
          v-if="id < steps.length - 1"
          class="h-0.5 w-full bg-gray-500"
          :class="{
            '!bg-blue-500': id + 1 === currentStep
          }"
        ></div>
      </template>
    </div>
    <slot name="content" :currentStep="currentStep">
      <div class="p-10" v-if="activeStepContent">
        <p>{{ activeStepContent }}</p>
      </div>
    </slot>
    <div class="px-10">
        <button class="ml-5 border px-1" @click="prevStep">Previous</button>
      <button class="border px-1" @click="nextStep">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { steps } = defineProps<{
  steps: { title: string; subtitle?: string; content?: string }[]
}>()

// Change the initial value to 1
const currentStep = ref(0)

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  // Allow going to step 0
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
const activeStepContent = computed(() => {
  return steps[currentStep.value]?.content || ''
})
</script>
