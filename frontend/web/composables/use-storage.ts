import { ref, watch } from "vue";

export interface LocalStorageProps<T> {
  defaultValue: T;
  key: string;
}

export const useLocalStorage = <T>({
  defaultValue,
  key,
}: LocalStorageProps<T>) => {
  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as unknown as T;
      }
    }

    if (typeof defaultValue === "object")
      localStorage.setItem(key, JSON.stringify(defaultValue));
    else localStorage.setItem(key, String(defaultValue));

    return defaultValue;
  };

  const value = ref<T>(getStoredValue());

  watch(
    value,
    (newValue) => {
      if (typeof newValue === "object")
        localStorage.setItem(key, JSON.stringify(newValue));
      else localStorage.setItem(key, String(newValue));
    },
    { deep: typeof defaultValue === "object" }
  );

  return { value };
};
