import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const createTodo = (value, timeToComplete) => {
    if (value) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          description: value,
          currState: 'active',
          createdAt: Date.now(),
          timeToComplete,
          isTimerPlayed: false,
        },
      ]);
    }
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newDescription) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
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

  const cancelEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, currState: 'active' } : todo)),
    );
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, currState: todo.currState === 'active' ? 'completed' : 'active' }
          : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.currState !== 'completed'));
  };

  // Timer

  useEffect(() => {
    const intervals = todos.map((todo) => {
      if (todo.isTimerPlayed && todo.currState === 'active' && todo.timeToComplete !== 0) {
        return setInterval(() => {
          setTodos((prevTodos) =>
            prevTodos.map((curr) =>
              curr.id === todo.id
                ? {
                    ...curr,
                    timeToComplete: curr.timeToComplete - 1,
                  }
                : curr,
            ),
          );
        }, 1000);
      }
      return null;
    });

    return () => {
      intervals.forEach((interval) => interval && clearInterval(interval));
    };
  }, [todos]);

  const playTimer = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isTimerPlayed: true } : todo)),
    );
  };

  const pauseTimer = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isTimerPlayed: false } : todo)),
    );
  };

  return {
    todos,
    createTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
    playTimer,
    pauseTimer,
    cancelEdit,
  };
};

export default useTodos;
