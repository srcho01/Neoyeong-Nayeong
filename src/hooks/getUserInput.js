import { useState, useCallback } from "react";

const getUserInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChange];
};

export default getUserInput;