import { useState, useCallback } from "react";

function getValue(value, ...args) {
  if (typeof value === "function") {
    return value(...args);
  }

  return value;
}

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const current = global.localStorage.getItem(key);
      if (current) {
        return JSON.parse(current);
      } else {
        return getValue(defaultValue);
      }
    } catch (e) {
      return getValue(defaultValue);
    }
  });

  const setStorageValue = useCallback(
    (newValue) => {
      try {
        global.localStorage.setItem(
          key,
          JSON.stringify(getValue(newValue, value))
        );
      } catch (e) {
        // ignore
      }
      setValue(newValue);
    },
    [key, value]
  );

  return [value, setStorageValue];
};

export default useLocalStorage;
