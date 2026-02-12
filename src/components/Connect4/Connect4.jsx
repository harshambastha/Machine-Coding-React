import { useState, useEffect } from "react";
import styles from "./Connect4.module.css";

const Connect4 = ({ rows, cols }) => {
    const [board, setBoard] = useState([]);
    const [player, setPlayer] = useState('p1');
    const [gameOver, setGameOver] = useState(false);

    const generateBoard = () => {
        return Array.from({ length: rows }, () => Array(cols).fill(null));
    }
    useEffect(() => {
        setBoard(generateBoard());
    }, []);

    const handleAddDisc = (event) => {
        if (gameOver) return;
        const col = event.target.dataset.colindex
        const tempBoard = structuredClone(board);
        const color = player == 'p1' ? 'red' : 'yellow';
        let row = null;

        for (let i = tempBoard.length - 1; i >= 0; i--) {
            if (tempBoard[i][col] == null) {
                tempBoard[i][col] = color;
                row = i;
                break;
            }
        }
        if (!row) {
            return;
        }
        setBoard(tempBoard);
        if (isGameOver(tempBoard, row, col, color)) {
            setGameOver(true);
            return;
        };
        setPlayer(prev => {
            if (prev == 'p1') return 'p2';
            return 'p1';
        });
    }

    const handleReset = () => {
        setPlayer('p1');
        setBoard(generateBoard());
        setGameOver(false);
    }

    return (<div className={styles.container}>
        <div className={styles['col-to-add']} onClick={handleAddDisc}>
            {board.length && board[0].map((c, col) => <div data-colindex={col} key={col.toString()}
                className={player == 'p1' ? styles['hover-red'] : styles['hover-yellow']}
            ></div>)}
        </div>
        <div className={styles.board}>
            {board.map((r, row) => (
                <div key={row.toString()} className={styles.row}>
                    {r.map((c, col) => (
                        <div key={`${row.toString()} ${col.toString()}`}
                            className={styles.dot}
                            style={{ background: board[row][col] ? board[row][col] : 'white' }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
        {gameOver && <button onClick={handleReset}>Reset</button>}
    </div>)
}

function isGameOver(board, row, col, color) {
    let count = 0;
    for (let i = row; i < board.length; i++) {
        if (board[row][col] == color) {
            count++;
        } else break;
    }
    console.log(`count=${count}`);
    if (count >= 4) {
        return true;
    }
    count = 1;
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] == color) {
            count++;
        } else break;
    }
    for (let i = col + 1; i < board[0].length; i++) {
        if (board[row][i] == color) {
            count++;
        } else break;
    }
    if (count >= 4) return true;
    return false;
}

export default Connect4;