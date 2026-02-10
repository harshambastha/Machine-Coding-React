import { useState, useEffect } from 'react';
import "./styles.css";

const COLORS = [
    { key: "green", color: "green", duration: 3000 },
    { key: "yellow", color: "yellow", duration: 500 },
    { key: "red", color: "red", duration: 4000 },
];

export default function TrafficLights() {
    const [selectedColor, setSelectedColor] = useState(COLORS[0].color);

    useEffect(() => {
        let index = COLORS.findIndex(item => item.color == selectedColor);

        let timer = setTimeout(() => {
            index = (index + 1) % COLORS.length;
            setSelectedColor(COLORS[index].color);
        }, COLORS[index].duration);

        return () => {
            clearTimeout(timer);
        }
    }, [selectedColor]);

    return (
        <div className="grid-container">
            {COLORS.map(({ key, color }) => (
                <div key={key} className="circle" style={{ backgroundColor: color == selectedColor ? color : '' }}></div>
            ))}
        </div>
    )
}
