const Dropdown = ({ options, value, onChange, placeholder }) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", minWidth: "120px" }}
        >
            {placeholder && (
                <option value="" disabled>{placeholder}</option>
            )}
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
