import React, { useState } from "react";
import AuthStatus from "@/components/ui/AuthStatus";
import Loading from "@/components/ui/Loading";
import { t } from "@/components/Translations";
import { List } from "react-bootstrap-icons";
import Logo from "@/components/ui/Logo";
import Button from "@/components/forms/fields/Button";
import OffcanvasMenu from "@/components/layouts/components/_OffcanvasMenu";
import AdminAuthService from '@/extra/_services/_AuthService';

import { getVariant } from "@/helpers/ColorHelper";
import { useBaseRoute } from "@/helpers/UrlHelper";
import Link from "next/link";
import AdminDashboardServices from "@/extra/_services/_DashboardServices";
import { useSWRConfig } from 'swr/_internal';

export interface LayoutProps {
    children?: React.ReactElement | React.ReactElement[]
}

const Layout = ({ children }: LayoutProps) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const baseRoute = useBaseRoute();

    const user = AdminAuthService.useUser(undefined)

    const swrConfig = useSWRConfig();

    if (!user) {
        return <Loading />;
    }

    return (<>
        <div className={`container-fluid bg-${getVariant()} sticky-top`}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <Button variant="transparent" onClick={handleShow}>
                        <List size={24} className="text-white" />
                    </Button>
                    <Link href={baseRoute ?? "/"} className="link-white">{t("Company")}</Link>
                    <OffcanvasMenu handleClose={handleClose} show={show} />
                </div>

                <div className="col">
                    <nav className="d-none d-lg-block navbar navbar-expand-lg navbar-dark text-white">
                        <div className="container">
                            <div className={`collapse navbar-collapse`}>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href='/' className="nav-link link-white">{t("AdminDashboard")}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Button variant="link" onClick={() => AdminDashboardServices.clearCache(swrConfig)} className="nav-link link-white">{t("Clear cache")}</Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-auto">
                    <AuthStatus user={user} />
                </div>
            </div>
        </div>

        <div className="bg-light body border-bottom py-5">
            <div className="container">
                {children}
            </div>
        </div>

        <div className="container">
            <div className="row align-items-center">
                <div className="col-12 col-md-6 my-2 text-center text-md-start">
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                        <Logo className="wf-50 me-3 d-none d-md-block" />
                        <div>
                            {t('Company')}&nbsp;
                            <small className="ms-3 text-muted">{t('Company description')}</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 text-center text-md-end en">
                    © {t('Company domain')} {new Date().getFullYear()}
                </div>
            </div>
        </div>
    </>
    );
};

export default Layout;
