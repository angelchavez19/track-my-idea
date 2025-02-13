<template>
  <div class="Outer">
    <div class="Wrapper">
      <slot name="label" />
      <div class="Input">
        <slot />
      </div>
    </div>
    <slot name="help" />
    <slot name="error" />
  </div>
</template>

<style scoped lang="sass">
.Outer
  @include mixins.f-col()
  gap: .4rem

  .Wrapper
    @include mixins.f-col()
    width: 100%
    gap: .2rem
</style>
