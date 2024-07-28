import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import authenticateStore from '../../store/authenticate.store';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #87CEEB;
  padding: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-style: italic;
  color: white;
  margin: 0;
  margin-right: 20px;
  font-size: 24px;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  a {
    color: white;
    text-decoration: none;
    padding: 25px 20px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4682b4;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 40px;
`;

const IconLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;
  &:hover {
    color: #dcdcdc;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 40px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
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
`;

const NavigateBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const {logout} = authenticateStore;

  return (
    <Nav>
      <Section>
      <Logo>SalesManager</Logo>
      <Ul>
        <Li><Link to="/dashboard">Dashboard</Link></Li>
        <Li><Link to="/inventory">Inventário</Link></Li>
        <Li><Link to="/invoice">Nota Fiscal</Link></Li>
      </Ul>
      </Section>
      <Icons>
        <IconLink to="/notifications">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </IconLink>
        <div>
          <IconLink onClick={toggleMenu} role="button">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </IconLink>
          <DropdownMenu isVisible={menuVisible}>
            <DropdownItem to="/profile">Ver Perfil</DropdownItem>
            <DropdownItem onClick={logout} to="/login">Sair</DropdownItem>
          </DropdownMenu>
        </div>
      </Icons>
    </Nav>
  );
};

export default NavigateBar;