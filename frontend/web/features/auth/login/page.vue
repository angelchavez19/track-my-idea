<script setup lang="ts"></script>

<template>
  <NuxtLayout name="auth">
    <template #title>Log In to your Account</template>

    <form novalidate class="Form">
      <FormEmailInput label="Email" name="email" />
      <FormPasswordInput label="Password" name="password">
        <template #help>
          <FormBaseInputHelp>
            <NuxtLink
              class="ForgotLink"
              :to="$localePath('/auth/password/request-change')"
            >
              Forgot your password?
            </NuxtLink>
          </FormBaseInputHelp>
        </template>
      </FormPasswordInput>

      <Button text="Log In" />
    </form>

    <template #footer>
      <FormLink
        :to="$localePath('/auth/register')"
        text="You don't have an account?"
        link-text="Create an account"
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
