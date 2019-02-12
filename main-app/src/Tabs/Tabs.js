import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryDropDownComponent from '../DropDowns/CategoryDropDown';
import SubCategoryDropDown from '../DropDowns/SubCategoryDropDown';
import KeywordDropDown from '../DropDowns/KeywordDropDown';
import styled from 'styled-components';
import "./Tabs.scss";

const DropDownContainer = styled.div`
    padding: 5px;
    width: 250px;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 5px;
    height: 90%;
`;

const KeywordFlexContainer = styled.div`
    display: flex;
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
      <DropDownContainer>
          <FlexContainer>
              <div className='category_container'>
                  <CategoryDropDownComponent/>
              </div>
              <div className='subcategory_container'>
                  <SubCategoryDropDown/>
              </div>
          </FlexContainer>
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