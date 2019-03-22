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
import CardContainer from '../Cards/CardContainer';
import * as actionTypes from '../store/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';


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
        // rightMenu: {
        //   rightMenuOpen: false,
        //   rightHamButton: false,
        // }
      }
    }
    
    // componentDidMount(){
    //   this.setState({
    //     rightMenu: {
    //       rightMenuOpen: this.props.rmo,
    //       rightHamButton: this.props.rhb,
    //     }
    //   })
    // }
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
          // this.setState({
          //     rightMenu: {
          //         rightMenuOpen: false,
          //     }
          // })
          this.props.closeRight();
        }
      }
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    toggleMenuFactory (menu) {
      console.log('ive been toggled');
      return () => {
        if (menu === 0) {
            this.setState({leftMenuOpen: !this.state.leftMenuOpen})
        } else {
            // this.setState({rightMenuOpen: !this.state.rightMenuOpen})
            this.props.toggleRight();
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
        // rightMenu: {
        //   rightMenuOpen: !state.rightMenuOpen,
        //   rightHamButton: null,
        // }
      })
      this.props.createRight(state);
    }

    newSearchButton (state) {
      this.props.destroyRight();
      this.setState({
        leftMenu: {
          leftMenuOpen: !state.leftMenuOpen,
          leftHamButton: null,
        },
        // rightMenu: {
        //   rightMenuOpen: false,
        //   rightHamButton: false,
        // }
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
              noOverlay
              disableOverlayClick
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
                  <Button variant="contained" color={"primary"} className="{classes.button}" href="" prefetch="true" onClick={(state) => this.submitButton(state)}>
                    Submit
                  </Button>
                  {/* <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
                </Container>
              </Menu>
            </div>
            <div className='menu-right'>
              <Menu 
              right
              isOpen={this.props.rmo}
              onStateChange={this.props.handleRight}
              customBurgerIcon={this.props.rhb}
              noOverlay
              disableOverlayClick
              >
                <MenuItem>Search</MenuItem>
                {/* <CardTemplateComponent/> */}
                <CardContainer/>
                <Container>
                  <Button variant="contained" color={"primary"} className="{classes.button}" href="" prefetch="true" onClick={(state) => this.newSearchButton(state)}>
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
    rmo: state.rtS.rightMenu.rightMenuOpen,
    rhb: state.rtS.rightMenu.rightHamButton,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleRight: () => dispatch({type: actionTypes.HANDLE_RIGHT}),
    createRight: (state) => dispatch({type: actionTypes.CREATE_RIGHT, payload: (!state.rightMenuOpen)}),
    destroyRight: () => dispatch({type: actionTypes.DESTROY_RIGHT}),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SidebarsComponent);