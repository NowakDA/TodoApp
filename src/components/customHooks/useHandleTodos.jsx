import { useState } from 'react';

//used in TaskList.jsx

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const createTodo = (value) => {
    if (value) {
      setTodos([...todos, { id: Date.now(), description: value, currState: 'active', createdAt: Date.now() }]);
    }
  };

  //

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newDescription) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, description: newDescription, currState: todo.currState === 'active' ? 'editing' : 'active' }
          : todo
      )
    );
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, currState: todo.currState === 'active' ? 'completed' : 'active' } : todo
      )
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
  };
};

export default useTodos;
