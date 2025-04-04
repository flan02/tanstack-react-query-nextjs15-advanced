import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// TODO: This is a more advanced version of the useDebounce hook that allows you to transform the value before debouncing it
/* 
function useDebounce<TInput, TOutput>(
  value: TInput,
  transform: (val: TInput) => TOutput,
  delay: number = 500
): TOutput {
  const [debouncedValue, setDebouncedValue] = useState<TOutput>(transform(value));

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(transform(value));
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, transform]);

  return debouncedValue;
}
*/