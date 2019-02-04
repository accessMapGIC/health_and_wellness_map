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

class SidebarsComponent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        menuOpen: false
      }
    }
  
    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})  
    }
    
    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({menuOpen: false})
    }
  
    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu () {
      this.setState({menuOpen: !this.state.menuOpen})
    }
  
    render () {
        return (
          <div className='menu-sidebars'>
            <div className='menu-left'>
              <Menu>
                <MenuItem>Search</MenuItem>
                <AutoSuggestComponent/>
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