import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhSteps from '../DxhSteps.vue'

describe('DxhSteps.vue', () => {
  it('renders the component with the correct steps and buttons', async () => {
    const steps = [
      { title: 'Step 1', subtitle: 'Subtitle 1', content: 'Content 1' },
      { title: 'Step 2', subtitle: 'Subtitle 2', content: 'Content 2' },
      { title: 'Step 3', subtitle: 'Subtitle 3', content: 'Content 3' }
    ]

    const wrapper: any = mount(DxhSteps, {
      props: {
        steps
      }
    })

    const component = wrapper.element
    expect(component.getAttribute('data-test')).toBe('your-component')

    const stepDivs = wrapper.findAll('[data-test^="step-"]')
    expect(stepDivs.length).not.toBe(steps.length)

    const prevButton = wrapper.find('[data-test="prev-button"]')
    const nextButton = wrapper.find('[data-test="next-button"]')
    expect(prevButton.exists()).toBe(true)
    expect(nextButton.exists()).toBe(true)

    const activeStepContent = wrapper.find('[data-test="active-step-content"]')
    expect(activeStepContent.text()).toBe(steps[0].content)

    await nextButton.trigger('click')
    expect(wrapper.vm.currentStep).toBe(1)

    await prevButton.trigger('click')
    expect(wrapper.vm.currentStep).toBe(0)
  })

  it('updates the step when clicking "Next" button', async () => {
    const steps = [
      { title: 'Step 1', subtitle: 'Subtitle 1', content: 'Content 1' },
      { title: 'Step 2', subtitle: 'Subtitle 2', content: 'Content 2' },
      { title: 'Step 3', subtitle: 'Subtitle 3', content: 'Content 3' }
    ]

    const wrapper: any = mount(DxhSteps, {
      props: {
        steps
      }
    })

    const nextButton = wrapper.find('[data-test="next-button"]')
    await nextButton.trigger('click')

    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('updates the step when clicking "Previous" button', async () => {
    const steps = [
      { title: 'Step 1', subtitle: 'Subtitle 1', content: 'Content 1' },
      { title: 'Step 2', subtitle: 'Subtitle 2', content: 'Content 2' },
      { title: 'Step 3', subtitle: 'Subtitle 3', content: 'Content 3' }
    ]

    const wrapper: any = mount(DxhSteps, {
      props: {
        steps
      }
    })

    const nextButton = wrapper.find('[data-test="next-button"]')
    const prevButton = wrapper.find('[data-test="prev-button"]')

    await nextButton.trigger('click')
    expect(wrapper.vm.currentStep).toBe(1)

    await prevButton.trigger('click')
    expect(wrapper.vm.currentStep).toBe(0)
  })
})
