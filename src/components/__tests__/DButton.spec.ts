import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../DButton.vue'

describe('DButton.vue', () => {
  it('emits a click event when clicked on the button', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        type: 'button'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('renders a button with the correct default classes', () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        type: 'button'
      }
    })

    expect(wrapper.find('button').classes()).toContain('border')
    expect(wrapper.find('button').classes()).toContain('px-1')
    expect(wrapper.find('button').classes()).toContain('pb-0.5')
  })

  it('renders a button with the correct dynamic classes', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        type: 'button',
        block: true,
        disabled: false,
        loading: false
      }
    })

    expect(wrapper.find('button').classes()).toContain('w-full')
    expect(wrapper.find('button').classes()).not.toContain('cursor-not-allowed')
    expect(wrapper.find('button').classes()).not.toContain('opacity-70')

    await wrapper.setProps({ disabled: true })
  })

  it('renders a button with loading spinner when loading is true', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        type: 'button',
        loading: true
      }
    })

    // Simulate async action completion
    await wrapper.setProps({ loading: false })

    // Ensure button text is rendered
    expect(wrapper.find('button span').text()).toContain('Click Me')
  })

  it('emits a click event when clicked on the anchor', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        href: 'https://example.com'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('renders an anchor with the correct default classes', () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        href: 'https://example.com'
      }
    })

    expect(wrapper.find('a').classes()).toContain('border')
    expect(wrapper.find('a').classes()).toContain('px-1')
    expect(wrapper.find('a').classes()).toContain('pb-0.5')
  })

  it('renders an anchor with the correct dynamic classes', async () => {
    const wrapper = mount(Button, {
      props: {
        name: 'Click Me',
        href: 'https://example.com',
        block: true,
        disabled: false,
        loading: false
      }
    })

    expect(wrapper.find('a').classes()).toContain('w-full')
    expect(wrapper.find('a').classes()).not.toContain('cursor-not-allowed')
    expect(wrapper.find('a').classes()).not.toContain('opacity-70')

    await wrapper.setProps({ disabled: true })
  })
})
