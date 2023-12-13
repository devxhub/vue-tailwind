import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhTextInput from '../DxhTextInput.vue'

describe('DxhTextInput.vue', () => {
  it('renders input element with label, placeholder, and hint text', () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        label: 'Username',
        modelValue: '',
        placeholder: 'Enter your username',
        hint: 'Hint text'
      }
    })

    const label = wrapper.find('[data-test="text-input-label"]')
    expect(label.exists()).toBe(true)

    const input = wrapper.find('[data-test="text-input"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Enter your username')

    const hint = wrapper.find('[data-test="text-input-hint"]')
    expect(hint.exists()).toBe(true)
    expect(hint.text()).toBe('Hint text')
  })

  it('binds input value to modelValue prop', () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: 'test'
      }
    })

    const inputElement = wrapper.find('[data-test="text-input"]').element as HTMLInputElement
    expect(inputElement.value).toBe('test')
  })

  it('updates modelValue on input', async () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: ''
      }
    })

    const inputElement = wrapper.find('[data-test="text-input"]')
    await inputElement.setValue('new value')

    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()

    const firstEventPayload = updateEvents ? updateEvents[0] : []
    expect(firstEventPayload).toEqual(['new value'])
  })

  it('emits focus event when input is focused', async () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="text-input"]').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event when input is blurred', async () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="text-input"]').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits enter event when Enter key is pressed', async () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="text-input"]').trigger('keyup.enter')
    expect(wrapper.emitted('enter')).toBeTruthy()
  })

  it('clears input value when clearable and close button is clicked', async () => {
    const wrapper = mount(DxhTextInput, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    const closeButton = wrapper.find('[data-test="text-input-clear-button"]')
    expect(closeButton.exists()).toBe(true)

    await closeButton.trigger('click')
    const inputElement = wrapper.find('[data-test="text-input"]').element as HTMLInputElement
    expect(inputElement.value).not.toBe('')
  })
})
