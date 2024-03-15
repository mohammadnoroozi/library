import FieldValidationModel from "./FieldValidationModel";

interface BaseFormFieldsProps {
    id?: string,
    name: string,
    validation?: FieldValidationModel,
    className?: string,
    inputClassName?: string,
    showErrorMessage?: boolean,
    onChange?: (value: string, target?: any) => void,
}

export default BaseFormFieldsProps;
