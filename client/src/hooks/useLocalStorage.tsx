import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = (
  initialState: string | number | boolean,
  key: string,
): [
  value: string | number | boolean,
  setValue: Dispatch<SetStateAction<string | number | boolean>>,
] => {
  const [value, setValue] = useState<string | number | boolean>(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
