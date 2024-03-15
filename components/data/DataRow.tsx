import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Save2, X } from "react-bootstrap-icons"
import { FormProvider, useForm } from "react-hook-form";
import BaseModel from "@/models/base/BaseModel";
import DirtyPrompt from "@/components/forms/dirty-form/DirtyPrompt";
import Button from "@/components/forms/fields/Button";
import FormProps from "@/components/forms/FormContext";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { tf } from "@/components/Translations";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import ServiceProps from "@/components/data/ServiceProps";
import React from "react";

export interface DataRowProps<T extends BaseModel> {
    tableName: string,
    data?: T,
    isExpanded?: boolean,
    isNew?: boolean,
    setExpandedRow: () => React.Dispatch<React.SetStateAction<string>>,
    rowPreview?: (props?: any) => React.ReactNode,
    rowExpanded?: (props?: any) => React.ReactNode,
    rowNew?: (props?: any) => React.ReactNode,
    service: ServiceProps<T>
}

function DataRow<T extends BaseModel>({
    tableName,
    data,
    isExpanded,
    isNew,
    setExpandedRow,
    rowPreview,
    rowExpanded,
    rowNew,
    service
}: DataRowProps<T>) {
    const methods = useForm<T>({
        mode: "all",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | React.ReactNode>(undefined);

    const formRef = useRef<HTMLFormElement | null>(null)

    const onInsert = async (dto: any) => {
        const errors: any = methods.formState.errors;
        if (errors && Object.keys(errors).length) {
            return;
        }
        setLoading(true);
        setErrorMessage(undefined);
        const response = (formRef.current != null)
            ? await service.insert(new FormData(formRef.current))
            : null;
        if (response && response.isOk) {
            methods.reset();
            setExpandedRow()('');
        }
        setLoading(false);
        if (response && !response.isOk && response.message) {
            setErrorMessage(response.message);
        }
    };

    const onUpdate = async (dto: any) => {
        const errors: any = methods.formState.errors;
        if (errors && Object.keys(errors).length) {
            return;
        }
        setLoading(true);
        setErrorMessage(undefined);

        const response = (formRef.current != null)
            ? await service.update(new FormData(formRef.current))
            : null;
        if (response && response.isOk) {
            methods.reset();
            setExpandedRow()('');
        }
        setLoading(false);
        if (response && !response.isOk && response.message) {
            setErrorMessage(response.message);
        }
    };

    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [confirmCallback, setConfirmCallback] = useState<() => Promise<void>>();
    const handleDelete = (e: any) => {
        setConfirmCallback(() => doDelete);
        setShowConfirm(true);
    };

    const doDelete = async () => {
        setLoading(true);
        setErrorMessage(undefined);
        if (data) {
            const response = await service.delete(data.id);
            if (response && !response.isOk && response.message) {
                setErrorMessage(response.message);
            }
        }
        setLoading(false);
    }

    const inner = isNew ? <>
        <Button
            variant="transparent"
            className="w-100 d-flex align-items-center justify-content-between my-2"
            onClick={() => {
                setExpandedRow()(isExpanded ? '' : 'new-item');
            }}>
            {tf("New record")(tableName)}{!isExpanded ? <ChevronDown /> : <ChevronUp />}
        </Button>
        {isExpanded && <div className="row">
            <div className="col">
                {rowNew && rowNew({ isNew, data })}
            </div>
        </div>}

    </> : <>
        {rowExpanded &&
            (<Button
                loading={false}
                disabled={false}
                type="button"
                variant="transparent"
                className="w-100 d-flex align-items-center justify-content-between my-2"
                onClick={() => {
                    setExpandedRow()(isExpanded ? '' : (data ? data.id : ''));
                    return false;
                }}>
                {rowPreview && rowPreview({ data })}
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>)}
        {isExpanded && rowExpanded &&
            (<>
                {rowExpanded({ isNew, data })}
            </>)
        }
    </>;

    return <>
        <ConfirmModal
            confirmCallback={confirmCallback}
            setShowConfirm={setShowConfirm}
            showConfirm={showConfirm}
            title="Delete current item"
            message="Are you sure?" />

        <FormProps model={data}
            objectKey={data ? data.id : ''}
            labelPrefix={tableName}>
            <FormProvider {...methods} >
                <ErrorMessage message={errorMessage} />
                <DirtyPrompt when={methods.formState.isDirty} />
                <form ref={formRef} onSubmit={methods.handleSubmit(isNew ? onInsert : onUpdate)}>
                    <div className={`form-box editable ${isNew ? 'new' : ''}`}>
                        <div className="d-flex align-items-center w-100">
                            <div className={`items-container ${isExpanded ? 'bg-light' : ''}`}>
                                {inner}
                            </div>
                            {isExpanded && <div className="actions">
                                {!isNew && <div className="save-container mb-3">
                                    <Button
                                        type="button"
                                        variant="transparent"
                                        loading={loading}
                                        disabled={loading}
                                        onClick={handleDelete}>
                                        <X size={35} className="text-danger" />
                                    </Button>
                                </div>}
                                <div className="save-container">
                                    <Button
                                        type="submit"
                                        variant="transparent" loading={loading} disabled={loading}>
                                        {isNew && <Plus size={35} className="text-success" />}
                                        {!isNew && <Save2 size={25} className="text-success" />}
                                    </Button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </form>
            </FormProvider>
        </FormProps>
    </>
}

export default DataRow;
