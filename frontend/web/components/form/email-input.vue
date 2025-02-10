<script setup lang="ts">
import { useTextField, type TextFieldProps } from '@formwerk/core';
import { EmailSchema } from './schemas';

const props = defineProps<TextFieldProps>()

const { errorMessage, errorMessageProps, inputProps, isTouched, labelProps} = useTextField({
  ...props,
  schema: EmailSchema,
  autocomplete: 'email',
  disableHtmlValidation: true,
  type: 'email',
})
</script>

<template>
  <FormBaseInput>
    <template #label>
      <FormBaseInputLabel v-bind="labelProps">{{ label }}</FormBaseInputLabel>
    </template>

    <input class="Input" v-bind="inputProps" />

    <template #error>
      <FormBaseInputError v-bind="errorMessageProps" v-show="isTouched">
        {{ errorMessage }}
      </FormBaseInputError>
    </template>
  </FormBaseInput>
</template>

<style scoped lang="sass">
.Input
  @include mixins.input()

.Input:focus
  @include mixins.input-focus()
</style>
