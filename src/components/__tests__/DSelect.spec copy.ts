import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DSelect from '../DSelect.vue'

describe('DSelect.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DSelect, {
      props: {
        modelValue: [],
        label: 'Dropdown Label',
        options: [
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' },
          { id: 3, label: 'Option 3' }
        ],
        multiple: true,
        chips: true,
        clearable: true,
        placeholder: 'Select an option',
        hint: 'Dropdown Hint'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with correct initial state', () => {
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Dropdown Label')
    expect(wrapper.find('.text-gray-500').text()).toBe('Select an option')
    expect(wrapper.find('p').text()).toBe('Dropdown Hint')
    expect(wrapper.find('[data-test="clear-icon"]').exists()).toBe(true)
    expect(wrapper.vm.isDropdownOpen).toBe(false)
  })

  it('opens dropdown, selects an option, and closes dropdown', async () => {
    await wrapper.find('[data-test="dropdown-toggle"]').trigger('click')
    expect(wrapper.vm.isDropdownOpen).toBe(true)

    await wrapper.find('[data-test="dropdown-option-1"]').trigger('click')
    expect(wrapper.vm.selectedOptions).toEqual([{ id: 1, label: 'Option 1' }])
    expect(wrapper.vm.isDropdownOpen).toBe(false)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([1])
  })
})
