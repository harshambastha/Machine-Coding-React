import { useState } from "react";
import styles from './TicTacToe.module.css';

const TicTacToe = () => {
    const [grid, setGrid] = useState(getInitialGrid());
    const [playerTurn, setPlayerTurn] = useState("p1");
    let [GAME_ENDED, GAME_DRAW] = isGameEnded(grid);

    console.log(`GAME_ENDED=${GAME_ENDED}`);

    const handleGridClick = (event) => {
        const index = event.target.dataset.index;
        if (GAME_ENDED || grid[index]) return;
        setGrid(prev => {
            prev[index] = playerTurn == 'p1' ? 'X' : 'O';
            return prev;
        });
        setPlayerTurn(prev => {
            if (prev == 'p1') return 'p2';
            return 'p1';
        });
    }

    const onReset = () => {
        setGrid(getInitialGrid());
        setPlayerTurn('p1');
        GAME_ENDED = false;
    }

    return (
        <div className={styles['game-container']}>
            {GAME_ENDED ? GAME_DRAW ? "Game Draw" : playerTurn == 'p1' ? "Player O Wins" : "Player X Wins" : ''}
            {!GAME_ENDED ? playerTurn == "p1" ? "Player X Turn" : "Player O Turn" : ""}
            <div className={styles['grid-container']} onClick={handleGridClick}>
                {grid.map((space, index) => (
                    <div key={`key-${index}`} data-index={index} className={styles.grid}>{space == null ? "" : space}</div>
                ))}
            </div>
            <button className={styles['reset-button']} onClick={onReset}>Reset</button>
        </div>
    );
}

function getInitialGrid() {
    return Array.from({ length: 9 }).fill(null);
}

function isGameEnded(grid) {
    const a = grid[0] && grid[0] == grid[1] && grid[0] == grid[2];
    if (a) return [true, false];
    const b = grid[0] && grid[0] == grid[3] && grid[0] == grid[6];
    if (b) return [true, false];
    const c = grid[0] && grid[0] == grid[4] && grid[0] == grid[8];
    if (c) return [true, false];
    const d = grid[1] && grid[1] == grid[4] && grid[1] == grid[7];
    if (d) return [true, false];
    const e = grid[3] && grid[3] == grid[4] && grid[3] == grid[5];
    if (e) return [true, false];
    const f = grid[6] && grid[6] == grid[7] && grid[6] == grid[8];
    if (f) return [true, false];
    const g = grid[2] && grid[2] == grid[5] && grid[2] == grid[8];
    if (g) return [true, false];
    const h = grid[2] && grid[2] == grid[4] && grid[2] == grid[6];
    if (h) return [true, false];

    const index = grid.findIndex(item => item === null);
    console.log(`index=${index}`);
    if (index == -1) {
        return [true, true];
    }

    return [false, false];
}

export default TicTacToe;