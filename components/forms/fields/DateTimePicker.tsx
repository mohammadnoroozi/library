import { useFormContext } from "react-hook-form";
import { uuidV4 } from "@/helpers/UuidHelper";
import { t } from "@/components/Translations";
import FieldError from "@/components/forms/FieldError";
import { useFormProps } from "@/components/forms/FormContext";
import BaseFormFieldsProps from "@/components/forms/props/BaseFormFieldsProps";
import { PatternFormat } from 'react-number-format';
import { readModelProp } from "@/components/forms/FormHelper";

export interface DateTimePickerProps extends BaseFormFieldsProps {
    autoComplete?: string,
    autoFocus?: boolean
}

function DateTimePicker({
    name, id = uuidV4(),
    validation,
    className,
    autoComplete,
    autoFocus,
    inputClassName,
    showErrorMessage = true
}: DateTimePickerProps) {

    const { register, formState: { errors } } = useFormContext();
    const { labelPrefix, model } = useFormProps();
    const defaultValue = readModelProp<string>(model, name);

    const label = labelPrefix + '.' + name;
    const registration = register(name, validation as any);

    return (
        <div className={`position-relative ${className || ''}`}>
            <div className="form-floating">
                <PatternFormat
                    className={`form-control ltr ${errors[name] ? "is-invalid" : ""} ${inputClassName || ''}`}
                    id={id}
                    placeholder="yyyy/mm/dd hh:ss"
                    defaultValue={defaultValue}
                    aria-invalid={errors[name] ? "true" : "false"}
                    format="####/##/## ##:##"
                    {...registration}
                    // onChange={(e) => registration.onChange(e)}
                    onValueChange={(values, sourceInfo) => {
                        // const { formattedValue, value } = values;
                        // Event is a Synthetic Event wrapper which holds target and other information. Source tells whether the reason for this function being triggered was an 'event' or due to a 'prop' change
                        // const { event, source } = sourceInfo;
                        const { event } = sourceInfo;
                        return registration.onChange(event as any)
                    }}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                />
                <label htmlFor={id}>{t(label)}</label>
            </div>

            <FieldError show={showErrorMessage} name={name} label={label} errors={errors} />
        </div>
    );
}

export default DateTimePicker;
