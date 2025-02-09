<script setup lang="ts">
const { locale } = useI18n();

useSeoMeta({ title: "Track My Idea" });
useHead({ htmlAttrs: { lang: locale } });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
