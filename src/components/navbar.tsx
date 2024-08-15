'use client';

import { removeTodos } from '@/redux/slice/todo-slice';
import { removeName } from '@/redux/slice/user-slice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function NavBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const name = useSelector((state: RootState) => state.user.name);

  const onClick = () => {
    dispatch(removeName());
    dispatch(removeTodos());
    path === '/' ? router.refresh() : router.replace('/');
  };

  return (
    <nav className='relative flex items-center py-4 bg-orange-100 min-h-[80px] max-w-screen-lg mx-auto'>
      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        <Link
          className='text-xl font-extrabold tracking-widest text-orange-400'
          href='/'
        >
          TO DO
        </Link>
      </div>
      <div className='ml-auto'>
        {name && (
          <button
            className='mr-4 text-orange-300 hover:text-orange-500 bg-white bg-opacity-50 hover:bg-opacity-70 p-3 rounded-lg'
            onClick={onClick}
          >
            나가기
          </button>
        )}
      </div>
    </nav>
  );
}
