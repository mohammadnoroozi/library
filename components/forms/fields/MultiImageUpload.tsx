import { Trash, Plus } from 'react-bootstrap-icons';
import { useFormContext } from 'react-hook-form';
import { uuidV4 } from '@/helpers/UuidHelper'
import ApiMessageModel from '@/models/base/ApiMessageModel';
import ImageUploadModel from '@/models/base/ImageUploadModel';
import { t } from '@/components/Translations';
import FieldError from '@/components/forms/FieldError';
import { useFormProps } from '@/components/forms/FormContext';
import BaseFormFieldsProps from '@/components/forms/props/BaseFormFieldsProps'
import { readModelProp } from "@/components/forms/FormHelper";
import React, { useState } from 'react';
import ImageView from '../../ui/ImageView';

export interface MultiImageUploadProps extends BaseFormFieldsProps {
    deleteCallback?: (path: string) => Promise<ApiMessageModel | null>;
}

export default function MultiImageUpload({
    name,
    id = uuidV4(),
    validation,
    className,
    inputClassName,
    deleteCallback,
    showErrorMessage = true,
}: MultiImageUploadProps) {
    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    const [showSingleItemForm, setShowSingleItemForm] = useState<boolean>(true);
    const defaultValue = readModelProp<ImageUploadModel[]>(model, name);

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    const deleteImage = (path: string): Promise<ApiMessageModel | null> | undefined => {
        if (deleteCallback) {
            return deleteCallback(path);
        }
    };

    return (<>
        <div className={`position-relative ${className || ''}`}>
            <button className="btn btn-outline-secondary d-block w-100 text-start" onClick={() => setShowSingleItemForm(false)}>
                <Plus size={24} />{t("Batch input")}
            </button>
            {!showSingleItemForm && <div className='border rounded p-2 my-1 bg-transparent-gray'>
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
            </div>}
            <button className="btn btn-outline-secondary d-block w-100 text-start mt-2" onClick={() => setShowSingleItemForm(true)}>
                <Plus size={24} />{t("Single item input")}
            </button>
            {showSingleItemForm && <div className='border rounded p-2 my-1 bg-transparent-gray'>
                <label className='d-block'>{t('href')}
                    <input className='form-control mb-2 ltr' name={`href[-1]`} />
                </label>
                <label className='d-block'>{t('title')}
                    <input className='form-control mb-2' name={`title[-1]`} />
                </label>
                <label className='d-block'>{t('description')}
                    <input className='form-control mb-2' name={`description[-1]`} />
                </label>
                <label className='d-block'>{t('mainFile')}
                    <input className='form-control mb-2' type='file' name={`mainFile[-1]`} />
                </label>
                <label className='d-block'>{t('thumbnail')}
                    <input className='form-control mb-2' type='file' name={`thumbnail[-1]`} />
                </label>
            </div>}
            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
            {defaultValue?.map((file, index) =>
                <div key={`${file.mainFile?.keyName}-${file.title}-${file.href}`}
                    className='border rounded p-2 my-1'>
                    <div className="row g-2">
                        <div className="col-4">
                            <div className="img-box">
                                <ImageView className='img-box-1-1 d-block' alt={file?.title} src={file?.mainFile?.keyName} />
                            </div>
                            <button type='button' className='btn btn-outline-danger my-2'
                                onClick={async () => {
                                    if (confirm(t("Delete image?"))) {
                                        await deleteImage(file?.thumbnail?.keyName ?? "");
                                        await deleteImage(file?.mainFile?.keyName ?? "");
                                    }
                                }}>
                                <Trash />
                            </button>
                        </div>
                        <div className="col-8">
                            <label className='d-block'>{t('href')}
                                <input className='form-control mb-2 ltr' name={`href[${index}]`} defaultValue={file.href} />
                            </label>
                            <label className='d-block'>{t('title')}
                                <input className='form-control mb-2' name={`title[${index}]`} defaultValue={file.title} />
                            </label>
                            <label className='d-block'>{t('description')}
                                <input className='form-control mb-2' name={`description[${index}]`} defaultValue={file.description} />
                            </label>
                            <label className='d-block'>{t('mainFile')}
                                <input className='form-control mb-2' type='file' name={`mainFile[${index}]`} />
                            </label>
                            <label className='d-block'>{t('thumbnail')}
                                <input className='form-control mb-2' type='file' name={`thumbnail[${index}]`} />
                            </label>
                            {file.thumbnail?.displayName}
                        </div>
                    </div>
                </div>)}
        </div></>
    );
}
