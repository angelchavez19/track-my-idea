<script setup lang="ts">
interface Props {
  text: string;
  linkText: string;
  to: string;
}
defineProps<Props>();
</script>

<template>
  <p>
    {{ text }} <NuxtLink :to="to">{{ linkText }}</NuxtLink>
  </p>
</template>

<style scoped lang="sass">
p
  color: var(--text-primary)

  a
    color: var(--primary)
</style>
