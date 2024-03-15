import ApiDataModel from "@/models/base/ApiDataModel";
import { processFetch, processFetchData } from "@/helpers/ProcessFetch";
import { ApiRoot } from "@/helpers/Consts";

export async function ajaxRequest<InputType, OutputType>(
    method: string,
    url?: string | undefined,
    data?: InputType | undefined
): Promise<ApiDataModel<OutputType> | null> {
    if (!url) {
        return null;
    }
    const { body, headers } = processFetchData<InputType>(data);
    const response = await fetch(ApiRoot + url, {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers,
        body: body,
    });

    return await processFetch<OutputType>(response);
};

export async function ajaxPost<InputType, OutputType>(
    url?: string | undefined,
    data?: InputType | undefined
): Promise<ApiDataModel<OutputType> | null> {
    return ajaxRequest("POST", url, data);
};

export async function ajaxPut<InputType, OutputType>(
    url?: string | undefined,
    data?: InputType | undefined
): Promise<ApiDataModel<OutputType> | null> {
    return ajaxRequest("PUT", url, data);
};

export async function ajaxPatch<InputType, OutputType>(
    url?: string | undefined,
    data?: InputType | undefined
): Promise<ApiDataModel<OutputType> | null> {
    return ajaxRequest("PATCH", url, data);
};

export async function ajaxDelete<InputType, OutputType>(
    url?: string | undefined,
    data?: InputType | undefined
): Promise<ApiDataModel<OutputType> | null> {
    return ajaxRequest("DELETE", url, data);
};
