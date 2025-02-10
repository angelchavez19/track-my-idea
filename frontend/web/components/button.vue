<script setup lang="ts">
interface Props {
  text: string;
  loading?: boolean;
}
defineProps<Props>();
</script>

<template>
  <button class="Button" type="submit">{{ text }}</button>
</template>

<style scoped lang="sass">
.Button
  @include mixins.font-primary(1rem, 800)
  padding: .7rem
  border-radius: 30px
  background-color: var(--primary)
  color: var(--text)
  border: none
  box-shadow: 0 2px 10px 0 var(--primary)
</style>
