<script setup lang="ts">
import { Languages } from "~/i18n.config";

const { changeTheme, themeSelected } = useTheme();
const { changeLang, langSelected } = useLang();

const handleChangeTheme = () => {
  changeTheme(themeSelected.value === "dark" ? "light" : "dark");
};
</script>

<template>
  <div class="Container">
    <main class="Parent">
      <div class="Content">
        <div class="Logo"><IconLogo /></div>
        <h1 class="Title"><slot name="title" /></h1>
        <slot />
        <div class="Divider" v-if="$slots.footer">
          <DividerHorizontal />
        </div>
        <div class="Footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </main>
    <footer class="FooterPage">
      <button class="ThemeSelector" @click="handleChangeTheme" aria-label="Change theme">
        <IconThemeSun v-if="themeSelected === 'light'" />
        <IconThemeMoon v-else />
      </button>
      <select
        class="LangSelector"
        aria-label="Lang Selector"
        id="lang"
        name="lang"
        @change="(e: any) => changeLang(e.target.value)"
      >
        <option
          v-for="lang in Languages"
          :value="lang.value"
          :selected="lang.value === langSelected"
        >
          {{ lang.label }}
        </option>
      </select>
    </footer>
  </div>
</template>

<style scoped lang="sass">
.Container
  @include mixins.f-c-col()
  width: 100%

  .Parent
    @include mixins.f-c-col()
    padding: 2rem 1rem
    width: 100%

    .Content
      @include mixins.f-c-col()
      width: 100%
      gap: 1rem

      .Logo
        $size: 100px
        width: $size
        height: $size

      .Title
        font-size: 1.25rem
        text-align: center

      .Divider,
      .Footer
        width: 100%

  .FooterPage
    @include mixins.f-c()
    justify-content: space-around
    width: 100%
    padding: 1rem
    gap: 2rem

    .ThemeSelector
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

    .LangSelector
      @include mixins.font-primary(.9rem)
      padding: .5rem
      background-color: var(--background)
      color: var(--text-primary)
      border-radius: 8px

@media (min-width: 480px)
  .Container
    .Parent,
    .FooterPage
      max-width: 324px
</style>
