import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import AutoSuggestComponent from '../AutoSuggest/AutoSuggest';
import './Sidebars.scss';

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
`;

const AutoSuggestContainer = styled.div`
  height: 150px;
`;

class SidebarsComponent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        leftMenuOpen: false,
        rightMenuOpen: false
      }
    }
  
    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
      this.setState({leftMenuOpen: state.isOpen})  
    }
    
    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({leftmenuOpen: false})
    }
  
    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu () {
      this.setState({leftMenuOpen: !this.state.leftMenuOpen})
    }
  
    render () {
        return (
          <div className='menu-sidebars'>
            <div className='menu-left'>
              <Menu 
              isOpen={this.state.leftMenuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
              >
                <MenuItem>Search</MenuItem>
                <AutoSuggestContainer>
                  <AutoSuggestComponent/>
                </AutoSuggestContainer>
                <Container>
                  <Button href="" prefetch onClick={() => this.closeMenu()}>
                    Submit
                  </Button>
                </Container>
              </Menu>
            </div>
            <div className='menu-right'>
              <Menu right>
                <MenuItem>Search</MenuItem>
                <AutoSuggestComponent/>
              </Menu>
            </div>
         </div>
        )
    }
}


export default SidebarsComponent;
// export default props => {
//   return (
//       <div className='menu-sidebars'>
//         <div className='menu-left'>
//           <Menu>
//             <MenuItem>Search</MenuItem>
//             <AutoSuggestComponent/>
//           </Menu>
//         </div>
//         <div className='menu-right'>
//           <Menu right>
//             <MenuItem>Search</MenuItem>
//             <AutoSuggestComponent/>
//           </Menu>
//         </div>
//       </div>
//   );
// }