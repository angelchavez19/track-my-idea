<script setup lang="ts">
interface Props {
  disabled?: boolean;
  loading?: boolean;
  text: string;
}
defineProps<Props>();
</script>

<template>
  <button
    :class="`Button${loading ? ' Loading' : ''}`"
    type="submit"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <div class="Refresh" v-if="loading"><IconRefresh /></div>
    <span>{{ text }}</span>
  </button>
</template>

<style scoped lang="sass">
.Button
  @include mixins.f()
  @include mixins.font-primary(1rem, 800)
  padding: .7rem
  border-radius: 30px
  background-color: var(--primary)
  color: var(--text)
  border: none
  box-shadow: 0 2px 10px 0 var(--primary)
  cursor: pointer

  .Refresh
    $size: 24px
    width: $size
    height: $size
    animation: refresh 1s infinite linear

  span
    flex: 1

.Button[disabled],
.Button.Loading
  cursor: not-allowed
  background-color: var(--primary-disabled)

@keyframes refresh
  100%
    transform: rotate(360deg)
</style>
