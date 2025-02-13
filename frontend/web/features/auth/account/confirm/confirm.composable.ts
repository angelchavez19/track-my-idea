import { BACKEND_URL } from "~/config/api";

export const useConfirmPage = () => {
  const { $axios } = useNuxtApp();
  const { t } = useI18n();
  const route = useRoute();

  const info = ref({
    title: t("pages.auth.confirm.title"),
    description: t("pages.auth.confirm.description"),
  });

  onMounted(async () => {
    if (!route.query.token) {
      info.value = {
        title: t("pages.auth.confirm.error.400.title"),
        description: t("pages.auth.confirm.error.400.description"),
      };
      return;
    }
    try {
      await $axios.get(`${BACKEND_URL}/auth/account/confirm`, {
        params: { token: route.query.token },
      });
      info.value = {
        title: t("pages.auth.confirm.success.title"),
        description: t("pages.auth.confirm.success.description"),
      };
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404)
          info.value = {
            title: t("pages.auth.confirm.error.404.title"),
            description: t("pages.auth.confirm.error.404.description"),
          };
        else
          info.value = {
            title: t("pages.auth.confirm.error.400.title"),
            description: t("pages.auth.confirm.error.400.description"),
          };
      }
    }
  });

  return { info };
};
