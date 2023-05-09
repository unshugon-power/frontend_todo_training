import React from "react";

type Props = {
  state: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
};

export const Input = (props: Props) => {
  const { state, handleInput, type } = props;
  return <input value={state} onChange={handleInput} type={type} />;
};
