<template>
  <div class="Divider">
    <div class="content" v-if="$slots.default"><slot /></div>
  </div>
</template>

<style scoped lang="sass">
.Divider
  @include mixins.f-j-c()
  width: 100%
  position: relative

  .content
    display: inline-block
    position: relative
    padding: 0 .7rem
    background-color: var(--background)

.Divider::before
  content: ''
  height: 1px
  background-color: var(--primary)
  box-shadow: 0 0 5px var(--primary)
  border-radius: 5px
  display: block
  position: absolute
  top: 50%
  left: 0
  right: 0
</style>
