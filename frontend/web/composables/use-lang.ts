import { Locales, type LocalesT } from "~/i18n.config";

export const useLang = () => {
  const { defaultLocale, setLocale } = useI18n();

  const navigatorLang = navigator.language.split("-")[0] as LocalesT;

  const userLang = Locales.includes(navigatorLang)
    ? navigatorLang
    : defaultLocale;

  const storage = useLocalStorage<LocalesT>({
    defaultValue: userLang,
    key: "track-my-idea:lang",
  });

  const langSelected = ref(storage.value.value);

  const changeLang = (lang: LocalesT) => {
    langSelected.value = lang;
    storage.value.value = lang;

    const scrollPosition = window.scrollY;

    setLocale(lang);

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 30);
  };

  return {
    changeLang,
    langSelected,
  };
};
