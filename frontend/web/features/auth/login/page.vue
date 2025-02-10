<script setup lang="ts"></script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.login.title") }}</template>

    <form novalidate class="Form">
      <FormEmailInput :label="$t('pages.auth.login.form.fields.email')" name="email" />
      <FormPasswordInput
        :label="$t('pages.auth.login.form.fields.password.label')"
        name="password"
      >
        <template #help>
          <FormBaseInputHelp>
            <NuxtLink
              class="ForgotLink"
              :to="$localePath('/auth/password/request-change')"
            >
              {{ $t("pages.auth.login.form.fields.password.help") }}
            </NuxtLink>
          </FormBaseInputHelp>
        </template>
      </FormPasswordInput>

      <Button :text="$t('pages.auth.login.form.button')" />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/register')"
        :text="$t('pages.auth.login.footer.link1.text')"
        :link-text="$t('pages.auth.login.footer.link1.linkText')"
      />
    </template>
  </NuxtLayout>
</template>

<style scoped lang="sass">
.Form
  @include mixins.f-col()
  padding: 1rem .2rem
  width: 100%
  gap: 1rem

  .ForgotLink
    color: var(--text-primary)
</style>
