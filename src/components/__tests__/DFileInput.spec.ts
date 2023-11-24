import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DFileInput from '../DFileInput.vue'

describe('DFileInput', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DFileInput)
  })

  it('renders correctly with default props', () => {
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
  })

  it('displays label and placeholder text', async () => {
    const label = 'File Input'
    const placeholder = 'Choose a file'

    await wrapper.setProps({ label, placeholder })

    expect(wrapper.find('span').text()).toBe(label)
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
  })

  it('clears file on clearFile method call', async () => {
    await wrapper.setProps({ modelValue: 'test-file.txt' })

    await wrapper.vm.clearFile()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
  })
})
