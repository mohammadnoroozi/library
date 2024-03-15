import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import SelectAsync from 'react-select/async'
import { useState } from "react";
import { MultiSelectOptionProps } from "@/components/forms/fields/MultiSelect";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";
import { MultiValue } from "react-select";

export interface MultiSelectAsyncProps extends BaseFormFieldsProps {
  defaultOptions?: MultiSelectOptionProps[],
  useOptions?: any | undefined,
}

export interface QueryStateProps {
  text?: string,
  callback?: (options: MultiSelectOptionProps[]) => void,
}

function MultiSelectAsync({
  name,
  id = uuidV4(),
  defaultOptions,
  validation,
  className,
  inputClassName,
  showErrorMessage = true,
  useOptions,
}: MultiSelectAsyncProps) {

  const { formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<string[]>(model, name);

  const defaultSelectedItems = defaultOptions?.filter(i => defaultValue?.indexOf(i.value) !== -1);

  const label = labelPrefix + '.' + name;

  const [selection, setSelection] = useState(defaultSelectedItems);
  const [query, setQuery] = useState<QueryStateProps>({
    text: "",
    callback: undefined
  });


  useOptions(query.text, query.callback)

  const loadOptions = (
    inputValue: string,
    callback: (options: MultiSelectOptionProps[]) => void
  ) => {
    if (query?.text !== inputValue)
      setQuery({
        text: inputValue,
        callback: callback
      });
  };

  const onChange = (values: MultiValue<MultiSelectOptionProps>) => {
    setSelection(values.map((item: MultiSelectOptionProps) => item));
  };

  return (
    <div className={`position-relative ${className || ''}`}>
      <label htmlFor={id}>{t(label)}</label>
      <SelectAsync
        className={`${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
        loadOptions={loadOptions}
        isMulti={true}
        defaultOptions={defaultOptions}
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

export default MultiSelectAsync;
