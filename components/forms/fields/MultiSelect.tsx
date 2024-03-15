import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import Select, { MultiValue } from 'react-select'
import { useState } from "react";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";

export interface MultiSelectProps extends BaseFormFieldsProps {
  items?: MultiSelectOptionProps[],
}

export interface MultiSelectOptionProps {
  label: string,
  value: string,
}

function MultiSelect({
  name,
  id = uuidV4(),
  items,
  validation,
  className,
  inputClassName,
  showErrorMessage = true,
}: MultiSelectProps) {

  const { formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<string[]>(model, name);

  const defaultSelectedItems = items?.filter(i => defaultValue?.indexOf(i.value) !== -1);

  const label = labelPrefix + '.' + name;

  const [selection, setSelection] = useState(defaultSelectedItems);

  const onChange = (values: MultiValue<MultiSelectOptionProps>) => {
    setSelection(values.map((item: MultiSelectOptionProps) => item));
  };

  const validItems = items && items.length > 0
  return !validItems ? <></> : (
    <div className={`position-relative ${className || ''}`}>
      <label htmlFor={id}>{t(label)}</label>
      <Select
        className={`${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
        options={items}
        isMulti={true}
        defaultValue={defaultSelectedItems}
        onChange={onChange} />

      {selection?.map((item: MultiSelectOptionProps) => <input
        key={item.value}
        type="hidden"
        name={name + "[]"}
        value={item.value}
      />)}
      <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
    </div>
  );
};

export default MultiSelect;
