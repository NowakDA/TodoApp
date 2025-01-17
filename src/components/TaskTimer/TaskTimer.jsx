import { useEffect, useState } from 'react';
import './taskTimer.scss';

function TaskTimer({ seconds, currState, timeUpdate }) {
  const [time, setTime] = useState(seconds);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && time !== 0 && currState !== 'completed') {
      interval = setInterval(() => {
        setTime((currTime) => {
          const newTime = currTime - 1;
          timeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      if (currState === 'completed' && isTimerActive) setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, time, currState, timeUpdate]);

  const handleStart = () => setIsTimerActive(true);
  const handlePause = () => {
    setIsTimerActive(false);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (!seconds) {
      return '00:00';
    }
    return totalSeconds === 0
      ? 'Time is out'
      : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <button type="button" className="icon-play" aria-label="Play timer" onClick={handleStart} />
      <button type="button" className="icon-pause" aria-label="Pause timer" onClick={handlePause} />
      <span className="time">{formatTime(time)}</span>
    </div>
  );
}

export default TaskTimer;
