import { toast } from "vue-sonner";
import { useCustomForm } from "~/composables/form/use-custom-form";
import { BACKEND_URL } from "~/config/api";

export const useRequestChangePage = () => {
  const { $axios } = useNuxtApp();
  const { locale, t } = useI18n();
  const { handleSubmit, loading, isValid, reset } = useCustomForm();

  const onSubmit = handleSubmit(async (data) => {
    const objectData = data.toObject();
    try {
      await $axios.post(
        `${BACKEND_URL}/auth/password/request-change`,
        objectData,
        { params: { lang: locale.value } }
      );
      toast.success(t("pages.auth.requestChange.success"));
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404)
          toast.error(t("pages.auth.requestChange.errors.404"));
        else if (error.response.status === 409)
          toast.error(t("pages.auth.requestChange.errors.409"));
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
