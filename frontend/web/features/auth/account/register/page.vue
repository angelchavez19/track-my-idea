<script setup lang="ts">
import Username from "./components/input-username.vue";
import { useRegisterPage } from "./register.composable";

const { loading, isValid, onSubmit } = useRegisterPage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.register.title") }}</template>

    <Social />
    <DividerHorizontal>{{ $t("components.social.divider") }}</DividerHorizontal>

    <form @submit.prevent="onSubmit" novalidate class="Form">
      <FormInputText
        :label="$t('form.fields.firstName')"
        name="firstName"
        autocomplete="given-name"
      />
      <FormInputText
        :label="$t('form.fields.lastName')"
        name="lastName"
        autocomplete="family-name"
      />
      <Username :label="$t('form.fields.username')" />
      <FormInputEmail
        :label="$t('form.fields.email')"
        name="email"
        autocomplete="email"
      />
      <FormInputPassword
        :label="$t('form.fields.password')"
        name="password"
        is-password
      />

      <Button
        :text="$t('pages.auth.register.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/login')"
        :text="$t('pages.auth.register.footer.link1.text')"
        :link-text="$t('pages.auth.register.footer.link1.linkText')"
      />
      <FormLink
        :to="$localePath('/auth/account/refresh-email-verification')"
        :text="$t('pages.auth.register.footer.link2.text')"
        :link-text="$t('pages.auth.register.footer.link2.linkText')"
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
