import { useState } from "react";
import styles from './UndoableCounter.module.css';

const UndoableCounter = () => {
    const [stack, setStack] = useState([]);
    const [undoValue, setUndoValue] = useState(null);

    const handleRedo = () => {
        if(undoValue){
            setStack(prev=>[...prev, undoValue]);
            setUndoValue(null);
        }
    }

    const handleUndo = () => {
        const undoedValue = {...stack[stack.length-1]};
        setUndoValue(undoedValue);
        setStack(prev=>prev.slice(0,prev.length-1));
    }

    const handleReset = () => {
        setStack([]);
        setUndoValue(null);
    }

    const handleDivideTwo = () => {
        const oldValue = stack.length > 0 ? stack[stack.length - 1].new : 0;
        const newValue = oldValue / 2;
        setStack(prev => [...prev, { op: '/2', old: oldValue, new: newValue }]);
        setUndoValue(null);
    }

    const handleMinusOne = () => {
        const oldValue = stack.length > 0 ? stack[stack.length - 1].new : 0;
        const newValue = oldValue - 1;
        setStack(prev => [...prev, { op: '-1', old: oldValue, new: newValue }]);
        setUndoValue(null);
    }

    const handleAddOne = () => {
        const oldValue = stack.length > 0 ? stack[stack.length - 1].new : 0;
        const newValue = oldValue + 1;
        setStack(prev => [...prev, { op: '+1', old: oldValue, new: newValue }]);
        setUndoValue(null);
    }

    const handleMultipleTwo = () => {
        const oldValue = stack.length > 0 ? stack[stack.length - 1].new : 0;
        const newValue = oldValue * 2;
        setStack(prev => [...prev, { op: 'x2', old: oldValue, new: newValue }]);
        setUndoValue(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleUndo} disabled={stack.length==0}>Undo</button>
                <button onClick={handleRedo} disabled={undoValue==null}>Redo</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className={styles.operations}>
                <button onClick={handleDivideTwo}>/2</button>
                <button onClick={handleMinusOne}>-1</button>
                <div>{stack.length > 0 ? stack[stack.length - 1].new : 0}</div>
                <button onClick={handleAddOne}>+1</button>
                <button onClick={handleMultipleTwo}>x2</button>
            </div>
            <div className={styles['stack-list']}>
                {stack.length > 0 ? (
                    <div className={styles['flex-column']}>
                        <div className={styles['stack-header']}>
                            <div className={styles['stack-item']}>Op</div>
                            <div className={styles['stack-item']}>Old</div>
                            <div className={styles['stack-item']}>New</div>
                        </div>
                        <div className={styles['flex-column-reverse']}>
                        {stack.map((item,index) => (
                            <div key={`index-${index}`} className={styles['stack-header']}>
                                <div className={styles['stack-item']}>{item.op}</div>
                                <div className={styles['stack-item']}>{item.old}</div>
                                <div className={styles['stack-item']}>{item.new}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default UndoableCounter;