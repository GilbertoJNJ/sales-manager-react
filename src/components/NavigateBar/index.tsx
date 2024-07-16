import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #87CEEB;
  padding: 20px;
  z-index: 1000;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavigateBar = () => {
  return (
    <Nav>
      <Ul>
        <Li><Link to="/">Dashboard</Link></Li>
        <Li><Link to="/inventory">Inventário</Link></Li>
        <Li><Link to="/invoice">Nota Fiscal</Link></Li>
      </Ul>
    </Nav>
  );
};

export default NavigateBar;