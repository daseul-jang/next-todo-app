import {
  checkTodo,
  deleteTodo,
  ITodo,
  modifyTodo,
} from '@/redux/slice/todo-slice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ITodoListProps {
  todo: ITodo;
  isLast: boolean;
}

export default function TodoList({ todo, isLast }: ITodoListProps) {
  const dispatch = useDispatch();
  const [isModified, setIsModified] = useState(false);
  const [modifiedText, setModifiedText] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // isModified가 true일 때 입력 박스에 포커스를 주고 커서를 끝으로 이동
  useEffect(() => {
    if (isModified && inputRef.current) {
      inputRef.current.focus(); // 입력 박스에 포커스
      inputRef.current.setSelectionRange(
        modifiedText.length,
        modifiedText.length
      ); // 커서를 텍스트 끝으로 이동
    }
  }, [isModified, modifiedText]); // isModified 또는 modifiedText가 변경될 때 실행

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedText(e.target.value);
  };

  const isModifyHandler = () => {
    if (todo.isChecked) {
      alert('체크 된 할 일은 수정할 수 없습니다.');
      return;
    }

    setIsModified((prev) => !prev);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    dispatch(
      modifyTodo({
        id: todo.id,
        title: modifiedText,
        createdAt: todo.createdAt,
      })
    );
    setIsModified(false);
  };

  return (
    <div
      className={`w-full flex flex-col justify-center min-h-24 bg-white px-2 ${
        !isLast && 'border-b border-orange-200'
      }`}
    >
      <div className='flex justify-between items-center text-sm px-3 rounded-t-lg pt-3'>
        <div>
          <input
            type='checkbox'
            checked={todo.isChecked}
            onChange={() =>
              dispatch(checkTodo({ id: todo.id, createdAt: todo.createdAt }))
            }
          />
        </div>
        <div className='flex gap-1'>
          <button onClick={isModifyHandler}>수정</button>
          <button
            onClick={() =>
              dispatch(deleteTodo({ id: todo.id, createdAt: todo.createdAt }))
            }
          >
            삭제
          </button>
        </div>
      </div>
      <div className='flex items-center gap-3 p-3 h-full'>
        <div className=''>
          <span>{todo.id}</span>
        </div>
        <div className='text-xl w-full'>
          {isModified ? (
            <div className='w-full flex flex-col gap-3'>
              <div className='w-full'>
                <input
                  ref={inputRef}
                  type='text'
                  value={modifiedText}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  className='p-2 w-full'
                />
              </div>
              <div className='w-full text-right text-sm'>
                <button
                  className='p-3 bg-orange-200 rounded-md'
                  onClick={modifyHandler}
                >
                  수정하기
                </button>
              </div>
            </div>
          ) : (
            <span
              className={`${todo.isChecked && 'line-through text-neutral-400'}`}
            >
              {todo.title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
