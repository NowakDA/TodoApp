import { useState } from 'react';

// FILTERING TODOS BY FOOTER BUTTONS used in TaskList.jsx
const useFilter = () => {
  const [filter, setFilter] = useState('all');
  const filteredTodos = (todos) =>
    filter === 'all' ? todos : todos.filter((todo) => todo.currState === filter);

  return {
    filter,
    setFilter,
    filteredTodos,
  };
};

export default useFilter;
