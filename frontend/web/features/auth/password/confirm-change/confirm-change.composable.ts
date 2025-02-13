import { toast } from "vue-sonner";
import { useCustomForm } from "~/composables/form/use-custom-form";
import { BACKEND_URL } from "~/config/api";

export const useConfirmChangePage = () => {
  const { $axios } = useNuxtApp();
  const { t } = useI18n();
  const route = useRoute();
  const { handleSubmit, loading, isValid, reset } = useCustomForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!route.query.token) {
      toast.error(t("pages.auth.confirmChange.error"));
      return;
    }

    const objectData = data.toObject();
    try {
      await $axios.post(
        `${BACKEND_URL}/auth/password/confirm-change`,
        objectData,
        { params: { token: route.query.token } }
      );
      toast.success(t("pages.auth.confirmChange.success"));
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404)
          toast.error(t("pages.auth.confirmChange.error"));
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
