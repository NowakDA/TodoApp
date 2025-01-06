import { useState } from 'react';
import PropTypes from 'prop-types';

import useTaskTime from '../customHooks/useTaskTime';
import './Task.scss';

function Task({ description, currState, createdAt, id, removeTodo, toggleTodo, editTodo }) {
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
          <span className="description">{description}</span>
          <span className="created">
            created
            {timeAgo}
          </span>
        </div>
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

Task.propTypes = {
  description: PropTypes.string,
  currState: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default Task;
