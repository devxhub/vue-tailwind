<template>
  <div :class="{ 'pointer-events-none': loading }">
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
          @change="changePageSize(currentPageSize)"
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
          @click="(currentPage = 1), changePage(currentPage)"
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
          <slot v-else name="prev-arrow">
            <PrevArrow />
          </slot>
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
          <slot v-else name="last-arrow">
            <LastArrow />
          </slot>
        </button>

        <button
          v-if="props.showLastPage"
          type="button"
          class="bh-page-item last-page"
          :class="{ disabled: currentPage >= maxPage }"
          @click="(currentPage = maxPage), changePage(currentPage)"
        >
          <span v-if="props.lastArrow" v-html="props.lastArrow"> </span>
          <slot v-else name="next-arrow">
            <NextArrow />
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent, watch, onMounted } from 'vue'
const FirstArrow = defineAsyncComponent(() => import('@/assets/icons/FirstArrow.vue'))
const PrevArrow = defineAsyncComponent(() => import('@/assets/icons/PrevArrow.vue'))
const LastArrow = defineAsyncComponent(() => import('@/assets/icons/LastArrow.vue'))
const NextArrow = defineAsyncComponent(() => import('@/assets/icons/NextArrow.vue'))

const props = withDefaults(
  defineProps<{
    loading?: boolean
    totalRows?: number
    rows?: Array<any>
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
  }>(),
  {
    loading: false,
    totalRows: 0,
    rows: () => [],
    page: 10,
    paginationInfo: 'Showing {0} to {1} of {2} entries',
    showPageSize: true,
    pageSizeOptions: () => [10, 20, 30, 50],
    showFirstPage: true,
    showLastPage: true,
    firstArrow: '',
    lastArrow: '',
    nextArrow: '',
    previousArrow: '',
    showNumbers: true,
    showNumbersCount: 5,
    pageSize: 10
  }
)

const currentPage = ref(props?.page)
const currentPageSize = ref(props?.pageSize ? props?.pageSize : props?.rows?.length)
const filterRowCount = ref(props?.totalRows)

const stringFormat = (template: string, ...args: any[]) => {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
}

// The starting value of the page number
const offset = computed(() => {
  return (currentPage.value - 1) * <number>currentPageSize.value + 1
})

// Maximum number of pages
const limit = computed(() => {
  const limit = currentPage.value * <number>currentPageSize.value
  return <number>filterRowCount.value >= limit ? limit : filterRowCount.value
})

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

// pagesize changed
const changePageSize = (currentSize: any) => {
  currentPage.value = 1
  currentPageSize.value = currentSize
}
watch(() => currentPageSize.value, changePageSize)

// page change
const changePage = (page: any) => {
  currentPage.value = page
}

watch(() => currentPage.value, changePage)

const movePage = (page: number) => {
  currentPage.value = page
  changePage(page)
}

// next page
const nextPage = () => {
  if (currentPage.value >= maxPage.value) {
    return false
  }
  currentPage.value++
  changePage(currentPage.value)
}

// previous page
const previousPage = () => {
  if (currentPage.value == 1) {
    return false
  }
  currentPage.value--
  changePage(currentPage.value)
}
</script>

<style scoped>
.bh-page-item {
  display: grid;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.bh-page-item.disabled:not(.bh-active) {
  pointer-events: none;
  opacity: 0.5;
}
.bh-page-item.bh-active {
  padding: 0px 5px;
  border-radius: 3px;
  background-color: #00050b30;
}
</style>
