<script setup lang="ts">
import { toast } from "vue-sonner";
import { useCustomForm } from "~/components/form/use-custom-form";
import { BACKEND_URL } from "~/config/api";

const { $axios, $localePath } = useNuxtApp();
const { t } = useI18n();
const { handleSubmit, loading, isValid } = useCustomForm();
const router = useRouter();

const onSubmit = handleSubmit(async (data) => {
  try {
    await $axios.post(`${BACKEND_URL}/auth/login`, data);
    router.push($localePath("/app"));
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) toast.error(t("pages.auth.login.errors.401"));
      else if (error.response.status === 404)
        toast.error(t("pages.auth.login.errors.404"));
      else toast.error(t("error.500"));
    }
  }
});
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>{{ $t("pages.auth.login.title") }}</template>

    <form @submit.prevent="onSubmit" novalidate class="Form">
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

      <Button
        :text="$t('pages.auth.login.form.button')"
        :loading="loading"
        :disabled="!isValid"
      />
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
