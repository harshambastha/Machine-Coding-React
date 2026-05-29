import { useEffect, useState, useRef } from "react";

const Quiz = ({ questions, duration }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const questionsLength = questions.length;
    const [answers, setAnswers] = useState(Array(questionsLength).fill(''));
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setInterval(() => {
            setSelectedIndex(prev => {
                if (prev >= questionsLength) {
                    clearInterval(timer.current);
                    return prev;
                }
                return prev + 1
            });
        }, duration);

        return () => {
            clearInterval(timer.current);
        }
    }, [duration, questionsLength]);

    const handleOptionSelect = (questionNumber, option) => {
        setAnswers(prev => prev.map((answer, index) => {
            if (index === questionNumber) {
                return option;
            }
            return answer;
        }));
    }

    if (selectedIndex < questionsLength) {
        return <RenderQuestion
            questionNumber={selectedIndex}
            checked={answers[selectedIndex]}
            questionDetails={questions[selectedIndex]}
            handleOptionSelect={handleOptionSelect} />
    }

    const correctAnswers = questions.reduce((acc, curr, index) => {
        if (curr.answer === answers[index]) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div>Your score: {correctAnswers}/{questionsLength}</div>
    )
}

const RenderQuestion = ({ questionNumber, checked, questionDetails, handleOptionSelect }) => {
    const { question, options, id } = questionDetails;
    return (
        <div>
            <div>{question}</div>
            {options.map(option => (
                <label key={option}>
                    <input
                        type="radio"
                        checked={checked === option}
                        value={option}
                        name={id}
                        onChange={() => handleOptionSelect(questionNumber, option)} />
                    {option}
                </label>
            ))}
        </div>
    )
}

export default Quiz;