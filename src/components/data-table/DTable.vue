<template>
  <div class="relative">
    <div
      :class="{ 'min-h-[300px]': currentLoader }"
      :style="{ height: props.stickyHeader && props.height }"
    >
      <table :class="[props.skin]">
        <thead v-if="header" :class="{ 'sticky top-0 z-10': props.stickyHeader }">
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
                props.selectRowOnClick ? 'cursor-pointer' : ''
              ]"
              @click.prevent="rowClick(item, i)"
            >
              <td
                v-if="props.hasCheckbox"
                :class="{
                  'sticky left-0 bg-blue-100': props.stickyFirstColumn
                }"
              >
                <div>
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
                    j === 0 && props.stickyFirstColumn ? 'sticky left-0 bg-blue-100' : '',
                    props.hasCheckbox && j === 0 && props.stickyFirstColumn ? 'left-[52px]' : '',
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
            <tr v-for="i in props.pageSize" :key="i">
              <td :colspan="props.columns.length + 1">
                <div class="bh-skeleton-box bh-h-8"></div>
              </td>
            </tr>
          </template>
        </tbody>

        <tfoot v-if="props.cloneHeaderInFooter" :class="{ 'sticky bottom-0': props.stickyHeader }">
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
        class="absolute inset-0 bg-blue-100/50 grid place-content-center"
      >
        <icon-loader />
      </div>
    </div>
    <FooterPagination
      v-if="props.pagination && filterRowCount"
      :currentLoader="currentLoader"
      :totalRows="props.totalRows"
      :offset="offset"
      :limit="limit"
      :page="props.page"
      :paginationInfo="props.paginationInfo"
      :showPageSize="props.showPageSize"
      :pageSizeOptions="props.pageSizeOptions"
      :showFirstPage="props.showFirstPage"
      :showLastPage="props.showLastPage"
      :firstArrow="props.firstArrow"
      :lastArrow="props.lastArrow"
      :nextArrow="props.nextArrow"
      :previousArrow="props.previousArrow"
      :showNumbers="props.showNumbers"
      :showNumbersCount="props.showNumbersCount"
      :pageSize="props.pageSize"
      :pagination="props.pagination"
      :isServerMode="props.isServerMode"
      @changePageSize="changePageSize"
      @changePage="changePage"
    >
    </FooterPagination>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type Ref, ref, useSlots, watch, defineAsyncComponent } from 'vue'
const FooterPagination = defineAsyncComponent(() => import('./FooterPagination.vue'))
const ColumnHeader = defineAsyncComponent(() => import('./ColumnHeader.vue'))
const IconCheck = defineAsyncComponent(() => import('@/assets/icons/IconCheck.vue'))
const IconLoader = defineAsyncComponent(() => import('@/assets/icons/IonLoader.vue'))

const slots = useSlots()
const props = withDefaults(
  defineProps<{
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
    header?: boolean
    selectRowOnClick?: boolean
  }>(),
  {
    loading: false,
    isServerMode: false,
    skin: 'bh-table-striped',
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
    header: true,
    selectRowOnClick: false
  }
)

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
  'rowDBClick',
  'changePageSize',
  'changePage'
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

const uniqueKey: any = computed(() => {
  const col = props.columns.find((d) => d.isUnique)

  return col?.field || null
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

// page changed
const changePage = (page: any) => {
  selectAll(false)

  if (props.isServerMode) {
    changeForServer('page')
    currentPage.value = page
  } else {
    filterRows()
    currentPage.value = page
    emit('pageChange', page)
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
const changePageSize = (currentSize: any) => {
  selectAll(false)
  if (props.isServerMode) {
    currentPageSize.value = currentSize
    // for server side paginations
    if (currentPage.value === 1) {
      changeForServer('pagesize', true)
    } else {
      currentPage.value = 1 // changeForServer method call when currentPage change
    }
  } else {
    currentPage.value = 1
    currentPageSize.value = currentSize
    filterRows()
    emit('pageSizeChange', currentPageSize)
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
table {
  width: 100%;
  max-width: 100%;
}
table tbody tr td,
table tfoot tr th,
table thead tr th {
  text-align: left;
  padding: 0.5rem;
}
table tbody tr {
  border-bottom-width: 1px;
  border-style: solid;
}
table.bh-table-striped tbody tr:nth-child(odd) {
  background-color: #e0e6ed26;
}
table tbody tr td,
table thead tr th {
  border-width: 1px;
  border-style: solid;
}
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
button,
input {
  outline: 2px solid #0000;
  outline-offset: 2px;
}
input[type='checkbox'] {
  position: absolute;
  opacity: 0;
}
input[type='checkbox'],
input[type='checkbox'] + div {
  height: 1.25rem;
  width: 1.25rem;
}
input[type='checkbox'] + div {
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
input[type='checkbox'] + div svg {
  pointer-events: none;
  display: none;
  height: 0.75rem;
  width: 0.75rem;
  fill: currentColor;
}
input[type='checkbox']:checked + div,
input[type='checkbox']:indeterminate + div {
  border-color: rgb(67 97 238);
  background-color: rgb(67 97 238);
}
input[type='checkbox']:checked + div svg.check,
input[type='checkbox']:indeterminate + div svg.intermediate {
  display: flex;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
</style>
