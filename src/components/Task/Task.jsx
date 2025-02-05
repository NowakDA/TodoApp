import { useState, useEffect, useRef } from 'react';

import useTaskTime from '../customHooks/useTaskTime';
import './Task.scss';
import TaskTimer from '../TaskTimer/TaskTimer';

function Task({
  description,
  currState,
  createdAt,
  id,
  removeTodo,
  toggleTodo,
  editTodo,
  timeToComplete,
  playTimer,
  pauseTimer,
  cancelEdit,
}) {
  const timeAgo = useTaskTime(createdAt);
  const [editValue, setEditValue] = useState(description);
  const editRef = useRef(null);
  useEffect(() => {
    if (currState === 'editing') {
      if (editRef.current) {
        editRef.current.focus();
      }
      const handleClick = (event) => {
        if (editRef.current && !editRef.current.contains(event.target)) {
          cancelEdit(id);
          setEditValue(description);
        }
      };

      document.addEventListener('mousedown', handleClick);

      return () => {
        document.removeEventListener('mousedown', handleClick);
      };
    }
    return undefined;
  }, [currState]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      cancelEdit(id);
      setEditValue(description);
    }
  };

  return (
    <li className={currState} key={id}>
      <div className="view">
        <label htmlFor={`checkbox-${id}`} aria-label="Mark as completed">
          <input
            className="toggle"
            type="checkbox"
            name="checkbox"
            id={`checkbox-${id}`}
            checked={currState === 'completed'}
            onChange={() => toggleTodo(id)}
          />
        </label>
        <div className="todo-info">
          <span className="description">
            <p>{description}</p>
          </span>
          <TaskTimer
            id={id}
            seconds={timeToComplete}
            playTimer={playTimer}
            pauseTimer={pauseTimer}
          />
          <span className="created">created : {timeAgo}</span>
          <button
            type="button"
            className="icon icon-edit"
            aria-label="Edit task"
            onClick={() => editTodo(id, description)}
          />
          <button
            type="button"
            className="icon icon-destroy"
            aria-label="Remove task"
            onClick={() => removeTodo(id)}
          />
        </div>
      </div>
      {currState === 'editing' && (
        <form
          action="#"
          name="edit"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            editTodo(id, editValue);
          }}
          onKeyDown={handleKeyDown}
        >
          <input
            type="text"
            className="edit"
            name="edit-todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            ref={editRef}
          />
        </form>
      )}
    </li>
  );
}

export default Task;
