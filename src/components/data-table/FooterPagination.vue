<template>
  <div class="py-5" :class="{ 'pointer-events-none': currentLoader }">
    <div class="flex items-center flex-wrap flex-col sm:flex-row gap-4">
      <div class="flex items-center bh-pagination-info">
        <span class="mr-2">
          {{
            stringFormat(props.paginationInfo, filterRowCount ? offset : 0, limit, filterRowCount)
          }}
        </span>
        <select
          v-if="props.showPageSize"
          v-model="currentPageSize"
          @change="emit('changePageSize', currentPageSize)"
        >
          <option v-for="option in props.pageSizeOptions" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="sm:ml-auto inline-flex items-center space-x-2">
        <button
          v-if="props.showFirstPage"
          type="button"
          class="bh-page-item first-page"
          :class="{ disabled: currentPage <= 1 }"
          @click="(currentPage = 1), emit('changePage', currentPage)"
        >
          <span v-if="props.firstArrow" v-html="props.firstArrow"> </span>
          <slot v-else name="first-arrow">
            <FirstArrow />
          </slot>
        </button>
        <button
          type="button"
          class="bh-page-item previous-page"
          :class="{ disabled: currentPage <= 1 }"
          @click="previousPage"
        >
          <span v-if="props.previousArrow" v-html="props.previousArrow"> </span>
          <PrevArrow  />
        </button>

        <template v-if="props.showNumbers">
          <button
            v-for="page in paging"
            :key="page"
            type="button"
            class="bh-page-item"
            :class="{
              disabled: currentPage === page,
              'bh-active': page === currentPage
            }"
            @click="movePage(page)"
          >
            {{ page }}
          </button>
        </template>

        <button
          type="button"
          class="bh-page-item next-page"
          :class="{ disabled: currentPage >= maxPage }"
          @click="nextPage"
        >
          <span v-if="props.nextArrow" v-html="props.nextArrow"> </span>
          <LastArrow v-else />
        </button>

        <button
          v-if="props.showLastPage"
          type="button"
          class="bh-page-item last-page"
          :class="{ disabled: currentPage >= maxPage }"
          @click="(currentPage = maxPage), emit('changePage', currentPage)"
        >
          <span v-if="props.lastArrow" v-html="props.lastArrow"> </span>
          <NextArrow v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent } from 'vue'
const FirstArrow = defineAsyncComponent(() => import('@/assets/icons/FirstArrow.vue'))
const PrevArrow = defineAsyncComponent(() => import('@/assets/icons/PrevArrow.vue'))
const LastArrow = defineAsyncComponent(() => import('@/assets/icons/LastArrow.vue'))
const NextArrow = defineAsyncComponent(() => import('@/assets/icons/NextArrow.vue'))

const props = withDefaults(
  defineProps<{
    currentLoader?: boolean
    totalRows?: number
    rows?: Array<any>
    offset?: number
    limit?: number
    page?: number
    paginationInfo?: string // default: "Showing {0} to {1} of {2} entries"
    showPageSize: boolean
    pageSizeOptions?: Array<number> // default: [10, 20, 30, 50, 100]
    showFirstPage?: boolean
    showLastPage?: boolean
    firstArrow?: string
    lastArrow?: string
    nextArrow?: string
    previousArrow?: string
    showNumbers?: boolean
    showNumbersCount?: number
    pageSize?: number // default: 10
    pagination?: boolean
    isServerMode?: boolean
  }>(),
  {
    currentLoader: false,
    totalRows: 0,
    rows: () => [],
    offset: 0,
    limit: 0,
    page: 1,
    paginationInfo: 'Showing {0} to {1} of {2} entries',
    showPageSize: true,
    pageSizeOptions: () => [10, 20, 30, 50, 100],
    showFirstPage: true,
    showLastPage: true,
    firstArrow: '',
    lastArrow: '',
    nextArrow: '',
    previousArrow: '',
    showNumbers: true,
    showNumbersCount: 5,
    pageSize: 10,
    pagination: true,
    isServerMode: false
  }
)

const emit: any = defineEmits(['changePageSize', 'changePage'])

const currentPage = ref(props?.page)
const currentPageSize = ref(props.pagination ? props?.pageSize : props?.rows?.length)
const filterRowCount = ref(props?.totalRows)

const stringFormat = (template: string, ...args: any[]) => {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
}

// Maximum number of pages
const maxPage = computed(() => {
  const totalPages =
    <number>currentPageSize?.value < 1
      ? 1
      : Math.ceil(<number>filterRowCount.value / <number>currentPageSize?.value)
  return Math.max(totalPages || 0, 1)
})

// Paging array
const paging = computed(() => {
  let startPage: number, endPage: number
  let isMaxSized =
    typeof props.showNumbersCount !== 'undefined' && <number>props.showNumbersCount < maxPage.value
  // recompute if maxSize
  if (isMaxSized) {
    // Current page is displayed in the middle of the visible ones
    startPage = Math.max(currentPage.value - Math.floor(<number>props.showNumbersCount / 2), 1)
    endPage = startPage + <number>props.showNumbersCount - 1

    // Adjust if limit is exceeded
    if (endPage > maxPage.value) {
      endPage = maxPage.value
      startPage = endPage - <number>props.showNumbersCount + 1
    }
  } else {
    startPage = 1
    endPage = maxPage.value
  }

  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i)

  return pages
})

// page change
const movePage = (page: number) => {
  currentPage.value = page
  emit('changePage', page)
}

// next page
const nextPage = () => {
  if (currentPage.value >= maxPage.value) {
    return false
  }
  currentPage.value++
  emit('changePage', currentPage.value)
}

// previous page
const previousPage = () => {
  if (currentPage.value == 1) {
    return false
  }
  currentPage.value--
  emit('changePage', currentPage.value)
}
</script>
