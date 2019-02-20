import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import TabComponent from '../tabs/Tabs';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InsuranceDropDownComponent from '../Dropdowns/InsuranceDropDown';
import './Sidebars.scss';
import LanguageDropDownComponent from '../Dropdowns/LanguagesDropDown';
import CheckBoxComponent from '../Checkbox/CheckBox';
import { connect } from 'react-redux';
// import { decorator as reduxBurgerMenu } from 'redux-burger-menu'


const DropdownHeader = styled.h5`
  margin-bottom: 10px;
  text-decoration: underline;
`;

const MenuItem = styled.h3`
  text-decoration: underline;
  padding-bottom: .2px;
  outline: none;
`;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.getContrastText('#4ec3c7'),
    backgroundColor: '#4ec3c7',
    '&:hover': {
      backgroundColor: '#4ec3c7',
    },
  }
});

const Container = styled.div`
  text-align: left;
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
              isOpen={this.props.leftMenu.leftMenuOpen}
              onStateChange={this.props.onMenuChange(0)} 
              customBurgerIcon={this.props.leftMenu.leftHamButton}
              >
                <MenuItem>Search</MenuItem>
                <TabComponent/>
                <Container>
                  <div className="DropDown_Container">
                    <div className="Flex_Container">
                      <div className="InsuranceDropDown_Container">
                        <DropdownHeader>Insurance</DropdownHeader>
                        <InsuranceDropDownComponent/>
                      </div>
                      <div className="LanguageDropDown_Container">
                      <DropdownHeader>Language</DropdownHeader>
                      <LanguageDropDownComponent/>
                      </div>
                      <CheckBoxComponent/>
                    </div>
                  </div>
                  <Button variant="contained" color={"primary"} className="{classes.button}" href="" prefetch onClick={this.props.onSubmit}>
                    Submit
                  </Button>
                </Container>
              </Menu>
            </div>
            <div className='menu-right'>
              <Menu 
              right
              isOpen={this.props.rightMenu.rightMenuOpen}
              onStateChange={this.props.onMenuChange(1)}
              customBurgerIcon={this.props.rightMenu.rightHamButton}
              >
                <MenuItem>Search</MenuItem>
                <Container>
                  <Button variant="contained" color={"primary"} className="{classes.button}" href="" prefetch onClick={this.props.onNewSearch}>
                    new Search Query
                  </Button>
                </Container>
              </Menu>
            </div>
         </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    leftMenuOpen: state.leftMenu.leftMenuOpen,
    leftHamButton: state.leftMenu.leftHamButton,
    rightMenuOpen: state.rightMenu.rightMenuOpen,
    rightHamButton: state.rightMenu.rightHamButton,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onMenuChange: (menu_val) => dispatch({type: 'MENU_CHANGE', menu: menu_val}),
    onSubmit: () => dispatch({type: 'SUBMIT'}),
    onNewSearch: () => dispatch({type: 'NEW_SUBMIT'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles)(styles)(SidebarsComponent);
