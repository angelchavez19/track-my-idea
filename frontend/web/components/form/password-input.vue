<script setup lang="ts">
import { type TextFieldProps, useTextField } from "@formwerk/core";

const props = defineProps<TextFieldProps>();

const { inputProps, labelProps, errorMessage, errorMessageProps } = useTextField(props);

const showPassword = ref(false)
const touched = ref(false)

const input = defineModel()
</script>

<template>
  <div class="Input">
    <label v-bind="labelProps">{{ label }}</label>

    <div class="Field">
      <input
        v-nodel="input"
        v-bind="inputProps"
        @blur="touched = true"
        :type="showPassword ? 'text' : 'password'"
      />
      <button class="Icon" @click="showPassword = !showPassword" type="button">
        <IconEye v-show="showPassword" />
        <IconEyeInvisible v-show="!showPassword" />
      </button>
    </div>

    <div v-if="errorMessage && touched" v-bind="errorMessageProps">
      <span class="Error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped lang="sass">
.Input
  @include mixins.input-container()

  .Field
    @include mixins.f-c()
    width: 100%
    position: relative

    input
      @include mixins.input-field()
      padding-right: 40px

    button
      $size: 30px
      width: $size
      height: $size
      background-color: transparent
      border: none
      cursor: pointer
      position: absolute
      right: 5px

      svg
        fill: var(--background-primary)

  div .Error
    @include mixins.input-error()
</style>
