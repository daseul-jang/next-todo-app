'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const path = usePathname();

  const onClick = () => {
    localStorage.clear();
    path === '/' ? router.refresh() : router.replace('/');
  };

  return (
    <nav className='relative flex items-center py-4 bg-red-400'>
      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        <Link className='text-xl' href='/'>
          TO DO
        </Link>
      </div>
      <div className='ml-auto'>
        <button className='mr-4' onClick={onClick}>
          나가기
        </button>
      </div>
    </nav>
  );
}
