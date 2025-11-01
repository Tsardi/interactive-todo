import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onUpdateTodo }) => {
  if (!todos.length) {
    return (
      <div className="todo-list-container">
        <p className="empty-list-message">Your todo list is empty!</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <TransitionGroup component={null}>
        {todos.map((todo) => {
          // 1. Create a ref for each specific item
          const nodeRef = React.createRef(null);

          return (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="todo-item"
              nodeRef={nodeRef} 
            >
              <TodoItem
                ref={nodeRef} 
                todo={todo}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;