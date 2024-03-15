import { useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import BaseModel from '@/models/base/BaseModel';
import Loading from '@/components/ui/Loading';
import DataRow from '@/components/data/DataRow';
import ServiceProps from '@/components/data/ServiceProps';
import DataFilterModel from '@/components/data/DataFilterModel';
import DataFilterDefinition from '@/components/data/DataFilterDefinition';
import DataSort from '@/components/data/DataSort';
import DataFilter from '@/components/data/DataFilter';
import React from 'react';
import Button from '@/components/forms/fields/Button';

export interface DataGridProps<T extends BaseModel> {
    tableName: string,
    items?: T[],
    hasMore?: boolean,
    rowPreview: (props?: any) => React.ReactNode,
    rowExpanded?: (props?: any) => React.ReactNode,
    rowNew?: (props?: any) => React.ReactNode,
    filterDefinition?: DataFilterDefinition,
    sortFields?: string[],
    service: ServiceProps<T>
}

function DataGrid<T extends BaseModel>({
    tableName,
    rowPreview,
    rowExpanded,
    rowNew,
    filterDefinition,
    sortFields = [],
    service,
}: DataGridProps<T>) {
    rowNew = rowNew == null ? rowExpanded : rowNew;
    rowNew = rowNew == null ? rowPreview : rowNew;

    const [expandedRow, setExpandedRow] = useState<string>('');
    const [pageIndex, setPageIndex] = useState(0);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('');
    const [filterData, setFilterData] = useState<DataFilterModel | undefined>();

    const queryObject = useMemo(() => {
        const sort = sortField ? ((sortDirection === 'asc' ? '' : '-') + sortField) : undefined;
        return { page: pageIndex, filter: filterData, sort: sort };
    }, [pageIndex, sortField, sortDirection, filterData])

    const data = service.useData(queryObject);
    const items = data?.data;
    const hasMore = data?.hasMore;

    const dataLoader = async (page: number) => {
        setPageIndex(page);
    }

    const sortOnChange = (field: string, direction: string) => {
        setSortDirection(direction);
        setSortField(field);
    }

    const filterDataOnChange = (filter: DataFilterModel | undefined) => {
        setFilterData(filter);
    }

    const toolbar = <div className="d-flex justify-content-end align-items-end flex-wrap">
        <DataFilter
            tableName={tableName}
            definitions={filterDefinition}
            currentFilter={filterData}
            onChange={filterDataOnChange} />
        <DataSort
            tableName={tableName}
            fields={sortFields}
            onChange={sortOnChange}
            selectedDirection={sortDirection}
            selectedField={sortField} />
    </div>;

    if (!data || !items) {
        return <>{toolbar}<Loading /></>;
    }
    const children = [<DataRow
        tableName={tableName}
        key='new-item'
        isNew={true}
        isExpanded={'new-item' === expandedRow}
        rowNew={rowNew}
        setExpandedRow={() => setExpandedRow}
        service={service}
    />];

    if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            children.push(<DataRow
                tableName={tableName}
                key={item.id}
                data={item}
                isExpanded={item && (item.id === expandedRow)}
                setExpandedRow={() => setExpandedRow}
                rowPreview={rowPreview}
                rowExpanded={rowExpanded}
                service={service}
            />);
        }
    }

    const lastItemIndex = Math.min(data.pageSize * pageIndex + data.pageSize, data.totalCount);
    const firstItemIndex = Math.max(data.pageSize * (pageIndex - 1) + data.pageSize, 0);

    const previousPage = () => {
        if (pageIndex == 0) {
            return;
        }
        setPageIndex(pageIndex - 1);
    }
    const nextPage = () => {
        if (!hasMore) {
            return;
        }
        setPageIndex(pageIndex + 1);
    }

    return <>
        {toolbar}
        {children}
        <div className="text-muted text-center fs-12 mt-3">
            {pageIndex > 0 && <Button variant='transparent' className='mx-3' onClick={previousPage}><ArrowRight /></Button>}
            ( {firstItemIndex}-{lastItemIndex} / {data.totalCount} )
            {hasMore && <Button variant='transparent' className='mx-3' onClick={nextPage}><ArrowLeft /></Button>}
        </div>
    </>
}

export default DataGrid;
