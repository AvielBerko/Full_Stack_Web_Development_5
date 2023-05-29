import { useState, useEffect } from "react";
import { Serializiation } from "../../types/dataObjects.types";

export const useLocaleStorage = <T>(
  key: string,
  initialValue: T,
  serialization?: Serializiation<T>
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
    if (serialization) {
      console.log("Storage Initialized", serialization[1](storedValue));
      return serialization[1](parsedValue);
    }
    return parsedValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        const newValue = JSON.parse(event.newValue!);
        setValue(serialization ? serialization[1](newValue) : newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const updateLocaleStorage = (newValue: T) => {
    setValue(newValue);
    console.log(newValue);
    const newValueAsUnknow = serialization
      ? serialization[0](newValue)
      : newValue;
    console.log(newValueAsUnknow);
    const newData = JSON.stringify(newValueAsUnknow);
    console.log(newData, newValue);
    localStorage.setItem(key, newData);

    //dispatch event to notify other components
    const storageEvent = new StorageEvent("storage", {
      key,
      newValue: newData,
      storageArea: localStorage,
    });
    window.dispatchEvent(storageEvent);
  };

  return [value, updateLocaleStorage];
};
