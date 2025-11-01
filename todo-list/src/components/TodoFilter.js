import React from 'react';

const TodoFilter = ({
  currentFilter,
  onSetFilter,
  itemsLeft,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className="todo-filter-container">
      <span>{itemsLeft} items left</span>
      <div className="filter-buttons">
        <button
          className={currentFilter === 'all' ? 'active' : ''}
          onClick={() => onSetFilter('all')}
        >
          All
        </button>
        <button
          className={currentFilter === 'active' ? 'active' : ''}
          onClick={() => onSetFilter('active')}
        >
          Active
        </button>
        <button
          className={currentFilter === 'completed' ? 'active' : ''}
          onClick={() => onSetFilter('completed')}
        >
          Completed
        </button>
      </div>
      {hasCompletedTodos && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TodoFilter;
