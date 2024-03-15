
export interface DataFilterItemModel {
    op?: 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'like' | undefined,
    value?: string
}
interface DataFilterModel {
    [index: string]: DataFilterItemModel
}

export default DataFilterModel;
