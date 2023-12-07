import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhCollapse from '@/components/DxhCollapse.vue'

describe('DxhCollapse.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DxhCollapse, {
      props: {
        items: [
          { id: 1, header: 'Header 1', content: 'Content 1' },
          { id: 2, header: 'Header 2', content: 'Content 2' }
        ],
        defaultActiveKey: 1,
        collapsible: 'header',
        expandIconPosition: 'left'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with correct initial state', () => {
    const header1 = wrapper.find('[data-test="collapse-item-header-1"]')
    const header2 = wrapper.find('[data-test="collapse-item-header-2"]')
    const content1 = wrapper.find('[data-test="collapse-item-content-1"]')
    const content2 = wrapper.find('[data-test="collapse-item-content-2"]')

    expect(header1.classes()).toContain('bg-gray-200')
    expect(content1.exists()).toBe(true)

    expect(content2.exists()).toBe(false)
  })

  it('toggles active item on header click', async () => {
    const header2 = wrapper.find('[data-test="collapse-item-header-2"]')
    const content2 = wrapper.find('[data-test="collapse-item-content-2"]')

    await header2.trigger('click')

    expect(header2.classes()).toContain('bg-gray-200')
    expect(content2.exists()).toBe(false)

    const header1 = wrapper.find('[data-test="collapse-item-header-1"]')
    const content1 = wrapper.find('[data-test="collapse-item-content-1"]')
    expect(header1.classes()).toContain('bg-gray-200')
    expect(content1.exists()).toBe(true)
  })

  it('emits change event on item click', async () => {
    const header2 = wrapper.find('[data-test="collapse-item-header-2"]')

    await header2.trigger('click')

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual([1, 2])
  })

  it('handles click on expand icon', async () => {
    const expandIcon2 = wrapper.find('[data-test="collapse-item-expand-icon-2"]')
    const content2 = wrapper.find('[data-test="collapse-item-content-2"]')

    await expandIcon2.trigger('click')

    const header2 = wrapper.find('[data-test="collapse-item-header-2"]')
    expect(header2.classes()).toContain('bg-gray-200')
    expect(content2.exists()).toBe(false)

    const header1 = wrapper.find('[data-test="collapse-item-header-1"]')
    const content1 = wrapper.find('[data-test="collapse-item-content-1"]')
    expect(header1.classes()).toContain('bg-gray-200')
    expect(content1.exists()).toBe(true)
  })
})
