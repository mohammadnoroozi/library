import { getVariant } from '@/helpers/ColorHelper'
import { useTitle } from '@/helpers/Seo'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import { ArrowRight } from 'react-bootstrap-icons'

interface TitleProps {
    text: string
    element: ReactElement
}

interface Props {
    to: string | undefined
    title: string | TitleProps
    className?: string | undefined
    externalUrl?: string | undefined
}

export default function BackToPage({ to, title, className, externalUrl }: Props) {
    useTitle(typeof title === "string" ? title : title.text);
    let titleElement = <></>;
    if (title) {
        if (typeof title === "string") {
            titleElement = <a className='link-dark' target='_blank' href={externalUrl}>
                <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            </a>;
        } else {
            titleElement = title.element;
        }
    }
    return (
        <div className={`row align-items-center ${className ?? ""}`}>
            <div className="col-auto">
                <Link href={to ?? "/"}
                    className={`btn btn-outline-${getVariant()} avatar-50 p-0 rounded-circle`}>
                    <ArrowRight size={24} />
                </Link>
            </div>
            <div className="col">{titleElement}</div>
        </div>
    )
}
