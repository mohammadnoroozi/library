
interface FieldValidationModel {
    required?: boolean,
    min?: number,
    max?: number,
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp,
    validate?: Function | Object,
    valueAsNumber?: boolean,
    valueAsDate?: boolean,
    setValueAs?: <T>(value: any) => T,
    value?: unknown,
    shouldUnregister?: boolean,
}

export default FieldValidationModel;
