<script setup lang="ts">
import { IconSocialGoogle } from "#components";
import { toast } from "vue-sonner";
import { googleSdkLoaded } from "vue3-google-login";
import {
  BACKEND_URL,
  FRONTEND_URL,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URL,
  GOOGLE_CLIENT_ID,
} from "~/config/api";

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { locale } = useI18n();

const sendCodeToBackend = async (code: string) => {
  window.location.href = `${BACKEND_URL}/auth/social/google?code=${code}&lang=${locale.value}`;
};

const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "email profile",
        redirect_uri: `${FRONTEND_URL}/dashboard`,
        callback: (response) => {
          if (response.code) {
            sendCodeToBackend(response.code);
          }
        },
      })
      .requestCode();
  });
};

const getGithubLink = () => {
  const rootURl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${GITHUB_REDIRECT_URL}?lang=${locale.value}`,
    scope: "user:email",
    state: "/",
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
};

onMounted(() => {
  if (route.query.error === "provider_error") {
    toast.error(
      `You registered using a different provider. Please log in with ${route.query.provider}.`
    );
    router.push(localePath("auth/login"));
  }
});
</script>

<template>
  <div class="social">
    <button class="social-google" @click="login">
      <IconSocialGoogle />
      <span>{{ $t("components.social.google") }}</span>
    </button>
    <a :href="getGithubLink()" class="social-github">
      <IconSocialGithub />
      <span>{{ $t("components.social.github") }}</span>
    </a>
  </div>
</template>

<style scoped lang="sass">
.social
  @include mixins.f-c-col()
  width: 100%
  gap: 1rem

  .social-google,
  .social-github
    @include mixins.f-c()
    padding: .5rem
    gap: 1rem
    background-color: var(--primary)
    border: none
    outline: none
    text-decoration: none
    width: 100%
    border-radius: 40px
    cursor: pointer

    svg
      $size: 30px
      width: $size
      height: $size
      fill: var(--text-primary)

    span
      @include mixins.font-primary()
      color: var(--text)

  .social-google:active,
  .social-github:active
    transform: scale(.9)
</style>
