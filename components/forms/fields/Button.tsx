import { getVariant } from "@/helpers/ColorHelper";
import { MouseEventHandler } from "react";
import { t } from "@/components/Translations";

export interface ButtonProps {
  label?: string | undefined;
  children?: React.ReactNode | undefined;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
  autoFocus?: boolean | undefined;
  className?: string | undefined;
  variant?: string | undefined;
  type?: 'submit' | 'reset' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ label, children, loading = false, disabled = false, className, autoFocus = false, variant = getVariant(), type = "button", onClick }: ButtonProps) => {
  return loading ? (
    <div className={`btn btn-${variant} disabled btn-lg align-items-center ${className || ''}`}>
      <div
        className={`spinner-border spinner-border-sm ${label ? "me-2" : ""}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {label && t(label)}
    </div>
  ) : (
    <button type={type} autoFocus={autoFocus} className={`btn btn-${variant} btn-lg ${className || ''}`} disabled={disabled} onClick={onClick}>
      {children}
      {label && t(label)}
    </button>
  );
};

export default Button;
