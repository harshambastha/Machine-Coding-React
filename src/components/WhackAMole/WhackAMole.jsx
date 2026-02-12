import { useState, useEffect } from "react";
import styles from "./WhackAMole.module.css";

const WhackAMole = () => {
    const [holes, setHoles] = useState(Array.from({ length: 3 }, () => Array(3).fill(null)));
    const [score, setScore] = useState(0);
    const [random, setRandom] = useState({ row: 0, col: 0 });
    const [timeLeft, setTimeLeft] = useState(15);  //secs
    const gameOver = timeLeft == 0;

    useEffect(() => {
        if (gameOver) return;
        let timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        let timer = setTimeout(() => {
            const randomRow = Math.floor(Math.random() * 3);
            const randomCol =  Math.floor(Math.random() * 3);
            setRandom({row: randomRow, col: randomCol});
        }, 1500);

        return () => clearTimeout(timer);
    }, [random.row, random.col]);

    const handleMoleClick = (row,col) => {
        setScore(prev => prev + 1);
    }

    const restartGame = () => {
        setTimeLeft(15);
        setScore(0);
    }

    return (<div className={styles.container}>
        <div className={styles.nav}>
            {gameOver ? (<>
                <div>Game Over you scored {score}</div>
                <button onClick={restartGame}>Restart</button>
            </>) : (
                <>
                    <div>Score: {score}</div>
                    <div>Time Left: {timeLeft}</div>
                </>
            )}
        </div>
        {holes.map((r, row) => (
            <div key={`row-${row}`} className={styles.row}>
                {r.map((c, col) => (
                    <div key={`row-${row} col-${col}`} className={styles.col}>
                        <img src={'https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png'}
                            height={60}
                            width={70}
                            className={styles.mole}
                            onClick={()=>handleMoleClick(row,col)}
                            style={{ visibility: random.row == row && random.col == col && !gameOver ? "visible" : "hidden" }}
                        />
                        <img src={'https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png'}
                            height={40}
                            width={120}
                        />
                    </div>
                ))}
            </div>
        ))}
    </div>)
}

// how to make sure user gets only 1 point for a mole ?
// mole coming from bottom to top

export default WhackAMole;