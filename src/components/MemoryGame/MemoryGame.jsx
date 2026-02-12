import { useState, useEffect } from "react";
import PrepareData from "./prepareData";
import styles from './MemoryGame.module.css';

const MemoryGame = ({ emojis }) => {
    const [data, setData] = useState(emojis);
    const [prev, setPrev] = useState(null);
    const [resetCells, setResetCells] = useState([]);

    useEffect(() => {
        if (resetCells.length) {
            setTimeout(() => {
                let tempData = structuredClone(data);
                resetCells.forEach(item => {
                    const [row, col] = item;
                    tempData[row][col].isOpen = false;
                });
                setData(tempData);
            }, 1000);
            setResetCells([]);
        }
    }, [resetCells]);

    const startNewGame = () => {
        setData(PrepareData(emojis,8));
    }


    if (checkIfWeWon(data)) {
        return (
            <>
                <div>Game Won</div>
                <button onClick={startNewGame}>Play Again</button>
            </>)
    };

    const handleCellClick = (event) => {
        const row = event.target.dataset.rowindex;
        const col = event.target.dataset.colindex;
        if (!row || !col || data[row][col].isMatched) return;
        let tempData = structuredClone(data);
        tempData[row][col].isOpen = true;
        if (prev) {
            const [prevRow, prevCol] = prev;
            if (prevRow == row && prevCol == col) return;
            const prevLabel = data[prevRow][prevCol].label;
            if (prevLabel == data[row][col].label) {
                // matched
                tempData[row][col].isOpen = true;
                tempData[row][col].isMatched = true;
                tempData[prevRow][prevCol].isMatched = true;
            } else {
                // reset
                setResetCells([[prevRow, prevCol], [row, col]]);
            }
            setPrev(null);
        } else {
            setPrev([row, col]);
        }
        setData(tempData);
    }
    return (
        <div className={styles['memory-game-container']} onClick={handleCellClick}>
            {data.map((row, rowIndex) => {
                return (
                    <div className={styles.row} key={`row-${rowIndex}`}>
                        {row.map((col, colIndex) => (
                            <div className={styles.cell} key={`row-${rowIndex} col-${colIndex} label-${data[rowIndex][colIndex].label}`}
                                data-rowindex={rowIndex}
                                data-colindex={colIndex}
                            >
                                {data[rowIndex][colIndex].isOpen ? data[rowIndex][colIndex].label : ''}
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

const checkIfWeWon = (data) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].isOpen == false) {
                return false;
            }
        }
    }
    return true;
}

export default MemoryGame;