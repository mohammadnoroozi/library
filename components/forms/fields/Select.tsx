import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { readModelProp } from "@/components/forms/FormHelper";
import React from "react";
import ReactSelect, { ActionMeta, SingleValue } from 'react-select';

export interface SelectProps extends BaseFormFieldsProps {
    items?: SelectOptionProps[],
    addEmptyItem?: boolean,
}

export interface SelectOptionProps {
    label: string,
    value: string,
}

export function initSelectData(data: any[] | undefined, valueKey: string | undefined, textKey: string | string[] | undefined) {
    if (!data || !data.length) {
        return [];
    }

    const getText = (item: any, keys: string[]) => {
        let text = '';
        keys = keys.filter(a => !!a);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (text.length > 0) {
                text = text + " - ";
            }
            text += item[key];
        }
        return text;
    }

    return data.map(item => {
        return {
            value: valueKey ? item[valueKey] : item,
            label: textKey ? getText(item, Array.isArray(textKey) ? textKey : [textKey]) : item
        }
    });
}

function Select({
    name,
    id = uuidV4(),
    items,
    validation,
    className,
    inputClassName,
    addEmptyItem = true,
    showErrorMessage = true,
    onChange
}: SelectProps) {

    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    const options = addEmptyItem ? [{
        label: t('Please select one item'),
        value: ''
    }, ...(items ?? [])] : items;

    const defaultValue = readModelProp<string>(model, name);
    const defaultSelectedItems = options?.filter(i => i.value == defaultValue);
    const defaultSelectedItem = defaultSelectedItems && defaultSelectedItems.length ? defaultSelectedItems[0] : undefined;

    const changed = async (newValue: SingleValue<SelectOptionProps>, actionMeta: ActionMeta<SelectOptionProps>) => {
        if (onChange) {
            onChange(newValue?.value ?? "", newValue);
        }
        await registration.onChange({ target: { name: name }, type: 'change' })
    }
    const validItems = items && items.length > 0
    return !validItems ? <></> : (
        <div className={`${errors[name] ? "is-invalid" : ""} ${className || ''}`}
            aria-invalid={errors[name] ? "true" : "false"}>
            <label htmlFor={id}>{t(label)}</label>
            <ReactSelect
                id={id}
                className={inputClassName || ''}
                placeholder={t(label)}
                defaultValue={defaultSelectedItem}
                options={options}
                {...registration}
                onChange={changed}
                getOptionValue={(opt) => opt.value}
                getOptionLabel={(opt) => opt.label}
            />

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
        </div>
    );
};

export default Select;
