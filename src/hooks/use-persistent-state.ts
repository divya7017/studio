"use client";

import { useState, useEffect, useCallback } from 'react';

function usePersistentState<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This part runs only on the client initially
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Don't parse if item is null or the literal string "undefined"
      if (item === null || item === 'undefined') {
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        if (valueToStore === undefined) {
          // Don't store undefined, remove the key.
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    // This effect ensures that the state is updated on the client after hydration
    // if the localStorage value differs from the initial server-rendered value.
    try {
      const item = window.localStorage.getItem(key);
      if (item && item !== 'undefined') {
        const parsedItem = JSON.parse(item);
        if (JSON.stringify(parsedItem) !== JSON.stringify(storedValue)) {
            setStoredValue(parsedItem);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default usePersistentState;
