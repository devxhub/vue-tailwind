import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhRadio from '../DxhRadio.vue'

describe('DxhRadio.vue', () => {
  it('renders a radio button with the correct default state', async () => {
    const wrapper: any = mount(DxhRadio, {
      props: {
        id: '1',
        name: 'radioGroup',
        value: 'option1',
        label: 'Option 1',
        checked: false,
        defaultChecked: false,
        hint: 'Select this option',
        disabled: false
      }
    })

    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    expect(wrapper.find('input[type="radio"]').element.checked).toBe(false)
    expect(wrapper.find('label').text()).toBe('Option 1')
    expect(wrapper.find('p').text()).toBe('Select this option')
  })

  it('emits a change event when the radio button is clicked', async () => {
    const wrapper: any = mount(DxhRadio, {
      props: {
        id: '2',
        name: 'radioGroup',
        value: 'option2',
        label: 'Option 2',
        checked: false,
        defaultChecked: false,
        hint: 'Select this option',
        disabled: false
      }
    })

    await wrapper.find('input[type="radio"]').trigger('change')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('change')[0]).toEqual([expect.any(Object)])
  })
})
