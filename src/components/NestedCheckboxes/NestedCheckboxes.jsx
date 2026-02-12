import { useState } from "react";
import CheckboxList from "./CheckboxList";
import { checkboxesData as data } from "@data/nestedCheckboxesData";
import styles from "./NestedCheckboxes.module.css";

const NestedCheckboxes = () => {
    const [checkboxData, setCheckboxData] = useState(data);

    const handleOnCheck = (checked, indices) => {
        console.log('Fn-handleOnCheck');
        console.log('checked',checked);
        console.log('indices',indices);
        // Simple way to make a clone.
        const newCheckboxData = JSON.parse(JSON.stringify(checkboxData));

        const nonFirstLevelIndices = indices.slice(1);
        console.log('nonFirstLevelIndices',nonFirstLevelIndices);
        const modifiedCheckboxItem = nonFirstLevelIndices.reduce(
            (modifiedItem, index) => modifiedItem.children[index],
            newCheckboxData[indices[0]],
        );

        console.log('modifiedCheckboxItem',modifiedCheckboxItem);
        updateCheckboxAndDescendants(modifiedCheckboxItem, checked);
        resolveCheckboxStates(
            newCheckboxData[indices[0]],
            nonFirstLevelIndices,
        );

        setCheckboxData(newCheckboxData);
    }
    return (
        <CheckboxList items={checkboxData} onCheck={handleOnCheck} />
    )
}

/**
 * Recursively set descendants of the modified checkbox
 * to the new value.
 */
function updateCheckboxAndDescendants(checkboxItem, checked) {
    checkboxItem.checked = checked;
    if (!checkboxItem.children) {
        return;
    }

    checkboxItem.children.forEach((childItem) =>
        updateCheckboxAndDescendants(childItem, checked),
    );
}


/**
 * Update checkbox states based on the modified checkbox's new state.
 * Only direct ancestors of the modified checkbox are affected.
 */
function resolveCheckboxStates(checkboxItem, indices) {
    console.log('Fn-resolveCheckboxStates');
    console.log('checkboxItem', checkboxItem);
    console.log('indices', indices);

    if (indices.length > 0 && checkboxItem.children) {
        resolveCheckboxStates(checkboxItem.children[indices[0]], indices.slice(1));
    }

    if (!checkboxItem.children) {
        return;
    }

    // Determine new checkbox state based on children.
    const checkedChildren = checkboxItem.children.reduce(
        (total, item) => total + Number(item.checked === true),
        0,
    );
    const uncheckedChildren = checkboxItem.children.reduce(
        (total, item) => total + Number(item.checked === false),
        0,
    );

    if (checkedChildren === checkboxItem.children.length) {
        checkboxItem.checked = true;
    } else if (uncheckedChildren === checkboxItem.children.length) {
        checkboxItem.checked = false;
    } else {
        checkboxItem.checked = "indeterminate";
    }
}
export default NestedCheckboxes;