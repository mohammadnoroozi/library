import React, { useState } from "react";
import Button from "@/components/forms/fields/Button";
import CollapseBs from 'react-bootstrap/Collapse'
import { t } from "@/components/Translations";
import { CaretDown, CaretLeft } from "react-bootstrap-icons";

export interface CollapseProps {
    label: string,
    className?: string,
    children: React.ReactNode,
    open?: boolean
}

const Collapse = ({ label, children, className, open }: CollapseProps) => {
    const [isOpen, setOpen] = useState(open);
    return <>
        <Button
            className="w-100 text-start"
            variant='transparent'
            onClick={() => setOpen(!isOpen)}
            aria-expanded={isOpen}
        >
            {
                isOpen ? <CaretDown className='me-2' /> : <CaretLeft className='me-2' />
            }
            {t(label)}
        </Button>
        <CollapseBs in={isOpen} className={className}>
            <div>
                {children}
            </div>
        </CollapseBs>
    </>
}

export default Collapse;
