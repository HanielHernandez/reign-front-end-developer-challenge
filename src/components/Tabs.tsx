import { FunctionComponent, useMemo, useState } from "react";
import { Tab } from "../models/tab";

interface Props {
  tabs: Tab[];
  defaultActiveTab: string;
}

const Tabs: FunctionComponent<Props> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab);
  const currentTab = useMemo(
    () => tabs.find((tab) => tab.name == activeTab),
    []
  );
  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => {
          return (
            <div
              className={`tab ${activeTab == tab.name ? "active" : ""}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      {currentTab && currentTab.component}
    </div>
  );
};

export default Tabs;
