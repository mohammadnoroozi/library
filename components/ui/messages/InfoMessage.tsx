import Message from "./Message";

export interface InfoMessageProps {
  children?: React.ReactNode,
  message?: string,
  box?: boolean
}

const InfoMessage = ({ children, message, box = false }: InfoMessageProps) => {
  return <Message variant="info" box={box} message={message}>{children}</Message>;
};

export default InfoMessage;
