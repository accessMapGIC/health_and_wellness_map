import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import './LeftBurgerMenu.scss';
import AutoSuggestComponent from './AutoSuggest';

const MenuItem = styled.a`
  text-decoration: none;
  padding: 1vw;
  outline: none;
  &:hover,
  &:focus {
    color: black;
  }
`;

export default props => {
  return (
    <div className="LeftBurgerMenu">
      <Menu>
        <AutoSuggestComponent/>
        <MenuItem>Home</MenuItem>
        <MenuItem>Contact</MenuItem>
        <MenuItem>Settings</MenuItem>
      </Menu>
    </div>
  );
}


