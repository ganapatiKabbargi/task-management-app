import { Tab } from "@headlessui/react";
import React from "react";
import styles from "./Tabs.module.css";
function Tabs({ tabs, setSelected, children }) {
  return (
    <div className={styles.tabs}>
      <Tab.Group>
        <Tab.List className={styles.tabList}>
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={i + tab.title}
                onClick={() => {
                  setSelected(i);
                }}
                className={({ selected }) =>
                  `${styles.tabb} ${
                    selected ? styles.selected : styles.notSelected
                  }`
                }
              >
                {tab.icon}
                <span>{tab.title}</span>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panel style={{ width: "100%", marginTop: "8px" }}>
          {children}
        </Tab.Panel>
      </Tab.Group>
    </div>
  );
}

export default Tabs;
