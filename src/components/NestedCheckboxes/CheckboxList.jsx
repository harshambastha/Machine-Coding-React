import CheckboxInput from "./CheckboxInput";

const CheckboxList = ({ items, onCheck }) => {
    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <CheckboxInput
                        checked={item.checked}
                        label={item.name}
                        onChange={(e) => onCheck(item.id, e.target.checked)}
                    />

                    {item.children && (
                        <CheckboxList items={item.children} onCheck={onCheck} />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CheckboxList;