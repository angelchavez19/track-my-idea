<script setup lang="ts">
import { type TextFieldProps, useTextField } from "@formwerk/core";

const props = defineProps<TextFieldProps>();

const { inputProps, labelProps, errorMessage, errorMessageProps } = useTextField(props);

const touched = ref(false)
</script>

<template>
  <div class="Input">
    <label v-bind="labelProps">{{ label }}</label>
    <input v-bind="inputProps" @blur="touched = true" />

    <div v-if="errorMessage && touched" v-bind="errorMessageProps">
      <span class="Error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped lang="sass">
.Input
  @include mixins.input-container()

  input
    @include mixins.input-field()

  div .Error
    @include mixins.input-error()
</style>
