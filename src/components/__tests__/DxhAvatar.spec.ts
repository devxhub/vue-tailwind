import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhAvatar from '../DxhAvatar.vue'

describe('DxhAvatar.vue', () => {
  it('renders with specified width and height', () => {
    const width = 100
    const height = 150

    const wrapper = mount(DxhAvatar, {
      props: {
        width,
        height
      }
    })

    const container: any = wrapper.element

    expect(container.style.width).toBe(`${width}px`)
    expect(container.style.height).toBe(`${height}px`)

    expect(container.classList.contains('rounded-full')).toBe(false)

    expect(container.classList.contains('inline-block')).toBe(true)
    expect(container.classList.contains('overflow-hidden')).toBe(true)
    expect(container.classList.contains('shadow-lg')).toBe(true)
    expect(container.classList.contains('bg-gray-200')).toBe(true)
    expect(container.classList.contains('object-cover')).toBe(true)
  })

  it('renders with rounded class when rounded prop is true', () => {
    const width = 100
    const height = 150

    const wrapper = mount(DxhAvatar, {
      props: {
        width,
        height,
        rounded: true
      }
    })

    const container = wrapper.element
    expect(container.classList.contains('rounded-full')).toBe(true)
  })
})
