import { z } from "zod";

export const EmailSchema = z.string().email();

export const useSchemas = () => {
  const { t } = useI18n();

  const StringSchema = z.string({ required_error: t("schemas.required") });

  const EmailSchema = StringSchema.email(t("schemas.email"));
  const NameSchema = StringSchema.min(1, t("schemas.min", { min: 1 })).max(
    50,
    t("schemas.max", { max: 50 })
  );
  const PasswordSchema = StringSchema.min(8, t("schemas.min", { min: 8 }))
    .max(72, t("schemas.max", { max: 72 }))
    .regex(/[a-z]/, t("schemas.lowercase"))
    .regex(/[A-Z]/, t("schemas.uppercase"))
    .regex(/\d/, t("schemas.number"))
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, t("schemas.symbol"))
    .regex(/^[\x20-\x7E]+$/, t("schemas.invalid"));
  const UsernameSchema = StringSchema.min(3, t("schemas.min", { min: 3 }))
    .max(30, t("schemas.max", { max: 30 }))
    .regex(/^[a-zA-Z0-9-_]+$/, t("schemas.username"));

  return {
    EmailSchema,
    NameSchema,
    StringSchema,
    UsernameSchema,
    PasswordSchema,
  };
};
