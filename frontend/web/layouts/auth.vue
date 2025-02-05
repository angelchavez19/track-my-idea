<script setup lang="ts">
const { changeTheme, themeSelected } = useTheme();

const handleChangeTheme = () => {
  if (themeSelected.value === "system") changeTheme("light");
  else if (themeSelected.value === "light") changeTheme("dark");
  else changeTheme("system");
};
</script>

<template>
  <div class="Container">
    <main class="Parent">
      <button class="ThemeSelector" @click="handleChangeTheme" aria-label="Change theme">
        <IconThemeSun v-if="themeSelected === 'light'" />
        <IconThemeMoon v-else-if="themeSelected === 'dark'" />
        <IconThemeSystem v-else />
      </button>
      <div class="Content">
        <div class="Logo"><IconLogo /></div>
        <h1 class="Title"><slot name="title" /></h1>
        <div class="Form">
          <slot />
        </div>
        <slot name="footer" />
      </div>
    </main>
  </div>
</template>

<style scoped lang="sass">
.Container
  @include mixins.f-c()
  width: 100%

  .Parent
    @include mixins.f-c-col()
    padding: 2rem 1rem
    width: 100%
    max-width: 500px

    .ThemeSelector
      position: fixed
      top: 1rem
      right: 1rem
      background-color: var(--background-primary)
      width: 32px
      height: 32px
      border-radius: 50%
      cursor: pointer
      border: none
      overflow: hidden
      padding: .2rem
      box-shadow: 0 0 10px 0 var(--background-primary)

      svg
        fill: var(--background)
        width: 100%
        height: 100%

    .Content
      @include mixins.f-c-col()
      gap: 1rem

      .Logo
        $size: 100px
        width: $size
        height: $size

      .Title
        font-size: 1.25rem
        text-align: center

      .Form
        @include mixins.f-col()
        padding: 1rem 0
</style>
