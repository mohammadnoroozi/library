import { BoxArrowRight, Eye, Person, Sliders } from "react-bootstrap-icons";
import Link from "next/link";
import { t } from "@/components/Translations";
import Dropdown from 'react-bootstrap/Dropdown';
import UserModel from "@/models/UserModel";

export interface AuthStatusProps {
  user: UserModel | undefined
}

const AuthStatus = ({ user }: AuthStatusProps): JSX.Element => {

  if (!user) {
    return <></>;
  }

  return (<>
    <Dropdown align="end" className="text-nowrap">
      <Dropdown.Toggle variant="transparent">
        <Person className="text-white me-2" size={18} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText>
          <Link className="link-dark" href="/"><Eye className="me-2" size={18} />{t("Back to site")}</Link>
        </Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.ItemText>
          <Link className="link-danger" href="/user/logout"><BoxArrowRight className="me-2" size={18} />{t("Logout")}</Link>
        </Dropdown.ItemText></Dropdown.Menu>
    </Dropdown>
  </>);
};

export default AuthStatus;
