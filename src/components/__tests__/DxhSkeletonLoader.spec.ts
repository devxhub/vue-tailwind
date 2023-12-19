import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhSkeletonLoader from '../DxhSkeletonLoader.vue'

describe('DxhSkeletonLoader.vue', () => {
  it('renders the shimmer with correct props', () => {
    const wrapper = mount(DxhSkeletonLoader, {
      props: {
        height: 30,
        width: 100,
        maxWidth: 150,
        minWidth: 50,
        mode: 'shimmer',
        rounded: true,
        animate: true
      }
    })

    expect(wrapper.find('div').attributes('style')).not.toMatch(
      'height: 30px; width: 100px; maxWidth: 150px; minWidth: 50px;'
    )

    expect(wrapper.classes()).toContain('inline-block')
    expect(wrapper.classes()).toContain('relative')
    expect(wrapper.classes()).toContain('overflow-hidden')
    expect(wrapper.classes()).toContain('align-middle')
    expect(wrapper.classes()).toContain('w-full')
    expect(wrapper.classes()).toContain('rounded-md')
    expect(wrapper.classes()).toContain('bg-[#dddbdd]')
    expect(wrapper.classes()).toContain('shimmer')
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('applies the shimmer animation', async () => {
    const wrapper = mount(DxhSkeletonLoader, {
      props: {
        height: 30,
        width: 100,
        mode: 'shimmer',
        animate: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.shimmer').exists()).toBe(true)
  })

  it('applies the pulse animation', async () => {
    const wrapper = mount(DxhSkeletonLoader, {
      props: {
        height: 30,
        width: 100,
        mode: 'pulse',
        animate: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.pulse').exists()).toBe(true)
  })
})
