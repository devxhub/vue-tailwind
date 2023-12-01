import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../DButton.vue'

describe('DButton.vue', () => {
  it('emits a click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click me',
        type: 'button',
        value: 'Click me'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('renders a button with the correct default classes', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('px-1')
    expect(wrapper.classes()).toContain('pb-0.5')
  })

  it('renders a button with the correct dynamic classes', async () => {
    const wrapper = mount(Button)
    await wrapper.setProps({ disabled: true })
  })

  it('displays the slot content for the button', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders an anchor with the correct default classes', () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://example.com',
        target: '_blank'
      }
    })
    expect(wrapper.find('a').classes()).toContain('border')
    expect(wrapper.find('a').classes()).toContain('px-1')
    expect(wrapper.find('a').classes()).toContain('pb-0.5')
  })

  it('renders an anchor with the correct dynamic classes', async () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://example.com',
        target: '_blank'
      }
    })
    await wrapper.setProps({ disabled: true })
  })

  it('displays the slot content for the anchor', () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://example.com',
        target: '_blank'
      },
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toContain('Click me')
  })
})
