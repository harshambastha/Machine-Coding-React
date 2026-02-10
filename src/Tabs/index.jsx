import { useState } from 'react';
import "./styles.css";

const Tabs = ({ data }) => {
    const [selectedTab, setSelectedTab] = useState(data[0].value);

    const handleTabClick = (event) => {
        setSelectedTab(event.target.dataset.value);
    }

    return (<div className='tab-container'>
        <div className='tab-header' onClick={handleTabClick} role='tablist'>
            {data.map(item => (
                <div key={item.value} data-value={item.value} className={`tab ${item.value == selectedTab ? 'tab-selected' : ''}`} role="tab" aria-controls=''
                    aria-selected={item.value == selectedTab ? true : false}
                >{item.label}</div>
            ))}
        </div>
        <div className='tab-body'>
            {data.filter(item => item.value == selectedTab).map(item => (
                <div key={`tab-body-${item.value}`} role="tabpanel" aria-labelledby=''>{item.panel}</div>
            ))}
        </div>
    </div>)
}

export default Tabs;