import React from "react";
import { useRef, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import Button from "@/components/forms/fields/Button";
import { t } from "@/components/Translations";
import DataFilterDefinition from "@/components/data/DataFilterDefinition";
import DataFilterModel from "@/components/data/DataFilterModel";

export interface DataFilterProps {
    tableName: string,
    definitions?: DataFilterDefinition,
    currentFilter?: DataFilterModel,
    onChange: (value: DataFilterModel | undefined) => void
}

const DataFilter = ({ tableName, definitions, currentFilter, onChange }: DataFilterProps) => {

    let defaultFilter = currentFilter ? { ...currentFilter } : {};

    const filterCount = defaultFilter ? Object.keys(defaultFilter).length : 0;
    const fields: string[] | undefined = definitions ? Object.keys(definitions) : undefined;

    const [currentField, setCurrentField] = useState(filterCount > 0 && fields && fields.length
        ? fields[filterCount - 1]
        : '');

    const selectRef = useRef<HTMLSelectElement | null>(null)

    if (!fields || !fields.length) {
        return <></>;
    }

    return <div className="input-group d-inline-flex w-auto mw-100 m-2 flex-nowrap">
        <select
            ref={selectRef}
            className="form-control w-auto"
            defaultValue={currentField}
            onChange={(e) => { setCurrentField(e.target.value) }}>
            <option key='empty' value=''>{t('Please select one item')}</option>
            {fields.map(field =>
                <option key={field} value={field}>{t(tableName + '.' + field)}</option>
            )}
        </select>
        {currentField &&
            <input
                className='form-control w-auto'
                defaultValue={currentField && defaultFilter[currentField] ? defaultFilter[currentField].value : ''}
                onChange={e => {
                    if (!e.target.value) {
                        delete defaultFilter[currentField];
                        onChange(defaultFilter);
                        return;
                    }
                    const filter: any = {};
                    filter[currentField] = { op: definitions && definitions[currentField] ? definitions[currentField].op : '', value: e.target.value };
                    defaultFilter = { ...defaultFilter, ...filter };
                    onChange(defaultFilter);
                }} />}
        <Button
            variant={filterCount ? 'outline-danger' : 'gray'}
            onClick={() => {
                if (filterCount) {
                    setCurrentField('');
                    onChange(undefined);
                    if (selectRef.current) {
                        selectRef.current.value = '';
                    }
                }
            }} >
            {filterCount > 0 && filterCount}
            {filterCount <= 0 && <FunnelFill />}
        </Button>
    </div>;
}

export default DataFilter;
