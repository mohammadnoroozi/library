import { useBaseRoute } from '@/helpers/UrlHelper';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from "next/link";
import { t } from '@/components/Translations';

export interface OffcanvasMenuProps {
    show: boolean;
    handleClose: () => void
}

const OffcanvasMenu = ({ show, handleClose }: OffcanvasMenuProps) => {
    const baseRoute = useBaseRoute();
    return <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Link href={baseRoute ?? "/"} className="link-dark d-block">{t("Dashboard")}</Link>
        </Offcanvas.Body>
    </Offcanvas>
}

export default OffcanvasMenu;
