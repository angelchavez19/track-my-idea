import { z } from "zod";

export const EmailSchema = z.string().email();

export const useSchemas = () => {
  const { t } = useI18n();

  const StringSchema = z.string({ required_error: t("schemas.required") });

  const EmailSchema = StringSchema.email(t("schemas.email"));

  return {
    EmailSchema,
    StringSchema,
  };
};
