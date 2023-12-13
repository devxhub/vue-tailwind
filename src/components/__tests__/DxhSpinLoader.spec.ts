import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from '../DxhSpinLoader.Vue'

describe('Spinner.vue', () => {
  it('renders the spinner with correct props', () => {
    const wrapper = mount(Spinner, {
      props: {
        height: '24',
        width: '24',
        color: 'blue'
      }
    })

    expect(wrapper.find('svg').attributes('width')).toBe('24')
    expect(wrapper.find('svg').attributes('height')).toBe('24')

    const circles = wrapper.findAll('circle')
    expect(circles).toHaveLength(7)

    expect(circles[0].attributes()).not.toEqual({
      cx: '12',
      cy: '2.5',
      r: '1.5',
      opacity: '0.14',
      fill: 'blue'
    })
  })

  it('applies the spinner animation', async () => {
    const wrapper = mount(Spinner, {
      props: {
        height: '24',
        width: '24',
        color: 'blue'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.spinnerAnimation').exists()).toBe(true)
  })
})
