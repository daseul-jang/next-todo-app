'use client';

import { addTodos, getTodos } from '@/redux/slice/todo-slice';
import { setName } from '@/redux/slice/user-slice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@/utils/date-utils';
import TodoGroup from './todo-group';
import { generatePDF, generateTestData } from '@/utils/todo-utils';

export default function Todos() {
  const dispatch = useDispatch();
  const router = useRouter();
  const name = useSelector((state: RootState) => state.user.name);
  const todoGroups = useSelector((state: RootState) => state.todo);
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

  // 테스트 데이터 세팅
  useEffect(() => {
    generateTestData();
  }, []);

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

    const todoGroup = todoGroups.find(
      (group) => group.date === formatDate(new Date())
    );

    if (todoGroup) {
      newId =
        todoGroup.todos.length > 0
          ? Math.max(...todoGroup.todos.map((todo) => todo.id)) + 1
          : newId;
    }

    const newTodo = {
      id: newId,
      title: todoTitle,
    };

    dispatch(addTodos(newTodo));
    setTodoTitle('');
  };

  return (
    <div className='flex flex-col items-center gap-5 w-full pt-8'>
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
        <div className='flex flex-col gap-4 w-full min-h-52'>
          <div className='flex justify-end px-2'>
            <button onClick={() => generatePDF(name)}>PDF 저장</button>
          </div>
          <div className='' id='todos'>
            {todoGroups.length > 0 ? (
              todoGroups?.map((group) => (
                <TodoGroup
                  key={formatDate(group.date)}
                  date={group.date}
                  todos={group.todos}
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
    </div>
  );
}
