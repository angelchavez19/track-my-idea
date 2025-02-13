import { ref, watch } from "vue";

export interface LocalStorageProps<T> {
  defaultValue: T;
  key: string;
}

export const useLocalStorage = <T>({
  defaultValue,
  key,
}: LocalStorageProps<T>) => {
  const isObject = typeof defaultValue === "object";

  const setStorageValue = (value: T) => {
    if (isObject) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.setItem(key, String(value));
  };

  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null)
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return storedValue as unknown as T;
      }

    setStorageValue(defaultValue);
    return defaultValue;
  };

  const value = ref<T>(getStoredValue());

  watch(
    value,
    (newValue) => {
      setStorageValue(newValue);
    },
    { deep: isObject }
  );

  return { value };
};
