<!-- TestAutocomplete.vue -->
<template>
  <div class="p-20">
    <Autocomplete
      v-model="selectedOption"
      :loading="false"
      :options="filteredOptions"
      placeholder="Type to search"
      :clearable="true"
      hint="Type to search or select an option"
      chips
      
    >
    </Autocomplete>

    <div class="mt-4">
      <p>Selected Option: {{ selectedOption }}</p>
      <p v-if="loading" class="text-blue-500">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Autocomplete from './components/DxhSelect.vue';
import { ref, computed, watch } from 'vue';

const loading = ref(false);
const selectedOption = ref<string | null>(null);
const options = ref([
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  { id: 4, label: 'Caption 3' },
  { id: 5, label: 'Fiction 3' },
  { id: 6, label: 'Dell 3' },
]);

const clearable = ref(true);
const disabled = ref(false);
const readonly = ref(false);
const autofocus = ref(false);
const inputValue = ref('');

const filteredOptions = computed(() => {
  return options.value.filter(option => option.label.toLowerCase().includes(inputValue.value.toLowerCase()));
});

const handleChange = (value) => {
  inputValue.value = value;
};

const handleEnter = () => {
  console.log('Enter key pressed');
};

const handleSelected = (option) => {
  console.log(option);
};

setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
