import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DTextarea from '../DxhTextarea.vue'

describe('DTextarea', () => {
  it('renders textarea element with label, placeholder, and hint text', () => {
    const wrapper = mount(DTextarea, {
      props: {
        label: 'My Label',
        modelValue: '',
        placeholder: 'Enter your text',
        hint: 'Hint text'
      }
    })

    const label = wrapper.find('[data-test="textarea-label"]')
    expect(label.exists()).toBe(true)

    const textarea = wrapper.find('[data-test="textarea-element"]')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Enter your text')

    const hint = wrapper.find('[data-test="textarea-hint"]')
    expect(hint.exists()).toBe(true)
    expect(hint.text()).toBe('Hint text')
  })

  it('binds textarea value to modelValue prop', () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: 'test'
      }
    })

    const textareaElement = wrapper.find('[data-test="textarea-element"]')
      .element as HTMLTextAreaElement
    expect(textareaElement.value).toBe('test')
  })

  it('updates modelValue on textarea input', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: ''
      }
    })

    const textareaElement = wrapper.find('[data-test="textarea-element"]')
    await textareaElement.setValue('new value')

    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()

    const firstEventPayload = updateEvents ? updateEvents[0] : []
    expect(firstEventPayload).toEqual(['new value'])
  })

  it('emits focus event when textarea is focused', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="textarea-element"]').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event when textarea is blurred', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="textarea-element"]').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits enter event when Enter key is pressed', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('[data-test="textarea-element"]').trigger('keyup.enter')
    expect(wrapper.emitted('enter')).toBeTruthy()
  })

  it('clears textarea value when clearable and close button is clicked', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })

    const closeButton = wrapper.find('[data-test="textarea-clear-button"]')
    expect(closeButton.exists()).toBe(true)

    await closeButton.trigger('click')
    const textareaElement = wrapper.find('[data-test="textarea-element"]')
      .element as HTMLTextAreaElement
    expect(textareaElement.value).not.toBe('')
  })
})
