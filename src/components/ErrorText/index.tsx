export interface ErrorTextProps {
  error: string;
}

const ErrorText = (props: ErrorTextProps) => {
  const { error } = props;

  if (error === "") return null;

  return <small className="error">{error}</small>;
};

export default ErrorText;
