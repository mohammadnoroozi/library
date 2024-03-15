import React from "react";
import { Dispatch, SetStateAction } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";


export interface DirtyModalProps {
    confirm: boolean,
    confirmCallback: ((ok: boolean) => void) | undefined,
    setConfirm: Dispatch<SetStateAction<boolean>>,
}


const DirtyModal = ({ confirmCallback, setConfirm, confirm }: DirtyModalProps) => {
    return (
        <ConfirmModal
            confirmCallback={() => { if (confirmCallback) confirmCallback(true) }}
            showConfirm={confirm}
            setShowConfirm={setConfirm}
            acceptButtonText='Leave page'
            cancelButtonText='Stay in page'
            title='Leaving page'
            message='You have entered data that will be lost if you exit the page' />
    );
}

export default DirtyModal;
