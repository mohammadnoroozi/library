import { tf } from "@/components/Translations";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";

export interface FieldErrorProps {
    name: string,
    label: string,
    errors?: any,
    show: boolean
}

const FieldError = ({ name, label, errors, show }: FieldErrorProps): JSX.Element => {
    if (!errors[name] || !show) return <></>;
    const error = errors[name];
    const key = !error.message || !error.message.length ? error.type : error.message;
    return errors[name] ? (
        <ErrorMessage message={tf(key)(label)} />
    ) : <></>;
};

export default FieldError;
