import ApiDataModel from "@/models/base/ApiDataModel";
import ApiMessageModel from "@/models/base/ApiMessageModel";
import { redirectToLogin } from "@/helpers/AuthHelper";
import router from 'next/router'
import { safePush } from "./RouterHelper";

const getFluentValidationErrors = (apiData: ApiMessageModel): React.ReactNode => {
    const hasErrors = apiData.errors && apiData.errors.length;
    if (hasErrors) {
        const errorsDom = apiData.errors.map((a) => <li key={a}>{a}</li>);
        const message = apiData.message ? (
            <div>
                {apiData.message}
                <br />
                <ul>{errorsDom}</ul>
            </div>
        ) : (
            <ul>{errorsDom}</ul>
        );

        return message;
    }

    return apiData.message;
}

export async function processFetch<TResult>(response: Response | undefined): Promise<ApiDataModel<TResult> | null> {

    if (!response) {
        return null;
    }

    const redirected = redirectToLogin(response);
    if (redirected) return null;

    if (response.status > 400) {
        switch (response.status) {
            case 404:
                safePush(router, `/errors/not-found?path=${window.location.pathname}`);
                break;
            case 405:
                safePush(router, `/errors/method-not-allowed`);
                break;
            case 503:
                safePush(router, `/errors/service-unavailable`);
                break;
            default:
            case 500:
                safePush(router, `/errors/error`);
                break;
        }
    }

    try {
        const apiData = (await response.json()) as ApiDataModel<TResult>;
        if (response.status === 400) {
            apiData.message = getFluentValidationErrors(apiData);
        }
        return apiData;
    } catch (error) {
        console.error(error);
        return null;
    }

}



export function processFetchData<InputType>(data?: InputType | undefined): any {
    let body;
    let contentType;

    body = data;

    contentType = undefined;

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": contentType,
        Authorization: token ? "Bearer " + token : undefined,
    };

    if (!token) {
        delete headers["Authorization"];
    }

    if (!contentType) {
        delete headers["Content-Type"];
    }
    return { body, headers };
}
