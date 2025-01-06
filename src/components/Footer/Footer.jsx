import PropTypes from 'prop-types';

import './Footer.scss';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({ todos, currFilter, setFilter, clearCompleted }) {
  const activeTodosCount = todos.filter((todo) => todo.currState === 'active').length;
  return (
    <footer className="footer">
      <span className="todo-count">{activeTodosCount} items left</span>
      <TasksFilter currFilter={currFilter} setFilter={setFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      currState: PropTypes.oneOf(['active', 'completed', 'editing']).isRequired,
    }),
  ).isRequired,
  currFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
