import { useEffect, useId, useRef } from "react";
import styles from "./NestedCheckboxes.module.css";

const CheckboxInput = ({ checked, label, ...props }) => {
    const id = useId();
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.indeterminate = checked === 'indeterminate';
    }, [checked]);

    return (
        <div className={styles.checkbox}>
            <input
                id={id}
                ref={ref}
                type="checkbox"
                checked={checked === true || checked === false ? checked : false}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default CheckboxInput;