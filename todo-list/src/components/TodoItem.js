// TodoItem.js

// 1. Import 'forwardRef'
import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// 2. Wrap your component in forwardRef. It now receives 'ref' as a second argument.
const TodoItem = forwardRef(
  ({ todo, onToggleTodo, onDeleteTodo, onUpdateTodo }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef(null);

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: todo.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 1 : 0,
    };

    useEffect(() => {
      if (isEditing) {
        inputRef.current.focus();
      }
    }, [isEditing]);

    const handleDoubleClick = () => {
      setIsEditing(true);
    };

    const handleUpdate = () => {
      if (editText.trim()) {
        onUpdateTodo(todo.id, editText.trim());
      }
      setIsEditing(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleUpdate();
      } else if (e.key === 'Escape') {
        setEditText(todo.text);
        setIsEditing(false);
      }
    };

    const itemClasses = `todo-item ${todo.completed ? 'completed' : ''} ${
      isDragging ? 'dragging' : ''
    }`;

    return (
      // 3. Update the 'ref' prop to handle BOTH refs
      <div
        ref={(node) => {
          setNodeRef(node); // This is for dnd-kit
          ref.current = node; // This is for react-transition-group
        }}
        style={style}
        {...attributes}
        {...listeners}
        className={itemClasses}
      >
        <div className="checkbox-container" onClick={() => onToggleTodo(todo.id)}>
          {todo.completed && (
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
            >
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          )}
        </div>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="todo-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="todo-item-text" onDoubleClick={handleDoubleClick}>
            {todo.text}
          </span>
        )}
        <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.707 8.379l7.97 7.97-.707.707L9 9.086l-7.97 7.97-.707-.707L8.293 8.38 1.03.707.323 0 9 7.672 16.971 0z"
            />
          </svg>
        </button>
      </div>
    );
  }
);

export default TodoItem;