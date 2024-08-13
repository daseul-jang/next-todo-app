'use client';

import { addTodos, getTodos } from '@/redux/slice/todoSlice';
import { setName } from '@/redux/slice/userSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './todo-list';

export default function Todos() {
  const dispatch = useDispatch();
  const router = useRouter();
  const name = useSelector((state: RootState) => state.user.name);
  const todoList = useSelector((state: RootState) => state.todo);
  const [todoTitle, setTodoTitle] = useState<string>('');

  // 이름 state에 세팅 및 이름 없는 사용자 메인으로 리다이렉트
  useEffect(() => {
    const storedName = localStorage.getItem('name');

    if (storedName) {
      dispatch(setName(storedName));
      dispatch(getTodos());
    } else {
      alert('이름을 입력해 주세요!');
      router.replace('/');
    }
  }, [dispatch, router]);

  if (!name) {
    return <></>;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const onClick = () => {
    let newId = 1;

    if (todoList.length > 0) {
      newId = Math.max(...todoList.map((todo) => todo.id)) + 1;
    }

    const newTodo = {
      id: newId,
      title: todoTitle,
    };

    dispatch(addTodos(newTodo));
    setTodoTitle('');
  };

  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <div>
        <p className='text-lg'>
          <span className='text-orange-400'>{name}</span>의 TO DO 📝
        </p>
      </div>
      <div className='flex flex-col items-center gap-12 w-2/3'>
        <div className='flex w-4/5 shadow-lg rounded-lg border border-neutral-100'>
          <div className='flex basis-4/5'>
            <input
              type='text'
              value={todoTitle}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className='w-full p-3 rounded-l-lg focus:outline-none'
            />
          </div>
          <div className='flex basis-1/5'>
            <button
              onClick={onClick}
              className='w-full bg-white rounded-r-lg border-l'
            >
              추가
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-10 w-full min-h-52'>
          {todoList.length > 0 ? (
            todoList.map((todo) => (
              <TodoList
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isChecked={todo.isChecked}
                createdAt={todo.createdAt}
              />
            ))
          ) : (
            <div className='flex justify-center items-center h-full'>
              <p>등록된 할 일이 없어요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
