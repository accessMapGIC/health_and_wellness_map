import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Tabs.scss";

export default () => (
  <Tabs>
    <TabList>
      <Tab>By Keyword</Tab>
      <Tab>By Category</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);