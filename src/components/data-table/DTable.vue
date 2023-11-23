<template>
  <div class="bh-datatable bh-antialiased bh-relative bh-text-black bh-text-sm bh-font-normal">
    <div
      class="bh-table-responsive"
      :class="{ 'bh-min-h-[300px]': currentLoader }"
      :style="{ height: props.stickyHeader && props.height }"
    >
      <table :class="[props.skin]">
        <thead :class="{ 'bh-sticky bh-top-0 bh-z-10': props.stickyHeader }">
          <column-header
            :all="props"
            :currentSortColumn="currentSortColumn"
            :currentSortDirection="currentSortDirection"
            :isOpenFilter="isOpenFilter"
            :checkAll="selectedAll"
            :columnFilterLang="props.columnFilterLang"
            @selectAll="selectAll"
            @sortChange="sortChange"
            @filterChange="filterChange"
            class="alt-pagination"
            @toggleFilterMenu="toggleFilterMenu"
          />
        </thead>
        <tbody>
          <template v-if="filterRowCount">
            <tr
              v-for="(item, i) in filterItems"
              :key="item[uniqueKey] ? item[uniqueKey] : i"
              :class="[
                typeof props.rowClass === 'function' ? rowClass(item) : props.rowClass,
                props.selectRowOnClick ? 'bh-cursor-pointer' : ''
              ]"
              @click.prevent="rowClick(item, i)"
            >
              <td
                v-if="props.hasCheckbox"
                :class="{
                  'bh-sticky bh-left-0 bh-bg-blue-light': props.stickyFirstColumn
                }"
              >
                <div class="bh-checkbox">
                  <input
                    v-model="selected"
                    type="checkbox"
                    :value="item[uniqueKey] ? item[uniqueKey] : i"
                    @click.stop
                  />
                  <div>
                    <icon-check class="check" />
                  </div>
                </div>
              </td>
              <template v-for="(col, j) in props.columns">
                <td
                  v-if="!col.hide"
                  :key="col.field"
                  :class="[
                    typeof props.cellClass === 'function' ? cellClass(item) : props.cellClass,
                    j === 0 && props.stickyFirstColumn
                      ? 'bh-sticky bh-left-0 bh-bg-blue-light'
                      : '',
                    props.hasCheckbox && j === 0 && props.stickyFirstColumn ? 'bh-left-[52px]' : '',
                    col.cellClass ? col.cellClass : ''
                  ]"
                >
                  <template v-if="slots[col.field]">
                    <slot :name="col.field" :value="item"></slot>
                  </template>
                  <div v-else-if="col.cellRenderer" v-html="col.cellRenderer(item)"></div>
                  <template v-else>
                    {{ cellValue(item, col.field) }}
                  </template>
                </td>
              </template>
            </tr>
          </template>
          <tr v-if="!filterRowCount && !currentLoader">
            <td :colspan="props.columns.length + 1">
              {{ props.noDataContent }}
            </td>
          </tr>

          <template v-if="!filterRowCount && currentLoader">
            <tr
              v-for="i in props.pageSize"
              :key="i"
              class="!bh-bg-white bh-h-11 !bh-border-transparent"
            >
              <td :colspan="props.columns.length + 1" class="!bh-p-0 !bh-border-transparent">
                <div class="bh-skeleton-box bh-h-8"></div>
              </td>
            </tr>
          </template>
        </tbody>

        <tfoot
          v-if="props.cloneHeaderInFooter"
          :class="{ 'bh-sticky bh-bottom-0': props.stickyHeader }"
        >
          <column-header
            :all="props"
            :currentSortColumn="currentSortColumn"
            :currentSortDirection="currentSortDirection"
            :isOpenFilter="isOpenFilter"
            :isFooter="true"
            :checkAll="selectedAll"
            @selectAll="selectAll"
            @sortChange="sortChange"
            @filterChange="filterChange"
            @toggleFilterMenu="toggleFilterMenu"
          />
        </tfoot>
      </table>

      <div
        v-if="filterRowCount && currentLoader"
        class="bh-absolute bh-inset-0 bh-bg-blue-light/50 bh-grid bh-place-content-center"
      >
        <icon-loader />
      </div>
    </div>
    <div
      v-if="props.pagination && filterRowCount"
      class="bh-pagination bh-py-5"
      :class="{ 'bh-pointer-events-none': currentLoader }"
    >
      <div class="bh-flex bh-items-center bh-flex-wrap bh-flex-col sm:bh-flex-row bh-gap-4">
        <div class="bh-pagination-info bh-flex bh-items-center">
          <span class="bh-mr-2">
            {{
              stringFormat(props.paginationInfo, filterRowCount ? offset : 0, limit, filterRowCount)
            }}
          </span>
          <select v-if="props.showPageSize" v-model="currentPageSize" class="bh-pagesize">
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
            @click="currentPage = 1"
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
            @click="currentPage = maxPage"
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
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type Ref, ref, useSlots, watch } from 'vue'
import columnHeader from './ColumnHeader.vue'
import iconCheck from '../../assets/icons/icon-check.vue'
import iconLoader from '../../assets/icons/icon-loader.vue'

const slots = useSlots()

interface Props {
  loading?: boolean
  isServerMode?: boolean
  skin?: string
  totalRows?: number
  rows?: Array<any>
  columns?: Array<any>
  hasCheckbox?: boolean
  search?: string
  columnChooser?: boolean
  page?: number // default: 1
  pageSize?: number // default: 10
  pageSizeOptions?: Array<number> // default: [10, 20, 30, 50, 100]
  showPageSize?: boolean
  rowClass?: any
  cellClass?: any
  sortable?: boolean
  sortColumn?: string
  sortDirection?: string
  columnFilter?: boolean
  columnFilterLang?: Record<string, string> | null
  pagination?: boolean
  showNumbers?: boolean
  showNumbersCount?: number
  showFirstPage?: boolean
  showLastPage?: boolean
  firstArrow?: string
  lastArrow?: string
  nextArrow?: string
  previousArrow?: string
  paginationInfo?: string // default: "Showing {0} to {1} of {2} entries"
  noDataContent?: string // default: "No data available",
  stickyHeader?: any
  height?: string // default 450px - only working with sticky headers
  stickyFirstColumn?: boolean
  cloneHeaderInFooter?: boolean
  selectRowOnClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isServerMode: false,
  skin: 'bh-table-striped bh-table-hover',
  totalRows: 0,
  rows: () => [],
  columns: () => [],
  hasCheckbox: false,
  search: '',
  columnChooser: false,
  page: 1,
  pageSize: 10,
  pageSizeOptions: () => [10, 20, 30, 50, 100],
  showPageSize: true,
  rowClass: <any>[],
  cellClass: <any>[],
  cellRenderer: null,
  sortable: false,
  sortColumn: 'id',
  sortDirection: 'asc',
  columnFilter: false,
  columnFilterLang: null,
  pagination: true,
  showNumbers: true,
  showNumbersCount: 5,
  showFirstPage: true,
  showLastPage: true,
  firstArrow: '',
  lastArrow: '',
  nextArrow: '',
  previousArrow: '',
  paginationInfo: 'Showing {0} to {1} of {2} entries',
  noDataContent: 'No data available',
  stickyHeader: false,
  height: '500px',
  stickyFirstColumn: false,
  cloneHeaderInFooter: false,
  selectRowOnClick: false
})

// set default columns values
for (const item of props.columns || []) {
  const type = item.type?.toLowerCase() || 'string'
  item.type = type
  item.isUnique = item.isUnique !== undefined ? item.isUnique : false
  item.hide = item.hide !== undefined ? item.hide : false
  item.filter = item.filter !== undefined ? item.filter : true
  item.search = item.search !== undefined ? item.search : true
  item.sort = item.sort !== undefined ? item.sort : true
  item.html = item.html !== undefined ? item.html : false
  item.condition = !type || type === 'string' ? 'contain' : 'equal'
}

const filterItems: Ref<Array<any>> = ref([])
const currentPage = ref(props?.page)
const currentPageSize = ref(props.pagination ? props?.pageSize : props?.rows?.length)
const oldPageSize = props?.pageSize
const currentSortColumn = ref(props?.sortColumn)
const oldSortColumn = props?.sortColumn
const currentSortDirection = ref(props?.sortDirection)
const oldSortDirection = props?.sortDirection
const filterRowCount = ref(props?.totalRows)
const selected: Ref<Array<any>> = ref([])
const selectedAll: any = ref(null)
const currentLoader = ref(props?.loading)
const currentSearch = ref(props?.search)
const oldColumns = JSON.parse(JSON.stringify(props?.columns))

const isOpenFilter: any = ref(null)

// row click
const timer: any = ref(null)
let clickCount: Ref<number> = ref(0)
const delay: Ref<number> = ref(230)

onMounted(() => {
  filterRows()
})
const emit = defineEmits([
  'change',
  'sortChange',
  'searchChange',
  'pageChange',
  'pageSizeChange',
  'rowSelect',
  'filterChange',
  'rowClick',
  'rowDBClick'
])
defineExpose({
  reset() {
    reset()
  },
  getSelectedRows() {
    return getSelectedRows()
  },
  getColumnFilters() {
    return getColumnFilters()
  },
  clearSelectedRows() {
    return clearSelectedRows()
  },
  selectRow(index: number) {
    selectRow(index)
  },
  unselectRow(index: number) {
    unselectRow(index)
  },
  isRowSelected(index: number) {
    return isRowSelected(index)
  },
  getFilteredRows() {
    return filteredRows()
  }
})

const stringFormat = (template: string, ...args: any[]) => {
  return template.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
}

const uniqueKey: any = computed(() => {
  const col = props.columns.find((d) => d.isUnique)

  return col?.field || null
})

// Maximum number of pages
const maxPage = computed(() => {
  const totalPages =
    <number>currentPageSize.value < 1
      ? 1
      : Math.ceil(<number>filterRowCount.value / <number>currentPageSize.value)
  return Math.max(totalPages || 0, 1)
})

// The starting value of the page number
const offset = computed(() => {
  return (currentPage.value - 1) * <number>currentPageSize.value + 1
})

// Maximum number of pages
const limit = computed(() => {
  const limit = currentPage.value * <number>currentPageSize.value
  return <number>filterRowCount.value >= limit ? limit : filterRowCount.value
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

const filteredRows = () => {
  let rows = props.rows || []

  if (!props.isServerMode) {
    props.columns?.forEach((d) => {
      if (
        d.filter &&
        ((d.value !== undefined && d.value !== null && d.value !== '') ||
          d.condition === 'is_null' ||
          d.condition == 'is_not_null')
      ) {
        // string filters
        if (d.type === 'string') {
          if (d.value && !d.condition) {
            d.condition = 'contain'
          }

          if (d.condition === 'contain') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field)
                ?.toString()
                .toLowerCase()
                .includes(d.value.toLowerCase())
            })
          } else if (d.condition === 'not_contain') {
            rows = rows.filter((item) => {
              return !cellValue(item, d.field)
                ?.toString()
                .toLowerCase()
                .includes(d.value.toLowerCase())
            })
          } else if (d.condition === 'equal') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field)?.toString().toLowerCase() === d.value.toLowerCase()
            })
          } else if (d.condition === 'not_equal') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field)?.toString().toLowerCase() !== d.value.toLowerCase()
            })
          } else if (d.condition == 'start_with') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field)
                  ?.toString()
                  .toLowerCase()
                  .indexOf(d.value.toLowerCase()) === 0
              )
            })
          } else if (d.condition == 'end_with') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field)
                  ?.toString()
                  .toLowerCase()
                  .substr(d.value.length * -1) === d.value.toLowerCase()
              )
            })
          }
        }
        // number filters
        else if (d.type === 'number') {
          if (d.value && !d.condition) {
            d.condition = 'equal'
          }

          if (d.condition === 'equal') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) === parseFloat(d.value)
              )
            })
          } else if (d.condition === 'not_equal') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) !== parseFloat(d.value)
              )
            })
          } else if (d.condition === 'greater_than') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) > parseFloat(d.value)
              )
            })
          } else if (d.condition === 'greater_than_equal') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) >= parseFloat(d.value)
              )
            })
          } else if (d.condition === 'less_than') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) < parseFloat(d.value)
              )
            })
          } else if (d.condition === 'less_than_equal') {
            rows = rows.filter((item) => {
              return (
                cellValue(item, d.field) &&
                parseFloat(cellValue(item, d.field)) <= parseFloat(d.value)
              )
            })
          }
        }
        // date filters
        else if (d.type === 'date') {
          if (d.value && !d.condition) {
            d.condition = 'equal'
          }

          if (d.condition === 'equal') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field) && dateFormat(cellValue(item, d.field)) === d.value
            })
          } else if (d.condition === 'not_equal') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field) && dateFormat(cellValue(item, d.field)) !== d.value
            })
          } else if (d.condition === 'greater_than') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field) && dateFormat(cellValue(item, d.field)) > d.value
            })
          } else if (d.condition === 'less_than') {
            rows = rows.filter((item) => {
              return cellValue(item, d.field) && dateFormat(cellValue(item, d.field)) < d.value
            })
          }
        }
        // boolean filters
        else if (d.type === 'bool') {
          rows = rows.filter((item) => {
            return cellValue(item, d.field) === d.value
          })
        }

        if (d.condition === 'is_null') {
          rows = rows.filter((item) => {
            return cellValue(item, d.field) == null || cellValue(item, d.field) == ''
          })
          d.value = ''
        } else if (d.condition === 'is_not_null') {
          d.value = ''
          rows = rows.filter((item) => {
            return cellValue(item, d.field)
          })
        }
      }
    })

    if (currentSearch.value && rows.length) {
      let final: Array<any> = []

      const keys = (props.columns || [])
        .filter((d) => d.search && !d.hide)
        .map((d) => {
          return d.field
        })

      for (var j = 0; j < rows.length; j++) {
        for (var i = 0; i < keys.length; i++) {
          if (
            cellValue(rows[j], keys[i])
              ?.toString()
              .toLowerCase()
              .includes(currentSearch.value.toLowerCase())
          ) {
            final.push(rows[j])
            break
          }
        }
      }

      rows = final
    }

    // sort rows
    var collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    })
    const sortOrder = currentSortDirection.value === 'desc' ? -1 : 1

    rows.sort((a: any, b: any): number => {
      const valA = currentSortColumn.value
        ?.split('.')
        .reduce((obj: any, key: string) => obj?.[key], a)
      const valB = currentSortColumn.value
        ?.split('.')
        .reduce((obj: any, key: string) => obj?.[key], b)

      return collator.compare(valA, valB) * sortOrder
    })
  }

  return rows
}

const filterRows = () => {
  let result = []
  let rows = filteredRows()

  if (props.isServerMode) {
    filterRowCount.value = props.totalRows || 0
    result = rows
  } else {
    filterRowCount.value = rows.length || 0
    result = rows.slice(offset.value - 1, <number>limit.value)
  }

  filterItems.value = result || []
}
watch(
  () => props.loading,
  () => {
    currentLoader.value = props.loading
  }
)

const toggleFilterMenu = (col: any) => {
  if (col) {
    if (isOpenFilter.value === col.field) {
      isOpenFilter.value = null
    } else {
      isOpenFilter.value = col.field
    }
  } else {
    isOpenFilter.value = null
  }
}

// previous page
const previousPage = () => {
  if (currentPage.value == 1) {
    return false
  }
  currentPage.value--
}

// page change
const movePage = (page: number) => {
  currentPage.value = page
}

// next page
const nextPage = () => {
  if (currentPage.value >= maxPage.value) {
    return false
  }
  currentPage.value++
}

// page changed
const changePage = () => {
  selectAll(false)

  if (props.isServerMode) {
    changeForServer('page')
  } else {
    filterRows()
    emit('pageChange', currentPage.value)
  }
}
watch(() => currentPage.value, changePage)

// row update
const changeRows = () => {
  if (!props.isServerMode) {
    currentPage.value = 1
  }
  selectAll(false)
  filterRows()
}
watch(() => props.rows, changeRows)

// pagesize changed
const changePageSize = () => {
  selectAll(false)

  if (props.isServerMode) {
    // for server side paginations
    if (currentPage.value === 1) {
      changeForServer('pagesize', true)
    } else {
      currentPage.value = 1 // changeForServer method call when currentPage change
    }
  } else {
    currentPage.value = 1
    filterRows()
    emit('pageSizeChange', currentPageSize.value)
  }
}
watch(() => currentPageSize.value, changePageSize)

// sorting
const sortChange = (field: string) => {
  let direction = 'asc'
  if (field == currentSortColumn.value) {
    if (currentSortDirection.value === 'asc') {
      direction = 'desc'
    }
  }
  let offset = (currentPage.value - 1) * <number>currentPageSize.value
  let limit = currentPageSize.value
  currentSortColumn.value = field
  currentSortDirection.value = direction

  selectAll(false)
  filterRows()

  if (props.isServerMode) {
    changeForServer('sort')
  } else {
    emit('sortChange', { offset, limit, field, direction })
  }
}

// checkboax
const checkboxChange = (value: any) => {
  selectedAll.value =
    value.length && filterItems.value.length && value.length === filterItems.value.length

  const rows = filterItems.value.filter((d, i) =>
    selected.value.includes(uniqueKey.value ? d[uniqueKey.value as never] : i)
  )

  emit('rowSelect', rows)
}
watch(() => selected.value, checkboxChange)
const selectAll = (value: any) => {
  if (value.checked) {
    selected.value = filterItems.value.map((d, i) =>
      uniqueKey.value ? d[uniqueKey.value as never] : i
    )
  } else {
    selected.value = []
  }
}

// columns filter
const filterChange = () => {
  selectAll(false)

  if (props.isServerMode) {
    // for server side paginations
    if (currentPage.value === 1) {
      changeForServer('filter', true)
    } else {
      currentPage.value = 1 // changeForServer method call when currentPage change
    }
  } else {
    currentPage.value = 1
    filterRows()
    emit('filterChange', props.columns)
  }
}

// search
const changeSearch = () => {
  selectAll(false)

  if (props.isServerMode) {
    // for server side paginations
    if (currentPage.value === 1) {
      changeForServer('search', true)
    } else {
      currentPage.value = 1 // changeForServer method call when currentPage change
    }
  } else {
    currentPage.value = 1
    filterRows()
    emit('searchChange', currentSearch.value)
  }
}

watch(
  () => props.search,
  () => {
    currentSearch.value = props.search
    changeSearch()
  }
)

const cellValue = (item: any, field: string | undefined) => {
  return field?.split('.').reduce((obj, key) => obj?.[key], item)
}

const dateFormat = (date: any) => {
  try {
    if (!date) {
      return ''
    }
    const dt = new Date(date)
    const day = dt.getDate()
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()

    return year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
  } catch {}
  return ''
}

//row click
const rowClick = (item: any, index: number) => {
  clickCount.value++

  if (clickCount.value === 1) {
    timer.value = setTimeout(() => {
      clickCount.value = 0

      if (props.selectRowOnClick) {
        if (isRowSelected(index)) {
          unselectRow(index)
        } else {
          selectRow(index)
        }

        checkboxChange(selected.value)
      }
      emit('rowClick', item)
    }, delay.value)
  } else if (clickCount.value === 2) {
    clearTimeout(timer.value)
    clickCount.value = 0
    emit('rowDBClick', item)
  }
}

// emit change event for server side pagination
const changeForServer = (changeType: string, isResetPage = false) => {
  if (props.isServerMode) {
    setDefaultCondition()

    const res = {
      current_page: isResetPage ? 1 : currentPage.value,
      pagesize: currentPageSize.value,
      offset: (currentPage.value - 1) * <number>currentPageSize.value,
      sort_column: currentSortColumn.value,
      sort_direction: currentSortDirection.value,
      search: currentSearch.value,
      column_filters: props.columns,
      change_type: changeType
    }
    emit('change', res)
  }
}

// set default conditions when values exists and condition empty
const setDefaultCondition = () => {
  for (let i = 0; i < props.columns.length; i++) {
    let d = props.columns[i]

    if (
      d.filter &&
      ((d.value !== undefined && d.value !== null && d.value !== '') ||
        d.condition === 'is_null' ||
        d.condition === 'is_not_null')
    ) {
      if (d.type === 'string' && d.value && !d.condition) {
        d.condition = 'contain'
      }
      if (d.type === 'number' && d.value && !d.condition) {
        d.condition = 'equal'
      }
      if (d.type === 'date' && d.value && !d.condition) {
        d.condition = 'equal'
      }
    }
  }
}

// methods
const reset = () => {
  selectAll(false)
  for (let i = 0; i < props.columns.length; i++) {
    props.columns[i] = oldColumns[i]
  }
  currentSearch.value = ''
  currentPageSize.value = oldPageSize
  currentSortColumn.value = oldSortColumn
  currentSortDirection.value = oldSortDirection

  if (props.isServerMode) {
    // for server side paginations
    if (currentPage.value === 1) {
      changeForServer('reset', true)
    } else {
      currentPage.value = 1 // changeForServer method call when currentPage change
    }
  } else {
    currentPage.value = 1
    filterRows()
  }
}
const getSelectedRows = () => {
  const rows = filterItems.value.filter((d, i) =>
    selected.value.includes(uniqueKey.value ? d[uniqueKey.value as never] : i)
  )
  return rows
}
const getColumnFilters = () => {
  return props.columns
}
const clearSelectedRows = () => {
  selected.value = []
}
const selectRow = (index: number) => {
  if (!isRowSelected(index)) {
    const rows = filterItems.value.find((d, i) => i === index)
    selected.value.push(uniqueKey.value ? rows[uniqueKey.value as never] : index)
  }
}
const unselectRow = (index: number) => {
  if (isRowSelected(index)) {
    const rows = filterItems.value.find((d, i) => i === index)
    selected.value = selected.value.filter(
      (d) => d !== (uniqueKey.value ? rows[uniqueKey.value as never] : index)
    )
  }
}
const isRowSelected = (index: number) => {
  const rows = filterItems.value.find((d, i) => i === index)

  if (rows) {
    return selected.value.includes(uniqueKey.value ? rows[uniqueKey.value as never] : index)
  }
  return false
}
</script>

<style>
*,
::backdrop,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: #3b82f680;
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}
*,
:after,
:before {
  border: 0 solid #0000;
  box-sizing: border-box;
}
.alt-pagination .bh-pagination .bh-page-item {
  @apply !w-max min-w-[32px] !rounded;
}
.bh-table-responsive {
  position: relative;
  width: 100%;
  overflow: auto;
  border-radius: 0.25rem;
}
.bh-table-responsive table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse !important;
}
.bh-table-responsive table tfoot tr,
.bh-table-responsive table thead tr {
  --tw-bg-opacity: 1;
  background-color: rgb(246 247 250 / var(--tw-bg-opacity));
}
.bh-table-responsive table tbody tr td,
.bh-table-responsive table tfoot tr th,
.bh-table-responsive table thead tr th {
  padding: 0.75rem 1rem;
  text-align: left;
}
.bh-table-responsive table tfoot tr th,
.bh-table-responsive table thead tr th {
  vertical-align: top;
  font-weight: 700;
}
.bh-table-responsive table tbody tr {
  border-bottom-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(246 247 250 / var(--tw-border-opacity));
}
.bh-table-responsive table.bh-table-striped tbody tr:nth-child(odd) {
  background-color: #e0e6ed26;
}
.bh-table-responsive table.bh-table-hover tbody tr:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
.bh-table-responsive table.bh-table-compact tbody tr td,
.bh-table-responsive table.bh-table-compact thead tr th {
  padding: 0.5rem 0.75rem;
}
.bh-table-responsive table.bh-table-bordered tbody tr td,
.bh-table-responsive table.bh-table-bordered thead tr th {
  border-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(246 247 250 / var(--tw-border-opacity));
}
.bh-pagination .bh-page-item {
  display: grid;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  place-content: center;
  border-radius: 9999px;
  border: 1px solid #0e17264d;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0.375rem 0.625rem;
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
  outline-width: 0;
}
.bh-pagination .bh-page-item:hover {
  --tw-border-opacity: 1;
  border-color: rgb(67 97 238 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(67 97 238 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  transition-duration: 0.2s;
}
.bh-pagination .bh-page-item {
  -webkit-appearance: button;
  background-image: none;
}
.bh-pagination .bh-page-item.disabled:not(.bh-active) {
  pointer-events: none;
  opacity: 0.5;
}
.bh-pagination .bh-page-item.bh-active {
  --tw-border-opacity: 1;
  border-color: rgb(67 97 238 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(67 97 238 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.bh-table-responsive button,
.bh-table-responsive input {
  outline: 2px solid #0000;
  outline-offset: 2px;
}
.bh-pagination-info .bh-pagesize {
  box-sizing: border-box;
  border-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(224 230 237 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0.375rem 0.5rem;
  font-weight: 400;
  --tw-text-opacity: 1;
  color: rgb(14 23 38 / var(--tw-text-opacity));
  outline-width: 0;
}
.bh-pagination-info .bh-pagesize:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
    var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: #e0e6ed66;
}
.bh-table-responsive table th .bh-filter {
  margin-top: 0.125rem;
  display: flex;
  height: 30px;
  align-items: center;
}
.bh-table-responsive table th .bh-filter,
.bh-table-responsive table th .bh-filter > .bh-form-control {
  width: 100%;
}
.bh-table-responsive table th .bh-filter > .bh-form-control {
  box-sizing: border-box;
  height: 100%;
  min-width: 60px;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(224 230 237 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  --tw-text-opacity: 1;
  color: rgb(14 23 38 / var(--tw-text-opacity));
  outline-width: 0;
}
.bh-table-responsive table th .bh-filter > .bh-form-control:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
    var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-color: #e0e6ed66;
}
.bh-table-responsive table th .bh-filter > select {
  border-radius: 0.25rem;
}
.bh-table-responsive table th .bh-filter > button {
  display: grid;
  height: 30px;
  width: 30px;
  flex-shrink: 0;
  cursor: pointer;
  place-content: center;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(224 230 237 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(224 230 237 / var(--tw-bg-opacity));
  color: #0e1726b3;
}
.bh-table-responsive table th .bh-filter > button:hover {
  color: #0e1726e6;
}
.bh-table-responsive table th .bh-filter > button {
  -webkit-appearance: button;
  background-image: none;
}
.bh-filter-menu button {
  display: flex;
  width: 100%;
  cursor: pointer;
  border: 1px solid #0000;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  padding: 0.375rem 1rem;
  text-align: left;
}
.bh-filter-menu button,
.bh-filter-menu button:hover {
  --tw-bg-opacity: 1;
}
.bh-filter-menu button:hover {
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  font-weight: 700;
}
.bh-filter-menu button {
  -webkit-appearance: button;
  background-image: none;
}
.bh-filter-menu button.active {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  font-weight: 700;
}
.bh-table-responsive input[type='checkbox'] {
  position: absolute;
  opacity: 0;
}
.bh-table-responsive input[type='checkbox'],
.bh-table-responsive input[type='checkbox'] + div {
  height: 1.25rem;
  width: 1.25rem;
}
.bh-table-responsive input[type='checkbox'] + div {
  display: grid;
  place-content: center;
  border-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgb(224 230 237 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bh-table-responsive input[type='checkbox'] + div svg {
  pointer-events: none;
  display: none;
  height: 0.75rem;
  width: 0.75rem;
  fill: currentColor;
  --tw-text-opacity: 1;
  color: rgb(67 97 238 / var(--tw-text-opacity));
}
.bh-table-responsive input[type='checkbox']:checked + div,
.bh-table-responsive input[type='checkbox']:indeterminate + div {
  --tw-border-opacity: 1;
  border-color: rgb(67 97 238 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(67 97 238 / var(--tw-bg-opacity));
}
.bh-table-responsive input[type='checkbox']:checked + div svg.check,
.bh-table-responsive input[type='checkbox']:indeterminate + div svg.intermediate {
  display: flex;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.bh-pointer-events-none {
  pointer-events: none;
}
.bh-absolute {
  position: absolute;
}
.bh-relative {
  position: relative;
}
.bh-sticky {
  position: sticky;
}
.bh-inset-0 {
  inset: 0;
}
.bh-bottom-0 {
  bottom: 0;
}
.bh-left-0 {
  left: 0;
}
.bh-left-\[52px\] {
  left: 52px;
}
.bh-right-0 {
  right: 0;
}
.bh-top-0 {
  top: 0;
}
.bh-top-full {
  top: 100%;
}
.bh-z-10 {
  z-index: 10;
}
.bh-z-\[1\] {
  z-index: 1;
}
.bh-mb-2 {
  margin-bottom: 0.5rem;
}
.bh-ml-3 {
  margin-left: 0.75rem;
}
.bh-mr-2 {
  margin-right: 0.5rem;
}
.bh-mt-1 {
  margin-top: 0.25rem;
}
.bh-flex {
  display: flex;
}
.bh-inline-flex {
  display: inline-flex;
}
.bh-grid {
  display: grid;
}
.bh-h-11 {
  height: 2.75rem;
}
.bh-h-8 {
  height: 2rem;
}
.bh-min-h-\[300px\] {
  min-height: 300px;
}
.bh-w-32 {
  width: 8rem;
}
.bh-w-4 {
  width: 1rem;
}
.bh-w-px {
  width: 1px;
}
.bh-cursor-pointer {
  cursor: pointer;
}
.bh-select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.bh-flex-col {
  flex-direction: column;
}
.bh-flex-wrap {
  flex-wrap: wrap;
}
.bh-place-content-center {
  place-content: center;
}
.bh-items-center {
  align-items: center;
}
.bh-gap-4 {
  gap: 1rem;
}
.bh-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * (1 - var(--tw-space-x-reverse)));
}
.bh-overflow-hidden {
  overflow: hidden;
}
.bh-rounded {
  border-radius: 0.25rem;
}
.bh-rounded-md {
  border-radius: 0.375rem;
}
.bh-border {
  border-width: 1px;
}
.bh-border-solid {
  border-style: solid;
}
.\!bh-border-transparent {
  border-color: #0000 !important;
}
.bh-border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
.\!bh-bg-white {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity)) !important;
}
.bh-bg-blue-light {
  --tw-bg-opacity: 1;
  background-color: rgb(246 247 250 / var(--tw-bg-opacity));
}
.bh-bg-blue-light\/50 {
  background-color: #f6f7fa80;
}
.bh-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.\!bh-p-0 {
  padding: 0 !important;
}
.bh-p-10 {
  padding: 2.5rem;
}
.bh-p-2 {
  padding: 0.5rem;
}
.bh-py-5 {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.bh-text-\[13px\] {
  font-size: 13px;
}
.bh-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.bh-font-normal {
  font-weight: 400;
}
.\!bh-text-primary {
  --tw-text-opacity: 1 !important;
  color: rgb(67 97 238 / var(--tw-text-opacity)) !important;
}
.bh-text-black {
  --tw-text-opacity: 1;
  color: rgb(14 23 38 / var(--tw-text-opacity));
}
.bh-text-black\/20 {
  color: #0e172633;
}
.bh-text-primary {
  --tw-text-opacity: 1;
  color: rgb(67 97 238 / var(--tw-text-opacity));
}
.bh-antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bh-shadow-md {
  --tw-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
.bh-outline-0 {
  outline-width: 0;
}
.bh-filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale)
    var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.bh-skeleton-box {
  position: relative;
  width: 100%;
  overflow: hidden;
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.bh-skeleton-box:after {
  position: absolute;
  inset: 0;
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
    skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
    scaleY(var(--tw-scale-y));
  animation: bhshimmer 2s infinite;
  background-image: linear-gradient(90deg, #0000, rgba(0, 0, 0, 0.025) 20%, #0000000d 50%, #0000);
  --tw-content: '';
  content: var(--tw-content);
}
@keyframes bhshimmer {
  to {
    transform: translateX(100%);
  }
}
.focus\:bh-border-gray-200:focus {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
@media (min-width: 640px) {
  .sm\:bh-ml-auto {
    margin-left: auto;
  }
  .sm\:bh-flex-row {
    flex-direction: row;
  }
}
</style>
