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

handleStateChange = (state) => {
  this.setState({menuOpen: state.isOpen})  
}


closeMenu = () => {
  this.setState({menuOpen: false})
}

toggleMenu = () => {
  this.setState({menuOpen: !this.state.menuOpen})
}

submitMenu = () => {

}

export default props => {
  return (
    <div className="BurgerMenus">
      <div className="LeftBurgerMenu">
        <Menu>
          <MenuItem>Search</MenuItem>
          <AutoSuggestComponent/>
        </Menu>
      </div>
      <div className="RightBurgerMenu">
        <Menu right>
          <MenuItem>Search</MenuItem>
        </Menu>
      </div>
    </div>
  );
}


