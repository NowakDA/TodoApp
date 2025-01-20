import { useState } from 'react';

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
}) {
  const timeAgo = useTaskTime(createdAt);

  const [editValue, setEditValue] = useState(description);

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
            onClick={() => editTodo(id)}
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
          onSubmit={(e) => {
            e.preventDefault();
            editTodo(id, editValue);
          }}
        >
          <input
            type="text"
            className="edit"
            name="edit-todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </form>
      )}
    </li>
  );
}

export default Task;
