import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DxhModal from '@/components/DxhModal.vue'

describe('DxhModal.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(DxhModal, {
      props: {
        title: 'Test Modal',
        footer: true,
        open: true,
        keyboardEsc: true,
        zIndex: 1000,
        persistent: false
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders modal with title and footer', () => {
    const title = wrapper.find('[data-test="modal-title"]')
    const footer = wrapper.find('[data-test="modal-footer"]')

    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Test Modal')
    expect(footer.exists()).toBe(true)
  })

  it('emits cancel event on cancel button click', async () => {
    const cancelButton = wrapper.find('[data-test="cancel-button"]')

    await cancelButton.trigger('click')

    const cancelEvent = wrapper.emitted('cancel')
    expect(cancelEvent).toBeTruthy()
  })

  it('emits ok event on ok button click', async () => {
    const okButton = wrapper.find('[data-test="ok-button"]')

    await okButton.trigger('click')

    const okEvent = wrapper.emitted('ok')
    expect(okEvent).toBeTruthy()
  })

  it('closes modal on outside click', async () => {
    const modalOverlay = wrapper.find('[data-test="modal-overlay"]')

    await modalOverlay.trigger('click')

    const cancelEvent = wrapper.emitted('close')
    expect(cancelEvent).toBeTruthy()
  })

  it('closes modal on pressing ESC key', async () => {
    await wrapper.trigger('keydown.esc')

    const cancelEvent = wrapper.emitted('close')
    expect(cancelEvent).toBeUndefined()
  })
})
