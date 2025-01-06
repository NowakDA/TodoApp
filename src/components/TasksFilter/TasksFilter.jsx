import './TasksFilter.scss';

function TasksFilter({ currFilter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={currFilter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={currFilter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={currFilter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TasksFilter;
