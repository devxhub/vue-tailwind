import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhCheckbox from '../DxhCheckbox.vue'

describe('DxhCheckbox.vue', () => {
  it('renders a checkbox with default props', () => {
    const wrapper = mount(DxhCheckbox)

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.props('id')).toBeUndefined()
    expect(wrapper.props('name')).toBeUndefined()
    expect(wrapper.props('value')).toBeUndefined()
    expect(wrapper.props('label')).toBeUndefined()
    expect(wrapper.props('checked')).toBe(false)
    expect(wrapper.props('hint')).toBeUndefined()
    expect(wrapper.props('disabled')).toBe(false)
  })

  it('renders a checkbox with provided props', () => {
    const wrapper = mount(DxhCheckbox, {
      props: {
        id: '1',
        name: 'example',
        value: 'example-value',
        label: 'Example Label',
        checked: true,
        defaultChecked: false,
        hint: 'Example Hint',
        disabled: true
      }
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.props('id')).toBe('1')
    expect(wrapper.props('name')).toBe('example')
    expect(wrapper.props('value')).toBe('example-value')
    expect(wrapper.props('label')).toBe('Example Label')
    expect(wrapper.props('checked')).toBe(true)
    expect(wrapper.props('defaultChecked')).toBe(false)
    expect(wrapper.props('hint')).toBe('Example Hint')
    expect(wrapper.props('disabled')).toBe(true)
  })

  it('emits change event with the entire event object when checkbox is clicked', async () => {
    const wrapper: any = mount(DxhCheckbox)

    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')[0]).toEqual([expect.any(Object)])
  })
})
