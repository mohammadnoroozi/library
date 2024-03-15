import { useFormContext } from "react-hook-form";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import Form from 'react-bootstrap/Form'
import { uuidV4 } from "@/helpers/UuidHelper";
import { readModelProp } from "@/components/forms/FormHelper";

export interface CheckboxProps extends BaseFormFieldsProps {
}

function Checkbox({
  name, id = uuidV4(),
  validation,
  className,
  inputClassName,
  showErrorMessage = true
}: CheckboxProps) {

  const { register, formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<boolean>(model, name) === true;

  const label = labelPrefix + '.' + name;
  const registration = register(name, validation as any);

  return (
    <div className={`position-relative ${className || ''}`}>
      <label >
        <Form.Check type="switch"
          className={`d-inline-block ${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
          id={id}
          placeholder={t(label)}
          defaultChecked={defaultValue}
          aria-invalid={errors[name] ? "true" : "false"}
          {...registration}
          onChange={(e) => registration.onChange(e)}
          value="true"
        />
        <input type="hidden" value="false" name={name}></input>
        {t(label)}</label>

      <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
    </div>
  );
};

export default Checkbox;
