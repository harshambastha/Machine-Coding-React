import { useState, useRef, useEffect, useId } from 'react';
import styles from "./Tabs.module.css";

const Tabs = ({ data = [] }) => {
    const idBase = useId();
    const [selectedTab, setSelectedTab] = useState(() => data?.[0]?.value ?? null);
    const tabsRef = useRef([]);

    useEffect(() => {
        if (!selectedTab && data.length) setSelectedTab(data[0].value);
    }, [data, selectedTab]);

    const handleTabClick = (value, index) => {
        setSelectedTab(value);
        tabsRef.current[index]?.focus();
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        const currentIndex = tabsRef.current.findIndex((el) => el === document.activeElement);
        if (currentIndex === -1) return;

        let nextIndex;
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % data.length;
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + data.length) % data.length;
        } else if (key === 'Home') {
            nextIndex = 0;
        } else if (key === 'End') {
            nextIndex = data.length - 1;
        }

        if (typeof nextIndex === 'number') {
            e.preventDefault();
            const next = tabsRef.current[nextIndex];
            next?.focus();
            setSelectedTab(data[nextIndex].value);
        }
    };

    return (
        <div className={styles['tab-container']}>
            <div className={styles['tab-header']} role='tablist' aria-label='Tabs' onKeyDown={handleKeyDown}>
                {data.map((item, index) => {
                    const isSelected = item.value === selectedTab;
                    return (
                        <button
                            key={item.value}
                            ref={(el) => (tabsRef.current[index] = el)}
                            type='button'
                            role='tab'
                            id={`${idBase}-tab-${item.value}`}
                            aria-controls={`${idBase}-panel-${item.value}`}
                            aria-selected={isSelected}
                            tabIndex={isSelected ? 0 : -1}
                            className={`${styles.tab} ${isSelected ? styles['tab-selected'] : ''}`}
                            onClick={() => handleTabClick(item.value, index)}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            <div className={styles['tab-body']}>
                {data.map((item) => (
                    <div
                        key={`tab-body-${item.value}`}
                        role='tabpanel'
                        id={`${idBase}-panel-${item.value}`}
                        aria-labelledby={`${idBase}-tab-${item.value}`}
                        hidden={item.value !== selectedTab}
                    >
                        {item.panel}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;