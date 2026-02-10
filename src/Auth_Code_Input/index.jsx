import { useState } from "react";
import "./styles.css";

const AuthCodeInput = ({ length }) => {
    const [digits, setDigits] = useState(Array.from({ length }).fill(''));
    const [focusedIndex, setFocusedIndex] = useState(0);

    const resetDigits = () => {
        setDigits(Array.from(length).fill(''));
    }

    const submitCode = async () => {
        const res = await fetch('https://questions.greatfrontend.com/api/questions/auth-code-input', {
            otp: digits.join('')
        });
    }

    const handleDigitChange = (index, value) => {
        const tempDigits = digits.slice(0);
        tempDigits[index] = value.slice(0, 1);
        setDigits(tempDigits);
    }

    return (
        <div className="otp-container">
            <div className="digits-container">
                {digits.map((digit, index) => (
                    <input key={index} className="digit" value={digit} onChange={(e) => handleDigitChange(index, e.target.value)} />
                ))}
            </div>
            <div className="button-container">
                <button className="btn reset" onClick={resetDigits}>Reset</button>
                <button className="btn submit" onClick={submitCode}>Submit</button>
            </div>
        </div>
    )
}

export default AuthCodeInput;