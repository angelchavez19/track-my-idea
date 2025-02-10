<script setup lang="ts">
import { useTextField, type TextFieldProps } from '@formwerk/core';

const props = defineProps<TextFieldProps>()

const {errorMessage, errorMessageProps, inputProps, isTouched, labelProps} = useTextField({
    ...props,
    disableHtmlValidation: true,
    type: 'password',
})

const showPassword = ref(false)
</script>

<template>
  <FormBaseInput>
    <template #label>
      <FormBaseInputLabel v-bind="labelProps">{{ label }}</FormBaseInputLabel>
    </template>

    <div class="Container">
      <input
        class="Input"
        v-bind="inputProps"
        :type="showPassword ? 'text' : 'password'"
      />
      <button @click="showPassword = !showPassword" type="button">
        <IconEye style="fill: var(--background-primary)" v-show="showPassword" />
        <IconEyeInvisible
          style="fill: var(--background-primary)"
          v-show="!showPassword"
        />
      </button>
    </div>

    <template #help>
      <slot name="help" />
    </template>

    <template #error>
      <FormBaseInputError v-bind="errorMessageProps" v-show="isTouched">
        {{ errorMessage }}
      </FormBaseInputError>
    </template>
  </FormBaseInput>
</template>

<style scoped lang="sass">
.Container
  width: 100%
  position: relative

  .Input
    @include mixins.input()
    padding: .75rem calc( 35px + 1rem ) .75rem 1rem


  .Input:focus
    @include mixins.input-focus()

  button
    $size: 35px
    position: absolute
    right: 5px
    top: 50%
    transform: translateY(-50%)
    width: $size
    height: $size
    background-color: transparent
    border: none
</style>
