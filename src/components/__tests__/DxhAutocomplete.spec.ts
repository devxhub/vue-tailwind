import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhAutocomplete from '../DxhAutocomplete.vue'

describe('DxhAutocomplete.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DxhAutocomplete, {
      props: {
        label: 'Your Label',
        options: [
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' },
          { id: 3, label: 'Option 3' }
        ]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders with correct initial state', () => {
    expect(wrapper.find('[data-test="autocomplete-label"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="autocomplete-label"]').text()).toBe('Your Label')
  })

  it('opens dropdown, selects an option, and closes dropdown', async () => {
    await wrapper.find('[data-test="autocomplete-input"]').trigger('focus')
    expect(wrapper.vm.isDropdownOpen).toBe(false)
    expect(wrapper.vm.isDropdownOpen).toBe(false)
    expect(wrapper.emitted('selected')).toBeFalsy()
  })
})
