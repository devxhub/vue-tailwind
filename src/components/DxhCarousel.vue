<template>
  <div
    class="flex relative overflow-hidden bg-gray-300"
    :style="{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    data-test="carousel"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      class="w-full h-full flex-shrink-0 transition-transform duration-300"
      data-test="carousel-item"
    >
      <img
        v-if="item.src"
        :src="item.src"
        :alt="item.title"
        :class="[!maxWidth ? 'w-full' : '', !maxHeight ? 'h-full' : '', 'object-cover']"
        :style="{ width: `${maxWidth}px`, height: `${maxHeight}px` }"
      />
      <p v-else class="text-5xl flex items-center justify-center py-5">{{ index + 1 }}</p>
    </div>

    <div v-if="showArrows">
      <div class="absolute top-1/2 left-3 transform -translate-y-1/2">
        <slot name="prev" :onPrevClick="prevSlide">
          <button
            @click="prevSlide"
            class="rounded-full p-2 bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition-all"
            data-test="prev-arrow"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        </slot>
      </div>

      <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
        <slot name="next" :onNextClick="nextSlide">
          <button
            @click="nextSlide"
            class="rounded-full p-2 bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition-all"
            data-test="next-arrow"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </slot>
      </div>
    </div>

    <div
      v-if="dots"
      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 cursor-pointer"
    >
      <div v-for="(dot, index) in items" @click="goToSlide(index)" :key="index">
        <slot name="dots" :index="index" :activeIndex="currentIndex">
          <button
            class="w-4 h-4 rounded-full bg-gray-500"
            :class="{
              'bg-gray-700': index === currentIndex
            }"
            data-test="dot"
          ></button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface CarouselItem {
  id: 1
  title: string
  src: string
}

const props = defineProps<{
  items: CarouselItem[]
  autoplay: boolean
  showArrows: boolean
  dots: boolean
  autoplaySpeed: number
  maxWidth: number
  maxHeight: number
}>()

const currentIndex = ref<number>(0)
let autoplayInterval: any = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  if (props.autoplay) {
    autoplayInterval = setInterval(nextSlide, props.autoplaySpeed || 5000)
  }
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>
