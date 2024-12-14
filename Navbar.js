import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  display: inline;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: #575757;
  }
`;

function Navbar({ role }) {
  return (
    <NavbarContainer>
      <NavList>
        <NavItem><NavLink to="/">Home</NavLink></NavItem>
        {role === 'customer' && (
          <>
            <NavItem><NavLink to="/order">Management Menu</NavLink></NavItem>
            <NavItem><NavLink to="/manage-order">Manage Orders</NavLink></NavItem>
            <NavItem><NavLink to="/order-status">Order Status</NavLink></NavItem>
          </>
        )}
        {(role === 'admin' || role === 'owner') && (
          <>
            <NavItem><NavLink to="/manage-menu">Manage Menu</NavLink></NavItem>
            <NavItem><NavLink to="/order-status">Order Status</NavLink></NavItem>
          </>
        )}
      </NavList>
    </NavbarContainer>
  );
}

export default Navbar;