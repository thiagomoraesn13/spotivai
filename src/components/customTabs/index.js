import React from 'react';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { tabs } from '../../models/Tabs'

import { WrapperTabs } from '../wrappers/components'

const CustomTabs = ({ currentTab, setTab }) =>
  <WrapperTabs>
    <Tabs
      value={currentTab}
      indicatorColor="primary"
      textColor="primary"
      aria-label="disabled tabs example"
    >
      {
        tabs.map((tab, index) =>
          <Tab
            label={tab}
            key={`tab_${index}`}
            onClick={() => setTab(index)}
          />
        )
      }
    </Tabs>
  </WrapperTabs>

export default CustomTabs;
