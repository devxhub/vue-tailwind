import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhTabs from '@/components/DxhTabs.vue'

describe('DxhTabs.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DxhTabs, {
      props: {
        direction: 'horizontal',
        items: [
          { id: 1, label: 'Tab 1', content: 'Content 1' },
          { id: 2, label: 'Tab 2', content: 'Content 2' }
        ],
        defaultActive: 1
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with correct initial state', () => {
    const tab1 = wrapper.find('[data-test="tab-1"]')
    const tab2 = wrapper.find('[data-test="tab-2"]')
    const content = wrapper.find('[data-test="tab-content"]')

    expect(tab1.classes()).toContain('border-black')
    expect(tab2.classes()).not.toContain('border-black')
    expect(content.text()).toBe('Content 1')
  })

  it('changes active tab on click', async () => {
    const tab1 = wrapper.find('[data-test="tab-1"]')
    const tab2 = wrapper.find('[data-test="tab-2"]')
    const content = wrapper.find('[data-test="tab-content"]')

    await tab2.trigger('click')

    expect(tab1.classes()).not.toContain('border-black')
    expect(tab2.classes()).toContain('border-black')
    expect(content.text()).toBe('Content 2')
  })
})
