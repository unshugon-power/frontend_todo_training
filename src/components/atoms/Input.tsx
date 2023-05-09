import React, { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

export const Input = (props: Props) => {
  const { style } = props;
  return <input {...props} style={{ borderRadius: "5px", ...style }} />;
};
