import { t } from "@/components/Translations";

export interface MessageProps {
    children?: React.ReactNode,
    message?: string | React.ReactNode,
    variant: string,
    box: boolean,
}

const Message = ({ children, message, variant, box }: MessageProps) => {
    const messageChild = typeof message === "string" ? t(message) : message;
    if (!children && !message) return <></>;
    return box
        ? <div className={`alert alert-${variant}`}>
            {messageChild && messageChild}
            {children}
        </div>
        : <div role="alert" className={`text-${variant} mb-3`}>
            {messageChild && messageChild}
            {children}
        </div>;
};

export default Message;
