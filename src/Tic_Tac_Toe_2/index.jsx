import { useState, useEffect } from "react";
import "./styles.css";

const TicTacToe2 = ({ n, m }) => {
    const [board, setBoard] = useState([]);
    const [player, setPlayer] = useState('p1');
    const [isGameFinished, setGameFinished] = useState(false);
    const isBoardFull = getIsBoardFull(board);

    const generateBoard = (len) => {
        setBoard(Array.from({ length: len }, () => Array(len).fill(null)));
    }

    useEffect(() => {
        generateBoard(n);
    }, []);

    const handleBoardClick = (event) => {
        if (isGameFinished) return;
        const rowIndex = event.target.dataset.row;
        const colIndex = event.target.dataset.col;
        const value = player == 'p1' ? 'X' : 'O';
        const nextTurn = player == 'p1' ? 'p2' : 'p1';
        // check with chatGpt for alternative approach
        const newBoard = structuredClone(board);
        newBoard[rowIndex][colIndex] = value;
        setBoard(newBoard);
        if (getIsGameFinished(newBoard, rowIndex, colIndex, value, m)) {
            setGameFinished(true);
            return;
        };
        setPlayer(nextTurn);
    }

    const resetGame = () => {
        generateBoard(n);
        setPlayer('p1');
        setGameFinished(false);
    }

    return <div>
        {isBoardFull ? 'Game Draw' : `Player ${player=='p1'?'X':'O'} ${isGameFinished ? 'wins!' : 'turn'}`}
        <table>
            <tbody onClick={handleBoardClick}>
                {board.map((_, rowIndex) => <tr key={`key-${rowIndex}`} className="row">
                    {_.map((col, colIndex) => <td key={`key-${colIndex}`}
                        style={{pointerEvents: board[rowIndex][colIndex]!==null ? 'none': 'all'}}
                        className="cell"
                        data-row={rowIndex}
                        data-col={colIndex}
                    >{board[rowIndex][colIndex]}</td>)}
                </tr>)}
            </tbody>
        </table>
        <button onClick={resetGame}>Reset</button>
    </div>
}

function getIsGameFinished(board, row, col, value, m) {
    let j = col;
    let count = 0;
    // row
    while (j >= 0) {
        if (board[row][j] !== value) {
            break;
        }
        count++
        j--;
    }
    if (count >= m) return true;
    count = 0;
    j = col;
    while (j < board[0].length) {
        if (board[row][j] !== value) {
            break;
        }
        count++;
        j++;
    }
    if (count >= m) return true;

    // col
    count = 0;
    let i = row;
    while (i >= 0) {
        if (board[i][col] !== value) {
            break;
        }
        count++;
        i--;
    }
    if (count >= m) return true;
    count = 0;
    i = row;
    while (i < board.length) {
        if (board[i][col] !== value) {
            break;
        }
        count++;
        i++;
    }
    if (count >= m) return true;
    // diaognal top left->bottom right
    count = 0;
    i = row, j = col;
    while (i >= 0 && j >= 0) {
        if (board[i][j] !== value) {
            break;
        }
        count++;
        i--;
        j--;
    }
    if (count >= m) return true;
    count = 0;
    i = row, j = col;
    while (i < board.length && j < board[0].length) {
        if (board[i][j] !== value) {
            break;
        }
        count++;
        i++;
        j++;
    }
    if (count >= m) return true;

    // diaognal bottom left->top right
    count = 0;
    i = row, j = col;
    while (i >= 0 && j < board[0].length) {
        if (board[i][j] !== value) {
            break;
        }
        count++;
        i--;
        j++;
    }
    if (count >= m) return true;
    count = 0;
    i = row, j = col;
    while (i < board.length && j >= 0) {
        if (board[i][j] !== value) {
            break;
        }
        count++;
        i++;
        j--;
    }
    if (count >= m) return true;

    return false;
}

function getIsBoardFull(board) {
    let hasNull = false;
    board.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
        if (board[rowIndex][colIndex] == null) {
            hasNull = true;
        }
    }))
    return !hasNull;
}
export default TicTacToe2;

// check for disable prop in an element
// text-align center works in table-cell center