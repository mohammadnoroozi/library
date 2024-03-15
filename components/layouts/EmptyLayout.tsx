
export interface EmptyLayoutProps {
  children?: React.ReactNode,
}

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return (
    <div className="centered-container bg-light">
      <div className="container">{children}</div>
    </div>
  );
};

export default EmptyLayout;
