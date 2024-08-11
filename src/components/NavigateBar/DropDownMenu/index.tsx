import styled from "styled-components";
import authenticateStore from "../../../store/authenticate.store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
    isVisible: boolean;
}

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 40px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
`;

const Item = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #e9ecef;
  }
  svg {
    margin-right: 10px;
  }
`;

export default function DropdownMenu({ isVisible }: Props) {
    const { logout } = authenticateStore;

    if (!isVisible) return null;

    return <Menu>
        <Item to="/profile">
            <FontAwesomeIcon icon={faUser} />
            Ver Perfil
        </Item>
        <Item onClick={logout} to="/login">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sair
        </Item>
    </Menu>
}