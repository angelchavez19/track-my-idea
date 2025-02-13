import { useForm, type FormObject, type MaybeAsync } from "@formwerk/core";
import type { Jsonify } from "type-fest";

type ConsumableData<TOutput extends FormObject> = {
  toFormData: () => FormData;
  toObject: () => TOutput;
  toJSON: () => Jsonify<TOutput>;
};

interface SubmitContext {
  form?: HTMLFormElement;
  event?: Event | SubmitEvent;
}

export const useCustomForm = () => {
  const { handleSubmit, ...form } = useForm();

  const loading = ref(false);

  const onSubmit = (
    onSuccess: (
      payload: ConsumableData<FormObject>,
      ctx: SubmitContext
    ) => MaybeAsync<unknown>
  ) => {
    return handleSubmit(async (data, ctx) => {
      loading.value = true;
      await onSuccess(data, ctx);
      loading.value = false;
    });
  };

  return {
    handleSubmit: onSubmit,
    loading,
    ...form,
  };
};
