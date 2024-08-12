'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoHeader() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    setName(storedName);
  }, [name]);

  useEffect(() => {
    name || router.back();
  }, [name]);

  if (!name) {
    return <></>;
  }

  return (
    <div>
      <p className='text-2xl'>{name}의 To do List</p>
    </div>
  );
}
