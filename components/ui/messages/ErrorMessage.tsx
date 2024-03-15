import Message from "./Message";

export interface ErrorMessageProps {
  children?: React.ReactNode,
  message?: string | React.ReactNode
  box?: boolean
}

const ErrorMessage = ({ children, message, box = false }: ErrorMessageProps) => {
  return <Message variant="danger" box={box} message={message}>{children}</Message>;
};

export default ErrorMessage;
