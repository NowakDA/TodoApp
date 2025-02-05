import { useReducer, useEffect } from 'react';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return [
        ...state,
        {
          id: Date.now(),
          description: action.payload.value,
          currState: 'active',
          createdAt: Date.now(),
          timeToComplete: action.payload.timeToComplete,
          isTimerPlayed: false,
        },
      ];
    case 'remove':
      return state.filter((todo) => todo.id !== action.payload);
    case 'edit':
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          const newCurrState =
            todo.currState === 'active' || todo.currState === 'completed' ? 'editing' : 'active';
          return {
            ...todo,
            description: action.payload.newDescription,
            currState: newCurrState,
          };
        }
        return todo;
      });
    case 'cancelEdit':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, currState: 'active' } : todo,
      );
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, currState: todo.currState === 'active' ? 'completed' : 'active' }
          : todo,
      );
    case 'clearCompleted':
      return state.filter((todo) => todo.currState !== 'completed');
    case 'playTimer':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isTimerPlayed: true } : todo,
      );
    case 'pauseTimer':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isTimerPlayed: false } : todo,
      );
    case 'decrementTimer':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, timeToComplete: todo.timeToComplete - 1 } : todo,
      );
    default:
      return state;
  }
};

const useTodos = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const intervals = todos.map((todo) => {
      if (todo.isTimerPlayed && todo.currState === 'active' && todo.timeToComplete > 0) {
        return setInterval(() => {
          dispatch({ type: 'decrementTimer', payload: todo.id });
        }, 1000);
      }
      return null;
    });

    return () => {
      intervals.forEach((interval) => interval && clearInterval(interval));
    };
  }, [todos]);

  const createTodo = (value, timeToComplete) => {
    if (value) {
      dispatch({ type: 'create', payload: { value, timeToComplete } });
    }
  };

  const removeTodo = (id) => dispatch({ type: 'remove', payload: id });
  const editTodo = (id, newDescription) =>
    dispatch({ type: 'edit', payload: { id, newDescription } });
  const toggleTodo = (id) => dispatch({ type: 'toggle', payload: id });
  const clearCompleted = () => dispatch({ type: 'clearCompleted' });
  const playTimer = (id) => dispatch({ type: 'playTimer', payload: id });
  const pauseTimer = (id) => dispatch({ type: 'pauseTimer', payload: id });
  const cancelEdit = (id) => dispatch({ type: 'cancelEdit', payload: id });

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
