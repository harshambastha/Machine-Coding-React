import { useRef, useState } from 'react';

const GenerateTable = () => {
    const [table, setTable] = useState([]);
    const rowsRef = useRef();
    const colsRef = useRef();

    const generateNewTable = () => {
        const rowCount = Number(rowsRef.current?.value);
        const colCount = Number(colsRef.current?.value);

        if (!Number.isInteger(rowCount) || rowCount <= 0 || !Number.isInteger(colCount) || colCount <= 0) {
            alert('Please enter valid positive integers for rows and columns');
            return;
        }

        const resultTable = Array.from({ length: rowCount }, () => Array(colCount).fill(null));
        let currentNumber = 1;

        // Fill column-by-column in a serpentine pattern: even columns top->bottom, odd columns bottom->top
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const fillTopToBottom = colIndex % 2 === 0;

            if (fillTopToBottom) {
                for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                    resultTable[rowIndex][colIndex] = currentNumber++;
                }
            } else {
                for (let rowIndex = rowCount - 1; rowIndex >= 0; rowIndex--) {
                    resultTable[rowIndex][colIndex] = currentNumber++;
                }
            }
        }

        setTable(resultTable);
    };

    return (
        <div>
            Rows - <input type="number" ref={rowsRef} />
            Columns- <input type="number" ref={colsRef} />
            <button onClick={generateNewTable}>Submit</button>
            <table className={styles['table-container']}>
                <tbody>
                    {table.map((row, rowIndex) => (
                        <tr className={styles.row} key={`row-${rowIndex}`}>
                            {row.map((cellValue, colIndex) => (
                                <td className={styles.col} key={`col-${colIndex}`}>{cellValue}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GenerateTable;