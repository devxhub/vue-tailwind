import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../DButton.vue'

describe('DButton.vue', () => {
  it('emits a click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        color: 'blue',
        size: 'md'
      },
      slots: {
        default: 'Click Me'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('has the correct default classes', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('rounded-md')
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('px-4')
    expect(wrapper.classes()).toContain('py-2')
    expect(wrapper.classes()).toContain('drop-shadow-md')
    expect(wrapper.classes()).toContain('hover:transition-all')
    expect(wrapper.classes()).toContain('hover:duration-300')
  })

  it('displays the slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('applies the size classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('text-md')
    expect(wrapper.classes()).toContain('px-6')
    expect(wrapper.classes()).toContain('py-3')
  })

  it('applies the color classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        color: 'red'
      }
    })
    expect(wrapper.classes()).toContain('bg-red-500')
  })

  it('applies the rounded classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        rounded: 'lg'
      }
    })
    expect(wrapper.classes()).toContain('rounded-lg')
  })

  it('applies the block class correctly', () => {
    const wrapper = mount(Button, {
      props: {
        block: true
      }
    })
    expect(wrapper.classes()).toContain('w-full')
  })

  it('applies the variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outlined'
      }
    })
    expect(wrapper.classes()).toContain('outline')
    expect(wrapper.classes()).toContain('outline-1')
    expect(wrapper.classes()).toContain('hover:bg-slate-100')
  })
})
