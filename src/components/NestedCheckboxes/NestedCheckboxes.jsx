import { useState } from "react";
import CheckboxList from "./CheckboxList";

const NestedCheckboxes = ({ checkboxesData }) => {
    const [data, setData] = useState(checkboxesData);

    const handleCheck = (id, checked) => {
        const updated = updateTree(data, id, checked);
        setData(updated);
    };

    return <CheckboxList items={data} onCheck={handleCheck} />;
};

function updateTree(nodes, targetId, checked) {
    return nodes.map((node) => {
        // If this is the clicked node → update it + all children
        if (node.id === targetId) {
            return setNodeAndChildren(node, checked);
        }

        // Otherwise check inside children
        if (node.children) {
            const updatedChildren = updateTree(node.children, targetId, checked);
            return updateParentState({ ...node, children: updatedChildren });
        }

        return node;
    });
}

function setNodeAndChildren(node, checked) {
    return {
        ...node,
        checked,
        children: node.children?.map((child) =>
            setNodeAndChildren(child, checked)
        ),
    };
}

function updateParentState(node) {
    if (!node.children) return node;

    const states = node.children.map((c) => c.checked);

    if (states.every((s) => s === true)) {
        return { ...node, checked: true };
    }

    if (states.every((s) => s === false)) {
        return { ...node, checked: false };
    }

    return { ...node, checked: "indeterminate" };
}

export default NestedCheckboxes;