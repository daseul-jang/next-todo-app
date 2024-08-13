'use client';

import { useEffect, useState } from 'react';
import EnterName from './enter-name';
import Welcome from './welcome';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Home() {
  const name = useSelector((state: RootState) => state.user.name);
  // const [name, setName] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedName = localStorage.getItem('name');
  //   setName(storedName);
  // }, [name]);

  console.log(name);

  return <>{name ? <Welcome name={name} /> : <EnterName />}</>;
}
