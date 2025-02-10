<script setup lang="ts">
import type { AriaErrorMessageProps } from "@formwerk/core";

interface Props extends AriaErrorMessageProps {
  id: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="Error" v-bind="props" v-if="$slots.default">
    <span><slot /></span>
  </div>
</template>

<style scoped lang="sass">
.Error

  span
    color: var(--error)
</style>
