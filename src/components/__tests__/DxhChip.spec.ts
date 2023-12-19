import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhChips from '../DxhChips.vue'

describe('DxhChips.vue', () => {
  it('renders draggable item with close button', () => {
    const wrapper = mount(DxhChips, {
      props: {
        text: 'Sample Text',
        closeable: true,
        draggable: true
      }
    })
    expect(wrapper.classes()).toContain('inline-block')
    expect(wrapper.classes()).toContain('cursor-grab')

    expect(
      wrapper.find('.flex.items-center.py-2.px-3.border.bg-gray-300.rounded-lg').exists()
    ).toBe(true)

    expect(wrapper.find('.text').text()).toBe('Sample Text')

    const closeButton = wrapper.find('span.cursor-pointer')
    expect(closeButton.exists()).toBe(true)

    expect(wrapper.attributes('draggable')).toBe('true')
    expect(wrapper.emitted('close')).toBeFalsy()

    wrapper.trigger('dragstart')
    expect(wrapper.emitted('drop')).toBeFalsy()

    wrapper.trigger('dragend')
    expect(wrapper.emitted('drop')).toBeTruthy()
  })

  it('renders draggable item without close button', () => {
    const wrapper = mount(DxhChips, {
      props: {
        text: 'Sample Text',
        closeable: false,
        draggable: true
      }
    })

    const closeButton = wrapper.find('span.cursor-pointer')
    expect(closeButton.exists()).toBe(false)
  })
})
