import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0); // Stores time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Controls if the stopwatch is running

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update time every 10ms
      }, 10);
    } else {
      clearInterval(interval); // Clear interval when not running
    }

    // Cleanup function to clear the interval when the component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]); // Rerun effect when isRunning state changes

  // Format the time for display
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10); // Get centiseconds

    return (
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}:` +
      `${String(centiseconds).padStart(2, '0')}`
    );
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
      <button onClick={() => { setTime(0); setIsRunning(false); }}>Reset</button>
    </div>
  );
}

export default Stopwatch;