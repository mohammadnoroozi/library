import { Trash, Clipboard } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';
import { uuidV4 } from '@/helpers/UuidHelper'
import ApiMessageModel from '@/models/base/ApiMessageModel';
import FileUploadModel from '@/models/base/FileUploadModel';
import { t } from '@/components/Translations';
import FieldError from '@/components/forms/FieldError';
import { useFormProps } from '@/components/forms/FormContext';
import BaseFormFieldsProps from '@/components/forms/props/BaseFormFieldsProps'
import { readModelProp } from "@/components/forms/FormHelper";

export interface MultiFileUploadProps extends BaseFormFieldsProps {
    deleteCallback?: (path: string) => Promise<ApiMessageModel | null>;
}

export default function MultiFileUpload({
    name,
    id = uuidV4(),
    validation,
    className,
    inputClassName,
    deleteCallback,
    showErrorMessage = true,
}: MultiFileUploadProps) {
    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    const defaultValue = readModelProp<FileUploadModel[]>(model, name);

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    const deleteFile = (path: string) => {
        if (deleteCallback) {
            return deleteCallback(path);
        }
    };

    return (
        <div className={`position-relative ${className || ''}`}>
            <div>
                <label htmlFor={id} className="form-label d-block curser-pointer">
                    {t(label)}
                </label>
                <input
                    className={`form-control ${inputClassName || ''}`}
                    type="file"
                    id={id}
                    {...registration}
                    onChange={(e) => registration.onChange(e)}
                    multiple={true}
                />
            </div>
            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
            {defaultValue?.map(file => <div key={file.keyName} className='card card-body py-1 my-1'>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <button type='button' className='btn btn-transparent text-danger py-0' onClick={() => {
                            if (confirm(t("Delete file?"))) {
                                return deleteFile(file.keyName);
                            }
                        }}>
                            <Trash />
                        </button>
                        <button type='button' className='btn btn-transparent text-success py-0 ms-2' onClick={() => {
                            return navigator.clipboard.writeText(file.keyName);
                        }}>
                            <Clipboard />
                        </button>
                    </div>
                    <div className="col ltr">
                        <a className='d-block link-dark' target="_blank" href={file.keyName}
                            rel="noreferrer">{file.displayName}</a>
                    </div>
                </div>
            </div>)}
        </div>
    );
}
