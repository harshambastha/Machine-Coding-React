import { useState, useEffect, useRef } from "react";
import "./styles.css";

const MemoryGame2 = ({ emojis }) => {
    const [board, setBoard] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const timer = useRef();
    const gameCompleted = board.reduce((acc, curr) => acc && curr.isOpen, true);

    const shuffleData = (data) => {
        for (let i = 0; i < data.length; i++) {
            const random = Math.floor(Math.random() * data.length);
            [data[i], data[random]] = [data[random], data[i]];
        }
        return data.map(emoji => ({ emoji: emoji, isOpen: false }));
    }
    const generateBoard = () => {
        const data = emojis.reduce((acc, curr) => [...acc, ...curr.repeat(2)], []);
        setBoard(shuffleData(data));
    }

    const handleOnBoardClick = (event) => {
        const clickedEmojiIndex = event.target.dataset.index;

    }

    useEffect(() => {
        generateBoard();
    }, []);

    return (<div className="container" onClick={handleOnBoardClick}>
        <div className="board-container">
            {board.map(({ emoji, isOpen }, row) => (
                <button key={`row-${row}`} data-index={row} className={`row ${isOpen ? 'row-confirm' : ''}`}
                >{isOpen ? emoji : ''}</button>
            ))}
        </div>
        {gameCompleted ? <>Game Completed<button className="play-again-btn">Play Again</button></> : null}
    </div>)
}

export default MemoryGame2;