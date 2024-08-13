'use client';

import { useEffect, useState } from 'react';
import TodoList from './todo-list';

export interface ITodoItem {
  id: number;
  title: string;
  isChecked: boolean;
  createdAt: Date;
}

const todoInit: ITodoItem = {
  id: 0,
  title: '',
  isChecked: false,
  createdAt: new Date(),
};

export default function TodoBody() {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todoList');

    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const onClick = () => {
    const newId =
      todoList.length === 0
        ? 1
        : Math.max(...todoList.map((todo) => todo.id)) + 1;
    const newTodo = {
      ...todoInit,
      id: newId,
      title: todoTitle,
    };

    setTodoList((prev) => [newTodo, ...prev]);
    setTodoTitle('');
  };

  return (
    <div className='flex flex-col items-center gap-5'>
      <div>
        <input
          type='text'
          value={todoTitle}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button onClick={onClick}>추가</button>
      </div>
      {todoList.map((todo) => (
        <TodoList
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isChecked={todo.isChecked}
          createdAt={todo.createdAt}
        />
      ))}
    </div>
  );
}
