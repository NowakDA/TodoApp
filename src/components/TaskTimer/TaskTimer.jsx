import './TaskTimer.scss';

function TaskTimer({ seconds, id, playTimer, pauseTimer }) {
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (!seconds) {
      return '00:00';
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <button
        type="button"
        aria-label="Play timer"
        className="icon-play"
        onClick={() => playTimer(id)}
      />
      <button
        type="button"
        aria-label="Pause timer"
        className="icon-pause"
        onClick={() => pauseTimer(id)}
      />
      <span className="time">{formatTime(seconds)}</span>
    </div>
  );
}

export default TaskTimer;
