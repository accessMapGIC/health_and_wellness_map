import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import './LeftBurgerMenu.scss';
import AutoSuggestComponent from '../AutoSuggest/AutoSuggest';

const MenuItem = styled.h3`
  text-decoration: underline;
  padding-bottom: .2px;
  outline: none;
`;

export default props => {
  return (
    <div className="LeftBurgerMenu">
      <Menu>
        <MenuItem>Search</MenuItem>
        <AutoSuggestComponent/>

      </Menu>
    </div>
  );
}


