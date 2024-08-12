'use client';

import EnterName from './enter-name';
import Welcome from './welcome';

export default function Home() {
  const name = localStorage.getItem('name');

  return <>{name ? <Welcome name={name} /> : <EnterName />}</>;
}
