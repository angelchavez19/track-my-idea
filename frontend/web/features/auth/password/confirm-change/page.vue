<script setup lang="ts">
import { useConfirmChangePage } from "./confirm-change.composable";

const { loading, isValid, onSubmit } = useConfirmChangePage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.confirmChange.title") }}</template>

    <form @submit.prevent="onSubmit" novalidate class="Form">
      <FormInputPassword
        :label="$t('form.fields.password')"
        name="password"
        is-password
      />

      <Button
        :text="$t('pages.auth.confirmChange.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/login')"
        :text="$t('pages.auth.confirmChange.footer.link1.text')"
        :link-text="$t('pages.auth.confirmChange.footer.link1.linkText')"
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
