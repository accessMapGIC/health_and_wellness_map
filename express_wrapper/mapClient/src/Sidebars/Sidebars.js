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

// localization
import LocalizedStrings from 'react-localization';
import english from '../Localization/En.js';
import french from '../Localization/Fr.js';
let strings = new LocalizedStrings({    
  en: english.sidebarStrings,
  fr: french.sidebarStrings
});

const DropdownHeader = styled.h5`
  margin-bottom: 10px;
  text-decoration: underline;
`;//styling for the dropDown menu in the leftSidebar

const MenuItem = styled.h3`
  text-decoration: underline;
  padding-bottom: .2px;
  outline: none;
`;//styling for the MenuItems within each Sidebar

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.getContrastText('#4ec3c7'),
    backgroundColor: '#4ec3c7',
    '&:hover': {
      backgroundColor: '#4ec3c7',
    },
  }
});//styling for the button

const Container = styled.div`
  text-align: left;
`;//styling for the container

class SidebarsComponent extends React.Component { //this is the component for both sidebars
    constructor (props) {
      super(props)
      this.state = {
        // rightMenu: {
        //   rightMenuOpen: false,
        //   rightHamButton: false,
        // }
      }
    }

    // handleStateChange (state, menu) {
    //   return () => {
    //     if (menu === 0) {
    //         this.setState({
    //             leftMenu: {
    //                 leftMenuOpen: state.leftMenuOpen,
    //             }
    //         })
    //     }
    //   }
    // }

    componentDidMount() { //load the information for the card from the card container
      strings.setLanguage(this.props.language);
    }
  
    componentDidUpdate(prevProp) {
      if (this.props.language !== prevProp.language) {
        strings.setLanguage(this.props.language);
        this.forceUpdate();
      }
    }

    // This will be used to submit a search query via the menus
    submitButton (state) {
      const {
        cat,
        subCat,
        insCat,
        keyword,
        tabIndex,
        queryDatabase,
        queryDatabaseKeywords
      } = this.props;

      if (tabIndex === 0) {
        queryDatabase({
          cat,
          subCat,
          insCat
        });
      } else if (tabIndex === 1) {
        queryDatabaseKeywords({
          keyword,
          insCat
        });
      }
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
        const { classes, setEnglish, setFrench, language} = this.props;
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
                <MenuItem>
                  <div style={{float: 'left'}}>
                    {strings.lfStitle}
                  </div>
                  <div style={{float: 'right'}}>
                    <a href="#" style={{fontWeight: language === "en" ? 'bold': 300}} onClick={setEnglish}>EN</a>/
                    <a href="#" style={{fontWeight: language === "fr" ? 'bold': 300}} onClick={setFrench}>FR</a>
                  </div>
                </MenuItem>
                <TabComponent/>
                <Container>
                  <div className="DropDown_Container">
                    <div className="Flex_Container">
                      <div className="InsuranceDropDown_Container">
                        <DropdownHeader>{strings.insHead}</DropdownHeader>
                        <InsuranceDropDownComponent/>
                      </div>
                      <div className="LanguageDropDown_Container">
                      <DropdownHeader>{strings.langHead}</DropdownHeader>
                      <LanguageDropDownComponent/>
                      </div>
                      <CheckBoxComponent/>
                    </div>
                  </div>
                  <Button variant="contained" color={"primary"} className={classes.button} href="" prefetch="true" onClick={(state) => this.submitButton(state)}>
                    {strings.submit}
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
                <MenuItem>{strings.rtStitle}</MenuItem>
                <CardContainer/>
                <Container>
                  <Button variant="contained" color={"primary"} className={classes.button} href="" prefetch="true" onClick={(state) => this.newSearchButton(state)}>
                    {strings.rtSbutton}
                  </Button>
                </Container>
              </Menu>
            </div>
         </div>
        )
    }
}

const mapStateToProps = state => {//info grabbed from the redux store
  return {
    rmo: state.rtS.rightMenu.rightMenuOpen,
    rhb: state.rtS.rightMenu.rightHamButton,
    lmo: state.lfS.leftMenu.leftMenuOpen,
    lhb: state.lfS.leftMenu.leftHamButton,
    tabIndex: state.lfS.leftMenu.tabIndex,
    cat: state.lfS.leftMenu.catDrop,
    subCat: state.lfS.leftMenu.subCatDrop,
    insCat: state.lfS.leftMenu.insDrop,
    keyword: state.lfS.leftMenu.keyDrop,
    language: state.lang.language
  }
};

const mapDispatchToProps = dispatch => {//the different actions called by the sidebar component
  return {
    handleRight: () => dispatch({type: actionTypes.HANDLE_RIGHT}),
    createRight: (state) => dispatch({type: actionTypes.CREATE_RIGHT, payload: (!state.rightMenuOpen)}),
    destroyRight: () => dispatch({type: actionTypes.DESTROY_RIGHT}),
    queryDatabase: (params) => dispatch(actionTypes.categoryQuery(params)),
    queryDatabaseKeywords: (params) => dispatch(actionTypes.keywordsQuery(params)),
    // QueryDatabaseReq: () => dispatch({type:actionTypes.QUERY_DATABASE_REQ}),
    // QueryDatabaseSuccess: () => dispatch({type:actionTypes.QUERY_DATABASE_SUCCESS}),
    handleLeft: (state) => {
      dispatch({
        type: actionTypes.HANDLE_LEFT,
        isOpen: state.isOpen
      });
    },
    createLeft: (state) => dispatch({type: actionTypes.CREATE_LEFT, payload: (!state.leftMenuOpen)}),
    destroyLeft: () => dispatch({type: actionTypes.DESTROY_LEFT}),
    setEnglish: () => dispatch({type: actionTypes.CHANGE_LANGUAGE, language: 'en'}),
    setFrench: () => dispatch({type: actionTypes.CHANGE_LANGUAGE, language: 'fr'}),
  }
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(SidebarsComponent);
