import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

export const safePush = (router: NextRouter, url: string, reload?: boolean) => {
  if (url !== router.pathname) router.push(url);
  else if (reload) window.location.reload();
};

export const useRouteOptionalParams = (count: number) => {
  const [result, setResult] = useState<string[]>([]);
  const router = useRouter();
  const { parameters } = router.query;
  useEffect(() => {
    const internalResults: string[] = [];
    if (!parameters || !parameters.length || !count) {
      setResult(internalResults);
      return;
    }
    for (let i = 0; i < count; i++) {
      if (parameters.length > i) {
        internalResults.push(parameters[i]);
      } else {
        internalResults.push("");
      }
    }
    setResult(internalResults);
  }, [parameters, count, router]);
  return result;
};

export function useRouteStringParams(): { [key: string]: string } {
  const router = useRouter();
  return router.query as { [key: string]: string };
}
