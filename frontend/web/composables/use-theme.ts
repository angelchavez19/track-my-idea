export type ThemeT = "system" | "dark" | "light";

export const useTheme = () => {
  const storage = useLocalStorage<string>({
    defaultValue: "system",
    key: "track-my-idea:theme",
  });
  const themeSelected = ref(storage.value.value);

  const changeTheme = (theme: ThemeT) => {
    themeSelected.value = theme;
    storage.value.value = theme;

    if (theme === "system") document.body.removeAttribute("data-theme");
    else document.body.setAttribute("data-theme", theme);
  };

  changeTheme(themeSelected.value as ThemeT);

  return { changeTheme, themeSelected };
};
