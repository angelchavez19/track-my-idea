<script setup lang="ts">
import { useLoginPage } from "./login.composable";

const { loading, isValid, onSubmit } = useLoginPage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.login.title") }}</template>

    <form @submit.prevent="onSubmit" novalidate class="Form">
      <FormInputEmail :label="$t('form.fields.email')" name="email" />
      <FormInputPassword :label="$t('form.fields.password')" name="password">
        <template #help>
          <FormBaseInputHelp>
            <NuxtLink
              class="ForgotLink"
              :to="$localePath('/auth/password/request-change')"
            >
              {{ $t("pages.auth.login.form.helps.password") }}
            </NuxtLink>
          </FormBaseInputHelp>
        </template>
      </FormInputPassword>

      <Button
        :text="$t('pages.auth.login.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/account/register')"
        :text="$t('pages.auth.login.footer.link1.text')"
        :link-text="$t('pages.auth.login.footer.link1.linkText')"
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

  .ForgotLink
    color: var(--text-primary)
</style>
