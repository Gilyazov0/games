import { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((newValue?: boolean) => {
    if (newValue === undefined) {
      setState((prevState) => {
        return !prevState;
      });
    } else {
      setState(newValue);
    }
  }, []);

  return [state, toggle] as const;
};

export default useToggle;
