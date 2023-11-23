<template>
  <div class="bh-pagination bh-py-5" :class="{ 'bh-pointer-events-none': currentLoader }">
    <div class="bh-flex bh-items-center bh-flex-wrap bh-flex-col sm:bh-flex-row bh-gap-4">
      <div class="bh-pagination-info bh-flex bh-items-center">
        <span class="bh-mr-2">
          {{
            stringFormat(props.paginationInfo, filterRowCount ? offset : 0, limit, filterRowCount)
          }}
        </span>
        <select
          v-if="props.showPageSize"
          v-model="currentPageSize"
          @change="emit('changePageSize', currentPageSize)"
          class="bh-pagesize"
        >
          <option v-for="option in props.pageSizeOptions" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="bh-pagination-number sm:bh-ml-auto bh-inline-flex bh-items-center bh-space-x-1">
        <button
          v-if="props.showFirstPage"
          type="button"
          class="bh-page-item first-page"
          :class="{ disabled: currentPage <= 1 }"
          @click="(currentPage = 1), emit('changePage', currentPage)"
        >
          <span v-if="props.firstArrow" v-html="props.firstArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </g>
          </svg>
        </button>
        <button
          type="button"
          class="bh-page-item previous-page"
          :class="{ disabled: currentPage <= 1 }"
          @click="previousPage"
        >
          <span v-if="props.previousArrow" v-html="props.previousArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
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
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>

        <button
          v-if="props.showLastPage"
          type="button"
          class="bh-page-item last-page"
          :class="{ disabled: currentPage >= maxPage }"
          @click="(currentPage = maxPage), emit('changePage', currentPage)"
        >
          <span v-if="props.lastArrow" v-html="props.lastArrow"> </span>
          <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
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
})

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
