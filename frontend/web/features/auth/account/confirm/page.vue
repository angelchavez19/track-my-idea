<script setup lang="ts">
import { useConfirmPage } from "./confirm.composable";

const { info } = useConfirmPage();
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ info.title }}</template>

    <p>{{ info.description }}</p>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/login')"
        :text="$t('pages.auth.confirm.footer.link1.text')"
        :link-text="$t('pages.auth.confirm.footer.link1.linkText')"
      />
      <FormLink
        :to="$localePath('/auth/account/refresh-email-verification')"
        :text="$t('pages.auth.confirm.footer.link2.text')"
        :link-text="$t('pages.auth.confirm.footer.link2.linkText')"
      />
    </template>
  </NuxtLayout>
</template>
