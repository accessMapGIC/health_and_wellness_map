import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryDropDownComponent from '../DropDowns/CategoryDropDown';
import SubcategoryDropDownComponent from '../DropDowns/SubCategoryDropDown';
import KeywordDropDown from '../DropDowns/KeywordDropDown';
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

export default () => (
  <Tabs>
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