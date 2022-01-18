import React from "react";
import { SmallText } from "../../styles/type";

export interface ErrorTextProps {
  error: string;
}

const ErrorText = (props: ErrorTextProps) => {
  const { error } = props;

  if (error === "") return null;

  return <SmallText errorString>{error}</SmallText>;
};

export default ErrorText;
