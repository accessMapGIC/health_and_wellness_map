import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import CategoryDropDownComponent from '../Dropdowns/CategoryDropDown';
import SubcategoryDropDownComponent from '../Dropdowns/SubCategoryDropDown';
import KeywordDropDown from '../Dropdowns/KeywordDropDown';
import { setTabIndex } from '../store/actions';
import styled from 'styled-components';
import "./Tabs.scss";

const DropDownContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.5px;
`;

const KeywordFlexContainer = styled.div`
    display: flex;
    width: 210px;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 5px;
    height: 90%;
`;

class TabComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {
      tabIndex,
      setTabIndex
    } = this.props;
    return (
      <Tabs selectedIndex={tabIndex || 0} onSelect={tabIndex => setTabIndex(tabIndex)}>
        <TabList>
          <Tab>By Category</Tab>
          <Tab>By Keyword</Tab>
        </TabList>
        <TabPanel>
          <DropDownContainer className='dropdown_container'>
                  <div className='category_container'>
                      <CategoryDropDownComponent/>
                  </div>
                  <div className='subcategory_container'>
                      <SubcategoryDropDownComponent/>
                  </div>
          </DropDownContainer>
        </TabPanel>
        <TabPanel>
          <DropDownContainer>
            <KeywordFlexContainer>
              <div className='keyword_container'>
                  <KeywordDropDown/>
              </div>
            </KeywordFlexContainer>
          </DropDownContainer>
        </TabPanel>
      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  return {
    tabIndex: state.lfS.leftMenu.tabIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTabIndex: (index) => dispatch(setTabIndex(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabComponent);
