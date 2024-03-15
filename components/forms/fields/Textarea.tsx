import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";

export interface TextareaProps extends BaseFormFieldsProps {

}

function Textarea({
  name,
  id = uuidV4(),
  validation,
  className,
  inputClassName,
  showErrorMessage = true
}: TextareaProps) {

  const { register, formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<string>(model, name);

  const label = labelPrefix + '.' + name;
  const registration = register(name, validation as any);

  return (
    <div className={`position-relative ${className || ''}`}>
      <div className="form-floating">
        <textarea
          className={`form-control hf-150 ${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
          id={id}
          placeholder={t(label)}
          defaultValue={defaultValue}
          {...registration}
          onChange={(e) => registration.onChange(e)}
          aria-invalid={errors[name] ? "true" : "false"}
        />
        <label htmlFor={id}>{t(label)}</label>
      </div>

      <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
    </div>
  );
};

export default Textarea;
