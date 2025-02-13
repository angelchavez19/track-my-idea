import { messages } from "./locales/messages";

export type LocalesT = "en" | "es";

export const Locales: LocalesT[] = ["en", "es"];

export interface Lang {
  value: LocalesT;
  label: string;
}

export const defaultLang: Lang = { value: "en", label: "English" };

export const Languages: Lang[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

export default defineI18nConfig(() => ({
  legacy: false,
  messages,
}));
