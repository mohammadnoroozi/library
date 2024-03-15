import React, { useContext } from "react";

export interface FormContextProps {
    objectKey?: string,
    loading?: string,
    labelPrefix?: string,
    model?: any
    children?: React.ReactNode
}

export interface FormContextReturnProps {
    objectKey: string,
    loading?: string,
    labelPrefix?: string,
    model?: any
}

const FormContext = React.createContext<FormContextReturnProps>({ objectKey: '' });

function FormProps({ objectKey, loading, labelPrefix, model, children }: FormContextProps) {

    return <FormContext.Provider value={{
        objectKey: objectKey ? objectKey : (model ? model.id : ''),
        loading,
        model,
        labelPrefix
    }}>
        {children}
    </FormContext.Provider>;
}

export default FormProps;

export const useFormProps = () => useContext<FormContextReturnProps>(FormContext);
