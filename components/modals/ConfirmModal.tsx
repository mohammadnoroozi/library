import { Dispatch, SetStateAction } from "react";
import { Check, ExclamationTriangleFill, X } from "react-bootstrap-icons";
import Button from "@/components/forms/fields/Button";
import { t } from "@/components/Translations";
import Modal from 'react-bootstrap/Modal'
import React from "react";

export interface ConfirmModalProps {
    showConfirm: boolean,
    confirmCallback: (() => void) | undefined,
    setShowConfirm: Dispatch<SetStateAction<boolean>>,
    acceptButtonText?: string,
    cancelButtonText?: string,
    children?: React.ReactNode,
    icon?: React.ReactNode,
    title?: string,
    message?: string,
}


const ConfirmModal = ({
    confirmCallback,
    setShowConfirm,
    showConfirm,
    acceptButtonText = 'Ok',
    cancelButtonText = 'Cancel',
    children,
    title,
    message,
    icon }: ConfirmModalProps) => {

    const handleClose = () => setShowConfirm(false);

    return !showConfirm ? <></> : <>
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fs-16">{title && t(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body> <div className="row">
                <div className="col-auto">
                    {icon ? icon : <ExclamationTriangleFill className='text-danger' size={38} />}</div>
                <div className="col">
                    {message &&
                        <div dangerouslySetInnerHTML={{ __html: t(message) }}>
                        </div>}
                    {children}
                </div>
            </div></Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="outline-secondary" onClick={() => {
                    setShowConfirm(false);
                }}>
                    <X className='me-2' size={18} /> {t(cancelButtonText)}
                </Button>
                <Button type="button" variant="outline-success" autoFocus onClick={() => {
                    setShowConfirm(false);
                    if (confirmCallback) {
                        confirmCallback();
                    }
                }}>
                    <Check className='me-2' size={18} /> {t(acceptButtonText)}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ConfirmModal;
