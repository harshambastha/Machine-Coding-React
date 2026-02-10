import { useRef, useState } from 'react';
// import "./styles.css";

const GenerateTable = () => {
    const [table, setTable] = useState([]);
    const rows = useRef();
    const cols = useRef();

    const generateNewTable = () => {
        const newTable = Array.from({ length: rows.current.value }, () => Array(+cols.current.value).fill(null));
        let num = 1;
        let topToBottom = true;

        for (let j = 0; j < newTable[0].length; j++) {

            if (topToBottom) {
                for (let i = 0; i < newTable.length; i++) {
                    newTable[i][j] = num++;
                }
            } else {
                for (let i = newTable.length - 1; i >= 0; i--) {
                    newTable[i][j] = num++;
                }
            }

            topToBottom = !topToBottom;
        }

        setTable(newTable);
    };

    return <div>
        Rows - <input type="number" ref={rows} />
        Columns- <input type="number" ref={cols} />
        <button onClick={generateNewTable}>Submit</button>
        <table className='table-container'>
            <tbody>
                {table.map((row, rowIndex) => (
                    <tr className='row' key={`row-${rowIndex}`}>
                        {row.map((col, colIndex) => <td className='col' key={`col-${colIndex}`}>{table[rowIndex][colIndex]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default GenerateTable;