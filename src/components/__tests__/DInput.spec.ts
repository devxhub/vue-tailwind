import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '../DInput.vue';

describe('DInput.vue', () => {
  it('renders input element', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Username',
        modelValue: '',
      },
    });

    // Assert the presence of a label
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Username');

    // Assert the presence of an input
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it('binds input value to modelValue prop', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
      },
    });

    const inputElement = wrapper.find('input').element as HTMLInputElement;
    expect(inputElement.value).toBe('test');
  });

  it('updates modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    });

    const inputElement = wrapper.find('input');
    await inputElement.setValue('new value');

    // Check that the "update:modelValue" event has been emitted
    const updateEvents = wrapper.emitted('update:modelValue');
    expect(updateEvents).toBeTruthy();

    // Now we can safely assert the first emitted event's payload
    const firstEventPayload = updateEvents ? updateEvents[0] : [];
    expect(firstEventPayload).toEqual(['new value']);
  });

  it('displays placeholder text', () => {
    const placeholderText = 'Enter your username';
    const wrapper = mount(Input, {
      props: {
        placeholder: placeholderText,
      },
    });

    const inputElement = wrapper.find('input').element as HTMLInputElement;
    expect(inputElement.placeholder).toBe(placeholderText);
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
      },
    });

    const inputElement = wrapper.find('input').element as HTMLInputElement;
    expect(inputElement.disabled).toBe(true);
  });
});
