import React, { ReactNode, useState } from 'react';
import Button from "@/components/forms/fields/Button";
import { ChevronRight, ChevronLeft, ChevronBarRight, ChevronBarLeft } from 'react-bootstrap-icons';

interface Props {
    data?: any[],
    renderRow: (item: any) => ReactNode,
    pageSize: number
}

const PagedList = ({ data, renderRow, pageSize }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    if (!data || !data.length) return <></>;

    if (data.length <= pageSize) {
        return <>
            {data.map(item => renderRow(item))}
        </>
    }

    const totalPages = Math.ceil(data.length / pageSize) - 1;

    const from = currentPage * pageSize;
    const to = Math.min(data.length, from + pageSize);

    const rows: ReactNode[] = [];
    for (let i = from; i < to; i++) {
        rows.push(renderRow(data[i]));
    }

    const buttons: ReactNode[] = [];
    const showNext = totalPages > currentPage;
    const showPrevious = currentPage > 0;
    if (showPrevious) {
        buttons.push(<Button key={"first"} className="mx-1" variant="light" onClick={() => {
            setCurrentPage(0);
        }}>
            <ChevronBarRight />
        </Button>);

        buttons.push(<Button key={"previous"} className="mx-1" variant="light" onClick={() => {
            setCurrentPage(currentPage - 1);
        }}>
            <ChevronRight />
        </Button>);
    }

    buttons.push(<div key={"info"} className="mx-3">( {from + 1}-{to} / {data.length} )</div>)

    if (showNext) {
        buttons.push(<Button key={"next"} className="mx-1" variant="light" onClick={() => {
            setCurrentPage(currentPage + 1);
        }}>
            <ChevronLeft />
        </Button>);

        buttons.push(<Button key={"last"} className="mx-1" variant="light" onClick={() => {
            setCurrentPage(totalPages);
        }}>
            <ChevronBarLeft />
        </Button>);
    }

    return <>
        {rows}
        <div className="d-flex my-3 justify-content-center align-items-center">
            {buttons}
        </div>
    </>
};

export default PagedList;
