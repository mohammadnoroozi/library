import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";

export interface HiddenProps extends BaseFormFieldsProps {
}

function Hidden({
  name,
  id = uuidV4(),
  validation,
}: HiddenProps) {

  const { register } = useFormContext();
  const { model } = useFormProps();
  const defaultValue = readModelProp<string>(model, name);

  const registration = register(name, validation as any);

  return (
    <input
      type='hidden'
      id={id}
      defaultValue={defaultValue}
      {...registration}
    />
  );
};

export default Hidden;
