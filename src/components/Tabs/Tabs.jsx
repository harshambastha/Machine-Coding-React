// compound pattern
import { useState, createContext, useContext } from "react";
import styles from "./Tabs.module.css";

const TabsContext = createContext(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Must be used within Tabs');
    }
    return context;
}

const Tabs = ({ defaultTab, children }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
            <div className={styles['tab-container']}>
                {children}
            </div>
        </TabsContext.Provider>
    )
}

const TabList = ({ children }) => {
    return (
        <div className={styles['tab-list']}>
            {children}
        </div>)
}

const TabsPanel = ({ value, children }) => {
    const { selectedTab } = useTabsContext();
    if (selectedTab !== value) {
        return;
    }

    return (
        <div>
            {children}
        </div>
    )
}

const TabsTrigger = ({ value, children }) => {
    const { selectedTab, setSelectedTab } = useTabsContext();

    return (
        <button className={selectedTab === value ? styles['selected'] : ''} onClick={() => setSelectedTab(value)}>{children}</button>
    )
}

export { Tabs, TabsTrigger, TabsPanel, TabList };