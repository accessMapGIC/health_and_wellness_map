import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import AutoSuggestComponent from '../AutoSuggest/AutoSuggest';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './Sidebars.scss';

const MenuItem = styled.h3`
  text-decoration: underline;
  padding-bottom: .2px;
  outline: none;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

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
        leftMenu: {
          leftMenuOpen: false,
          leftHamButton: null,
        },
        rightMenu: {
          rightMenuOpen: false,
          rightHamButton: false,
        }
      }
    }
  
    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state, menu) {
      return () => {
        if (menu === 0) {
            this.setState({
                leftMenu: {
                    leftMenuOpen: state.leftMenuOpen,
                }
            })
        } else {
          this.setState({
              rightMenu: {
                  rightMenuOpen: state.rightMenuOpen,
              }
          })
        }
      } 
    }
    
    // This can be used to close the left menu, e.g. when a user clicks a menu item
    closeMenuFactory(menu) { 
      return () => {
        if (menu === 0) {
            this.setState({
                leftMenu: {
                    leftMenuOpen: false,
                }
            })
        } else {
          this.setState({
              rightMenu: {
                  rightMenuOpen: false,
              }
          })
        }
      }
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    toggleMenuFactory (menu) {
      return () => {
        if (menu === 0) {
            this.setState({leftMenuOpen: !this.state.leftMenuOpen})
        } else {
            this.setState({rightMenuOpen: !this.state.rightMenuOpen})
        }
      }
    }

    // This will be used to submit a search query via the menus
    submitButton (state) {
      this.setState({
        leftMenu: {
          leftMenuOpen: false,
          leftHamButton: false,
        },
        rightMenu: {
          rightMenuOpen: !state.rightMenuOpen,
          rightHamButton: null,
        }
      })
    }

    newSearchButton (state) {
      this.setState({
        leftMenu: {
          leftMenuOpen: !state.leftMenuOpen,
          leftHamButton: null,
        },
        rightMenu: {
          rightMenuOpen: false,
          rightHamButton: false,
        }
      })
    }

    render () {
        return (
          <div className='menu-sidebars'>
            <div className='menu-left'>
              <Menu 
              isOpen={this.state.leftMenu.leftMenuOpen}
              onStateChange={(state) => this.handleStateChange(state, 0)}
              customBurgerIcon={this.state.leftMenu.leftHamButton}
              >
                <MenuItem>Search</MenuItem>
                <AutoSuggestContainer>
                  <AutoSuggestComponent/>
                </AutoSuggestContainer>
                <Container>
                  <Button variant="contained" className="{classes.button}" href="" prefetch onClick={(state) => this.submitButton(state)}>
                    Submit
                  </Button>
                </Container>
              </Menu>
            </div>
            <div className='menu-right'>
              <Menu 
              right
              isOpen={this.state.rightMenu.rightMenuOpen}
              onStateChange={(state) => this.handleStateChange(state, 1)}
              customBurgerIcon={this.state.rightMenu.rightHamButton}
              >
                <MenuItem>Search</MenuItem>
                <Container>
                  <Button variant="contained" className="{classes.button}" href="" prefetch onClick={(state) => this.newSearchButton(state)}>
                    new Search Query
                  </Button>
                </Container>
              </Menu>
            </div>
         </div>
        )
    }
}


export default (withStyles)(styles)(SidebarsComponent);
