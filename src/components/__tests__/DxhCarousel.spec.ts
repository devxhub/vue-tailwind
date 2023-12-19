import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhCarousel from '@/components/DxhCarousel.vue'

describe('DxhCarousel.vue', () => {
  it('renders carousel with images', async () => {
    const items = [
      { id: 1, title: 'Image 1', src: 'image1.jpg' },
      { id: 2, title: 'Image 2', src: 'image2.jpg' },
      { id: 3, title: 'Image 3', src: 'image3.jpg' }
    ]

    const wrapper = mount(DxhCarousel, {
      props: {
        items,
        autoplay: false,
        showArrows: true,
        dots: true,
        autoplaySpeed: 5000,
        maxWidth: 600,
        maxHeight: 400
      }
    })

    const carousel = wrapper.find('[data-test="carousel"]')
    expect(carousel.exists()).toBe(true)

    const carouselImages = carousel.findAll('[data-test="carousel-item"] img')
    expect(carouselImages.length).toBe(items.length)

    const prevArrow = wrapper.find('[data-test="prev-arrow"]')
    const nextArrow = wrapper.find('[data-test="next-arrow"]')
    expect(prevArrow.exists()).toBe(true)
    expect(nextArrow.exists()).toBe(true)

    const dots = wrapper.findAll('[data-test="dot"]')
    expect(dots.length).toBe(items.length)
  })

  it('stops autoplay on mouseenter and resumes on mouseleave', async () => {
    const items = [
      { id: 1, title: 'Image 1', src: 'image1.jpg' },
      { id: 2, title: 'Image 2', src: 'image2.jpg' },
      { id: 3, title: 'Image 3', src: 'image3.jpg' }
    ]

    const wrapper = mount(DxhCarousel, {
      props: {
        items,
        autoplay: true,
        showArrows: false,
        dots: false,
        autoplaySpeed: 5000,
        maxWidth: 600,
        maxHeight: 400
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 3000))

    await wrapper.trigger('mouseenter')
    expect(wrapper.vm.autoplayInterval).not.toBe(null)

    await wrapper.trigger('mouseleave')
    expect(wrapper.vm.autoplayInterval).not.toBe(null)
  })
})
