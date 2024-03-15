import React from "react";
import { SortDown, SortUp } from "react-bootstrap-icons";
import Button from "@/components/forms/fields/Button";
import { t } from "@/components/Translations";

export interface DataSortProps {
    tableName: string,
    selectedField: string,
    selectedDirection: string,
    fields?: string[],
    onChange: (field: string, direction: string) => void
}

const DataSort = ({ tableName, fields, selectedField, selectedDirection, onChange }: DataSortProps) => {

    return <div className="input-group d-inline-flex w-auto mw-100 m-2 flex-nowrap">
        <select
            className="form-control w-auto"
            defaultValue={selectedField}
            onChange={(e) => {
                onChange(e.target.value, selectedDirection ? selectedDirection : 'asc')
            }}>
            <option key='empty' value=''>{t('Please select one item')}</option>
            {fields?.map(field =>
                <option key={field} value={field}>{t(tableName + '.' + field)}</option>
            )}
        </select>
        <Button
            variant={selectedDirection ? 'info' : 'gray'}
            onClick={() => {
                if (selectedDirection === 'desc') {
                    onChange(selectedField, 'asc');
                } else {
                    onChange(selectedField, 'desc');
                }
            }} >
            {selectedDirection === "asc" && <SortDown />}
            {selectedDirection !== "asc" && <SortUp />}
        </Button>
    </div>;
}


export default DataSort;
