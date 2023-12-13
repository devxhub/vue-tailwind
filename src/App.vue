<template>
  <div>
    <Pagination
      :loading="loading"
      :totalRows="totalRows"
      :rows="rows"
      :page="page"
      :paginationInfo="paginationInfo"
      :showPageSize="showPageSize"
      :pageSizeOptions="pageSizeOptions"
      :showFirstPage="showFirstPage"
      :showLastPage="showLastPage"
      :firstArrow="firstArrow"
      :lastArrow="lastArrow"
      :nextArrow="nextArrow"
      :previousArrow="previousArrow"
      :showNumbers="showNumbers"
      :showNumbersCount="showNumbersCount"
      :pageSize="pageSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Pagination from './components/DxhPagination.vue'

const loading = ref(false)
const totalRows = ref(100)
const rows = ref([])
const page = ref(1)
const paginationInfo = ref('Showing {0} to {1} of {2} entries')
const showPageSize = ref(true)
const pageSizeOptions = ref([10, 20, 30, 50])
const showFirstPage = ref(true)
const showLastPage = ref(true)
const firstArrow = ref('')
const lastArrow = ref('')
const nextArrow = ref('')
const previousArrow = ref('')
const showNumbers = ref(true)
const showNumbersCount = ref(5)
const pageSize = ref(10)
</script>
