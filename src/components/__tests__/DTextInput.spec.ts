import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../DTextInput.vue'

describe('DInput.vue', () => {
  it('emits an input event when value changes', async () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Username',
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('NewValue')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['NewValue'])
  })

  it('has the correct default classes', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Username',
        id: 'username'
      }
    })

    expect(wrapper.classes()).toContain('relative')
    expect(wrapper.classes()).toContain('mt-4')
    expect(wrapper.classes()).toContain('transition-all')
    expect(wrapper.classes()).toContain('duration-300')
    expect(wrapper.classes()).toContain('pt-4')
    expect(wrapper.classes()).toContain('rounded-t-md')
  })

  it('displays the label', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Username',
        id: 'username'
      }
    })

    const labelElement = wrapper.find('label')
    expect(labelElement.exists()).toBe(true)
    expect(labelElement.text()).toBe('Username')
  })

  it('applies the underlined variant correctly', () => {
    const wrapper = mount(Input, {
      props: {
        variant: 'underlined'
      }
    })

    expect(wrapper.classes()).toContain('bg-transparent')
    expect(wrapper.classes()).toContain('px-0')
  })

  it('applies the default variant correctly', () => {
    const wrapper = mount(Input, {
      props: {
        variant: 'default'
      }
    })

    expect(wrapper.classes()).toContain('bg-gray-100')
    expect(wrapper.classes()).toContain('hover:bg-gray-200')
    expect(wrapper.classes()).toContain('px-4')
  })

  it('applies the disabled styles correctly', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('hover:bg-gray-100')
  })
})
