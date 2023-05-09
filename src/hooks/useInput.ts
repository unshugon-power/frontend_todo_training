import { ChangeEvent, useState } from "react";

export const useInput = (init: string = "") => {
  const [state, setState] = useState(init);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState(e.target.value);
  };
  const reset = (initialValue: string = "") => {
    setState(initialValue);
  };

  return { state, handleInput, reset };
};
