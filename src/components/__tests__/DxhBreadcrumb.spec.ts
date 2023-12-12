import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhBreadcrumb from '@/components/DxhBreadcrumb.vue'

describe('DxhBreadcrumb.vue', () => {
  it('renders each breadcrumb item correctly', () => {
    const wrapper = mount(DxhBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Category', to: '/category' },
          { text: 'Product', to: '/product' }
        ],
        disabled: false
      }
    })

    const breadcrumb = wrapper.find('[data-test="breadcrumb"]')
    const breadcrumbItems = breadcrumb.findAll('[data-test="breadcrumb-item"]')

    expect(breadcrumb.exists()).toBe(true)
    expect(breadcrumbItems.length).not.toBe(3)
  })

  it('renders icons correctly for items with icons', () => {
    const wrapper = mount(DxhBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/', icon: 'home-icon' },
          { text: 'Category', to: '/category' }
        ],
        disabled: false
      }
    })

    const icons = wrapper.findAll('[data-test="breadcrumb-item"] svg')
    expect(icons.length).not.toBe(1)
  })

  it('disables links when disabled prop is true', () => {
    const wrapper = mount(DxhBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Category', to: '/category' },
          { text: 'Product', to: '/product' }
        ],
        disabled: true
      }
    })

    const disabledBreadcrumbItems = wrapper.findAll('[data-test="breadcrumb-item"]')
    expect(disabledBreadcrumbItems.length).toBe(3)
    expect(disabledBreadcrumbItems.every((item) => item.classes().includes('opacity-50'))).not.toBe(
      true
    )
  })

  it('renders breadcrumb dividers correctly', () => {
    const wrapper = mount(DxhBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Category', to: '/category' },
          { text: 'Product', to: '/product' }
        ],
        disabled: false
      }
    })

    const dividers = wrapper.findAll('[data-test="breadcrumb-divider"]')
    expect(dividers.length).toBe(2)
  })
})
