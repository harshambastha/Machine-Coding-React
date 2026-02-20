import { useState } from "react";
import styles from './TicTacToe.module.css';

const TicTacToe = () => {
    const [grid, setGrid] = useState(getInitialGrid());
    const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
    const status = getGameStatus(grid);


    const handleGridClick = (event) => {
        const index = +event.target.dataset.index;
        if (status || grid[index]) return;

        setGrid(prev => {
            return prev.map((_, idx) => {
                if (index === idx) {
                    return isFirstPlayerTurn ? 'X' : 'O';
                }
                return prev[idx];
            });
        });
        setIsFirstPlayerTurn(prev => !prev);
    }

    const onReset = () => {
        setGrid(getInitialGrid());
        setIsFirstPlayerTurn(true);
    }

    const getStatusMessage = () => {
        if (!status) {
            return isFirstPlayerTurn ? "Player X Turn" : "Player O Turn";
        }
        if (status === "DRAW") {
            return "Game Draw";
        }
        return `Player ${status} Wins 🎉`;
    }

    return (
        <div className={styles['game-container']}>
            <span className={styles['status-message']}>{getStatusMessage()}</span>
            <div className={styles['grid-container']} onClick={handleGridClick}>
                {grid.map((space, index) => (
                    <div key={`key-${index}`} data-index={index} className={styles.cell}>{space == null ? "" : space}</div>
                ))}
            </div>
            <button className={styles['reset-button']} onClick={onReset}>Reset</button>
        </div>
    );
}

function getInitialGrid() {
    return Array.from({ length: 9 }).fill(null);
}

function getGameStatus(grid) {
    const a = grid[0] && grid[0] == grid[1] && grid[0] == grid[2];
    if (a) return grid[0];
    const b = grid[0] && grid[0] == grid[3] && grid[0] == grid[6];
    if (b) return grid[0];
    const c = grid[0] && grid[0] == grid[4] && grid[0] == grid[8];
    if (c) return grid[0];
    const d = grid[1] && grid[1] == grid[4] && grid[1] == grid[7];
    if (d) return grid[1];
    const e = grid[3] && grid[3] == grid[4] && grid[3] == grid[5];
    if (e) return grid[3];
    const f = grid[6] && grid[6] == grid[7] && grid[6] == grid[8];
    if (f) return grid[6];
    const g = grid[2] && grid[2] == grid[5] && grid[2] == grid[8];
    if (g) return grid[2];
    const h = grid[2] && grid[2] == grid[4] && grid[2] == grid[6];
    if (h) return grid[2];

    const isDraw = grid.every(space => space != null);
    if (isDraw) return "DRAW";
    return null;
}

export default TicTacToe;