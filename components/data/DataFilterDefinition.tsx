import KeyValuePair from "@/components/data/types/KeyValuePair";

export interface DataFilterItemDefinition {
    op?: 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'like' | undefined,
    data?: KeyValuePair[]
}

interface DataFilterDefinition {
    [index: string]: DataFilterItemDefinition
}

export default DataFilterDefinition;
