import { useEffect, useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debouceValue, setDebouceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouceValue(value);
    }, delay);

    return () => clearInterval(timer);
  }, [value, delay]);

  return debouceValue;
};
