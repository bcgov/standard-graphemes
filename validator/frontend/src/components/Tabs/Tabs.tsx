import { PropsWithChildren } from "react";
import {
  Tabs as TabsParentElement,
  TabList,
  Tab,
  TabPanel,
} from "react-aria-components";

import "./Tabs.css";

export interface TabDetails {
  /** The unique identifier for the Tab/TabPanel pair */
  id: string;
  /** The text label for the Tab */
  label: string;
  /** Is the tab disabled */
  isDisabled?: boolean;
}

export interface TabPanelDetails extends PropsWithChildren {
  /** The unique identifier for the Tab/TabPanel pair */
  id: string;
}

export interface TabsProps {
  /** List of TabDetails objects */
  tabList: TabDetails[];
  /** List of TabPanelDetails objects */
  tabPanels: TabPanelDetails[];
}

export default function Tabs({ tabList, tabPanels }: TabsProps) {
  return (
    <TabsParentElement>
      <TabList>
        {tabList.map((tab) => {
          return (
            <Tab
              key={tab.id}
              id={tab.id}
              isDisabled={tab?.isDisabled ? true : false}
            >
              {tab.label}
            </Tab>
          );
        })}
      </TabList>
      {tabPanels.map((panel) => {
        return (
          <TabPanel key={panel.id} id={panel.id}>
            {panel.children}
          </TabPanel>
        );
      })}
    </TabsParentElement>
  );
}
