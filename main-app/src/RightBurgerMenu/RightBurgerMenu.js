import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import './RightBurgerMenu.scss';

const MenuItem = styled.h3`
  text-decoration: underline;
  padding-bottom: .2px;
  outline: none;
`;

export default props => {
  return (
    <div className="RightBurgerMenu">
      <Menu right>
        <MenuItem>Search</MenuItem>
      </Menu>
    </div>
  );
}