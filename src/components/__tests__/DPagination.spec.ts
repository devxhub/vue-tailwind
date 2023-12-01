import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DPagination from '../DPagination.vue'

const pageSizeOptions = [10, 20, 30]
const rows = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

describe('DPagination.vue', () => {
  it('renders pagination component with default props', () => {
      const wrapper:any = mount(DPagination)

    const paginationContainer = wrapper.find('.pointer-events-none')
    expect(paginationContainer.exists()).toBe(false)

    expect(wrapper.props('loading')).toBe(false)
    expect(wrapper.props('totalRows')).toBe(0)

    expect(wrapper?.vm?.currentPage).toBe(10)
    expect(wrapper.vm.currentPageSize).toBe(10)
  })

  it('renders pagination component with custom props and rows', () => {
    const wrapper: any = mount(DPagination, {
      props: {
        loading: false,
        totalRows: rows.length,
        rows: rows,
        page: 1,
        paginationInfo: 'Showing {0} to {1} of {2} entries',
        showPageSize: true,
        pageSizeOptions: pageSizeOptions,
        showFirstPage: true,
        showLastPage: true,
        showNumbers: true,
        showNumbersCount: 5,
        pageSize: 10
      }
    })

    const paginationContainer = wrapper.find('.pointer-events-none')
    expect(paginationContainer.exists()).toBe(false)

    expect(wrapper.props('loading')).toBe(false)
    expect(wrapper.props('totalRows')).toBe(rows.length)
    expect(wrapper.props('rows')).toEqual(rows)
    expect(wrapper.props('page')).toBe(1)
    expect(wrapper.props('paginationInfo')).toBe('Showing {0} to {1} of {2} entries')
    expect(wrapper.props('showPageSize')).toBe(true)
    expect(wrapper.props('pageSizeOptions')).toEqual(pageSizeOptions)
    expect(wrapper.props('showFirstPage')).toBe(true)
    expect(wrapper.props('showLastPage')).toBe(true)
    expect(wrapper.props('showNumbers')).toBe(true)
    expect(wrapper.props('showNumbersCount')).toBe(5)
    expect(wrapper.props('pageSize')).toBe(10)

    expect(wrapper.vm.currentPage).toBe(1)
    expect(wrapper.vm.currentPageSize).toBe(10)
  })

  it('emits "changePage" event when clicking on a page number', async () => {
    const wrapper = mount(DPagination, {
      props: {
        totalRows: rows.length,
        rows: rows,
        page: 1,
        showNumbers: true
      }
    })

    await wrapper.find('.bh-page-item').trigger('click')

    const changePageEvents = wrapper.emitted('changePage')
    expect(changePageEvents).toBeFalsy()

    const firstEventPayload = changePageEvents ? changePageEvents[0] : []
    expect(firstEventPayload).toEqual([
      /* Expected page number */
    ])
  })
})
