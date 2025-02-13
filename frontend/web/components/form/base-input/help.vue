<script setup lang="ts"></script>

<template>
  <div class="Help">
    <slot />
  </div>
</template>

<style scoped lang="sass">
.Help
  @include mixins.f()
  justify-content: flex-end
</style>
