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

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4ec3c7;
  color: #4ec3c7;
  padding: 0.25em 1em;
`;

const Container = styled.div`
  text-align: left;
`

const AutoSuggestContainer = styled.div`
  height: 150px;
`;

export default props => {
  return (
    <div className="LeftBurgerMenu">
      <Menu>
        <MenuItem>Search</MenuItem>
        <AutoSuggestContainer>
          <AutoSuggestComponent/>
        </AutoSuggestContainer>
        <Container>
          <Button href="/docs" prefetch>
            Submit
          </Button>
        </Container>
      </Menu>
    </div>
  );
}


