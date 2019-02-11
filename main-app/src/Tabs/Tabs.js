import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CategoryDropDownComponent from '../DropDowns/CategoryDropDown';
import SubCategoryDropDown from '../DropDowns/SubCategoryDropDown';
import styled from 'styled-components';
import "./Tabs.scss";

const DropDownContainer = styled.div`
    border: 2px dotted rgb(96, 139, 168);
    width: 250px;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px;
`;

export default () => (
  <Tabs>
    <TabList>
      <Tab>By Keyword</Tab>
      <Tab>By Category</Tab>
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
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);