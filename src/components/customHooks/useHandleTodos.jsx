import { useState } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const createTodo = (value, timeToComplete) => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          description: value,
          currState: 'active',
          createdAt: Date.now(),

          timeToComplete,
        },
      ]);
    }
  };

  const handleTimeToCompleteUpdate = (id, newTime) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, timeToComplete: newTime } : todo)),
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newDescription) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          let newCurrState;
          if (todo.currState === 'active' || todo.currState === 'completed') {
            newCurrState = 'editing';
          } else {
            newCurrState = 'active';
          }
          return {
            ...todo,
            description: newDescription,
            currState: newCurrState,
          };
        }
        return todo;
      }),
    );
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, currState: todo.currState === 'active' ? 'completed' : 'active' }
          : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => todo.currState !== 'completed'));
  };

  return {
    todos,
    createTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
    handleTimeToCompleteUpdate,
  };
};

export default useTodos;
