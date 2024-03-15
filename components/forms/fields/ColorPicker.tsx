import { useEffect, useState } from 'react';
import { Eyedropper } from 'react-bootstrap-icons';
import { HexColorPicker } from 'react-colorful';
import { useFormContext } from 'react-hook-form';
import { getVariant, invertHex } from '@/helpers/ColorHelper';
import { t } from '@/components/Translations';
import FieldError from '@/components/forms/FieldError';
import { useFormProps } from '@/components/forms/FormContext';
import BaseFormFieldsProps from '@/components/forms/props/BaseFormFieldsProps';
import { readModelProp } from "@/components/forms/FormHelper";
import React from 'react';

export interface ColorPickerProps extends BaseFormFieldsProps {
}

function ColorPicker({
    name,
    validation,
    className,
    inputClassName,
    showErrorMessage = true
}: ColorPickerProps) {

    const { register, formState: { errors }, setValue } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    let defaultValue = readModelProp<string>(model, name) ?? "#ffffff";

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    const [baseColor, setBaseColor] = useState(defaultValue);
    const [color, setColor] = useState(defaultValue);

    useEffect(() => {
        setColor(baseColor);
    }, [baseColor])

    const [show, setShow] = useState(false);

    const handleChange = (color: string) => {
        setColor(color);
        setValue(name, color);
    };

    const handleCancel = () => {
        setColor(baseColor);
        setValue(name, baseColor);
        setShow(false);
    };

    const handleSave = () => {
        setShow(false);
        setBaseColor(color);
    };

    return (
        <div className={`position-relative ${className || ''}`}>
            <div className="color-picker">

                <div className={`input-group ${inputClassName || ''}`}>
                    <span className="input-group-text">{t(label)}</span>

                    <input
                        type="text"
                        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                        defaultValue={defaultValue}
                        aria-invalid={errors[name] ? "true" : "false"}
                        aria-label={t(label)}
                        {...registration}
                        onChange={(e) => {
                            setColor(e.target.value)
                            return registration.onChange(e);
                        }}
                    />
                    <button type="button" className={`handle ${errors[name] ? "is-invalid" : ""} `}
                        style={{ background: color, color: invertHex(color) }} onClick={() => setShow(!show)}>
                        <Eyedropper />
                    </button>
                </div>

                {show &&
                    <>
                        <div className="page-blocker" onClick={handleSave}></div>
                        <div className="holder">
                            <div className="d-flex">
                                <button type="button" className="btn btn-light cancel"
                                    onClick={handleCancel}>{t('ColorPicker.cancel')}</button>
                                <button type="button" className={`btn btn-${getVariant()} save`}
                                    onClick={handleSave}>{t('ColorPicker.save')}</button>
                            </div>
                            <HexColorPicker color={color} onChange={handleChange} />
                        </div>
                    </>
                }
            </div>

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />

        </div>
    );
};

export default ColorPicker;
