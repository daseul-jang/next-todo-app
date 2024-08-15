import {
  checkTodo,
  deleteTodo,
  ITodo,
  modifyTodo,
} from '@/redux/slice/todo-slice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function TodoList({ id, title, isChecked, createdAt }: ITodo) {
  const dispatch = useDispatch();
  const [isModified, setIsModified] = useState(false);
  const [modifiedText, setModifiedText] = useState(title);
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      modifyHandler();
    }
  };

  const modifyHandler = () => {
    dispatch(modifyTodo({ id, title: modifiedText }));
    setIsModified(false);
  };

  return (
    <div className='w-full flex flex-col min-h-24'>
      <div className='flex justify-between items-center text-sm p-2 rounded-t-lg bg-orange-200'>
        <div className='flex gap-2'>
          <span>{id}</span>
          <span>{createdAt}</span>
        </div>
        <div className='flex gap-1'>
          <button onClick={() => setIsModified((prev) => !prev)}>수정</button>
          <button onClick={() => dispatch(deleteTodo(id))}>삭제</button>
        </div>
      </div>
      <div className='flex items-center gap-3 p-3 bg-white rounded-b-lg h-full shadow-lg'>
        <div>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={() => dispatch(checkTodo(id))}
          />
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
            <span className={`${isChecked && 'line-through text-neutral-400'}`}>
              {title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
