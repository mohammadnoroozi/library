import { useFormContext } from "react-hook-form";
import { t } from "@/components/Translations";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { useFormProps } from "@/components/forms/FormContext";
import FieldError from "@/components/forms/FieldError";
import { uuidV4 } from "@/helpers/UuidHelper";
import { readModelProp } from "@/components/forms/FormHelper";
import FileUploadModel from "@/models/base/FileUploadModel";
import React from "react";

export interface FileUploadProps extends BaseFormFieldsProps {
  multiple?: boolean,
}

function FileUpload({
  name,
  id = uuidV4(),
  validation,
  className,
  multiple,
  inputClassName,
  showErrorMessage = true
}: FileUploadProps) {

  const { register, formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<FileUploadModel>(model, name);

  const label = labelPrefix + '.' + name;
  const registration = register(name, validation as any);

  return (
    <div className={`position-relative ${className || ''}`}>
      <div >
        <label htmlFor={id} className="form-label d-block curser-pointer">
          {t(label)}
        </label>
        <input
          className={`form-control ${inputClassName || ''}`}
          type="file"
          id={id}
          {...registration}
          onChange={(e) => registration.onChange(e)}
          multiple={multiple}
        />
      </div>
      <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
      {defaultValue && <a className="d-block link-dark" href={defaultValue.keyName}>{defaultValue.displayName}</a>}
    </div>
  );
};

export default FileUpload;
