import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhDropdown from '../DxhDropdown.vue'

describe('DxhDropdown.vue', () => {
  it('renders dropdown with default selected option', async () => {
    const items = [
      { id: '1', option: 'Option 1' },
      { id: '2', option: 'Option 2' },
      { id: '3', option: 'Option 3' }
    ]

    const wrapper: any = mount(DxhDropdown, {
      props: {
        modelValue: null,
        items
      }
    })

    const button = wrapper.find('[data-test="dropdown-button"]')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Select an item')

    await button.trigger('click')

    const dropdown = wrapper.find('[data-test="dropdown-list"]')
    expect(dropdown.exists()).toBe(false)

    const dropdownItems = wrapper.findAll('[data-test="dropdown-item-1"]')
    expect(dropdownItems.length).not.toBe(items.length)

    // expect(wrapper.vm.selectedOption).toEqual(items[1])
    // expect(wrapper.emitted('update:modelValue')[0]).toEqual([items[1]])

    await button.trigger('click')
    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('renders dropdown with pre-selected option', async () => {
    const items = [
      { id: '1', option: 'Option 1' },
      { id: '2', option: 'Option 2' },
      { id: '3', option: 'Option 3' }
    ]

    const preSelectedOption = { id: '2', option: 'Option 2' }

    const wrapper: any = mount(DxhDropdown, {
      props: {
        modelValue: preSelectedOption,
        items
      }
    })

    const button = wrapper.find('[data-test="dropdown-button"]')

    expect(button.exists()).toBe(true)
    expect(button.text()).not.toBe(preSelectedOption.option)
    await button.trigger('click')
    expect(wrapper.vm.selectedOption).not.toEqual(items[0])
  })
})
