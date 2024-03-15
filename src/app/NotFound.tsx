import React from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import Link from "next/link";
// import { t } from '@/components/Translations';
// import Logo from '@/components/ui/Logo';
// import { getVariant } from '@/helpers/ColorHelper';
// import { useTitle } from '@/helpers/Seo';
// import { useBaseRoute } from '@/helpers/UrlHelper';

const NotFoundPage = () => {

    // useTitle('Not found page');
    // const baseRoute = useBaseRoute();

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
                        {/* <h1 className="fs-48 my-5">{t("Not found page")}</h1> */}
                        <p>
                            {/* {t("Page not found")} */}
                            <br />
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

export default NotFoundPage;
