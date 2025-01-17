import { useState } from 'react';
import './NewTaskForm.scss';

function NewTasksForm({ createTodo }) {
  const [value, setValue] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeToComplete = Number(minutes) * 60 + Number(seconds);
    createTodo(value, timeToComplete);
    setValue('');
    setMinutes('');
    setSeconds('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form action="#" className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="add-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="59"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
}

export default NewTasksForm;
