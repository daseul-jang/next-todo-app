'use client';

import { useEffect } from 'react';
import EnterName from './enter-name';
import Welcome from './welcome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setName } from '@/redux/slice/user-slice';

export default function Home() {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.name);

  useEffect(() => {
    const storedName = localStorage.getItem('name');

    if (storedName) {
      dispatch(setName(storedName));
    }
  }, [dispatch]);

  return <>{name ? <Welcome name={name} /> : <EnterName />}</>;
}
