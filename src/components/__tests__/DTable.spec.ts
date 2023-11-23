import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ColumnHeader from '../data-table/ColumnHeader.vue'
import ColumnFilter from '../data-table/ColumnFilter.vue'
import FooterPagination from '../data-table/FooterPagination.vue'
import DTable from '../data-table/DTable.vue'

describe('ColumnFilter.vue', () => {
  // Mock data for testing
  const propsData = {
    column: {
      type: 'string',
      condition: 'contain',
      value: ''
    },
    columnFilterLang: {
      no_filter: 'No filter',
      contain: 'Contain',
      not_contain: 'Not contain',
      equal: 'Equal',
      not_equal: 'Not equal',
      start_with: 'Starts with',
      end_with: 'Ends with',
      greater_than: 'Greater than',
      greater_than_equal: 'Greater than or equal',
      less_than: 'Less than',
      less_than_equal: 'Less than or equal',
      is_null: 'Is null',
      is_not_null: 'Not null'
    }
  }

  const wrapper: any = mount(ColumnFilter, { props: propsData })

  // Test for rendering with correct props
  it('renders with correct props', async () => {
    // Check if the component renders with the correct props
    expect(wrapper.props()).toEqual(propsData)
  })

  // Test for selecting a filter condition
  it('emits filterChange event when a filter condition is selected', async () => {
    // You can simulate the user selecting a filter condition, e.g., 'contain'
    await wrapper.find('button.active').trigger('click')

    // Check if the filterChange event is emitted with the correct data
    expect(wrapper.emitted().filterChange).toBeTruthy()
    expect(wrapper.emitted().filterChange[0][0]).toEqual({
      type: 'string',
      condition: 'contain',
      value: ''
    })
  })
})

describe('ColumnHeader.vue', () => {
  // Mock data for testing
  const propsData = {
    all: {
      hasCheckbox: true,
      stickyHeader: true,
      stickyFirstColumn: false,
      columns: [
        { field: 'id', title: 'ID', hide: false, sort: true, width: '100px' },
        { field: 'name', title: 'Name', hide: false, sort: true, width: '150px' }
        // Add more sample columns as needed
      ]
      // Add other props as needed
    },
    currentSortColumn: 'id',
    currentSortDirection: 'asc',
    isOpenFilter: null,
    isFooter: false,
    checkAll: 0,
    columnFilterLang: 'en' // Replace with your language preference
  }

  const wrapper = mount(ColumnHeader, { props: propsData })

  // Test for rendering with correct props
  it('renders with correct props', async () => {
    // Check if the component renders with the correct props
    expect(wrapper.props()).toEqual(propsData)
  })

  // Test for selectAll event
  it('emits selectAll event when checkbox is clicked', async () => {
    await wrapper.find('#select').trigger('click')
    expect(wrapper.emitted().selectAll).toBeTruthy()
  })
})

describe('FooterPagination.vue', () => {
  it('renders correctly', () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 1,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper = mount(FooterPagination, { props })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('displays the correct initial page information', () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 1,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper = mount(FooterPagination, { props })

    expect(wrapper.find('.bh-pagination-info').text()).toContain('Showing 1 to 10 of 100 entries')
  })

  it('emits "changePage" event when a page button is clicked', async () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 1,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper: any = mount(FooterPagination, { props })

    await wrapper.find('.bh-page-item:nth-child(1)').trigger('click')

    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0][0]).toBe(1)
  })

  it('emits "changePage" event when "Next" button is clicked', async () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 1,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper: any = mount(FooterPagination, { props })

    await wrapper.find('.bh-page-item.next-page').trigger('click')

    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0][0]).toBe(2)
  })

  it('emits "changePage" event when "Previous" button is clicked', async () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 2,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper: any = mount(FooterPagination, { props })

    await wrapper.find('.bh-page-item.previous-page').trigger('click')

    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0][0]).toBe(1)
  })

  it('emits "changePage" event when "First" button is clicked', async () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 2,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper: any = mount(FooterPagination, { props })

    await wrapper.find('.bh-page-item.first-page').trigger('click')

    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0][0]).toBe(1)
  })

  it('emits "changePage" event when "Last" button is clicked', async () => {
    const props = {
      totalRows: 100,
      offset: 1,
      limit: 10,
      page: 1,
      showPageSize: true,
      pageSizeOptions: [10, 20, 30]
    }

    const wrapper: any = mount(FooterPagination, { props })

    await wrapper.find('.bh-page-item.last-page').trigger('click')

    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0][0]).toBe(10)
  })
})

describe('DTable.vue', () => {
  it('renders with correct props and emits change event', async () => {
    // Mock data for testing
    const propsData = {
      loading: false,
      isServerMode: false,
      skin: 'bh-table-striped bh-table-hover',
      totalRows: 100,
      rows: [
        { id: 1, name: 'John Doe', age: 25 }
        // Add more sample rows as needed
      ],
      columns: [
        { field: 'id', label: 'ID' },
        { field: 'name', label: 'Name' },
        { field: 'age', label: 'Age' }
        // Add more sample columns as needed
      ],
      hasCheckbox: true,
      search: 'Sample Search',
      columnChooser: false,
      page: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 30, 50, 100],
      showPageSize: true,
      rowClass: null,
      cellClass: null,
      sortable: true,
      sortColumn: 'id',
      sortDirection: 'asc',
      columnFilter: true,
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
    }

    const wrapper = mount(DTable, { props: propsData })
    // Check if the component renders with the correct props
    expect(wrapper.props()).toEqual(propsData)
  })

  // Test for the "change" event
  it('emits the "change" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('change')
    expect(wrapper.emitted().change).toBeTruthy()
  })

  // Test for the "sortChange" event
  it('emits the "sortChange" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('sortChange')
    expect(wrapper.emitted().sortChange).toBeTruthy()
  })

  // Test for the "searchChange" event
  it('emits the "searchChange" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('searchChange')
    expect(wrapper.emitted().searchChange).toBeTruthy()
  })

  // Test for the "pageChange" event
  it('emits the "pageChange" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('pageChange')
    expect(wrapper.emitted().pageChange).toBeTruthy()
  })

  // Test for the "pageSizeChange" event
  it('emits the "pageSizeChange" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('pageSizeChange')
    expect(wrapper.emitted().pageSizeChange).toBeTruthy()
  })

  // Test for the "rowSelect" event
  it('emits the "rowSelect" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('rowSelect')
    expect(wrapper.emitted().rowSelect).toBeTruthy()
  })

  // Test for the "filterChange" event
  it('emits the "filterChange" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('filterChange')
    expect(wrapper.emitted().filterChange).toBeTruthy()
  })

  // Test for the "rowClick" event
  it('emits the "rowClick" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('rowClick')
    expect(wrapper.emitted().rowClick).toBeTruthy()
  })

  // Test for the "rowDBClick" event
  it('emits the "rowDBClick" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('rowDBClick')
    expect(wrapper.emitted().rowDBClick).toBeTruthy()
  })

  // Test for the "changePageSize" event
  it('emits the "changePageSize" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('changePageSize')
    expect(wrapper.emitted().changePageSize).toBeTruthy()
  })

  // Test for the "changePage" event
  it('emits the "changePage" event when triggered', async () => {
    const wrapper = mount(DTable)
    await wrapper.vm.$emit('changePage')
    expect(wrapper.emitted().changePage).toBeTruthy()
  })

  it('renders table with correct number of rows', async () => {
    const wrapper = mount(DTable, {
      props: {
        rows: [
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Doe', age: 25 }
        ],
        columns: [
          { field: 'id', type: 'number' },
          { field: 'name', type: 'string' },
          { field: 'age', type: 'number' }
        ]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('tbody tr').length).toBe(2)
  })
})
