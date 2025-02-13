export type ThemeT = "dark" | "light";

export const useTheme = () => {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const storage = useLocalStorage<ThemeT>({
    defaultValue: isDark ? "dark" : "light",
    key: "track-my-idea:theme",
  });

  const themeSelected = ref(storage.value.value);

  const changeTheme = (theme: ThemeT) => {
    themeSelected.value = theme;
    storage.value.value = theme;

    document.body.setAttribute("data-theme", theme);
  };

  changeTheme(themeSelected.value);

  return { changeTheme, themeSelected };
};
