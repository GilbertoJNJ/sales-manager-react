import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from './DropDownMenu';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #87CEEB;
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
  margin-right: 20px;
  margin-left: 40px;
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
    padding: 22px 20px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4682b4;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  padding: 0;
`;

const IconLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;
  padding: 20px 15px;
  transition: background-color 0.3s ease;
    &:hover {
      background-color: #4682b4;
    }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 20px 15px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #4682b4;
  }
`;

export default function NavigateBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

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
        <IconButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} size="lg" />
        </IconButton>
        <DropdownMenu isVisible={menuVisible} />
      </Icons>
    </Nav>
  );
};