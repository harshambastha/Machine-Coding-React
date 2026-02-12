import { useState } from "react";
import styles from "./MultiSelectComponent.module.css";

const MultiSelectComponent = ({ data }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [shownOptions, setShownOptions] = useState(data);

    const itemsToShow = data.filter(item => selectedIds.includes(item.id));

    const selectItem = (id) => {
        setSelectedIds(prev => [...prev, id]);
    }

    const removeSelectedItem = (id) => {
        const newSelectedIds = selectedIds.filter(item => item !== id);
        setSelectedIds(newSelectedIds);
    }

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    }

    const filterItems = (event) => {
        const typedText = event.target.value
        console.log('typedText ', typedText);
        setShownOptions(data.filter(item => item.label.toLowerCase().startsWith(typedText.toLowerCase())));
        console.log('shownOptions ',shownOptions);
    }

    return <div className={styles.container}>
        <div className={styles['input-for-multi-select']} onClick={toggleDropdown}>
            <input type="text" className={styles['search-item']} onChange={filterItems} />
            {itemsToShow.map(item => (
                <div key={item.id}>{item.label}<span onClick={() => removeSelectedItem(item.id)}>X</span></div>
            ))}
        </div>
        {isDropdownOpen && <Dropdown data={shownOptions} selectItem={selectItem} />}
    </div>
}

const Dropdown = ({ data, selectItem }) => {
    return (<ul className={styles.list}>
        {data.map(item => (
            <li key={item.id} onClick={() => selectItem(item.id)} className={styles['list-item']}>{item.label}</li>
        ))}
    </ul>)
}
export default MultiSelectComponent;

// the selected component
// list of items