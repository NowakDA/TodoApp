import './TaskList.scss';
import Task from '../Task/Task';
import NewTasksForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import useTodos from '../customHooks/useHandleTodos';
import useFilter from '../customHooks/useFilter';

function Tasklist() {
  const {
    todos,
    createTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
    playTimer,
    pauseTimer,
    cancelEdit,
  } = useTodos();
  const { filter, setFilter, filteredTodos } = useFilter();

  const displayedTodos = filteredTodos(todos);

  return (
    <section className="main">
      <NewTasksForm createTodo={createTodo} />
      <ul className="todo-list">
        {displayedTodos.map((elem) => (
          <Task
            key={elem.id}
            description={elem.description}
            currState={elem.currState}
            createdAt={elem.createdAt}
            id={elem.id}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            timeToComplete={elem.timeToComplete}
            playTimer={playTimer}
            pauseTimer={pauseTimer}
            cancelEdit={cancelEdit}
          />
        ))}
        <Footer
          todos={todos}
          currFilter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </ul>
    </section>
  );
}

export default Tasklist;
