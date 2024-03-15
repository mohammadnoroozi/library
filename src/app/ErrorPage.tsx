import React from 'react';
import { ArrowRight } from "react-bootstrap-icons";
import qs from "qs";
import Link from "next/link";
// import { useTitle } from "@/helpers/Seo";
// import { useBaseRoute } from "@/helpers/UrlHelper";
// import Logo from "@/components/ui/Logo";
// import { t } from "@/components/Translations";
// import { getVariant } from "@/helpers/ColorHelper";

const ErrorPage = () => {
    const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const messageKey = queryString["type"] ? 'Error occur ' + queryString["type"] : 'Error occur'
    const titleKey = queryString["type"] ? 'Error page ' + queryString["type"] : 'Error page';
    // useTitle(titleKey);
    // const baseRoute = useBaseRoute()

    return <>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 text-center">
                {/* <Logo className="wf-75 mb-5" /> */}
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                <div className="card shadow">
                    <div className="card-body text-center">
                        {/* <h1 className="fs-48 my-5">{t(titleKey)}</h1> */}
                        <p>
                            {/* {t(messageKey)} */}
                        </p>
                        <p>
                            {/* <Link className={`btn btn-outline-${getVariant()}`} href={baseRoute ?? "/"}>
                                <ArrowRight className="me-2" />
                                {t("Return to dashboard")}
                            </Link> */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default ErrorPage;
