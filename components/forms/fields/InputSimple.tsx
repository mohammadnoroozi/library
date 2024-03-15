import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import { InputProps } from "@/components/forms/fields/Input";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";

function InputSimple({
  name, id = uuidV4(),
  type = 'text',
  validation,
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

  return (<>
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

    <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
  </>
  );
};

export default InputSimple;
