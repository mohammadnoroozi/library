import { processFetch } from "@/helpers/ProcessFetch";
import ApiDataModel from "@/models/base/ApiDataModel";
import { attachQsToUrl } from "@/helpers/UrlHelper";
import { ApiRoot } from "@/helpers/Consts";

export async function SwrGetFetch<TReturn>(url: string, data: any): Promise<ApiDataModel<TReturn>> {

  const fetchUrl = attachQsToUrl(url, data);
  const res = fetchUrl ? await fetch(ApiRoot + fetchUrl, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }) : undefined;

  const result = await processFetch<TReturn>(res);

  return result as ApiDataModel<TReturn>;
}

export async function SwrDeleteFetch<TReturn>(url: string, data: any): Promise<ApiDataModel<TReturn>> {

  const fetchUrl = attachQsToUrl(url, data);

  const res = fetchUrl ? await fetch(ApiRoot + fetchUrl, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }) : undefined;

  const result = await processFetch<TReturn>(res);

  return result as ApiDataModel<TReturn>;
}
