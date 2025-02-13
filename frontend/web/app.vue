<script setup lang="ts">
import { Toaster } from "vue-sonner";

const { locale } = useI18n();
const { themeSelected } = useTheme();

useSeoMeta({ title: "Track My Idea" });
useHead({ htmlAttrs: { lang: locale } });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster :theme="themeSelected" position="bottom-right" close-button rich-colors />
</template>
