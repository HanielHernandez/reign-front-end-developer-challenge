import { FunctionComponent, useState } from "react";
import { Tab } from "../models/tab";

interface Props {
  tabs: Tab[];
}

const Tabs: FunctionComponent<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>("active");
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        return (
          <div
            className={`tab ${activeTab == tab.name && "active"}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
