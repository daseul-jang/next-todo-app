'use client';

import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function TodoHeader() {
  const router = useRouter();
  const name = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    if (!name) router.replace('/');
  }, []);

  return (
    <div>
      <p className='text-2xl'>{name}의 To do List</p>
    </div>
  );
}
