import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [timeInMs, setTimeInMs] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimer) {
      // Update every 10ms for smooth millisecond display
      timerRef.current = window.setInterval(() => {
        setTimeInMs((prev) => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleToggle = () => setStartTimer((prev) => !prev);

  const handleReset = () => {
    setStartTimer(false);
    setTimeInMs(0);
  };

  const formatTime = (totalMs: number) => {
    const ms = Math.floor((totalMs % 1000) / 10); // Display 2-digit ms
    const totalSeconds = Math.floor(totalMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(ms)}`;
  };

  return (
    <div>
      {/* Clicking on the timer text also toggles the state */}
      <h1>{formatTime(timeInMs)}</h1>
      <div>
        <button onClick={handleToggle}>{startTimer ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
