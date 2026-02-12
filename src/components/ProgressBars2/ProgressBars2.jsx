import { useEffect, useState } from "react";
import styles from "./ProgressBars2.module.css";

export default function ProgressBars2() {
    const [bars, setBars] = useState(0);
    const [barsFilled, setBarsFilled] = useState(0);

    const handleAddBar = () => {
        setBars((prev) => prev + 1);
    };

    const incrementBarFilled = () => {
        setBarsFilled(prev => prev + 1);
    }
    return (
        <div>
            <button onClick={handleAddBar}>Add</button>
            <div className={styles['progress-bars-container']}>
                {Array.from({ length: bars }).map((_, index) => (
                    <ProgressBar key={`bar-${index}`} isEmpty={index > barsFilled} onTransitionEnd={incrementBarFilled} />
                ))}
            </div>
        </div>
    );
}

const ProgressBar = ({ isEmpty, onTransitionEnd }) => {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        if (isEmpty) return;
        setStartTransition(true);
    }, [isEmpty]);

    return (<div className={styles['progress-bar-container']}>
        <div
            className={`${styles['progress-bar']} ${startTransition ? styles['progress-bar-fill'] : ''}`}
            onTransitionEnd={onTransitionEnd}
        ></div>
    </div>)
}
