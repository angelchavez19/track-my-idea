<script setup lang="ts">
import { useRequestChangePage } from "./request-change.composable";

const { loading, isValid, onSubmit } = useRequestChangePage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.requestChange.title") }}</template>

    <form @submit.prevent="onSubmit" novalidate class="Form">
      <FormInputEmail
        :label="$t('form.fields.email')"
        name="email"
        autocomplete="email"
      />

      <Button
        :text="$t('pages.auth.requestChange.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
    </form>
  </NuxtLayout>
</template>

<style scoped lang="sass">
.Form
  @include mixins.f-col()
  padding: 1rem .2rem
  width: 100%
  gap: 1rem
</style>
