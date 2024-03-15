import { useFormContext } from "react-hook-form";
import { t } from "@/components/Translations";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { useFormProps } from "@/components/forms/FormContext";
import { FileImageFill } from "react-bootstrap-icons";
import FieldError from "@/components/forms/FieldError";
import { uuidV4 } from "@/helpers/UuidHelper";
import { readModelProp } from "@/components/forms/FormHelper";
import ImageUploadModel from "@/models/base/ImageUploadModel";
import ImageView from "../../ui/ImageView";
import FileUploadModel from "@/models/base/FileUploadModel";

export interface ImageUploadProps extends BaseFormFieldsProps {
  multiple?: boolean,
  previewImage?: boolean,
  imageClassName?: string,
}

function ImageUpload({
  name,
  id = uuidV4(),
  validation,
  className,
  multiple,
  inputClassName,
  imageClassName = 'mw-100 hf-100 border d-block',
  previewImage = true,
  showErrorMessage = true
}: ImageUploadProps) {

  const { register, formState: { errors } } = useFormContext();
  const { labelPrefix, model } = useFormProps();
  const defaultValue = readModelProp<ImageUploadModel | FileUploadModel>(model, name);

  const label = labelPrefix + '.' + name;
  const registration = register(name, validation as any);

  const src = (defaultValue as ImageUploadModel)?.mainFile?.keyName
    ?? (defaultValue as FileUploadModel)?.keyName;

  return (
    <div className={`position-relative ${className || ''}`}>
      <div >
        <label htmlFor={id} className="form-label d-block curser-pointer">
          {t(label)}
          {previewImage && defaultValue &&
            <ImageView src={src} alt="" className={imageClassName || ''} />
          }
          {previewImage && !defaultValue && <div className={`py-5 ${imageClassName || ''} hf-100 bg-light d-flex align-items-center justify-content-center`}>
            <FileImageFill className="text-gray-dark" size={56} />
          </div>}
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

    </div>
  );
};

export default ImageUpload;
