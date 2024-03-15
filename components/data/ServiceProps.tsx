import ApiDataModel from "@/models/base/ApiDataModel";
import ApiMessageModel from "@/models/base/ApiMessageModel";
import BaseModel from "@/models/base/BaseModel";

interface ServiceProps<T extends BaseModel> {
    useRow: (id?: string | undefined) => ApiDataModel<T> | undefined;
    useData: (queryObject: any) => ApiDataModel<T[]> | undefined;
    insert: (data: FormData) => Promise<ApiMessageModel | null>
    update: (data: FormData) => Promise<ApiMessageModel | null>
    delete: (id?: string | undefined) => Promise<ApiDataModel<any> | null>;
}

export default ServiceProps;
