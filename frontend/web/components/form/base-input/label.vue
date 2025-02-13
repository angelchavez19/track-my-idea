<script setup lang="ts">
import type { AriaLabelProps } from "@formwerk/core";

defineProps<AriaLabelProps>();
</script>

<template>
  <div class="Label">
    <label :id="id" :for="$props.for">
      <slot />
    </label>
  </div>
</template>

<style scoped lang="sass">
.Label label
  @include mixins.font-primary(1.1rem, 500)
</style>
