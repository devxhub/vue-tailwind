<template>
  <div>
    <TextareaInput
      v-model="textValue"
      label="Your Label 2"
      id="uniqueId"
      rows="2"
      cols="4"
      maxlength="200"
      placeholder="Enter your text here"
      hint="Helpful hint goes here"
      :disabled="false"
      :resize="true"
      :autofocus="false"
      :required="true"
      :clearable="true"
    >
    </TextareaInput>
    <p>Parent Component Value: {{ textValue }}</p>
  </div>
</template>

<script setup lang="ts">
import TextareaInput from './components/DxhTextarea.vue'
import { ref } from 'vue'

const textValue = ref('')
</script>
