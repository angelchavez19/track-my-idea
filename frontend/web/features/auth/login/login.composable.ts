import { toast } from "vue-sonner";
import { useCustomForm } from "~/composables/form/use-custom-form";
import { BACKEND_URL } from "~/config/api";

export const useLoginPage = () => {
  const { $axios, $localePath } = useNuxtApp();
  const { t } = useI18n();
  const { handleSubmit, loading, isValid, reset } = useCustomForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await $axios.post(`${BACKEND_URL}/auth/login`, data);
      router.push($localePath("/app"));
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401)
          toast.error(t("pages.auth.login.errors.401"));
        else if (error.response.status === 404)
          toast.error(t("pages.auth.login.errors.404"));
        else toast.error(t("error.500"));
      }
    }

    await reset();
  });

  return {
    loading,
    isValid,
    onSubmit,
  };
};
