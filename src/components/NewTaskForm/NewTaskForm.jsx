import { useState } from 'react';
import './NewTaskForm.scss';

function NewTasksForm({ createTodo }) {
  const [value, setValue] = useState('');
  return (
    <header className="header">
      <h1>todos</h1>
      <form
        action="#"
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          createTodo(value);
          setValue('');
        }}
      >
        <input
          type="text"
          name="add-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </header>
  );
}

export default NewTasksForm;
