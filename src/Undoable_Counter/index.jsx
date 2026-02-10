import { useState } from "react";
import './styles.css';

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
        <div className="container">
            <div className="controls">
                <button onClick={handleUndo} disabled={stack.length==0}>Undo</button>
                <button onClick={handleRedo} disabled={undoValue==null}>Redo</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="operations">
                <button onClick={handleDivideTwo}>/2</button>
                <button onClick={handleMinusOne}>-1</button>
                <div>{stack.length > 0 ? stack[stack.length - 1].new : 0}</div>
                <button onClick={handleAddOne}>+1</button>
                <button onClick={handleMultipleTwo}>x2</button>
            </div>
            <div className="stack-list">
                {stack.length > 0 ? (
                    <div className="flex-column">
                        <div className="stack-header">
                            <div className="stack-item">Op</div>
                            <div className="stack-item">Old</div>
                            <div className="stack-item">New</div>
                        </div>
                        <div className="flex-column-reverse">
                        {stack.map((item,index) => (
                            <div key={`index-${index}`} className="stack-header">
                                <div className="stack-item">{item.op}</div>
                                <div className="stack-item">{item.old}</div>
                                <div className="stack-item">{item.new}</div>
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