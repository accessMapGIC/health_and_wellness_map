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
        // rightMenu: {
        //   rightMenuOpen: false,
        //   rightHamButton: false,
        // }
      }
    }
    
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
    
    // This will be used to submit a search query via the menus
    submitButton (state) {
      this.props.queryDatabase();
      this.props.destroyLeft();
        // rightMenu: {
        //   rightMenuOpen: !state.rightMenuOpen,
        //   rightHamButton: null,
        // }
      this.props.createRight(state);
    } 

    newSearchButton (state) {
      this.props.destroyRight();
      this.props.createLeft(state);
    }

    render () {
        const { classes } = this.props;
        return (
          <div className='menu-sidebars'>
            <div className='menu-left'>
              <Menu 
              isOpen={this.props.lmo}
              onStateChange={this.props.handleLeft}
              customBurgerIcon={this.props.lhb}
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
                  <Button variant="contained" color={"primary"} className={classes.button} href="" prefetch="true" onClick={(state) => this.submitButton(state)}>
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
                <CardContainer/>
                <Container>
                  <Button variant="contained" color={"primary"} className={classes.button} href="" prefetch="true" onClick={(state) => this.newSearchButton(state)}>
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
    lmo: state.lfS.leftMenu.leftMenuOpen,
    lhb: state.lfS.leftMenu.leftHamButton,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleRight: () => dispatch({type: actionTypes.HANDLE_RIGHT}),
    createRight: (state) => dispatch({type: actionTypes.CREATE_RIGHT, payload: (!state.rightMenuOpen)}),
    destroyRight: () => dispatch({type: actionTypes.DESTROY_RIGHT}),
    queryDatabase: () => dispatch({type: actionTypes.QUERY_DATABASE}),
    handleLeft: () => dispatch({type: actionTypes.HANDLE_LEFT}),
    createLeft: (state) => dispatch({type: actionTypes.CREATE_LEFT, payload: (!state.leftMenuOpen)}),
    destroyLeft: () => dispatch({type: actionTypes.DESTROY_LEFT}),
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SidebarsComponent);