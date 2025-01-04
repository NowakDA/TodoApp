import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useTaskTime from '../customHooks/useTaskTime';
import './Task.scss';

const Task = ({ description, currState, createdAt, id, removeTodo, toggleTodo, editTodo }) => {
  const timeAgo = useTaskTime(createdAt);
  const [editValue, setEditValue] = useState(description);

  return (
    <li className={currState} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" name="checkbox" onChange={() => toggleTodo(id)} />
        <div className="todo-info">
          <span className="description">{description}</span>
          <span className="created">created {timeAgo}</span>
        </div>
        <button className="icon icon-edit" onClick={() => editTodo(id)}></button>
        <button className="icon icon-destroy" onClick={() => removeTodo(id)}></button>
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
};

Task.propTypes = {
  description: PropTypes.string,
  currState: PropTypes.string,
  createdAt: PropTypes.number,
  id: PropTypes.number,
  removeTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  editTodo: PropTypes.func,
};

export default Task;
