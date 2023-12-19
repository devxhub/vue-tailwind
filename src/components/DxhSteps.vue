<template>
  <div class="p-8 shadow-md" data-test="your-component">
    <div class="flex items-center justify-between space-x-3 w-full">
      <template v-for="(step, index) in steps" :key="index">
        <div
          class="flex items-center justify-center space-x-2"
          :class="{
            'text-gray-500': index > 0 && index > currentStep,
            'text-black': index <= currentStep
          }"
          :data-test="`step-${index}`"
        >
          <slot name="step" :index="index" :currentStep="currentStep">
            <div
              class="rounded-full border"
              :class="{
                'border-gray-500 bg-white': index > 0 && index > currentStep,
                'border-blue-500 bg-blue-500 text-white': index <= currentStep
              }"
              :data-test="`step-circle-${index}`"
            >
              <p class="px-3 py-[5px]">
                {{ index + 1 }}
              </p>
            </div>
          </slot>
          <slot
            name="content"
            :index="index"
            :currentStep="currentStep"
            :title="step.title"
            :subtitle="step.subtitle"
          >
            <div class="text-center" :data-test="`step-content-${index}`">
              <div
                v-if="step.title"
                class="whitespace-nowrap"
                :class="{ 'font-bold': index === currentStep }"
              >
                {{ step.title }}
              </div>
              <div
                v-if="step.subtitle"
                class="whitespace-nowrap"
                :class="{ 'font-bold': index === currentStep }"
              >
                {{ step.subtitle }}
              </div>
            </div>
          </slot>
        </div>
        <div
          v-if="index < steps.length - 1"
          class="h-0.5 w-full bg-gray-500"
          :class="{
            '!bg-blue-500': index + 1 === currentStep
          }"
          :data-test="`step-divider-${index}`"
        ></div>
      </template>
    </div>
    <slot :currentStep="currentStep">
      <div class="p-10" v-if="activeStepContent" data-test="active-step-content">
        <p>{{ activeStepContent }}</p>
      </div>
    </slot>
    <div class="px-10">
      <button class="ml-5 border px-1" @click="prevStep" data-test="prev-button">Previous</button>
      <button class="border px-1" @click="nextStep" data-test="next-button">Next</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'

const { steps } = defineProps<{
  steps: { title: string; subtitle?: string; content?: string }[]
}>()
const emit = defineEmits(['next', 'prev'])

const currentStep = ref(0)

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
  emit('next')
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
  emit('prev')
}
const activeStepContent = computed(() => {
  return steps[currentStep.value]?.content || ''
})
</script>
