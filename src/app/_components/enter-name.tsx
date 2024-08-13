import { addName } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EnterName() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const onClick = () => {
    console.log(name);
    dispatch(addName(name));
    //localStorage.setItem('name', name);
    router.push('/todo');
  };

  return (
    <div className='flex flex-col gap-10 items-center'>
      <p className='text-3xl'>당신의 이름을 입력해주세요 💞</p>
      <div className='flex gap-2'>
        <input
          className='focus:outline-none bg-transparent border-b-2 border-black text-lg'
          type='text'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          onKeyDown={onKeyDown}
        />
        <button className='bg-orange-400 p-2' onClick={onClick}>
          들어가기
        </button>
      </div>
    </div>
  );
}
