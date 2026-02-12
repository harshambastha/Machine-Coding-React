import { useState, useRef } from "react";
import styles from "./AuthCodeInput.module.css";

const AuthCodeInput = ({ length }) => {
    const [digits, setDigits] = useState(Array.from({ length }).fill(''));
    const inputRefs = useRef([]);

    const resetDigits = () => {
        setDigits(Array.from({ length }).fill(''));
        inputRefs.current[0]?.focus();
    }

    const submitCode = async () => {
        try {
            const res = await fetch('https://questions.greatfrontend.com/api/questions/auth-code-input', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: digits.join('') })
            });
            const data = await res.json();
            alert(data.message);
            console.log(data);
        } catch (error) {
            console.error('Error submitting code:', error);
        }
    }

    const handleDigitChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits
        
        const newDigits = [...digits];
        newDigits[index] = value.slice(-1);
        setDigits(newDigits);

        // Auto-advance to next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    const isComplete = digits.every(digit => digit !== '');

    return (
        <div className={styles['otp-container']}>
            <div className={styles['digits-container']}>
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        className={styles.digit}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                ))}
            </div>
            <div className={styles['button-container']}>
                <button className={`${styles.btn} ${styles.reset}`} onClick={resetDigits}>Reset</button>
                <button className={`${styles.btn} ${styles.submit}`} onClick={submitCode} disabled={!isComplete}>Submit</button>
            </div>
        </div>
    )
}

export default AuthCodeInput;