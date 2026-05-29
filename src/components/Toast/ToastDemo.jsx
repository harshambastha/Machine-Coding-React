import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";
import styles from './Toast.module.css';

const ToastDemo = () => {
    const [positionX, setPositionX] = useState('left');
    const [positionY, setPositionY] = useState('top');
    const [toastType, setToastType] = useState('normal');
    const [toastDuration, setToastDuration] = useState(3);


    const handleShowToast = () => {

    }

    return (
        <div className={styles["container"]}>
            <h1>Toast/Snackbar Demo</h1>
            <div className={styles["center-container"]}>
                <select className={styles["select-style"]} value={positionX} name="position-x" onChange={(e) => setPositionX(e.target.value)}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
                <select className={styles["select-style"]} value={positionY} name="position-y" onChange={(e) => setPositionY(e.target.value)}>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                </select>
                <select className={styles["select-style"]} value={toastType} name="toast-type" onChange={(e) => setToastType(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                    <option value="warning">Warning</option>
                    <option value="info">Info</option>
                </select>
                <div>Duration <input type="range" min="3" max="10" value={toastDuration} onChange={(e) => setToastDuration(e.target.value)} /> {toastDuration} sec</div>
                <button className={styles["button"]} onClick={handleShowToast}>Show Toast</button>
            </div>
            {createPortal(<Toast positionX={positionX} positionY={positionY} toastType={toastType} duration={toastDuration.current} />,
                document.body)}

        </div>
    )
}

export default ToastDemo;