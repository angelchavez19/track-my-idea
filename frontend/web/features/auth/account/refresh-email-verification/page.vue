<script setup lang="ts">
import { useRefreshEmailVerificationPage } from "./refresh-email-verification.composable";

const { loading, isValid, onSubmit } = useRefreshEmailVerificationPage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.refreshEmailVerification.title") }}</template>

    <form @submit.prevent="onSubmit" novalidate class="Form">
      <FormInputEmail
        :label="$t('form.fields.email')"
        name="email"
        autocomplete="email"
      />

      <Button
        :text="$t('pages.auth.refreshEmailVerification.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/login')"
        :text="$t('pages.auth.refreshEmailVerification.footer.link1.text')"
        :link-text="$t('pages.auth.refreshEmailVerification.footer.link1.linkText')"
      />
    </template>
  </NuxtLayout>
</template>

<style scoped lang="sass">
.Form
  @include mixins.f-col()
  padding: 1rem .2rem
  width: 100%
  gap: 1rem
</style>
