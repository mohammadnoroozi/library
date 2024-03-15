import { useState, useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/router";

export function useBaseRoute() {
    const router = useRouter()
    const [baseRoute, setBaeRoute] = useState<string | undefined>(undefined)
    useEffect(() => {
        setBaeRoute("/" + window.location.pathname.split("/").filter(a => a)[0]);
    }, [router.asPath]);
    return baseRoute;
}

export const attachQsToUrl = (
    url: any,
    queryData: string | object | undefined
) => {
    if (!url) return url;
    let safeUrl = url;
    let safeQuery = queryData;
    if (Array.isArray(url)) {
        if (url.length > 0) safeUrl = url[0];
        if (!safeQuery && url.length > 1) safeQuery = url[1];
    }

    if (!safeQuery) return safeUrl;
    if (typeof safeQuery !== "string") {
        safeQuery = qs.stringify(safeQuery, {
            strictNullHandling: false,
            skipNulls: true,
            allowDots: true,
        });
    }

    const divider = safeUrl.indexOf("?") === -1 ? "?" : "&";
    return safeUrl + divider + safeQuery;
};
