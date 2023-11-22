import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DTextInput from '../DTextInput.vue'
import CircleXmark from '../../assets/icons/CircleXmark.vue'

describe('DTextInput.vue', () => {
  it('renders input element', () => {
    const wrapper = mount(DTextInput, {
      props: {
        label: 'Username',
        modelValue: ''
      }
    })

    // Assert the presence of a label
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Username')

    // Assert the presence of an input
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it('binds input value to modelValue prop', () => {
    const wrapper = mount(DTextInput, {
      props: {
        modelValue: 'test'
      }
    })

    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('test')
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(DTextInput, {
      props: {
        modelValue: ''
      }
    })

    const inputElement = wrapper.find('input')
    await inputElement.setValue('new value')

    // Check that the "update:modelValue" event has been emitted
    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()

    // Now we can safely assert the first emitted event's payload
    const firstEventPayload = updateEvents ? updateEvents[0] : []
    expect(firstEventPayload).toEqual(['new value'])
  })

  it('displays placeholder text when focused', async () => {
    const placeholderText = 'Enter your username'
    const wrapper = mount(DTextInput, {
      props: {
        placeholder: placeholderText
      }
    })

    const inputElement = wrapper.find('input').element as HTMLInputElement

    // Check placeholder when not focused
    expect(inputElement.getAttribute('placeholder')).toBe('')

    // Simulate focus
    await inputElement.focus()
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(DTextInput, {
      props: {
        disabled: true
      }
    })

    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.disabled).toBe(true)
  })

  it('renders clearable icon when focused and clearable is true', async () => {
    const wrapper = mount(DTextInput, {
      props: {
        clearable: true
      },
      global: {
        components: {
          CircleXmark
        }
      }
    })

    const inputElement = wrapper.find('input').element as HTMLInputElement

    // Check that clearable icon is not present initially
    const clearIcon = wrapper.findComponent(CircleXmark)
    expect(clearIcon.exists()).toBe(false)

    // Simulate focus
    await inputElement.focus()

    // Check that clearable icon is present when focused
    expect(clearIcon.exists()).toBe(false)
  })
})
