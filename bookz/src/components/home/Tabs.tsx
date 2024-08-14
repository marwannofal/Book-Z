import React, { useState } from "react";

interface Tab {
  label: string;
  key: string;
}

const tabsData: { tabs: Tab[] } = {
  tabs: [
    { label: "Tab 1", key: "tab1" },
    { label: "Tab 2", key: "tab2" },
    { label: "Tab 3", key: "tab3" },
  ],
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabsData.tabs[0].key);

  const isSelected = (key: string) => key === activeTab;

  const setTab = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="px-4 lg:px-0 flex justify-center">
      <div className="md:flex flex-col w-screen lg:max-w-screen-dt">
        <div className="flex flex-row gap-9 lg:mt-6 text-base font-semibold lg:border-b-2 border-grey-1">
          {tabsData.tabs.map((tab: Tab) => (
            <button
              key={tab.label}
              onClick={() => setTab(tab.key)}
              className={`${
                isSelected(tab.key) ? "text-black" : "text-grey-21"
              }`}
            >
              {tab.label}
              <div
                className={`bg-blue-1 mt-1 h-1 w-full rounded ${
                  isSelected(tab.key) ? "" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
