import { useBaseRoute } from "@/helpers/UrlHelper";
import Link from "next/link";
import ImageView from "./ImageView";

export interface LogoProps {
    className?: string,
}

const Logo = ({ className }: LogoProps): JSX.Element => {
    const baseRoute = useBaseRoute();
    return <Link href={baseRoute ?? "/"}>
        <ImageView src="/images/logo.png" className={className} alt="Company logo" />
    </Link>;
};

export default Logo;
