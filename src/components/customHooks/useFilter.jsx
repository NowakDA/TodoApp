import { useState } from 'react';

// FILTERING TODOS BY FOOTER BUTTONS used in TaskList.jsx
const useFilter = () => {
  const [filter, setFilter] = useState('all');
  const filteredTodos = (todos) => {
    if (filter === 'active') return todos.filter((todo) => todo.currState === 'active');
    if (filter === 'completed') return todos.filter((todo) => todo.currState === 'completed');
    return todos;
  };

  return {
    filter,
    setFilter,
    filteredTodos,
  };
};

export default useFilter;
