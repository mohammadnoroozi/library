import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { readModelProp } from "@/components/forms/FormHelper";

export interface InputProps extends BaseFormFieldsProps {
    type?: string,
    autoComplete?: string,
    autoFocus?: boolean
}

function Input({
    name, id = uuidV4(),
    type = 'text',
    validation,
    className,
    autoComplete,
    autoFocus,
    inputClassName,
    showErrorMessage = true
}: InputProps) {

    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    const defaultValue = readModelProp<string>(model, name);

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    return (
        <div className={`position-relative ${className || ''}`}>
            <div className="form-floating">
                <input
                    type={type}
                    className={`form-control ${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
                    id={id}
                    placeholder={t(label)}
                    defaultValue={defaultValue}
                    aria-invalid={errors[name] ? "true" : "false"}
                    {...registration}
                    onChange={(e) => registration.onChange(e)}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
                <label htmlFor={id}>{t(label)}</label>
            </div>

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
        </div>
    );
}

export default Input;
