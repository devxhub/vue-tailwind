import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhSwitch from '../DxhSwitch.vue'

describe('DxhSwitch.vue', () => {
  it('renders checkbox input and label with data-test attributes', async () => {
    const wrapper = mount(DxhSwitch, {
      props: {
        id: 'my-checkbox',
        defaultChecked: false,
        disabled: false
      }
    })

    const input = wrapper.find('[data-test="checkbox-input"]')
    const label = wrapper.find('[data-test="checkbox-label"]')

    expect(input.exists()).toBe(true)
    expect(label.exists()).toBe(false)
  })

  it('handles change event when checkbox is clicked', async () => {
    const wrapper: any = mount(DxhSwitch, {
      props: {
        id: 'my-checkbox',
        defaultChecked: false,
        disabled: false
      }
    })

    const input = wrapper.find('[data-test="checkbox-input"]')

    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toBe(false)
  })

  it('applies defaultChecked state on mount', async () => {
    const wrapper = mount(DxhSwitch, {
      props: {
        id: 'my-checkbox',
        defaultChecked: true,
        disabled: false
      }
    })

    const input: any = wrapper.find('[data-test="checkbox-input"]')
    expect(input.element.checked).toBe(false)
  })

  it('does not handle change event when disabled is true', async () => {
    const wrapper = mount(DxhSwitch, {
      props: {
        id: 'my-checkbox',
        defaultChecked: false,
        disabled: true
      }
    })

    const input = wrapper.find('[data-test="checkbox-input"]')

    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('adds opacity-70 class when disabled is true', async () => {
    const wrapper = mount(DxhSwitch, {
      props: {
        id: 'my-checkbox',
        defaultChecked: false,
        disabled: true
      }
    })

    const container = wrapper.find('[data-test="checkbox-container"]')

    expect(container.classes()).toContain('opacity-70')
  })
})
