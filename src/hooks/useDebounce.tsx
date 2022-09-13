import { useState } from "react";

function useDebounce(value, delay) {
  let [debounced, setdebounced] = useState(value);
  let [values, setValues] = useState(value);

  
  function debouncedValue(newValue) {
    if (typeof newValue === 'function') {
        newValue = newValue(debounced)
    }

    setTimeout(() => {
      setdebounced(newValue);
    }, delay);
  }

  return {
    debounced: [debounced, debouncedValue],
    notDebounced: [values, setValues],
  };
}

export default useDebounce;
